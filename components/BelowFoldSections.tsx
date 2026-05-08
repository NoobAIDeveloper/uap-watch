"use client";

import dynamic from "next/dynamic";

// Below-the-fold heavy sections. Each is dynamic-imported with ssr:false so:
//   1. Their JS does not block the initial bundle / LCP.
//   2. Their inline data (documents.ts ~190KB, videos.ts ~30KB) ships in
//      separate chunks that the browser fetches after first paint.
//   3. The initial HTML stays small and the LCP target (HeroHeader) paints
//      immediately.
// Skeletons are plain bg-panel rectangles to keep the visual rhythm while
// the chunks land. They roughly match the final heights so CLS stays at 0.

const DocumentViewer = dynamic(() => import("@/components/DocumentViewer"), {
  ssr: false,
  loading: () => (
    <div
      className="bg-panel border border-border rounded-sm animate-pulse"
      style={{ minHeight: 760 }}
      aria-hidden
    />
  ),
});

const VideoEvidenceGrid = dynamic(
  () => import("@/components/VideoEvidenceGrid"),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-panel border border-border rounded-sm animate-pulse"
        style={{ minHeight: 480 }}
        aria-hidden
      />
    ),
  },
);

const LunarPanel = dynamic(() => import("@/components/LunarPanel"), {
  ssr: false,
  loading: () => (
    <div
      className="bg-panel border border-border rounded-sm animate-pulse"
      style={{ minHeight: 380 }}
      aria-hidden
    />
  ),
});

const SourceBreakdown = dynamic(
  () => import("@/components/SourceBreakdown"),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-panel border border-border rounded-sm animate-pulse"
        style={{ minHeight: 280 }}
        aria-hidden
      />
    ),
  },
);

export default function BelowFoldSections() {
  return (
    <>
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
    </>
  );
}
