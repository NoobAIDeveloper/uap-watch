"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Filter, X, Download } from "lucide-react";
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

  // Reset active index whenever the visible list changes (filter on/off or change of incident).
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedId]);

  const total = documents.length;
  const visibleCount = visibleDocs.length;
  const filterActive = !!selectedIncident;
  const counterColor = filterActive ? "text-accent" : "text-text-mute";

  const safeIndex =
    visibleCount === 0 ? 0 : Math.min(activeIndex, visibleCount - 1);
  const doc = visibleCount > 0 ? visibleDocs[safeIndex] : null;
  const parts = doc ? parseDocumentBody(doc.body) : [];

  return (
    <div className="bg-panel border border-border rounded-sm flex flex-col h-[760px]">
      {/* Header strip */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2
          className="text-base uppercase tracking-widest text-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          DECLASSIFIED DOCUMENT VIEWER
        </h2>
        <div
          className={[
            "text-[10px] tracking-widest uppercase",
            counterColor,
          ].join(" ")}
        >
          {filterActive ? `${visibleCount}/${total}` : `${total}`} INDEXED
        </div>
      </div>

      {/* Filter banner */}
      {selectedIncident && (
        <div className="bg-panel-2 border-b border-border-bright px-3 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-accent text-[10px] tracking-widest uppercase">
            <Filter className="w-3 h-3" aria-hidden />
            <span>
              FILTERED BY: {selectedIncident.id} //{" "}
              {selectedIncident.location.toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-1 text-text-dim hover:text-accent transition-colors text-[10px] tracking-widest uppercase"
          >
            <X className="w-3 h-3" aria-hidden />
            CLEAR FILTER
          </button>
        </div>
      )}

      {/* Body — two-pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left rail — document list */}
        <div className="w-[300px] shrink-0 border-r border-border overflow-y-auto">
          {visibleCount === 0 ? (
            <div className="px-4 py-12 text-center">
              <div className="text-text-mute text-[10px] tracking-widest uppercase">
                // NO DOCUMENTS INDEXED FOR THIS INCIDENT
              </div>
              <div className="text-text-mute text-[9px] tracking-widest uppercase mt-2">
                TRY CLEARING FILTER
              </div>
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
                    "w-full text-left border-b border-border hover:bg-panel-2 transition-colors group block",
                    isActive
                      ? "bg-panel-2 border-l-2 border-l-accent pl-[10px] pr-3 py-3"
                      : "border-l-2 border-l-transparent pl-[10px] pr-3 py-3",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-text-mute text-[10px] tracking-widest uppercase font-mono">
                      {d.id}
                    </span>
                    <span className="bg-bg border border-border px-1.5 py-0.5 text-[9px] tracking-widest uppercase text-text-dim">
                      {SOURCE_LABEL[d.source]}
                    </span>
                  </div>
                  <div
                    className="text-sm text-text leading-tight uppercase tracking-wide overflow-hidden"
                    style={{
                      fontFamily: "var(--font-display)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {d.title}
                  </div>
                  <div className="text-[10px] text-text-mute mt-1 tracking-widest uppercase font-mono">
                    {d.date} <span className="text-text-mute">·</span>{" "}
                    {d.classification}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right pane — viewer */}
        <div className="flex-1 overflow-y-auto bg-panel-2">
          <AnimatePresence mode="wait">
            {doc ? (
              <motion.div
                key={`${selectedId ?? "all"}-${doc.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="p-6 max-w-4xl mx-auto relative"
              >
                {/* DECLASSIFIED stamp top-right */}
                <div
                  className="absolute top-6 right-6 border-dashed border-2 border-status-unresolved text-status-unresolved px-3 py-1.5 tracking-widest text-xl uppercase pointer-events-none select-none"
                  style={{
                    transform: "rotate(-12deg)",
                    opacity: 0.85,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  <div className="leading-none">DECLASSIFIED</div>
                  <div className="text-[8px] tracking-[0.2em] mt-1 leading-none">
                    RELEASE 2026-05-08
                  </div>
                </div>

                {/* Header block */}
                <div className="flex flex-col gap-2 max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <span className="bg-bg border border-border px-2 py-0.5 text-[10px] tracking-widest uppercase text-text-dim">
                      {SOURCE_LABEL[doc.source]}
                    </span>
                    <a
                      href={doc.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-dim hover:text-accent transition-colors text-[10px] tracking-widest uppercase"
                    >
                      VIEW ON WAR.GOV →
                    </a>
                  </div>
                  <h3
                    className="text-2xl text-text uppercase tracking-wide leading-tight mt-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {doc.title}
                  </h3>
                  <div className="text-xs text-text-dim tracking-widest uppercase">
                    {doc.date} <span className="text-text-mute">·</span>{" "}
                    {doc.classification}{" "}
                    <span className="text-text-mute">·</span>{" "}
                    {doc.pageCount ?? "—"} PAGES
                  </div>
                </div>

                {/* Hairline divider */}
                <div className="border-t border-border my-4" />

                {/* Synthetic memo body */}
                <div
                  className="bg-panel-2/40 border border-border-bright p-6 my-4 overflow-hidden"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 3px)",
                  }}
                >
                  <div className="font-mono text-[13px] leading-relaxed text-text whitespace-pre-wrap">
                    {parts.map((p, i) =>
                      p.type === "text" ? (
                        <span key={i} className="whitespace-pre-wrap">
                          {p.value}
                        </span>
                      ) : (
                        <RedactionBar key={i} reason={p.value} />
                      ),
                    )}
                  </div>
                </div>

                {/* Embedded PDF if available */}
                {doc.localPath && (
                  <div className="mt-6">
                    <div className="text-text-mute text-[10px] tracking-widest uppercase mb-2">
                      // EMBEDDED ORIGINAL //
                    </div>
                    <iframe
                      src={`${doc.localPath}#toolbar=0&navpanes=0`}
                      title={doc.title}
                      className="w-full h-[600px] border border-border bg-bg"
                    />
                  </div>
                )}

                {/* Footer button row */}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3 text-[10px] tracking-widest uppercase">
                  <div className="text-text-mute font-mono">
                    {doc.id} <span className="text-text-mute">//</span> PAGE 1
                    OF {doc.pageCount ?? 1}
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.localPath && (
                      <a
                        href={doc.localPath}
                        download
                        className="flex items-center gap-1 text-text-dim hover:text-accent transition-colors"
                      >
                        DOWNLOAD ORIGINAL
                        <Download className="w-3 h-3" aria-hidden />
                      </a>
                    )}
                    <a
                      href={doc.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-dim hover:text-accent transition-colors"
                    >
                      VIEW ON WAR.GOV →
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
                <div className="text-text-mute text-xs tracking-widest uppercase">
                  // SELECT AN INCIDENT WITH INDEXED DOCUMENTS //
                </div>
                <div className="text-text-mute text-[10px] tracking-widest uppercase mt-2">
                  NO DOCUMENTS LINKED TO {selectedIncident?.id ?? "CURRENT FILTER"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
