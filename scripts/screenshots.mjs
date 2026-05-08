import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "screenshots");
const URL = "http://localhost:3000";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet",  width: 820,  height: 1180 },
  { name: "mobile",  width: 390,  height: 844 },
];

// Selector that targets the WORLD MAP svg (not the lunar inset / hero / scale-bar svgs).
// Anything with a viewBox of "0 0 980 360" is the map (cropped — Antarctica trimmed).
const MAP_SVG = 'svg[viewBox="0 0 980 360"]';

async function shotsFor(browser, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      console.log(`[${vp.name} console.${msg.type()}] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => console.log(`[${vp.name} pageerror] ${err.message}`));

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  // 01 — above the fold
  await page.screenshot({ path: `${OUT}/${vp.name}-01-hero.png`, fullPage: false });

  // 02 — full page
  await page.screenshot({ path: `${OUT}/${vp.name}-02-full.png`, fullPage: true });

  // 03 — map area
  await page.evaluate((sel) => {
    const map = document.querySelector(sel);
    if (map) map.scrollIntoView({ block: "center" });
  }, MAP_SVG);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${vp.name}-03-map.png`, fullPage: false });

  // 04 — read all marker positions from the MAP svg (for diagnostic)
  const markerPositions = await page.evaluate((sel) => {
    const svg = document.querySelector(sel);
    if (!svg) return null;
    // Static-translate <g> wrappers around each marker
    const groups = svg.querySelectorAll("g[transform^='translate']");
    return Array.from(groups).slice(0, 30).map((g) => g.getAttribute("transform"));
  }, MAP_SVG);
  console.log(`[${vp.name}] first 30 marker transforms:`, JSON.stringify(markerPositions));

  // 05 — hover a marker (desktop only) — use synthetic events to bypass pointer
  // interception by inner circles + the fixed classification banner.
  if (vp.name === "desktop") {
    const hitInfo = await page.evaluate((sel) => {
      const svg = document.querySelector(sel);
      if (!svg) return { count: 0 };
      const hits = svg.querySelectorAll("circle[r='16']");
      return { count: hits.length };
    }, MAP_SVG);
    console.log(`[${vp.name}] hit-target circles count: ${hitInfo.count}`);

    if (hitInfo.count > 3) {
      // Dispatch mouseenter on the parent motion.g so React's onMouseEnter fires.
      await page.evaluate((sel) => {
        const svg = document.querySelector(sel);
        const hits = svg.querySelectorAll("circle[r='16']");
        const target = hits[3];
        // The motion.g (with onMouseEnter) is the parent of the hit circle.
        const motionG = target.parentElement;
        const evt = new MouseEvent("mouseenter", { bubbles: false, cancelable: true });
        motionG.dispatchEvent(evt);
        const over = new MouseEvent("mouseover", { bubbles: true, cancelable: true });
        motionG.dispatchEvent(over);
      }, MAP_SVG);
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/${vp.name}-04-map-hover.png`, fullPage: false });
    }

    // 06 — click the marker → selected state
    if (hitInfo.count > 3) {
      await page.evaluate((sel) => {
        const svg = document.querySelector(sel);
        const hits = svg.querySelectorAll("circle[r='16']");
        const target = hits[3];
        const motionG = target.parentElement;
        const evt = new MouseEvent("click", { bubbles: true, cancelable: true });
        motionG.dispatchEvent(evt);
      }, MAP_SVG);
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${OUT}/${vp.name}-05-map-selected.png`, fullPage: false });
    }
  }

  // 07 — incident table
  await page.evaluate(() => {
    const t = Array.from(document.querySelectorAll("*")).find((el) =>
      /INCIDENT REGISTER/.test(el.textContent || "")
    );
    if (t) t.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${vp.name}-06-table.png`, fullPage: false });

  // 08 — click a table row (desktop only)
  if (vp.name === "desktop") {
    const rows = page.locator("table tbody tr");
    const rowCount = await rows.count();
    if (rowCount > 4) {
      await rows.nth(4).click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/${vp.name}-07-table-selected.png`, fullPage: false });

      // re-screenshot the map area to confirm pin selection synced
      await page.evaluate((sel) => {
        const map = document.querySelector(sel);
        if (map) map.scrollIntoView({ block: "center" });
      }, MAP_SVG);
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/${vp.name}-07b-map-after-row-click.png`, fullPage: false });
    }
  }

  // 09 — document viewer
  await page.evaluate(() => {
    // Pick the deepest element whose own text matches (skip ancestors like <body>).
    const all = Array.from(document.querySelectorAll("h1,h2,h3,h4,div,span,section"));
    const matches = all.filter((el) => /DECLASSIFIED DOCUMENT VIEWER/.test(el.textContent || ""));
    const t = matches[matches.length - 1] || matches[0];
    if (t) t.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${vp.name}-08-doc.png`, fullPage: false });

  // 10 — click a redaction bar (desktop only) → trigger Easter egg
  if (vp.name === "desktop") {
    const all = await page.locator("span, div").all();
    let clicked = false;
    for (const el of all.slice(0, 800)) {
      try {
        const bg = await el.evaluate((node) => getComputedStyle(node).backgroundColor);
        if (bg === "rgb(10, 10, 10)") {
          const box = await el.boundingBox();
          if (box && box.width > 30) {
            await el.click({ force: true });
            await page.waitForTimeout(220);
            await page.screenshot({ path: `${OUT}/${vp.name}-09-redaction-stamp.png`, fullPage: false });
            clicked = true;
            break;
          }
        }
      } catch { /* ignore */ }
    }
    if (!clicked) console.log("[desktop] could not find a redaction bar to click");
  }

  // 11 — video grid
  await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("h1,h2,h3,h4,div,span,section"));
    const matches = all.filter((el) => /VIDEO EVIDENCE/.test(el.textContent || ""));
    const t = matches[matches.length - 1] || matches[0];
    if (t) t.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${vp.name}-10-videos.png`, fullPage: false });

  // 12 — lunar
  await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("h1,h2,h3,h4,div,span,section"));
    const matches = all.filter((el) => /LUNAR DOSSIER/.test(el.textContent || ""));
    const t = matches[matches.length - 1] || matches[0];
    if (t) t.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${vp.name}-11-lunar.png`, fullPage: false });

  // 13 — footer
  await page.evaluate(() => {
    const f = document.getElementById("footer");
    if (f) f.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${vp.name}-12-footer.png`, fullPage: false });

  // 14 — open the lunar modal (desktop only)
  if (vp.name === "desktop") {
    // Scroll back to map area so the lunar inset button is in view
    await page.evaluate((sel) => {
      const map = document.querySelector(sel);
      if (map) map.scrollIntoView({ block: "center" });
    }, MAP_SVG);
    await page.waitForTimeout(400);

    const lunarBtn = page.locator("button").filter({ hasText: /LUNAR/ }).first();
    if (await lunarBtn.count()) {
      await lunarBtn.click();
      await page.waitForTimeout(450);
      await page.screenshot({ path: `${OUT}/${vp.name}-13-lunar-modal.png` });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(250);
    } else {
      console.log("[desktop] could not find lunar button");
    }
  }

  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    console.log(`Capturing ${vp.name}…`);
    await shotsFor(browser, vp);
  }
  await browser.close();
  console.log("Done.");
})();
