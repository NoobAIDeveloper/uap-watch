import ReleaseBanner from "@/components/ReleaseBanner";
import StatsStack from "@/components/StatsStack";
import Globe from "@/components/Globe";
import DossierPanel from "@/components/DossierPanel";
import IncidentTable from "@/components/IncidentTable";
import BelowFoldSections from "@/components/BelowFoldSections";
import BrowseHub from "@/components/BrowseHub";

// Layout — Foundry middle path.
//   ReleaseBanner  (wordmark + manifest meta, single strip below AppBar)
//   Globe + StatsStack  (equal-height row; cobe globe left, metrics stack right)
//   IncidentTable (2/3) + DossierPanel (1/3) — sticky right rail
//   BelowFoldSections — Photos, Videos, Documents, Lunar, Sources (lazy)
//   BrowseHub — internal-link tree for SEO crawlers
export default function Page() {
  return (
    <div className="mx-auto max-w-[1480px] px-6 pt-6 pb-24">
      <ReleaseBanner />
      {/* Top row column ratio mirrors the IncidentTable / DossierPanel row
          below (2fr / 1fr) so the right rail stays visually aligned across
          both sections. */}
      <section className="mt-4 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:min-h-[480px]">
        <Globe />
        <StatsStack />
      </section>
      <section className="mt-4 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <IncidentTable />
        <DossierPanel />
      </section>
      {/* Below-fold sections are code-split and lazy-loaded — their data
          (documents.ts ~190KB, videos.ts ~30KB) doesn't block first paint. */}
      <BelowFoldSections />
      {/* SEO/GEO browse hub — server-rendered into the HTML so AI crawlers and
          search engines can discover the full pSEO route tree (incidents,
          documents, videos, year/region/agency archives, FAQ, wiki) without
          executing JS. */}
      <BrowseHub />
    </div>
  );
}
