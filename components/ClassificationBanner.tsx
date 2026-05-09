import ZuluClock from "./ZuluClock";

// 28px sticky strip. Sentence-case sub, tracking 0.06em (was 0.25em).
// Solid green dot replaces the blinking pink one. No scanlines.
export default function ClassificationBanner() {
  return (
    <div
      className="sticky top-0 z-50 h-[28px] bg-black border-b border-border-bright text-[11px] font-medium tracking-[0.04em] uppercase"
      role="banner"
      aria-label="Classification banner"
    >
      <div className="flex h-full w-full items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2 text-text-mute whitespace-nowrap">
          <span>PURSUE / Tranche 01</span>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2 text-text-dim whitespace-nowrap overflow-hidden">
          <span>Unclassified</span>
          <span className="text-text-mute">//</span>
          <span>For public release</span>
          <span className="text-text-mute">//</span>
          <span className="hidden sm:inline mono text-text-mute normal-case tracking-normal">
            <ZuluClock />
          </span>
        </div>

        <div className="flex items-center gap-2 text-text-mute whitespace-nowrap">
          <span
            className="inline-block w-[6px] h-[6px] bg-status-corroborated rounded-[1px]"
            aria-hidden
          />
          <span>Mirror live</span>
        </div>
      </div>
    </div>
  );
}
