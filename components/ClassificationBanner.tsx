import { Lock } from "lucide-react";
import ZuluClock from "./ZuluClock";

// Server component — only ZuluClock is interactive and it's already isolated
// as its own client island. Keeping the banner shell server-rendered avoids
// pulling Lock + the wrapper into the client bundle.
export default function ClassificationBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[30px] bg-black/95 border-b border-border-bright text-[10px] tracking-[0.25em] uppercase backdrop-blur-sm scanlines"
      role="banner"
      aria-label="Classification banner"
    >
      <div className="flex h-full w-full items-center justify-between gap-3 px-4">
        {/* Left zone */}
        <div className="flex items-center gap-1.5 text-text-mute whitespace-nowrap">
          <Lock size={10} aria-hidden="true" />
          <span>// PURSUE / TRANCHE 01</span>
        </div>

        {/* Center zone */}
        <div className="flex flex-1 items-center justify-center gap-1.5 text-text whitespace-nowrap overflow-hidden">
          <span>// UNCLASSIFIED // FOR PUBLIC RELEASE //</span>
          <span className="hidden sm:inline">UAP-WATCH //</span>
          <span className="hidden sm:inline text-accent">
            <ZuluClock />
          </span>
          <span className="hidden sm:inline">//</span>
        </div>

        {/* Right zone */}
        <div className="flex items-center gap-1.5 text-text-mute whitespace-nowrap">
          <span className="text-status-resolved blink" aria-hidden="true">
            ●
          </span>
          <span>MIRROR DIST. / OBS-001</span>
        </div>
      </div>
    </div>
  );
}
