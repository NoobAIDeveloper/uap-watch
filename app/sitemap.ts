import type { MetadataRoute } from "next";
import { incidents } from "@/data/incidents";
import { documents } from "@/data/documents";
import { videos } from "@/data/videos";
import { url, regionSlug, AGENCY_SLUGS, LAST_UPDATED } from "@/lib/seo";
import { faqEntries } from "@/lib/faq";
import { wikiEntries } from "@/lib/wiki";

// Programmatic sitemap. Every entity in the dataset gets a canonical URL.
// Next.js inlines this into /sitemap.xml at build time, so it stays in sync
// with the data without any external generator.

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(LAST_UPDATED);

  const homepage: MetadataRoute.Sitemap[number] = {
    url: url.home(),
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  };

  const incidentEntries: MetadataRoute.Sitemap = incidents.map((i) => ({
    url: url.incident(i.id),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const documentEntries: MetadataRoute.Sitemap = documents.map((d) => ({
    url: url.document(d.id),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const videoEntries: MetadataRoute.Sitemap = videos.map((v) => ({
    url: url.video(v.id),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    videos: [
      {
        title: v.title,
        thumbnail_loc: `${url.home()}/opengraph-image`,
        description: v.description,
      },
    ],
  }));

  // Year coverage must match app/year/[year]/page.tsx — that page derives
  // years from both incidents AND documents, so the sitemap must too or
  // we'll under-list and the IndexNow ping will undercount.
  const years = Array.from(
    new Set([
      ...incidents.map((i) => i.date.slice(0, 4)),
      ...documents.map((d) => d.date.slice(0, 4)),
    ]),
  )
    .filter((y) => /^\d{4}$/.test(y))
    .sort();
  const yearEntries: MetadataRoute.Sitemap = years.map((y) => ({
    url: url.year(y),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const regions = Array.from(new Set(incidents.map((i) => i.region)));
  const regionEntries: MetadataRoute.Sitemap = regions.map((r) => ({
    url: url.region(regionSlug(r)),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const agencies = Array.from(new Set(incidents.map((i) => i.source)));
  const agencyEntries: MetadataRoute.Sitemap = agencies.map((a) => ({
    url: url.agency(AGENCY_SLUGS[a]),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const faqList: MetadataRoute.Sitemap = faqEntries.map((f) => ({
    url: url.faq(f.slug),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const wikiList: MetadataRoute.Sitemap = wikiEntries.map((w) => ({
    url: url.wiki(w.slug),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    homepage,
    ...incidentEntries,
    ...documentEntries,
    ...videoEntries,
    ...yearEntries,
    ...regionEntries,
    ...agencyEntries,
    ...faqList,
    ...wikiList,
  ];
}
