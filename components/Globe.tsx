"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import createGlobe from "cobe";
import { incidents } from "@/data/incidents";
import type { Incident } from "@/lib/types";
import { setSelectedId } from "@/lib/store";
import LunarModal from "./LunarModal";

// Sphere radius used by cobe internally for the lit globe surface.
// Markers sit slightly above this at `SPHERE_R + MARKER_ELEV`.
const SPHERE_R = 0.8;
const MARKER_ELEV = 0.05;
const THETA = 0.25; // matches createGlobe option
const HIT_RADIUS_PX = 18;

// Replicates cobe's lat/lon → unit-sphere transform so we can project
// marker positions ourselves for click detection (cobe's <canvas>
// doesn't surface hit events natively).
function latLonToUnit([lat, lon]: [number, number]): [number, number, number] {
  const r = (lat * Math.PI) / 180;
  const a = (lon * Math.PI) / 180 - Math.PI;
  const cr = Math.cos(r);
  return [-cr * Math.cos(a), Math.sin(r), cr * Math.sin(a)];
}

// Rotates a unit-sphere point by phi (Y axis) + theta (X axis), then
// returns canvas-CSS coordinates and a front-facing flag. Mirrors the
// projection in cobe's vertex shader so overlay hit tests line up with
// what the user sees.
function projectMarker(
  p: [number, number, number],
  phi: number,
  theta: number,
  cssW: number,
  cssH: number,
): { x: number; y: number; front: boolean } {
  const cp = Math.cos(phi);
  const sp = Math.sin(phi);
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const c = cp * p[0] + sp * p[2];
  const s = sp * st * p[0] + ct * p[1] - cp * st * p[2];
  const zFinal = -sp * ct * p[0] + st * p[1] + cp * ct * p[2];
  const aspect = cssW / cssH;
  const nx = (c / aspect + 1) / 2;
  const ny = (-s + 1) / 2;
  return {
    x: nx * cssW,
    y: ny * cssH,
    front: zFinal >= 0 && c * c + s * s <= SPHERE_R * SPHERE_R + 0.02,
  };
}

// cobe-rendered orthographic globe with slow Y-rotation. Replaces the
// previous flat Natural-Earth situation map on the homepage. Plots
// terrestrial incidents only; lunar incidents are represented by an
// inset moon disc that opens the LunarModal on click.
//
// Coordinates: incidents store `[lon, lat]` (d3-geo convention).
// cobe markers use `[lat, lon]` — swap on the way in.
//
// cobe v2 dropped its internal render loop — we drive
// `globe.update({phi})` per frame via requestAnimationFrame, otherwise
// the earth texture (loaded async from a data URL) never paints.
//
// Honors prefers-reduced-motion: rotation halts and the sphere holds a
// static frame.

// Globe palette. baseColor reads brighter than the surrounding panel
// (#1c2127 ≈ [0.11,0.13,0.15]) so the sphere is visible. mapBrightness
// lights the land dots above the base ocean fill (mapBaseBrightness).
// glowColor tints the limb halo with the cyan accent.
const COLOR_BASE: [number, number, number] = [0.38, 0.42, 0.5];
const COLOR_GLOW: [number, number, number] = [0.298, 0.565, 0.941]; // accent
const COLOR_MARKER: [number, number, number] = [0.298, 0.565, 0.941];

const STATUS_TINT: Record<string, [number, number, number]> = {
  corroborated: [0.137, 0.522, 0.318], // #238551
  unresolved: [0.925, 0.604, 0.235], // #ec9a3c
  anomalous: [0.596, 0.506, 0.953], // #9881f3
  resolved: [0.671, 0.702, 0.749], // #abb3bf
};

// Hex equivalents for the legend swatches and hover tooltip — kept in sync
// with STATUS_TINT (which is normalized 0–1 for cobe's WebGL markers).
const STATUS_HEX: Record<string, string> = {
  corroborated: "#238551",
  unresolved: "#ec9a3c",
  anomalous: "#9881f3",
  resolved: "#abb3bf",
};

const STATUS_LABEL: Record<string, string> = {
  corroborated: "Corroborated",
  unresolved: "Unresolved",
  anomalous: "Anomalous",
  resolved: "Resolved",
};

export default function Globe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phiRef = useRef(0);
  const pausedRef = useRef(false);
  const [lunarOpen, setLunarOpen] = useState(false);
  const [hovered, setHovered] = useState<{ id: string; x: number; y: number } | null>(null);

  const terrestrial = useMemo<Incident[]>(
    () => incidents.filter((i) => !i.isLunar),
    [],
  );
  const lunar = useMemo<Incident[]>(
    () => incidents.filter((i) => i.isLunar),
    [],
  );
  const incidentById = useMemo(
    () => new Map(terrestrial.map((i) => [i.id, i])),
    [terrestrial],
  );

  // Precompute each marker's unit-sphere position once — used both by
  // cobe (via `location: [lat, lon]`) and by the click handler (via
  // unit vector → projection).
  const markerData = useMemo(
    () =>
      terrestrial.map((i) => {
        const latLon: [number, number] = [i.coordinates[1], i.coordinates[0]];
        const unit = latLonToUnit(latLon);
        return {
          id: i.id,
          latLon,
          unit: [
            unit[0] * (SPHERE_R + MARKER_ELEV),
            unit[1] * (SPHERE_R + MARKER_ELEV),
            unit[2] * (SPHERE_R + MARKER_ELEV),
          ] as [number, number, number],
          size: i.status === "unresolved" ? 0.055 : 0.04,
          color: STATUS_TINT[i.status] ?? COLOR_MARKER,
        };
      }),
    [terrestrial],
  );

  const markers = useMemo(
    () =>
      markerData.map((m) => ({
        location: m.latLon,
        size: m.size,
        color: m.color,
      })),
    [markerData],
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let destroyed = false;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let lastSize = { w: 0, h: 0 };

    const mount = (w: number, h: number) => {
      if (w === 0 || h === 0) return;
      if (
        globe &&
        Math.abs(lastSize.w - w) < 2 &&
        Math.abs(lastSize.h - h) < 2
      ) {
        return;
      }
      if (globe) globe.destroy();
      lastSize = { w, h };
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: w * dpr,
        height: h * dpr,
        phi: phiRef.current,
        theta: THETA,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        mapBaseBrightness: 0.12,
        baseColor: COLOR_BASE,
        markerColor: COLOR_MARKER,
        glowColor: COLOR_GLOW,
        markers,
      });
      requestAnimationFrame(() => {
        if (!destroyed) canvas.style.opacity = "1";
      });
    };

    const initial = container.getBoundingClientRect();
    mount(initial.width, initial.height);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      mount(width, height);
    });
    ro.observe(container);

    // cobe v2 has no built-in animation — we tick phi ourselves.
    const tick = () => {
      if (destroyed) return;
      if (globe) {
        if (!reduceMotion && !pausedRef.current) phiRef.current += 0.0028;
        globe.update({ phi: phiRef.current });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (globe) globe.destroy();
    };
  }, [markers]);

  // Hit test: project every marker with the *current* phi, keep front-facing
  // ones, return the id of the closest within HIT_RADIUS_PX (or null).
  const hitTest = (cx: number, cy: number, w: number, h: number): string | null => {
    const phi = phiRef.current;
    let best: { id: string; d2: number } | null = null;
    for (const m of markerData) {
      const proj = projectMarker(m.unit, phi, THETA, w, h);
      if (!proj.front) continue;
      const dx = proj.x - cx;
      const dy = proj.y - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 > HIT_RADIUS_PX * HIT_RADIUS_PX) continue;
      if (!best || d2 < best.d2) best = { id: m.id, d2 };
    }
    return best?.id ?? null;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const id = hitTest(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
    if (id) setSelectedId(id);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const id = hitTest(cx, cy, rect.width, rect.height);
    if (id) {
      if (!hovered || hovered.id !== id || hovered.x !== cx || hovered.y !== cy) {
        setHovered({ id, x: cx, y: cy });
      }
    } else if (hovered) {
      setHovered(null);
    }
  };

  const hoveredIncident = hovered ? incidentById.get(hovered.id) ?? null : null;

  return (
    <section
      aria-label="Geospatial distribution"
      className="bg-panel border border-border rounded-[4px] relative flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="h-[40px] px-4 flex items-center justify-between gap-3 border-b border-border shrink-0">
        <h2 className="text-[14px] font-semibold text-text">
          Geospatial distribution
        </h2>
        <div className="text-[11px] text-text-dim">
          <span className="text-text tnum mono">{terrestrial.length}</span>{" "}
          <span className="text-text-mute">incidents pinned</span>
        </div>
      </div>

      {/* Globe canvas — fills the panel between header + footer */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[360px] flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{
            opacity: 0,
            transition: "opacity 600ms ease-out",
            cursor: hovered ? "pointer" : "grab",
          }}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
            setHovered(null);
          }}
          aria-label="Click a marker to filter the incident register"
          role="img"
        />

        {/* Hover tooltip — positioned next to cursor; only when a marker is hit. */}
        {hovered && hoveredIncident && (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-20 bg-panel-2/95 backdrop-blur border border-border-bright rounded-[2px] px-2.5 py-1.5 shadow-[0_6px_18px_rgba(0,0,0,0.55)] min-w-[180px] max-w-[240px]"
            style={{
              left: Math.min(hovered.x + 14, (containerRef.current?.clientWidth ?? 1000) - 250),
              top: Math.max(hovered.y - 44, 8),
            }}
          >
            <div className="mono text-[11px] font-semibold tracking-[0.06em] text-text">
              {hoveredIncident.id}
            </div>
            <div className="text-[11px] text-text-dim truncate" title={hoveredIncident.location}>
              {hoveredIncident.location}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: STATUS_HEX[hoveredIncident.status] ?? "#abb3bf" }}
                aria-hidden
              />
              <span className="mono text-[10px] uppercase tracking-[0.08em] text-text-mute">
                {STATUS_LABEL[hoveredIncident.status] ?? hoveredIncident.status}
              </span>
            </div>
          </div>
        )}

        {/* Status legend — bottom-left corner of the globe panel. */}
        <div
          aria-label="Marker status legend"
          className="pointer-events-none absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-x-3 gap-y-1 bg-panel-2/85 backdrop-blur border border-border rounded-[2px] px-2.5 py-1.5"
        >
          {(["corroborated", "unresolved", "anomalous", "resolved"] as const).map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: STATUS_HEX[s] }}
                aria-hidden
              />
              <span className="mono text-[10px] uppercase tracking-[0.08em] text-text-dim">
                {STATUS_LABEL[s]}
              </span>
            </div>
          ))}
        </div>

        {/* Lunar sub-widget */}
        <LunarInset lunar={lunar} onExpand={() => setLunarOpen(true)} />
      </div>

      {/* Footer */}
      <div className="h-[32px] px-4 flex items-center justify-between gap-3 border-t border-border text-[11px] text-text-mute shrink-0">
        <span className="mono tracking-[0.06em] uppercase">
          Orthographic // rotating
        </span>
        <span>NASA Blue Marble / cobe</span>
      </div>

      <LunarModal
        open={lunarOpen}
        onClose={() => setLunarOpen(false)}
        lunar={lunar}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Lunar inset — small moon disc in the top-right corner of the globe panel.   */
/* -------------------------------------------------------------------------- */

function LunarInset({
  lunar,
  onExpand,
}: {
  lunar: Incident[];
  onExpand: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const moonPins = lunar.map((inc, idx) => {
    const isApollo12 = inc.id === "PURSUE-002";
    return {
      id: inc.id,
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
      className={`absolute top-3 right-3 z-10 bg-panel-2/90 backdrop-blur border ${
        hovered ? "border-accent" : "border-border-bright"
      } rounded-sm p-2 select-none w-[120px] h-[88px] sm:w-[148px] sm:h-[104px] cursor-pointer text-left transition-colors`}
    >
      <div className="flex items-center justify-between gap-1 text-text-mute text-[8px] tracking-[0.22em] mono uppercase mb-1">
        <span>Lunar // {lunar.length} pins</span>
        <span
          className={`flex items-center gap-1 ${
            hovered ? "text-accent" : "text-text-mute"
          } transition-colors`}
        >
          <span className="hidden sm:inline">
            {hovered ? "Expand" : "Detail"}
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
          <defs>
            <radialGradient id="globe-moon-shade" cx="35%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#404854" />
              <stop offset="60%" stopColor="#2f343c" />
              <stop offset="100%" stopColor="#1c2127" />
            </radialGradient>
          </defs>
          <circle
            r={30}
            fill="url(#globe-moon-shade)"
            stroke="var(--color-border-bright)"
            strokeWidth={0.4}
          />
          {/* Craters */}
          <circle cx={-8} cy={-12} r={3.5} fill="#252a31" opacity={0.85} />
          <circle cx={10} cy={6} r={4.5} fill="#252a31" opacity={0.85} />
          <circle cx={-14} cy={10} r={2.4} fill="#252a31" opacity={0.8} />
          <circle cx={6} cy={-16} r={1.8} fill="#252a31" opacity={0.8} />
          {/* Pins */}
          {moonPins.map((p) => (
            <g key={p.id} transform={`translate(${p.x},${p.y})`}>
              <circle r={2.8} fill="none" stroke="var(--color-accent)" strokeWidth={0.8} />
              <circle r={1.2} fill="var(--color-accent)" />
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
          ))}
        </svg>
      </div>
    </button>
  );
}
