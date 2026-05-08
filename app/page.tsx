import HeroHeader from "@/components/HeroHeader";
import StatsStrip from "@/components/StatsStrip";
import SituationMap from "@/components/SituationMap";
import DossierPanel from "@/components/DossierPanel";
import IncidentTable from "@/components/IncidentTable";
import DocumentViewer from "@/components/DocumentViewer";
import VideoEvidenceGrid from "@/components/VideoEvidenceGrid";
import LunarPanel from "@/components/LunarPanel";
import SourceBreakdown from "@/components/SourceBreakdown";

export default function Page() {
  return (
    <div className="mx-auto max-w-[1480px] px-6 pt-16 pb-24">
      <HeroHeader />
      <StatsStrip />
      <section className="mt-8 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <SituationMap />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <DossierPanel />
        </div>
      </section>
      <section className="mt-8">
        <IncidentTable />
      </section>
      <section className="mt-8">
        <DocumentViewer />
      </section>
      <section className="mt-8">
        <VideoEvidenceGrid />
      </section>
      <section className="mt-8">
        <LunarPanel />
      </section>
      <section className="mt-8">
        <SourceBreakdown />
      </section>
    </div>
  );
}
