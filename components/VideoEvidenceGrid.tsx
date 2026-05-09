"use client";

import { useMemo } from "react";
import { Filter, X, Play, ExternalLink } from "lucide-react";
import { videos } from "@/data/videos";
import { incidents } from "@/data/incidents";
import type { EvidenceVideo } from "@/lib/types";
import { useSelectedId, setSelectedId } from "@/lib/store";
import { STATUS_TAG_CLASS, STATUS_LABEL, STATUS_COLOR } from "@/lib/classifications";
import thumbMap from "@/data/video-thumb-map.json";

// Real-thumbnail video grid. Each tile uses the locally-mirrored DVIDS
// thumbnail (scraped via scripts/index-video-thumbs.mjs) when available,
// falling back to a styled sensor-frame background that still indicates
// FLIR/EO/IR/COMBINED format. Both variants share the same chrome:
//
//   - Format badge top-left (FLIR / IR / EO / FMV)
//   - Telemetry corners (location, time, status)
//   - Duration pill bottom-right
//   - Hover-revealed play button
//   - Title + ID strip below the thumb

const FORMAT_CLASS: Record<EvidenceVideo["format"], string> = {
  IR: "text-accent",
  EO: "text-warn",
  RGB: "text-text-dim",
  COMBINED: "text-viz-violet",
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function locationCorner(location: string): string {
  const lower = location.toLowerCase();
  if (lower.includes("greece")) return "GRC";
  if (lower.includes("indo-pacific") || lower.includes("japan")) return "INDOPAC";
  if (lower.includes("syria")) return "SYR";
  if (lower.includes("western united states")) return "W-US";
  if (lower.includes("mediterranean")) return "MED";
  if (lower.includes("uae") || lower.includes("united arab emirates")) return "UAE";
  if (lower.includes("centcom") || lower.includes("middle east") || lower.includes("iraq")) return "CENTCOM";
  if (lower.includes("east coast") || lower.includes("atlantic")) return "ATL";
  if (lower.includes("lunar")) return "LUNAR";
  return "REDACTED";
}

const FALLBACK_BG: Record<EvidenceVideo["format"], string> = {
  IR: "linear-gradient(180deg, #1a1a1a 0%, #0c0c0c 100%)",
  EO: "linear-gradient(180deg, #1a1820 0%, #0f0e12 100%)",
  RGB: "linear-gradient(180deg, #2c2924 0%, #0c0b09 100%)",
  COMBINED: "linear-gradient(180deg, #1a1f25 0%, #0f1216 100%)",
};

export default function VideoEvidenceGrid() {
  const selectedId = useSelectedId();

  const incident = useMemo(
    () => (selectedId ? incidents.find((i) => i.id === selectedId) : null),
    [selectedId],
  );

  const visible = useMemo(() => {
    if (!selectedId) return videos;
    return videos.filter((v) => v.incidentIds?.includes(selectedId));
  }, [selectedId]);

  const filterActive = !!incident;

  return (
    <section
      id="videos"
      className="bg-panel border border-border rounded-[4px]"
      aria-label="Video evidence"
    >
      <div className="h-[40px] px-4 flex items-center justify-between border-b border-border">
        <h2 className="text-[14px] font-semibold text-text">Video evidence</h2>
        <div className="flex items-center gap-3">
          {filterActive ? (
            <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.04em] uppercase text-accent">
              <Filter size={11} strokeWidth={1.5} />
              Filtered to <span className="mono normal-case tracking-normal">{incident?.id}</span>
              <span className="text-text-mute mono normal-case tracking-normal">
                {visible.length} clips
              </span>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="ml-1 inline-flex items-center text-text-dim hover:text-text"
                aria-label="Clear filter"
              >
                <X size={12} strokeWidth={1.5} />
              </button>
            </span>
          ) : (
            <span className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute">
              <span className="mono tnum normal-case tracking-normal">{videos.length}</span> clips
              · DVIDS-hosted
            </span>
          )}
        </div>
      </div>

      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {visible.map((video) => {
          const thumb = (thumbMap as Record<string, string>)[video.id];
          const linkedIncidents = (video.incidentIds ?? [])
            .map((id) => incidents.find((i) => i.id === id))
            .filter((x): x is NonNullable<typeof x> => Boolean(x));
          const primaryStatus = linkedIncidents[0]?.status;

          return (
            <a
              key={video.id}
              href={video.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-panel-2 border border-border rounded-[2px] overflow-hidden hover:border-accent transition-colors"
            >
              <div
                className="relative aspect-[16/9]"
                style={
                  thumb
                    ? undefined
                    : { background: FALLBACK_BG[video.format] }
                }
              >
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt={video.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  // Subtle grid overlay only on fallback chrome — when we have
                  // a real frame we don't want to occlude it.
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(transparent 49.5%, rgba(255,255,255,0.05) 49.5% 50%, transparent 50%), linear-gradient(90deg, transparent 49.5%, rgba(255,255,255,0.05) 49.5% 50%, transparent 50%)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                )}

                {/* Slight gradient bottom for text legibility */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30"
                />

                {/* Format badge */}
                <span
                  className={`absolute top-2 left-2 mono text-[10px] font-semibold tracking-[0.05em] ${FORMAT_CLASS[video.format]} bg-black/55 px-1.5 py-0.5 rounded-[1px]`}
                >
                  {video.format}
                </span>

                {/* Top-right: location code */}
                <span className="absolute top-2 right-2 mono text-[10px] text-white/85 bg-black/55 px-1.5 py-0.5 rounded-[1px]">
                  {locationCorner(video.location)}
                </span>

                {/* Bottom-left: status indicator */}
                {primaryStatus && (
                  <span
                    className="absolute bottom-2 left-2 inline-flex items-center gap-1 text-[10px] mono text-white/85 bg-black/55 px-1.5 py-0.5 rounded-[1px]"
                  >
                    <span
                      aria-hidden
                      className="inline-block w-[5px] h-[5px] rounded-[1px]"
                      style={{ backgroundColor: STATUS_COLOR[primaryStatus] }}
                    />
                    {STATUS_LABEL[primaryStatus]}
                  </span>
                )}

                {/* Duration pill */}
                <span className="absolute bottom-2 right-2 mono text-[10px] text-white bg-black/70 px-1.5 py-0.5 rounded-[1px]">
                  {formatDuration(video.durationSeconds)}
                </span>

                {/* Hover play */}
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-10 h-10 rounded-full border border-white/40 bg-black/50 inline-flex items-center justify-center">
                    <Play size={16} strokeWidth={1.5} fill="currentColor" className="text-white ml-0.5" />
                  </span>
                </span>
              </div>

              <div className="p-3">
                <div className="mono text-[11px] text-text-mute mb-1">
                  {video.id} · {video.location}
                </div>
                <div className="text-[13px] font-medium text-text truncate">
                  {video.title}
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-text-mute">
                  <span>{video.date}</span>
                  <span className="inline-flex items-center gap-1 text-text-dim group-hover:text-accent transition-colors">
                    DVIDS
                    <ExternalLink size={10} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="h-[32px] px-4 flex items-center justify-between border-t border-border text-[11px] text-text-mute">
        <span>
          Hosted by DVIDS · Defense Visual Information Distribution Service
        </span>
        <a
          href="https://www.dvidshub.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:text-text"
        >
          DVIDS catalog
          <ExternalLink size={10} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}
