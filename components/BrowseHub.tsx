// Server component — curated homepage entry point into the pSEO tree.
// The full archive of every FAQ / wiki / state / year / region / agency /
// incident lives at /browse — this strip is a hand-picked anchor set plus
// the link that takes crawlers (and humans) to the deep index.
//
// Rendered server-side so it appears in the initial HTML — critical for SEO
// signal and for AI scrapers that don't execute JS.

import Link from "next/link";
import { incidents } from "@/data/incidents";
import { documents } from "@/data/documents";
import { videos } from "@/data/videos";
import { AGENCY_SLUGS } from "@/lib/seo";
import { faqEntries, faqBySlug } from "@/lib/faq";
import { wikiEntries, wikiBySlug } from "@/lib/wiki";
import { compareEntries, compareBySlug } from "@/lib/compare";
import { stateEntries, stateBySlug } from "@/lib/states";

// Hand-picked anchors — the highest-intent / highest-volume search terms
// post-war.gov/UFO release. Keep this list short (~8 questions, ~7 guides,
// ~5 states) so the homepage stays scannable even as the long tail grows.
const TOP_QUESTION_SLUGS = [
  "war-gov-ufo",
  "is-war-gov-ufo-real",
  "how-to-download-pursue-files",
  "what-are-uaps",
  "what-is-aaro",
  "gofast-video-explained",
  "eye-of-sauron-orbs",
  "roswell-incident",
];

const TOP_WIKI_SLUGS = [
  "war-gov-ufo-hub",
  "pentagon-ufo-files",
  "uap-disclosure-act-history",
  "aaro-investigations-process",
];

const TOP_COMPARE_SLUGS = [
  "pursue-vs-fbi-vault",
  "aatip-vs-aawsap",
  "gofast-vs-gimbal",
];

const TOP_STATE_SLUGS = ["california", "nevada", "arizona", "new-mexico", "texas"];
const TOP_YEARS = ["1947", "2023", "2024", "2025"];
const TOP_AGENCIES: Array<{ slug: string; label: string }> = [
  { slug: AGENCY_SLUGS.FBI, label: "FBI" },
  { slug: AGENCY_SLUGS.USAF, label: "USAF" },
  { slug: AGENCY_SLUGS.USN, label: "USN" },
  { slug: AGENCY_SLUGS.NASA, label: "NASA" },
];

export function HubColumn({
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

export function HubLink({ href, label }: { href: string; label: string }) {
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

export function HubSeeAll({ href, label }: { href: string; label: string }) {
  return (
    <li className="pt-1.5">
      <Link
        href={href}
        className="text-accent hover:underline text-xs tracking-wide block py-0.5 font-medium"
      >
        {label} →
      </Link>
    </li>
  );
}

export default function BrowseHub() {
  const topQuestions = TOP_QUESTION_SLUGS.map((s) => faqBySlug[s]).filter(
    (x): x is NonNullable<typeof x> => Boolean(x),
  );
  const topWikis = TOP_WIKI_SLUGS.map((s) => wikiBySlug[s]).filter(
    (x): x is NonNullable<typeof x> => Boolean(x),
  );
  const topCompares = TOP_COMPARE_SLUGS.map((s) => compareBySlug[s]).filter(
    (x): x is NonNullable<typeof x> => Boolean(x),
  );
  const topStates = TOP_STATE_SLUGS.map((s) => stateBySlug[s]).filter(
    (x): x is NonNullable<typeof x> => Boolean(x),
  );

  const totalGuides = wikiEntries.length + compareEntries.length;

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
        Declassified UFO and UAP files — featured pages
      </h2>
      <p className="text-text-dim text-sm max-w-[72ch] leading-relaxed">
        Featured questions, guides, and entry points into the catalog.{" "}
        {incidents.length} indexed incidents, {documents.length} documents,{" "}
        {videos.length} videos. For the full index of every FAQ, wiki entry,
        state page, year/region/agency archive, and incident dossier, see the{" "}
        <Link href="/browse" className="text-accent hover:underline">
          complete archive
        </Link>
        .
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
        <HubColumn heading="Top questions">
          {topQuestions.map((f) => (
            <HubLink key={f.slug} href={`/q/${f.slug}`} label={f.q} />
          ))}
          <HubSeeAll
            href="/browse#questions"
            label={`See all ${faqEntries.length} questions`}
          />
        </HubColumn>

        <HubColumn heading="Topical guides">
          {topWikis.map((w) => (
            <HubLink key={w.slug} href={`/wiki/${w.slug}`} label={w.title} />
          ))}
          {topCompares.map((c) => (
            <HubLink key={c.slug} href={`/compare/${c.slug}`} label={c.title} />
          ))}
          <HubSeeAll
            href="/browse#guides"
            label={`See all ${totalGuides} guides`}
          />
        </HubColumn>

        <HubColumn heading="By geography &amp; time">
          <li className="text-xs tracking-wide py-0.5">
            <div className="text-text-mute mb-1">States</div>
            <div className="text-text-dim leading-relaxed">
              {topStates.map((s, i) => (
                <span key={s.slug}>
                  {i > 0 && <span className="text-text-mute"> · </span>}
                  <Link href={`/state/${s.slug}`} className="hover:text-accent">
                    {s.name}
                  </Link>
                </span>
              ))}
            </div>
          </li>
          <li className="text-xs tracking-wide py-0.5 mt-2.5">
            <div className="text-text-mute mb-1">Years</div>
            <div className="text-text-dim leading-relaxed">
              {TOP_YEARS.map((y, i) => (
                <span key={y}>
                  {i > 0 && <span className="text-text-mute"> · </span>}
                  <Link href={`/year/${y}`} className="hover:text-accent">
                    {y}
                  </Link>
                </span>
              ))}
            </div>
          </li>
          <li className="text-xs tracking-wide py-0.5 mt-2.5">
            <div className="text-text-mute mb-1">Source agencies</div>
            <div className="text-text-dim leading-relaxed">
              {TOP_AGENCIES.map((a, i) => (
                <span key={a.slug}>
                  {i > 0 && <span className="text-text-mute"> · </span>}
                  <Link
                    href={`/agency/${a.slug}`}
                    className="hover:text-accent"
                  >
                    {a.label}
                  </Link>
                </span>
              ))}
            </div>
          </li>
          <HubSeeAll href="/browse" label="Browse the full archive" />
        </HubColumn>
      </div>
    </section>
  );
}
