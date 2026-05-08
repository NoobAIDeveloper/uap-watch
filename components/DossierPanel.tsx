"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Crosshair } from "lucide-react";
import { incidents } from "@/data/incidents";
import type { Incident } from "@/lib/types";
import { STATUS_COLOR, STATUS_LABEL, SOURCE_LABEL } from "@/lib/classifications";
import { useSelectedId } from "@/lib/store";

function BracketCorner({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const base =
    "pointer-events-none absolute text-accent w-2 h-2";
  const placement = {
    tl: "top-1.5 left-1.5",
    tr: "top-1.5 right-1.5",
    bl: "bottom-1.5 left-1.5",
    br: "bottom-1.5 right-1.5",
  }[position];

  // Build the L-shape via two divs
  const horizontal: Record<typeof position, string> = {
    tl: "top-0 left-0 w-2 h-px bg-accent",
    tr: "top-0 right-0 w-2 h-px bg-accent",
    bl: "bottom-0 left-0 w-2 h-px bg-accent",
    br: "bottom-0 right-0 w-2 h-px bg-accent",
  };
  const vertical: Record<typeof position, string> = {
    tl: "top-0 left-0 w-px h-2 bg-accent",
    tr: "top-0 right-0 w-px h-2 bg-accent",
    bl: "bottom-0 left-0 w-px h-2 bg-accent",
    br: "bottom-0 right-0 w-px h-2 bg-accent",
  };

  return (
    <span className={`${base} ${placement}`} aria-hidden>
      <span className={`absolute ${horizontal[position]}`} />
      <span className={`absolute ${vertical[position]}`} />
    </span>
  );
}

function MetaCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-border p-2">
      <div className="text-text-mute text-[9px] tracking-widest uppercase">
        {label}
      </div>
      <div className="text-text text-xs mt-1 font-mono break-words">
        {children}
      </div>
    </div>
  );
}

function StatusBadge({ incident }: { incident: Incident }) {
  return (
    <span className="inline-flex items-center gap-2 px-2 py-1 border border-border rounded-sm">
      <span
        aria-hidden
        className="inline-block"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: STATUS_COLOR[incident.status],
        }}
      />
      <span className="uppercase tracking-widest text-[10px] text-text">
        {STATUS_LABEL[incident.status]}
      </span>
    </span>
  );
}

export default function DossierPanel() {
  const selectedId = useSelectedId();
  const incident = useMemo<Incident | undefined>(
    () => incidents.find((i) => i.id === selectedId),
    [selectedId]
  );

  return (
    <div className="bg-panel border border-border rounded-sm overflow-hidden h-full min-h-[540px] flex flex-col relative">
      {!incident ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="border border-dashed border-border rounded-sm w-[70%] py-10 px-6 flex flex-col items-center text-center gap-3">
            <Crosshair size={24} className="text-text-mute" />
            <div
              className="text-text-dim uppercase tracking-widest text-base"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NO INCIDENT SELECTED
            </div>
            <div className="text-text-mute text-[10px] tracking-widest uppercase">
              SELECT A PIN OR ROW TO LOAD DOSSIER
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Bracket corners */}
          <BracketCorner position="tl" />
          <BracketCorner position="tr" />
          <BracketCorner position="bl" />
          <BracketCorner position="br" />

          {/* Top classification strip */}
          <div className="bg-bg border-b border-border-bright px-3 py-1.5">
            <span className="text-[10px] tracking-[0.2em] text-accent">
              {`// ${incident.classification} // ${incident.id} // ${SOURCE_LABEL[incident.source]} //`}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {/* Header line */}
              <div className="flex items-center justify-between gap-3">
                <h3
                  className="text-text uppercase"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", lineHeight: 1.1 }}
                >
                  {incident.id}
                </h3>
                <StatusBadge incident={incident} />
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-2">
                <MetaCell label="DATE">{incident.dateLabel}</MetaCell>
                <MetaCell label="LOCATION">{incident.location}</MetaCell>
                <MetaCell label="REGION">{incident.region}</MetaCell>
                <MetaCell label="WITNESSES">
                  {incident.witnessCount === "REDACTED" ? (
                    <span
                      aria-label="REDACTED"
                      className="inline-block h-3 w-20 bg-black/80 align-middle"
                    />
                  ) : (
                    incident.witnessCount
                  )}
                </MetaCell>
              </div>

              {/* SUMMARY */}
              <div>
                <div className="text-text-mute tracking-widest text-[10px] uppercase mb-1">
                  // SUMMARY //
                </div>
                <p className="text-text text-sm leading-relaxed">
                  {incident.summary}
                </p>
              </div>

              {/* DETAILS */}
              <div>
                <div className="text-text-mute tracking-widest text-[10px] uppercase mb-1">
                  // DETAILS //
                </div>
                <p className="text-text text-sm leading-relaxed">
                  {incident.details}
                </p>
              </div>

              {/* keyQuote */}
              {incident.keyQuote ? (
                <div>
                  <div className="text-text-mute tracking-widest text-[10px] uppercase mb-1">
                    // CITED //
                  </div>
                  <blockquote
                    className="border-l-2 border-accent pl-3 py-1 italic text-text text-base"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {incident.keyQuote}
                  </blockquote>
                </div>
              ) : null}

              {/* Source link */}
              <div className="pt-2 border-t border-border flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 px-2 py-1 border border-border rounded-sm text-[10px] tracking-widest text-text-dim uppercase">
                  {SOURCE_LABEL[incident.source]}
                </span>
                <a
                  href={incident.documentUrl ?? "https://www.war.gov/UFO/"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline tracking-widest text-[10px] uppercase"
                >
                  VIEW SOURCE →
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
