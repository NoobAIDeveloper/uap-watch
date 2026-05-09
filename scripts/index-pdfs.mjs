#!/usr/bin/env node
/**
 * PDF text-indexing pipeline for UAP.WATCH.
 *
 * Reads `data/documents.ts`, downloads every PDF whose body is the
 * "FULL TEXT NOT YET INDEXED" placeholder, runs it through pdftotext
 * (or ocrmypdf as a fallback), cleans the result, and writes:
 *   - public/extracted/<doc-id>.txt   (committed, served at runtime)
 *   - data/extracted/<doc-id>.json    (gitignored sidecar metadata)
 *   - data/extracted/_index.json      (run-level summary, gitignored)
 *
 * Synthetic memos (DOC-001..DOC-008) keep their hand-authored bodies
 * — we only touch docs whose body begins with the placeholder string.
 *
 * Usage:
 *   node scripts/index-pdfs.mjs --all
 *   node scripts/index-pdfs.mjs --sample DOC-009,DOC-050,DOC-100
 *   node scripts/index-pdfs.mjs --limit 10
 *   node scripts/index-pdfs.mjs --retry-failed
 *
 * No new npm deps. Invokes pdftotext / pdfinfo / ocrmypdf via execFile.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { promises as fs, createReadStream } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const execFileP = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const DOCS_TS = path.join(ROOT, "data/documents.ts");
const PDF_CACHE = path.join(ROOT, "data/pdfs-cache");
const SIDECAR_DIR = path.join(ROOT, "data/extracted");
const OUT_DIR = path.join(ROOT, "public/extracted");
const INDEX_FILE = path.join(SIDECAR_DIR, "_index.json");

const PLACEHOLDER_PREFIX = "FULL TEXT NOT YET INDEXED";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

// Concurrency lowered from 3 to 2 after the first re-extract run. At 400
// DPI rasterization, three parallel jobs on M-series can still OOM during
// a multi-hundred-page FBI scan; two is a safer ceiling.
const CONCURRENCY = 2;

// Per the OCR audit (May 2026), the FBI 1947–1968 tranche has cover-page
// declassification stamps and routing strips that Tesseract OCRs as glyph
// soup — polluting the *first screen* the user sees in the document
// viewer. The body of these docs (page 2 onward) is fine. We strip page 1
// from the text extraction for these specific IDs. The original PDF is
// still hosted; only the searchable / viewable text omits page 1.
//
// DOC-110 (NASA Apollo 17 debrief) has a stippled half-tone cover that
// produces `iiii!` salad; the body is clean.
const SKIP_FIRST_PAGE_DOCS = new Set([
  "DOC-009", "DOC-010", "DOC-011", "DOC-012", "DOC-013",
  "DOC-014", "DOC-015", "DOC-019", "DOC-024",
  "DOC-040", "DOC-041",
  "DOC-110",
]);

// ---------- args ----------

function parseArgs(argv) {
  const args = {
    all: false,
    sample: null,
    limit: null,
    retryFailed: false,
    // --re-extract forces a full re-OCR with the stricter quality flags
    // (deskew, clean, rotate-pages, redo-ocr, 600 DPI oversample).
    // Bypasses the "already extracted" idempotency check.
    reExtract: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--all") args.all = true;
    else if (a === "--retry-failed") args.retryFailed = true;
    else if (a === "--re-extract") args.reExtract = true;
    else if (a === "--sample") {
      args.sample = (argv[++i] || "").split(",").map((s) => s.trim()).filter(Boolean);
    } else if (a === "--limit") {
      args.limit = parseInt(argv[++i] || "0", 10) || null;
    }
  }
  return args;
}

// ---------- documents.ts parser ----------

/**
 * Lightweight parser for the well-formed `data/documents.ts` array literal.
 * We only need three fields per doc: id, sourceUrl, and whether `body`
 * begins with the placeholder marker. Each doc-object opens with `{` on
 * its own line and the relevant fields appear on single lines.
 */
async function parseDocuments() {
  const src = await fs.readFile(DOCS_TS, "utf8");

  // Walk the file finding the start of each top-level object literal
  // inside the `documents` array. Each entry begins with a line
  // containing `id: "DOC-..."`, and ends at the matching `},`.
  // We don't need to be a full TS parser — just scrape three things.
  const docs = [];
  const idRe = /id:\s*"([^"]+)"/;
  const urlRe = /sourceUrl:\s*"([^"]+)"/;
  // Capture the entire backtick body so we can look anywhere inside it.
  const bodyRe = /body:\s*`([\s\S]*?)`,/;

  // Each top-level doc entry is a `{ ... }` block whose closing
  // brace is at indent level 2 (`  },`). We grab the entire entry to
  // make the body regex unambiguous.
  const blockRe = /\{[^{}]*?id:\s*"DOC-\d+"[\s\S]*?\n  \},?/g;
  const blocks = src.match(blockRe) || [];

  for (const block of blocks) {
    const idM = block.match(idRe);
    const urlM = block.match(urlRe);
    const bodyM = block.match(bodyRe);
    if (!idM) continue;
    const body = bodyM ? bodyM[1] : "";
    docs.push({
      id: idM[1],
      sourceUrl: urlM ? urlM[1] : null,
      body,
      // The placeholder marker may appear anywhere in the synthetic-stub
      // body (the stub also includes a header section). A doc is a stub
      // iff the marker is present.
      isStub: body.includes(PLACEHOLDER_PREFIX),
    });
  }
  return docs;
}

// ---------- helpers ----------

async function ensureDirs() {
  await fs.mkdir(PDF_CACHE, { recursive: true });
  await fs.mkdir(SIDECAR_DIR, { recursive: true });
  await fs.mkdir(OUT_DIR, { recursive: true });
}

async function loadIndex() {
  try {
    const raw = await fs.readFile(INDEX_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return { lastUpdate: null, totals: {}, docs: {} };
  }
}

async function saveIndex(idx) {
  idx.lastUpdate = new Date().toISOString();
  // Recompute totals from docs map.
  const counts = {};
  for (const v of Object.values(idx.docs)) {
    const k = (v.extractor || "").startsWith("failed") ? "failed" : v.extractor;
    counts[k] = (counts[k] || 0) + 1;
  }
  idx.totals = counts;
  await fs.writeFile(INDEX_FILE, JSON.stringify(idx, null, 2), "utf8");
}

async function sha256OfFile(p) {
  const hash = crypto.createHash("sha256");
  return new Promise((resolve, reject) => {
    const s = createReadStream(p);
    s.on("data", (c) => hash.update(c));
    s.on("end", () => resolve(hash.digest("hex")));
    s.on("error", reject);
  });
}

async function isRealPdf(p) {
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

async function downloadPdf(url, dest) {
  // Use curl — well-supported, follows redirects, has a sane timeout.
  await execFileP(
    "curl",
    [
      "-sSL",
      "--max-time", "120",
      "-A", USER_AGENT,
      "-H", "Accept: application/pdf,*/*",
      "-o", dest,
      url,
    ],
    { maxBuffer: 8 * 1024 * 1024 },
  );
}

async function downloadViaWayback(url, dest) {
  // Wayback Machine "latest" snapshot via the /web/2026/ prefix.
  // If no snapshot exists, this returns an HTML page — we'll detect
  // via the %PDF magic-bytes check downstream.
  const wb = `https://web.archive.org/web/2026/${url}`;
  await execFileP(
    "curl",
    [
      "-sSL",
      "--max-time", "180",
      "-A", USER_AGENT,
      "-o", dest,
      wb,
    ],
    { maxBuffer: 8 * 1024 * 1024 },
  );
}

async function getPageCount(p) {
  try {
    const { stdout } = await execFileP("pdfinfo", [p], { maxBuffer: 2 * 1024 * 1024 });
    const m = stdout.match(/Pages:\s+(\d+)/);
    return m ? parseInt(m[1], 10) : 1;
  } catch {
    return 1;
  }
}

async function pdftotextRun(p, opts = {}) {
  const flags = ["-layout", "-nopgbrk"];
  if (opts.firstPage) flags.push("-f", String(opts.firstPage));
  flags.push(p, "-");
  try {
    const { stdout } = await execFileP("pdftotext", flags, {
      maxBuffer: 64 * 1024 * 1024,
    });
    return stdout || "";
  } catch (err) {
    return "";
  }
}

// Homebrew's python@3.14 pyexpat is built against a newer libexpat ABI than
// macOS ships in /usr/lib. Pointing DYLD_LIBRARY_PATH at brew's expat keeps
// ocrmypdf's hOCR XML parsing alive. Harmless on systems where it's already
// fine.
const OCR_ENV = {
  ...process.env,
  DYLD_LIBRARY_PATH: [
    "/opt/homebrew/opt/expat/lib",
    process.env.DYLD_LIBRARY_PATH || "",
  ].filter(Boolean).join(":"),
};

// Quality flags. Conservative after a first re-extract run found anything
// involving unpaper or 400+ DPI rasterization OOMs Tesseract on the
// 184-page FBI scans.
//
// `--rotate-pages`: corrects sideways routing strips and stamped pages.
//                   This is the load-bearing flag for the cover-page
//                   gibberish problem identified in the audit.
// `--deskew`: straightens slightly-rotated photocopied pages.
//
// Default rasterization (~300 DPI per ocrmypdf) is fine. Skipping
// `--oversample` keeps wall-clock manageable. Skipping `--clean` avoids
// unpaper crashes. The cover-page-skip logic in SKIP_FIRST_PAGE_DOCS
// covers most of what `--clean` was supposed to fix.
const QUALITY_FLAGS = [
  "--rotate-pages",
  "--deskew",
];

async function ocrmypdfRun(input, id, opts = {}) {
  const tmp = path.join("/tmp", `${id}.ocr.pdf`);
  // re-extract mode: force re-OCR over any existing text layer with the
  // stricter quality flags. Otherwise preserve existing text and only OCR
  // image-only pages.
  const primary = opts.reExtract
    ? ["--redo-ocr", ...QUALITY_FLAGS, "--output-type", "pdf", "--quiet", input, tmp]
    : ["--skip-text", ...QUALITY_FLAGS, "--output-type", "pdf", "--quiet", input, tmp];
  const fallback = ["--force-ocr", ...QUALITY_FLAGS, "--output-type", "pdf", "--quiet", input, tmp];

  let used = opts.reExtract ? "redo-ocr+quality" : "skip-text+quality";
  try {
    await execFileP("ocrmypdf", primary, {
      maxBuffer: 8 * 1024 * 1024,
      timeout: 1_800_000, // 600 DPI is slower; 30 min ceiling per doc
      env: OCR_ENV,
    });
  } catch (err) {
    // Any failure on the primary path falls through to --force-ocr with the
    // same quality flags. Covers PriorOcrFoundError (already has text),
    // unsupported page sizes, and the occasional rasterizer hiccup.
    try {
      await execFileP("ocrmypdf", fallback, {
        maxBuffer: 8 * 1024 * 1024,
        timeout: 1_800_000,
        env: OCR_ENV,
      });
      used = "force-ocr+quality";
    } catch (err2) {
      return { text: "", error: String(err2.stderr || err2.message || err2) };
    }
  }
  const firstPage = SKIP_FIRST_PAGE_DOCS.has(id) ? 2 : undefined;
  const text = await pdftotextRun(tmp, { firstPage });
  try { await fs.unlink(tmp); } catch {}
  return { text, mode: used };
}

// ---------- text cleaning ----------

function cleanText(raw) {
  let text = raw;

  // 1. De-hyphenate line breaks: "exam-\nple" -> "example"
  text = text.replace(/-\n([a-z])/g, "$1");

  // 2. Normalize horizontal whitespace runs (3+ spaces -> 2 spaces).
  //    Preserve newlines and tabs. Use a non-newline whitespace class.
  text = text.replace(/[ \t]{3,}/g, "  ");

  // 3. Trim trailing whitespace per line.
  text = text.replace(/[ \t]+\n/g, "\n");

  // 4. Collapse 3+ consecutive blank lines into a single blank line.
  text = text.replace(/\n{3,}/g, "\n\n");

  // 5. Convert redaction patterns to canonical [[REDACT:...]] markers.
  let redactions = 0;

  // Long runs of black-bar glyphs.
  text = text.replace(/[█■▮]{5,}/g, () => { redactions++; return "[[REDACT:BLACKBAR]]"; });

  // Literal [REDACTED] (any case).
  text = text.replace(/\[REDACTED\]/gi, () => { redactions++; return "[[REDACT:CONTENT]]"; });

  // FOIA exemption codes. Match (b)(1), (b)(6), (b)(7)(C), etc.
  // We canonicalize to FOIA-B<num>[<sub>].
  text = text.replace(/\(b\)\((\d+)\)(?:\(([A-Za-z])\))?/g, (_m, n, sub) => {
    redactions++;
    return sub
      ? `[[REDACT:FOIA-B${n}${sub.toUpperCase()}]]`
      : `[[REDACT:FOIA-B${n}]]`;
  });

  return { text, redactions };
}

// ---------- per-doc pipeline ----------

async function processDoc(doc, idx, opts) {
  const { id, sourceUrl } = doc;
  const txtOut = path.join(OUT_DIR, `${id}.txt`);
  const sidecar = path.join(SIDECAR_DIR, `${id}.json`);
  const pdfPath = path.join(PDF_CACHE, `${id}.pdf`);

  // Skip if not eligible.
  if (!doc.isStub) {
    return { id, skipped: "synthetic" };
  }
  if (!sourceUrl || !sourceUrl.toLowerCase().endsWith(".pdf")) {
    const meta = {
      id, pageCount: 0, extractor: "skipped:no-pdf-url",
      chars: 0, redactions: 0, sha256: null, mtime: new Date().toISOString(),
    };
    await fs.writeFile(sidecar, JSON.stringify(meta, null, 2), "utf8");
    idx.docs[id] = meta;
    return { id, ...meta };
  }

  // Idempotency: if both the .txt output and the cached PDF exist, skip
  // unless retry-failed and prior run was failed, OR re-extract is set.
  const txtExists = existsSync(txtOut);
  const pdfExists = existsSync(pdfPath);
  const prior = idx.docs[id];
  const priorFailed = prior && String(prior.extractor || "").startsWith("failed");

  if (
    txtExists && pdfExists &&
    (!priorFailed || !opts.retryFailed) &&
    !opts.reExtract
  ) {
    return { id, skipped: "exists", extractor: prior?.extractor };
  }

  // 1. Download.
  if (!pdfExists) {
    try {
      await downloadPdf(sourceUrl, pdfPath);
    } catch (err) {
      // Continue — we'll detect via magic bytes.
    }
  }

  let realPdf = await isRealPdf(pdfPath);
  let downloadVia = realPdf ? "direct" : null;

  if (!realPdf) {
    // Try Wayback fallback.
    try { await fs.unlink(pdfPath); } catch {}
    try {
      await downloadViaWayback(sourceUrl, pdfPath);
      realPdf = await isRealPdf(pdfPath);
      if (realPdf) downloadVia = "wayback";
    } catch {}
  }

  if (!realPdf) {
    try { await fs.unlink(pdfPath); } catch {}
    const meta = {
      id, pageCount: 0, extractor: "failed:download",
      chars: 0, redactions: 0, sha256: null, mtime: new Date().toISOString(),
      sourceUrl,
    };
    await fs.writeFile(sidecar, JSON.stringify(meta, null, 2), "utf8");
    idx.docs[id] = meta;
    return { id, ...meta };
  }

  // 2. Page count.
  const pageCount = await getPageCount(pdfPath);

  // 3. pdftotext first. In re-extract mode skip the fast path entirely —
  // we want the OCR re-run regardless. Otherwise try pdftotext, with
  // optional skip-page-1 for the FBI cover-stamp tranche.
  const firstPage = SKIP_FIRST_PAGE_DOCS.has(id) ? 2 : undefined;
  let extractor = "pdftotext";
  let raw = opts.reExtract
    ? ""
    : await pdftotextRun(pdfPath, { firstPage });
  const charsPerPage = raw.length / Math.max(pageCount, 1);

  if (opts.reExtract || !raw || charsPerPage < 50) {
    // Re-OCR with stricter flags.
    extractor = "ocrmypdf";
    const ocrRes = await ocrmypdfRun(pdfPath, id, { reExtract: opts.reExtract });
    if (ocrRes.error && (!ocrRes.text || ocrRes.text.length < 10)) {
      // OCR pipeline crashed entirely.
      const meta = {
        id, pageCount, extractor: "failed:ocr",
        chars: 0, redactions: 0, sha256: await sha256OfFile(pdfPath),
        mtime: new Date().toISOString(), sourceUrl, downloadVia,
        error: ocrRes.error?.slice(0, 300),
      };
      await fs.writeFile(sidecar, JSON.stringify(meta, null, 2), "utf8");
      idx.docs[id] = meta;
      return { id, ...meta };
    }
    if (!ocrRes.text || ocrRes.text.trim().length < 10) {
      // OCR ran cleanly but tesseract found no recognisable text.
      // This is the expected outcome for image-only photographs (e.g.
      // FBI evidence photos). Ship a small stub so the runtime fetch
      // resolves instead of 404ing.
      extractor = "ocrmypdf:no-text";
      const stub = "// OCR FOUND NO RECOGNIZABLE TEXT IN THIS DOCUMENT.\n" +
        "// LIKELY AN IMAGE-ONLY PHOTOGRAPH OR HEAVILY REDACTED PAGE.\n" +
        "// VIEW ORIGINAL VIA SOURCE LINK BELOW.\n";
      await fs.writeFile(txtOut, stub, "utf8");
      const meta = {
        id, pageCount, extractor,
        chars: stub.length, redactions: 0,
        sha256: await sha256OfFile(pdfPath),
        mtime: new Date().toISOString(), sourceUrl, downloadVia,
      };
      await fs.writeFile(sidecar, JSON.stringify(meta, null, 2), "utf8");
      idx.docs[id] = meta;
      return { id, ...meta };
    }
    raw = ocrRes.text;
  }

  // 4. Clean.
  const { text, redactions } = cleanText(raw);

  // 5. Write outputs.
  await fs.writeFile(txtOut, text, "utf8");
  const meta = {
    id, pageCount, extractor,
    chars: text.length, redactions,
    sha256: await sha256OfFile(pdfPath),
    mtime: new Date().toISOString(),
    sourceUrl, downloadVia,
  };
  await fs.writeFile(sidecar, JSON.stringify(meta, null, 2), "utf8");
  idx.docs[id] = meta;
  return { id, ...meta };
}

// ---------- main ----------

async function main() {
  const args = parseArgs(process.argv);
  await ensureDirs();
  const idx = await loadIndex();

  const allDocs = await parseDocuments();

  // Filter to eligible docs (placeholder marker present + .pdf sourceUrl).
  const eligible = allDocs.filter(
    (d) => d.isStub && d.sourceUrl && d.sourceUrl.toLowerCase().endsWith(".pdf"),
  );

  let queue = eligible;
  if (args.sample && args.sample.length) {
    queue = allDocs.filter((d) => args.sample.includes(d.id));
  } else if (args.retryFailed) {
    const failed = new Set(
      Object.entries(idx.docs)
        .filter(([, v]) => String(v.extractor || "").startsWith("failed"))
        .map(([k]) => k),
    );
    queue = eligible.filter((d) => failed.has(d.id));
  } else if (args.limit) {
    queue = eligible.slice(0, args.limit);
  }

  if (args.reExtract && !args.sample) {
    console.log("[pipeline] re-extract mode requires --sample <id-list> to scope.");
    process.exit(1);
  }

  console.log(
    `[pipeline] ${queue.length} docs queued (${eligible.length} eligible total, ${allDocs.length} in catalog)`,
  );
  console.log(
    `[pipeline] cwd=${ROOT}  out=${path.relative(ROOT, OUT_DIR)}  cache=${path.relative(ROOT, PDF_CACHE)}`,
  );

  let processed = 0;
  const total = queue.length;

  // Concurrent worker pool.
  const workers = new Array(Math.min(CONCURRENCY, queue.length || 1)).fill(0).map(async () => {
    while (queue.length) {
      const doc = queue.shift();
      if (!doc) break;
      const t0 = Date.now();
      let res;
      try {
        res = await processDoc(doc, idx, {
          retryFailed: args.retryFailed,
          reExtract: args.reExtract,
        });
      } catch (err) {
        res = { id: doc.id, extractor: "failed:exception", error: String(err?.message || err) };
        idx.docs[doc.id] = {
          id: doc.id, pageCount: 0, extractor: "failed:exception",
          chars: 0, redactions: 0, sha256: null,
          mtime: new Date().toISOString(),
          error: res.error?.slice(0, 300),
        };
      }
      processed++;
      const dt = ((Date.now() - t0) / 1000).toFixed(1);
      const tag = res.skipped
        ? `skipped:${res.skipped}`
        : (res.extractor || "?");
      const detail = res.skipped
        ? ""
        : ` — ${res.pageCount ?? 0} pages — ${(res.chars ?? 0).toLocaleString("en-US")} chars — ${res.redactions ?? 0} redactions`;
      console.log(`[${processed}/${total}] ${doc.id} — ${tag}${detail} (${dt}s)`);

      // Persist index every doc so a Ctrl-C is recoverable.
      try { await saveIndex(idx); } catch {}
    }
  });

  await Promise.all(workers);
  await saveIndex(idx);

  // Final summary.
  console.log("\n[pipeline] done.");
  console.log(`[pipeline] totals: ${JSON.stringify(idx.totals)}`);
}

main().catch((err) => {
  console.error("[pipeline] fatal:", err);
  process.exit(1);
});
