// Server component — purely presentational. Replaced motion mount-fade with
// a CSS keyframe (.row-anim) so the rendered rows ship server-side and
// animate in via the compositor without pulling motion/react into the bundle.
import { incidents } from "@/data/incidents";
import { SOURCE_LABEL } from "@/lib/classifications";
import type { SourceAgency } from "@/lib/types";

type Row = { agency: SourceAgency; count: number };

function computeRows(): Row[] {
  const counts = new Map<SourceAgency, number>();
  for (const incident of incidents) {
    counts.set(incident.source, (counts.get(incident.source) ?? 0) + 1);
  }
  const rows: Row[] = [];
  (Object.keys(SOURCE_LABEL) as SourceAgency[]).forEach((agency) => {
    const count = counts.get(agency) ?? 0;
    if (count > 0) rows.push({ agency, count });
  });
  rows.sort((a, b) => b.count - a.count);
  return rows;
}

export default function SourceBreakdown() {
  const rows = computeRows();
  const max = rows.reduce((m, r) => Math.max(m, r.count), 0) || 1;

  return (
    <div className="bg-panel border border-border rounded-sm p-5">
      {/* Header */}
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-text font-bold tracking-widest text-sm uppercase"
        >
          SOURCE AGENCY DISTRIBUTION
        </h2>
        <div className="text-text-mute text-[10px] tracking-widest uppercase">
          BASED ON CURRENT TRANCHE; FUTURE RELEASES PENDING
        </div>
      </div>
      <div className="hairline-b mt-3 mb-4" />

      {/* Bars */}
      <div className="flex flex-col gap-2">
        {rows.map((row, i) => {
          const pct = (row.count / max) * 100;
          return (
            <div
              key={row.agency}
              style={{ animationDelay: `${i * 0.05}s` }}
              className="row-anim group flex items-center gap-3 px-2 py-1.5 -mx-2 rounded-[1px] hover:bg-panel-2/40 transition-colors"
            >
              <div className="text-text-dim text-xs tracking-widest w-[60px]">
                {SOURCE_LABEL[row.agency]}
              </div>
              <div className="flex-1 h-3 bg-border-bright rounded-[1px] relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-accent transition-[filter] duration-200 group-hover:[filter:drop-shadow(0_0_4px_var(--color-accent))]"
                  style={{ width: `${pct}%` }}
                >
                  {/* scanline overlay on filled portion */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 3px)",
                    }}
                  />
                </div>
              </div>
              <div className="text-text font-bold tabular-nums text-right w-[40px]">
                {row.count}
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-3 text-text-mute text-[10px] tracking-widest uppercase">
        TOTAL CASES INDEXED: {incidents.length}
      </div>

      {/* Note */}
      <div className="mt-2 text-center italic text-text-mute text-[10px] tracking-widest">
        // 28 ADDITIONAL INCIDENTS PENDING ASSIGNMENT — TRANCHE 02 //
      </div>
    </div>
  );
}
