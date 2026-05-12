"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, MessageCircle, Send, X } from "lucide-react";

// Floating "Ask the archive" chat widget. Streams Server-Sent Events from
// POST /api/chat (parsed manually — EventSource only supports GET). Three
// SSE event types: citations (once, early), chunk (token group), done.
// Citation chips link out to /document/<id> or /incident/<id>.

type Role = "user" | "assistant";

type CitationKind = "document" | "incident" | string;

type Citation = {
  kind: CitationKind;
  id: string;
  title?: string;
  source?: string;
  date?: string;
  region?: string;
  score?: number;
};

type Message = {
  role: Role;
  content: string;
  citations?: Citation[];
  streaming?: boolean;
  errored?: boolean;
};

const SUGGESTED_PROMPTS = [
  "What did Senator Russell see in 1955?",
  "What's in the Range Fouler reports?",
  "Tell me about the Roswell FBI memo",
];

const ARCHIVE_FILE_COUNT = 162;

function citationHref(c: Citation): string {
  const id = c.id.toLowerCase();
  if (c.kind === "incident") return `/incident/${id}`;
  return `/document/${id}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Focus the input on open and bind Esc to close.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => textareaRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Auto-scroll on new content.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Auto-grow textarea up to ~3 lines.
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const lineHeight = 20;
    const maxH = lineHeight * 3 + 16;
    ta.style.height = `${Math.min(ta.scrollHeight, maxH)}px`;
  }, [input]);

  // Cancel any in-flight stream on unmount.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;
      setRateLimitError(null);
      setInput("");

      // Snapshot history *with* the new user message so the request payload
      // doesn't lose it to a stale closure.
      const nextHistory: Message[] = [
        ...messages,
        { role: "user", content: trimmed },
      ];
      const placeholder: Message = {
        role: "assistant",
        content: "",
        streaming: true,
      };
      setMessages([...nextHistory, placeholder]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextHistory.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          let parsed: { error?: string; retryAfterSec?: number } = {};
          try {
            parsed = await res.json();
          } catch {
            /* non-JSON error body */
          }
          if (res.status === 429) {
            const secs = parsed.retryAfterSec ?? 30;
            setRateLimitError(
              `Rate limit exceeded — try again in ${secs} seconds.`,
            );
          } else {
            setRateLimitError(
              parsed.error ?? `Request failed (${res.status}).`,
            );
          }
          setMessages((prev) => {
            const out = prev.slice(0, -1);
            return [
              ...out,
              {
                role: "assistant",
                content: parsed.error ?? "Request failed.",
                streaming: false,
                errored: true,
              },
            ];
          });
          return;
        }

        if (!res.body) throw new Error("No response body");

        // Manual SSE parse: stream is a sequence of `data: <json>\n\n` frames.
        // EventSource doesn't help us (it's GET-only); ReadableStream + a
        // small line-buffer is the simplest correct approach.
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let idx: number;
          while ((idx = buffer.indexOf("\n\n")) !== -1) {
            const frame = buffer.slice(0, idx);
            buffer = buffer.slice(idx + 2);
            const line = frame.split("\n").find((l) => l.startsWith("data:"));
            if (!line) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            let evt: {
              type: string;
              text?: string;
              citations?: Citation[];
              message?: string;
            };
            try {
              evt = JSON.parse(payload);
            } catch {
              continue;
            }

            if (evt.type === "chunk" && typeof evt.text === "string") {
              const t = evt.text;
              setMessages((prev) => {
                const out = prev.slice();
                const last = out[out.length - 1];
                if (last && last.role === "assistant") {
                  out[out.length - 1] = {
                    ...last,
                    content: last.content + t,
                  };
                }
                return out;
              });
            } else if (evt.type === "citations" && evt.citations) {
              const cites = evt.citations;
              setMessages((prev) => {
                const out = prev.slice();
                const last = out[out.length - 1];
                if (last && last.role === "assistant") {
                  out[out.length - 1] = { ...last, citations: cites };
                }
                return out;
              });
            } else if (evt.type === "done") {
              setMessages((prev) => {
                const out = prev.slice();
                const last = out[out.length - 1];
                if (last && last.role === "assistant") {
                  out[out.length - 1] = { ...last, streaming: false };
                }
                return out;
              });
            } else if (evt.type === "error") {
              const msg = evt.message ?? "Stream error.";
              setMessages((prev) => {
                const out = prev.slice();
                const last = out[out.length - 1];
                if (last && last.role === "assistant") {
                  out[out.length - 1] = {
                    ...last,
                    content: msg,
                    streaming: false,
                    errored: true,
                  };
                }
                return out;
              });
            }
          }
        }
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
        setMessages((prev) => {
          const out = prev.slice();
          const last = out[out.length - 1];
          if (last && last.role === "assistant") {
            out[out.length - 1] = {
              ...last,
              content:
                last.content ||
                "Connection failed. Try again in a moment.",
              streaming: false,
              errored: true,
            };
          }
          return out;
        });
      } finally {
        setStreaming(false);
        abortRef.current = null;
        // Make sure no message is stuck in streaming state.
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (!last || !last.streaming) return prev;
          const out = prev.slice();
          out[out.length - 1] = { ...last, streaming: false };
          return out;
        });
      }
    },
    [messages, streaming],
  );

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    send(input);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ask the archive"
          title="Ask the archive"
          className="group fixed bottom-8 right-8 z-50 size-14 inline-flex items-center justify-center bg-panel border border-border-bright rounded-[2px] text-text hover:bg-panel-2 hover:-translate-y-px transition-[filter,transform,background-color] shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        >
          <UfoIcon className="size-7 text-accent drop-shadow-[0_0_10px_rgba(76,144,240,0.55)] drop-shadow-[0_0_20px_rgba(76,144,240,0.25)] group-hover:drop-shadow-[0_0_12px_rgba(76,144,240,0.75)] group-hover:drop-shadow-[0_0_24px_rgba(76,144,240,0.4)] transition-[filter]" />
          <span
            role="tooltip"
            className="pointer-events-none absolute right-[calc(100%+8px)] top-1/2 -translate-y-1/2 -translate-x-1 px-2 py-1 bg-panel border border-border-bright rounded-[2px] mono text-[11px] font-medium tracking-[0.06em] uppercase text-text whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-[opacity,transform] duration-150"
          >
            Ask the archive
          </span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Ask the archive"
          className="fixed z-50 bg-panel border border-border-bright rounded-[4px] shadow-[0_16px_48px_rgba(0,0,0,0.6)] flex flex-col
            inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[calc(100vh-3rem)]"
        >
          {/* Header */}
          <div className="h-10 px-4 flex items-center justify-between border-b border-border shrink-0">
            <div className="flex flex-col leading-tight">
              <span className="mono text-[11px] font-medium tracking-[0.06em] uppercase text-text">
                Ask the archive
              </span>
              <span className="text-[11px] text-text-mute">
                Grounded in {ARCHIVE_FILE_COUNT} declassified UAP files
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-[2px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.12)]"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>

          {/* Rate-limit / error banner */}
          {rateLimitError && (
            <div className="px-4 py-2 border-b border-border bg-[rgba(205,66,70,0.08)] text-[12px] text-[#f5817e] flex items-start justify-between gap-2">
              <span>{rateLimitError}</span>
              <button
                type="button"
                onClick={() => setRateLimitError(null)}
                aria-label="Dismiss"
                className="text-text-mute hover:text-text shrink-0"
              >
                <X size={12} strokeWidth={1.5} />
              </button>
            </div>
          )}

          {/* Messages */}
          <div
            ref={scrollerRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          >
            {messages.length === 0 ? (
              <EmptyState
                onPick={(p) => send(p)}
                disabled={streaming}
              />
            ) : (
              messages.map((m, i) => (
                <MessageRow key={i} message={m} />
              ))
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="border-t border-border p-2 flex items-end gap-2 shrink-0"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={streaming}
              rows={1}
              placeholder={
                streaming ? "Awaiting response…" : "Ask about an incident, document, or agency…"
              }
              className="flex-1 resize-none bg-bg border border-border rounded-[2px] px-2.5 py-1.5 text-[13px] text-text placeholder:text-text-mute focus:outline-2 focus:outline-[rgba(76,144,240,0.5)] focus:border-accent disabled:opacity-60 leading-[20px] max-h-[76px]"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              aria-label="Send message"
              className="h-[30px] w-[30px] inline-flex items-center justify-center bg-accent-fill hover:bg-[#215db0] text-white rounded-[2px] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={13} strokeWidth={1.75} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function EmptyState({
  onPick,
  disabled,
}: {
  onPick: (p: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-2.5">
        <div className="w-6 h-6 shrink-0 inline-flex items-center justify-center rounded-[2px] bg-[rgba(76,144,240,0.12)] text-accent">
          <MessageCircle size={13} strokeWidth={1.5} />
        </div>
        <p className="text-[13px] leading-relaxed text-text-dim">
          Ask about specific incidents, documents, or agencies. Answers come
          only from the indexed archive — no hallucinations.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute mb-0.5">
          Try
        </div>
        {SUGGESTED_PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            disabled={disabled}
            onClick={() => onPick(p)}
            className="text-left text-[13px] px-2.5 py-2 bg-bg border border-border hover:border-border-bright hover:bg-panel-2 rounded-[2px] text-text-dim hover:text-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageRow({ message }: { message: Message }) {
  const isUser = message.role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] px-3 py-2 bg-accent-tint border border-[rgba(76,144,240,0.35)] rounded-[2px] text-[13px] text-text whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    );
  }

  const empty = !message.content && message.streaming;

  return (
    <div className="flex items-start gap-2.5">
      <div className="w-6 h-6 shrink-0 inline-flex items-center justify-center rounded-[2px] bg-[rgba(76,144,240,0.12)] text-accent">
        <Bot size={13} strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        {empty ? (
          <PulsingDot />
        ) : (
          <div
            className={[
              "text-[13px] leading-relaxed whitespace-pre-wrap break-words",
              message.errored ? "text-[#f5817e]" : "text-text-dim",
            ].join(" ")}
          >
            {message.content}
            {message.streaming && message.content && (
              <span
                aria-hidden
                className="inline-block w-[6px] h-[12px] -mb-[1px] ml-[2px] bg-accent align-baseline animate-pulse"
              />
            )}
          </div>
        )}

        {message.citations && message.citations.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.citations.map((c, i) => (
              <Link
                key={`${c.id}-${i}`}
                href={citationHref(c)}
                onClick={(e) => e.stopPropagation()}
                title={c.title ?? c.id}
                className="mono text-[11px] px-1.5 h-5 inline-flex items-center rounded-[2px] bg-[rgba(95,107,124,0.18)] hover:bg-[rgba(76,144,240,0.18)] text-text-dim hover:text-accent border border-border hover:border-[rgba(76,144,240,0.5)] transition-colors"
              >
                {c.id}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PulsingDot() {
  return (
    <div className="inline-flex items-center gap-1.5 h-5">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      <span className="text-[11px] text-text-mute">Searching archive…</span>
    </div>
  );
}

// Minimal flying-saucer silhouette in line art. Strokes use currentColor so
// the icon picks up whatever text color the trigger button sets.
function UfoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* dome */}
      <path d="M7.5 12 Q12 5 16.5 12" />
      {/* dome window */}
      <circle cx="12" cy="9" r="0.7" fill="currentColor" stroke="none" />
      {/* disc */}
      <ellipse cx="12" cy="12.6" rx="9" ry="2.2" />
      {/* under-disc lights */}
      <path d="M8.5 14.5 v1" />
      <path d="M12 14.8 v1.5" />
      <path d="M15.5 14.5 v1" />
    </svg>
  );
}
