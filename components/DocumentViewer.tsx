"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Filter, X, Download, ExternalLink } from "lucide-react";
import { documents } from "@/data/documents";
import { incidents } from "@/data/incidents";
import { SOURCE_LABEL } from "@/lib/classifications";
import RedactionBar from "@/components/RedactionBar";
import { useSelectedId, setSelectedId } from "@/lib/store";

type ParsedPart = { type: "text" | "redact"; value: string };

function parseDocumentBody(body: string): ParsedPart[] {
  const parts: ParsedPart[] = [];
  const regex = /\[\[REDACT:([^\]]+)\]\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(body)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: body.slice(lastIndex, match.index) });
    }
    parts.push({ type: "redact", value: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < body.length) {
    parts.push({ type: "text", value: body.slice(lastIndex) });
  }
  return parts;
}

export default function DocumentViewer() {
  const selectedId = useSelectedId();

  const selectedIncident = useMemo(
    () => (selectedId ? incidents.find((i) => i.id === selectedId) ?? null : null),
    [selectedId],
  );

  const visibleDocs = useMemo(() => {
    if (!selectedId) return documents;
    return documents.filter((d) => d.incidentIds?.includes(selectedId));
  }, [selectedId]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedId]);

  const total = documents.length;
  const visibleCount = visibleDocs.length;
  const filterActive = !!selectedIncident;

  const safeIndex =
    visibleCount === 0 ? 0 : Math.min(activeIndex, visibleCount - 1);
  const doc = visibleCount > 0 ? visibleDocs[safeIndex] : null;

  // Lazy-load extracted PDF transcripts.
  const isStub = !!doc && doc.body.includes("FULL TEXT NOT YET INDEXED");
  const [extractedBody, setExtractedBody] = useState<string | null>(null);
  const [fetchingTranscript, setFetchingTranscript] = useState(false);

  useEffect(() => {
    setExtractedBody(null);
    if (!doc || !isStub) {
      setFetchingTranscript(false);
      return;
    }
    let cancelled = false;
    setFetchingTranscript(true);
    fetch(`/extracted/${doc.id}.txt`)
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        if (cancelled) return;
        setExtractedBody(text ?? null);
      })
      .catch(() => {
        if (cancelled) return;
        setExtractedBody(null);
      })
      .finally(() => {
        if (cancelled) return;
        setFetchingTranscript(false);
      });
    return () => {
      cancelled = true;
    };
  }, [doc?.id, isStub]);

  const renderBody = extractedBody ?? (doc ? doc.body : "");
  const parts = doc ? parseDocumentBody(renderBody) : [];

  return (
    <section
      className="bg-panel border border-border rounded-[4px] flex flex-col"
      aria-label="Document viewer"
    >
      {/* Panel header */}
      <div className="h-[40px] px-4 flex items-center justify-between border-b border-border">
        <h2 className="text-[14px] font-semibold text-text">
          Declassified documents
        </h2>
        <span className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute">
          {filterActive ? (
            <>
              <span className="mono tnum normal-case tracking-normal">
                {visibleCount}
              </span>{" "}
              / {total} indexed
            </>
          ) : (
            <>
              <span className="mono tnum normal-case tracking-normal">
                {total}
              </span>{" "}
              documents · 113 with full text
            </>
          )}
        </span>
      </div>

      {/* Filter banner — only when an incident is selected */}
      {selectedIncident && (
        <div className="px-3 py-2 flex items-center justify-between gap-2 border-b border-border bg-panel-2">
          <div className="flex items-center gap-2 text-[12px] text-accent">
            <Filter size={12} strokeWidth={1.5} />
            <span>
              Filtered to{" "}
              <span className="mono">{selectedIncident.id}</span>
              {" — "}
              {selectedIncident.location}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="inline-flex items-center gap-1 text-[12px] text-text-dim hover:text-accent"
          >
            <X size={12} strokeWidth={1.5} />
            Clear filter
          </button>
        </div>
      )}

      {/* Body — two-pane */}
      <div className="flex">
        {/* Left rail */}
        <div
          className="w-[280px] shrink-0 border-r border-border overflow-y-auto"
          style={{
            position: "sticky",
            top: "76px",
            alignSelf: "flex-start",
            maxHeight: "calc(100vh - 76px)",
          }}
        >
          {visibleCount === 0 ? (
            <div className="px-4 py-12 text-center">
              <div className="text-[12px] font-medium text-text-dim mb-1">
                No documents indexed for this incident
              </div>
              <div className="text-[11px] text-text-mute">Try clearing the filter.</div>
            </div>
          ) : (
            visibleDocs.map((d, i) => {
              const isActive = i === safeIndex;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={[
                    "w-full text-left border-b border-border hover:bg-panel-2 transition-colors block px-3 py-2.5",
                    isActive ? "bg-accent-tint" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="mono text-[11px] text-text-mute">
                      {d.id}
                    </span>
                    <span className="bg-panel border border-border px-1.5 py-0.5 text-[10px] font-medium text-text-dim rounded-[1px]">
                      {SOURCE_LABEL[d.source]}
                    </span>
                  </div>
                  <div
                    className="text-[13px] text-text leading-tight"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {d.title}
                  </div>
                  <div className="mono text-[11px] text-text-mute mt-1">
                    {d.date} · {d.classification}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right pane */}
        <div className="flex-1 bg-panel-2/40 min-w-0">
          <AnimatePresence mode="wait">
            {doc ? (
              <motion.div
                key={`${selectedId ?? "all"}-${doc.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="p-6 max-w-4xl mx-auto"
              >
                {/* Header block */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-panel border border-border px-2 py-0.5 text-[11px] font-medium text-text-dim rounded-[2px]">
                    {SOURCE_LABEL[doc.source]}
                  </span>
                  <span className="mono text-[11px] text-text-mute">
                    {doc.id}
                  </span>
                  <span className="text-text-mute">·</span>
                  <span className="mono text-[11px] text-text-mute">
                    {doc.classification}
                  </span>
                </div>
                <h3 className="text-[20px] font-semibold text-text leading-tight tracking-[-0.005em] mb-2">
                  {doc.title}
                </h3>
                <div className="text-[12px] text-text-dim mb-5">
                  <span className="mono">{doc.date}</span>
                  <span className="text-text-mute mx-2">·</span>
                  {doc.pageCount ?? "—"} pages
                </div>

                <div className="border-t border-border mb-5" />

                {isStub && fetchingTranscript && (
                  <div className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute mb-3">
                    Fetching transcript…
                  </div>
                )}

                {/* Document body */}
                <div className="bg-bg border border-border-bright rounded-[2px] p-5 my-2 overflow-hidden">
                  <div className="mono text-[12.5px] leading-[1.6] text-text-dim whitespace-pre-wrap">
                    {parts.map((p, i) =>
                      p.type === "text" ? (
                        <span key={i}>{p.value}</span>
                      ) : (
                        <RedactionBar key={i} reason={p.value} />
                      ),
                    )}
                  </div>
                </div>

                {doc.localPath && (
                  <div className="mt-6">
                    <div className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute mb-2">
                      Embedded original
                    </div>
                    <iframe
                      src={`${doc.localPath}#toolbar=0&navpanes=0`}
                      title={doc.title}
                      className="w-full h-[600px] border border-border bg-bg rounded-[2px]"
                    />
                  </div>
                )}

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3 text-[12px]">
                  <span className="mono text-text-mute">
                    {doc.id} · Page 1 of {doc.pageCount ?? 1}
                  </span>
                  <div className="flex items-center gap-3">
                    {doc.localPath && (
                      <a
                        href={doc.localPath}
                        download
                        className="inline-flex items-center gap-1 text-text-dim hover:text-accent"
                      >
                        Download
                        <Download size={11} strokeWidth={1.5} />
                      </a>
                    )}
                    <a
                      href={doc.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:text-text"
                    >
                      View on war.gov
                      <ExternalLink size={11} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`empty-${selectedId ?? "all"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="h-full flex flex-col items-center justify-center px-6 py-16 text-center"
              >
                <div className="text-[14px] font-medium text-text-dim mb-1">
                  No documents linked
                </div>
                <div className="text-[12px] text-text-mute">
                  Select an incident with indexed documents.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
