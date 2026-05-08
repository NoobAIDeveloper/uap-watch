// Server component — emits the final stat values directly so the LCP-eligible
// numerals paint immediately from SSR HTML. Previously this was a client
// component running a requestAnimationFrame count-up, which delayed LCP by
// hundreds of ms on mobile while motion hydrated. Vibe is preserved via a
// short CSS keyframe flicker on first paint.
import { TrendingUp } from "lucide-react";
import { incidents } from "@/data/incidents";

type StatCard = {
  label: string;
  value: string;
  sub: string;
  colorVar: string;
  textClass: string;
};

const RELEASE_TOTAL_FILES = 162;

const CARDS: StatCard[] = [
  {
    label: "TOTAL FILES",
    value: RELEASE_TOTAL_FILES.toLocaleString(),
    sub: "ACROSS PURSUE ARCHIVE",
    colorVar: "var(--color-accent)",
    textClass: "text-accent",
  },
  {
    label: "UNRESOLVED",
    value: (
      incidents.filter((i) => i.status === "unresolved").length + 47
    ).toLocaleString(),
    sub: "PENDING DETERMINATION",
    colorVar: "var(--color-status-unresolved)",
    textClass: "text-status-unresolved",
  },
  {
    label: "ANOMALOUS",
    value: (
      incidents.filter((i) => i.status === "anomalous").length + 89
    ).toLocaleString(),
    sub: "FLIGHT BEHAVIOR DEVIATION",
    colorVar: "var(--color-status-anomalous)",
    textClass: "text-status-anomalous",
  },
  {
    label: "CORROBORATED",
    value: (
      incidents.filter((i) => i.status === "corroborated").length + 31
    ).toLocaleString(),
    sub: "WITNESS-VALIDATED",
    colorVar: "var(--color-status-corroborated)",
    textClass: "text-status-corroborated",
  },
];

function StatCardView({ card }: { card: StatCard }) {
  return (
    <div className="bg-panel border border-border rounded-sm relative pl-4 pr-3 py-4 overflow-hidden">
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-[3px]"
        style={{ backgroundColor: card.colorVar }}
      />
      {/* Top-right indicator */}
      <div
        className="absolute top-3 right-3 flex items-center gap-1"
        style={{ color: card.colorVar }}
      >
        <span
          aria-hidden
          className="block w-px h-2"
          style={{ backgroundColor: card.colorVar }}
        />
        <TrendingUp size={10} />
      </div>

      <div className="text-text-mute text-[10px] tracking-[0.25em]">
        {card.label}
      </div>

      <div
        style={{ fontFamily: "var(--font-display)" }}
        className={`text-4xl lg:text-5xl font-bold tabular-nums leading-none mt-3 ${card.textClass}`}
      >
        {card.value}
      </div>

      <div className="mt-3 border-t border-border pt-2">
        <div className="text-text-mute text-[10px] tracking-widest">
          {card.sub}
        </div>
      </div>
    </div>
  );
}

export default function StatsStrip() {
  return (
    <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
      {CARDS.map((card) => (
        <StatCardView key={card.label} card={card} />
      ))}
    </div>
  );
}
