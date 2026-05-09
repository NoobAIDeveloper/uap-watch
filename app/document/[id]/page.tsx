import { notFound } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";
import { documents } from "@/data/documents";
import { incidents } from "@/data/incidents";
import {
  buildMetadata,
  AGENCY_NAMES,
  AGENCY_SLUGS,
  documentJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageShell, {
  FactRow,
  RelatedLinks,
  SourceList,
} from "@/components/PageShell";

type Params = { id: string };

export function generateStaticParams() {
  return documents.map((d) => ({ id: d.id.toLowerCase() }));
}

function findDoc(id: string) {
  const upper = id.toUpperCase();
  return documents.find((d) => d.id.toUpperCase() === upper);
}

async function readExtractedBody(id: string): Promise<string | null> {
  const p = path.join(process.cwd(), "public", "extracted", `${id}.txt`);
  try {
    const text = await fs.readFile(p, "utf8");
    return text.trim().length > 0 ? text : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const d = findDoc(id);
  if (!d) return {};
  return buildMetadata({
    title: `${d.title} (${d.id})`,
    description: `Declassified ${AGENCY_NAMES[d.source]} document — ${d.title}. Full text indexed from PURSUE Release 01 (2026-05-08). Classification: ${d.classification}.`,
    path: `/document/${d.id.toLowerCase()}`,
    type: "article",
    publishedTime: d.date,
    keywords: [
      "UAP",
      "UFO",
      "declassified",
      AGENCY_NAMES[d.source],
      d.classification,
      d.id,
      "Pentagon",
      "PURSUE",
    ],
  });
}

export default async function DocumentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const d = findDoc(id);
  if (!d) notFound();

  const extracted = await readExtractedBody(d.id);
  const fallbackBody = d.body.startsWith("FULL TEXT NOT YET INDEXED")
    ? null
    : d.body;
  const body = extracted ?? fallbackBody ?? "";
  const linkedIncidents = (d.incidentIds ?? [])
    .map((iid) => incidents.find((i) => i.id === iid))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const ld = [
    documentJsonLd(d, body),
    breadcrumbJsonLd([
      { name: "UAP.WATCH", href: "/" },
      { name: "Documents", href: "/" },
      { name: d.id, href: `/document/${d.id.toLowerCase()}` },
    ]),
  ];

  // Render the extracted text plain — preserves whitespace and the
  // [[REDACT:reason]] markers from the local pipeline. We don't try to fancy-
  // format here because GEO citation works best when the text is verbatim.
  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow={`Declassified document · ${d.id}`}
        title={d.title}
        subtitle={`${AGENCY_NAMES[d.source]} · ${d.classification} · dated ${d.date}`}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: AGENCY_NAMES[d.source], href: `/agency/${AGENCY_SLUGS[d.source]}` },
          { name: d.id, href: `/document/${d.id.toLowerCase()}` },
        ]}
        asideRight={
          <div className="bg-panel border border-border rounded-sm p-5">
            <div className="text-text-mute text-[10px] tracking-[0.25em] mb-4">
              // DOCUMENT METADATA //
            </div>
            <FactRow label="ID" value={<code>{d.id}</code>} />
            <FactRow label="Date" value={d.date} />
            <FactRow label="Source" value={AGENCY_NAMES[d.source]} />
            <FactRow label="Class" value={d.classification} />
            <FactRow label="Redacted" value={d.redacted ? "YES" : "NO"} />
            {d.pageCount && <FactRow label="Pages" value={d.pageCount} />}
            <FactRow
              label="Original"
              value={
                <a href={d.sourceUrl} target="_blank" rel="noopener noreferrer">
                  war.gov ↗
                </a>
              }
            />
          </div>
        }
      >
        <h2>About this document</h2>
        <p>
          <strong>{d.title}</strong> is a declassified record from the U.S.{" "}
          <strong>{AGENCY_NAMES[d.source]}</strong>, dated{" "}
          <strong>{d.date}</strong>, classification{" "}
          <strong>{d.classification}</strong>. It is part of PURSUE Release 01
          — the Pentagon's first public unsealing of UAP records under the
          Presidential Unsealing & Reporting System for UAP Encounters program,
          published on 2026-05-08 at war.gov/UFO/. UAP.WATCH has indexed the
          full text locally so the document can be read, searched, and cited
          without leaving the site.
        </p>

        {linkedIncidents.length > 0 && (
          <>
            <h2>Linked incidents</h2>
            <ul>
              {linkedIncidents.map((i) => (
                <li key={i.id}>
                  <a href={`/incident/${i.id.toLowerCase()}`}>
                    {i.location} — {i.dateLabel}
                  </a>{" "}
                  <span className="text-text-mute text-xs">({i.id})</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2>Document text</h2>
        {body ? (
          <pre>{body}</pre>
        ) : (
          <p className="text-text-mute italic">
            // THIS DOCUMENT IS A SCANNED IMAGE — OPEN ORIGINAL ON WAR.GOV //
          </p>
        )}

        <SourceList
          sources={[
            {
              label: "Original PDF on war.gov",
              url: d.sourceUrl,
            },
            { label: "PURSUE program portal", url: "https://www.war.gov/UFO/" },
          ]}
        />

        <RelatedLinks
          heading="Browse the catalog"
          items={[
            {
              href: `/agency/${AGENCY_SLUGS[d.source]}`,
              title: `All ${AGENCY_NAMES[d.source]} files`,
              sub: "BY AGENCY",
            },
            {
              href: `/year/${d.date.slice(0, 4)}`,
              title: `All ${d.date.slice(0, 4)} files`,
              sub: "BY YEAR",
            },
            { href: "/wiki/pentagon-ufo-files", title: "How to read PURSUE", sub: "GUIDE" },
            { href: "/", title: "PURSUE situation map", sub: "INTERACTIVE" },
          ]}
        />
      </PageShell>
    </>
  );
}
