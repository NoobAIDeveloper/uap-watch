#!/usr/bin/env node
/**
 * Build the RAG vector store for uap.watch's chatbot.
 *
 * Reads:
 *   - public/extracted/<DOC-ID>.txt    (OCR'd document bodies)
 *   - data/documents.ts                (doc metadata + synthetic-memo bodies)
 *   - data/incidents.ts                (PURSUE incident summaries)
 *
 * Writes:
 *   - public/rag/metadata.json   (chunk text + provenance + offsets into the
 *                                 embedding buffer; ~2-3 MB)
 *   - public/rag/embeddings.bin  (Float32Array buffer of all chunk embeddings
 *                                 packed back-to-back; chunks × 384 × 4 bytes)
 *
 * Two reasons we split metadata from the embedding floats:
 *   1. JSON-serializing 8k × 384 floats blows up to ~60 MB pretty-printed and
 *      adds ~30s of JSON.parse cost on cold start.
 *   2. A binary Float32Array maps directly into memory at module load, so the
 *      cosine scan stays O(n × d) with zero parsing overhead.
 *
 * Usage:
 *   node scripts/build-embeddings.mjs
 *   node scripts/build-embeddings.mjs --limit 5     (smoke test)
 *   node scripts/build-embeddings.mjs --verbose
 */

import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "@huggingface/transformers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DOCS_TS = path.join(ROOT, "data/documents.ts");
const INCIDENTS_TS = path.join(ROOT, "data/incidents.ts");
const EXTRACTED_DIR = path.join(ROOT, "public/extracted");
const OUT_DIR = path.join(ROOT, "public/rag");

const MODEL = "Xenova/all-MiniLM-L6-v2";
const DIM = 384;
// MiniLM has a 256-token sequence limit. ~180 words sits well inside that
// budget after BERT subword tokenization, with room for short context like
// page separators that survive the chunk.
const CHUNK_WORDS = 180;
const CHUNK_OVERLAP = 30;
const BATCH = 32;

const args = process.argv.slice(2);
const LIMIT = (() => {
  const i = args.indexOf("--limit");
  return i >= 0 ? parseInt(args[i + 1], 10) || null : null;
})();
const VERBOSE = args.includes("--verbose");

// ---------- text utilities ----------

function normalizeWhitespace(s) {
  return s
    .replace(/\r\n?/g, "\n")
    .replace(/ /g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Word-window chunker with sentence-boundary preference. */
function chunkText(text, maxWords = CHUNK_WORDS, overlap = CHUNK_OVERLAP) {
  const clean = normalizeWhitespace(text);
  if (!clean) return [];
  const words = clean.split(/\s+/);
  if (words.length <= maxWords) return [clean];

  const chunks = [];
  let i = 0;
  while (i < words.length) {
    const slice = words.slice(i, i + maxWords);
    chunks.push(slice.join(" "));
    if (i + maxWords >= words.length) break;
    i += maxWords - overlap;
  }
  return chunks;
}

// ---------- catalog parsers ----------

/**
 * Minimal documents.ts parser. We only need id/title/source/date and (for
 * synthetic memos) the body backtick block.
 */
async function parseDocuments() {
  const src = await fs.readFile(DOCS_TS, "utf8");
  const out = [];
  const re = /\{\s*id:\s*"(DOC-\d+)"[\s\S]*?\n  \},?/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const block = m[0];
    const id = m[1];
    const title = block.match(/title:\s*"([^"]*)"/)?.[1] ?? "";
    const source = block.match(/source:\s*"([^"]*)"/)?.[1] ?? "";
    const date = block.match(/date:\s*"([^"]*)"/)?.[1] ?? "";
    const bodyMatch = block.match(/body:\s*`([\s\S]*?)`,/);
    const body = bodyMatch ? bodyMatch[1] : "";
    out.push({ id, title, source, date, body });
  }
  return out;
}

/**
 * Minimal incidents.ts parser. Each incident contributes one record with
 * concatenated summary + why-it-matters + key-quote.
 */
async function parseIncidents() {
  const src = await fs.readFile(INCIDENTS_TS, "utf8");
  const out = [];
  const re = /\{\s*id:\s*"(PURSUE-\d+)"[\s\S]*?\n  \},?/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const block = m[0];
    const id = m[1];
    const title = block.match(/title:\s*"([^"]*)"/)?.[1] ?? "";
    const date = block.match(/date:\s*"([^"]*)"/)?.[1] ?? "";
    const region = block.match(/region:\s*"([^"]*)"/)?.[1] ?? "";
    const source = block.match(/source:\s*"([^"]*)"/)?.[1] ?? "";
    const summary = block.match(/summary:\s*"([^"]*)"/)?.[1] ?? "";
    const why = block.match(/whyItMatters:\s*"([^"]*)"/)?.[1] ?? "";
    const quote = block.match(/keyQuote:\s*"([^"]*)"/)?.[1] ?? "";
    const body = [summary, why, quote ? `Key quote: "${quote}"` : ""]
      .filter(Boolean)
      .join("\n\n");
    out.push({ id, title, date, region, source, text: body });
  }
  return out;
}

// ---------- gather source records ----------

async function gatherRecords() {
  const docs = await parseDocuments();
  const incidents = await parseIncidents();
  const records = [];

  for (const d of docs) {
    const extractedPath = path.join(EXTRACTED_DIR, `${d.id}.txt`);
    let text = "";
    if (existsSync(extractedPath)) {
      const raw = await fs.readFile(extractedPath, "utf8");
      if (raw.trim().length > 400) text = raw;
    }
    if (!text && d.body && !d.body.startsWith("FULL TEXT NOT YET INDEXED")) {
      // Synthetic memo with hand-authored body
      text = d.body;
    }
    if (!text) continue;
    records.push({
      kind: "document",
      id: d.id,
      title: d.title,
      source: d.source,
      date: d.date,
      text,
    });
  }

  for (const i of incidents) {
    if (!i.text) continue;
    records.push({
      kind: "incident",
      id: i.id,
      title: i.title,
      source: i.source,
      date: i.date,
      region: i.region,
      text: i.text,
    });
  }

  return records;
}

// ---------- main ----------

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  console.log(`[rag] loading records from documents.ts + incidents.ts`);
  let records = await gatherRecords();
  if (LIMIT) records = records.slice(0, LIMIT);
  console.log(`[rag] ${records.length} source records`);

  // Build chunks with provenance
  const chunkMeta = []; // {docId, title, source, date, kind, region?, chunkIdx, text}
  for (const r of records) {
    const chunks = chunkText(r.text);
    for (let i = 0; i < chunks.length; i++) {
      chunkMeta.push({
        kind: r.kind,
        id: r.id,
        title: r.title,
        source: r.source ?? null,
        date: r.date ?? null,
        region: r.region ?? null,
        chunkIdx: i,
        chunkCount: chunks.length,
        text: chunks[i],
      });
    }
  }
  console.log(`[rag] ${chunkMeta.length} chunks total`);

  console.log(`[rag] loading model ${MODEL} (first run downloads ~22 MB)`);
  const extract = await pipeline("feature-extraction", MODEL, {
    quantized: true,
  });

  // Allocate the packed embedding buffer up front
  const buf = new Float32Array(chunkMeta.length * DIM);

  const t0 = Date.now();
  for (let start = 0; start < chunkMeta.length; start += BATCH) {
    const batchEnd = Math.min(start + BATCH, chunkMeta.length);
    const batchTexts = chunkMeta.slice(start, batchEnd).map((c) => c.text);
    const out = await extract(batchTexts, {
      pooling: "mean",
      normalize: true,
    });
    // out is a Tensor with shape [batch, DIM] when given an array
    const data = out.data; // Float32Array length = batch * DIM
    buf.set(data, start * DIM);
    if (VERBOSE || start % (BATCH * 10) === 0) {
      const pct = ((batchEnd / chunkMeta.length) * 100).toFixed(1);
      const dt = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`[rag]   ${batchEnd}/${chunkMeta.length} (${pct}%) — ${dt}s`);
    }
  }
  console.log(`[rag] embedded ${chunkMeta.length} chunks in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  // Strip the embedding-only field if any (we don't store per-chunk embeddings
  // in metadata.json since they live in the packed buffer)
  const metadata = {
    model: MODEL,
    dim: DIM,
    chunkCount: chunkMeta.length,
    builtAt: new Date().toISOString(),
    chunks: chunkMeta, // each chunk's index in metadata.chunks == its index in the buffer
  };

  await fs.writeFile(
    path.join(OUT_DIR, "metadata.json"),
    JSON.stringify(metadata),
  );
  await fs.writeFile(path.join(OUT_DIR, "embeddings.bin"), Buffer.from(buf.buffer));

  const metaBytes = (await fs.stat(path.join(OUT_DIR, "metadata.json"))).size;
  const binBytes = (await fs.stat(path.join(OUT_DIR, "embeddings.bin"))).size;
  console.log(
    `[rag] wrote metadata.json (${(metaBytes / 1024 / 1024).toFixed(1)} MB) and embeddings.bin (${(binBytes / 1024 / 1024).toFixed(1)} MB)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
