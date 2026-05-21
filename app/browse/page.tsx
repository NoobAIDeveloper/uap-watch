// Complete pSEO archive — every FAQ, wiki entry, compare page, state page,
// year archive, region archive, agency archive, and incident dossier on the
// site, organized into a single crawlable index. Linked from BrowseHub on
// the homepage and from the Footer "Browse all" link. The homepage strip
// only renders curated picks; this page renders the full tree.

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { incidents } from "@/data/incidents";
import { documents } from "@/data/documents";
import { videos } from "@/data/videos";
import {
  AGENCY_NAMES,
  AGENCY_SLUGS,
  regionSlug,
  buildMetadata,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { faqEntries } from "@/lib/faq";
import { wikiEntries } from "@/lib/wiki";
import { stateEntries } from "@/lib/states";
import { compareEntries } from "@/lib/compare";
import type { SourceAgency } from "@/lib/types";
import { HubColumn, HubLink } from "@/components/BrowseHub";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Browse the Complete PURSUE Catalog — UAP.WATCH",
  description:
    "Complete index of every declassified UFO/UAP file, FAQ, guide, state page, year, region, agency, and incident dossier across the Pentagon's 2026 PURSUE program.",
  path: "/browse",
  type: "website",
  keywords: [
    "UFO archive",
    "UAP archive",
    "PURSUE catalog",
    "declassified UFO files",
    "Pentagon UAP index",
  ],
});

export default function BrowsePage() {
  const years = Array.from(
    new Set(incidents.map((i) => i.date.slice(0, 4))),
  ).sort();
  const regions = Array.from(new Set(incidents.map((i) => i.region)));
  const agencies = Array.from(
    new Set(incidents.map((i) => i.source)),
  ) as SourceAgency[];

  const ld = breadcrumbJsonLd([
    { name: "UAP.WATCH", href: "/" },
    { name: "Browse", href: "/browse" },
  ]);

  const half = Math.ceil(faqEntries.length / 2);
  const questionsLeft = faqEntries.slice(0, half);
  const questionsRight = faqEntries.slice(half);

  return (
    <>
      <JsonLd data={ld} />
      <article className="mx-auto max-w-[1480px] px-6 pt-16 pb-24">
        <nav
          aria-label="Breadcrumb"
          className="text-text-mute text-[10px] tracking-[0.25em] flex items-center flex-wrap gap-x-1.5 gap-y-1 pt-2 pb-6"
        >
          <Link href="/" className="hover:text-accent">
            UAP.WATCH
          </Link>
          <ChevronRight size={10} className="opacity-50" />
          <span className="text-text-dim">BROWSE</span>
        </nav>

        <header className="hairline-b pb-8 mb-10">
          <div className="text-accent text-[10px] tracking-[0.3em] mb-3">
            // COMPLETE ARCHIVE //
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Browse the PURSUE catalog
          </h1>
          <p className="mt-4 text-text-dim text-base sm:text-lg leading-relaxed max-w-[72ch]">
            Every page on UAP.WATCH, organised for crawl and reach:{" "}
            {faqEntries.length} questions, {wikiEntries.length} wikis,{" "}
            {compareEntries.length} compare pages, {stateEntries.length} state
            pages, {years.length} year archives, {regions.length} region
            archives, {agencies.length} agency archives, and {incidents.length}{" "}
            incident dossiers, plus {documents.length} primary documents and{" "}
            {videos.length} videos.
          </p>
        </header>

        <section id="questions" className="scroll-mt-24">
          <div className="text-text-mute text-[10px] tracking-[0.25em] mb-6">
            // QUESTIONS &amp; ANSWERS //
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <HubColumn heading={`First ${questionsLeft.length}`}>
              {questionsLeft.map((f) => (
                <HubLink key={f.slug} href={`/q/${f.slug}`} label={f.q} />
              ))}
            </HubColumn>
            <HubColumn heading={`Next ${questionsRight.length}`}>
              {questionsRight.map((f) => (
                <HubLink key={f.slug} href={`/q/${f.slug}`} label={f.q} />
              ))}
            </HubColumn>
          </div>
        </section>

        <section id="guides" className="mt-16 pt-12 hairline-t scroll-mt-24">
          <div className="text-text-mute text-[10px] tracking-[0.25em] mb-6">
            // TOPICAL GUIDES //
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <HubColumn heading={`Wiki (${wikiEntries.length})`}>
              {wikiEntries.map((w) => (
                <HubLink
                  key={w.slug}
                  href={`/wiki/${w.slug}`}
                  label={w.title}
                />
              ))}
            </HubColumn>
            <HubColumn heading={`Compare (${compareEntries.length})`}>
              {compareEntries.map((c) => (
                <HubLink
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  label={c.title}
                />
              ))}
            </HubColumn>
          </div>
        </section>

        <section id="states" className="mt-16 pt-12 hairline-t scroll-mt-24">
          <div className="text-text-mute text-[10px] tracking-[0.25em] mb-6">
            // BY STATE ({stateEntries.length}) //
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1">
            {stateEntries.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/state/${s.slug}`}
                  className="text-text-dim hover:text-accent text-xs tracking-wide block py-0.5"
                >
                  UFO sightings in {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="filters"
          className="mt-16 pt-12 hairline-t grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 scroll-mt-24"
        >
          <HubColumn heading={`By year (${years.length})`}>
            {years.map((y) => (
              <HubLink
                key={y}
                href={`/year/${y}`}
                label={`${y} — ${incidents.filter((i) => i.date.startsWith(y)).length}`}
              />
            ))}
          </HubColumn>
          <HubColumn heading={`By region (${regions.length})`}>
            {regions.map((r) => (
              <HubLink
                key={r}
                href={`/region/${regionSlug(r)}`}
                label={`${r} (${incidents.filter((i) => i.region === r).length})`}
              />
            ))}
          </HubColumn>
          <HubColumn heading={`By source agency (${agencies.length})`}>
            {agencies.map((a) => (
              <HubLink
                key={a}
                href={`/agency/${AGENCY_SLUGS[a]}`}
                label={`${AGENCY_NAMES[a]} (${incidents.filter((i) => i.source === a).length})`}
              />
            ))}
          </HubColumn>
        </section>

        <section id="incidents" className="mt-16 pt-12 hairline-t scroll-mt-24">
          <div className="text-text-mute text-[10px] tracking-[0.25em] mb-6">
            // ALL INCIDENTS ({incidents.length}) //
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
            {incidents.map((i) => (
              <li key={i.id}>
                <Link
                  href={`/incident/${i.id.toLowerCase()}`}
                  className="text-text-dim hover:text-accent text-xs tracking-wide block py-0.5"
                >
                  <span className="text-text-mute mr-2">{i.id}</span>
                  {i.location} — {i.dateLabel}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
