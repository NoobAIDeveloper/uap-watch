import { ExternalLink } from "lucide-react";

const RELEASE = {
  date: "2026-05-08",
  tranche: 1,
  files: 162,
  pdfs: 120,
  videos: 28,
  images: 14,
  agencies: ["FBI", "DOD", "NASA", "State", "USAF", "USN"],
  lastUpdate: "2026-05-09",
};

// Cleaned hero. Two columns: brand pitch + CTAs left, "Release 01 manifest"
// fact card right. Inter throughout. No 4-card stat grid (those are now in
// the Foundry stats strip below). No theatrical chrome (`▸ //`). No
// colored side strips.
export default function HeroHeader() {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 pt-8 pb-6 border-b border-border">
      {/* Pitch */}
      <div className="flex flex-col">
        <div className="text-[11px] font-medium tracking-[0.06em] uppercase text-accent mb-3">
          Presidential Unsealing &amp; Reporting System for UAP Encounters
        </div>
        <h1 className="text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[1.05] tracking-[-0.005em] text-text mb-3">
          Browse the Pentagon&rsquo;s
          <br />
          declassified UAP file release
          <span className="text-accent">.</span>
        </h1>
        <p className="text-[15px] leading-relaxed text-text-dim max-w-[60ch] mb-5">
          Independent visualization layer for the U.S. Department of War&rsquo;s
          PURSUE program — Tranche {RELEASE.tranche}, released {RELEASE.date}.
          {" "}{RELEASE.files} files, 26 indexed incidents, full-text PDFs, and
          DVIDS-hosted video evidence.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://www.war.gov/UFO/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[30px] px-3 inline-flex items-center gap-1.5 text-[13px] font-medium bg-accent-fill hover:bg-[#215db0] text-white rounded-[2px]"
          >
            View source on war.gov
            <ExternalLink size={12} strokeWidth={1.5} />
          </a>
          <a
            href="#footer"
            className="h-[30px] px-3 inline-flex items-center text-[13px] text-text-dim hover:text-text border border-border-bright hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
          >
            About this mirror
          </a>
        </div>
      </div>

      {/* Release manifest card */}
      <div className="flex items-end">
        <div className="w-full bg-panel border border-border rounded-[4px]">
          <div className="h-[40px] px-4 flex items-center justify-between border-b border-border">
            <span className="text-[13px] font-semibold text-text">
              Release 01 manifest
            </span>
            <span className="mono text-[11px] text-text-mute">
              PURSUE-{RELEASE.date}
            </span>
          </div>
          <dl className="py-2">
            <Row label="Released">
              <span className="text-text">May 8, 2026</span>
              <span className="mono text-[12px] text-text-mute ml-2">· 13:00Z</span>
            </Row>
            <Row label="Files">
              <span className="text-text tnum">{RELEASE.files} total</span>
              <span className="mono text-[12px] text-text-mute ml-2">
                {RELEASE.pdfs} PDF · {RELEASE.videos} video · {RELEASE.images} img
              </span>
            </Row>
            <Row label="Agencies">
              <span className="text-text">{RELEASE.agencies.join(" · ")}</span>
            </Row>
            <Row label="Last update">
              <span className="text-text">May 9, 2026</span>
              <span className="mono text-[12px] text-text-mute ml-2">· r2.36</span>
            </Row>
          </dl>
        </div>
      </div>
    </header>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-3 items-center px-4 py-1.5 text-[13px]">
      <dt className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute">
        {label}
      </dt>
      <dd className="text-text-dim">{children}</dd>
    </div>
  );
}
