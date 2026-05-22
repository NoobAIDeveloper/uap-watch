import { notFound } from "next/navigation";
import { audio } from "@/data/audio";
import { incidents } from "@/data/incidents";
import {
  buildMetadata,
  audioJsonLd,
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
  return audio.map((a) => ({ id: a.id.toLowerCase() }));
}

function findAudio(id: string) {
  const upper = id.toUpperCase();
  return audio.find((a) => a.id.toUpperCase() === upper);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const a = findAudio(id);
  if (!a) return {};
  return buildMetadata({
    title: `${a.title} — Declassified UAP Audio (${a.id})`,
    description: `${a.description.slice(0, 200)} NASA mission audio from ${a.location}, ${a.date}. Released by U.S. Department of War under PURSUE Release 02 (2026-05-22).`,
    path: `/audio/${a.id.toLowerCase()}`,
    type: "article",
    keywords: [
      "UFO audio",
      "UAP audio",
      "Apollo audio",
      "Mercury audio",
      "NASA",
      "astronaut",
      "declassified",
      a.location,
      a.id,
      "DVIDS",
    ],
  });
}

export default async function AudioPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const a = findAudio(id);
  if (!a) notFound();

  const linked = (a.incidentIds ?? [])
    .map((iid) => incidents.find((i) => i.id === iid))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const otherAudio = audio.filter((o) => o.id !== a.id).slice(0, 6);

  const ld = [
    audioJsonLd(a),
    breadcrumbJsonLd([
      { name: "UAP.WATCH", href: "/" },
      { name: "Audio evidence", href: "/" },
      { name: a.id, href: `/audio/${a.id.toLowerCase()}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow={`Audio evidence · ${a.id}`}
        title={a.title}
        subtitle={a.description.slice(0, 220)}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: "Audio", href: "/" },
          { name: a.id, href: `/audio/${a.id.toLowerCase()}` },
        ]}
        asideRight={
          <div className="bg-panel border border-border rounded-sm p-5">
            <div className="text-text-mute text-[10px] tracking-[0.25em] mb-4">
              // ASSET METADATA //
            </div>
            <FactRow label="ID" value={<code>{a.id}</code>} />
            <FactRow label="Location" value={a.location} />
            <FactRow label="Date" value={a.date} />
            {a.durationSeconds > 0 && (
              <FactRow label="Duration" value={`${a.durationSeconds}s`} />
            )}
            <FactRow
              label="Source"
              value={
                <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer">
                  DVIDS ↗
                </a>
              }
            />
          </div>
        }
      >
        <h2>About this recording</h2>
        <p>
          <strong>{a.title}</strong> is a declassified NASA mission audio
          recording from <strong>{a.location}</strong>, dated{" "}
          <strong>{a.date}</strong>. It is part of PURSUE Release 02 — the
          Department of War&rsquo;s second tranche of UAP-related records,
          declassified on 2026-05-22 — and is hosted by the Department of
          Defense via the Defense Visual Information Distribution Service
          (DVIDS).
        </p>

        <h2>AARO assessment</h2>
        <p style={{ whiteSpace: "pre-line" }}>{a.description}</p>

        {linked.length > 0 && (
          <>
            <h2>Related incidents</h2>
            <ul>
              {linked.map((i) => (
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

        <h2>How to listen</h2>
        <p>
          The audio can be played and downloaded directly from{" "}
          <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer">
            the official DVIDS asset page
          </a>
          . UAP.WATCH does not host the audio file directly to preserve the
          government chain-of-custody. All 7 PURSUE Release 02 audio
          recordings are listed in the browse archive.
        </p>

        <SourceList
          sources={[
            { label: "Original asset on DVIDS", url: a.sourceUrl },
            { label: "PURSUE program portal", url: "https://www.war.gov/UFO/" },
          ]}
        />

        <RelatedLinks
          heading="More PURSUE audio recordings"
          items={otherAudio.map((o) => ({
            href: `/audio/${o.id.toLowerCase()}`,
            title: o.title,
            sub: `${o.id} · ${o.location} · ${o.date}`,
          }))}
        />
      </PageShell>
    </>
  );
}
