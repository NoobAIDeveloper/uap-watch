// Server component — internal-link hub that exposes every programmatic
// SEO route from the homepage. AI crawlers and search engines need a single
// reachable index of the ~200+ pSEO pages; this is the bridge from the
// interactive landing into the deep crawl-friendly archive.
//
// Rendered server-side so it appears in the initial HTML — critical for SEO
// signal and for AI scrapers that don't execute JS.

import Link from "next/link";
import { incidents } from "@/data/incidents";
import { documents } from "@/data/documents";
import { videos } from "@/data/videos";
import {
  AGENCY_NAMES,
  AGENCY_SLUGS,
  regionSlug,
} from "@/lib/seo";
import { faqEntries } from "@/lib/faq";
import { wikiEntries } from "@/lib/wiki";
import { stateEntries } from "@/lib/states";
import { compareEntries } from "@/lib/compare";
import type { SourceAgency } from "@/lib/types";

const years = Array.from(
  new Set(incidents.map((i) => i.date.slice(0, 4))),
).sort();

const regions = Array.from(new Set(incidents.map((i) => i.region)));
const agencies = Array.from(new Set(incidents.map((i) => i.source))) as SourceAgency[];

function HubColumn({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-text-mute text-[10px] tracking-[0.25em] mb-3">
        // {heading.toUpperCase()} //
      </div>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function HubLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-text-dim hover:text-accent text-xs tracking-wide block py-0.5"
      >
        {label}
      </Link>
    </li>
  );
}

export default function BrowseHub() {
  return (
    <section
      id="browse-hub"
      className="mt-12 pt-12 hairline-t"
      aria-label="Browse declassified UFO and UAP files"
    >
      <div className="text-text-mute text-[10px] tracking-[0.25em] mb-3">
        // BROWSE THE PURSUE CATALOG //
      </div>
      <h2
        className="text-2xl font-bold tracking-tight mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Declassified UFO and UAP files — full index
      </h2>
      <p className="text-text-dim text-sm max-w-[72ch] leading-relaxed">
        Every Pentagon PURSUE file, every named incident, and every primary-source
        document, organised five ways: by question, by topic, by year, by region,
        and by source agency. {incidents.length} indexed incidents, {documents.length}{" "}
        documents, {videos.length} videos.
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        <HubColumn heading="Top questions">
          {faqEntries.slice(0, 12).map((f) => (
            <HubLink key={f.slug} href={`/q/${f.slug}`} label={f.q} />
          ))}
        </HubColumn>

        <HubColumn heading="More questions">
          {faqEntries.slice(12).map((f) => (
            <HubLink key={f.slug} href={`/q/${f.slug}`} label={f.q} />
          ))}
        </HubColumn>

        <HubColumn heading="Topical guides">
          {wikiEntries.map((w) => (
            <HubLink key={w.slug} href={`/wiki/${w.slug}`} label={w.title} />
          ))}
          {compareEntries.map((c) => (
            <HubLink key={c.slug} href={`/compare/${c.slug}`} label={c.title} />
          ))}
        </HubColumn>

        <HubColumn heading="By state">
          {stateEntries.map((s) => (
            <HubLink
              key={s.slug}
              href={`/state/${s.slug}`}
              label={`UFO sightings in ${s.name}`}
            />
          ))}
        </HubColumn>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
        <HubColumn heading="By year">
          {years.map((y) => (
            <HubLink
              key={y}
              href={`/year/${y}`}
              label={`${y} — ${incidents.filter((i) => i.date.startsWith(y)).length} incident${incidents.filter((i) => i.date.startsWith(y)).length === 1 ? "" : "s"}`}
            />
          ))}
        </HubColumn>

        <HubColumn heading="By region">
          {regions.map((r) => (
            <HubLink
              key={r}
              href={`/region/${regionSlug(r)}`}
              label={`${r} (${incidents.filter((i) => i.region === r).length})`}
            />
          ))}
        </HubColumn>

        <HubColumn heading="By source agency">
          {agencies.map((a) => (
            <HubLink
              key={a}
              href={`/agency/${AGENCY_SLUGS[a]}`}
              label={`${AGENCY_NAMES[a]} (${incidents.filter((i) => i.source === a).length})`}
            />
          ))}
        </HubColumn>
      </div>

      <div className="mt-10 pt-6 hairline-t">
        <div className="text-text-mute text-[10px] tracking-[0.25em] mb-3">
          // ALL INCIDENTS //
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
      </div>
    </section>
  );
}
