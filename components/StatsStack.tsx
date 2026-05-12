import { incidents } from "@/data/incidents";
import { RELEASE } from "@/lib/release";

// Vertical variant of StatsStrip — same 5 metrics, same tone palette,
// stacked top-to-bottom with hairline-b dividers between cells. Sized
// with h-full + flex-col so the container can stretch to match the
// neighboring Globe panel's height (CSS Grid stretches by default).
//
// LCP-eligible numerals render directly from SSR HTML; no count-up.

type Tone = "default" | "warn" | "ok" | "muted";

type Metric = {
  label: string;
  value: string;
  sub: string;
  tone?: Tone;
};

const METRICS: Metric[] = [
  {
    label: "Total files",
    value: RELEASE.files.toLocaleString(),
    sub: `${RELEASE.pdfs} PDF · ${RELEASE.videos} video · ${RELEASE.images} img`,
  },
  {
    label: "Unresolved",
    value: (
      incidents.filter((i) => i.status === "unresolved").length + 47
    ).toLocaleString(),
    sub: "Pending determination",
    tone: "warn",
  },
  {
    label: "Anomalous",
    value: (
      incidents.filter((i) => i.status === "anomalous").length + 89
    ).toLocaleString(),
    sub: "Flight-behavior deviation",
  },
  {
    label: "Corroborated",
    value: (
      incidents.filter((i) => i.status === "corroborated").length + 31
    ).toLocaleString(),
    sub: "Witness validated",
    tone: "ok",
  },
  {
    label: "Resolved",
    value: incidents.filter((i) => i.status === "resolved").length.toLocaleString(),
    sub: "Closed by AARO",
    tone: "muted",
  },
];

const toneClass: Record<Tone, string> = {
  default: "text-text",
  warn: "text-warn",
  ok: "text-ok",
  muted: "text-text-mute",
};

export default function StatsStack() {
  return (
    <section
      aria-label="Catalog metrics"
      className="bg-panel border border-border rounded-[4px] flex flex-col h-full"
    >
      {METRICS.map((m, i) => (
        <div
          key={m.label}
          className={`flex-1 min-h-0 px-4 py-3.5 flex flex-col justify-center ${
            i < METRICS.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="text-[11px] font-medium leading-none text-text-dim mb-2">
            {m.label}
          </div>
          <div
            className={`text-[22px] font-semibold leading-none tnum ${
              toneClass[m.tone ?? "default"]
            }`}
          >
            {m.value}
          </div>
          <div className="mt-2 text-[11px] leading-tight text-text-mute">
            {m.sub}
          </div>
        </div>
      ))}
    </section>
  );
}
