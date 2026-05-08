"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

type RedactionBarProps = { reason: string };

type Stamp = { x: number; y: number; key: number; eventId: string };

function generateEventId(): string {
  // 5-digit zero-padded
  return Math.floor(10000 + Math.random() * 90000).toString();
}

export default function RedactionBar({ reason }: RedactionBarProps) {
  const [hovered, setHovered] = useState(false);
  const [stamp, setStamp] = useState<Stamp | null>(null);
  const keyRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const width = Math.max(60, Math.min(reason.length * 9, 220));

  function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault();
    e.stopPropagation();
    keyRef.current += 1;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStamp({
      x: e.clientX,
      y: e.clientY,
      key: keyRef.current,
      eventId: generateEventId(),
    });
    timeoutRef.current = setTimeout(() => {
      setStamp(null);
    }, 1100);
  }

  return (
    <>
      <span
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="bg-[#0a0a0a] inline-block align-middle h-[1.05em] mx-1 cursor-pointer rounded-[1px] relative select-none"
        style={{
          width: `${width}px`,
          boxShadow: "inset 0 0 0 1px rgba(40,40,40,0.6)",
          backgroundImage:
            "repeating-linear-gradient(45deg, #0a0a0a 0, #0a0a0a 4px, #050505 4px, #050505 8px)",
          cursor:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><line x1='2' y1='8' x2='14' y2='8' stroke='%23ff4757' stroke-width='1.5'/><line x1='8' y1='2' x2='8' y2='14' stroke='%23ff4757' stroke-width='1.5'/><circle cx='8' cy='8' r='5' fill='none' stroke='%23ff4757' stroke-width='1'/></svg>\") 8 8, not-allowed",
        }}
        aria-label={`Redacted: ${reason}`}
        role="button"
      >
        <AnimatePresence>
          {hovered && (
            <motion.span
              key="tooltip"
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.12 }}
              className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-text-mute text-[10px] tracking-widest bg-panel border border-border px-2 py-1 rounded-sm pointer-events-none z-50"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              REDACTED // {reason.toUpperCase()}
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <AnimatePresence>
        {stamp && (
          <motion.div
            key={stamp.key}
            initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            exit={{ opacity: 0, scale: 0.95, rotate: -8, transition: { duration: 0.42 } }}
            transition={{ duration: 0.18 }}
            className="fixed pointer-events-none bg-bg/0 border-2 border-status-unresolved border-dashed px-4 py-2 backdrop-blur-sm rounded-sm"
            style={{
              left: stamp.x,
              top: stamp.y,
              transform: "translate(-50%, -120%) rotate(-8deg)",
              transformOrigin: "center",
              zIndex: 100,
              fontFamily: "var(--font-display)",
              boxShadow:
                "0 0 24px rgba(245,73,139,0.25), inset 0 0 12px rgba(245,73,139,0.06)",
            }}
          >
            <div className="text-status-unresolved text-[9px] tracking-[0.3em] uppercase">
              // CLEARANCE INSUFFICIENT //
            </div>
            <div className="text-status-unresolved text-2xl font-bold leading-none uppercase mt-1">
              DECLASSIFICATION
            </div>
            <div className="text-status-unresolved text-2xl font-bold leading-none uppercase mt-1">
              REQUEST DENIED
            </div>
            <div className="text-status-unresolved text-[8px] tracking-widest uppercase mt-2">
              EVENT-ID #{stamp.eventId}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
