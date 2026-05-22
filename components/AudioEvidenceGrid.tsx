"use client";

import { useMemo } from "react";
import { ExternalLink, Headphones, Play } from "lucide-react";
import { audio } from "@/data/audio";
import { incidents } from "@/data/incidents";
import { useSelectedId, setSelectedId } from "@/lib/store";
import { STATUS_COLOR, STATUS_LABEL } from "@/lib/classifications";
import { Filter, X } from "lucide-react";

// NASA mission audio grid. Mirrors VideoEvidenceGrid's chrome (badges,
// corners, hover state) but has no thumbnail track — audio has no
// visual frame, so each tile renders a sensor-frame gradient keyed to
// the mission family (Apollo vs Mercury) with a headphones glyph centered.
// Tiles open the internal /audio/[id] page (not DVIDS direct) so visitors
// land on the AARO narrative + DVIDS embed instead of bouncing off-site.

function missionFamily(title: string): "APOLLO" | "MERCURY" | "OTHER" {
  if (/apollo/i.test(title)) return "APOLLO";
  if (/mercury/i.test(title)) return "MERCURY";
  return "OTHER";
}

const FAMILY_BG: Record<"APOLLO" | "MERCURY" | "OTHER", string> = {
  APOLLO: "linear-gradient(180deg, #0e1a2a 0%, #050810 100%)",
  MERCURY: "linear-gradient(180deg, #1a141a 0%, #0c0810 100%)",
  OTHER: "linear-gradient(180deg, #18181b 0%, #0a0a0c 100%)",
};

const FAMILY_ACCENT: Record<"APOLLO" | "MERCURY" | "OTHER", string> = {
  APOLLO: "text-viz-blue",
  MERCURY: "text-viz-violet",
  OTHER: "text-text-dim",
};

function formatDuration(seconds: number): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function locationCorner(location: string): string {
  const lower = location.toLowerCase();
  if (lower.includes("cislunar")) return "CISLUNAR";
  if (lower.includes("low earth orbit")) return "LEO";
  if (lower.includes("north atlantic")) return "ATL";
  if (lower.includes("texas")) return "TX";
  return "REDACTED";
}

export default function AudioEvidenceGrid() {
  const selectedId = useSelectedId();

  const incident = useMemo(
    () => (selectedId ? incidents.find((i) => i.id === selectedId) : null),
    [selectedId],
  );

  const visible = useMemo(() => {
    if (!selectedId) return audio;
    return audio.filter((a) => a.incidentIds?.includes(selectedId));
  }, [selectedId]);

  const filterActive = !!incident;

  return (
    <section
      id="audio"
      className="bg-panel border border-border rounded-[4px]"
      aria-label="NASA mission audio"
    >
      <div className="h-[40px] px-4 flex items-center justify-between border-b border-border">
        <h2 className="text-[14px] font-semibold text-text">
          Audio evidence{" "}
          <span className="text-text-mute text-[11px] font-medium tracking-[0.04em] uppercase ml-2">
            NASA Apollo + Mercury · Release 02
          </span>
        </h2>
        <div className="flex items-center gap-3">
          {filterActive ? (
            <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.04em] uppercase text-accent">
              <Filter size={11} strokeWidth={1.5} />
              Filtered to{" "}
              <span className="mono normal-case tracking-normal">
                {incident?.id}
              </span>
              <span className="text-text-mute mono normal-case tracking-normal">
                {visible.length} recordings
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
              <span className="mono tnum normal-case tracking-normal">
                {audio.length}
              </span>{" "}
              recordings · DVIDS-hosted
            </span>
          )}
        </div>
      </div>

      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {visible.map((a) => {
          const family = missionFamily(a.title);
          return (
            <a
              key={a.id}
              href={`/audio/${a.id.toLowerCase()}`}
              className="group bg-panel-2 border border-border rounded-[2px] overflow-hidden hover:border-accent transition-colors"
            >
              <div
                className="relative aspect-[16/9]"
                style={{ background: FAMILY_BG[family] }}
              >
                {/* Faint waveform-ish grid */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(transparent 49.5%, rgba(255,255,255,0.08) 49.5% 50%, transparent 50%)",
                    backgroundSize: "100% 16px",
                  }}
                />

                {/* Family badge */}
                <span
                  className={`absolute top-2 left-2 mono text-[10px] font-semibold tracking-[0.05em] ${FAMILY_ACCENT[family]} bg-black/55 px-1.5 py-0.5 rounded-[1px]`}
                >
                  {family}
                </span>

                {/* Location corner */}
                <span className="absolute top-2 right-2 mono text-[10px] text-white/85 bg-black/55 px-1.5 py-0.5 rounded-[1px]">
                  {locationCorner(a.location)}
                </span>

                {/* Centered headphones glyph (no thumbnail to show) */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <Headphones
                    size={32}
                    strokeWidth={1.25}
                    className="text-white/35 group-hover:text-white/65 transition-colors"
                  />
                </span>

                {/* Duration pill */}
                {a.durationSeconds > 0 && (
                  <span className="absolute bottom-2 right-2 mono text-[10px] text-white bg-black/70 px-1.5 py-0.5 rounded-[1px]">
                    {formatDuration(a.durationSeconds)}
                  </span>
                )}

                {/* Bottom-left: date */}
                <span className="absolute bottom-2 left-2 mono text-[10px] text-white/85 bg-black/55 px-1.5 py-0.5 rounded-[1px]">
                  {a.date}
                </span>

                {/* Hover play */}
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-10 h-10 rounded-full border border-white/40 bg-black/55 inline-flex items-center justify-center">
                    <Play
                      size={16}
                      strokeWidth={1.5}
                      fill="currentColor"
                      className="text-white ml-0.5"
                    />
                  </span>
                </span>
              </div>

              <div className="p-3">
                <div className="mono text-[11px] text-text-mute mb-1">
                  {a.id} · {a.location}
                </div>
                <div className="text-[13px] font-medium text-text truncate">
                  {a.title}
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-text-mute">
                  <span>{a.date}</span>
                  <span className="inline-flex items-center gap-1 text-text-dim group-hover:text-accent transition-colors">
                    Listen
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
          NASA mission audio · hosted by DVIDS · declassified 2026-05-22
        </span>
        <a
          href="/browse#audio"
          className="inline-flex items-center gap-1 text-accent hover:text-text"
        >
          See full audio archive
          <ExternalLink size={10} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}
