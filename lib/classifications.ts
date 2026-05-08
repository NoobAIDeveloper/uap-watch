import type { IncidentStatus, SourceAgency } from "./types";

export const STATUS_COLOR: Record<IncidentStatus, string> = {
  unresolved: "var(--color-status-unresolved)",
  anomalous: "var(--color-status-anomalous)",
  corroborated: "var(--color-status-corroborated)",
  resolved: "var(--color-status-resolved)",
};

export const STATUS_LABEL: Record<IncidentStatus, string> = {
  unresolved: "UNRESOLVED",
  anomalous: "ANOMALOUS",
  corroborated: "CORROBORATED",
  resolved: "RESOLVED",
};

export const SOURCE_LABEL: Record<SourceAgency, string> = {
  FBI: "FBI",
  DOD: "DOD",
  NASA: "NASA",
  STATE: "STATE",
  USAF: "USAF",
  USN: "USN",
};
