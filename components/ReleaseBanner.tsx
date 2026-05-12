import { RELEASE } from "@/lib/release";

// Sits directly below AppBar. Foundry-style horizontal strip: wordmark on
// the left, manifest metadata on the right, single hairline divider
// between them. Replaces the old HeroHeader marketing block — the longer
// description copy moves into the OpenGraph/SEO description set in
// app/layout.tsx so the keyword surface survives the visual cut.
export default function ReleaseBanner() {
  const meta = [
    `RELEASE ${RELEASE.tranche.toString().padStart(2, "0")} MANIFEST`,
    `${RELEASE.files} FILES`,
    `${RELEASE.pdfs} PDF`,
    `${RELEASE.videos} VIDEO`,
    `${RELEASE.images} IMG`,
    `${RELEASE.agencies.length} AGENCIES`,
    RELEASE.manifestId,
  ].join("  ·  ");

  return (
    <section
      aria-label="Release manifest"
      className="bg-panel border border-border rounded-[4px] flex flex-col sm:flex-row sm:items-stretch overflow-hidden"
    >
      <div className="flex items-center px-5 py-3 sm:py-0 sm:h-[56px] sm:min-w-[220px] border-b sm:border-b-0 sm:border-r border-border">
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-text leading-none">
          uap<span className="text-accent">.</span>watch<span className="text-accent">.</span>
        </h1>
      </div>
      <div className="flex-1 flex items-center px-5 py-3 sm:py-0 sm:h-[56px] mono text-[11px] font-medium tracking-[0.06em] uppercase text-text-dim overflow-x-auto whitespace-nowrap">
        {meta}
      </div>
    </section>
  );
}
