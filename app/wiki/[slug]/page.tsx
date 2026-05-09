import { notFound } from "next/navigation";
import { wikiEntries, wikiBySlug } from "@/lib/wiki";
import { faqBySlug } from "@/lib/faq";
import {
  buildMetadata,
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
  return wikiEntries.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const w = wikiBySlug[slug];
  if (!w) return {};
  return buildMetadata({
    title: w.title,
    description: w.description,
    path: `/wiki/${slug}`,
    type: "article",
    modifiedTime: LAST_UPDATED,
    keywords: w.keywords,
  });
}

export default async function WikiPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const w = wikiBySlug[slug];
  if (!w) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: w.title,
    description: w.description,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    datePublished: "2026-05-09",
    dateModified: LAST_UPDATED,
    keywords: w.keywords.join(", "),
    author: { "@type": "Organization", name: "UAP.WATCH", url: SITE_URL },
    publisher: organizationJsonLd(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url.wiki(w.slug) },
    articleSection: w.sections.map((s) => s.heading),
    articleBody: [w.lead, ...w.sections.map((s) => s.body)].join("\n\n"),
    citation: w.pullQuote
      ? { "@type": "Quotation", text: w.pullQuote }
      : undefined,
  };

  const ld = [
    articleLd,
    breadcrumbJsonLd([
      { name: "UAP.WATCH", href: "/" },
      { name: "Wiki", href: "/" },
      { name: w.title, href: `/wiki/${w.slug}` },
    ]),
  ];

  const relatedFaqs = w.related
    .map((s) => faqBySlug[s])
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const relatedWiki = w.related
    .map((s) => wikiBySlug[s])
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow="UAP.WATCH wiki"
        title={w.title}
        subtitle={w.description}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: "Wiki", href: "/" },
          { name: w.title, href: `/wiki/${w.slug}` },
        ]}
      >
        <p className="text-text text-base">{w.lead}</p>

        {w.pullQuote && <PullQuote>{w.pullQuote}</PullQuote>}

        {w.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}

        <SourceList sources={w.sources} />

        {(relatedFaqs.length > 0 || relatedWiki.length > 0) && (
          <RelatedLinks
            heading="Related"
            items={[
              ...relatedWiki.map((r) => ({
                href: `/wiki/${r.slug}`,
                title: r.title,
                sub: "WIKI",
              })),
              ...relatedFaqs.map((r) => ({
                href: `/q/${r.slug}`,
                title: r.q,
                sub: "QUESTION",
              })),
            ]}
          />
        )}
      </PageShell>
    </>
  );
}
