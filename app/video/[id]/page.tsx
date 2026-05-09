import { notFound } from "next/navigation";
import { videos } from "@/data/videos";
import { incidents } from "@/data/incidents";
import {
  buildMetadata,
  videoJsonLd,
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
  return videos.map((v) => ({ id: v.id.toLowerCase() }));
}

function findVideo(id: string) {
  const upper = id.toUpperCase();
  return videos.find((v) => v.id.toUpperCase() === upper);
}

const FORMAT_NAMES: Record<string, string> = {
  IR: "Forward-Looking Infrared (FLIR/IR)",
  EO: "Electro-Optical (EO)",
  RGB: "Visible / RGB",
  COMBINED: "Combined Sensor",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const v = findVideo(id);
  if (!v) return {};
  return buildMetadata({
    title: `${v.title} — Declassified UAP Video (${v.id})`,
    description: `${v.description} ${v.format} sensor footage from ${v.location}, ${v.date}. Released by U.S. Department of War under PURSUE Release 01.`,
    path: `/video/${v.id.toLowerCase()}`,
    type: "article",
    keywords: [
      "UFO video",
      "UAP video",
      "declassified",
      v.format,
      v.location,
      v.id,
      "DVIDS",
      "Pentagon",
    ],
  });
}

export default async function VideoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const v = findVideo(id);
  if (!v) notFound();

  const linked = (v.incidentIds ?? [])
    .map((iid) => incidents.find((i) => i.id === iid))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const otherVideos = videos.filter((o) => o.id !== v.id).slice(0, 6);

  const ld = [
    videoJsonLd(v),
    breadcrumbJsonLd([
      { name: "UAP.WATCH", href: "/" },
      { name: "Video evidence", href: "/" },
      { name: v.id, href: `/video/${v.id.toLowerCase()}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow={`Video evidence · ${v.id}`}
        title={v.title}
        subtitle={v.description}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: "Videos", href: "/" },
          { name: v.id, href: `/video/${v.id.toLowerCase()}` },
        ]}
        asideRight={
          <div className="bg-panel border border-border rounded-sm p-5">
            <div className="text-text-mute text-[10px] tracking-[0.25em] mb-4">
              // ASSET METADATA //
            </div>
            <FactRow label="ID" value={<code>{v.id}</code>} />
            <FactRow label="Location" value={v.location} />
            <FactRow label="Date" value={v.date} />
            <FactRow label="Format" value={FORMAT_NAMES[v.format] ?? v.format} />
            <FactRow label="Duration" value={`${v.durationSeconds}s`} />
            <FactRow
              label="Source"
              value={
                <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer">
                  DVIDS ↗
                </a>
              }
            />
          </div>
        }
      >
        <h2>About this clip</h2>
        <p>
          <strong>{v.title}</strong> is a declassified U.S. military UAP video
          captured in <strong>{v.location}</strong> in{" "}
          <strong>{v.date}</strong>. The clip is{" "}
          <strong>{v.durationSeconds} seconds</strong> long, recorded in{" "}
          <strong>{FORMAT_NAMES[v.format] ?? v.format}</strong> format. It is
          part of PURSUE Release 01 — the Pentagon's 2026-05-08 declassified
          UAP file release — and is hosted by the Department of Defense via
          the Defense Visual Information Distribution Service (DVIDS).
        </p>

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

        <h2>How to view this clip</h2>
        <p>
          The clip can be viewed and downloaded directly from{" "}
          <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer">
            the official DVIDS asset page
          </a>
          . UAP.WATCH does not host the video file directly to preserve the
          government chain-of-custody for evidentiary footage. All 28 PURSUE
          videos are linked from the homepage video evidence grid.
        </p>

        <SourceList
          sources={[
            { label: "Original asset on DVIDS", url: v.sourceUrl },
            { label: "PURSUE program portal", url: "https://www.war.gov/UFO/" },
          ]}
        />

        <RelatedLinks
          heading="More declassified UAP videos"
          items={otherVideos.map((o) => ({
            href: `/video/${o.id.toLowerCase()}`,
            title: o.title,
            sub: `${o.id} · ${o.format} · ${o.durationSeconds}s`,
          }))}
        />
      </PageShell>
    </>
  );
}
