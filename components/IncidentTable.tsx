"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { incidents } from "@/data/incidents";
import type { Incident, SourceAgency } from "@/lib/types";
import { Search, X } from "lucide-react";
import { STATUS_COLOR, STATUS_LABEL, STATUS_TAG_CLASS, SOURCE_LABEL } from "@/lib/classifications";
import { useSelectedId, setSelectedId } from "@/lib/store";

type Filter = "ALL" | SourceAgency;

const FILTER_ORDER: Filter[] = ["ALL", "FBI", "DOD", "NASA", "STATE", "USAF", "USN", "CIA", "ODNI", "DOE"];

const FILTER_LABEL: Record<Filter, string> = {
  ALL: "All",
  FBI: "FBI",
  DOD: "DOD",
  NASA: "NASA",
  STATE: "State",
  USAF: "USAF",
  USN: "USN",
  CIA: "CIA",
  ODNI: "ODNI",
  DOE: "DOE",
};

// Boundary between Release 01 incidents (PURSUE-001 to PURSUE-026) and
// Release 02 incidents (PURSUE-027 onwards). Used to render the tranche
// divider between the two groups so the register makes the release split
// visible at a glance.
const T2_FIRST_ID = "PURSUE-027";

function isTranche2(id: string): boolean {
  // String compare works because all PURSUE-NNN ids are zero-padded.
  return id >= T2_FIRST_ID;
}

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
      CIA: 0,
      ODNI: 0,
      DOE: 0,
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

  const t1 = visible.filter((i) => !isTranche2(i.id));
  const t2 = visible.filter((i) => isTranche2(i.id));

  return (
    <div className="bg-panel border border-border rounded-[4px] flex flex-col h-[520px] sm:h-[640px]">
      {/* Panel header — title + meta on the right */}
      <div className="h-[40px] px-3 sm:px-4 flex items-center justify-between gap-2 border-b border-border">
        <h2 className="text-[14px] font-semibold text-text shrink-0">
          Incident register
        </h2>
        <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute truncate">
          <span className="hidden sm:inline">Updated </span>
          <span className="mono normal-case tracking-normal">2026-05-22 15:30Z</span>
        </span>
      </div>

      {/* Toolbar — chip filters + search */}
      <div className="px-3 sm:px-4 py-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 border-b border-border">
        <div className="flex items-center gap-1 flex-wrap -mx-1 px-1 overflow-x-auto sm:overflow-visible">
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
                  "h-6 px-2.5 inline-flex items-center gap-1.5 rounded-[2px] text-[12px] font-medium transition-colors shrink-0",
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
        <div className="sm:ml-auto flex items-center gap-2 w-full sm:w-auto">
          {selectedId && (
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="h-[26px] px-2 inline-flex items-center gap-1 text-[12px] text-accent hover:text-text border border-[rgba(76,144,240,0.5)] hover:border-accent rounded-[2px] shrink-0"
            >
              <X size={12} strokeWidth={1.5} />
              <span className="hidden sm:inline">Clear filter</span>
              <span className="sm:hidden">Clear</span>
            </button>
          )}
          <div className="relative flex-1 sm:flex-initial">
            <Search
              size={12}
              strokeWidth={1.5}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-text-mute pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by ID, location…"
              className="h-[26px] w-full sm:w-[220px] pl-7 pr-2 bg-panel border border-border-bright rounded-[2px] text-[12px] text-text placeholder:text-text-mute focus:outline-2 focus:outline-[rgba(76,144,240,0.5)] focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Mobile card list (default) — vertical, scrollable */}
      <div className="flex-1 overflow-y-auto sm:hidden">
        {visible.length === 0 ? (
          <div className="text-center text-text-mute py-12 text-[13px]">
            No matches.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {t1.map((i) => (
              <IncidentCard
                key={`m-${i.id}-${filter}-${query}`}
                incident={i}
                selected={selectedId === i.id}
                onClick={() => handleRowClick(i)}
              />
            ))}
            {t2.length > 0 && (
              <li className="bg-bg text-center text-accent text-[11px] font-medium tracking-[0.06em] uppercase py-2 border-b border-border">
                Tranche 02 · released May 22, 2026
              </li>
            )}
            {t2.map((i) => (
              <IncidentCard
                key={`m-${i.id}-${filter}-${query}`}
                incident={i}
                selected={selectedId === i.id}
                onClick={() => handleRowClick(i)}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Desktop table (sm+) — sticky header, scrolling rows */}
      <div className="hidden sm:block flex-1 overflow-auto">
        <table className="w-full border-collapse">
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
              <>
                {t1.map((incident) => (
                  <IncidentRow
                    key={`${incident.id}-${filter}-${query}`}
                    incident={incident}
                    selected={selectedId === incident.id}
                    onClick={() => handleRowClick(incident)}
                  />
                ))}
                {t2.length > 0 && (
                  <tr className="bg-bg">
                    <td
                      colSpan={6}
                      className="text-center text-accent text-[11px] font-medium tracking-[0.06em] uppercase py-2 border-b border-border"
                    >
                      Tranche 02 · released May 22, 2026
                    </td>
                  </tr>
                )}
                {t2.map((incident) => (
                  <IncidentRow
                    key={`${incident.id}-${filter}-${query}`}
                    incident={incident}
                    selected={selectedId === incident.id}
                    onClick={() => handleRowClick(incident)}
                  />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IncidentRow({
  incident,
  selected,
  onClick,
}: {
  incident: Incident;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      onClick={onClick}
      className={[
        "text-[13px] cursor-pointer transition-colors",
        selected ? "bg-accent-tint" : "hover:bg-panel-2",
      ].join(" ")}
      style={{ height: "36px" }}
    >
      <td className="px-3 mono text-[12px] text-text-dim border-b border-border">
        {incident.id}
      </td>
      <td className="px-3 mono text-[12px] text-text-dim border-b border-border whitespace-nowrap">
        {incident.dateLabel}
      </td>
      <td className="px-3 text-text border-b border-border">
        {incident.location}
      </td>
      <td className="px-3 text-text-dim border-b border-border whitespace-nowrap">
        {SOURCE_LABEL[incident.source]}
      </td>
      <td className="px-3 mono text-[11px] text-text-dim border-b border-border whitespace-nowrap">
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
}

function IncidentCard({
  incident,
  selected,
  onClick,
}: {
  incident: Incident;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <li
      onClick={onClick}
      className={[
        "px-3 py-2.5 cursor-pointer transition-colors",
        selected ? "bg-accent-tint" : "active:bg-panel-2",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="mono text-[12px] text-text-dim">{incident.id}</span>
        <span
          className={`inline-flex items-center gap-1.5 h-5 px-2 rounded-[2px] text-[11px] font-medium shrink-0 ${STATUS_TAG_CLASS[incident.status]}`}
        >
          <span
            aria-hidden
            className="inline-block w-[6px] h-[6px] rounded-[1px]"
            style={{ backgroundColor: STATUS_COLOR[incident.status] }}
          />
          {STATUS_LABEL[incident.status]}
        </span>
      </div>
      <div className="text-[13px] text-text leading-snug mb-1">
        {incident.location}
      </div>
      <div className="flex items-center gap-2 text-[11px] text-text-mute mono">
        <span>{incident.dateLabel}</span>
        <span className="opacity-50">·</span>
        <span>{SOURCE_LABEL[incident.source]}</span>
        <span className="opacity-50">·</span>
        <span className="truncate">{incident.classification}</span>
      </div>
    </li>
  );
}
