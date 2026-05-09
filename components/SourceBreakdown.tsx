// Source agency breakdown — total file count per agency rendered as a
// horizontal bar chart. Sentence-case labels, Inter, BLUE4 fill, no
// decorative chrome. Server component — values render directly into SSR HTML.

import { incidents } from "@/data/incidents";
import { documents } from "@/data/documents";
import { SOURCE_LABEL } from "@/lib/classifications";
import type { SourceAgency } from "@/lib/types";

const ORDER: SourceAgency[] = ["DOD", "FBI", "USAF", "USN", "NASA", "STATE"];

function computeCounts() {
  const c: Record<SourceAgency, number> = {
    FBI: 0,
    DOD: 0,
    NASA: 0,
    STATE: 0,
    USAF: 0,
    USN: 0,
  };
  const tally = (rows: Array<{ source: SourceAgency }>) => {
    for (const r of rows) c[r.source]++;
  };
  tally(incidents);
  tally(documents);
  return c;
}

export default function SourceBreakdown() {
  const counts = computeCounts();
  const max = Math.max(...Object.values(counts));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <section className="bg-panel border border-border rounded-[4px]">
      <div className="h-[40px] px-4 flex items-center justify-between border-b border-border">
        <h2 className="text-[14px] font-semibold text-text">
          Source agency breakdown
        </h2>
        <span className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute">
          <span className="mono tnum normal-case tracking-normal">{total}</span>{" "}
          rows · {ORDER.length} agencies
        </span>
      </div>
      <div className="px-4 py-4 space-y-2">
        {ORDER.map((agency) => {
          const count = counts[agency];
          const pct = max > 0 ? (count / max) * 100 : 0;
          return (
            <div
              key={agency}
              className="grid grid-cols-[80px_1fr_48px] items-center gap-3 text-[13px]"
            >
              <span className="text-[12px] font-medium text-text-dim">
                {SOURCE_LABEL[agency]}
              </span>
              <div className="h-[6px] bg-panel-2 rounded-[1px] overflow-hidden">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-right text-text tnum">{count}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
