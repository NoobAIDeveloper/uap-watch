import HeroHeader from "@/components/HeroHeader";
import StatsStrip from "@/components/StatsStrip";
import SituationMap from "@/components/SituationMap";
import DossierPanel from "@/components/DossierPanel";
import IncidentTable from "@/components/IncidentTable";
import BelowFoldSections from "@/components/BelowFoldSections";

export default function Page() {
  return (
    <div className="mx-auto max-w-[1480px] px-6 pt-16 pb-24">
      <HeroHeader />
      <StatsStrip />
      <section className="mt-8">
        <SituationMap />
      </section>
      <section className="mt-8 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7">
          <IncidentTable />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <DossierPanel />
        </div>
      </section>
      {/* Below-fold sections are code-split and lazy-loaded — their data
          (documents.ts ~190KB, videos.ts ~30KB) doesn't block first paint. */}
      <BelowFoldSections />
    </div>
  );
}
