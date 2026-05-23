"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, ExternalLink, X } from "lucide-react";

// 48px Foundry-style nav. Sticky below the 28px classification banner.
// Brand wordmark, primary nav links, search input, source button.
//
// All icons use strokeWidth={1.5} (default lucide is 2; the heavier stroke
// reads as Vercel/shadcn rather than Foundry).
//
// Below md: nav links + search collapse into a hamburger sheet that
// slides down beneath the bar.

const NAV_LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Dashboard" },
  { href: "/wiki/ufo-sightings", label: "Sightings" },
  { href: "/#documents", label: "Documents" },
  { href: "/#photos", label: "Photos" },
  { href: "/#videos", label: "Videos" },
  { href: "/compare/gofast-vs-gimbal", label: "Compare" },
  { href: "/wiki/pentagon-ufo-files", label: "Wiki" },
];

export default function AppBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet on route change so a tap navigates and the menu collapses.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Esc closes the sheet.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sticky top-[28px] z-40 bg-panel border-b border-border">
      <div className="mx-auto max-w-[1480px] h-[48px] px-4 flex items-center gap-2 md:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-text font-semibold text-[14px] shrink-0"
        >
          <span
            aria-hidden
            className="inline-flex items-center justify-center w-[18px] h-[18px] bg-accent-fill rounded-[2px] text-white"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5 L5 1 L8 5 L5 9 Z" fill="currentColor" />
            </svg>
          </span>
          uap<span className="text-text-mute font-normal">.watch</span>
        </Link>

        <nav className="hidden md:flex items-center ml-2">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                i === 0
                  ? "h-8 px-3 inline-flex items-center gap-1.5 text-[13px] text-text bg-[rgba(76,144,240,0.12)] rounded-[2px]"
                  : "h-8 px-3 inline-flex items-center text-[13px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
              }
            >
              {link.label}
              {i === 0 && (
                <ChevronDown size={12} strokeWidth={1.5} className="opacity-60" />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden lg:block">
            <Search
              size={14}
              strokeWidth={1.5}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-mute pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search incidents, documents…"
              className="h-[30px] w-[260px] pl-8 pr-3 bg-panel border border-border-bright rounded-[2px] text-[13px] text-text placeholder:text-text-mute focus:outline-2 focus:outline-[rgba(76,144,240,0.5)] focus:border-accent"
              // Search is non-functional in v1 — placeholder only. Wire up to
              // a global keyboard-shortcut command palette in a future round.
            />
          </div>
          <a
            href="https://www.war.gov/UFO/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[30px] px-2.5 md:px-3 inline-flex items-center gap-1.5 text-[13px] text-text-dim hover:text-text border border-border-bright hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
          >
            <span className="hidden sm:inline">Source</span>
            <ExternalLink size={12} strokeWidth={1.5} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden h-[30px] w-[30px] inline-flex items-center justify-center text-text-dim hover:text-text border border-border-bright rounded-[2px]"
          >
            {open ? (
              <X size={14} strokeWidth={1.75} />
            ) : (
              <Menu size={14} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet — slides down beneath the bar. Display-only md hidden. */}
      {open && (
        <div className="md:hidden border-t border-border bg-panel">
          <nav className="px-2 py-2 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="h-10 px-3 inline-flex items-center text-[14px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
