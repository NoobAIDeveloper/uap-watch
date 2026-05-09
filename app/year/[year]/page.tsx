import { notFound } from "next/navigation";
import { incidents } from "@/data/incidents";
import { documents } from "@/data/documents";
import {
  buildMetadata,
  AGENCY_NAMES,
  AGENCY_SLUGS,
  breadcrumbJsonLd,
  regionSlug,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageShell, { RelatedLinks } from "@/components/PageShell";

type Params = { year: string };

const allYears = Array.from(
  new Set([
    ...incidents.map((i) => i.date.slice(0, 4)),
    ...documents.map((d) => d.date.slice(0, 4)),
  ]),
)
  .filter((y) => /^\d{4}$/.test(y))
  .sort();

export function generateStaticParams() {
  return allYears.map((year) => ({ year }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) return {};
  const incidentCount = incidents.filter((i) => i.date.startsWith(year)).length;
  const docCount = documents.filter((d) => d.date.startsWith(year)).length;
  return buildMetadata({
    title: `${year} UAP Incidents — Declassified UFO Files`,
    description: `${incidentCount} declassified UAP incidents and ${docCount} primary-source documents from ${year}, indexed from the Pentagon's PURSUE Release 01.`,
    path: `/year/${year}`,
    type: "website",
    keywords: ["UFO sightings", `UFO ${year}`, "declassified", "UAP", year],
  });
}

export default async function YearPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();

  const yearIncidents = incidents
    .filter((i) => i.date.startsWith(year))
    .sort((a, b) => a.date.localeCompare(b.date));
  const yearDocs = documents
    .filter((d) => d.date.startsWith(year))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (yearIncidents.length === 0 && yearDocs.length === 0) notFound();

  const ld = breadcrumbJsonLd([
    { name: "UAP.WATCH", href: "/" },
    { name: `${year} archive`, href: `/year/${year}` },
  ]);

  const decade = `${year.slice(0, 3)}0s`;

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow={`Annual archive · ${year}`}
        title={`${year} — Declassified UFO and UAP Incidents`}
        subtitle={`${yearIncidents.length} indexed incidents and ${yearDocs.length} primary-source documents from ${year}, sourced from PURSUE Release 01 (war.gov/UFO/, released 2026-05-08).`}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: "Archive by year", href: "/" },
          { name: year, href: `/year/${year}` },
        ]}
      >
        <h2>What happened in {year}</h2>
        <p>
          {yearIncidents.length === 0
            ? `No incidents are indexed for ${year} on UAP.WATCH; PURSUE Release 01 contains ${yearDocs.length} document(s) dated this year. The full list is below.`
            : yearIncidents.length === 1
              ? `One incident is indexed for ${year}: ${yearIncidents[0].location} (${yearIncidents[0].id}). The encounter is currently rated ${yearIncidents[0].status.toUpperCase()} by AARO.`
              : `${yearIncidents.length} incidents are indexed for ${year}, spanning ${
                  Array.from(new Set(yearIncidents.map((i) => i.region))).join(", ")
                }. Source agencies for this year include ${
                  Array.from(new Set(yearIncidents.map((i) => AGENCY_NAMES[i.source]))).join(", ")
                }.`}
        </p>

        {yearIncidents.length > 0 && (
          <>
            <h2>Incidents</h2>
            <ul>
              {yearIncidents.map((i) => (
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
        )}

        {yearDocs.length > 0 && (
          <>
            <h2>Documents</h2>
            <ul>
              {yearDocs.slice(0, 50).map((d) => (
                <li key={d.id}>
                  <a href={`/document/${d.id.toLowerCase()}`}>{d.title}</a>{" "}
                  <span className="text-text-mute text-xs">
                    ({d.id} · {AGENCY_NAMES[d.source]} · {d.classification})
                  </span>
                </li>
              ))}
              {yearDocs.length > 50 && (
                <li className="text-text-mute text-xs">
                  …and {yearDocs.length - 50} more.
                </li>
              )}
            </ul>
          </>
        )}

        <RelatedLinks
          heading={`Related — ${decade} and adjacent`}
          items={[
            ...allYears
              .filter((y) => Math.abs(parseInt(y) - parseInt(year)) <= 2 && y !== year)
              .map((y) => ({
                href: `/year/${y}`,
                title: `${y} archive`,
                sub: "BY YEAR",
              })),
            { href: "/wiki/ufo-sightings", title: "All UFO sightings", sub: "MASTER INDEX" },
            { href: "/", title: "PURSUE situation map", sub: "INTERACTIVE" },
          ]}
        />

        {yearIncidents.length > 0 && (
          <RelatedLinks
            heading="Browse by source agency"
            items={Array.from(new Set(yearIncidents.map((i) => i.source))).map(
              (s) => ({
                href: `/agency/${AGENCY_SLUGS[s]}`,
                title: `All ${AGENCY_NAMES[s]} files`,
                sub: "BY AGENCY",
              }),
            )}
          />
        )}

        {yearIncidents.length > 0 && (
          <RelatedLinks
            heading="Browse by region"
            items={Array.from(new Set(yearIncidents.map((i) => i.region))).map(
              (r) => ({
                href: `/region/${regionSlug(r)}`,
                title: `${r} incidents`,
                sub: "BY REGION",
              }),
            )}
          />
        )}
      </PageShell>
    </>
  );
}
