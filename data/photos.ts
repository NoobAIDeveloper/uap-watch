import type { SourceAgency } from "@/lib/types";

export type Photo = {
  id: string;
  title: string;
  source: SourceAgency;
  date: string;
  description: string;
  // Local public-relative path to the mirrored image.
  localPath: string;
  // Canonical war.gov URL.
  sourceUrl: string;
  // Incident IDs this image relates to (empty = unlinked).
  incidentIds?: string[];
  // Catalog ID printed on the photograph or in war.gov metadata.
  catalogId?: string;
};

// 14 PURSUE Release 01 images, mirrored to public/files/images/photos/
// via scripts/index-photos.mjs. URL pattern is canonical war.gov:
// https://www.war.gov/medialink/ufo/release_1/<filename>
export const photos: Photo[] = [
  {
    id: "IMG-001",
    title: "Apollo 12 lunar surface — area of interest A",
    source: "NASA",
    date: "1969-11-19",
    description:
      "Apollo 12 archival lunar surface plate with annotated areas of interest. Released as part of PURSUE Release 01.",
    localPath: "/files/images/photos/nasa-uap-vm1-apollo-12-1969.jpg",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm1-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
    catalogId: "NASA-UAP-VM1",
  },
  {
    id: "IMG-002",
    title: "Apollo 12 lunar surface — area of interest B",
    source: "NASA",
    date: "1969-11-19",
    description:
      "Second Apollo 12 archival plate. AOI markers indicate Pentagon-flagged regions for further review.",
    localPath: "/files/images/photos/nasa-uap-vm2-apollo-12-1969.jpg",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm2-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
    catalogId: "NASA-UAP-VM2",
  },
  {
    id: "IMG-003",
    title: "Apollo 12 lunar surface — area of interest C",
    source: "NASA",
    date: "1969-11-19",
    description: "Third Apollo 12 archival plate with annotated areas of interest.",
    localPath: "/files/images/photos/nasa-uap-vm3-apollo-12-1969.jpg",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm3-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
    catalogId: "NASA-UAP-VM3",
  },
  {
    id: "IMG-004",
    title: "Apollo 12 lunar surface — area of interest D",
    source: "NASA",
    date: "1969-11-19",
    description: "Fourth Apollo 12 archival plate with annotated areas of interest.",
    localPath: "/files/images/photos/nasa-uap-vm4-apollo-12-1969.jpg",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm4-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
    catalogId: "NASA-UAP-VM4",
  },
  {
    id: "IMG-005",
    title: "Apollo 12 lunar surface — area of interest E",
    source: "NASA",
    date: "1969-11-19",
    description: "Fifth Apollo 12 archival plate with annotated areas of interest.",
    localPath: "/files/images/photos/nasa-uap-vm5-apollo-12-1969.jpg",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm5-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
    catalogId: "NASA-UAP-VM5",
  },
  {
    id: "IMG-006",
    title: "Apollo 17 lunar sky anomaly — Grimaldi vicinity",
    source: "NASA",
    date: "1972-12-11",
    description:
      "Apollo 17 photograph showing three dots in triangular formation, with a flash observed north of Grimaldi crater. Witness includes Astronaut Jack Schmitt.",
    localPath: "/files/images/photos/nasa-uap-vm6-apollo-17-1972.jpg",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm6-apollo-17-1972.jpg",
    incidentIds: ["PURSUE-003"],
    catalogId: "NASA-UAP-VM6",
  },
  {
    id: "IMG-007",
    title: "FBI photo A1 — UAP capture",
    source: "FBI",
    date: "1999-12-31",
    description:
      "FBI photographic evidence from PURSUE Release 01. Released as part of the FBI 'A' series — UAP imagery alongside U.S. aircraft.",
    localPath: "/files/images/photos/fbi-photo-a1.png",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a1.png",
    incidentIds: ["PURSUE-025"],
    catalogId: "FBI-A1",
  },
  {
    id: "IMG-008",
    title: "FBI photo A2 — UAP capture",
    source: "FBI",
    date: "1999-12-31",
    description: "FBI photographic evidence, A series — second frame.",
    localPath: "/files/images/photos/fbi-photo-a2.png",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a2.png",
    incidentIds: ["PURSUE-025"],
    catalogId: "FBI-A2",
  },
  {
    id: "IMG-009",
    title: "FBI photo A3 — UAP capture",
    source: "FBI",
    date: "1999-12-31",
    description: "FBI photographic evidence, A series — third frame.",
    localPath: "/files/images/photos/fbi-photo-a3.png",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a3.png",
    incidentIds: ["PURSUE-025"],
    catalogId: "FBI-A3",
  },
  {
    id: "IMG-010",
    title: "FBI photo A4 — UAP capture",
    source: "FBI",
    date: "1999-12-31",
    description: "FBI photographic evidence, A series — fourth frame.",
    localPath: "/files/images/photos/fbi-photo-a4.png",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a4.png",
    incidentIds: ["PURSUE-025"],
    catalogId: "FBI-A4",
  },
  {
    id: "IMG-011",
    title: "FBI photo A5 — black-hot infrared",
    source: "FBI",
    date: "2025-09-01",
    description:
      "Black-hot infrared imagery of unidentified object below helicopter platform, western United States.",
    localPath: "/files/images/photos/fbi-photo-a5.png",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a5.png",
    incidentIds: ["PURSUE-017"],
    catalogId: "FBI-A5",
  },
  {
    id: "IMG-012",
    title: "FBI photo A6 — black-hot infrared",
    source: "FBI",
    date: "2025-09-01",
    description: "Black-hot infrared frame, western U.S. — adjacent capture.",
    localPath: "/files/images/photos/fbi-photo-a6.png",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a6.png",
    incidentIds: ["PURSUE-017"],
    catalogId: "FBI-A6",
  },
  {
    id: "IMG-013",
    title: "FBI photo A7 — black-hot infrared",
    source: "FBI",
    date: "2025-12-01",
    description:
      "December 2025 black-hot infrared frame; UAP captured below helicopter platform, western U.S. (undisclosed).",
    localPath: "/files/images/photos/fbi-photo-a7.png",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a7.png",
    incidentIds: ["PURSUE-018"],
    catalogId: "FBI-A7",
  },
  {
    id: "IMG-014",
    title: "FBI photo A8 — black-hot infrared",
    source: "FBI",
    date: "2025-12-01",
    description: "December 2025 black-hot infrared frame, western U.S. — adjacent capture.",
    localPath: "/files/images/photos/fbi-photo-a8.png",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a8.png",
    incidentIds: ["PURSUE-018"],
    catalogId: "FBI-A8",
  },
];

export const photoById: Record<string, Photo> = Object.fromEntries(
  photos.map((p) => [p.id, p]),
);
