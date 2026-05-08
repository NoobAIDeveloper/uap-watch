"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Incident } from "@/lib/types";
import { STATUS_COLOR } from "@/lib/classifications";
import { setSelectedId } from "@/lib/store";

type LunarModalProps = {
  open: boolean;
  onClose: () => void;
  lunar: Incident[];
};

const MISSION_LABELS: Record<string, string> = {
  "PURSUE-002": "APOLLO 12",
  "PURSUE-003": "APOLLO 17",
};

const GRID_LABELS: Record<string, string> = {
  "PURSUE-002": "GRID 14-CD",
  "PURSUE-003": "GRID 22-AB",
};

// Crater layouts for the larger plates rendered inside the modal.
// All positions / sizes are SVG units relative to the moon disc viewBox
// (-50,-50)–(50,50).
const PLATE_CRATERS: Record<
  string,
  { cx: number; cy: number; r: number; opacity?: number }[]
> = {
  "PURSUE-002": [
    { cx: -22, cy: -10, r: 5 },
    { cx: 5, cy: 5, r: 4.5 },
    { cx: 18, cy: -18, r: 3 },
    { cx: -10, cy: 22, r: 6 },
    { cx: 28, cy: 12, r: 2.6 },
    { cx: -30, cy: 14, r: 2.2 },
  ],
  "PURSUE-003": [
    { cx: -16, cy: -8, r: 4 },
    { cx: 12, cy: -12, r: 5 },
    { cx: 4, cy: 12, r: 5.5 },
    { cx: -22, cy: 16, r: 3.4 },
    { cx: 22, cy: 18, r: 2.8 },
    { cx: 0, cy: -28, r: 2 },
  ],
};

// AOI rectangles per mission (SVG units in same -50..50 frame)
const PLATE_AOIS: Record<
  string,
  { x: number; y: number; w: number; h: number; label: string; hasTriangle?: boolean }[]
> = {
  "PURSUE-002": [
    { x: -28, y: 4, w: 16, h: 14, label: "AOI-1" },
    { x: 8, y: -22, w: 14, h: 14, label: "AOI-2" },
  ],
  "PURSUE-003": [
    { x: -18, y: -24, w: 22, h: 18, label: "AOI-1", hasTriangle: true },
    { x: 6, y: 8, w: 16, h: 14, label: "AOI-2" },
  ],
};

function bracketCorners() {
  // Decorative bracket corners on the modal panel
  const sz = 12;
  const t = 1; // stroke thickness
  const color = "var(--color-accent)";
  const Corner = ({
    style,
    d,
  }: {
    style: React.CSSProperties;
    d: string;
  }) => (
    <svg
      width={sz}
      height={sz}
      viewBox={`0 0 ${sz} ${sz}`}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
      aria-hidden
    >
      <path d={d} stroke={color} strokeWidth={t} fill="none" />
    </svg>
  );
  return (
    <>
      <Corner
        style={{ top: -1, left: -1 }}
        d={`M 0 ${sz} L 0 0 L ${sz} 0`}
      />
      <Corner
        style={{ top: -1, right: -1 }}
        d={`M 0 0 L ${sz} 0 L ${sz} ${sz}`}
      />
      <Corner
        style={{ bottom: -1, left: -1 }}
        d={`M 0 0 L 0 ${sz} L ${sz} ${sz}`}
      />
      <Corner
        style={{ bottom: -1, right: -1 }}
        d={`M ${sz} 0 L ${sz} ${sz} L 0 ${sz}`}
      />
    </>
  );
}

function LunarPlate({
  incident,
  onPick,
}: {
  incident: Incident;
  onPick: (id: string) => void;
}) {
  const craters = PLATE_CRATERS[incident.id] ?? [];
  const aois = PLATE_AOIS[incident.id] ?? [];
  const mission = MISSION_LABELS[incident.id] ?? "APOLLO";
  const grid = GRID_LABELS[incident.id] ?? "GRID --";
  const color = STATUS_COLOR[incident.status];

  return (
    <button
      type="button"
      onClick={() => onPick(incident.id)}
      className="group relative bg-panel-2 border border-border rounded-sm overflow-hidden text-left hover:border-accent transition-colors"
      aria-label={`Open ${mission} dossier`}
    >
      <div className="relative aspect-[4/3] bg-black overflow-hidden">
        <svg
          viewBox="-50 -50 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <radialGradient
              id={`moon-grad-${incident.id}`}
              cx="35%"
              cy="30%"
              r="80%"
            >
              <stop offset="0%" stopColor="#7a7d83" />
              <stop offset="40%" stopColor="#4a4d52" />
              <stop offset="80%" stopColor="#1f2125" />
              <stop offset="100%" stopColor="#0a0b0d" />
            </radialGradient>
          </defs>
          {/* Star field */}
          {[
            [-44, -38],
            [42, -30],
            [38, 36],
            [-40, 34],
            [-46, 8],
            [46, -2],
            [10, -46],
            [-12, 44],
          ].map((s, i) => (
            <circle
              key={i}
              cx={s[0]}
              cy={s[1]}
              r={0.4}
              fill="#ffffff"
              opacity={0.7}
            />
          ))}
          {/* Moon disc */}
          <circle
            cx={0}
            cy={0}
            r={36}
            fill={`url(#moon-grad-${incident.id})`}
            stroke="var(--color-border-bright)"
            strokeWidth={0.4}
          />
          {/* Craters */}
          {craters.map((c, i) => (
            <circle
              key={i}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill="#15171a"
              opacity={c.opacity ?? 0.85}
            />
          ))}
          {/* Subtle terminator shading */}
          <path
            d="M 0 -36 A 36 36 0 0 1 0 36 A 26 36 0 0 0 0 -36 Z"
            fill="#000"
            opacity={0.22}
          />
          {/* AOI markers */}
          {aois.map((aoi, i) => (
            <g key={i}>
              <rect
                x={aoi.x}
                y={aoi.y}
                width={aoi.w}
                height={aoi.h}
                fill="none"
                stroke={color}
                strokeWidth={0.6}
                className="group-hover:[stroke-width:1.1]"
              />
              <text
                x={aoi.x}
                y={aoi.y - 1.5}
                fill={color}
                fontSize={3.2}
                fontFamily="var(--font-mono)"
                letterSpacing={0.4}
              >
                {aoi.label}
              </text>
              {aoi.hasTriangle && (
                <g fill={color}>
                  <circle
                    cx={aoi.x + aoi.w * 0.3}
                    cy={aoi.y + aoi.h * 0.3}
                    r={1.1}
                  />
                  <circle
                    cx={aoi.x + aoi.w * 0.7}
                    cy={aoi.y + aoi.h * 0.35}
                    r={1.1}
                  />
                  <circle
                    cx={aoi.x + aoi.w * 0.5}
                    cy={aoi.y + aoi.h * 0.7}
                    r={1.1}
                  />
                </g>
              )}
            </g>
          ))}
        </svg>

        {/* Mission badge */}
        <div className="absolute top-2 left-2 bg-bg/70 text-text-dim border border-border-bright px-1.5 py-0.5 text-[9px] tracking-widest backdrop-blur-sm font-mono uppercase">
          {mission}
        </div>
        <div className="absolute top-2 right-2 bg-bg/70 text-text-dim border border-border-bright px-1.5 py-0.5 text-[9px] tracking-widest backdrop-blur-sm font-mono uppercase">
          {incident.dateLabel}
        </div>
        <div className="absolute bottom-2 left-2 text-text-mute text-[9px] tracking-widest font-mono">
          {grid}
        </div>
        <div className="absolute bottom-2 right-2 text-accent text-[9px] tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity">
          OPEN DOSSIER →
        </div>
      </div>

      <div className="px-3 py-2 border-t border-border">
        <div
          className="text-xs tracking-wide uppercase truncate"
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
    </button>
  );
}

export default function LunarModal({ open, onClose, lunar }: LunarModalProps) {
  // Esc-to-close + body scroll lock when open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const handlePick = (id: string) => {
    setSelectedId(id);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="lunar-modal-root"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          aria-modal="true"
          role="dialog"
          aria-label="Lunar dossier full detail"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            className="relative bg-panel border border-border rounded-sm shadow-2xl"
            style={{
              width: "min(720px, calc(100vw - 32px))",
              maxHeight: "min(560px, calc(100vh - 64px))",
            }}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {bracketCorners()}

            {/* Classification banner echo */}
            <div className="border-b border-border-bright bg-black/60 text-[9px] tracking-[0.28em] uppercase text-text-dim flex items-center justify-between gap-3 px-3 py-1.5 scanlines">
              <span>// UNCLASSIFIED // FOR PUBLIC RELEASE //</span>
              <span className="hidden sm:inline text-accent">
                LUNAR // FULL DETAIL
              </span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div>
                <div
                  className="text-sm tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  LUNAR DOSSIER // FULL DETAIL
                </div>
                <div className="text-[10px] text-text-mute tracking-widest uppercase mt-0.5">
                  {lunar.length} APOLLO PLATES // CLICK PLATE TO OPEN INCIDENT
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-text-dim hover:text-accent border border-border hover:border-accent rounded-sm p-1.5 transition-colors"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lunar.map((inc) => (
                <LunarPlate
                  key={inc.id}
                  incident={inc}
                  onPick={handlePick}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-2 flex items-center justify-between gap-3 text-[10px] tracking-widest uppercase text-text-mute">
              <span>SOURCE: NASA ARCHIVE // VIA WAR.GOV/UFO/</span>
              <span className="text-text-dim">ESC TO DISMISS</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
