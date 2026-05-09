#!/usr/bin/env node
// Ping IndexNow with the full URL list after every Vercel production deploy.
//
// Why: IndexNow is the protocol Bing, Yandex, Seznam, and (via Bing) ChatGPT
// search use to discover new/changed URLs immediately rather than waiting on
// crawl cadence. One submission of up to 10,000 URLs is rate-limit-friendly.
//
// How it runs: registered as `postbuild` in package.json. Vercel's build
// pipeline: install → prebuild (llms-full) → next build → postbuild (this).
// We guard with VERCEL_ENV so previews and local builds no-op silently.
//
// Verification: the IndexNow protocol requires a key file at
// /<key>.txt at site root. We host that statically from public/.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const HOST = "uap-watch-flame.vercel.app";
const SITE_URL = `https://${HOST}`;
const KEY = "cf4436398d8a6801e52b8d5c293e536d";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

// Skip on preview / local. Vercel sets VERCEL_ENV to "production" only on
// the production deploy of the linked branch (main, in our case).
const env = process.env.VERCEL_ENV ?? "local";
if (env !== "production" && !process.env.INDEXNOW_FORCE) {
  console.log(`[indexnow] skipping — VERCEL_ENV=${env} (set INDEXNOW_FORCE=1 to override)`);
  process.exit(0);
}

function readSource(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), "utf8");
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const AGENCY_SLUGS = {
  FBI: "fbi",
  DOD: "dod",
  NASA: "nasa",
  STATE: "state-department",
  USAF: "us-air-force",
  USN: "us-navy",
};

// Mirror lib/seo.ts URL builders without compiling TS — we re-derive the URL
// list from raw data sources so this script stays in sync with sitemap.ts.

function parseIds(src, prefixRe) {
  const re = new RegExp(`id:\\s*"(${prefixRe.source})"`, "g");
  const ids = [];
  let m;
  while ((m = re.exec(src)) !== null) ids.push(m[1]);
  return ids;
}

function parseIncidents() {
  const src = readSource("data/incidents.ts");
  const re = /id:\s*"(PURSUE-\d+)",\s*date:\s*"(\d{4})-\d{2}-\d{2}",[\s\S]*?region:\s*"([^"]+)",[\s\S]*?source:\s*"([^"]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    out.push({ id: m[1], year: m[2], region: m[3], source: m[4] });
  }
  return out;
}

function parseFaqSlugs() {
  const src = readSource("lib/faq.ts");
  const re = /\{\s*slug:\s*"([^"]+)",\s*q:/g;
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) out.push(m[1]);
  return out;
}

function parseWikiSlugs() {
  const src = readSource("lib/wiki.ts");
  const re = /\{\s*slug:\s*"([^"]+)",\s*title:/g;
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) out.push(m[1]);
  return out;
}

function parseDocYears() {
  const src = readSource("data/documents.ts");
  const re = /date:\s*"(\d{4})-\d{2}-\d{2}"/g;
  const out = new Set();
  let m;
  while ((m = re.exec(src)) !== null) out.add(m[1]);
  return Array.from(out);
}

function buildUrlList() {
  const incidents = parseIncidents();
  const docIds = parseIds(readSource("data/documents.ts"), /DOC-\d+/);
  const vidIds = parseIds(readSource("data/videos.ts"), /VID-\d+/);
  const faqSlugs = parseFaqSlugs();
  const wikiSlugs = parseWikiSlugs();

  // Year coverage derives from incidents AND documents to match the year
  // route's generateStaticParams in app/year/[year]/page.tsx.
  const incidentYears = incidents.map((i) => i.year);
  const docYears = parseDocYears();
  const years = Array.from(new Set([...incidentYears, ...docYears])).sort();
  const regions = Array.from(new Set(incidents.map((i) => i.region)));
  const agencies = Array.from(new Set(incidents.map((i) => i.source)));

  const urls = new Set();
  urls.add(SITE_URL);
  for (const i of incidents) urls.add(`${SITE_URL}/incident/${i.id.toLowerCase()}`);
  for (const id of docIds) urls.add(`${SITE_URL}/document/${id.toLowerCase()}`);
  for (const id of vidIds) urls.add(`${SITE_URL}/video/${id.toLowerCase()}`);
  for (const y of years) urls.add(`${SITE_URL}/year/${y}`);
  for (const r of regions) urls.add(`${SITE_URL}/region/${slugify(r)}`);
  for (const a of agencies) {
    const slug = AGENCY_SLUGS[a];
    if (slug) urls.add(`${SITE_URL}/agency/${slug}`);
  }
  for (const s of faqSlugs) urls.add(`${SITE_URL}/q/${s}`);
  for (const s of wikiSlugs) urls.add(`${SITE_URL}/wiki/${s}`);

  return Array.from(urls);
}

async function ping(urlList) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  return { status: res.status, text: await res.text() };
}

async function main() {
  const urls = buildUrlList();
  console.log(`[indexnow] submitting ${urls.length} URLs to IndexNow`);
  if (process.env.INDEXNOW_DRY) {
    console.log(`[indexnow] DRY RUN — not pinging. First 5 URLs:`);
    for (const u of urls.slice(0, 5)) console.log(`  ${u}`);
    console.log(`  …and ${urls.length - 5} more`);
    process.exit(0);
  }
  try {
    const result = await ping(urls);
    if (result.status >= 200 && result.status < 300) {
      console.log(`[indexnow] OK (${result.status}) — Bing/Yandex notified`);
    } else {
      // Don't fail the build on a non-2xx — just log. IndexNow returns 200
      // on accept, 202 on accept-with-warnings, 400 on bad request, 403 on
      // key/file mismatch, 422 on invalid URLs.
      console.warn(
        `[indexnow] non-2xx (${result.status}): ${result.text.slice(0, 200)}`,
      );
    }
  } catch (err) {
    // Network errors during build (e.g. Vercel sandbox restriction) — log
    // and continue. The build artifact is still valid; we just didn't get
    // the head start.
    console.warn(`[indexnow] ping failed (non-fatal): ${err.message}`);
  }
}

main();
