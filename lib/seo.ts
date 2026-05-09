// Central SEO + GEO config and JSON-LD builders.
//
// Why this file exists: programmatic SEO needs every route to share the same
// canonical origin, brand, and schema shape. GEO (Generative Engine
// Optimization) needs the same JSON-LD vocabulary repeated consistently across
// hundreds of pages so AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
// can extract structured facts without ambiguity.

import type { Metadata } from "next";
import type { Incident, GovDocument, EvidenceVideo, SourceAgency } from "./types";

export const SITE_URL = "https://uap-watch-flame.vercel.app";
export const SITE_NAME = "UAP.WATCH";
export const SITE_TAGLINE = "Declassified UAP Files — Pentagon PURSUE Program Dashboard";
export const RELEASE_DATE = "2026-05-08";
export const LAST_UPDATED = "2026-05-09";

// ───────────────────────────────────────────────────────────────────────────
// Agency reference
// ───────────────────────────────────────────────────────────────────────────

export const AGENCY_NAMES: Record<SourceAgency, string> = {
  FBI: "Federal Bureau of Investigation",
  DOD: "Department of War (DoD)",
  NASA: "National Aeronautics and Space Administration",
  STATE: "U.S. Department of State",
  USAF: "United States Air Force",
  USN: "United States Navy",
};

export const AGENCY_SLUGS: Record<SourceAgency, string> = {
  FBI: "fbi",
  DOD: "dod",
  NASA: "nasa",
  STATE: "state-department",
  USAF: "us-air-force",
  USN: "us-navy",
};

// ───────────────────────────────────────────────────────────────────────────
// URL helpers — every URL on the site flows through these so the canonical
// origin is consistent and AI crawlers always see absolute, stable URLs.
// ───────────────────────────────────────────────────────────────────────────

export const url = {
  home: () => SITE_URL,
  incident: (id: string) => `${SITE_URL}/incident/${id.toLowerCase()}`,
  document: (id: string) => `${SITE_URL}/document/${id.toLowerCase()}`,
  video: (id: string) => `${SITE_URL}/video/${id.toLowerCase()}`,
  year: (year: number | string) => `${SITE_URL}/year/${year}`,
  region: (slug: string) => `${SITE_URL}/region/${slug}`,
  agency: (slug: string) => `${SITE_URL}/agency/${slug}`,
  faq: (slug: string) => `${SITE_URL}/q/${slug}`,
  wiki: (slug: string) => `${SITE_URL}/wiki/${slug}`,
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function regionSlug(region: string): string {
  return slugify(region);
}

// ───────────────────────────────────────────────────────────────────────────
// Metadata builder
// ───────────────────────────────────────────────────────────────────────────

type BuildMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  images?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  type = "article",
  publishedTime,
  modifiedTime,
  keywords,
  images,
}: BuildMeta): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const ogImage = images?.[0] ?? `${SITE_URL}/opengraph-image`;
  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

// ───────────────────────────────────────────────────────────────────────────
// JSON-LD builders. Every programmatic page emits at least one of these.
// Princeton GEO research: structured citations, statistics, and quotations
// are the single highest-leverage signals for LLM citation. We bake them into
// schema so AI crawlers can extract verbatim.
// ───────────────────────────────────────────────────────────────────────────

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Independent dashboard mirroring the U.S. Department of War's PURSUE program declassified UAP file release.",
    foundingDate: RELEASE_DATE,
    sameAs: ["https://github.com/NoobAIDeveloper/uap-watch"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function datasetJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "PURSUE Release 01 — Declassified UAP File Catalog",
    description:
      "162-file catalog of declassified U.S. government UAP (Unidentified Anomalous Phenomena) records released by the Department of War on 2026-05-08, indexed and visualized by UAP.WATCH. Includes 120 PDFs, 28 videos, and 14 images covering FBI, USAF, USN, NASA, State Department, and DoD sources spanning 1947–2026.",
    url: SITE_URL,
    keywords: [
      "UAP",
      "UFO",
      "declassified",
      "Pentagon",
      "AARO",
      "PURSUE",
      "unidentified aerial phenomena",
    ],
    creator: organizationJsonLd(),
    license: "https://www.usa.gov/government-works",
    isAccessibleForFree: true,
    datePublished: RELEASE_DATE,
    dateModified: LAST_UPDATED,
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: SITE_URL,
      },
    ],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
    })),
  };
}

export function incidentJsonLd(incident: Incident) {
  const lat = incident.coordinates?.[1];
  const lng = incident.coordinates?.[0];
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: `${incident.location} — ${incident.dateLabel} UAP Incident (${incident.id})`,
    description: incident.summary,
    articleBody: incident.details,
    datePublished: incident.date,
    dateModified: LAST_UPDATED,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    keywords: [
      "UAP",
      "UFO",
      incident.location,
      incident.region,
      AGENCY_NAMES[incident.source],
      incident.classification,
      `PURSUE ${incident.id}`,
    ].join(", "),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: organizationJsonLd(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url.incident(incident.id) },
    sourceOrganization: { "@type": "GovernmentOrganization", name: AGENCY_NAMES[incident.source] },
    ...(incident.keyQuote
      ? {
          citation: {
            "@type": "Quotation",
            text: incident.keyQuote,
            spokenByCharacter: AGENCY_NAMES[incident.source],
          },
        }
      : {}),
    ...(!incident.isLunar && Number.isFinite(lat) && Number.isFinite(lng)
      ? {
          contentLocation: {
            "@type": "Place",
            name: incident.location,
            geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
          },
        }
      : {}),
  };
}

export function documentJsonLd(doc: GovDocument, body: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: doc.title,
    identifier: doc.id,
    datePublished: doc.date,
    dateModified: LAST_UPDATED,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    text: body.slice(0, 5000),
    url: url.document(doc.id),
    sameAs: [doc.sourceUrl],
    creator: { "@type": "GovernmentOrganization", name: AGENCY_NAMES[doc.source] },
    publisher: organizationJsonLd(),
    keywords: ["UAP", "UFO", "declassified", AGENCY_NAMES[doc.source], doc.classification].join(", "),
    ...(doc.pageCount ? { numberOfPages: doc.pageCount } : {}),
  };
}

export function videoJsonLd(video: EvidenceVideo) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    uploadDate: typeof video.date === "string" ? video.date : LAST_UPDATED,
    duration: `PT${Math.max(1, video.durationSeconds)}S`,
    contentUrl: video.sourceUrl,
    thumbnailUrl: `${SITE_URL}/opengraph-image`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    publisher: organizationJsonLd(),
    contentLocation: { "@type": "Place", name: video.location },
    keywords: ["UAP", "UFO", "infrared", "thermal", video.format, video.location].join(", "),
  };
}

export type FaqItem = { q: string; a: string };

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// Top-level keyword cluster used across <meta keywords> + JSON-LD keywords.
// Sourced from search demand for UAP/UFO content + branded PURSUE terms.
export const SITE_KEYWORDS = [
  "UFO",
  "UAP",
  "aliens",
  "Pentagon UFO files",
  "declassified UFO documents",
  "PURSUE program",
  "Department of War UAP",
  "AARO",
  "All-domain Anomaly Resolution Office",
  "unidentified aerial phenomena",
  "UFO sightings",
  "UFO map",
  "UFO videos",
  "GOFAST video",
  "GIMBAL video",
  "Roswell",
  "Phoenix Lights",
  "Apollo lunar anomaly",
  "FBI UFO files",
  "USAF UAP report",
  "Navy UAP",
];
