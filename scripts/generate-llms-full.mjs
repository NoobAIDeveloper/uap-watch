#!/usr/bin/env node
// Generate public/llms-full.txt — a single concatenated markdown corpus
// designed for AI crawlers and LLM training/inference. Format follows the
// Jeremy Howard llms.txt convention: one master title, one summary, then
// every wiki + FAQ + incident page rendered as a self-contained section.
//
// Run after editing wiki / FAQ / incident data, or as part of the build:
//   node scripts/generate-llms-full.mjs
//
// We keep this as plain ESM so it can be invoked from npm scripts and from
// Vercel build hooks without any dependency install.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

// Lightweight regex parsers — we don't want to compile TypeScript in this
// script. Each `data/*.ts` file is a `export const x = [...]` of object
// literals. We extract the fields we need with focused regexes.

function readSource(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), "utf8");
}

function parseFaq() {
  const src = readSource("lib/faq.ts");
  const entries = [];
  // Match each `{ slug: "...", q: "...", a: "...", ... }` block.
  const blockRe = /\{\s*slug:\s*"([^"]+)",[\s\S]*?q:\s*"([^"]+)",[\s\S]*?a:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    entries.push({
      slug: m[1],
      q: m[2],
      a: m[3].replace(/\\"/g, '"').replace(/\\\\/g, "\\"),
    });
  }
  return entries;
}

function parseWiki() {
  const src = readSource("lib/wiki.ts");
  const entries = [];
  const blockRe =
    /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*description:\s*"((?:[^"\\]|\\.)*)",\s*lead:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    entries.push({
      slug: m[1],
      title: m[2],
      description: m[3].replace(/\\"/g, '"'),
      lead: m[4].replace(/\\"/g, '"'),
    });
  }
  return entries;
}

function parseStates() {
  const src = readSource("lib/states.ts");
  const entries = [];
  const blockRe =
    /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*abbr:\s*"([^"]+)",\s*lead:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    entries.push({
      slug: m[1],
      name: m[2],
      abbr: m[3],
      lead: m[4].replace(/\\"/g, '"'),
    });
  }
  return entries;
}

function parseCompares() {
  const src = readSource("lib/compare.ts");
  const entries = [];
  const blockRe =
    /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*description:\s*"((?:[^"\\]|\\.)*)",\s*lead:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    entries.push({
      slug: m[1],
      title: m[2],
      description: m[3].replace(/\\"/g, '"'),
      lead: m[4].replace(/\\"/g, '"'),
    });
  }
  return entries;
}

function parseIncidents() {
  const src = readSource("data/incidents.ts");
  const entries = [];
  const blockRe =
    /id:\s*"(PURSUE-\d+)",\s*date:\s*"([^"]+)",\s*dateLabel:\s*"([^"]+)",\s*location:\s*"([^"]+)",\s*region:\s*"([^"]+)",[\s\S]*?source:\s*"([^"]+)",\s*classification:\s*"([^"]+)",\s*status:\s*"([^"]+)",\s*summary:\s*"((?:[^"\\]|\\.)*)",\s*details:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    entries.push({
      id: m[1],
      date: m[2],
      dateLabel: m[3],
      location: m[4],
      region: m[5],
      source: m[6],
      classification: m[7],
      status: m[8],
      summary: m[9].replace(/\\"/g, '"').replace(/\\'/g, "'"),
      details: m[10].replace(/\\"/g, '"').replace(/\\'/g, "'"),
    });
  }
  return entries;
}

const SITE_URL = "https://uap-watch-flame.vercel.app";

function header() {
  return `# UAP.WATCH — Full Corpus

> Concatenated, AI-readable corpus for the U.S. Department of War's PURSUE Release 01 (declassified UFO/UAP files, released 2026-05-08). 162 files, 26 indexed incidents, locally-extracted text for 113 of 118 unique PDFs. This file is the complete UAP.WATCH content corpus in one document for direct LLM ingestion. Every section links back to its canonical URL on UAP.WATCH and to the primary war.gov source.

Source-of-truth for all factual claims: https://www.war.gov/UFO/
Live site: ${SITE_URL}
Last updated: 2026-05-09

---
`;
}

function renderWiki(w) {
  return `## ${w.title}

URL: ${SITE_URL}/wiki/${w.slug}

${w.lead}

`;
}

function renderFaq(f) {
  return `## Q: ${f.q}

URL: ${SITE_URL}/q/${f.slug}

${f.a}

`;
}

function renderIncident(i) {
  return `## Incident ${i.id} — ${i.location} (${i.dateLabel})

URL: ${SITE_URL}/incident/${i.id.toLowerCase()}
Date: ${i.date}
Region: ${i.region}
Source agency: ${i.source}
Classification: ${i.classification}
Status: ${i.status}

${i.details}

`;
}

function renderState(s) {
  return `## UFO Sightings in ${s.name} (${s.abbr})

URL: ${SITE_URL}/state/${s.slug}

${s.lead}

`;
}

function renderCompare(c) {
  return `## ${c.title}

URL: ${SITE_URL}/compare/${c.slug}

${c.lead}

`;
}

function main() {
  const wiki = parseWiki();
  const faq = parseFaq();
  const incidents = parseIncidents();
  const states = parseStates();
  const compares = parseCompares();

  const parts = [
    header(),
    "# Topical Wiki Pages\n\n",
    ...wiki.map(renderWiki),
    "# Frequently Asked Questions\n\n",
    ...faq.map(renderFaq),
    "# Comparison Pages\n\n",
    ...compares.map(renderCompare),
    "# State-by-State UFO Records\n\n",
    ...states.map(renderState),
    "# Indexed Incidents\n\n",
    ...incidents.map(renderIncident),
    `\n---\n\nGenerated ${new Date().toISOString()}\n`,
  ];

  const out = path.join(repoRoot, "public", "llms-full.txt");
  fs.writeFileSync(out, parts.join(""));
  console.log(
    `Wrote ${out} — ${wiki.length} wiki, ${faq.length} faq, ${compares.length} compare, ${states.length} states, ${incidents.length} incidents.`,
  );
}

main();
