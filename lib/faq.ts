// FAQ content library. Each entry powers one programmatic /q/[slug] page
// with FAQPage JSON-LD. Answers are written in the Princeton GEO research
// "citable passage" shape: 134–167 words, lead with definition, include a
// quotation or statistic, cite the primary source. This is the single
// highest-leverage tactic for getting cited by ChatGPT / Claude / Perplexity
// / Gemini / Google AI Overviews.
//
// All factual claims are grounded in the PURSUE Release 01 catalog
// (war.gov/UFO/, released 2026-05-08) and the public AARO record.

export type FaqEntry = {
  slug: string;
  q: string;
  a: string;
  // Short pull-quote rendered prominently above the answer body — gives AI
  // crawlers a clean, attributable string they can lift verbatim.
  pull?: string;
  related?: string[]; // related slugs
  // Optional cited source URL list, rendered as <cite> + linked.
  sources?: { label: string; url: string }[];
  // Optional follow-up Q&A pairs rendered as nested FAQs (boost FAQPage
  // schema completeness without exploding individual page count).
  followups?: { q: string; a: string }[];
};

export const faqEntries: FaqEntry[] = [
  {
    slug: "what-are-uaps",
    q: "What are UAPs?",
    pull:
      "UAP stands for Unidentified Anomalous Phenomena — the U.S. government's official replacement for the term UFO since 2022.",
    a: "UAP stands for Unidentified Anomalous Phenomena. It is the U.S. government's current official term for what the public calls UFOs. Congress and the Pentagon adopted UAP in 2022 to broaden the original aviation-only term \"Unidentified Aerial Phenomena\" to include trans-medium objects observed in space, in the air, on the surface, and underwater. The term is defined in 50 U.S.C. § 3373 and is used by the All-domain Anomaly Resolution Office (AARO) and the Department of War's PURSUE program. The 2026-05-08 PURSUE Release 01 catalog uses UAP across all 162 declassified files, covering FBI, USAF, USN, NASA, and State Department records spanning 1947 to 2026. UAP includes both confirmed objects of unknown origin and cases later resolved as drones, balloons, parallax illusions, or sensor artifacts.",
    sources: [
      { label: "war.gov/UFO/ — PURSUE Release 01", url: "https://www.war.gov/UFO/" },
      { label: "50 U.S.C. § 3373 (UAP statutory definition)", url: "https://www.law.cornell.edu/uscode/text/50/3373" },
    ],
    related: ["what-is-pursue-program", "what-is-aaro", "ufo-vs-uap"],
  },
  {
    slug: "what-is-pursue-program",
    q: "What is the Pentagon's PURSUE program?",
    pull:
      "PURSUE stands for Presidential Unsealing & Reporting System for UAP Encounters — the framework under which the Pentagon released 162 declassified UAP files on 2026-05-08.",
    a: "PURSUE — the Presidential Unsealing & Reporting System for UAP Encounters — is the U.S. Department of War program that declassifies and releases government UAP records to the public. PURSUE Release 01, published on 2026-05-08 at war.gov/UFO/, contains 162 files: 120 PDFs, 28 videos, and 14 images. Source agencies include the FBI, U.S. Air Force, U.S. Navy, NASA, the State Department, and DoD components. The catalog spans incidents from a 1947 FBI Dallas field memo on a recovered hexagonal object through black-hot infrared imagery captured in December 2025. PURSUE is administered alongside AARO (the All-domain Anomaly Resolution Office) and routes raw reports to AARO for technical assessment before public release.",
    sources: [
      { label: "war.gov/UFO/ — official PURSUE portal", url: "https://www.war.gov/UFO/" },
      {
        label: "DoD press release on Release 01",
        url: "https://www.war.gov/News/Releases/Release/Article/4480582/",
      },
    ],
    related: ["what-are-uaps", "what-is-aaro", "how-many-files-in-pursue"],
  },
  {
    slug: "what-is-aaro",
    q: "What is AARO?",
    pull:
      "AARO is the Pentagon's All-domain Anomaly Resolution Office, the central body that investigates UAP reports and resolved the 2017 Navy GOFAST video as a parallax illusion at 13,000 feet.",
    a: "The All-domain Anomaly Resolution Office (AARO) is the U.S. Department of War body that investigates and resolves UAP reports. Established by Congress in 2022 under the National Defense Authorization Act, AARO replaced earlier UAP task forces and unified investigation across the Air Force, Navy, intelligence community, and NASA. AARO's most public 2026 finding was the resolution of the 2017 USS Theodore Roosevelt GOFAST video. AARO Director Dr. Jon Kosloski stated: \"Through a very careful geospatial intelligence analysis and using trigonometry, we assess with high confidence that the object is not actually close to the water, but is rather closer to 13,000 feet.\" AARO assesses every PURSUE-released file before declassification. Many cases remain open: the 2023 \"Eye of Sauron\" Western US orange-orb encounter is currently rated by AARO as \"among the most compelling cases in current AARO holdings.\"",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
    related: ["what-is-pursue-program", "gofast-video-explained", "eye-of-sauron-orbs"],
  },
  {
    slug: "how-many-files-in-pursue",
    q: "How many UFO files did the Pentagon release in 2026?",
    pull:
      "The Pentagon released 162 files on 2026-05-08: 120 PDFs, 28 videos, and 14 images covering incidents from 1947 to 2025.",
    a: "The U.S. Department of War released 162 declassified UAP files on 2026-05-08 under PURSUE Release 01. The breakdown is 120 PDFs (including FBI memos, USAF mission reports, USN mission reports, State Department diplomatic cables, and NASA Apollo-era imagery indexes), 28 videos (most hosted on DVIDS in infrared or electro-optical formats), and 14 images. UAP.WATCH has indexed 113 of the 118 unique PDFs with locally-extracted text; the remaining five are FBI image-only PDFs without extractable text. Of the 26 most-discussed incidents, 1 has been resolved (the 2017 GOFAST video), 8 are formally classified \"unresolved,\" 12 are \"anomalous,\" and 5 are \"corroborated.\" Geographic coverage spans the Continental United States, the Atlantic, the Mediterranean, the Middle East, the Indo-Pacific, Central Asia, and the lunar surface.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "UAP.WATCH catalog", url: "https://uap-watch-flame.vercel.app/" },
    ],
    related: ["what-is-pursue-program", "ufo-videos-real", "famous-ufo-incidents"],
  },
  {
    slug: "gofast-video-explained",
    q: "What is the GOFAST video and was it resolved?",
    pull:
      "The 2017 Navy GOFAST video was resolved by AARO in 2026: the object was at ~13,000 feet, not skimming the ocean — parallax explained the apparent low altitude and high speed.",
    a: "The GOFAST video is a 35-second F/A-18 Super Hornet ATFLIR clip recorded off the U.S. East Coast in 2015 by the USS Theodore Roosevelt strike group. For nearly a decade it was treated as a marquee unresolved Navy UAP case because the object appeared to skim just above the ocean surface at high speed. In 2026, AARO Director Dr. Jon Kosloski announced the case as resolved. AARO's geospatial-intelligence analysis used the aircraft's known altitude, sensor angle, and the object's apparent ground track to triangulate the true position: approximately 13,000 feet altitude, not low-level. The illusion of low altitude and high speed was a parallax artifact — the same effect that makes a passenger jet appear to crawl across the sky. AARO classified the GOFAST encounter \"resolved\" in PURSUE Release 01.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
    related: ["what-is-aaro", "navy-uap-encounters", "famous-ufo-videos"],
  },
  {
    slug: "eye-of-sauron-orbs",
    q: "What is the 'Eye of Sauron' UAP case?",
    pull:
      "Two federal agents in the western U.S. observed orange orbs over multiple days in 2023; one witness compared the object to 'the Eye of Sauron from Lord of the Rings, except without the pupil.'",
    a: "The \"Eye of Sauron\" case refers to a series of 2023 sightings by multiple federal law enforcement agents in the western United States. Over a two-day period, agents observed orange orbs that emitted smaller red orbs in groups of two to four. One witness described the lead object as resembling \"the Eye of Sauron from Lord of the Rings, except without the pupil, or maybe an orange Storm Electrify bowling ball.\" The encounter is logged in PURSUE incidents PURSUE-005 and PURSUE-019. AARO publicly described the case as \"among the most compelling cases in current AARO holdings\" because of multiple corroborating teams of credentialed witnesses. As of 2026 the case remains classified \"unresolved\" by AARO. Both incident files and a 47-second EO clip from the encounter are in PURSUE Release 01.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
    related: ["what-is-aaro", "famous-ufo-incidents", "fbi-ufo-files"],
  },
  {
    slug: "are-aliens-real",
    q: "Has the U.S. government confirmed aliens are real?",
    pull:
      "No U.S. government agency has confirmed extraterrestrial origin for any UAP. The Pentagon's position as of 2026: many UAPs remain unresolved, but none have been attributed to extraterrestrial intelligence.",
    a: "As of May 2026, no U.S. government agency has confirmed that any UAP has extraterrestrial origin. The Pentagon's official position, articulated by AARO in PURSUE Release 01, is that of the 162 declassified files and 400+ catalogued incidents, the majority resolve to known phenomena (drones, balloons, sensor parallax, ice crystals) and a minority remain unresolved or anomalous. The most direct on-record speculation from a government source comes from a 1994 State Department cable: a PanAm pilot at 41,000 feet over Tajikistan reported an object making circles, corkscrews and 90-degree turns under high G-loads, and the cable records the pilot's personal assessment that the object was \"possibly extraterrestrial and under intelligent control.\" That is a witness assessment recorded in a diplomatic cable, not a government conclusion. AARO continues to investigate.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
    related: ["what-is-aaro", "what-are-uaps", "famous-ufo-incidents"],
  },
  {
    slug: "fbi-ufo-files",
    q: "Has the FBI released UFO files?",
    pull:
      "Yes — the FBI has released hundreds of UFO files via The Vault and contributed multiple memos to the 2026 PURSUE release, including the 1947 Dallas hexagonal-object memo and the 2023 'Eye of Sauron' case.",
    a: "The FBI has released UFO records through two main channels. The first is The Vault, the FBI's public records reading room, which contains hundreds of pages of historical UFO files dating to the 1940s — most famously the 1947 \"Hottel memo\" describing a balloon-suspended hexagonal object recovered in New Mexico. The second is contribution to PURSUE Release 01 in 2026: the FBI provided the 1947 Dallas field memo (DOC-001 / PURSUE-001), a 1950 Idaho memo expressing concern about \"hysteria, or panic\" from unexplained sightings, FBI photographs from New Year's Eve 1999 showing UAP framed alongside a U.S. aircraft, and the 2023 \"Eye of Sauron\" agent-witness case. The FBI's role in PURSUE is primarily as a witness-statement custodian for U.S.-soil incidents involving federal personnel.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "FBI Vault — UFO files", url: "https://vault.fbi.gov/UFO" },
    ],
    related: ["roswell-incident", "eye-of-sauron-orbs", "famous-ufo-incidents"],
  },
  {
    slug: "roswell-incident",
    q: "What does the FBI say about Roswell?",
    pull:
      "The FBI's 1947 Dallas field memo describes a recovered hexagonal object 'suspended from a 20-foot balloon by cable' — released to the public via The Vault and the 2026 PURSUE catalog.",
    a: "The FBI's primary on-record document on the 1947 Roswell incident is a Dallas field office memorandum dated 8 July 1947, addressed to FBI Director J. Edgar Hoover. The memo describes a recovered \"hexagonal object suspended from a 20-foot balloon by cable.\" Witness sketches accompanying the memo describe the object as \"bronze, metallic, of ellipsoid form, between 130 and 195 feet in apparent dimension.\" The memo recommends forwarding the object to a redacted agency for technical examination and notes that the public-affairs posture should default to a standard weather-balloon attribution pending review. The U.S. Air Force later officially attributed the Roswell debris to Project Mogul, a classified high-altitude balloon program for detecting Soviet nuclear tests. The FBI memo is included in PURSUE Release 01 as DOC-001 / PURSUE-001.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "FBI Vault — Hottel memo", url: "https://vault.fbi.gov/hottel_guy" },
    ],
    related: ["fbi-ufo-files", "famous-ufo-incidents", "what-is-pursue-program"],
  },
  {
    slug: "navy-uap-encounters",
    q: "What UAP encounters has the Navy reported?",
    pull:
      "The Navy contributed mission reports including the 2017 GOFAST clip (resolved 2026), a January 2024 Mediterranean encounter with a 'triangular and metallic UAP at 25,000 feet,' and pilot statements from the USS Nimitz and Theodore Roosevelt strike groups.",
    a: "U.S. Navy contributions to PURSUE Release 01 include the 2017 GOFAST video from the USS Theodore Roosevelt strike group (resolved by AARO in 2026 as a parallax artifact at ~13,000 feet altitude), a January 2024 Mediterranean Sea mission report describing a \"triangular and metallic UAP at 25,000 feet\" observed by a single pilot (PURSUE-009 / DOC-003), and historical statements from the broader 2004 USS Nimitz \"Tic Tac\" encounter that have been referenced by AARO in supporting documents. Naval encounters dominate the high-altitude/over-water portion of the PURSUE catalog. As of 2026 the Mediterranean January 2024 case is classified \"unresolved\" by AARO. The Navy's role in PURSUE is primarily as the originating source for fast-jet sensor footage and aircrew mission reports.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
    related: ["gofast-video-explained", "famous-ufo-videos", "what-is-aaro"],
  },
  {
    slug: "ufo-vs-uap",
    q: "What's the difference between a UFO and a UAP?",
    pull:
      "UFO is the legacy 1950s term ('Unidentified Flying Object'); UAP is the current U.S. government term ('Unidentified Anomalous Phenomena') and includes underwater and trans-medium objects.",
    a: "UFO and UAP refer to the same broad category — sightings that resist conventional identification — but the terms have different scope and provenance. UFO (\"Unidentified Flying Object\") was coined by the U.S. Air Force in 1953 and is air-only by definition. UAP originally stood for \"Unidentified Aerial Phenomena\" and was adopted by the Navy in 2019 to remove the cultural baggage attached to UFO. In 2022 Congress expanded the acronym to \"Unidentified Anomalous Phenomena\" to cover trans-medium objects observed in air, in space, on the surface of the ocean, and underwater. UAP is the term used in 50 U.S.C. § 3373, in all AARO publications, and across all 162 files in PURSUE Release 01. UFO remains common in journalism and popular culture; both terms describe the same phenomena.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "50 U.S.C. § 3373", url: "https://www.law.cornell.edu/uscode/text/50/3373" },
    ],
    related: ["what-are-uaps", "what-is-aaro", "what-is-pursue-program"],
  },
  {
    slug: "famous-ufo-videos",
    q: "What are the most famous declassified UFO videos?",
    pull:
      "The four most-cited declassified U.S. military UFO videos are GIMBAL, GOFAST, FLIR1 (Tic Tac), and the new 2026 PURSUE Greece infrared clip showing a 90-degree turn at 80 mph.",
    a: "The four most-cited declassified U.S. military UAP videos are: GIMBAL (2015 Navy F/A-18 ATFLIR clip showing a rotating object); GOFAST (2015, resolved 2026 to ~13,000 ft altitude / parallax illusion); FLIR1 / Tic Tac (2004 USS Nimitz encounter); and the 2023 Greece clip from PURSUE Release 01 showing an object making a 90-degree turn at approximately 80 mph captured on infrared (DVIDS asset, PURSUE-006). PURSUE Release 01 added 28 new videos, most hosted on DVIDS in infrared and electro-optical formats, including footage from the Indo-Pacific theater (a \"football-shaped object\"), Syria (two semi-transparent orange areas appearing for two seconds each), and a January 2024 INDOPACOM clip described by the Pentagon as a \"misshapen and uneven ball of white light\" with a halo effect.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "DVIDS — DoD video archive", url: "https://www.dvidshub.net/" },
    ],
    related: ["gofast-video-explained", "navy-uap-encounters", "ufo-videos-real"],
  },
  {
    slug: "ufo-videos-real",
    q: "Are real UFO videos available to the public?",
    pull:
      "Yes — 28 declassified UAP videos from 2017–2024 are publicly available on DVIDS and indexed by UAP.WATCH, including infrared and electro-optical footage from CENTCOM, INDOPACOM, and FBI sources.",
    a: "Yes. As of 2026 the U.S. government hosts 28 declassified UAP videos on DVIDS (Defense Visual Information Distribution Service), all linked from war.gov/UFO/ and indexed at UAP.WATCH. Formats include FLIR/IR (forward-looking infrared from F/A-18 ATFLIR pods and ISR platforms), EO (electro-optical / visible light), and combined sensor-mode clips. Geographic coverage includes Greece (90-degree turn at 80 mph), the Indo-Pacific (football-shaped object), Syria (two semi-transparent orange areas), the Mediterranean (metallic triangle at 25,000 ft), and the Western United States (orange orbs in formation). Earlier official footage — GIMBAL, GOFAST, FLIR1 — is hosted by the Department of Defense and embedded across major news outlets. UAP.WATCH provides direct DVIDS links for every PURSUE video.",
    sources: [
      { label: "DVIDS — DoD video archive", url: "https://www.dvidshub.net/" },
      { label: "UAP.WATCH videos catalog", url: "https://uap-watch-flame.vercel.app/" },
    ],
    related: ["famous-ufo-videos", "gofast-video-explained", "navy-uap-encounters"],
  },
  {
    slug: "famous-ufo-incidents",
    q: "What are the most famous UFO incidents?",
    pull:
      "The most-cited modern UFO/UAP incidents on the U.S. public record are Roswell (1947), the Apollo 17 lunar anomaly (1972), the Phoenix Lights (1997), the USS Nimitz Tic Tac (2004), GOFAST (2015), and the 2023 'Eye of Sauron' Western US orbs.",
    a: "The most-cited modern UFO/UAP incidents on the U.S. public record include: Roswell, New Mexico (July 1947) — the FBI Dallas memo on a recovered hexagonal object suspended from a balloon; the Apollo 17 lunar sky anomaly (December 1972) — three dots in triangular formation north of Grimaldi crater, witnessed by Astronaut Jack Schmitt; the Phoenix Lights (March 1997) — a V-formation of lights over Arizona; the USS Nimitz \"Tic Tac\" encounter (November 2004) — multiple radar locks and pilot eyewitness reports; the F/A-18 GOFAST clip (2015, resolved 2026); the 2023 Western US \"Eye of Sauron\" orange-orb case observed by federal agents; and the 1994 PanAm Tajikistan crew sighting at 41,000 feet, where the pilot recorded the object as \"possibly extraterrestrial and under intelligent control.\"",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
    related: ["roswell-incident", "eye-of-sauron-orbs", "gofast-video-explained"],
  },
  {
    slug: "ufo-by-state",
    q: "Which U.S. state has the most reported UFO sightings?",
    pull:
      "California leads U.S. UFO reporting volume per the National UFO Reporting Center; on the federal record, the western U.S. (Nevada, Utah, Idaho, Arizona, New Mexico) dominates the AARO/PURSUE catalog.",
    a: "By total reported sightings, California leads the U.S. — the National UFO Reporting Center (NUFORC) catalogues more reports from California than any other state, a function of population density and proximity to military testing ranges. On the federal record, however, the western U.S. corridor — Nevada, Utah, Idaho, Arizona, and New Mexico — dominates the AARO and PURSUE catalogs because that's where most U.S. military airspace and witness-credentialed federal agents are stationed. PURSUE Release 01 includes incidents from New Mexico (Roswell, 1947), Idaho (1950 FBI memo), Wright Field, Ohio (1947 Air Material Command memo), and undisclosed locations in the western U.S. (2023 \"Eye of Sauron\" agent encounter; 2025 black-hot infrared imagery below a helicopter platform).",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "NUFORC", url: "https://nuforc.org/" },
    ],
    related: ["fbi-ufo-files", "eye-of-sauron-orbs", "ufo-map"],
  },
  {
    slug: "ufo-map",
    q: "Is there a map of declassified UFO sightings?",
    pull:
      "UAP.WATCH provides an interactive map of all 26 indexed PURSUE incidents on a Natural Earth projection with status-colored markers, plus a separate lunar dossier for Apollo 12 and Apollo 17 anomalies.",
    a: "UAP.WATCH publishes an interactive map of all 26 indexed PURSUE incidents on a Natural Earth projection. Markers are color-coded by AARO status: cyan for corroborated, indigo for anomalous, rose for unresolved, and pale blue for resolved. The map covers the Continental United States, the Atlantic, the Mediterranean, the Middle East, the Indo-Pacific, Central Asia, and (via a separate lunar inset) the Apollo 12 and Apollo 17 sky anomalies on the Moon. Hovering any marker reveals the incident date, location, and source agency; clicking opens a dossier panel with the full narrative, key quotation, and links to the underlying declassified document or video. The map data is sourced from the canonical Pentagon CSV (uap-csv.csv) at war.gov plus AARO incident statements.",
    sources: [
      { label: "UAP.WATCH map", url: "https://uap-watch-flame.vercel.app/" },
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
    related: ["famous-ufo-incidents", "ufo-by-state", "what-is-pursue-program"],
  },
  {
    slug: "lunar-ufo-anomaly",
    q: "What are the Apollo lunar UFO anomalies?",
    pull:
      "Two NASA lunar missions photographed unexplained anomalies released under PURSUE: Apollo 12 (1969) areas-of-interest plates and Apollo 17 (1972) — three dots in triangular formation with a flash north of Grimaldi crater, witnessed by Astronaut Jack Schmitt.",
    a: "PURSUE Release 01 includes two NASA-sourced lunar UAP entries. The Apollo 12 entry (PURSUE-002, November 1969) consists of archival lunar surface plates with annotated \"areas of interest\" — released in two versions, with three witnesses. The Apollo 17 entry (PURSUE-003, December 1972) is more striking: a photograph from the lunar sky north of Grimaldi crater shows three dots in triangular formation, accompanied by a flash. The witness list includes Astronaut Harrison \"Jack\" Schmitt, the only geologist to walk on the Moon. AARO's published assessment is that there is \"no consensus about the nature of the anomaly\" and the Pentagon is conducting a new review. UAP.WATCH renders both Apollo plates in an interactive lunar dossier with NASA archive imagery (AS12-46-6832 and as17-152-23272) and AOI markers.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "NASA Apollo image archive", url: "https://www.nasa.gov/mission/apollo-program/" },
    ],
    related: ["famous-ufo-incidents", "what-is-aaro", "ufo-map"],
  },
  {
    slug: "phoenix-lights",
    q: "What were the Phoenix Lights?",
    pull:
      "The Phoenix Lights were a series of large V-formation light sightings over Arizona on March 13, 1997, witnessed by thousands. The U.S. Air Force later attributed them to A-10 flares dropped over the Barry M. Goldwater Range.",
    a: "The Phoenix Lights were a series of large V-shaped light formations observed by thousands of witnesses over Phoenix, Arizona, on the night of March 13, 1997. Reports described both a slow-moving carpenter's-square-shaped craft and a later set of stationary lights that hung in formation for several minutes. Then-Governor Fife Symington publicly mocked the sightings at the time, then later acknowledged he had personally seen the formation and described it as \"otherworldly.\" The U.S. Air Force attributed the later set of stationary lights to A-10 Warthog flare drops during a training exercise over the Barry M. Goldwater Range. The earlier carpenter's-square formation has never been definitively identified. The Phoenix Lights are not part of PURSUE Release 01 but are routinely referenced as one of the highest-witness-count UFO events in U.S. history.",
    sources: [
      { label: "Arizona Republic — Phoenix Lights archive", url: "https://www.azcentral.com/" },
    ],
    related: ["famous-ufo-incidents", "are-aliens-real", "ufo-by-state"],
  },
];

export const faqBySlug: Record<string, FaqEntry> = Object.fromEntries(
  faqEntries.map((f) => [f.slug, f]),
);
