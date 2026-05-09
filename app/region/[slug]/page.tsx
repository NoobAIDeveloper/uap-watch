import { notFound } from "next/navigation";
import { incidents } from "@/data/incidents";
import {
  buildMetadata,
  AGENCY_NAMES,
  breadcrumbJsonLd,
  regionSlug,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageShell, { RelatedLinks } from "@/components/PageShell";

type Params = { slug: string };

const regions = Array.from(new Set(incidents.map((i) => i.region)));

export function generateStaticParams() {
  return regions.map((r) => ({ slug: regionSlug(r) }));
}

function findRegion(slug: string) {
  return regions.find((r) => regionSlug(r) === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const region = findRegion(slug);
  if (!region) return {};
  const count = incidents.filter((i) => i.region === region).length;
  return buildMetadata({
    title: `UFO and UAP Incidents in the ${region}`,
    description: `${count} declassified UAP incidents in the ${region} region, indexed from the Pentagon's 2026 PURSUE Release 01 — primary-source documents, locations, and dates.`,
    path: `/region/${slug}`,
    type: "website",
    keywords: ["UFO sightings", region, "UAP", "declassified", "Pentagon"],
  });
}

export default async function RegionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const region = findRegion(slug);
  if (!region) notFound();

  const list = incidents
    .filter((i) => i.region === region)
    .sort((a, b) => a.date.localeCompare(b.date));

  const ld = breadcrumbJsonLd([
    { name: "UAP.WATCH", href: "/" },
    { name: region, href: `/region/${slug}` },
  ]);

  const yearsCovered = Array.from(
    new Set(list.map((i) => i.date.slice(0, 4))),
  ).sort();

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow={`Regional archive · ${region}`}
        title={`UFO and UAP Incidents in the ${region}`}
        subtitle={`${list.length} declassified incidents in the ${region}, spanning ${yearsCovered[0]} to ${yearsCovered[yearsCovered.length - 1]}. All entries sourced from PURSUE Release 01 (Pentagon, 2026-05-08).`}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: "By region", href: "/" },
          { name: region, href: `/region/${slug}` },
        ]}
      >
        <h2>Overview</h2>
        <p>
          The <strong>{region}</strong> region contains{" "}
          <strong>{list.length}</strong> declassified UAP incidents on the
          UAP.WATCH index, spanning <strong>{yearsCovered.join(", ")}</strong>.
          Source agencies for this region include{" "}
          <strong>
            {Array.from(new Set(list.map((i) => AGENCY_NAMES[i.source]))).join(", ")}
          </strong>
          . Status breakdown:{" "}
          {(["resolved", "unresolved", "anomalous", "corroborated"] as const)
            .map((s) => `${list.filter((i) => i.status === s).length} ${s}`)
            .join(", ")}
          .
        </p>

        <h2>All {region} incidents</h2>
        <ul>
          {list.map((i) => (
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

        <RelatedLinks
          heading="Browse other regions"
          items={regions
            .filter((r) => r !== region)
            .map((r) => ({
              href: `/region/${regionSlug(r)}`,
              title: `${r} incidents`,
              sub: `${incidents.filter((i) => i.region === r).length} ON RECORD`,
            }))}
        />
      </PageShell>
    </>
  );
}
