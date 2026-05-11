// Server-side retrieval for the RAG chatbot.
//
// The embeddings artifact is built by scripts/build-embeddings.mjs and shipped
// in /public/rag. We load it once per Node process (module-level cache) and do
// a flat dot-product scan for retrieval. Vectors are L2-normalized at build
// time, so dot product equals cosine similarity. 5106 chunks × 384 dims runs
// in well under 10 ms, so an ANN index would be premature.

import fs from "node:fs";
import path from "node:path";

export type ChunkMeta = {
  kind: "document" | "incident";
  id: string;
  title: string;
  source: string | null;
  date: string | null;
  region: string | null;
  chunkIdx: number;
  chunkCount: number;
  text: string;
};

export type RagIndex = {
  model: string;
  dim: number;
  chunkCount: number;
  chunks: ChunkMeta[];
  embeddings: Float32Array;
};

let cached: RagIndex | null = null;

export function loadIndex(): RagIndex {
  if (cached) return cached;

  const root = process.cwd();
  const metaPath = path.join(root, "public", "rag", "metadata.json");
  const binPath = path.join(root, "public", "rag", "embeddings.bin");

  const metaRaw = fs.readFileSync(metaPath, "utf-8");
  const meta = JSON.parse(metaRaw) as {
    model: string;
    dim: number;
    chunkCount: number;
    chunks: ChunkMeta[];
  };

  const buf = fs.readFileSync(binPath);
  // The Node Buffer may not be 4-byte aligned for a Float32Array view, so copy
  // into a fresh ArrayBuffer when necessary. Aligned case is the fast path.
  let embeddings: Float32Array;
  if (buf.byteOffset % 4 === 0) {
    embeddings = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
  } else {
    const ab = new ArrayBuffer(buf.byteLength);
    new Uint8Array(ab).set(buf);
    embeddings = new Float32Array(ab);
  }

  if (embeddings.length !== meta.chunkCount * meta.dim) {
    throw new Error(
      `[rag] embeddings size mismatch: got ${embeddings.length}, expected ${meta.chunkCount * meta.dim}`,
    );
  }

  cached = {
    model: meta.model,
    dim: meta.dim,
    chunkCount: meta.chunkCount,
    chunks: meta.chunks,
    embeddings,
  };
  return cached;
}

export function topK(
  queryEmbedding: Float32Array,
  k: number,
  index: RagIndex,
): Array<{ chunk: ChunkMeta; score: number; idx: number }> {
  const { embeddings, chunks, dim, chunkCount } = index;
  if (queryEmbedding.length !== dim) {
    throw new Error(`[rag] query dim ${queryEmbedding.length} != index dim ${dim}`);
  }

  // Maintain a small min-heap-like sorted array of the current top-k. For
  // k ≪ chunkCount (k=6, N=5106) a linear insert into a 6-slot array is
  // faster than sorting all scores at the end.
  const top: Array<{ score: number; idx: number }> = [];
  let worst = -Infinity;

  for (let i = 0; i < chunkCount; i++) {
    const base = i * dim;
    let s = 0;
    for (let j = 0; j < dim; j++) s += embeddings[base + j] * queryEmbedding[j];

    if (top.length < k) {
      top.push({ score: s, idx: i });
      if (top.length === k) {
        top.sort((a, b) => a.score - b.score);
        worst = top[0].score;
      }
      continue;
    }
    if (s > worst) {
      // Replace current worst, then re-find worst.
      top[0] = { score: s, idx: i };
      // Insertion sort upward — only one element is out of place.
      let p = 0;
      while (p + 1 < top.length && top[p].score > top[p + 1].score) {
        const tmp = top[p];
        top[p] = top[p + 1];
        top[p + 1] = tmp;
        p++;
      }
      worst = top[0].score;
    }
  }

  // Highest score first.
  top.sort((a, b) => b.score - a.score);
  return top.map((t) => ({ chunk: chunks[t.idx], score: t.score, idx: t.idx }));
}
