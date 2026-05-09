#!/usr/bin/env node
/**
 * Scrape DVIDS thumbnails for every video in data/videos.ts.
 *
 * For each VID-* entry whose sourceUrl points at dvidshub.net, fetches the
 * page, extracts the og:image (preferring the 486x274 variant for thumbs),
 * and downloads the JPEG to public/files/thumbs/<vid-id>.jpg.
 *
 * For videos whose sourceUrl is a direct image (war.gov NASA plates), we
 * already mirror those as the canonical asset; we copy the local path
 * into a thumb mapping rather than re-downloading.
 *
 *   node scripts/index-video-thumbs.mjs
 *   node scripts/index-video-thumbs.mjs --force
 */

import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VIDEOS_TS = path.join(ROOT, "data/videos.ts");
const OUT_DIR = path.join(ROOT, "public/files/thumbs");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const force = process.argv.includes("--force");

// Lightweight regex parser — pull (id, sourceUrl) tuples from the array
// literal. Same trick we use elsewhere; avoids compiling TS.
function parseVideos(src) {
  const blocks = src.split(/\}\s*,\s*\{/);
  const out = [];
  for (const block of blocks) {
    const idMatch = block.match(/id:\s*"(VID-\d+)"/);
    const urlMatch = block.match(/sourceUrl:\s*"([^"]+)"/);
    if (idMatch && urlMatch) {
      out.push({ id: idMatch[1], sourceUrl: urlMatch[1] });
    }
  }
  return out;
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

function extractOgImage(html) {
  // Try the 486x274 variant first (it's literally a thumbnail-sized frame
  // grab). Fall back to og:image full size.
  const all = [...html.matchAll(/https:\/\/[^"]+\.(?:jpg|jpeg|png)/g)].map(
    (m) => m[0],
  );
  const thumb = all.find((u) => u.includes("486x274"));
  if (thumb) return thumb;
  const og = html.match(
    /<meta\s+property="og:image"\s+content="([^"]+)"/,
  );
  if (og) return og[1];
  return null;
}

async function downloadImage(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "image/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) throw new Error(`Tiny body (${buf.length}B)`);
  await fs.writeFile(dest, buf);
  return buf.length;
}

async function processOne(video) {
  const localDest = path.join(OUT_DIR, `${video.id.toLowerCase()}.jpg`);
  if (!force && existsSync(localDest)) {
    const stat = await fs.stat(localDest);
    if (stat.size > 200) {
      return { ...video, ok: true, source: "cache", bytes: stat.size };
    }
  }

  // Direct-image source URLs (NASA war.gov jpg) — mirror to thumbs.
  if (/\.(jpg|jpeg|png)$/i.test(video.sourceUrl)) {
    try {
      const bytes = await downloadImage(video.sourceUrl, localDest);
      return { ...video, ok: true, source: "direct", bytes };
    } catch (e) {
      return { ...video, ok: false, error: e.message };
    }
  }

  // war.gov PDF — no good thumbnail. Skip.
  if (/\.pdf$/i.test(video.sourceUrl)) {
    return { ...video, ok: false, error: "PDF source — no thumbnail" };
  }

  // dvidshub.net — scrape og:image
  if (video.sourceUrl.includes("dvidshub.net")) {
    try {
      const html = await fetchPage(video.sourceUrl);
      const thumbUrl = extractOgImage(html);
      if (!thumbUrl) {
        return { ...video, ok: false, error: "no og:image found" };
      }
      const bytes = await downloadImage(thumbUrl, localDest);
      return { ...video, ok: true, source: "dvids", bytes };
    } catch (e) {
      return { ...video, ok: false, error: e.message };
    }
  }

  return { ...video, ok: false, error: "unsupported source" };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const src = await fs.readFile(VIDEOS_TS, "utf8");
  const videos = parseVideos(src);
  console.log(`[thumbs] processing ${videos.length} videos → ${OUT_DIR}`);

  const results = [];
  for (const v of videos) {
    process.stdout.write(`  ${v.id} … `);
    const r = await processOne(v);
    results.push(r);
    if (r.ok) console.log(`OK [${r.source}, ${(r.bytes / 1024).toFixed(0)}KB]`);
    else console.log(`SKIP — ${r.error}`);
    await new Promise((r) => setTimeout(r, 600));
  }

  // Write a mapping JSON for the build to consume.
  const map = Object.fromEntries(
    results.filter((r) => r.ok).map((r) => [r.id, `/files/thumbs/${r.id.toLowerCase()}.jpg`]),
  );
  await fs.writeFile(
    path.join(ROOT, "data/video-thumb-map.json"),
    JSON.stringify(map, null, 2),
  );

  const ok = results.filter((r) => r.ok).length;
  const skip = results.length - ok;
  console.log(`\n[thumbs] done. ${ok} OK, ${skip} skipped.`);
  console.log(`[thumbs] map written to data/video-thumb-map.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
