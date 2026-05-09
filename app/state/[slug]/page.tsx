import { notFound } from "next/navigation";
import { stateEntries, stateBySlug } from "@/lib/states";
import { incidents } from "@/data/incidents";
import {
  buildMetadata,
  AGENCY_NAMES,
  breadcrumbJsonLd,
  organizationJsonLd,
  SITE_URL,
  url,
  LAST_UPDATED,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageShell, {
  PullQuote,
  RelatedLinks,
  SourceList,
} from "@/components/PageShell";

type Params = { slug: string };

export function generateStaticParams() {
  return stateEntries.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = stateBySlug[slug];
  if (!s) return {};
  return buildMetadata({
    title: `UFO Sightings in ${s.name} — Declassified Files & Famous Incidents`,
    description: `Complete record of UFO and UAP sightings in ${s.name}: PURSUE Release 01 entries, famous historical incidents, and primary-source documentation. ${s.lead.slice(0, 100)}…`,
    path: `/state/${slug}`,
    type: "article",
    modifiedTime: LAST_UPDATED,
    keywords: [
      `UFO sightings ${s.name}`,
      `${s.name} UFO`,
      `${s.name} UAP`,
      "Pentagon",
      "PURSUE",
      "declassified",
    ],
  });
}

export default async function StatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = stateBySlug[slug];
  if (!s) notFound();

  const linkedIncidents = s.pursueIncidents
    .map((id) => incidents.find((i) => i.id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `UFO Sightings in ${s.name}`,
    description: `${s.name} UFO and UAP record — PURSUE Release 01 entries plus famous historical incidents.`,
    datePublished: "2026-05-10",
    dateModified: LAST_UPDATED,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: { "@type": "Organization", name: "UAP.WATCH", url: SITE_URL },
    publisher: organizationJsonLd(),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/state/${slug}` },
    spatialCoverage: {
      "@type": "Place",
      name: `${s.name}, United States`,
      addressCountry: "US",
      addressRegion: s.abbr,
    },
    articleBody: s.lead,
    citation: s.pullQuote
      ? { "@type": "Quotation", text: s.pullQuote }
      : undefined,
  };

  const ld = [
    articleLd,
    breadcrumbJsonLd([
      { name: "UAP.WATCH", href: "/" },
      { name: "By state", href: "/" },
      { name: s.name, href: `/state/${s.slug}` },
    ]),
  ];

  const otherStates = stateEntries.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow={`State archive · ${s.abbr}`}
        title={`UFO Sightings in ${s.name}`}
        subtitle={`Declassified UAP files, famous historical sightings, and primary-source documentation for ${s.name}.`}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: "By state", href: "/" },
          { name: s.name, href: `/state/${s.slug}` },
        ]}
      >
        <p className="text-text text-base">{s.lead}</p>

        {s.pullQuote && <PullQuote>{s.pullQuote}</PullQuote>}

        {linkedIncidents.length > 0 ? (
          <>
            <h2>PURSUE Release 01 entries from {s.name}</h2>
            <ul>
              {linkedIncidents.map((i) => (
                <li key={i.id}>
                  <a href={`/incident/${i.id.toLowerCase()}`}>
                    {i.location} — {i.dateLabel}
                  </a>{" "}
                  <span className="text-text-mute text-xs">
                    ({i.id} · {i.status.toUpperCase()} · {AGENCY_NAMES[i.source]})
                  </span>
                  {i.summary && (
                    <div className="text-text-mute text-sm mt-1 mb-2">
                      {i.summary}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>PURSUE Release 01 coverage</h2>
            <p>
              {s.name} does not have any incidents publicly geolocated to it in
              PURSUE Release 01. The Pentagon&apos;s catalog covers 26 named
              incidents geographically; many &ldquo;Western United States
              (undisclosed)&rdquo; PURSUE entries — including the 2023
              &ldquo;Eye of Sauron&rdquo; federal-agent encounter — may include
              {" "}{s.name} locations that were redacted to protect facility
              identity.
            </p>
          </>
        )}

        {s.historicalSightings.length > 0 && (
          <>
            <h2>Famous historical sightings in {s.name}</h2>
            {s.historicalSightings.map((h) => (
              <section key={h.title}>
                <h3>
                  {h.title} <span className="text-text-mute text-sm">({h.year})</span>
                </h3>
                <p>{h.description}</p>
              </section>
            ))}
          </>
        )}

        <SourceList sources={s.sources} />

        <RelatedLinks
          heading="Other states"
          items={otherStates.map((o) => ({
            href: `/state/${o.slug}`,
            title: `UFO sightings in ${o.name}`,
            sub: `${o.abbr}`,
          }))}
        />

        <RelatedLinks
          heading="Browse the catalog"
          items={[
            { href: "/wiki/ufo-sightings", title: "All UFO sightings — master index", sub: "WIKI" },
            { href: "/q/ufo-by-state", title: "Which state has the most reported UFOs?", sub: "Q&A" },
            { href: url.home().replace(SITE_URL, ""), title: "PURSUE situation map", sub: "INTERACTIVE" },
          ]}
        />
      </PageShell>
    </>
  );
}
