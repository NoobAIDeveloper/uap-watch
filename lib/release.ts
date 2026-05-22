// Single source of truth for the PURSUE catalog manifest. Numbers reflect the
// COMBINED catalog across all released tranches — the dashboard surfaces
// everything declassified to date, not a per-tranche snapshot. The latest
// tranche fields (`tranche`, `date`, `dateLabel`) describe the most recent
// drop for the "Release N" banner.
//
// Tranche 1 (2026-05-08): 162 files (120 PDF + 28 video + 14 image)
// Tranche 2 (2026-05-22): 64 files (6 PDF + 51 video + 7 audio)
export const RELEASE = {
  date: "2026-05-22",
  dateLabel: "May 22, 2026",
  tranche: 2,
  files: 226,
  pdfs: 126,
  videos: 79,
  audio: 7,
  images: 14,
  incidents: 26,
  agencies: ["FBI", "DOD", "NASA", "State", "USAF", "USN", "CIA", "ODNI", "DOE"],
  lastUpdate: "2026-05-22",
  manifestId: "PURSUE-2026-05-22",
} as const;
