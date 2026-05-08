// Click-to-paint interaction perf smoke test — measures incident-row click
// latency. Run against the prod server (npm run start) on :3000.
import { chromium } from "playwright";

const URL = "http://localhost:3000";

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // Scroll the table into view
  await page.evaluate(() => {
    const t = Array.from(document.querySelectorAll("*")).find((el) =>
      /INCIDENT REGISTER/.test(el.textContent || ""),
    );
    if (t) t.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(400);

  const samples = [];
  for (let i = 0; i < 5; i++) {
    const idx = 1 + i;
    const renderMs = await page.evaluate(async (rowIdx) => {
      const rows = document.querySelectorAll("table tbody tr");
      const row = rows[rowIdx];
      if (!row) return -1;
      performance.mark("click-start");
      row.click();
      // Wait two animation frames so React commit + paint settle.
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      performance.mark("click-end");
      performance.measure("click", "click-start", "click-end");
      const measures = performance.getEntriesByName("click");
      const ms = measures[measures.length - 1].duration;
      performance.clearMarks();
      performance.clearMeasures();
      return ms;
    }, idx);
    samples.push(renderMs);
    await page.waitForTimeout(200);
  }

  const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
  const max = Math.max(...samples);
  console.log(
    `Incident click -> next paint: ${samples
      .map((s) => s.toFixed(1))
      .join(" / ")} ms — avg ${avg.toFixed(1)} ms, max ${max.toFixed(1)} ms`,
  );

  await ctx.close();
  await browser.close();
})();
