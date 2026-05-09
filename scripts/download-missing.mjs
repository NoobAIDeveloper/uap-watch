#!/usr/bin/env node
/**
 * Sequential downloader for PDFs missing from data/pdfs-cache/.
 *
 * Why this exists separately from index-pdfs.mjs: war.gov fronts on Akamai,
 * which 403s our IP after a handful of parallel hits. The Wayback Machine
 * mirrors all the files but is slow enough that the parallel download path
 * in index-pdfs.mjs (concurrency 2-3, 3-min timeout per worker) loses races
 * for the largest scans (300+ MB FBI archive sections).
 *
 * This script runs strictly sequentially with a 10-minute timeout per file,
 * straight to Wayback (skipping the war.gov direct attempt that we know
 * 403s). Use after Akamai has blocked the IP.
 *
 *   node scripts/download-missing.mjs
 *   node scripts/download-missing.mjs DOC-012,DOC-013   # specific subset
 */

import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PDF_CACHE = path.join(ROOT, "data/pdfs-cache");
const DOCS_TS = path.join(ROOT, "data/documents.ts");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const args = process.argv.slice(2);
const explicit = args[0]
  ? new Set(args[0].split(",").map((s) => s.trim()))
  : null;

async function parseDocs() {
  const src = await fs.readFile(DOCS_TS, "utf8");
  const blocks = src.match(/\{[^{}]*?id:\s*"DOC-\d+"[\s\S]*?\n  \},?/g) || [];
  const out = [];
  for (const block of blocks) {
    const idM = block.match(/id:\s*"([^"]+)"/);
    const urlM = block.match(/sourceUrl:\s*"([^"]+)"/);
    if (idM && urlM && urlM[1].toLowerCase().endsWith(".pdf")) {
      out.push({ id: idM[1], url: urlM[1] });
    }
  }
  return out;
}

async function isPdf(p) {
  try {
    const fh = await fs.open(p, "r");
    try {
      const buf = Buffer.alloc(4);
      await fh.read(buf, 0, 4, 0);
      return buf.toString("ascii") === "%PDF";
    } finally {
      await fh.close();
    }
  } catch {
    return false;
  }
}

async function downloadOne(doc) {
  const dest = path.join(PDF_CACHE, `${doc.id}.pdf`);
  if (existsSync(dest) && (await isPdf(dest))) {
    return { ...doc, status: "cached" };
  }
  // URL-encode literal spaces in the filename (a few entries in documents.ts
  // were authored with raw spaces; curl rejects "Malformed input" on those).
  const cleanedUrl = doc.url.replace(/ /g, "%20");
  const wayback = `https://web.archive.org/web/2026/${cleanedUrl}`;
  const t0 = Date.now();
  try {
    await execFileP(
      "curl",
      [
        "-sSL",
        "--max-time", "600", // 10 min ceiling for the largest archives
        "-A", USER_AGENT,
        "-o", dest,
        wayback,
      ],
      { maxBuffer: 8 * 1024 * 1024 },
    );
    const ok = await isPdf(dest);
    const dt = ((Date.now() - t0) / 1000).toFixed(1);
    if (!ok) {
      try { await fs.unlink(dest); } catch {}
      return { ...doc, status: "fail-not-pdf", dt };
    }
    const stat = await fs.stat(dest);
    return { ...doc, status: "ok", dt, mb: (stat.size / 1024 / 1024).toFixed(0) };
  } catch (e) {
    const dt = ((Date.now() - t0) / 1000).toFixed(1);
    return { ...doc, status: "fail-curl", dt, err: e.message?.slice(0, 80) };
  }
}

async function main() {
  await fs.mkdir(PDF_CACHE, { recursive: true });
  const docs = await parseDocs();
  let queue = docs;
  if (explicit) {
    queue = docs.filter((d) => explicit.has(d.id));
  } else {
    // Default: only docs not already in cache
    queue = [];
    for (const d of docs) {
      const dest = path.join(PDF_CACHE, `${d.id}.pdf`);
      if (!existsSync(dest) || !(await isPdf(dest))) queue.push(d);
    }
  }
  console.log(`[download] ${queue.length} files to fetch from Wayback`);
  let ok = 0, fail = 0;
  for (const d of queue) {
    process.stdout.write(`  ${d.id} … `);
    const r = await downloadOne(d);
    if (r.status === "ok") {
      console.log(`OK [${r.mb}MB, ${r.dt}s]`);
      ok++;
    } else if (r.status === "cached") {
      console.log("cached");
      ok++;
    } else {
      console.log(`FAIL — ${r.status} ${r.err ?? ""} (${r.dt}s)`);
      fail++;
    }
  }
  console.log(`\n[download] done. ${ok} OK, ${fail} failed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
