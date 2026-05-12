// Pulls Reducto's high-fidelity OCR (https://huggingface.co/datasets/reducto/ufocr)
// for every PDF referenced by data/documents.ts and rewrites
// public/extracted/<DOC-ID>.txt with the cleaner block text.
//
// Layout: each Reducto JSON has shape result.result.chunks[].blocks[]; we
// flatten in chunk-then-block order, inserting blank lines between
// semantic transitions (Title / Section Header) so embedder chunking
// still gets meaningful paragraph boundaries. Block `type=Footer` is
// dropped — it's almost always repeated page-number chrome.
//
// Idempotent: writes only when the new payload differs from disk.
// CC BY 4.0 attribution: see app/components/Footer + CASE_STUDY.md.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.dirname(path.dirname(__filename));
const DOCS_TS = path.join(ROOT, "data", "documents.ts");
const OUT_DIR = path.join(ROOT, "public", "extracted");
const CACHE_DIR = path.join(ROOT, "data", "reducto-cache");
const BASE_URL =
  "https://huggingface.co/datasets/reducto/ufocr/resolve/main/files/dept_of_war";

// Block types worth keeping. Footer is dropped (page chrome).
const KEEP_TYPES = new Set([
  "Title",
  "Header",
  "Section Header",
  "Text",
  "Key Value",
  "List Item",
  // Anything Reducto labels differently — keep by default below
]);

const SEP_BEFORE = new Set(["Title", "Section Header", "Header"]);

async function parseDocsTs() {
  const src = await fs.readFile(DOCS_TS, "utf8");
  // Find each `id: "DOC-NNN"` followed (within ~30 lines) by an optional
  // `sourceUrl: "...pdf"`. Pair them.
  const idRe = /id:\s*"(DOC-\d+)"/g;
  const out = [];
  let m;
  while ((m = idRe.exec(src))) {
    const id = m[1];
    // Look ahead up to 30 lines for sourceUrl
    const window = src.slice(m.index, m.index + 2000);
    const urlMatch = window.match(
      /sourceUrl:\s*"https:\/\/www\.war\.gov\/medialink\/ufo\/release_1\/([^"\s]+\.pdf)"/,
    );
    if (urlMatch) out.push({ id, basename: urlMatch[1].replace(/\.pdf$/, "") });
  }
  return out;
}

async function fetchReducto(basename) {
  const cachePath = path.join(CACHE_DIR, `${basename}.json`);
  try {
    const cached = await fs.readFile(cachePath, "utf8");
    return JSON.parse(cached);
  } catch {}
  const url = `${BASE_URL}/${encodeURIComponent(basename)}.json`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const text = await res.text();
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(cachePath, text);
  return JSON.parse(text);
}

function flatten(payload) {
  // Walk to the chunks. Tolerate either result.result.chunks or result.chunks.
  const chunks =
    payload?.result?.result?.chunks ?? payload?.result?.chunks ?? [];
  const lines = [];
  let prevType = null;
  for (const chunk of chunks) {
    for (const block of chunk.blocks ?? []) {
      const t = block.type;
      if (t === "Footer") continue;
      const content = (block.content ?? "").trim();
      if (!content) continue;
      // Insert blank line before semantic-header transitions or whenever
      // the section changes — gives the embedder reasonable paragraph
      // boundaries without manufacturing fake structure.
      if (
        (SEP_BEFORE.has(t) && prevType && prevType !== t) ||
        (prevType === "Title" && t !== "Title")
      ) {
        if (lines.length && lines[lines.length - 1] !== "") lines.push("");
      }
      lines.push(content);
      prevType = t;
    }
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

async function main() {
  const pairs = await parseDocsTs();
  console.log(`Found ${pairs.length} (DOC-ID, basename) pairs`);

  await fs.mkdir(OUT_DIR, { recursive: true });

  let written = 0;
  let unchanged = 0;
  let missing = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;
  const skipped = [];

  for (const { id, basename } of pairs) {
    let payload;
    try {
      payload = await fetchReducto(basename);
    } catch (err) {
      console.log(`  ${id}  MISSING — ${basename}.json (${err.message})`);
      missing += 1;
      skipped.push({ id, basename, reason: err.message });
      continue;
    }
    const flat = flatten(payload);
    const outPath = path.join(OUT_DIR, `${id}.txt`);
    let existing = "";
    try {
      existing = await fs.readFile(outPath, "utf8");
    } catch {}
    bytesBefore += Buffer.byteLength(existing, "utf8");
    bytesAfter += Buffer.byteLength(flat, "utf8");
    if (existing === flat) {
      unchanged += 1;
      continue;
    }
    await fs.writeFile(outPath, flat);
    written += 1;
    const oldLen = existing.length;
    const newLen = flat.length;
    const arrow = oldLen === 0 ? "(new)" : `${oldLen}→${newLen}`;
    console.log(`  ${id}  ${arrow.padEnd(18)} ${basename}`);
  }

  console.log(
    `\nWrote ${written}, unchanged ${unchanged}, missing ${missing}.`,
  );
  console.log(
    `Total chars: ${bytesBefore} → ${bytesAfter} (${
      bytesAfter - bytesBefore >= 0 ? "+" : ""
    }${bytesAfter - bytesBefore})`,
  );
  if (skipped.length) {
    console.log("\nSkipped files (not in Reducto set):");
    for (const s of skipped) console.log(`  - ${s.id}  ${s.basename}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
