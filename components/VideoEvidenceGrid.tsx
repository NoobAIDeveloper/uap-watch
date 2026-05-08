"use client";

import { useMemo, useRef } from "react";
import { ArrowUpRight, Filter, X } from "lucide-react";
import { videos } from "@/data/videos";
import { incidents } from "@/data/incidents";
import type { EvidenceVideo } from "@/lib/types";
import { useSelectedId, setSelectedId } from "@/lib/store";

const NOISE_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Pseudo-coordinates for the bottom-right readout. We try to derive a sensible
// label from the location string; otherwise we render [REDACTED].
function coordsLabel(location: string): string {
  const lower = location.toLowerCase();
  if (lower.includes("greece")) return "+37.9°N // +23.7°E";
  if (lower.includes("indo-pacific") || lower.includes("japan")) return "+35.6°N // +139.7°E";
  if (lower.includes("syria")) return "+35.0°N // +38.0°E";
  if (lower.includes("western united states")) return "+39.5°N // -111.5°W";
  if (lower.includes("mediterranean")) return "+35.0°N // +18.0°E";
  if (lower.includes("uae") || lower.includes("united arab emirates")) return "+24.4°N // +54.4°E";
  if (lower.includes("centcom")) return "+33.3°N // +43.7°E";
  if (lower.includes("middle east")) return "+27.0°N // +49.0°E";
  if (lower.includes("east coast") || lower.includes("atlantic")) return "+32.5°N // -75.0°W";
  if (lower.includes("lunar")) return "LUNAR // GRIMALDI";
  return "[REDACTED]";
}

// Pick a positional preset so cards visually differ from one another.
const ELLIPSE_PRESETS: { x: string; y: string }[] = [
  { x: "60%", y: "40%" },
  { x: "30%", y: "55%" },
  { x: "75%", y: "30%" },
  { x: "45%", y: "65%" },
  { x: "20%", y: "30%" },
];

function viewportBackground(video: EvidenceVideo): string {
  // pick a preset based on a stable index from the id
  const idx = (video.id.charCodeAt(4) || 0) % ELLIPSE_PRESETS.length;
  const { x, y } = ELLIPSE_PRESETS[idx];

  switch (video.format) {
    case "IR":
      // Palantir-coded thermal — cyan-to-violet hot spot, no orange/red
      return `radial-gradient(ellipse at ${x} ${y}, rgba(19,201,186,0.55) 0%, rgba(76,144,240,0.45) 18%, rgba(152,129,243,0.45) 40%, rgba(28,33,39,0.8) 70%, #0e1116 100%)`;
    case "EO":
      // dominantly slate-blue — electro-optical
      return `radial-gradient(ellipse at ${x} ${y}, rgba(171,179,191,0.45) 0%, rgba(95,107,124,0.4) 25%, rgba(47,52,60,0.6) 60%, #0e1116 100%)`;
    case "RGB":
    case "COMBINED":
      // neutral cool slate
      return `radial-gradient(ellipse at ${x} ${y}, rgba(171,179,191,0.4) 0%, rgba(64,72,84,0.4) 25%, rgba(37,42,49,0.6) 60%, #0e1116 100%)`;
  }
}

function VideoCard({ video }: { video: EvidenceVideo }) {
  const bg = viewportBackground(video);
  const coords = coordsLabel(video.location);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasLocal = Boolean(video.localPath);

  // When a local file is available, clicking the card requests fullscreen
  // playback. Otherwise (no local mirror) we fall back to opening the
  // canonical war.gov URL in a new tab.
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasLocal) return; // let the anchor navigate to sourceUrl
    e.preventDefault();
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {
        // ignore — fullscreen may be blocked, video keeps playing inline
      });
    }
  };

  return (
    <a
      href={video.sourceUrl}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className="group relative block bg-panel-2 border border-border rounded-sm overflow-hidden hover:border-border-bright transition-colors"
    >
      {/* Viewport */}
      <div className="relative aspect-[16/10] bg-black overflow-hidden">
        {hasLocal ? (
          <video
            ref={videoRef}
            src={video.localPath}
            poster={video.localPosterPath}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            {/* Base IR/EO gradient */}
            <div
              className="absolute inset-0"
              style={{ backgroundImage: bg }}
              aria-hidden
            />
            {/* Noise overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${NOISE_SVG}")`,
                backgroundSize: "160px 160px",
                opacity: 0.06,
                mixBlendMode: "overlay",
              }}
              aria-hidden
            />
          </>
        )}

        {/* Scanlines (above video too — keeps the surveillance aesthetic) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.04) 3px)",
          }}
          aria-hidden
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
          aria-hidden
        />

        {/* Crosshair reticle (visible on hover) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity"
          aria-hidden
        >
          {/* Vertical line */}
          <span className="absolute left-1/2 top-[20%] bottom-[20%] w-px bg-accent -translate-x-1/2" />
          {/* Horizontal line */}
          <span className="absolute top-1/2 left-[20%] right-[20%] h-px bg-accent -translate-y-1/2" />
          {/* Center gap markers (dashes) */}
          <span className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 border border-accent" />
        </div>

        {/* Top-left format badge */}
        <div className="absolute top-2 left-2 bg-bg/70 text-text-dim border border-border-bright px-1.5 py-0.5 text-[9px] tracking-widest backdrop-blur-sm font-mono uppercase">
          {video.format}
        </div>

        {/* Top-right duration */}
        <div className="absolute top-2 right-2 bg-bg/70 text-text-dim border border-border-bright px-1.5 py-0.5 text-[9px] tracking-widest backdrop-blur-sm font-mono uppercase tnum">
          {formatDuration(video.durationSeconds)}
        </div>

        {/* Bottom-left REC */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-status-unresolved text-[9px] tracking-widest font-mono">
          <span className="blink">●</span>
          <span>REC</span>
        </div>

        {/* Bottom-right coords */}
        <div className="absolute bottom-2 right-2 text-text-mute text-[9px] tracking-widest font-mono">
          {coords}
        </div>
      </div>

      {/* Info strip */}
      <div className="px-3 py-2 hairline-t flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <div
            className="text-sm tracking-wide uppercase truncate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {video.title}
          </div>
          <div className="text-[10px] tracking-widest text-text-mute truncate">
            {video.location} // {video.date} // {video.format}
          </div>
        </div>
        <ArrowUpRight
          className="w-3.5 h-3.5 text-text-mute opacity-0 group-hover:opacity-100 group-hover:text-accent transition-opacity flex-shrink-0"
          aria-hidden
        />
      </div>
    </a>
  );
}

export default function VideoEvidenceGrid() {
  const selectedId = useSelectedId();
  const selectedIncident = useMemo(
    () => (selectedId ? incidents.find((i) => i.id === selectedId) ?? null : null),
    [selectedId],
  );

  const visibleVideos = useMemo(() => {
    if (!selectedId) return videos;
    return videos.filter((v) => v.incidentIds?.includes(selectedId));
  }, [selectedId]);

  const total = videos.length;
  const visibleCount = visibleVideos.length;
  const filterActive = !!selectedIncident;
  const counterColor = filterActive ? "text-accent" : "";

  // Catalog-truth breakdown. The Pentagon's canonical CSV lists 28 PURSUE
  // videos (DVIDS-hosted clips). Our local grid additionally renders alt-
  // angle DVIDS dupes plus a handful of non-DVIDS entries (Apollo 17 NASA
  // imagery, FBI photo cards, slide-deck mission reports paired with video
  // events) — surfaced for browsing but flagged in data/videos.ts. We expose
  // both numbers so the hero "28 VIDEO" stat still reconciles cleanly.
  const pursueVideoCount = videos.filter((v) =>
    /dvidshub\.net\/video\//i.test(v.sourceUrl),
  ).length;
  const CANONICAL_PURSUE_VIDEOS = 28;

  if (total === 0) {
    return (
      <div className="bg-panel border border-border rounded-sm">
        <div className="px-4 py-12 text-center text-text-mute text-xs tracking-widest">
          // NO FOOTAGE INDEXED //
        </div>
      </div>
    );
  }

  return (
    <div className="bg-panel border border-border rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 hairline-b">
        <h2
          className={[
            "text-sm tracking-widest uppercase",
            counterColor,
          ].join(" ")}
          style={{ fontFamily: "var(--font-display)" }}
        >
          VIDEO EVIDENCE //{" "}
          {filterActive
            ? `${visibleCount}/${total} CASES`
            : `${pursueVideoCount}/${CANONICAL_PURSUE_VIDEOS} PURSUE · ${total - pursueVideoCount} ADDL`}
        </h2>
        <div className="text-text-mute text-[10px] tracking-widest uppercase">
          FOOTAGE: WAR.GOV/UFO/ (CDN BLOCKS DIRECT MIRRORING)
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

      {/* Grid (or empty state) */}
      {visibleCount === 0 ? (
        <div className="px-4 py-16 mt-8 text-center text-text-mute text-xs tracking-widest uppercase">
          // NO VIDEO EVIDENCE INDEXED FOR THIS INCIDENT //
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {visibleVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="hairline-t py-3 px-4 text-text-mute text-[10px] tracking-widest uppercase">
        ALL FOOTAGE PUBLIC DOMAIN, RELEASED BY U.S. DEPARTMENT OF WAR — 2026-05-08
      </div>
    </div>
  );
}
