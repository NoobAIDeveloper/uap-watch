"use client";

import { incidents } from "@/data/incidents";
import type { Incident } from "@/lib/types";
import { setSelectedId, useSelectedId } from "@/lib/store";

// Stable star field positions per mission so the layout is deterministic.
const STAR_FIELDS: Record<string, { left: string; top: string; size: number }[]> = {
  "PURSUE-002": [
    { left: "8%", top: "12%", size: 1 },
    { left: "18%", top: "78%", size: 1 },
    { left: "92%", top: "20%", size: 1 },
    { left: "85%", top: "68%", size: 1 },
    { left: "5%", top: "55%", size: 1 },
    { left: "70%", top: "8%", size: 1 },
    { left: "12%", top: "30%", size: 1 },
    { left: "95%", top: "85%", size: 1 },
    { left: "30%", top: "5%", size: 1 },
    { left: "60%", top: "92%", size: 1 },
  ],
  "PURSUE-003": [
    { left: "4%", top: "20%", size: 1 },
    { left: "11%", top: "65%", size: 1 },
    { left: "88%", top: "15%", size: 1 },
    { left: "82%", top: "75%", size: 1 },
    { left: "94%", top: "45%", size: 1 },
    { left: "22%", top: "92%", size: 1 },
    { left: "55%", top: "4%", size: 1 },
    { left: "76%", top: "92%", size: 1 },
    { left: "6%", top: "88%", size: 1 },
    { left: "40%", top: "8%", size: 1 },
    { left: "97%", top: "60%", size: 1 },
    { left: "16%", top: "42%", size: 1 },
  ],
};

// Crater configurations per mission. Positions are % within the moon disc.
const CRATERS: Record<string, { left: string; top: string; size: string }[]> = {
  "PURSUE-002": [
    { left: "22%", top: "30%", size: "10%" },
    { left: "55%", top: "55%", size: "8%" },
    { left: "70%", top: "25%", size: "6%" },
    { left: "40%", top: "75%", size: "12%" },
  ],
  "PURSUE-003": [
    { left: "30%", top: "40%", size: "9%" },
    { left: "62%", top: "32%", size: "7%" },
    { left: "48%", top: "65%", size: "11%" },
    { left: "20%", top: "70%", size: "6%" },
    { left: "78%", top: "60%", size: "8%" },
  ],
};

// Areas of Interest per mission, positioned within the viewport.
const AOIS: Record<
  string,
  { left: string; top: string; w: string; h: string; label: string; hasTriangle?: boolean }[]
> = {
  "PURSUE-002": [
    { left: "22%", top: "62%", w: "18%", h: "16%", label: "AOI-1" },
    { left: "65%", top: "30%", w: "14%", h: "14%", label: "AOI-2" },
  ],
  "PURSUE-003": [
    { left: "30%", top: "22%", w: "22%", h: "20%", label: "AOI-1", hasTriangle: true },
    { left: "60%", top: "62%", w: "16%", h: "14%", label: "AOI-2" },
  ],
};

const GRID_LABELS: Record<string, string> = {
  "PURSUE-002": "GRID 14-CD",
  "PURSUE-003": "GRID 22-AB",
};

const MISSION_LABELS: Record<string, string> = {
  "PURSUE-002": "APOLLO 12",
  "PURSUE-003": "APOLLO 17",
};

function LunarPlate({ incident }: { incident: Incident }) {
  const stars = STAR_FIELDS[incident.id] ?? [];
  const craters = CRATERS[incident.id] ?? [];
  const aois = AOIS[incident.id] ?? [];
  const gridLabel = GRID_LABELS[incident.id] ?? "GRID --";
  const missionLabel = MISSION_LABELS[incident.id] ?? "APOLLO";

  const onSelect = () => setSelectedId(incident.id);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Open ${missionLabel} dossier`}
      className="group block w-full text-left bg-panel-2 border border-border rounded-sm overflow-hidden hover:border-accent transition-colors cursor-pointer"
    >
      {/* Viewport */}
      <div className="relative aspect-[4/3] bg-black overflow-hidden">
        {/* Real NASA photograph (if available), otherwise the synthetic
            moon disc. We keep the synthetic version as a graceful fallback
            so the layout and AOI overlays still work without imagery. */}
        {incident.localImagePath ? (
          <>
            <img
              src={incident.localImagePath}
              alt={`${missionLabel} — ${incident.location}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "contrast(1.05) brightness(0.92)" }}
            />
            {/* Subtle vignette to keep badges readable */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
              }}
              aria-hidden
            />
          </>
        ) : (
          <>
            {/* Stars */}
            {stars.map((s, i) => (
              <span
                key={i}
                className="absolute bg-white"
                style={{
                  left: s.left,
                  top: s.top,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                }}
                aria-hidden
              />
            ))}

            {/* Moon disc */}
            <div
              className="absolute rounded-full"
              style={{
                left: "10%",
                top: "10%",
                width: "80%",
                height: "80%",
                backgroundImage:
                  "radial-gradient(circle at 35% 30%, #738091 0%, #404854 40%, #1c2127 80%, #0e1116 100%)",
                boxShadow: "inset -8px -10px 30px rgba(0,0,0,0.65)",
              }}
              aria-hidden
            >
              {/* Craters - positioned within the moon */}
              {craters.map((c, i) => (
                <span
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: c.left,
                    top: c.top,
                    width: c.size,
                    aspectRatio: "1 / 1",
                    background:
                      "radial-gradient(circle at 35% 35%, #2f343c 0%, #1c2127 60%, #0e1116 100%)",
                    boxShadow:
                      "inset 1px 1px 2px rgba(255,255,255,0.08), inset -1px -1px 2px rgba(0,0,0,0.8)",
                  }}
                  aria-hidden
                />
              ))}
            </div>
          </>
        )}

        {/* AOI rectangles - positioned in the viewport coordinates.
            Clickable: stops propagation so we can later differentiate
            from a generic plate click — currently both fire onSelect. */}
        {aois.map((aoi, i) => (
          <div
            key={i}
            role="button"
            tabIndex={-1}
            aria-label={`${aoi.label} — open ${incident.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="absolute border border-accent cursor-pointer transition-[border-width] hover:border-2 group-hover:border-2"
            style={{
              left: aoi.left,
              top: aoi.top,
              width: aoi.w,
              height: aoi.h,
            }}
          >
            <span className="absolute -top-3 left-0 text-accent text-[9px] tracking-widest font-mono pointer-events-none">
              {aoi.label}
            </span>
            {/* Three-dots anomaly (Apollo 17 only): triangular formation inside AOI */}
            {aoi.hasTriangle && (
              <>
                <span
                  className="absolute bg-accent rounded-full pointer-events-none"
                  style={{ left: "30%", top: "25%", width: "5px", height: "5px" }}
                />
                <span
                  className="absolute bg-accent rounded-full pointer-events-none"
                  style={{ left: "65%", top: "30%", width: "5px", height: "5px" }}
                />
                <span
                  className="absolute bg-accent rounded-full pointer-events-none"
                  style={{ left: "48%", top: "65%", width: "5px", height: "5px" }}
                />
              </>
            )}
          </div>
        ))}

        {/* Top-left mission badge */}
        <div className="absolute top-2 left-2 bg-bg/70 text-text-dim border border-border-bright px-1.5 py-0.5 text-[9px] tracking-widest backdrop-blur-sm font-mono uppercase">
          {missionLabel}
        </div>

        {/* Top-right date badge */}
        <div className="absolute top-2 right-2 bg-bg/70 text-text-dim border border-border-bright px-1.5 py-0.5 text-[9px] tracking-widest backdrop-blur-sm font-mono uppercase">
          {incident.dateLabel}
        </div>

        {/* Bottom-left grid */}
        <div className="absolute bottom-2 left-2 text-text-mute text-[9px] tracking-widest font-mono">
          {gridLabel}
        </div>

        {/* Bottom-right NASA credit (only when a real photo is shown) */}
        {incident.localImagePath && incident.localImageCredit && (
          <div className="absolute bottom-2 right-2 text-text-mute text-[9px] tracking-widest font-mono uppercase max-w-[55%] text-right truncate">
            {incident.localImageCredit}
          </div>
        )}
      </div>

      {/* Info strip */}
      <div className="px-3 py-2 hairline-t flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div
            className="text-sm tracking-wide uppercase truncate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {incident.location}
          </div>
          <div
            className="text-[10px] text-text-dim tracking-wide overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {incident.summary}
          </div>
        </div>
        <span className="shrink-0 text-accent text-[9px] tracking-widest font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          OPEN →
        </span>
      </div>
    </button>
  );
}

export default function LunarPanel() {
  const lunar = incidents.filter((i) => i.isLunar);
  const selectedId = useSelectedId();
  const selectedIncident = selectedId
    ? incidents.find((i) => i.id === selectedId)
    : null;
  const isFilteredOut = !!selectedIncident && !selectedIncident.isLunar;

  if (isFilteredOut) {
    return (
      <div className="bg-panel border border-border rounded-sm p-4 text-text-mute text-xs tracking-widest text-center">
        // LUNAR DOSSIER HIDDEN //
        <br />
        <span className="text-[10px]">
          {selectedIncident.id} IS NOT A LUNAR INCIDENT — CLEAR FILTER TO VIEW
        </span>
      </div>
    );
  }

  return (
    <div className="bg-panel border border-border rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 hairline-b">
        <h2
          className="text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          LUNAR DOSSIER // NASA ARCHIVE
        </h2>
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
        {lunar.map((incident) => (
          <LunarPlate key={incident.id} incident={incident} />
        ))}
      </div>

      {/* Footer */}
      <div className="hairline-t py-3 px-4 flex items-center justify-between gap-3">
        <div className="text-text-mute text-[10px] tracking-widest uppercase">
          TOTAL LUNAR PINS: {lunar.length} // IMAGERY: NASA PUBLIC ARCHIVE (LOCAL MIRROR)
        </div>
        <a
          href="https://www.war.gov/UFO/"
          target="_blank"
          rel="noreferrer"
          className="text-accent text-[10px] tracking-widest uppercase hover:underline"
        >
          VIEW APOLLO TRANCHE →
        </a>
      </div>
    </div>
  );
}
