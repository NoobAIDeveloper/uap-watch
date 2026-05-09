import { notFound } from "next/navigation";
import Link from "next/link";
import { compareEntries, compareBySlug } from "@/lib/compare";
import {
  buildMetadata,
  breadcrumbJsonLd,
  organizationJsonLd,
  SITE_URL,
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
  return compareEntries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = compareBySlug[slug];
  if (!c) return {};
  return buildMetadata({
    title: c.title,
    description: c.description,
    path: `/compare/${slug}`,
    type: "article",
    modifiedTime: LAST_UPDATED,
    keywords: c.keywords,
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = compareBySlug[slug];
  if (!c) notFound();

  // Article schema with the lead + each section's body as articleBody.
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.description,
    datePublished: "2026-05-10",
    dateModified: LAST_UPDATED,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: { "@type": "Organization", name: "UAP.WATCH", url: SITE_URL },
    publisher: organizationJsonLd(),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/compare/${slug}` },
    articleBody: [c.lead, ...c.sections.map((s) => s.body)].join("\n\n"),
    citation: c.pullQuote
      ? { "@type": "Quotation", text: c.pullQuote }
      : undefined,
    about: [
      { "@type": "Thing", name: c.left.name },
      { "@type": "Thing", name: c.right.name },
    ],
  };

  const ld = [
    articleLd,
    breadcrumbJsonLd([
      { name: "UAP.WATCH", href: "/" },
      { name: "Compare", href: "/" },
      { name: c.title, href: `/compare/${c.slug}` },
    ]),
  ];

  const otherCompares = compareEntries.filter((o) => o.slug !== c.slug);

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow="Comparison"
        title={c.title}
        subtitle={c.description}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: "Compare", href: "/" },
          { name: c.title, href: `/compare/${c.slug}` },
        ]}
      >
        <p className="text-text text-base">{c.lead}</p>

        {c.pullQuote && <PullQuote>{c.pullQuote}</PullQuote>}

        <h2>Side-by-side</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {[c.left, c.right].map((side) => (
            <div
              key={side.name}
              className="bg-panel border border-border rounded-sm p-5"
            >
              <div className="text-accent text-[10px] tracking-[0.3em] mb-3">
                // {side.name.toUpperCase()} //
              </div>
              <dl className="space-y-2">
                {side.facts.map((f) => (
                  <div
                    key={f.label}
                    className="grid grid-cols-[110px_1fr] gap-3 py-1.5 text-sm hairline-b last:border-b-0"
                  >
                    <dt className="text-text-mute text-[10px] tracking-[0.2em] pt-0.5">
                      {f.label.toUpperCase()}
                    </dt>
                    <dd className="text-text-dim">{f.value}</dd>
                  </div>
                ))}
              </dl>
              {side.links && side.links.length > 0 && (
                <ul className="mt-4 space-y-1">
                  {side.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-text-dim hover:text-accent text-xs tracking-wide"
                      >
                        ▸ {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {c.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}

        <SourceList sources={c.sources} />

        <RelatedLinks
          heading="Related comparisons"
          items={otherCompares.map((o) => ({
            href: `/compare/${o.slug}`,
            title: o.title,
            sub: "COMPARE",
          }))}
        />
      </PageShell>
    </>
  );
}
