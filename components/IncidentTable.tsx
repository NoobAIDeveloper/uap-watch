"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { incidents } from "@/data/incidents";
import type { Incident, SourceAgency } from "@/lib/types";
import { Search, X } from "lucide-react";
import { STATUS_COLOR, STATUS_LABEL, STATUS_TAG_CLASS, SOURCE_LABEL } from "@/lib/classifications";
import { useSelectedId, setSelectedId } from "@/lib/store";

type Filter = "ALL" | SourceAgency;

const FILTER_ORDER: Filter[] = ["ALL", "FBI", "DOD", "NASA", "STATE", "USAF", "USN"];

const FILTER_LABEL: Record<Filter, string> = {
  ALL: "All",
  FBI: "FBI",
  DOD: "DOD",
  NASA: "NASA",
  STATE: "State",
  USAF: "USAF",
  USN: "USN",
};

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
    <div className="bg-panel border border-border rounded-[4px] flex flex-col h-[640px]">
      {/* Panel header — title + meta on the right */}
      <div className="h-[40px] px-4 flex items-center justify-between border-b border-border">
        <h2 className="text-[14px] font-semibold text-text">
          Incident register
        </h2>
        <span className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute">
          Updated <span className="mono normal-case tracking-normal">2026-05-08 16:42:00Z</span>
        </span>
      </div>

      {/* Toolbar — chip filters + search */}
      <div className="px-4 py-2.5 flex items-center gap-3 flex-wrap border-b border-border">
        <div className="flex items-center gap-1 flex-wrap">
          {FILTER_ORDER.map((f) => {
            const count = counts[f];
            if (count === 0 && f !== "ALL") return null;
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={[
                  "h-6 px-2.5 inline-flex items-center gap-1.5 rounded-[2px] text-[12px] font-medium transition-colors",
                  active
                    ? "bg-accent-fill text-white"
                    : "bg-panel-2 text-text-dim hover:bg-[rgba(143,153,168,0.16)] hover:text-text",
                ].join(" ")}
              >
                <span>{FILTER_LABEL[f]}</span>
                <span
                  className={`tnum ${active ? "text-white/70" : "text-text-mute"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {selectedId && (
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="h-[26px] px-2 inline-flex items-center gap-1 text-[12px] text-accent hover:text-text border border-[rgba(76,144,240,0.5)] hover:border-accent rounded-[2px]"
            >
              <X size={12} strokeWidth={1.5} />
              Clear filter
            </button>
          )}
          <div className="relative">
            <Search
              size={12}
              strokeWidth={1.5}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-text-mute pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by ID, location, quote…"
              className="h-[26px] w-[220px] pl-7 pr-2 bg-panel border border-border-bright rounded-[2px] text-[12px] text-text placeholder:text-text-mute focus:outline-2 focus:outline-[rgba(76,144,240,0.5)] focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Table — flex-1 + overflow-auto so rows scroll while header stays pinned */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse" style={{ minWidth: "640px" }}>
          <thead className="sticky top-0 bg-panel-2 z-10">
            <tr className="text-text-dim text-[12px] font-medium">
              <th className="text-left px-3 py-0 h-[32px] border-b border-border" style={{ width: "120px" }}>
                Id
              </th>
              <th className="text-left px-3 py-0 h-[32px] border-b border-border" style={{ width: "100px" }}>
                Date
              </th>
              <th className="text-left px-3 py-0 h-[32px] border-b border-border">
                Location
              </th>
              <th className="text-left px-3 py-0 h-[32px] border-b border-border" style={{ width: "80px" }}>
                Source
              </th>
              <th className="text-left px-3 py-0 h-[32px] border-b border-border" style={{ width: "150px" }}>
                Class.
              </th>
              <th className="text-left px-3 py-0 h-[32px] border-b border-border" style={{ width: "130px" }}>
                Status
              </th>
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
                <td colSpan={6} className="text-center text-text-mute py-12 text-[13px]">
                  No matches.
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
                      "text-[13px] cursor-pointer transition-colors",
                      selected ? "bg-accent-tint" : "hover:bg-panel-2",
                    ].join(" ")}
                    style={{ height: "36px" }}
                  >
                    <td className="px-3 mono text-[12px] text-text-dim border-b border-border">
                      {incident.id}
                    </td>
                    <td className="px-3 mono text-[12px] text-text-dim border-b border-border">
                      {incident.dateLabel}
                    </td>
                    <td className="px-3 text-text border-b border-border">
                      {incident.location}
                    </td>
                    <td className="px-3 text-text-dim border-b border-border">
                      {SOURCE_LABEL[incident.source]}
                    </td>
                    <td className="px-3 mono text-[11px] text-text-dim border-b border-border">
                      {incident.classification}
                    </td>
                    <td className="px-3 border-b border-border">
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
                    </td>
                  </motion.tr>
                );
              })
            )}

            {/* Tranche divider */}
            <tr className="bg-bg">
              <td
                colSpan={6}
                className="text-center text-text-mute text-[11px] font-medium tracking-[0.06em] uppercase py-2 border-b border-border"
              >
                Tranche 02 · pending declassification review
              </td>
            </tr>

            {GHOST_ROWS.map((g) => (
              <tr
                key={g.id}
                className="text-[13px]"
                style={{ height: "36px", opacity: 0.45 }}
              >
                <td className="px-3 mono text-[12px] text-text-mute border-b border-border">
                  {g.id}
                </td>
                <td className="px-3 mono text-[12px] text-text-mute border-b border-border">
                  Pending
                </td>
                <td className="px-3 text-text-mute border-b border-border">
                  [[Classified]]
                </td>
                <td className="px-3 text-text-mute border-b border-border">
                  {g.source}
                </td>
                <td className="px-3 mono text-[11px] text-text-mute border-b border-border">
                  Redacted
                </td>
                <td className="px-3 text-text-mute border-b border-border">
                  [[Queued]]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
