#!/usr/bin/env node
/**
 * Photo extraction pipeline.
 *
 * Mirrors the 14 PURSUE Release 01 images from war.gov to
 * public/files/images/photos/. Idempotent — skips files that already
 * exist on disk with non-zero size. Falls back to the Wayback Machine
 * on Akamai 403, matching the existing PDF pipeline pattern.
 *
 *   node scripts/index-photos.mjs           # download all
 *   node scripts/index-photos.mjs --force   # re-download even if present
 */

import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/files/images/photos");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

// 14 PURSUE Release 01 images. URL pattern is stable:
// https://www.war.gov/medialink/ufo/release_1/<filename>
const PHOTOS = [
  // 8 FBI photos
  { id: "IMG-FBI-A1", file: "fbi-photo-a1.png" },
  { id: "IMG-FBI-A2", file: "fbi-photo-a2.png" },
  { id: "IMG-FBI-A3", file: "fbi-photo-a3.png" },
  { id: "IMG-FBI-A4", file: "fbi-photo-a4.png" },
  { id: "IMG-FBI-A5", file: "fbi-photo-a5.png" },
  { id: "IMG-FBI-A6", file: "fbi-photo-a6.png" },
  { id: "IMG-FBI-A7", file: "fbi-photo-a7.png" },
  { id: "IMG-FBI-A8", file: "fbi-photo-a8.png" },
  // 6 NASA Apollo plates (5 from Apollo 12, 1 from Apollo 17)
  { id: "IMG-NASA-VM1", file: "nasa-uap-vm1-apollo-12-1969.jpg" },
  { id: "IMG-NASA-VM2", file: "nasa-uap-vm2-apollo-12-1969.jpg" },
  { id: "IMG-NASA-VM3", file: "nasa-uap-vm3-apollo-12-1969.jpg" },
  { id: "IMG-NASA-VM4", file: "nasa-uap-vm4-apollo-12-1969.jpg" },
  { id: "IMG-NASA-VM5", file: "nasa-uap-vm5-apollo-12-1969.jpg" },
  { id: "IMG-NASA-VM6", file: "nasa-uap-vm6-apollo-17-1972.jpg" },
];

const WAR_BASE = "https://www.war.gov/medialink/ufo/release_1";
const WAYBACK_BASE = "https://web.archive.org/web/2026/";

const force = process.argv.includes("--force");

async function fetchToFile(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "image/*" },
    redirect: "follow",
  });
  if (!res.ok) {
    throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status });
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) {
    throw new Error(`Suspiciously small body (${buf.length} bytes) — likely HTML interstitial`);
  }
  await fs.writeFile(dest, buf);
  return buf.length;
}

async function downloadOne(photo) {
  const dest = path.join(OUT_DIR, photo.file);
  if (!force && existsSync(dest)) {
    const stat = await fs.stat(dest);
    if (stat.size > 200) {
      return { ...photo, ok: true, source: "cache", bytes: stat.size };
    }
  }
  const directUrl = `${WAR_BASE}/${photo.file}`;
  try {
    const bytes = await fetchToFile(directUrl, dest);
    return { ...photo, ok: true, source: "war.gov", bytes };
  } catch (e) {
    // Fallback: Wayback. The PDF pipeline showed Akamai 403s our requests
    // mid-run; Wayback consistently has the same files cached.
    const waybackUrl = `${WAYBACK_BASE}${directUrl}`;
    try {
      const bytes = await fetchToFile(waybackUrl, dest);
      return { ...photo, ok: true, source: "wayback", bytes };
    } catch (e2) {
      return {
        ...photo,
        ok: false,
        error: `direct: ${e.message}; wayback: ${e2.message}`,
      };
    }
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`[photos] downloading ${PHOTOS.length} images to ${OUT_DIR}`);
  const results = [];
  for (const photo of PHOTOS) {
    process.stdout.write(`  ${photo.id} (${photo.file}) … `);
    const r = await downloadOne(photo);
    results.push(r);
    if (r.ok) {
      console.log(`OK [${r.source}, ${(r.bytes / 1024).toFixed(0)}KB]`);
    } else {
      console.log(`FAIL — ${r.error}`);
    }
    // 1s polite pacing between downloads
    await new Promise((r) => setTimeout(r, 800));
  }
  const ok = results.filter((r) => r.ok).length;
  const fail = results.length - ok;
  console.log(`\n[photos] done. ${ok} OK, ${fail} failed.`);
  if (fail > 0) {
    console.log("\nFailed:");
    for (const r of results.filter((r) => !r.ok)) {
      console.log(`  ${r.id} — ${r.error}`);
    }
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
