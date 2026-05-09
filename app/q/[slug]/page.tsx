import { notFound } from "next/navigation";
import { faqEntries, faqBySlug } from "@/lib/faq";
import {
  buildMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageShell, {
  PullQuote,
  RelatedLinks,
  SourceList,
} from "@/components/PageShell";

type Params = { slug: string };

export function generateStaticParams() {
  return faqEntries.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const f = faqBySlug[slug];
  if (!f) return {};
  return buildMetadata({
    title: f.q,
    description: f.pull ?? f.a.slice(0, 180),
    path: `/q/${slug}`,
    type: "article",
    keywords: ["UFO", "UAP", "declassified", "Pentagon", "PURSUE", f.q],
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const f = faqBySlug[slug];
  if (!f) notFound();

  const allFaqs = [
    { q: f.q, a: f.a },
    ...(f.followups ?? []),
  ];

  const ld = [
    faqJsonLd(allFaqs),
    breadcrumbJsonLd([
      { name: "UAP.WATCH", href: "/" },
      { name: "Questions", href: "/" },
      { name: f.q, href: `/q/${f.slug}` },
    ]),
  ];

  const related = (f.related ?? [])
    .map((s) => faqBySlug[s])
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <JsonLd data={ld} />
      <PageShell
        eyebrow="Question"
        title={f.q}
        crumbs={[
          { name: "UAP.WATCH", href: "/" },
          { name: "Q&A", href: "/" },
          { name: f.q, href: `/q/${f.slug}` },
        ]}
      >
        {f.pull && <PullQuote>{f.pull}</PullQuote>}

        <p>{f.a}</p>

        {f.followups && f.followups.length > 0 && (
          <>
            <h2>Follow-up questions</h2>
            {f.followups.map((fu, i) => (
              <div key={i}>
                <h3>{fu.q}</h3>
                <p>{fu.a}</p>
              </div>
            ))}
          </>
        )}

        {f.sources && <SourceList sources={f.sources} />}

        {related.length > 0 && (
          <RelatedLinks
            heading="Related questions"
            items={related.map((r) => ({
              href: `/q/${r.slug}`,
              title: r.q,
              sub: r.pull?.slice(0, 60),
            }))}
          />
        )}
      </PageShell>
    </>
  );
}
