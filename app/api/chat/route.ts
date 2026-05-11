// RAG chat endpoint. Streams Groq deltas over SSE after a citations event.
//
// Why Node runtime: transformers.js needs fs and a writable cache dir for the
// MiniLM weights. The Edge runtime can't satisfy either.

import Groq from "groq-sdk";
import { embedQuery } from "@/lib/embed";
import { loadIndex, topK, type ChunkMeta } from "@/lib/rag";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

// In-memory sliding-window rate limit. Cold starts reset it, which is fine
// for a portfolio demo — abuse is bounded by Groq's own quotas anyway.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10;
const rateBuckets = new Map<string, number[]>();

function rateLimit(ip: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const arr = (rateBuckets.get(ip) ?? []).filter((t) => t > cutoff);
  if (arr.length >= RATE_MAX) {
    const oldest = arr[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + RATE_WINDOW_MS - now) / 1000));
    rateBuckets.set(ip, arr);
    return { ok: false, retryAfterSec };
  }
  arr.push(now);
  rateBuckets.set(ip, arr);
  return { ok: true };
}

function formatPassages(hits: Array<{ chunk: ChunkMeta; score: number }>): string {
  return hits
    .map((h, i) => {
      const c = h.chunk;
      const header = [
        `#${i + 1}`,
        c.id,
        c.title ? `"${c.title}"` : null,
        c.date ?? null,
      ]
        .filter(Boolean)
        .join(" — ");
      return `[${header}]\n${c.text}`;
    })
    .join("\n\n");
}

function buildSystemPrompt(passages: string): string {
  return [
    "You are the archive interface for UAP.WATCH, a declassified-file viewer styled after Palantir Blueprint.",
    "Tone: clinical, terse, archival. No marketing language. No emoji. No hedging filler.",
    "Ground every factual claim ONLY in the PASSAGES below. Do not invent dates, names, or document IDs.",
    "Cite sources inline using their ID in square brackets, e.g. [DOC-031] or [PURSUE-007]. Cite at the end of each clause that depends on a passage.",
    "If the passages do not contain the answer, reply exactly: I don't have that information in the archive.",
    "Keep answers under ~200 words unless the user asks for a deeper read.",
    "",
    "PASSAGES:",
    passages,
  ].join("\n");
}

// Deduplicate by chunk id, keep the best score per id, sort descending.
function dedupeCitations(
  hits: Array<{ chunk: ChunkMeta; score: number }>,
): Array<{
  kind: ChunkMeta["kind"];
  id: string;
  title: string;
  source: string | null;
  date: string | null;
  region: string | null;
  score: number;
}> {
  const best = new Map<string, { chunk: ChunkMeta; score: number }>();
  for (const h of hits) {
    const prev = best.get(h.chunk.id);
    if (!prev || h.score > prev.score) best.set(h.chunk.id, h);
  }
  return [...best.values()]
    .sort((a, b) => b.score - a.score)
    .map(({ chunk, score }) => ({
      kind: chunk.kind,
      id: chunk.id,
      title: chunk.title,
      source: chunk.source,
      date: chunk.date,
      region: chunk.region,
      score,
    }));
}

function sseEvent(obj: unknown): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(obj)}\n\n`);
}

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const userMessages = messages.filter((m) => m && m.role === "user" && typeof m.content === "string" && m.content.trim());
  if (userMessages.length === 0) {
    return Response.json({ error: "No user message" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return Response.json(
      { error: "Rate limit exceeded", retryAfterSec: limit.retryAfterSec },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  const query = userMessages[userMessages.length - 1].content.trim();

  // Retrieval phase. Failures here should surface before we open the stream
  // so the client gets a normal HTTP error instead of a half-open SSE.
  //
  // Pure semantic top-k misses literal-ID lookups ("what's in DOC-031?") because
  // "DOC-" and "DOW-UAP-D" land close in the embedding space. We detect explicit
  // IDs in the query and prepend their chunks before the semantic results.
  let hits: Array<{ chunk: ChunkMeta; score: number; idx: number }>;
  try {
    const index = loadIndex();
    const qe = await embedQuery(query);
    const semantic = topK(qe, 6, index);

    const idMatches = [...query.matchAll(/\b(DOC-\d+|PURSUE-\d+)\b/gi)]
      .map((m) => m[1].toUpperCase());
    const explicitIds = new Set(idMatches);
    if (explicitIds.size === 0) {
      hits = semantic;
    } else {
      const explicit: typeof semantic = [];
      for (let i = 0; i < index.chunks.length; i++) {
        const c = index.chunks[i];
        if (explicitIds.has(c.id) && c.chunkIdx === 0) {
          explicit.push({ chunk: c, score: 1.0, idx: i });
        }
      }
      const semanticFiltered = semantic.filter((h) => !explicitIds.has(h.chunk.id));
      hits = [...explicit, ...semanticFiltered].slice(0, 6);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "retrieval failed";
    return Response.json({ error: message }, { status: 500 });
  }

  const passages = formatPassages(hits);
  const citations = dedupeCitations(hits);
  const systemPrompt = buildSystemPrompt(passages);

  // Last 6 turns of conversation for short-term coherence; older context is
  // discarded to keep token usage predictable.
  const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        controller.enqueue(sseEvent({ type: "citations", citations }));

        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          stream: true,
          temperature: 0.2,
          max_tokens: 700,
          messages: [
            { role: "system", content: systemPrompt },
            ...history,
          ],
        });

        for await (const part of completion) {
          const delta = part.choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(sseEvent({ type: "chunk", text: delta }));
        }

        controller.enqueue(sseEvent({ type: "done" }));
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "stream failed";
        try {
          controller.enqueue(sseEvent({ type: "error", message }));
        } catch {
          // Controller may already be closed; nothing actionable.
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
