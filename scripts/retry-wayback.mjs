#!/usr/bin/env node
/**
 * Retry pipeline: re-download every DOC whose extractor === "failed:download"
 * via the Wayback Machine, then run pdftotext / ocrmypdf and write the
 * usual outputs.
 *
 * Akamai started 403-blocking our IP partway through the original
 * `index-pdfs.mjs --all` run, leaving 59 docs as "failed:download". The
 * Wayback Machine still has 302 redirects to live captures of the same
 * URLs, so we route the retry traffic through there.
 *
 * Politeness controls (Wayback rate-limits harder than war.gov):
 *   - max 2 concurrent downloads
 *   - 2-second sleep between every Wayback request (per worker)
 *   - --max-time 300 with -L to follow the 302 redirect
 *
 * Outputs (same as the main pipeline):
 *   - public/extracted/<doc-id>.txt   (committed; served at runtime)
 *   - data/extracted/<doc-id>.json    (gitignored sidecar)
 *   - data/extracted/_index.json      (gitignored summary)
 *
 * Final extractor states this script may write into _index.json:
 *   - "pdftotext" / "ocrmypdf" / "ocrmypdf:no-text"  → success via wayback
 *   - "failed:wayback"  → wayback returned non-PDF (HTML / 404 page)
 *   - "failed:ocr"      → real PDF but OCR pipeline crashed
 *   - "failed:both"     → wayback failed AND we already know war.gov is dead
 *
 * Usage:
 *   node scripts/retry-wayback.mjs              # process all failed:download
 *   node scripts/retry-wayback.mjs --limit 10   # cap for testing
 *   node scripts/retry-wayback.mjs --only DOC-081,DOC-082
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

const PDF_CACHE = path.join(ROOT, "data/pdfs-cache");
const SIDECAR_DIR = path.join(ROOT, "data/extracted");
const OUT_DIR = path.join(ROOT, "public/extracted");
const INDEX_FILE = path.join(SIDECAR_DIR, "_index.json");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const CONCURRENCY = 2;        // wayback rate-limits aggressively
const THROTTLE_MS = 2000;     // sleep between requests, per worker

// ---------- args ----------

function parseArgs(argv) {
  const args = { limit: null, only: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit") args.limit = parseInt(argv[++i] || "0", 10) || null;
    else if (a === "--only") {
      args.only = (argv[++i] || "").split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return args;
}

// ---------- index helpers ----------

async function loadIndex() {
  const raw = await fs.readFile(INDEX_FILE, "utf8");
  return JSON.parse(raw);
}

async function saveIndex(idx) {
  idx.lastUpdate = new Date().toISOString();
  const counts = {};
  for (const v of Object.values(idx.docs)) {
    const k = String(v.extractor || "").startsWith("failed")
      ? "failed"
      : v.extractor;
    counts[k] = (counts[k] || 0) + 1;
  }
  idx.totals = counts;
  await fs.writeFile(INDEX_FILE, JSON.stringify(idx, null, 2), "utf8");
}

// ---------- pdf helpers (mirror index-pdfs.mjs) ----------

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
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

/**
 * URL-encode the source URL safely. The path may contain spaces (e.g.
 * "18_100754_ general 1946-7_vol_2.pdf") which curl will reject without
 * encoding. We preserve `:/?&=#` so the scheme + query stay intact.
 */
function encodeSourceUrl(rawUrl) {
  // Encode each path segment but leave structural chars alone.
  const u = new URL(rawUrl);
  const encodedPath = u.pathname
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${u.origin}${encodedPath}${u.search}${u.hash}`;
}

async function downloadViaWayback(sourceUrl, dest) {
  const encoded = encodeSourceUrl(sourceUrl);
  const wb = `https://web.archive.org/web/2026/${encoded}`;
  // -L to follow the 302 redirect onto the timestamped capture.
  // -f so curl exits non-zero on 4xx/5xx (we treat those as failures
  // rather than writing a zero-byte / error-HTML file to disk).
  await execFileP(
    "curl",
    [
      "-fsSL",
      "--max-time", "300",
      "-A", USER_AGENT,
      "-H", "Accept: application/pdf,*/*",
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

async function pdftotextRun(p) {
  try {
    const { stdout } = await execFileP(
      "pdftotext",
      ["-layout", "-nopgbrk", p, "-"],
      { maxBuffer: 64 * 1024 * 1024 },
    );
    return stdout || "";
  } catch {
    return "";
  }
}

const OCR_ENV = {
  ...process.env,
  DYLD_LIBRARY_PATH: [
    "/opt/homebrew/opt/expat/lib",
    process.env.DYLD_LIBRARY_PATH || "",
  ].filter(Boolean).join(":"),
};

async function ocrmypdfRun(input, id) {
  const tmp = path.join("/tmp", `${id}.ocr.pdf`);
  let used = "skip-text";
  try {
    await execFileP(
      "ocrmypdf",
      ["--skip-text", "--output-type", "pdf", "--quiet", input, tmp],
      { maxBuffer: 8 * 1024 * 1024, timeout: 900_000, env: OCR_ENV },
    );
  } catch (err) {
    const msg = String(err.stderr || err.message || "");
    if (/PriorOcrFoundError|already has text/i.test(msg)) {
      try {
        await execFileP(
          "ocrmypdf",
          ["--force-ocr", "--output-type", "pdf", "--quiet", input, tmp],
          { maxBuffer: 8 * 1024 * 1024, timeout: 1_200_000, env: OCR_ENV },
        );
        used = "force-ocr";
      } catch (err2) {
        return { text: "", error: String(err2.stderr || err2.message || err2) };
      }
    } else {
      try {
        await execFileP(
          "ocrmypdf",
          ["--force-ocr", "--output-type", "pdf", "--quiet", input, tmp],
          { maxBuffer: 8 * 1024 * 1024, timeout: 1_200_000, env: OCR_ENV },
        );
        used = "force-ocr";
      } catch {
        return { text: "", error: msg };
      }
    }
  }
  const text = await pdftotextRun(tmp);
  try { await fs.unlink(tmp); } catch {}
  return { text, mode: used };
}

// ---------- text cleaning (identical to index-pdfs.mjs) ----------

function cleanText(raw) {
  let text = raw;
  text = text.replace(/-\n([a-z])/g, "$1");
  text = text.replace(/[ \t]{3,}/g, "  ");
  text = text.replace(/[ \t]+\n/g, "\n");
  text = text.replace(/\n{3,}/g, "\n\n");

  let redactions = 0;
  text = text.replace(/[█■▮]{5,}/g, () => { redactions++; return "[[REDACT:BLACKBAR]]"; });
  text = text.replace(/\[REDACTED\]/gi, () => { redactions++; return "[[REDACT:CONTENT]]"; });
  text = text.replace(/\(b\)\((\d+)\)(?:\(([A-Za-z])\))?/g, (_m, n, sub) => {
    redactions++;
    return sub
      ? `[[REDACT:FOIA-B${n}${sub.toUpperCase()}]]`
      : `[[REDACT:FOIA-B${n}]]`;
  });
  return { text, redactions };
}

// ---------- per-doc retry ----------

async function retryDoc(id, sourceUrl, idx) {
  const txtOut = path.join(OUT_DIR, `${id}.txt`);
  const sidecar = path.join(SIDECAR_DIR, `${id}.json`);
  const pdfPath = path.join(PDF_CACHE, `${id}.pdf`);

  // 1. Wayback download.
  try { await fs.unlink(pdfPath); } catch {}
  let waybackError = null;
  try {
    await downloadViaWayback(sourceUrl, pdfPath);
  } catch (err) {
    waybackError = String(err.stderr || err.message || err).slice(0, 300);
  }

  const realPdf = existsSync(pdfPath) && (await isRealPdf(pdfPath));

  if (!realPdf) {
    try { await fs.unlink(pdfPath); } catch {}
    // war.gov was already confirmed dead at the original run — record
    // both failures together.
    const meta = {
      id,
      pageCount: 0,
      extractor: "failed:both",
      chars: 0,
      redactions: 0,
      sha256: null,
      mtime: new Date().toISOString(),
      sourceUrl,
      reason: waybackError
        ? `wayback download failed: ${waybackError}`
        : "wayback returned non-PDF (no capture, HTML error page, or truncated)",
    };
    await fs.writeFile(sidecar, JSON.stringify(meta, null, 2), "utf8");
    idx.docs[id] = meta;
    return meta;
  }

  // 2. Page count.
  const pageCount = await getPageCount(pdfPath);

  // 3. pdftotext, fall back to ocrmypdf.
  let extractor = "pdftotext";
  let raw = await pdftotextRun(pdfPath);
  const charsPerPage = raw.length / Math.max(pageCount, 1);

  if (!raw || charsPerPage < 50) {
    extractor = "ocrmypdf";
    const ocrRes = await ocrmypdfRun(pdfPath, id);
    if (ocrRes.error && (!ocrRes.text || ocrRes.text.length < 10)) {
      const meta = {
        id,
        pageCount,
        extractor: "failed:ocr",
        chars: 0,
        redactions: 0,
        sha256: await sha256OfFile(pdfPath),
        mtime: new Date().toISOString(),
        sourceUrl,
        downloadVia: "wayback-retry",
        error: ocrRes.error?.slice(0, 300),
      };
      await fs.writeFile(sidecar, JSON.stringify(meta, null, 2), "utf8");
      idx.docs[id] = meta;
      return meta;
    }
    if (!ocrRes.text || ocrRes.text.trim().length < 10) {
      // Image-only PDF (typical for fbi-photo-bN.pdf).
      extractor = "ocrmypdf:no-text";
      const stub =
        "// OCR FOUND NO RECOGNIZABLE TEXT IN THIS DOCUMENT.\n" +
        "// LIKELY AN IMAGE-ONLY PHOTOGRAPH OR HEAVILY REDACTED PAGE.\n" +
        "// VIEW ORIGINAL VIA SOURCE LINK BELOW.\n";
      await fs.writeFile(txtOut, stub, "utf8");
      const meta = {
        id,
        pageCount,
        extractor,
        chars: stub.length,
        redactions: 0,
        sha256: await sha256OfFile(pdfPath),
        mtime: new Date().toISOString(),
        sourceUrl,
        downloadVia: "wayback-retry",
      };
      await fs.writeFile(sidecar, JSON.stringify(meta, null, 2), "utf8");
      idx.docs[id] = meta;
      return meta;
    }
    raw = ocrRes.text;
  }

  // 4. Clean + write text.
  const { text, redactions } = cleanText(raw);
  await fs.writeFile(txtOut, text, "utf8");
  const meta = {
    id,
    pageCount,
    extractor,
    chars: text.length,
    redactions,
    sha256: await sha256OfFile(pdfPath),
    mtime: new Date().toISOString(),
    sourceUrl,
    downloadVia: "wayback-retry",
  };
  await fs.writeFile(sidecar, JSON.stringify(meta, null, 2), "utf8");
  idx.docs[id] = meta;
  return meta;
}

// ---------- main ----------

async function main() {
  const args = parseArgs(process.argv);
  const idx = await loadIndex();

  const failedEntries = Object.entries(idx.docs)
    .filter(([, v]) => String(v.extractor || "").startsWith("failed"))
    .map(([id, v]) => ({ id, sourceUrl: v.sourceUrl }))
    .filter((e) => e.sourceUrl)
    .sort((a, b) => a.id.localeCompare(b.id));

  let queue = failedEntries;
  if (args.only && args.only.length) {
    queue = queue.filter((e) => args.only.includes(e.id));
  }
  if (args.limit) queue = queue.slice(0, args.limit);

  console.log(
    `[wayback-retry] ${queue.length} docs to retry (of ${failedEntries.length} failed)`,
  );

  const total = queue.length;
  let processed = 0;
  let recovered = 0;
  let stillFailed = 0;

  // Worker pool with per-worker throttling.
  const workers = new Array(Math.min(CONCURRENCY, queue.length || 1))
    .fill(0)
    .map(async (_, wi) => {
      while (queue.length) {
        const entry = queue.shift();
        if (!entry) break;
        const { id, sourceUrl } = entry;
        const t0 = Date.now();
        let meta;
        try {
          meta = await retryDoc(id, sourceUrl, idx);
        } catch (err) {
          meta = {
            id,
            pageCount: 0,
            extractor: "failed:exception",
            chars: 0,
            redactions: 0,
            sha256: null,
            mtime: new Date().toISOString(),
            sourceUrl,
            error: String(err?.message || err).slice(0, 300),
          };
          idx.docs[id] = meta;
        }
        processed++;
        const ok = !String(meta.extractor || "").startsWith("failed");
        if (ok) recovered++;
        else stillFailed++;
        const dt = ((Date.now() - t0) / 1000).toFixed(1);
        const detail = ok
          ? `${meta.pageCount ?? 0}pp · ${(meta.chars ?? 0).toLocaleString("en-US")} chars · ${meta.redactions ?? 0} redactions`
          : meta.reason || meta.error || "";
        console.log(
          `[w${wi}] [${processed}/${total}] ${id} → ${meta.extractor} (${dt}s) ${detail}`,
        );
        try { await saveIndex(idx); } catch {}
        await sleep(THROTTLE_MS);
      }
    });

  await Promise.all(workers);
  await saveIndex(idx);

  console.log("\n[wayback-retry] done.");
  console.log(`[wayback-retry] recovered: ${recovered}, still-failed: ${stillFailed}`);
  console.log(`[wayback-retry] totals: ${JSON.stringify(idx.totals)}`);
}

main().catch((err) => {
  console.error("[wayback-retry] fatal:", err);
  process.exit(1);
});
