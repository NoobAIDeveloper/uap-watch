export type SourceAgency = "FBI" | "DOD" | "NASA" | "STATE" | "USAF" | "USN";
export type IncidentStatus = "unresolved" | "anomalous" | "corroborated" | "resolved";
export type IncidentClassification = "UNCLASSIFIED" | "DECLASSIFIED" | "CONFIDENTIAL//DECLASSIFIED" | "SECRET//DECLASSIFIED";

export type Incident = {
  id: string;
  date: string;          // ISO-ish, e.g. "1947-07-08", "2024-10", "1972-12-11"
  dateLabel: string;     // human display
  location: string;
  region: string;
  coordinates: [number, number]; // [lng, lat]; for lunar use null and set isLunar
  source: SourceAgency;
  classification: IncidentClassification;
  status: IncidentStatus;
  summary: string;       // short
  details: string;       // longer prose
  witnessCount: number | "REDACTED";
  keyQuote?: string;
  videoUrl?: string;
  documentUrl?: string;
  // Public-relative path to a locally hosted copy of an associated image
  // (e.g. NASA Apollo lunar plate). Optional. The original sourceUrl on
  // documentUrl/videoUrl remains the canonical reference.
  localImagePath?: string;
  // Optional credit text for the local image (e.g. "NASA / Apollo 17").
  localImageCredit?: string;
  isLunar?: boolean;
};

export type GovDocument = {
  id: string;
  title: string;
  source: SourceAgency;
  date: string;
  classification: IncidentClassification;
  redacted: boolean;
  body: string;          // plain text with [[REDACT:reason]] markers for the RedactionBar component
  sourceUrl: string;
  // Public-relative path to a locally hosted PDF copy. Optional.
  localPath?: string;
  // Incident IDs this document relates to (e.g. ["PURSUE-005", "PURSUE-019"]).
  // Empty/missing means the doc is not yet linked to any indexed incident.
  incidentIds?: string[];
  // Optional page count if known.
  pageCount?: number;
};

export type EvidenceVideo = {
  id: string;
  title: string;
  location: string;
  date: string;
  durationSeconds: number;
  format: "IR" | "EO" | "RGB" | "COMBINED";
  sourceUrl: string;
  description: string;
  // Public-relative path to a locally hosted video file. Optional.
  localPath?: string;
  // Optional poster image (public-relative) shown before video plays.
  localPosterPath?: string;
  // Incident IDs this video relates to. Empty/missing means unlinked.
  incidentIds?: string[];
};
