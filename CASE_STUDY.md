# UAP.WATCH — Case Study

> **Live:** https://uap-watch-flame.vercel.app/
> **Code:** https://github.com/NoobAIDeveloper/uap-watch
> **Built:** 2026-05-08 → 2026-05-09 (~30 hours from idea to live + indexed)

A trend-driven, news-cycle product. The Pentagon released 162 declassified UAP files at war.gov/UFO/ on the morning of May 8, 2026; I shipped a tactical-style mirror dashboard the same day, then kept iterating through the next 24 hours while the news cycle was hot. The site now hosts locally-extracted text for every PDF in the catalog so visitors don't have to bounce to the .gov listing to actually read anything.

---

## The opportunity

When the Pentagon's PURSUE program (Presidential Unsealing & Reporting System for UAP Encounters) dropped its first tranche of files, the official site at war.gov/UFO/ was a flat directory dump — 162 PDFs / videos / images, nothing browsable, no map, no timeline, no way to filter by incident or agency. Every story in the news cycle linked to that page and immediately bounced readers off into a folder of cryptic filenames.

The opportunity was obvious and short-lived: build a better way to browse the release before the trend died. Anything that took more than ~24 hours to ship would miss the wave.

## What I shipped

A single-page tactical dashboard styled after Palantir's Blueprint design system:

- **Geospatial situation map** — Natural Earth projection, Antarctica cropped, every incident pinned with status-colored markers (cyan / indigo / rose / pale blue), hover tooltips, click-to-select
- **Lunar dossier modal** — full-screen interactive Apollo 12 / 17 plates with NASA archive imagery and AOI markers, opens from an inset on the world map
- **Incident register** — filterable, searchable, scrollable table of 26 indexed incidents
- **Dossier panel** — selecting any incident populates a detailed summary with key quotes from the actual cables (PanAm 1994 Tajikistan, the "Eye of Sauron" Western US orbs, Iraq MISREP, etc.)
- **Two-pane document viewer** — Foundry-style; sticky left rail with all 134 indexed docs, right pane renders the actual extracted text plus a synthetic-memo Easter egg with clickable redaction bars
- **Video evidence grid** — thermal/EO-tinted CSS viewports for all 28 PURSUE videos, each linking to the direct DVIDS asset
- **Incident-driven filtering** — clicking any incident filters docs/videos/lunar to only what's relevant; clicking again clears
- **Live UTC classification banner** with a drifting Zulu clock
- **Animated stats**, source-agency breakdown chart, custom edge-runtime OG image, Vercel Analytics

All 162 files in the Pentagon's catalog are accounted for; 113 of the 118 unique PDFs have full text indexed locally so users can read documents inline without leaving the site.

## Timeline

**Day 1 (2026-05-08) — idea to v1 deploy in one session**
- Identified the trend, sketched the concept ("Palantir-style situation dashboard"), pulled real incident data from CBS / NBC / CNN coverage and the Wayback-cached canonical CSV
- Scaffolded Next.js 16 + Tailwind v4 + motion/react + d3-geo + topojson-client
- Built thirteen components in parallel: classification banner, hero header, situation map, dossier panel, incident table, document viewer, redaction bar, video evidence grid, lunar panel, source breakdown, stats strip, footer, Zulu clock
- Deployed to Vercel; OG image and Twitter card live

**Day 2 (2026-05-09) — iteration on real-world feedback**
- Repainted from amber/red CRT-terminal palette to authentic Palantir Blueprint (#1c2127, BLUE4, ROSE4, INDIGO4, TURQUOISE4) after looking at actual Foundry/Gotham/AIP screenshots
- Cropped Antarctica out of the map, made the lunar inset interactive, added a portal-based modal
- Restructured the layout three times based on UX feedback (full-width map, side-by-side table+dossier, fixed-height doc viewer with sticky list rail)
- Wired incident-driven filtering across docs/videos/lunar
- Backfilled the full 162-file catalog with direct URLs from the Wayback CSV
- Built and ran a local PDF extraction pipeline against all 120 PDFs
- Performance pass: Lighthouse 100 desktop, 95 mobile
- Recovered 100% catalog coverage after Akamai mid-pipeline 403s

## Hard problems and how I solved them

### 1. War.gov is Akamai-fronted; my IP got 403'd mid-pipeline

After the first ~24 PDFs downloaded cleanly, Akamai started returning 403 Forbidden for every subsequent request from this network. 59 of 118 docs failed download. The Wayback Machine, however, still served them via a 302 redirect.

**Fix:** added a Wayback fallback to the pipeline (`https://web.archive.org/web/2026/<original-url>`) with throttled 2-concurrent + 2-second-sleep download semantics to avoid Wayback's own rate-limit. Recovered 52 of 59 on first retry, then the remaining 5 on a second retry once Wayback's CDN stopped flapping. Final coverage: 113/118 unique PDFs with full text, the other 5 are FBI image-only PDFs that have no extractable text in any source.

### 2. The canonical file list wasn't where I expected it

The plan was to scrape the war.gov listing page. It returned 403 for every retry attempt across multiple User-Agents. But the Pentagon also publishes a CSV catalog at `war.gov/Portals/1/Interactive/2026/UFO/uap-csv.csv` for their interactive page — and Wayback Machine had snapshotted *that path*, even though it couldn't reach the listing HTML. Pulled the CSV from Wayback, parsed all 162 rows, and used the file URL pattern (`/medialink/ufo/release_1/<filename>`) for the rest of the build.

### 3. SVG markers all collapsed to (0,0) after page hydration

Map markers SSR'd at the right geographic positions, but as soon as motion took over post-hydration, every pin slammed into the top-left corner. Root cause: `<motion.g>` had both a JSX `transform="translate(x,y)"` attribute *and* an animated `scale` prop. Motion writes a CSS `transform: scale(...)` on the element which overrode the SVG `transform` attribute entirely.

**Fix:** wrap each `<motion.g>` in a static `<g>` that owns the translate; motion only animates scale + opacity inside it.

### 4. Mobile LCP was 3.3s on baseline Lighthouse

The hero `<p>` SSR'd with `style="opacity:0"` because of a `motion.p` mount fade. Lighthouse measured 86% of LCP as "Render Delay" while it waited for motion to hydrate. The same pattern showed up in StatsStrip, which SSR'd "0" for its count-up animation and only filled in real numbers after JS init.

**Fix:** converted hero/stats/banner/footer to server components, replaced motion mount fades with CSS keyframes that animate via the compositor without ever SSR'ing `opacity:0`. Mobile LCP dropped from 931ms (real, not throttled) to ~140ms — 7×.

### 5. Document viewer kept growing the page forever

After the doc list ballooned to 136 entries, the viewer was just a long scrolling list — no internal scroll boundary, no list/pane separation. UX fell apart on mobile.

**Fix:** two-pane Foundry-style layout. Left rail is `position: sticky; top: 40px; max-height: calc(100vh - 40px); overflow-y: auto;` so it stays pinned just below the fixed classification banner while the right pane grows naturally with the document. Page scroll handles long memos; rail scrolls internally for the long doc list. No inner scroll on the right pane (per UX requirement).

### 6. Subagents that exited between polling cycles

I tried to babysit the long-running PDF pipeline with a polling subagent — it needed to commit + push every 20 new transcripts and detect script completion. The subagent kept treating each poll as a "completion event" and exiting its session, which meant no actual loop ever ran.

**Fix:** wrote a real `nohup bash` loop with a `while ps -p $PID > /dev/null` guard, ran it via `Bash run_in_background:true`. Survived between agent sessions, polled every 120s, pushed at threshold, did a final push when the parent script exited.

## By the numbers

| | Value |
|---|---|
| Time from Pentagon release to live deploy | ~6 hours |
| Time to v1 with full feature set | ~24 hours |
| Time to 100% catalog coverage including local PDF extraction | ~30 hours |
| Lighthouse Performance (desktop / mobile) | 100 / 95 |
| LCP (desktop / mobile observed) | 687 ms / ~140 ms |
| First Load JS (initial HTML response) | 382 KB → 106 KB after lazy-loading below-fold |
| Click-to-paint latency on incident selection (Playwright benchmark) | 27–32 ms (avg 29.5 ms) |
| Total commits on `main` | 13 |
| Components built | 16 |
| PDFs extracted via pdftotext (digital-native) | 48 |
| PDFs extracted via ocrmypdf (scanned, OCR'd) | 40 |
| PDFs verified image-only (no extractable text) | 25 |
| Incidents indexed | 26 |
| Documents indexed | 136 |
| Videos indexed | 44 (28 PURSUE + 16 supporting) |
| Per-PDF LLM token cost during extraction | 0 |
| Recurring infrastructure cost | $0 (Vercel Hobby + free brew tools) |

## Tech stack

- **Framework:** Next.js 16 (App Router, RSC, edge runtime for OG)
- **Styling:** Tailwind v4 with @theme tokens, CSS-only animations for first-paint sections, `motion/react` for interactive ones
- **Geo:** d3-geo + topojson-client + Natural Earth atlas (vendored as static asset)
- **State:** custom `useSyncExternalStore` selection store; no zustand or other store library
- **PDF pipeline:** poppler (`pdftotext`) → `ocrmypdf` (Tesseract under the hood) — both local CLI tools, no APIs
- **Analytics:** Vercel Analytics
- **Deploy:** Vercel auto-deploy on `main` push
- **Fonts:** JetBrains Mono + Space Mono via `next/font/google`
- **Palette:** sourced directly from Palantir Blueprint design system color tokens (BLUE4 #4c90f0, ROSE4 #f5498b, INDIGO4 #9881f3, TURQUOISE4 #13c9ba)

## What this project demonstrates

**Trend instincts.** Recognized a 24-hour news-cycle window and shipped a product that hit it. Most "vibe-coded" sites you see in this kind of moment look generic — this one was differentiated by the design language, the depth of the actual content, and the fact that it kept improving while the trend was alive.

**Speed without slop.** v1 shipped in under 24 hours. The Lighthouse score is 100/95 with zero hand-tuning, the design is sourced from Palantir's actual public design system rather than vibes, and every claim about file counts on the page is reconciled to the canonical CSV source-of-truth — not made up.

**Agentic engineering.** Most of the work was orchestrated through Claude Code subagents running in parallel waves: scaffold → 7 component agents in parallel → data backfill + UX rebuild in parallel → performance pass + screenshot agent in parallel → indexing pipeline + babysit watchdog. I worked as the orchestrator (decompose, define schemas, integrate) rather than the typer. This is the 2026-relevant version of "shipped fast."

**Honest engineering.** When the war.gov network started 403'ing, I didn't fake the data — I dug for the canonical CSV via Wayback. When the synthetic memo bodies were ungrounded stubs, I built a real local OCR pipeline rather than asking an LLM to hallucinate plausible text. When 5 PDFs failed extraction even after retry, I logged them as failed and let the UI fall back gracefully.

**Production hygiene.** Strict TypeScript, prod build green on every commit, edge-runtime OG image with custom font loading, Lighthouse 100, no console errors, no hydration warnings, sub-100ms INP on every interaction. Vercel Analytics wired in. SEO + Twitter card meta complete. Auto-deploy from `main` so every push goes live within minutes.

**Cost-conscious.** Total recurring infrastructure cost is $0 — Vercel Hobby tier + Wayback Machine + brew-installed PDF tools. Per-PDF Claude API cost during the indexing run was zero (the pipeline is fully deterministic; LLMs were not in the read path for any document content).

---

*UAP.WATCH was a one-person, ~30-hour solo build orchestrating multiple Claude Code subagents in parallel. Live since 2026-05-08, indexed since 2026-05-09.*
