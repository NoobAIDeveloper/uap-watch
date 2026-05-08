"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import { Maximize2 } from "lucide-react";
import { incidents } from "@/data/incidents";
import type { Incident, IncidentStatus } from "@/lib/types";
import { STATUS_COLOR, STATUS_LABEL } from "@/lib/classifications";
import { useSelectedId, setSelectedId } from "@/lib/store";
import LunarModal from "./LunarModal";

// Cropped frame: Antarctica + the southern oceans removed so the populated
// land band fills the panel. Pin Y range with this projection is ~63–174
// (well within [10, VB_H-10]). See report for verification.
const VB_W = 980;
const VB_H = 360;
const PROJ_SCALE = 195;
const PROJ_TRANSLATE: [number, number] = [VB_W / 2, 215];

const STATUS_ORDER: IncidentStatus[] = [
  "unresolved",
  "anomalous",
  "corroborated",
  "resolved",
];

export default function SituationMap() {
  const selectedId = useSelectedId();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [worldGeo, setWorldGeo] = useState<FeatureCollection | null>(null);
  const [lunarOpen, setLunarOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/world-110m.json")
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return;
        const land = feature(
          topo,
          topo.objects.countries,
        ) as unknown as FeatureCollection;
        setWorldGeo(land);
      })
      .catch(() => {
        // swallow — map will render markers with no land
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const terrestrial = useMemo<Incident[]>(
    () => incidents.filter((i) => !i.isLunar),
    [],
  );
  const lunar = useMemo<Incident[]>(
    () => incidents.filter((i) => i.isLunar),
    [],
  );

  const statusCounts = useMemo<Record<IncidentStatus, number>>(() => {
    const counts: Record<IncidentStatus, number> = {
      unresolved: 0,
      anomalous: 0,
      corroborated: 0,
      resolved: 0,
    };
    for (const i of terrestrial) counts[i.status] += 1;
    return counts;
  }, [terrestrial]);

  // Stable projection — constructed once with a fixed scale + translate that
  // fits the SVG viewBox. This guarantees markers project to correct geographic
  // coordinates immediately on first render, even before world-110m.json loads,
  // and that pin positions are stable across re-renders (no jitter when the
  // country geometry arrives).
  const projection = useMemo(
    () => geoNaturalEarth1().scale(PROJ_SCALE).translate(PROJ_TRANSLATE),
    [],
  );

  const pathGen = useMemo(() => geoPath(projection), [projection]);

  const graticulePath = useMemo(() => {
    const g = geoGraticule().step([20, 20]);
    return pathGen(g()) ?? "";
  }, [pathGen]);

  const countryPaths = useMemo(() => {
    if (!worldGeo) return [] as { id: string; d: string }[];
    return worldGeo.features
      .map((f, idx) => ({
        id: typeof f.id === "string" || typeof f.id === "number"
          ? String(f.id)
          : `c-${idx}`,
        d: pathGen(f) ?? "",
      }))
      .filter((c) => c.d.length > 0);
  }, [worldGeo, pathGen]);

  return (
    <div className="bg-panel border border-border rounded-sm relative overflow-hidden p-4 min-h-[300px] sm:min-h-[440px]">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div
          className="text-text-mute text-[10px] tracking-[0.2em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          GEOSPATIAL DISTRIBUTION
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            {STATUS_ORDER.map((s) => (
              <div
                key={s}
                className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] text-text-dim"
              >
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: STATUS_COLOR[s] }}
                />
                <span>{STATUS_LABEL[s]}</span>
                <span className="text-text tnum">{statusCounts[s]}</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] tracking-[0.2em] text-text-dim pl-3 ml-1 border-l border-border">
            <span className="text-text tnum">{terrestrial.length}</span>{" "}
            <span className="text-text-mute">INCIDENTS PINNED</span>
          </div>
        </div>
      </div>
      <div className="mt-3 border-b border-border" />

      {/* Map SVG */}
      <div className="relative mt-3">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="block w-full h-auto"
          style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
        >
          {/* Graticule (behind countries) */}
          <path
            d={graticulePath}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={0.4}
            opacity={0.4}
          />

          {/* Countries */}
          <g>
            {countryPaths.map((c) => (
              <path
                key={c.id}
                d={c.d}
                fill="var(--color-panel-2)"
                stroke="var(--color-border)"
                strokeWidth={0.4}
              />
            ))}
          </g>

          {/* Subtle equator line for vibe */}
          <line
            x1={0}
            x2={VB_W}
            y1={projection([0, 0])?.[1] ?? VB_H / 2}
            y2={projection([0, 0])?.[1] ?? VB_H / 2}
            stroke="var(--color-border-bright)"
            strokeWidth={0.3}
            strokeDasharray="2 4"
            opacity={0.5}
          />

          {/* Markers */}
          <g>
            {terrestrial.map((incident, index) => {
              const projected = projection(incident.coordinates);
              if (!projected) return null;
              const [x, y] = projected;
              const isSelected = selectedId === incident.id;
              const isHovered = hoveredId === incident.id;
              const color = STATUS_COLOR[incident.status];
              const ringColor = isSelected ? "var(--color-accent)" : color;
              const ringR = isSelected || isHovered ? 14 : 8;
              const pulse =
                incident.status === "unresolved" && !isSelected && !isHovered;

              return (
                // Static <g> owns the translate — motion's CSS transform on
                // the inner <motion.g> would otherwise clobber the SVG
                // transform attribute and collapse every marker to (0,0).
                <g key={incident.id} transform={`translate(${x},${y})`}>
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    style={{
                      cursor: "pointer",
                      transformOrigin: "0 0",
                      filter: isSelected
                        ? "drop-shadow(0 0 8px var(--color-accent))"
                        : undefined,
                    }}
                    onMouseEnter={() => setHoveredId(incident.id)}
                    onMouseLeave={() =>
                      setHoveredId((h) => (h === incident.id ? null : h))
                    }
                    onClick={() => setSelectedId(incident.id)}
                  >
                    {/* Hit target — invisible, generous */}
                    <circle r={16} fill="transparent" />

                    {/* Outer ring */}
                    {pulse ? (
                      <motion.circle
                        r={ringR}
                        fill="none"
                        stroke={ringColor}
                        strokeWidth={1.2}
                        style={{ transformOrigin: "0 0" }}
                        animate={{ scale: [1, 1.35, 1], opacity: [0.9, 0.4, 0.9] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ) : (
                      <circle
                        r={ringR}
                        fill="none"
                        stroke={ringColor}
                        strokeWidth={isSelected ? 1.6 : 1.2}
                      />
                    )}

                    {/* Inner dot */}
                    <circle r={3} fill={color} />

                    {/* Crosshair tick on selection */}
                    {isSelected && (
                      <g
                        stroke="var(--color-accent)"
                        strokeWidth={0.8}
                        opacity={0.85}
                      >
                        <line x1={-22} x2={-16} y1={0} y2={0} />
                        <line x1={16} x2={22} y1={0} y2={0} />
                        <line x1={0} x2={0} y1={-22} y2={-16} />
                        <line x1={0} x2={0} y1={16} y2={22} />
                      </g>
                    )}
                  </motion.g>
                </g>
              );
            })}
          </g>

          {/* Tooltip — last so it's on top */}
          {(() => {
            if (!hoveredId) return null;
            const incident = terrestrial.find((i) => i.id === hoveredId);
            if (!incident) return null;
            const projected = projection(incident.coordinates);
            if (!projected) return null;
            const [x, y] = projected;
            const flip = x > 700;
            const tipW = 220;
            const tipH = 80;
            const offX = flip ? -tipW - 12 : 12;
            const offY = -tipH - 4;
            const summaryText =
              incident.summary.length > 60
                ? `${incident.summary.slice(0, 60)}…`
                : incident.summary;
            const tx = x + offX;
            const ty = y + offY;
            return (
              <g
                transform={`translate(${tx},${ty})`}
                pointerEvents="none"
              >
                <rect
                  x={0}
                  y={0}
                  width={tipW}
                  height={tipH}
                  rx={2}
                  fill="var(--color-panel)"
                  stroke="var(--color-accent)"
                  strokeWidth={0.8}
                />
                {/* Status pip in corner */}
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={tipH}
                  fill={STATUS_COLOR[incident.status]}
                />
                <text
                  x={12}
                  y={18}
                  fill="var(--color-accent)"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                  letterSpacing="1.4"
                >
                  {incident.id} // {incident.dateLabel.toUpperCase()}
                </text>
                <text
                  x={12}
                  y={36}
                  fill="var(--color-text)"
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                >
                  {truncate(incident.location, 28)}
                </text>
                <text
                  x={12}
                  y={54}
                  fill="var(--color-text-dim)"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                >
                  {wrapFirst(summaryText, 32)}
                </text>
                <text
                  x={12}
                  y={68}
                  fill="var(--color-text-dim)"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                >
                  {wrapSecond(summaryText, 32)}
                </text>
                {/* Connector line back to marker */}
                <line
                  x1={flip ? tipW : 0}
                  x2={flip ? tipW + 12 : -12}
                  y1={tipH}
                  y2={tipH + 4}
                  stroke="var(--color-accent)"
                  strokeWidth={0.6}
                  opacity={0.7}
                />
              </g>
            );
          })()}
        </svg>

        {/* Lunar inset card */}
        <LunarInset lunar={lunar} onExpand={() => setLunarOpen(true)} />
      </div>

      {/* Lunar full-detail modal */}
      <LunarModal
        open={lunarOpen}
        onClose={() => setLunarOpen(false)}
        lunar={lunar}
      />

      {/* Footer bar */}
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between gap-3 flex-wrap">
        <div className="text-text-mute text-[10px] tracking-[0.2em]">
          MAP DATA: NATURAL EARTH // EQUAL EARTH PROJECTION
        </div>
        <div className="flex items-center gap-2 text-text-mute text-[10px] tracking-[0.2em]">
          <svg width={60} height={6} aria-hidden>
            <line
              x1={0.5}
              x2={59.5}
              y1={3}
              y2={3}
              stroke="var(--color-text-mute)"
              strokeWidth={1}
            />
            <line
              x1={0.5}
              x2={0.5}
              y1={0.5}
              y2={5.5}
              stroke="var(--color-text-mute)"
              strokeWidth={1}
            />
            <line
              x1={59.5}
              x2={59.5}
              y1={0.5}
              y2={5.5}
              stroke="var(--color-text-mute)"
              strokeWidth={1}
            />
          </svg>
          <span>{"≈"} 2000 KM</span>
        </div>
      </div>
    </div>
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

// Naïve two-line wrap for the SVG summary — splits on the last space before n
function wrapFirst(s: string, n: number) {
  if (s.length <= n) return s;
  const slice = s.slice(0, n);
  const idx = slice.lastIndexOf(" ");
  return idx > 12 ? slice.slice(0, idx) : slice;
}
function wrapSecond(s: string, n: number) {
  if (s.length <= n) return "";
  const slice = s.slice(0, n);
  const idx = slice.lastIndexOf(" ");
  const rest = idx > 12 ? s.slice(idx + 1) : s.slice(n);
  return rest.length > n ? `${rest.slice(0, n - 1)}…` : rest;
}

/* -------------------------------------------------------------------------- */
/* Lunar inset                                                                */
/* -------------------------------------------------------------------------- */

function LunarInset({
  lunar,
  onExpand,
}: {
  lunar: Incident[];
  onExpand: () => void;
}) {
  const selectedId = useSelectedId();
  const [hovered, setHovered] = useState(false);
  // Visual placement on the moon disc (unit-circle-ish, not literal coords)
  const moonPins: { incident: Incident; x: number; y: number; label: string }[] =
    lunar.map((inc, idx) => {
      const isApollo12 = inc.id === "PURSUE-002";
      return {
        incident: inc,
        // A12 left-of-center, A17 upper-right. Coordinates inside the 60px disc.
        x: isApollo12 ? -10 : 12,
        y: isApollo12 ? 4 : -10,
        label: idx === 0 ? "A12" : "A17",
      };
    });

  return (
    <button
      type="button"
      onClick={onExpand}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Open full lunar detail"
      className={`absolute top-2 right-2 bg-panel-2 border ${
        hovered ? "border-accent" : "border-border"
      } rounded-sm p-2 select-none w-[120px] h-[80px] sm:w-[160px] sm:h-[100px] cursor-pointer text-left transition-colors`}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <div
          className="flex items-center justify-between gap-1 text-text-mute text-[8px] tracking-[0.22em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span>LUNAR // {lunar.length} PINS</span>
          <span
            className={`flex items-center gap-1 ${
              hovered ? "text-accent" : "text-text-mute"
            } transition-colors`}
          >
            <span className="hidden sm:inline">
              {hovered ? "EXPAND" : "DETAIL"}
            </span>
            <Maximize2 size={9} aria-hidden />
          </span>
        </div>
        <div className="relative w-full" style={{ height: "calc(100% - 14px)" }}>
          <svg
            viewBox="-40 -40 80 80"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Moon disc */}
            <defs>
              <radialGradient id="moon-shade" cx="35%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#404854" />
                <stop offset="60%" stopColor="#2f343c" />
                <stop offset="100%" stopColor="#1c2127" />
              </radialGradient>
            </defs>
            <circle r={30} fill="url(#moon-shade)" stroke="var(--color-border-bright)" strokeWidth={0.4} />
            {/* Craters */}
            <circle cx={-8} cy={-12} r={3.5} fill="#252a31" opacity={0.85} />
            <circle cx={10} cy={6} r={4.5} fill="#252a31" opacity={0.85} />
            <circle cx={-14} cy={10} r={2.4} fill="#252a31" opacity={0.8} />
            <circle cx={6} cy={-16} r={1.8} fill="#252a31" opacity={0.8} />
            <circle cx={16} cy={-4} r={1.4} fill="#252a31" opacity={0.7} />
            {/* Terminator hint */}
            <path
              d="M 0 -30 A 30 30 0 0 1 0 30 A 22 30 0 0 0 0 -30 Z"
              fill="#000"
              opacity={0.18}
            />

            {/* Pins */}
            {moonPins.map((p) => {
              const isSel = selectedId === p.incident.id;
              const color = isSel
                ? "var(--color-accent)"
                : STATUS_COLOR[p.incident.status];
              return (
                <g
                  key={p.incident.id}
                  transform={`translate(${p.x},${p.y})`}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    // Pin click selects the incident; don't bubble to the
                    // surrounding button (which would open the modal).
                    e.stopPropagation();
                    setSelectedId(p.incident.id);
                  }}
                >
                  <circle r={12} fill="transparent" />
                  <circle
                    r={isSel ? 4 : 2.6}
                    fill="none"
                    stroke={color}
                    strokeWidth={0.8}
                  />
                  <circle r={1.1} fill={color} />
                  <text
                    x={5}
                    y={2}
                    fontSize={4.5}
                    fill="var(--color-text-dim)"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.5"
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </button>
  );
}
