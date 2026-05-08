# UAP.WATCH — PDF Indexing Pipeline Plan

**Status:** DRAFT — awaiting user approval before any implementation.
**Owner:** orchestrator → review → implementation subagent.
**Scope:** extract the actual text of all ~120 declassified UAP PDFs into the repo so DocumentViewer renders real content rather than the stub `"FULL TEXT NOT YET INDEXED LOCALLY..."`.
**Hard rule:** zero paid APIs, near-zero Claude tokens spent reading PDF bodies, deterministic local script, runs from the user's macOS shell inside Claude Code.

---

## Current state (verified)

- `data/documents.ts` — 136 entries (`DOC-001` … ~`DOC-136`).
- 8 of these (the originals: DOC-001 … DOC-008-ish) have rich synthetic memo bodies with `[[REDACT:reason]]` markers — these power the `RedactionBar` Easter egg.
- 128 entries have the stub body `"FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW."`.
- All 136 entries have a `sourceUrl`. The newer entries point at direct `https://www.war.gov/medialink/ufo/release_1/<filename>.pdf` URLs; a handful point at war.gov landing pages.
- `GovDocument` type (`lib/types.ts`) already has optional `localPath`, `pageCount`, and a `body: string` field.
- `DocumentViewer.tsx` already iframe-embeds `localPath` when set, and parses `body` for `[[REDACT:…]]` markers. The pipeline can layer onto this without UI churn.

This means the pipeline's job is narrowly: **download → extract text → write back into the repo such that the existing UI just renders it.**

---

## Phase 0 — Tool selection (research outcome)

I evaluated four OSS extractors against our two PDF profiles (digital-native government memos vs. scanned/redacted FOIA-style memos).

| Tool | Strength | Weakness | Verdict |
|---|---|---|---|
| `pdftotext` (poppler-utils) | Sub-second per PDF, deterministic, ships with `brew install poppler`. Excellent on digital-native PDFs. | Returns near-empty output on scanned/image PDFs. Doesn't OCR. | **Use as first-pass.** |
| `tesseract` | Free, ubiquitous OCR engine. `brew install tesseract`. | Needs page rasterisation first; slow alone. | Use indirectly via `ocrmypdf`. |
| `ocrmypdf` | Wraps `tesseract` + `pdftotext`. Auto-detects whether a page needs OCR (`--skip-text`), produces both an OCRed PDF and (with `--sidecar`) plain text. `brew install ocrmypdf`. Battle-tested on FOIA-style scans. | ~5–30 s per scanned page on M-series Macs. | **Use as fallback when pdftotext is empty.** |
| Marker (datalab-to/marker) | Best-in-class layout-aware Markdown output, handles tables/math. | Python + heavy ML deps (`pip install marker-pdf` ≈ 2 GB), slow on CPU. Overkill for short memos. | **Skip for v1.** Reconsider if user wants pretty Markdown rendering of long reports. |
| Mozilla `pdfjs-dist` / `MuPDF` | Node-native option. | No OCR. | **Skip** — `pdftotext` is already a strict superset of what we'd get. |

**Decision: a two-stage extractor.**
1. Try `pdftotext -layout <pdf> -` first.
2. If `wc -c` output is below a threshold (heuristic: < 200 chars total OR < 30 chars per page), fall back to `ocrmypdf --sidecar <txt> --skip-text --output-type pdf <in.pdf> <out.pdf>` and read the sidecar.

Both tools are `brew install`-able, both are free, both work fully offline.

---

## Phase 1 — Probing the corpus

Before running the full pipeline, sample five representative PDFs to validate the assumptions and tune thresholds. These commands run on the user's machine (war.gov reachable from there, NOT from the Claude agent's network):

```bash
mkdir -p /tmp/uap-sample && cd /tmp/uap-sample

# Digital-native modern USAF MISREP (likely born-digital with selectable text)
curl -L -o d14-iraq.pdf \
  "https://www.war.gov/medialink/ufo/release_1/dow-uap-d14-mission-report-iraq-may-2022.pdf"

# USN MISREP, also probably digital
curl -L -o d54-med.pdf \
  "https://www.war.gov/medialink/ufo/release_1/dow-uap-d54-mission-report-mediterranean-sea-na.pdf"

# Old State Dept cable from 1994 — likely scanned
curl -L -o dos-d2.pdf \
  "https://www.war.gov/medialink/ufo/release_1/dos-uap-d2-cable-2-kazakhstan-january-1994.pdf"

# Pick one historic FBI memo (Roswell-era) — almost certainly scanned with redaction bars
# (URL TBD from documents.ts — pick whichever DOC-* claims FBI 1947–1960)

# Print metadata
for f in *.pdf; do
  echo "=== $f ==="
  ls -lh "$f"
  pdfinfo "$f" 2>/dev/null | grep -E "Pages|Producer|Encrypted"
  pdftotext -layout "$f" - 2>/dev/null | head -20
  echo "--- char count ---"
  pdftotext -layout "$f" - 2>/dev/null | wc -c
done
```

**What this tells us before committing to the full run:**
- Total bytes per PDF → bandwidth / disk projection.
- Whether `pdftotext` returns useful text or whitespace → how often we'll need OCR.
- Whether redactions appear as literal `█` glyphs, runs of spaces, or are silently invisible after pdftotext (this is the load-bearing finding for Phase 4 below).
- Whether war.gov serves direct PDF or returns an HTML interstitial (some `sourceUrl`s point to `https://www.war.gov/UFO/` rather than the PDF directly).

The user runs this once, pastes the output back, and the implementation agent tunes thresholds based on actuals.

---

## Phase 2 — Local extraction pipeline

Single Node ESM script: **`scripts/index-pdfs.mjs`**. No new npm deps; uses Node 20 built-ins (`fs`, `child_process`, `crypto`, `https`) and shells out to the `brew`-installed binaries.

### Inputs / outputs

```
data/documents.ts                    # source of truth (read-only for this script)
data/pdfs-cache/<doc-id>.pdf         # downloaded, gitignored
data/extracted/<doc-id>.txt          # cleaned plain text, COMMITTED
data/extracted/<doc-id>.json         # sidecar metadata, COMMITTED
data/extracted/_index.json           # roll-up: { [docId]: { sha256, pages, extractor, hasRedactions, charCount } }
```

### Script flow

```
1. Parse data/documents.ts
   - Use a lightweight regex parse (not a full TS parse) to pull out
     { id, sourceUrl, body } tuples. Skip docs whose body is NOT the stub
     (preserves the 8 hand-authored synthetic memos).

2. For each candidate doc:
   a. If data/pdfs-cache/<id>.pdf exists AND data/extracted/<id>.txt exists
      AND _index.json sha matches, skip. (idempotent / resumable)
   b. Download sourceUrl with curl (User-Agent: Mozilla/5.0 …).
      - If response is HTML or < 1KB, mark as "unfetchable" in sidecar and continue.
      - Save to data/pdfs-cache/<id>.pdf.
   c. Run `pdftotext -layout <pdf> -` → capture stdout.
   d. If charCount < max(200, pageCount * 30):
        Run `ocrmypdf --sidecar <id>.txt --skip-text --quiet --output-type pdf
                      <in> /tmp/<id>-ocr.pdf`
        Read the sidecar.
        Mark extractor = "ocrmypdf".
      else:
        Mark extractor = "pdftotext".
   e. Clean text:
        - Normalise CRLF → LF.
        - De-hyphenate end-of-line breaks (`foo-\nbar` → `foobar` only when next
          line starts lowercase).
        - Collapse 3+ blank lines to 2.
        - Detect and tag redaction patterns (see Phase 4).
        - Trim trailing whitespace per line.
   f. Write data/extracted/<id>.txt and data/extracted/<id>.json sidecar with:
        { id, sha256OfPdf, byteSize, pageCount, extractor, charCount,
          hasRedactions, extractedAt }
   g. Append to _index.json.

3. Emit a final summary table:
     OK (pdftotext): N
     OK (ocrmypdf):  M
     FAILED:         K  (with reasons)
```

### Why a separate `.txt` file (not inlining into `documents.ts`)

We commit the extracted text as **per-doc files under `data/extracted/`**, not as inline strings in `documents.ts`. Reasons:

1. **`documents.ts` already has 3,075 lines.** Inlining 120 × 5–50 KB bodies would push it past 100 K lines and slow every `next build`.
2. **Webpack will tree-shake nothing** in a single barrel-array module — every visitor would download all extracted text on first hit (megabytes).
3. **Lazy-fetch from the client** lets the DocumentViewer load the active doc's text only when selected. ~10–50 KB per click is fine.
4. **Easier diffs in code review.** A regenerated 100 KB inline body produces an unreadable PR; a per-file `.txt` is readable and git-blame-able.

The DocumentViewer change is small (Phase 4 below).

### What lives in git vs. what doesn't

```
COMMITTED:
  data/extracted/*.txt        (~30 MB total estimated — fine in repo)
  data/extracted/*.json
  data/extracted/_index.json
  scripts/index-pdfs.mjs

GITIGNORED:
  data/pdfs-cache/            (the raw PDFs — 200 MB–1 GB)
```

Add to `.gitignore`:
```
data/pdfs-cache/
*.ocr.pdf
```

---

## Phase 3 — Hosting strategy

The original PDFs are large and exceed Vercel Hobby's 100 MB CLI deployment cap. Extracted text is tiny. Options evaluated:

| Option | Repo size | PDFs viewable? | Effort | Cost |
|---|---|---|---|---|
| **A. Text only in repo, PDF link points to war.gov** | +30 MB | Via external link | Lowest | $0 |
| **B. Text + PDFs via Git LFS** | LFS bandwidth limit on Vercel checkouts is the blocker | Yes (iframe) | Medium | $0 within 1 GB but Vercel LFS support is fragile |
| **C. Text in repo, PDFs on Cloudflare R2** | +30 MB | Yes (iframe to R2) | Medium | $0 (R2 free tier: 10 GB storage, 0 egress) |
| **D. Text in repo, PDFs as a GitHub Release asset** | +30 MB | Yes (iframe to GH release URL) | Medium-low | $0 |
| **E. Vercel Blob** | +30 MB | Yes | Low | Free up to small quota; paid past it |

**Recommendation: ship Option A first, add Option C in a follow-up if/when the user wants the embedded PDF iframe to work without bouncing to war.gov.**

Justification:
- Option A is unblocking and zero-risk. The existing `sourceUrl` already provides the "VIEW ON WAR.GOV →" link, so the user experience without iframe embedding is: you read the extracted text on the site, and click a single link if you want the original. That is a strict upgrade over today.
- The user's stated motivation is *"so visitors don't need to bounce to war.gov to read the content"* — Option A satisfies this for **text content**, which is 95% of why anyone reads a memo. Embedded original PDF rendering is a nice-to-have, not the goal.
- Option C is the right next step if visual fidelity (looking at the redaction bars in their actual PDF page layout) becomes a priority. It's a 30-minute follow-up: `wrangler r2 bucket create uap-watch-pdfs && rclone sync data/pdfs-cache/ r2:uap-watch-pdfs/` then set `localPath` on each doc to `https://pub-<hash>.r2.dev/<id>.pdf`.
- Option B (Git LFS) is rejected: Vercel's clone behaviour with LFS is unreliable and the 1 GB free quota is shared with bandwidth, not just storage.
- Option D (GH Releases) works but creates ugly stable URLs and complicates the upload step.
- Option E (Vercel Blob) we avoid because the user explicitly mentioned "without paying for any API."

---

## Phase 4 — DocumentViewer integration

Three concerns: (1) where extracted text shows, (2) handling long memos, (3) preserving the `[[REDACT:…]]` Easter egg on extracted text.

### 4.1 Text loading — lazy fetch

Add a small effect in `DocumentViewer.tsx`:

```tsx
// pseudo-code, NOT to implement now
const [extractedBody, setExtractedBody] = useState<string | null>(null);
useEffect(() => {
  setExtractedBody(null);
  if (!doc) return;
  // Only fetch if the body field is the stub
  if (!doc.body.startsWith("FULL TEXT NOT YET INDEXED")) return;
  fetch(`/extracted/${doc.id}.txt`)
    .then(r => r.ok ? r.text() : null)
    .then(setExtractedBody)
    .catch(() => setExtractedBody(null));
}, [doc?.id]);

const renderBody = extractedBody ?? doc.body;
const parts = parseDocumentBody(renderBody);
```

Files in `data/extracted/*.txt` are copied to `public/extracted/` at build time (Next can't read `data/` at runtime client-side). Add a tiny build step:

```jsonc
// package.json
"scripts": {
  "build": "node scripts/copy-extracted.mjs && next build",
  ...
}
```

Or simpler: write the extractor's output directly to `public/extracted/` and skip the copy step. We'll commit `public/extracted/*.txt` and gitignore `public/extracted/*.json` (sidecars are dev-only). **Recommend this simpler variant.**

Updated paths:

```
COMMITTED:
  public/extracted/<doc-id>.txt   ← served at https://uap-watch-flame.vercel.app/extracted/DOC-009.txt
  data/extracted/<doc-id>.json    ← dev-side sidecars (out of public)
  data/extracted/_index.json
```

### 4.2 Redaction handling on extracted text

Scanned redacted PDFs produce one of three patterns after OCR/text extraction:
- Long runs of `█` (full-block), `■`, `▮`, or other dingbats (when ocrmypdf preserves redaction shapes as glyphs).
- Long runs of spaces or tabs (when the redactor was vector overlay and pdftotext sees void).
- The literal token `[REDACTED]` or `(b)(1)`, `(b)(6)`, `(b)(7)` etc. (FOIA exemption codes — common in DOJ/FBI releases).

In Phase 2 step 2.e, the cleaner converts these to `[[REDACT:reason]]` so the existing `RedactionBar` component renders them unchanged:

| Detected pattern | Replacement |
|---|---|
| `[REDACTED]` or `[REDACTED//<X>]` | `[[REDACT:CLASSIFIED]]` |
| `█{6,}` (six or more block chars) | `[[REDACT:UNKNOWN]]` |
| `(b)(1)` | `[[REDACT:NATIONAL SECURITY]]` |
| `(b)(3)` | `[[REDACT:STATUTE]]` |
| `(b)(6)` | `[[REDACT:PERSONAL]]` |
| `(b)(7)(C)` | `[[REDACT:LAW ENFORCEMENT]]` |
| 30+ contiguous spaces inside a line of otherwise-letters | `[[REDACT:WHITESPACE]]` (lower confidence — feature-flag) |

Set `hasRedactions: true` in the sidecar when any pattern matches. The Easter egg keeps working: black bars are clickable, hover-tooltip says `REDACTED // PERSONAL` etc.

### 4.3 Long memo UX

Some PDFs are 50+ pages. Without intervention the right pane becomes a wall of text. Minimal additions to `DocumentViewer.tsx`:

1. **Page break markers.** When extractor splits on form-feed `\f`, render a hairline divider with `// PAGE N OF M //`.
2. **Sticky doc header.** The title block becomes `position: sticky; top: 0` so it stays visible while scrolling.
3. **Pagination, not search.** A simple "page N / M" jump (anchor links to the page-break dividers). Cmd-F is good enough for in-doc search; we don't need to ship our own.
4. **Collapse/expand long body.** First 800 lines render eagerly; "SHOW REMAINING" button reveals the rest. Avoids janky reflows on 50-page docs.
5. **Loading state.** While `extractedBody === null` and `doc.body` is the stub, render a `// EXTRACTING //` placeholder rather than the literal "FULL TEXT NOT YET INDEXED" string. Once R2 (Option C) ships, the iframe also loads under the text.

These are 4–6 small changes to one file, not a rewrite.

### 4.4 Should extracted text replace or augment the synthetic body?

**Replace, but only for the 128 stub-body docs. Never for the 8 hand-authored synthetic memos.** The implementation must check that `body` starts with `"FULL TEXT NOT YET INDEXED"` before swapping in the extracted text. The synthetic memos are author-curated content; nothing in the pipeline should overwrite them.

---

## Phase 5 — Implementation cost & runbook

### Time estimate

Based on the corpus profile (assume ~70% digital-native, ~30% scanned, mean 8 pages per PDF, 120 candidate PDFs):

- `pdftotext` pass: 84 PDFs × ~0.5 s ≈ **45 s**.
- `ocrmypdf` pass: 36 PDFs × ~8 pages × ~10 s/page ≈ **48 min** on M-series.
- Download (median 2 MB × 120 = 240 MB at home broadband): **2–5 min**.
- Total wall clock: **≈ 60 minutes** end-to-end. (**Confidence: medium** — see "open questions" below.)

### Disk

- `data/pdfs-cache/`: ~250 MB–1 GB (depending on whether war.gov serves the originals or full-resolution scans).
- `public/extracted/`: ~30 MB total.
- Working temp during ocrmypdf: ~200 MB transient.
- **Total peak: ~1.3 GB.** Trivial on the user's Mac.

### Bandwidth

- One-time download: as above, ~250 MB–1 GB. Subsequent runs are no-ops thanks to the sha256 + idempotent skip in step 2.a.

### Single-shot runbook

```bash
# Prerequisites — run once on the macOS host
brew install poppler tesseract ocrmypdf

# Project setup
cd /Users/bharat/projects/pursue-observer
mkdir -p data/pdfs-cache data/extracted public/extracted
echo 'data/pdfs-cache/' >> .gitignore

# Sample first (Phase 1) — verify a handful before mass-running
node scripts/index-pdfs.mjs --sample DOC-002,DOC-004,DOC-009,DOC-010,DOC-050

# Full run
node scripts/index-pdfs.mjs --all

# Inspect results
ls -lh public/extracted/ | head
cat data/extracted/_index.json | jq '. | length'

# Build & verify locally
npm run build && npm run start

# Commit & ship
git add public/extracted data/extracted scripts/index-pdfs.mjs .gitignore components/DocumentViewer.tsx package.json
git commit -m "feat: index PDF text for 120 declassified UAP documents"
git push origin main
```

The `--sample` and `--all` flags partition the work so the user can validate cheaply before committing 60 minutes of OCR. The script is idempotent: re-running with `--all` after `--sample` only processes the un-extracted 115.

---

## Phase 6 — Open questions for the user

Decisions needed before implementation starts:

1. **Hosting choice:** confirm **Option A** (text in repo, PDFs link out to war.gov) for v1. If you want embedded PDF iframes, additionally approve **Option C** (Cloudflare R2) as v1.1.
2. **Inline vs. lazy-fetch:** confirm **lazy-fetch from `public/extracted/<id>.txt`** (the recommendation). The alternative — regenerating `data/documents.ts` with inline 50 KB body strings — is on the table if you'd rather everything live in one source-of-truth file at the cost of build performance.
3. **Quality bar:** good-enough vs. perfect.
   - "Good enough" (recommended): pdftotext → ocrmypdf fallback. Minor OCR errors acceptable; users can click through to war.gov for ground truth.
   - "Perfect": add Marker (datalab) on top, ~2 GB Python install, ~30s per page, much higher fidelity for tables/multi-column layouts. Probably overkill for memos.
4. **Failure mode for un-OCR-able scans:** a doc that's both un-extractable AND un-OCRable (e.g., handwritten 1960s teletype). Two options:
   - Leave the stub body unchanged and mark `hasRedactions: false, extractor: "failed"`. UI keeps showing "FULL TEXT NOT YET INDEXED…".
   - Replace with a softer message: `"// THIS DOCUMENT IS A SCANNED IMAGE — OPEN ORIGINAL ON WAR.GOV //"`.
   Recommend the second.
5. **`pageCount` backfill:** the script knows the page count from `pdfinfo`; should it write back into `documents.ts` so the existing `PAGE 1 OF {pageCount}` chrome is accurate? (Recommend: yes, in a separate commit, generated by the same script with `--write-page-counts`.)
6. **Redaction-mapping confidence threshold:** the "30+ contiguous spaces → `[[REDACT:WHITESPACE]]`" rule is the riskiest of the regex mappings. Default off; user toggles on if Phase 1 sample shows it's needed.
7. **When to refresh:** the war.gov corpus may grow. Should we add a `--refresh` flag that re-downloads if the upstream `Last-Modified` header changed? (Recommend: yes, but out-of-scope for v1.)
8. **Anthropic Files / Claude API as a tiebreaker for OCR-failed docs:** explicitly excluded per user constraints. Mentioned only to confirm it stays excluded.

---

## Summary table for one-line approval

| Question | Default | Alternative |
|---|---|---|
| Extractor | `pdftotext` then `ocrmypdf` fallback | Add Marker for fidelity |
| Hosting | A (text in repo, link out) | C (R2 for embedded PDFs) |
| Storage of text | `public/extracted/<id>.txt`, lazy-fetched | inline into `documents.ts` |
| Synthetic memos | Untouched (8 docs preserved) | n/a |
| Redaction rendering | regex map → `[[REDACT:reason]]` | render literal `█` |
| Page count backfill | Yes, separate commit | No |
| Original PDFs in repo | No (gitignored cache) | Git LFS / R2 |

If you say *"approve, with Option A and lazy-fetch"*, the implementation agent has zero remaining ambiguity.

---

## Token-cost accounting (the constraint that drove this design)

- **Claude reads zero PDF bodies.** The script is fully deterministic; `pdftotext` and `ocrmypdf` produce text without any LLM call.
- **Claude reads `data/documents.ts` once at design time, plus a regex parse of metadata at runtime — both cheap.**
- **Claude does not read the 30 MB of extracted text.** Only the build / runtime client does.
- **Per-PDF Claude token cost during the pipeline run: 0.** Per-PDF Claude token cost during plan validation: ~the size of one summary log line.
- **Total Claude cost to ship this feature: bounded by the size of this plan plus the eventual implementation diff (a single ~200-line `scripts/index-pdfs.mjs` plus ~40 lines of DocumentViewer changes).**

This is the smallest token footprint compatible with "all 120 PDFs end up indexed and renderable on the site," and it requires no paid API.
