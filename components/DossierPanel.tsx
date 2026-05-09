"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Crosshair, ExternalLink, X } from "lucide-react";
import { incidents } from "@/data/incidents";
import type { Incident } from "@/lib/types";
import { STATUS_COLOR, STATUS_LABEL, STATUS_TAG_CLASS, SOURCE_LABEL } from "@/lib/classifications";
import { useSelectedId, setSelectedId } from "@/lib/store";

// Right-rail dossier drawer. Always present in the layout (sticky), but
// shows the "no incident selected" state when nothing is selected. Width
// is now 1/3 of the table+dossier row (was 380px fixed, ~26% — too narrow
// per user feedback).
//
// No bracket-corner decorations. No bg-bg classification strip header
// (that's chrome theatrics). Title + status tag in the header, metadata
// grid, summary/details/quote/source body.
export default function DossierPanel() {
  const selectedId = useSelectedId();
  const incident = useMemo<Incident | undefined>(
    () => incidents.find((i) => i.id === selectedId),
    [selectedId],
  );

  return (
    <div className="bg-panel border border-border rounded-[4px] h-[640px] flex flex-col">
      {/* Header */}
      <div className="h-[40px] px-4 flex items-center justify-between border-b border-border">
        <h2 className="text-[14px] font-semibold text-text">Dossier</h2>
        {incident && (
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="w-7 h-7 inline-flex items-center justify-center rounded-[2px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.12)]"
            aria-label="Close dossier"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {!incident ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <Crosshair
              size={28}
              strokeWidth={1.5}
              className="text-text-mute mx-auto mb-3"
            />
            <div className="text-[14px] font-medium text-text-dim mb-1">
              No incident selected
            </div>
            <div className="text-[12px] text-text-mute">
              Select a pin or row to load the dossier.
            </div>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="mono text-[18px] font-semibold text-text">
                {incident.id}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 h-5 px-2 rounded-[2px] text-[11px] font-medium ${STATUS_TAG_CLASS[incident.status]}`}
              >
                <span
                  aria-hidden
                  className="inline-block w-[6px] h-[6px] rounded-[1px]"
                  style={{ backgroundColor: STATUS_COLOR[incident.status] }}
                />
                {STATUS_LABEL[incident.status]}
              </span>
            </div>

            {/* Metadata grid — 2x2 with a single hairline grid */}
            <div className="grid grid-cols-2 gap-px bg-border border border-border mb-4">
              <Cell label="Date" value={incident.dateLabel} mono />
              <Cell label="Location" value={incident.location} />
              <Cell label="Region" value={incident.region} />
              <Cell
                label="Witnesses"
                value={
                  incident.witnessCount === "REDACTED" ? (
                    <span className="inline-block w-16 h-3 bg-black/85 align-middle rounded-[1px]" />
                  ) : (
                    incident.witnessCount
                  )
                }
                mono
              />
            </div>

            <SectionLabel>Summary</SectionLabel>
            <p className="text-[13px] text-text-dim leading-relaxed mb-4">
              {incident.summary}
            </p>

            <SectionLabel>Details</SectionLabel>
            <p className="text-[13px] text-text-dim leading-relaxed mb-4">
              {incident.details}
            </p>

            {incident.keyQuote ? (
              <>
                <SectionLabel>Cited</SectionLabel>
                <blockquote className="border-l-2 border-accent pl-3 py-1 mb-4 italic text-[14px] text-text leading-snug">
                  {incident.keyQuote}
                </blockquote>
              </>
            ) : null}

            {/* Source */}
            <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
              <span className="inline-flex items-center h-5 px-2 bg-[rgba(95,107,124,0.18)] rounded-[2px] text-[11px] font-medium text-text-dim">
                {SOURCE_LABEL[incident.source]}
              </span>
              <a
                href={incident.documentUrl ?? "https://www.war.gov/UFO/"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[12px] text-accent hover:text-text"
              >
                View source
                <ExternalLink size={11} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function Cell({
  label,
  value,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="bg-panel p-2.5">
      <div className="text-[11px] font-medium text-text-dim mb-1">{label}</div>
      <div className={`text-[13px] text-text ${mono ? "mono tnum" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute mb-1.5">
      {children}
    </div>
  );
}
