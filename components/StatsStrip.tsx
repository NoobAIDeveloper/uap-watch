import { incidents } from "@/data/incidents";

// Foundry-dense single-panel metric strip. 5 cells, hairline-divided.
// No individual card chrome. No 3px side strips. No decorative icons.
// Sentence-case labels at 11px, values in Inter 600 at 22px, sub at 11px
// muted. Tone applied to the value color only — never to a chrome strip.
//
// LCP-eligible numerals render directly from SSR HTML (server component);
// no count-up animation, no opacity:0 mount fade.

const RELEASE_TOTAL_FILES = 162;

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
    value: RELEASE_TOTAL_FILES.toLocaleString(),
    sub: "120 PDF · 28 video · 14 img",
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

export default function StatsStrip() {
  return (
    <section
      aria-label="Catalog metrics"
      className="bg-panel border border-border rounded-[4px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
    >
      {METRICS.map((m, i) => (
        <div
          key={m.label}
          className={`px-4 py-3.5 ${
            i < METRICS.length - 1 ? "lg:border-r" : ""
          } border-r border-b border-border lg:border-b-0 last:border-r-0 [&:nth-child(odd)]:sm:border-r [&:nth-last-child(2)]:sm:border-b-0 [&:nth-last-child(1)]:sm:border-b-0`}
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
