// Wiki content library — long-form, definition-style topical pages that
// target high-volume head terms (e.g., "UFO sightings", "UAP", "alien
// evidence"). Each entry powers a /wiki/[slug] route with Article JSON-LD.
//
// Content shape (per amplifying-ai/awesome-generative-engine-optimization
// and the Princeton GEO study):
//   - Lead paragraph 134–167 words (the citable passage zone)
//   - One verbatim quotation
//   - One statistic / count grounded in real data
//   - Primary-source citation
//   - "Sections" array for table of contents and JSON-LD article structure

export type WikiSection = {
  heading: string;
  body: string;
};

export type WikiEntry = {
  slug: string;
  title: string;
  description: string; // <meta description>, also the JSON-LD description
  lead: string; // the citable opening paragraph
  pullQuote?: string;
  sections: WikiSection[];
  keywords: string[];
  related: string[]; // related slugs
  sources: { label: string; url: string }[];
};

export const wikiEntries: WikiEntry[] = [
  {
    slug: "ufo-sightings",
    title: "UFO Sightings: The 2026 Pentagon Catalog",
    description:
      "Comprehensive index of declassified U.S. government UFO/UAP sightings released under the 2026 PURSUE program — 162 files spanning 1947 to 2025 with locations, sources, and primary documents.",
    lead:
      "UFO sightings on the U.S. federal record fall into three categories: historical FBI/USAF memos from the 1947–1960 era, modern Navy and Air Force aircrew encounters from 2004 onward, and trans-medium events catalogued by the All-domain Anomaly Resolution Office (AARO). The Pentagon's PURSUE Release 01, published 2026-05-08, consolidates 162 files — 120 PDFs, 28 videos, 14 images — covering 26 named incidents and a longer tail of 400+ catalogued reports. AARO has resolved one marquee case (the 2017 Navy GOFAST video, attributed to parallax at ~13,000 feet altitude) and rates eight cases formally \"unresolved.\" The most-witnessed historical sighting outside the federal catalog remains the Phoenix Lights (March 1997, thousands of Arizona witnesses). UAP.WATCH provides an interactive map and full-text index of every PURSUE entry.",
    pullQuote:
      "Continued and recent reports from qualified observers concerning this phenomenon still makes this matter one of concern.",
    keywords: ["UFO sightings", "UAP", "Pentagon", "AARO", "PURSUE", "declassified"],
    sections: [
      {
        heading: "Historical sightings (1947–1960)",
        body:
          "The earliest U.S. government UFO records are FBI and U.S. Air Force memoranda from the late 1940s. The 1947 FBI Dallas field memo to Director Hoover described a hexagonal object \"suspended from a 20-foot balloon by cable\" recovered in New Mexico. The same year, Wright Field's Air Material Command formally acknowledged \"continued and recent reports from qualified observers concerning this phenomenon\" — the predecessor document to Project SIGN. A 1948 Top Secret Air Force Intelligence report opened with the line: \"For some time we have been concerned by the recurring reports on flying saucers.\" A 1950 Idaho FBI memo expressed concern that unexplained sightings could cause \"hysteria, or panic\" among the public.",
      },
      {
        heading: "Cold War era (1960–2000)",
        body:
          "Cold War-era sightings on the U.S. record include the Apollo 12 (1969) and Apollo 17 (1972) lunar anomalies — released in PURSUE as NASA-sourced imagery — and a series of State Department diplomatic cables from Papua New Guinea, Kazakhstan, Turkmenistan, Georgia, and Mexico spanning 1985 to 2025. The 1994 PanAm Tajikistan cable is the most-quoted of these: a commercial pilot at 41,000 feet observed an object making \"circles, corkscrews and 90-degree turns at rapid rates of speed and under very high G's\" and assessed it as \"possibly extraterrestrial and under intelligent control.\" The Phoenix Lights of March 1997 are not in the federal catalog but are widely considered the highest-witness-count modern U.S. event.",
      },
      {
        heading: "Modern military encounters (2004–present)",
        body:
          "Modern military UAP encounters dominate the post-2004 record. The USS Nimitz \"Tic Tac\" event (2004) and the USS Theodore Roosevelt GOFAST/GIMBAL clips (2015) defined the modern Navy UAP narrative. AARO resolved GOFAST in 2026: \"the object is not actually close to the water, but is rather closer to 13,000 feet.\" PURSUE adds U.S. Air Force CENTCOM mission reports from Iraq (May 2022), Syria (July 2022), the Mediterranean (January 2024), and the Indo-Pacific (2024 \"football-shaped object\" and INDOPACOM \"misshapen ball of white light\" with halo). FBI black-hot infrared captures from September and December 2025 round out the most-recent record.",
      },
      {
        heading: "How to read the PURSUE catalog",
        body:
          "Every entry in PURSUE Release 01 has a unique DOW-UAP identifier (e.g., DOW-UAP-D14 for the Iraq May 2022 mission report) and a classification status — DECLASSIFIED, SECRET//DECLASSIFIED, or UNCLASSIFIED. AARO assigns one of four statuses: corroborated, anomalous, unresolved, or resolved. UAP.WATCH lets you filter by year, region, agency, and status, and shows the underlying PDF or DVIDS video link for every entry. For incidents with redacted text, the redaction reason — national security (b)(1), statute (b)(3), personal (b)(6), law enforcement (b)(7) — is rendered as a clickable bar.",
      },
    ],
    related: ["ufo-types-and-shapes", "famous-ufo-incidents", "alien-evidence"],
    sources: [
      { label: "war.gov/UFO/ — PURSUE Release 01", url: "https://www.war.gov/UFO/" },
      { label: "AARO — All-domain Anomaly Resolution Office", url: "https://www.war.gov/UFO/" },
      { label: "FBI Vault", url: "https://vault.fbi.gov/UFO" },
    ],
  },
  {
    slug: "ufo-types-and-shapes",
    title: "UFO Types and Shapes Reported in Government Files",
    description:
      "Catalog of UFO/UAP shapes documented in declassified U.S. government files — orbs, triangles, cylinders, ellipsoids, discs — with primary-source quotations from the 2026 PURSUE release.",
    lead:
      "UFO and UAP reports in the U.S. government catalog cluster around a small set of recurring shapes: spheres or orbs (most frequent), triangular or V-formations, metallic cylinders, classic ellipsoid \"saucer\" forms, and amorphous balls of light with halo effects. The 2026 PURSUE Release 01 catalog confirms this distribution across 26 indexed incidents. Orbs appear in roughly half the modern cases, including the 2023 Western U.S. \"Eye of Sauron\" orange-orb encounter and a September 2023 \"blacker than black\" Prius-sized object that tilted 45 degrees and shot upward faster than known drones. Triangular formations appear in the Apollo 17 lunar sky anomaly. Metallic cylinders appear in a 2023 southeastern U.S. case where two contractors observed an object \"approximately commercial-airplane sized.\"",
    pullQuote:
      "Misshapen and uneven ball of white light.",
    keywords: ["UFO shapes", "UAP types", "orbs", "triangles", "cylinders", "Tic Tac"],
    sections: [
      {
        heading: "Orbs and spheres",
        body:
          "Orbs are the most frequently reported UAP shape in modern U.S. military and FBI records. The 2023 \"Eye of Sauron\" case describes orange orbs that emitted smaller red orbs in groups of two to four, observed by federal law enforcement agents over a two-day period. A separate September 2023 case describes a glowing orange orb near a rock pinnacle in the western United States; AARO rates this case \"among the most compelling cases in current AARO holdings.\" The Syria October 2024 video shows two semi-transparent orange areas appearing for two seconds each.",
      },
      {
        heading: "Triangles and V-formations",
        body:
          "Triangular formations appear in both the federal catalog and major civilian sightings. The Apollo 17 lunar sky photograph (December 1972) shows three dots in triangular formation north of Grimaldi crater, witnessed by Astronaut Jack Schmitt. The 1997 Phoenix Lights remain the highest-witness-count V-formation event in U.S. history, with thousands of Arizona witnesses describing a slow-moving carpenter's-square shape preceding a separate set of stationary hovering lights. PURSUE Release 01 also includes a January 2024 Mediterranean Sea report of a \"triangular and metallic UAP at 25,000 feet\" from a Navy pilot.",
      },
      {
        heading: "Cylinders, ellipsoids, and discs",
        body:
          "Cylindrical and ellipsoid forms dominate the historical record. The 1947 FBI Dallas memo on the Roswell-area recovery describes the object as \"bronze, metallic, of ellipsoid form, between 130 and 195 feet in apparent dimension.\" A September 2023 southeastern U.S. case describes \"a large metallic cylinder, approximately commercial-airplane sized\" observed by two government contractors in separate vehicles — the object remained stationary for 15-20 seconds before disappearing. A separate September 2023 DoD photograph captures an \"ellipsoid bronze metallic object materializing out of a bright light,\" with an FBI lab graphic overlay aligning the photograph with eyewitness sketches.",
      },
      {
        heading: "Misshapen / amorphous lights",
        body:
          "Some of the most recent PURSUE entries describe shapes that resist categorization. The Pentagon's January 2024 INDOPACOM full-motion video clips capture what the Pentagon describes as a \"misshapen and uneven ball of white light\" with a \"light/glare halo effect.\" FBI black-hot infrared still images from September and December 2025 capture unidentified objects below helicopter platforms in the western U.S., released without geolocation to protect facility identity. The 2017 GOFAST clip — initially appearing as a small white object skimming the ocean — was resolved in 2026 by AARO's geospatial-intelligence analysis as a parallax illusion of an object at approximately 13,000 feet altitude.",
      },
    ],
    related: ["ufo-sightings", "famous-ufo-incidents", "alien-evidence"],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "alien-evidence",
    title: "Evidence for Aliens: What the U.S. Government Has and Hasn't Confirmed",
    description:
      "Honest summary of the publicly-available U.S. government evidence on extraterrestrial life and UAP — what AARO has resolved, what remains unresolved, and what the Pentagon has explicitly not confirmed.",
    lead:
      "As of May 2026, no U.S. government agency has officially confirmed extraterrestrial origin for any UAP. The Department of War's PURSUE Release 01 catalog (162 declassified files) and the All-domain Anomaly Resolution Office (AARO) consistently classify cases as resolved, anomalous, unresolved, or corroborated — never as \"extraterrestrial.\" The strongest on-record speculation from a government source is a 1994 State Department diplomatic cable in which a PanAm pilot at 41,000 feet over Tajikistan recorded the object as \"possibly extraterrestrial and under intelligent control.\" That is a witness assessment in a cable, not a government conclusion. Eight cases are formally \"unresolved\" in PURSUE Release 01; AARO continues to investigate. The 2023 \"Eye of Sauron\" western U.S. orange-orb case is currently rated \"among the most compelling cases in current AARO holdings.\"",
    pullQuote: "Possibly extraterrestrial and under intelligent control.",
    keywords: ["aliens", "extraterrestrial", "UAP evidence", "AARO", "Pentagon"],
    sections: [
      {
        heading: "What the Pentagon has confirmed",
        body:
          "The Pentagon's confirmed claims are narrow and specific: (1) UAP encounters by U.S. military aircrew are real and recurring; (2) some UAP demonstrate flight characteristics that are not currently explained by known U.S. or foreign technology; (3) the federal government has 162 declassified files (PURSUE Release 01) and a longer classified tail; (4) AARO is the central body for investigating these reports under 50 U.S.C. § 3373. The Pentagon has not confirmed extraterrestrial origin, has not confirmed recovered non-human craft, and has not confirmed any so-called \"reverse engineering\" program despite high-profile congressional whistleblower testimony.",
      },
      {
        heading: "What AARO has resolved",
        body:
          "AARO's most public 2026 resolution was the 2017 Navy GOFAST video. AARO Director Dr. Jon Kosloski stated: \"Through a very careful geospatial intelligence analysis and using trigonometry, we assess with high confidence that the object is not actually close to the water, but is rather closer to 13,000 feet.\" The apparent low altitude and high speed were a parallax illusion. AARO has historically resolved cases as Chinese surveillance balloons, ice crystals on F/A-18 ATFLIR optics, drone swarms, and weather-related sensor artifacts. Resolution does not retroactively explain every unresolved case but it does establish a public methodology.",
      },
      {
        heading: "What remains unresolved",
        body:
          "Eight PURSUE Release 01 incidents are formally \"unresolved\" by AARO. These include the 2023 Western U.S. \"Eye of Sauron\" orange-orb encounters witnessed by federal agents, a January 2024 Mediterranean \"triangular and metallic UAP at 25,000 feet,\" a 2023 southeastern U.S. metallic cylinder \"approximately commercial-airplane sized,\" and FBI black-hot infrared captures from September and December 2025. AARO's published assessment on the Apollo 17 lunar anomaly is that there is \"no consensus about the nature of the anomaly\" and the Pentagon is conducting a new review.",
      },
      {
        heading: "What the public record does not say",
        body:
          "The U.S. public record does not contain confirmation of recovered alien biological samples, alien spacecraft, or extraterrestrial communication. Congressional whistleblower testimony from David Grusch (2023) and others alleges the existence of a classified non-human craft retrieval program, but no agency has produced declassified evidence of such a program; AARO's Historical Record Report (2024) examined 80 years of U.S. government UAP records and stated it found \"no empirical evidence\" for the alleged retrieval program. UAP.WATCH limits its claims to the documents in PURSUE Release 01 and AARO's published statements.",
      },
    ],
    related: ["ufo-sightings", "what-is-aaro", "famous-ufo-incidents"],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "pentagon-ufo-files",
    title: "Pentagon UFO Files: The 2026 PURSUE Release",
    description:
      "Complete guide to the U.S. Department of War's 2026 declassified UFO/UAP file release — the PURSUE program — including all 162 files, source agencies, and how to access the originals.",
    lead:
      "The Pentagon's 2026 declassified UFO/UAP file release is officially called PURSUE Release 01 — Presidential Unsealing & Reporting System for UAP Encounters. Published on 2026-05-08 at war.gov/UFO/, the release contains 162 files: 120 PDFs, 28 videos, and 14 images. Source agencies include the FBI, U.S. Air Force, U.S. Navy, NASA, the State Department, and DoD components. The catalog spans 1947 (FBI Dallas hexagonal-object memo) through December 2025 (FBI black-hot infrared captures). PURSUE is administered jointly with the All-domain Anomaly Resolution Office (AARO) under 50 U.S.C. § 3373. UAP.WATCH provides an independent visualization layer of the entire catalog, with locally-extracted text for 113 of the 118 unique PDFs.",
    pullQuote:
      "AT 1514Z, [REDACTED] OBSERVED 1X UAP.",
    keywords: ["Pentagon UFO files", "PURSUE", "declassified", "UAP", "war.gov"],
    sections: [
      {
        heading: "How to access the originals",
        body:
          "All PURSUE files are hosted at war.gov/UFO/ as direct PDF and DVIDS-video links. The canonical CSV catalog is at war.gov/Portals/1/Interactive/2026/UFO/uap-csv.csv (also available via the Wayback Machine). Most PDFs use the URL pattern war.gov/medialink/ufo/release_1/<filename>.pdf. Most videos are hosted on DVIDS (dvidshub.net) — the Defense Visual Information Distribution Service. UAP.WATCH mirrors all 162 catalog entries and links every entry directly to its war.gov source URL.",
      },
      {
        heading: "What's in the catalog",
        body:
          "By document type: 120 PDFs include 8 hand-curated synthetic memo extracts (for the redaction-bar Easter egg) plus 112 declassified mission reports, FBI memos, State Department cables, and AARO unresolved-case reports. The 28 videos include CENTCOM AOR clips (Greece, Iraq, Syria), INDOPACOM full-motion-video, EO and IR sensor captures, and historical archive video. The 14 images include FBI black-hot infrared still frames, NASA Apollo lunar plates with annotated areas of interest, and the 2023 DoD ellipsoid-bronze-metallic-object photograph.",
      },
      {
        heading: "Status breakdown",
        body:
          "Of the 26 named incidents in the catalog: 1 is RESOLVED (the 2017 Navy GOFAST clip, attributed by AARO to parallax at ~13,000 ft); 8 are UNRESOLVED; 12 are ANOMALOUS; 5 are CORROBORATED. Unresolved cases include the 2023 \"Eye of Sauron\" orange-orb case and the January 2024 Mediterranean triangular-metallic UAP. Anomalous cases include the Syria 2024 orange-area video and the INDOPACOM \"misshapen and uneven ball of white light\" with halo effect. Corroborated cases include the 1947 FBI Dallas memo and the 1947 Wright Field AMC memorandum.",
      },
    ],
    related: ["what-is-pursue-program", "ufo-sightings", "what-is-aaro"],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "DoD press release", url: "https://www.war.gov/News/Releases/Release/Article/4480582/" },
    ],
  },
];

export const wikiBySlug: Record<string, WikiEntry> = Object.fromEntries(
  wikiEntries.map((w) => [w.slug, w]),
);
