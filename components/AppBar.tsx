import Link from "next/link";
import { ChevronDown, Search, ExternalLink } from "lucide-react";

// 48px Foundry-style nav. Sticky below the 28px classification banner.
// Brand wordmark, primary nav links, search input, source button.
//
// All icons use strokeWidth={1.5} (default lucide is 2; the heavier stroke
// reads as Vercel/shadcn rather than Foundry).
export default function AppBar() {
  return (
    <div className="sticky top-[28px] z-40 h-[48px] bg-panel border-b border-border">
      <div className="mx-auto max-w-[1480px] h-full px-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-text font-semibold text-[14px]"
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

        <nav className="flex items-center ml-2">
          <Link
            href="/"
            className="h-8 px-3 inline-flex items-center gap-1.5 text-[13px] text-text bg-[rgba(76,144,240,0.12)] rounded-[2px]"
          >
            Dashboard
            <ChevronDown size={12} strokeWidth={1.5} className="opacity-60" />
          </Link>
          <Link
            href="/wiki/ufo-sightings"
            className="h-8 px-3 inline-flex items-center text-[13px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
          >
            Sightings
          </Link>
          <Link
            href="/agency/fbi"
            className="h-8 px-3 inline-flex items-center text-[13px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
          >
            Documents
          </Link>
          <Link
            href="/#photos"
            className="h-8 px-3 inline-flex items-center text-[13px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
          >
            Photos
          </Link>
          <Link
            href="/#videos"
            className="h-8 px-3 inline-flex items-center text-[13px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
          >
            Videos
          </Link>
          <Link
            href="/compare/gofast-vs-gimbal"
            className="h-8 px-3 inline-flex items-center text-[13px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
          >
            Compare
          </Link>
          <Link
            href="/wiki/pentagon-ufo-files"
            className="h-8 px-3 inline-flex items-center text-[13px] text-text-dim hover:text-text hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
          >
            Wiki
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search
              size={14}
              strokeWidth={1.5}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-mute pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search incidents, documents…"
              className="h-[30px] w-[280px] pl-8 pr-3 bg-panel border border-border-bright rounded-[2px] text-[13px] text-text placeholder:text-text-mute focus:outline-2 focus:outline-[rgba(76,144,240,0.5)] focus:border-accent"
              // Search is non-functional in v1 — placeholder only. Wire up to
              // a global keyboard-shortcut command palette in a future round.
            />
          </div>
          <a
            href="https://www.war.gov/UFO/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[30px] px-3 inline-flex items-center gap-1.5 text-[13px] text-text-dim hover:text-text border border-border-bright hover:bg-[rgba(143,153,168,0.08)] rounded-[2px]"
          >
            <span className="hidden sm:inline">Source</span>
            <ExternalLink size={12} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </div>
  );
}
