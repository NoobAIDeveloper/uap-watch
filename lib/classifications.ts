import type { IncidentStatus, SourceAgency } from "./types";

export const STATUS_COLOR: Record<IncidentStatus, string> = {
  unresolved: "var(--color-status-unresolved)",
  anomalous: "var(--color-status-anomalous)",
  corroborated: "var(--color-status-corroborated)",
  resolved: "var(--color-status-resolved)",
};

// Sentence-case labels — the default rendering is "Corroborated", not
// "CORROBORATED". Uppercase variants are derived inline where needed.
export const STATUS_LABEL: Record<IncidentStatus, string> = {
  unresolved: "Unresolved",
  anomalous: "Anomalous",
  corroborated: "Corroborated",
  resolved: "Resolved",
};

// Tailwind utility classes for tag chrome (background tint + text color).
// These are intentionally low-saturation — Blueprint intent palette, not
// neon. Used by Tag components across the dashboard.
export const STATUS_TAG_CLASS: Record<IncidentStatus, string> = {
  unresolved: "bg-[rgba(236,154,60,0.15)] text-[#d49152]",
  anomalous: "bg-[rgba(152,129,243,0.15)] text-[#b1a0f0]",
  corroborated: "bg-[rgba(35,133,81,0.15)] text-[#6fb38b]",
  resolved: "bg-[rgba(95,107,124,0.18)] text-text-dim",
};

export const SOURCE_LABEL: Record<SourceAgency, string> = {
  FBI: "FBI",
  DOD: "DOD",
  NASA: "NASA",
  STATE: "State",
  USAF: "USAF",
  USN: "USN",
};
