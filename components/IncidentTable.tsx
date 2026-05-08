"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { incidents } from "@/data/incidents";
import type { Incident, SourceAgency } from "@/lib/types";
import { X } from "lucide-react";
import { STATUS_COLOR, STATUS_LABEL, SOURCE_LABEL } from "@/lib/classifications";
import { useSelectedId, setSelectedId } from "@/lib/store";

type Filter = "ALL" | SourceAgency;

const FILTER_ORDER: Filter[] = ["ALL", "FBI", "DOD", "NASA", "STATE", "USAF", "USN"];

const PLACEHOLDER_SOURCES: SourceAgency[] = ["FBI", "DOD", "STATE", "DOD", "FBI"];

type GhostRow = {
  id: string;
  source: SourceAgency;
};

const GHOST_ROWS: GhostRow[] = Array.from({ length: 5 }, (_, i) => ({
  id: `PURSUE-${String(i + 27).padStart(3, "0")}`,
  source: PLACEHOLDER_SOURCES[i] ?? "FBI",
}));

export default function IncidentTable() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [query, setQuery] = useState("");
  const selectedId = useSelectedId();

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      ALL: incidents.length,
      FBI: 0,
      DOD: 0,
      NASA: 0,
      STATE: 0,
      USAF: 0,
      USN: 0,
    };
    for (const inc of incidents) c[inc.source]++;
    return c;
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return incidents.filter((inc) => {
      if (filter !== "ALL" && inc.source !== filter) return false;
      if (!q) return true;
      const haystack = [
        inc.id,
        inc.location,
        inc.summary,
        inc.details,
        inc.keyQuote ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  const handleRowClick = (incident: Incident) => {
    setSelectedId(selectedId === incident.id ? null : incident.id);
  };

  return (
    <div className="bg-panel border border-border rounded-sm">
      {/* Top header strip */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2
          className="text-base text-text uppercase tracking-widest"
          style={{ fontFamily: "var(--font-display)" }}
        >
          INCIDENT REGISTER
        </h2>
        <span className="text-text-mute text-[10px] tracking-widest">
          REGISTRY UPDATED 2026-05-08 16:42:00Z
        </span>
      </div>
      <div className="border-b border-border" />

      {/* Filter strip */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
        <div className="flex items-center gap-1 flex-wrap">
          {FILTER_ORDER.map((f) => {
            const count = counts[f];
            if (count === 0 && f !== "ALL") return null;
            const active = filter === f;
            const label = f === "ALL" ? "ALL" : SOURCE_LABEL[f];
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={[
                  "text-[10px] tracking-[0.2em] uppercase px-2 py-1 transition-colors",
                  active
                    ? "text-accent border-b border-accent"
                    : "text-text-dim hover:text-text border-b border-transparent",
                ].join(" ")}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-3 flex-1 min-w-[160px] justify-end">
          {selectedId && (
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="flex items-center gap-1 text-accent hover:text-text border border-accent/60 hover:border-accent px-2 py-1 rounded-sm text-[10px] tracking-widest uppercase transition-colors"
            >
              <X className="w-3 h-3" aria-hidden />
              CLEAR FILTER
            </button>
          )}
          <div className="flex-1 max-w-[320px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="// QUERY //"
              className="w-full bg-transparent text-xs text-text placeholder:text-text-mute font-mono py-1 border-b border-border focus:border-accent outline-none transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            />
          </div>
        </div>
      </div>
      <div className="border-b border-border" />

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse"
          style={{ minWidth: "720px" }}
        >
          <thead className="sticky top-0 bg-panel z-10">
            <tr className="text-text-mute text-[10px] tracking-[0.2em] uppercase border-b border-border">
              <th className="text-left font-normal py-2 px-3" style={{ width: "110px" }}>ID</th>
              <th className="text-left font-normal py-2 px-3" style={{ width: "90px" }}>DATE</th>
              <th className="text-left font-normal py-2 px-3">LOCATION</th>
              <th className="text-left font-normal py-2 px-3" style={{ width: "90px" }}>SOURCE</th>
              <th className="text-left font-normal py-2 px-3" style={{ width: "160px" }}>CLASSIFICATION</th>
              <th className="text-left font-normal py-2 px-3" style={{ width: "120px" }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              <motion.tr
                key={`group-${filter}-${query}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: "none" }}
              />
            </AnimatePresence>

            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-text-mute py-12 tracking-widest">
                  // NO MATCHES //
                </td>
              </tr>
            ) : (
              visible.map((incident) => {
                const selected = selectedId === incident.id;
                return (
                  <motion.tr
                    key={`${incident.id}-${filter}-${query}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => handleRowClick(incident)}
                    className={[
                      "text-xs text-text cursor-pointer border-b border-border transition-colors",
                      selected
                        ? "bg-accent/10 border-l-2 border-l-accent"
                        : "hover:bg-panel-2 border-l-2 border-l-transparent",
                    ].join(" ")}
                    style={{ height: "36px" }}
                  >
                    <td className="px-3 py-1 font-mono tabular-nums">{incident.id}</td>
                    <td className="px-3 py-1 tabular-nums">{incident.dateLabel}</td>
                    <td className="px-3 py-1">{incident.location}</td>
                    <td className="px-3 py-1">{SOURCE_LABEL[incident.source]}</td>
                    <td className="px-3 py-1 font-mono text-text-dim">
                      {incident.classification}
                    </td>
                    <td className="px-3 py-1">
                      <span className="inline-flex items-center gap-2">
                        <span
                          aria-hidden
                          className="inline-block"
                          style={{
                            width: "8px",
                            height: "8px",
                            backgroundColor: STATUS_COLOR[incident.status],
                          }}
                        />
                        <span className="uppercase tracking-widest text-[10px]">
                          {STATUS_LABEL[incident.status]}
                        </span>
                      </span>
                    </td>
                  </motion.tr>
                );
              })
            )}

            {/* Tranche divider */}
            <tr className="bg-panel-2/40">
              <td
                colSpan={6}
                className="text-center text-text-mute text-[10px] tracking-widest py-2"
              >
                // TRANCHE 02 — PENDING DECLASSIFICATION REVIEW //
              </td>
            </tr>

            {/* Ghost / placeholder rows */}
            {GHOST_ROWS.map((g) => (
              <tr
                key={g.id}
                className="text-xs text-text-mute italic border-b border-border"
                style={{ height: "36px" }}
              >
                <td className="px-3 py-1 font-mono">{g.id}</td>
                <td className="px-3 py-1">PENDING</td>
                <td className="px-3 py-1">[[CLASSIFIED]]</td>
                <td className="px-3 py-1">{g.source}</td>
                <td className="px-3 py-1 font-mono">REDACTED</td>
                <td className="px-3 py-1 tracking-widest text-[10px]">
                  [[QUEUED]]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
