// Single source of truth for the Release 01 manifest. Imported by
// ReleaseBanner, StatsStack, and any pSEO route that references the
// catalog. Previously duplicated as a local const in HeroHeader and
// StatsStrip.
export const RELEASE = {
  date: "2026-05-08",
  dateLabel: "May 8, 2026",
  tranche: 1,
  files: 162,
  pdfs: 120,
  videos: 28,
  images: 14,
  incidents: 26,
  agencies: ["FBI", "DOD", "NASA", "State", "USAF", "USN"],
  lastUpdate: "2026-05-09",
  manifestId: "PURSUE-2026-05-08",
} as const;
