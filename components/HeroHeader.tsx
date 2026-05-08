import { ExternalLink } from "lucide-react";

const RELEASE = {
  totalFiles: 162,
  pdfs: 120,
  videos: 28,
  images: 14,
  totalIncidents: 400,
  redacted: 108,
  releaseDate: "2026-05-08",
  trancheNumber: 1,
};

type MicroStat = {
  label: string;
  value: string;
  sub: React.ReactNode;
  numberClass?: string;
  prefix?: React.ReactNode;
  stripColor: string;
};

const MICRO_STATS: MicroStat[] = [
  {
    label: "FILES TOTAL",
    value: String(RELEASE.totalFiles),
    sub: `${RELEASE.pdfs} PDF · ${RELEASE.videos} VIDEO · ${RELEASE.images} IMG`,
    stripColor: "var(--color-accent)",
  },
  {
    label: "INCIDENTS",
    value: `${RELEASE.totalIncidents}+`,
    sub: "GLOBAL DISTRIBUTION",
    stripColor: "var(--color-accent)",
  },
  {
    label: "REDACTED",
    value: String(RELEASE.redacted),
    sub: "WITNESS PROTECTION ACTIVE",
    numberClass: "text-status-unresolved",
    stripColor: "var(--color-status-unresolved)",
  },
  {
    label: "STATUS",
    value: "ACTIVE",
    sub: "LIVE FEED 02 PENDING",
    numberClass: "text-accent",
    prefix: <span className="blink text-status-anomalous mr-2">●</span>,
    stripColor: "var(--color-accent)",
  },
];

// Server component: HeroHeader is the page's LCP target. Keeping it on the
// server side (and using CSS keyframes for the entrance vibe) means the SSR
// HTML paints with content visible — no waiting for motion/react to hydrate
// before the LCP <p> appears. CSS animations layer on top via the compositor
// without delaying first paint.
export default function HeroHeader() {
  return (
    <header className="relative pt-8 pb-10 hairline-b">
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-7 flex flex-col">
          <div className="hero-anim-fade-down text-accent text-[10px] tracking-[0.3em] mb-4">
            // PRESIDENTIAL UNSEALING & REPORTING SYSTEM //
          </div>

          <h1
            className="hero-anim-fade-up text-[2.25rem] sm:text-5xl lg:text-6xl font-bold leading-none tracking-tight text-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            UAP.WATCH
            <span className="relative inline-block ml-[-0.05em]">
              <span className="text-accent">.</span>
              <span
                aria-hidden
                className="absolute left-0 right-0 -bottom-1 h-[3px] bg-accent"
              />
            </span>
          </h1>

          <p className="hero-anim-fade text-text-dim text-sm tracking-wide mt-3 max-w-[60ch]">
            INDEPENDENT VISUALIZATION LAYER FOR THE U.S. DEPARTMENT OF WAR&apos;S
            DECLASSIFIED UAP FILE RELEASE — TRANCHE {RELEASE.trancheNumber}.
          </p>

          <div className="hero-anim-fade-late flex flex-wrap gap-2 mt-6">
            <a
              href="https://www.war.gov/UFO/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-accent border border-border hover:border-accent px-3 py-1.5 text-[10px] tracking-[0.2em] inline-flex items-center gap-2 transition-colors"
            >
              <span>▸ VIEW SOURCE: WAR.GOV/UFO/</span>
              <ExternalLink size={12} />
            </a>
            <a
              href="#footer"
              className="text-text-dim hover:text-accent border border-border hover:border-accent px-3 py-1.5 text-[10px] tracking-[0.2em] inline-flex items-center gap-2 transition-colors"
            >
              <span>▸ ABOUT THIS MIRROR</span>
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {MICRO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="hero-anim-stat relative bg-panel border border-border rounded-sm pl-4 pr-3 py-3 overflow-hidden"
                style={{ animationDelay: `${0.5 + i * 0.07}s` }}
              >
                <span
                  aria-hidden
                  className="absolute top-0 bottom-0 left-0 w-[3px]"
                  style={{ backgroundColor: stat.stripColor }}
                />
                <div className="text-text-mute text-[10px] tracking-[0.25em]">
                  {stat.label}
                </div>
                <div
                  style={{ fontFamily: "var(--font-display)" }}
                  className={`text-3xl font-bold tabular-nums leading-none mt-2 flex items-baseline ${stat.numberClass ?? "text-text"}`}
                >
                  {stat.prefix}
                  {stat.value}
                </div>
                <div className="text-text-mute text-[10px] tracking-widest mt-2">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
