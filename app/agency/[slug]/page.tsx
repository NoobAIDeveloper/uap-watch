import { notFound } from "next/navigation";
import { incidents } from "@/data/incidents";
import { documents } from "@/data/documents";
import {
  buildMetadata,
  AGENCY_NAMES,
  AGENCY_SLUGS,
  breadcrumbJsonLd,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageShell, { RelatedLinks } from "@/components/PageShell";
import type { SourceAgency } from "@/lib/types";

type Params = { slug: string };

const agencyEntries = (Object.entries(AGENCY_SLUGS) as Array<[SourceAgency, string]>).map(
  ([code, slug]) => ({ code, slug }),
);

export function generateStaticParams() {
  return agencyEntries.map(({ slug }) => ({ slug }));
}

function findAgency(slug: string) {
  return agencyEntries.find((a) => a.slug === slug);
}

const AGENCY_CONTEXT: Record<SourceAgency, string> = {
  FBI:
    "The FBI's UAP record on the U.S. public catalog dates to 1947 (the Dallas hexagonal-object memo) and continues through the 2023 'Eye of Sauron' federal-agent encounter and 2025 black-hot infrared captures. The Bureau's role in PURSUE is primarily as witness-statement custodian for U.S.-soil incidents involving federal personnel.",
  DOD:
    "The Department of War (DoD) is the originating source for most modern military UAP video, including CENTCOM and INDOPACOM full-motion-video clips and the 2023 ellipsoid-bronze-metallic-object photograph. AARO sits within DoD as the central UAP investigation body.",
  NASA:
    "NASA's UAP contributions to PURSUE Release 01 are the Apollo-era lunar plates: Apollo 12 (November 1969) areas-of-interest imagery and Apollo 17 (December 1972) — three dots in triangular formation north of Grimaldi crater, witnessed by Astronaut Jack Schmitt.",
  STATE:
    "State Department UAP records are diplomatic cables, including the 1994 PanAm Tajikistan cable in which a commercial pilot recorded an object as 'possibly extraterrestrial and under intelligent control,' and a series of 1985–2025 cables from Papua New Guinea, Kazakhstan, Turkmenistan, Georgia, and Mexico.",
  USAF:
    "U.S. Air Force UAP records span the foundational era (1947 Wright Field AMC memorandum, 1948 Top Secret Air Force Intelligence report) through modern CENTCOM mission reports including DOW-UAP-D14 (Iraq, May 2022), declassified by Major General Richard A. Harrison, USCENTCOM Chief of Staff, on 7 October 2025.",
  USN:
    "U.S. Navy contributions include the 2017 GOFAST video from the USS Theodore Roosevelt strike group (resolved 2026 by AARO as a parallax artifact at ~13,000 ft altitude), the January 2024 Mediterranean 'triangular and metallic UAP at 25,000 feet' mission report, and historical Tic Tac material.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const a = findAgency(slug);
  if (!a) return {};
  const incidentCount = incidents.filter((i) => i.source === a.code).length;
  const docCount = documents.filter((d) => d.source === a.code).length;
  return buildMetadata({
    title: `${AGENCY_NAMES[a.code]} UFO / UAP Files`,
    description: `${incidentCount} incidents and ${docCount} declassified documents from ${AGENCY_NAMES[a.code]} in the Pentagon's 2026 PURSUE Release 01 catalog. Browse by date, location, and classification.`,
    path: `/agency/${slug}`,
    type: "website",
    keywords: [AGENCY_NAMES[a.code], "UFO files", "UAP", "declassified", "Pentagon", "PURSUE"],
  });
}

export default async function AgencyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const a = findAgency(slug);
  if (!a) notFound();

  const code = a.code;
  const list = incidents
    .filter((i) => i.source === code)
    .sort((a, b) => a.date.localeCompare(b.date));
  const docs = documents
    .filter((d) => d.source === code)
    .sort((a, b) => a.date.localeCompare(b.date));

  const ld = breadcrumbJsonLd([
    { name: "UAP.WATCH", href: "/" },
    { name: AGENCY_NAMES[code], href: `/agency/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow={`Source agency · ${code}`}
        title={`${AGENCY_NAMES[code]} — Declassified UFO / UAP Files`}
        subtitle={`${list.length} indexed incidents and ${docs.length} primary-source documents originating from ${AGENCY_NAMES[code]}, sourced from PURSUE Release 01.`}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: "By agency", href: "/" },
          { name: AGENCY_NAMES[code], href: `/agency/${slug}` },
        ]}
      >
        <h2>About {AGENCY_NAMES[code]} UAP records</h2>
        <p>{AGENCY_CONTEXT[code]}</p>

        {list.length > 0 && (
          <>
            <h2>Incidents</h2>
            <ul>
              {list.map((i) => (
                <li key={i.id}>
                  <a href={`/incident/${i.id.toLowerCase()}`}>
                    {i.location} — {i.dateLabel}
                  </a>{" "}
                  <span className="text-text-mute text-xs">
                    ({i.id} · {i.status.toUpperCase()})
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {docs.length > 0 && (
          <>
            <h2>Documents</h2>
            <ul>
              {docs.slice(0, 60).map((d) => (
                <li key={d.id}>
                  <a href={`/document/${d.id.toLowerCase()}`}>{d.title}</a>{" "}
                  <span className="text-text-mute text-xs">
                    ({d.id} · {d.date.slice(0, 4)} · {d.classification})
                  </span>
                </li>
              ))}
              {docs.length > 60 && (
                <li className="text-text-mute text-xs">
                  …and {docs.length - 60} more.
                </li>
              )}
            </ul>
          </>
        )}

        <RelatedLinks
          heading="Browse other source agencies"
          items={agencyEntries
            .filter((other) => other.code !== code)
            .map((other) => ({
              href: `/agency/${other.slug}`,
              title: AGENCY_NAMES[other.code],
              sub: `${incidents.filter((i) => i.source === other.code).length} incidents · ${
                documents.filter((d) => d.source === other.code).length
              } docs`,
            }))}
        />
      </PageShell>
    </>
  );
}
