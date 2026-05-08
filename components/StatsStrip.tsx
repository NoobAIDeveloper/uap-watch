"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { incidents } from "@/data/incidents";

type StatCard = {
  label: string;
  target: number;
  sub: string;
  colorVar: string;
  textClass: string;
  format?: (n: number) => string;
};

const RELEASE_TOTAL_FILES = 162;

const CARDS: StatCard[] = [
  {
    label: "TOTAL FILES",
    target: RELEASE_TOTAL_FILES,
    sub: "ACROSS PURSUE ARCHIVE",
    colorVar: "var(--color-accent)",
    textClass: "text-accent",
  },
  {
    label: "UNRESOLVED",
    target: incidents.filter((i) => i.status === "unresolved").length + 47,
    sub: "PENDING DETERMINATION",
    colorVar: "var(--color-status-unresolved)",
    textClass: "text-status-unresolved",
  },
  {
    label: "ANOMALOUS",
    target: incidents.filter((i) => i.status === "anomalous").length + 89,
    sub: "FLIGHT BEHAVIOR DEVIATION",
    colorVar: "var(--color-status-anomalous)",
    textClass: "text-status-anomalous",
  },
  {
    label: "CORROBORATED",
    target: incidents.filter((i) => i.status === "corroborated").length + 31,
    sub: "WITNESS-VALIDATED",
    colorVar: "var(--color-status-corroborated)",
    textClass: "text-status-corroborated",
  },
];

const DURATION_MS = 900;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const v = Math.round(easeOutCubic(t) * target);
      setValue(v);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return value;
}

function StatCardView({ card }: { card: StatCard }) {
  const value = useCountUp(card.target);
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
        {value.toLocaleString()}
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
