"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { photos } from "@/data/photos";
import { incidents } from "@/data/incidents";
import type { SourceAgency } from "@/lib/types";
import { SOURCE_LABEL } from "@/lib/classifications";
import { useSelectedId } from "@/lib/store";

// Photo gallery — 14 PURSUE Release 01 images mirrored from war.gov.
// 6-column grid at desktop, 4:3 tiles. Each tile shows the real image
// thumbnail, source-agency tag, catalog ID, and on click opens a
// fullscreen lightbox.

type Filter = "ALL" | SourceAgency;

const FILTER_ORDER: Filter[] = ["ALL", "NASA", "FBI"];
const FILTER_LABEL: Record<Filter, string> = {
  ALL: "All",
  FBI: "FBI",
  NASA: "NASA",
  // unused but typed
  DOD: "DOD",
  STATE: "State",
  USAF: "USAF",
  USN: "USN",
};

export default function PhotoGallery() {
  const selectedIncidentId = useSelectedId();
  const [filter, setFilter] = useState<Filter>("ALL");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(() => {
    const incidentFiltered = selectedIncidentId
      ? photos.filter((p) => p.incidentIds?.includes(selectedIncidentId))
      : photos;
    if (filter === "ALL") return incidentFiltered;
    return incidentFiltered.filter((p) => p.source === filter);
  }, [filter, selectedIncidentId]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      ALL: photos.length,
      FBI: 0,
      NASA: 0,
      DOD: 0,
      STATE: 0,
      USAF: 0,
      USN: 0,
    };
    for (const p of photos) c[p.source]++;
    return c;
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + visible.length) % visible.length,
      ),
    [visible.length],
  );

  // Keyboard nav — Esc closes, ←/→ paginate.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, next, prev]);

  const openPhoto = openIndex !== null ? visible[openIndex] : null;
  const openIncident = openPhoto?.incidentIds?.[0]
    ? incidents.find((i) => i.id === openPhoto.incidentIds?.[0])
    : null;

  return (
    <section
      id="photos"
      className="bg-panel border border-border rounded-[4px]"
      aria-label="Photo gallery"
    >
      <div className="h-[40px] px-4 flex items-center justify-between border-b border-border">
        <h2 className="text-[14px] font-semibold text-text">
          Photographic evidence
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute">
            {visible.length} of {photos.length} images
          </span>
          <div className="flex items-center gap-1">
            {FILTER_ORDER.map((f) => {
              const count = f === "ALL" ? counts.ALL : counts[f];
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
                  <span className={`tnum ${active ? "text-white/70" : "text-text-mute"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {visible.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-[4/3] bg-panel-2 border border-border rounded-[2px] overflow-hidden group hover:border-accent transition-colors text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.localPath}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span
              aria-hidden
              className="absolute top-1.5 left-1.5 mono text-[10px] tracking-[0.04em] text-white/85 bg-black/55 px-1.5 py-0.5 rounded-[1px]"
            >
              {p.catalogId ?? p.id}
            </span>
            <span
              aria-hidden
              className="absolute top-1.5 right-1.5 inline-flex items-center gap-1 h-5 px-1.5 rounded-[1px] text-[10px] font-medium bg-black/55 text-white/90"
            >
              {SOURCE_LABEL[p.source]}
            </span>
            <span className="absolute left-0 right-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-black/85 to-transparent">
              <span className="block mono text-[10px] text-text-dim leading-tight truncate">
                {p.id} · {p.date}
              </span>
              <span className="block text-[12px] text-white leading-tight truncate">
                {p.title}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="h-[32px] px-4 flex items-center justify-between border-t border-border text-[11px] text-text-mute">
        <span>Mirrored from war.gov · {photos.length} total images</span>
        <a
          href="https://www.war.gov/UFO/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:text-text"
        >
          Source catalog
          <ExternalLink size={10} strokeWidth={1.5} />
        </a>
      </div>

      {/* Lightbox */}
      {openPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col"
          onClick={close}
        >
          <div
            className="h-[48px] flex items-center justify-between px-4 border-b border-border-bright bg-bg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="mono text-[12px] text-text-dim">
                {openPhoto.catalogId ?? openPhoto.id}
              </span>
              <span className="text-text-mute">·</span>
              <span className="text-[13px] text-text truncate">
                {openPhoto.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-text-mute mono">
                {openIndex! + 1} / {visible.length}
              </span>
              <a
                href={openPhoto.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 px-2.5 inline-flex items-center gap-1.5 text-[12px] text-text-dim hover:text-text border border-border-bright rounded-[2px]"
              >
                Source
                <ExternalLink size={11} strokeWidth={1.5} />
              </a>
              <button
                type="button"
                onClick={close}
                className="w-8 h-8 inline-flex items-center justify-center rounded-[2px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.12)]"
                aria-label="Close"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div
            className="flex-1 flex items-center justify-center p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center rounded-[2px] bg-panel border border-border-bright text-text-dim hover:text-text"
              aria-label="Previous"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={openPhoto.localPath}
              alt={openPhoto.title}
              className="max-w-full max-h-full object-contain"
            />

            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center rounded-[2px] bg-panel border border-border-bright text-text-dim hover:text-text"
              aria-label="Next"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div
            className="border-t border-border-bright bg-bg px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-[960px] mx-auto flex items-start gap-6">
              <div className="flex-1">
                <div className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute mb-1">
                  Description
                </div>
                <p className="text-[13px] text-text-dim leading-relaxed">
                  {openPhoto.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[12px] min-w-[280px]">
                <span className="text-text-mute">Source</span>
                <span className="text-text">{SOURCE_LABEL[openPhoto.source]}</span>
                <span className="text-text-mute">Date</span>
                <span className="text-text mono">{openPhoto.date}</span>
                {openIncident && (
                  <>
                    <span className="text-text-mute">Incident</span>
                    <a
                      href={`/incident/${openIncident.id.toLowerCase()}`}
                      className="text-accent hover:text-text mono"
                    >
                      {openIncident.id}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
