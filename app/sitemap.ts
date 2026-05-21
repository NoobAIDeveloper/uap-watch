import type { MetadataRoute } from "next";
import { incidents } from "@/data/incidents";
import { documents } from "@/data/documents";
import { videos } from "@/data/videos";
import { url, regionSlug, AGENCY_SLUGS, SITE_URL } from "@/lib/seo";
import { faqEntries } from "@/lib/faq";
import { wikiEntries } from "@/lib/wiki";
import { stateEntries } from "@/lib/states";
import { compareEntries } from "@/lib/compare";

// Programmatic sitemap. Every entity in the dataset gets a canonical URL.
// Next.js inlines this into /sitemap.xml at build time, so it stays in
// sync with the data without any external generator.
//
// Notes for Google Search Console fetch reliability:
//   - <lastmod> uses build time, not a hardcoded date — frozen lastmod
//     suppresses re-crawl signals.
//   - Homepage <loc> ends with a trailing slash; bare-domain locs have
//     caused canonical-resolution issues in Search Console reports.
//   - The Google video sitemap extension is intentionally NOT used. It
//     requires <video:content_loc> or <video:player_loc> per entry, and
//     our sourceUrls are a mix of DVIDS landing pages, PDFs, and JPGs —
//     a partial video extension can fail validation for the whole file.
//     Video pages still appear as ordinary <url> entries.

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homepage: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  };

  const browseArchive: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/browse`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
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

  const stateList: MetadataRoute.Sitemap = stateEntries.map((s) => ({
    url: `${SITE_URL}/state/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const compareList: MetadataRoute.Sitemap = compareEntries.map((c) => ({
    url: `${SITE_URL}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    homepage,
    browseArchive,
    ...incidentEntries,
    ...documentEntries,
    ...videoEntries,
    ...yearEntries,
    ...regionEntries,
    ...agencyEntries,
    ...faqList,
    ...wikiList,
    ...stateList,
    ...compareList,
  ];
}
