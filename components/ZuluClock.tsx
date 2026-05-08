"use client";

import { useEffect, useState } from "react";

const PLACEHOLDER = "----.--.-- --:--:--Z";

function formatZulu(d: Date) {
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
  const da = String(d.getUTCDate()).padStart(2, "0");
  const h = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");
  const s = String(d.getUTCSeconds()).padStart(2, "0");
  return `${y}-${mo}-${da} ${h}:${mi}:${s}Z`;
}

export default function ZuluClock({ className }: { className?: string }) {
  const [stamp, setStamp] = useState<string>(PLACEHOLDER);

  useEffect(() => {
    setStamp(formatZulu(new Date()));
    const id = setInterval(() => {
      setStamp(formatZulu(new Date()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`font-mono tabular-nums whitespace-nowrap ${className ?? ""}`}
      suppressHydrationWarning
    >
      {stamp}
    </span>
  );
}
