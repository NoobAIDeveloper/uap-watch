import { notFound } from "next/navigation";
import { incidents } from "@/data/incidents";
import { documents } from "@/data/documents";
import { videos } from "@/data/videos";
import {
  buildMetadata,
  url,
  AGENCY_NAMES,
  AGENCY_SLUGS,
  incidentJsonLd,
  breadcrumbJsonLd,
  regionSlug,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageShell, {
  FactRow,
  PullQuote,
  RelatedLinks,
  SourceList,
} from "@/components/PageShell";

type Params = { id: string };

export function generateStaticParams() {
  return incidents.map((i) => ({ id: i.id.toLowerCase() }));
}

function findIncident(id: string) {
  const upper = id.toUpperCase();
  return incidents.find((i) => i.id.toUpperCase() === upper);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const i = findIncident(id);
  if (!i) return {};
  return buildMetadata({
    title: `${i.location} — ${i.dateLabel} UAP Incident (${i.id})`,
    description: i.summary,
    path: `/incident/${i.id.toLowerCase()}`,
    type: "article",
    publishedTime: i.date,
    keywords: [
      "UAP",
      "UFO",
      i.location,
      i.region,
      AGENCY_NAMES[i.source],
      i.id,
      "declassified",
      "Pentagon",
      "PURSUE",
    ],
  });
}

export default async function IncidentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const i = findIncident(id);
  if (!i) notFound();

  const relatedDocs = documents.filter((d) =>
    (d.incidentIds ?? []).includes(i.id),
  );
  const relatedVideos = videos.filter((v) =>
    (v.incidentIds ?? []).includes(i.id),
  );

  const yearKey = i.date.slice(0, 4);
  const sameRegion = incidents
    .filter((o) => o.region === i.region && o.id !== i.id)
    .slice(0, 6);

  const ld = [
    incidentJsonLd(i),
    breadcrumbJsonLd([
      { name: "UAP.WATCH", href: "/" },
      { name: "Incidents", href: "/" },
      { name: i.location, href: `/incident/${i.id.toLowerCase()}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow={`PURSUE Incident · ${i.id}`}
        title={`${i.location} — ${i.dateLabel}`}
        subtitle={i.summary}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: i.region, href: url.region(regionSlug(i.region)).replace(/^https?:\/\/[^/]+/, "") },
          { name: i.id, href: `/incident/${i.id.toLowerCase()}` },
        ]}
        asideRight={
          <div className="bg-panel border border-border rounded-sm p-5">
            <div className="text-text-mute text-[10px] tracking-[0.25em] mb-4">
              // FILE METADATA //
            </div>
            <FactRow label="ID" value={<code>{i.id}</code>} />
            <FactRow label="Date" value={i.dateLabel} />
            <FactRow label="Location" value={i.location} />
            <FactRow label="Region" value={i.region} />
            <FactRow label="Source" value={AGENCY_NAMES[i.source]} />
            <FactRow label="Class" value={i.classification} />
            <FactRow
              label="Status"
              value={
                <span
                  className="uppercase tracking-widest text-[11px]"
                  style={{
                    color: `var(--color-status-${i.status})`,
                  }}
                >
                  {i.status}
                </span>
              }
            />
            <FactRow
              label="Witnesses"
              value={
                typeof i.witnessCount === "number"
                  ? i.witnessCount
                  : i.witnessCount
              }
            />
          </div>
        }
      >
        {i.keyQuote && <PullQuote>{i.keyQuote}</PullQuote>}

        <h2>Incident summary</h2>
        <p>{i.details}</p>

        <h2>Why this case matters</h2>
        <p>
          This incident is logged in PURSUE Release 01 — the U.S. Department of
          War's 2026-05-08 declassified UAP file release — under identifier{" "}
          <code>{i.id}</code>. The originating agency is the{" "}
          <strong>{AGENCY_NAMES[i.source]}</strong>; the case is currently
          classified <strong>{i.classification}</strong> and rated{" "}
          <strong>{i.status.toUpperCase()}</strong> by the All-domain Anomaly
          Resolution Office (AARO). UAP.WATCH mirrors the original record,
          adds a geographic and temporal index, and links every claim back to{" "}
          <a
            href={i.documentUrl ?? "https://www.war.gov/UFO/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            the canonical war.gov source
          </a>
          .
        </p>

        {(relatedDocs.length > 0 || relatedVideos.length > 0) && (
          <>
            <h2>Primary-source evidence</h2>
            {relatedDocs.length > 0 && (
              <>
                <h3>Declassified documents</h3>
                <ul>
                  {relatedDocs.map((d) => (
                    <li key={d.id}>
                      <a href={`/document/${d.id.toLowerCase()}`}>
                        {d.title}
                      </a>{" "}
                      <span className="text-text-mute text-xs">
                        ({d.id} · {d.classification})
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {relatedVideos.length > 0 && (
              <>
                <h3>Video evidence</h3>
                <ul>
                  {relatedVideos.map((v) => (
                    <li key={v.id}>
                      <a href={`/video/${v.id.toLowerCase()}`}>{v.title}</a>{" "}
                      <span className="text-text-mute text-xs">
                        ({v.id} · {v.format} · {v.durationSeconds}s)
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        <SourceList
          sources={[
            {
              label: "Original record on war.gov",
              url: i.documentUrl ?? "https://www.war.gov/UFO/",
            },
            { label: "PURSUE program portal", url: "https://www.war.gov/UFO/" },
          ]}
        />

        <RelatedLinks
          heading="Other incidents in this region"
          items={sameRegion.map((o) => ({
            href: `/incident/${o.id.toLowerCase()}`,
            title: `${o.location} — ${o.dateLabel}`,
            sub: `${o.id} · ${o.status.toUpperCase()} · ${AGENCY_NAMES[o.source]}`,
          }))}
        />

        <RelatedLinks
          heading="Browse the catalog"
          items={[
            {
              href: `/year/${yearKey}`,
              title: `All ${yearKey} incidents`,
              sub: "BY YEAR",
            },
            {
              href: `/region/${regionSlug(i.region)}`,
              title: `All ${i.region} incidents`,
              sub: "BY REGION",
            },
            {
              href: `/agency/${AGENCY_SLUGS[i.source]}`,
              title: `All ${AGENCY_NAMES[i.source]} files`,
              sub: "BY AGENCY",
            },
            { href: "/", title: "PURSUE situation map", sub: "INTERACTIVE" },
          ]}
        />
      </PageShell>
    </>
  );
}
