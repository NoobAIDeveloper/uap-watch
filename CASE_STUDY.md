# UAP.WATCH — Case Study

> **Live:** https://uap-watch-flame.vercel.app/
> **Code:** https://github.com/NoobAIDeveloper/uap-watch
> **Built:** 2026-05-08 → 2026-05-09 (~30 hours to v1 + indexed; audit + vision-pass recovery on Day 2 evening)

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

**Day 2 evening — quality audit + vision-based recovery**
- Manually audited every extracted text file rather than trusting the pipeline's "100% coverage" report; surfaced 28 empty stubs, 17 degraded extractions, and 6–8 files of pure glyph soup
- Hardened the pipeline (`SKIP_FIRST_PAGE_DOCS` for cover-stamp offenders, stricter `ocrmypdf` flags, lower concurrency, longer timeouts), re-ran on the top 20 worst — recovered 18 of 20
- Spawned parallel Claude Code subagents to vision-transcribe the 7 documents OCR could not read; DOC-031 went from 551 chars to 33,831 chars (61× lift) and surfaced the previously-invisible Senator Richard Russell trans-Caucasus sighting
- Caught and removed a duplicate catalog entry (DOC-037 was byte-identical to DOC-036)
- Wrote `scripts/download-missing.mjs` — strict-sequential Wayback fallback after Akamai 403'd the IP again on the re-run

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

### 7. The "100% indexed" claim hid 50+ files of unreadable noise

After v1 shipped, I did a manual eyeball audit of every extracted text file — and found that the pipeline's "all PDFs indexed" report was technically true but practically false. 28 files were empty stubs, 17 were degraded enough to be hard to read, and 6–8 were pure glyph soup. The worst offenders were predictable in hindsight: FBI 1947–68 cover-page declassification stamps that Tesseract reads as vertical char-by-char salad (`}.}.}.}»§=§=©=©=©®©=`), the NASA Apollo 17 stippled half-tone cover, and Navy Range Fouler forms whose top-of-page authority lines came out as `Deel d 11,1son` instead of "Declassified by MG Richard A. Harrison".

**Fix — phase 1 (better OCR flags).** Adopted `ocrmypdf`'s quality stack (`--rotate-pages`, `--deskew`, `--redo-ocr`) and added a `SKIP_FIRST_PAGE_DOCS` set for the 12 known cover-stamp offenders so extraction starts at page 2 (the actual document body). Recovered 18 of 20 problem files. NASA Apollo 17 turned out clean once page 1 was stripped — the extracted text now starts at page 119 of the lunar science transcript instead of `iiii!` salad.

**Fix — phase 2 (vision pass).** For the 7 files Tesseract still couldn't read, spawned parallel Claude Code subagents to do vision-based transcription against the cached PDFs. DOC-031 went from 551 chars → 33,831 chars and surfaced the previously-invisible Senator Russell / Lt. Col. Hathaway / Ruben Efron eyewitness account of two flying-disc ascents in the Trans-Caucasus USSR — a famous sighting that had been completely lost to OCR. DOC-039 (1957 FBI interview of Wladyslaw Krasuski about a 1944 Germany sighting) recovered similarly. The five Range Fouler forms got their declassification authority lines back — important for an archive where the metadata IS information.

The vision pass ran *inside* Claude Code rather than against a paid API, so the cost was zero.

### 8. The first quality-pass run crashed Tesseract and re-tripped Akamai

Ambitious flags (`--clean`, `--oversample 600`) plus 3-way concurrency overloaded both ends. Tesseract OOM'd on M-series memory during the largest scans, and the parallel re-downloads tripped Akamai's rate-limit again. Out of 16 docs queued, 3 timed out and 11 download attempts failed.

**Fix:** dropped `--clean` and `--oversample 600` (gains weren't worth the crashes), lowered concurrency 3 → 2, bumped per-doc timeout 15 → 30 min, and wrote `scripts/download-missing.mjs` — a separate strict-sequential downloader that goes straight to Wayback (skipping the war.gov direct attempt entirely once we know the IP is flagged). Caught a separate URL-encoding bug along the way: one filename in `documents.ts` had a literal space, which curl rejected as `Malformed input to a URL function`. Patched the script to URL-encode spaces transparently. Recovered 10 of 10 missing PDFs on the first sequential pass.

### 9. Orphan grandchildren survived the kill

When I killed the runaway first run, `kill <node-PID>` only stopped the parent. ocrmypdf, unpaper, and tesseract spawn separate process groups, so the grandchildren kept running — holding file handles on the cache and pegging CPU.

**Fix (operational):** several rounds of `pkill -9 -f <name>` for each layer (unpaper, tesseract, ocrmypdf, index-pdfs). The proper fix for the next iteration is to spawn children in the same process group and forward signals explicitly, but for this session manual cleanup got us moving again.

### 10. The audit caught a phantom duplicate

DOC-036 and DOC-037 had different metadata (different titles, dates, descriptions) but pointed to the same PDF — DOC-037's `sourceUrl` was just DOC-036's URL with the brackets stripped from the filename. The extracted text was byte-identical. Effectively a phantom entry from a prior copy-edit pass.

**Fix:** removed the DOC-037 entry from `data/documents.ts` with an inline comment documenting the discovery, deleted the extracted text file. Audit-driven housekeeping — the kind of thing that's invisible to most readers but matters for an archive that claims provenance accuracy.

### 11. The OCR was good enough to ship, but not good enough to ground a chatbot

Tesseract on 1949-era typewriter scans produced text like `"Office Memor. dum"` and `"FROM : A. He Belielop"`. Fine for full-text search where the user is already looking at the source PDF. Hostile for a RAG system trying to extract a clean fact.

**Fix:** when Reducto open-sourced their layout-aware VLM parse of the same war.gov + FBI Vault collection under CC BY 4.0, I swapped our extraction pipeline's output rather than rebuilding the pipeline itself. Filename mapping was 1:1 (their `<basename>.json` ↔ our `<basename>.pdf`), so a 150-line ingestor (`scripts/ingest-reducto.mjs`) walks `data/documents.ts`, fetches each JSON, flattens block-level chunks back to plain text, and rewrites `public/extracted/*.txt` in place. 111 of 113 files swapped cleanly (two filename-date mismatches we kept on the original); total text body went from 4.6M → 6.6M chars (+43%). Embeddings rebuilt to 6,908 chunks. Attribution added to the Footer.

The lesson isn't "OCR is hard" — that's table stakes. It's "your data layer is replaceable; build the pipeline around the schema you want, not the source you happen to have today." Our existing layout treated `public/extracted/*.txt` as the canonical input — the upstream OCR engine was an implementation detail. So when a better one appeared, the swap was a config change rather than a refactor.

### 12. Steady traffic to the site, zero LLM API calls to the chatbot

A few days after the RAG widget shipped, Vercel Analytics showed a healthy daily session count but the upstream LLM dashboard showed zero requests — nobody was opening the chatbot. The trigger was a 56×56 icon-only square with `bg-panel` (#1c2127) — the same color as every other panel on the page. The UFO icon was the accent blue but at low size, and the "Ask the archive" label was hidden inside a hover-only tooltip. On a dashboard already packed with globes, tables, and animated stats, the trigger read as inert chrome.

**Fix:** redesigned the trigger as a pill with the bright `accent-fill` (Blueprint BLUE3 #2d72d2) background, an always-visible mono caps label, a white drop-shadow on the UFO icon, and an orange `warn` (#ec9a3c) NEW badge in the top-right — currently the only orange element on the homepage, so the eye lands there immediately. Added a slow `chatHalo` keyframe ring that pulses every 2.4s at 50% opacity (subtle enough to read as ambient, not strobing — and `prefers-reduced-motion` disables it). On mobile, the text label collapses to icon-only via a `hidden sm:inline` so the trigger doesn't crowd a 390px viewport. Total change was ~12 lines in `ChatWidget.tsx` plus a single `@keyframes` block in `globals.css`.

The deeper lesson: discoverability is a build artifact, not a runtime property. The widget was technically present and technically reachable, but the user signal (zero API calls against a real traffic count) said "absent." Watch the funnel, not just the deploy.

### 13. Globe markers were color-coded but the colors were unlabelled

The orthographic globe plots terrestrial incidents tinted by `status` — `corroborated` green, `unresolved` orange, `anomalous` violet, `resolved` gray. The tints are computed in WebGL via `cobe`'s marker color array, which is fine for rendering but doesn't surface anywhere visible. A first-time visitor saw a globe peppered with three different-colored dots and no way to know what they meant. Hovering a dot showed no tooltip either; the only feedback was a click that filtered the incident register below.

**Fix:** two overlays on the globe panel, both rendered as absolutely-positioned siblings of the `<canvas>` so they sit above the WebGL surface without re-rendering it. A static legend strip in the bottom-left with four chips (colored dot + mono caps label) and a hover tooltip in the upper layer that follows the cursor. The tooltip reuses the existing canvas hit-test logic — extracted from the click handler into a shared `hitTest(cx, cy, w, h)` helper — and fires on `onMouseMove` to set a `hovered = { id, x, y }` state. When `hovered` is non-null, an overlay renders next to the cursor with the PURSUE ID, the incident location, and a status indicator dot + label. Edge-clamping (`Math.min(x + 14, panelWidth - 250)`) keeps the tooltip from spilling off the right edge of the panel, and the cursor toggles between `grab` and `pointer` based on whether a marker is currently under it.

The tint constants needed to stay in sync between cobe's WebGL marker buffer (normalized 0–1 RGB triplets) and the legend/tooltip overlays (hex strings), so I added a parallel `STATUS_HEX` and `STATUS_LABEL` map next to the existing `STATUS_TINT` table — drift between the two now requires editing both maps in the same file, which is the right friction level.

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
| Total commits on `main` | 26 |
| Components built | 16 |
| PDFs extracted via pdftotext (digital-native) | 48 |
| PDFs extracted via ocrmypdf (scanned, OCR'd) | 40 |
| PDFs verified image-only (no extractable text) | 25 |
| PDFs re-OCR'd in Day 2 quality pass with stricter flags | 20 |
| PDFs recovered via Claude Code vision-pass subagents | 7 |
| Largest single-document text recovery (DOC-031, Sen. Russell sighting) | 551 → 33,831 chars (61×) |
| Duplicate catalog entries removed during audit | 1 (DOC-037 = DOC-036) |
| Day 3 OCR swap (Reducto VLM, CC BY 4.0) — PDFs replaced / total body delta | 111 / +1.99M chars (+43%) |
| RAG chunks after swap | 5,106 → 6,908 (+35%) |
| Incidents indexed | 26 |
| Documents indexed | 135 (after dedup) |
| Videos indexed | 44 (28 PURSUE + 16 supporting) |
| Vision-pass API spend | $0 (ran inside Claude Code, not via paid API) |
| Per-PDF LLM token cost during initial extraction | 0 |
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

**Honest engineering.** When the war.gov network started 403'ing, I didn't fake the data — I dug for the canonical CSV via Wayback. When the synthetic memo bodies were ungrounded stubs, I built a real local OCR pipeline rather than asking an LLM to hallucinate plausible text. When 5 PDFs failed extraction even after retry, I logged them as failed and let the UI fall back gracefully. After v1 shipped and the news cycle moved on, I went back and audited every extracted file — re-OCR'd 20 docs with stricter flags, vision-recovered the 7 that were unreadable, and removed a duplicate catalog entry. The Senator Russell trans-Caucasus sighting (61× text recovery on DOC-031) wouldn't have been visible to any reader if the audit hadn't happened. Trend-driven ship dates don't excuse archive-quality lapses.

**Production hygiene.** Strict TypeScript, prod build green on every commit, edge-runtime OG image with custom font loading, Lighthouse 100, no console errors, no hydration warnings, sub-100ms INP on every interaction. Vercel Analytics wired in. SEO + Twitter card meta complete. Auto-deploy from `main` so every push goes live within minutes.

**Cost-conscious.** Total recurring infrastructure cost is $0 — Vercel Hobby tier + Wayback Machine + brew-installed PDF tools. Per-PDF Claude API cost during the indexing run was zero (the pipeline is fully deterministic; LLMs were not in the read path for any document content).

---

*UAP.WATCH was a one-person, ~30-hour solo build orchestrating multiple Claude Code subagents in parallel. Live since 2026-05-08, indexed since 2026-05-09.*
