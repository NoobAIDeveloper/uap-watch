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
  {
    slug: "tic-tac-uap",
    q: "What is the Tic Tac UFO from the USS Nimitz?",
    pull:
      "The Tic Tac UFO refers to a November 2004 multi-day Navy radar and visual encounter near the USS Nimitz strike group, in which F/A-18 pilots observed a 40-foot white object resembling a Tic Tac that demonstrated extreme acceleration and trans-medium capability.",
    a: "The Tic Tac UFO is the most-cited modern U.S. military UAP encounter. Over multiple days in November 2004 off the coast of Baja California, the USS Nimitz Carrier Strike Group's E-2C Hawkeye radar and the USS Princeton's SPY-1 radar repeatedly tracked anomalous objects descending from approximately 80,000 feet to sea level in seconds. On 14 November 2004, F/A-18F pilot Commander David Fravor was vectored to investigate and visually observed a smooth, white, 40-foot object \"shaped like a Tic Tac\" hovering above a churning patch of ocean, then accelerating beyond the F/A-18's tracking capability. The encounter was captured on FLIR1 ATFLIR sensor video, declassified in 2017. AARO has reviewed the case multiple times and as of 2026 it remains classified as anomalous; not formally resolved.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "Department of Defense FLIR1 release", url: "https://www.dvidshub.net/" },
    ],
    related: ["famous-ufo-videos", "navy-uap-encounters", "gimbal-video-explained"],
  },
  {
    slug: "gimbal-video-explained",
    q: "What is the GIMBAL video?",
    pull:
      "GIMBAL is a 35-second 2015 Navy F/A-18 ATFLIR clip showing a saucer-shaped object rotating in mid-air over the Atlantic, with audio of pilots reacting in real time: \"Look at that thing! It's rotating!\"",
    a: "GIMBAL is one of the three Navy ATFLIR (Advanced Targeting Forward-Looking Infrared) clips officially declassified by the Department of Defense in 2017–2020. Recorded in 2015 by F/A-18F Super Hornets from the USS Theodore Roosevelt strike group operating off the East Coast of the United States, the clip shows a smooth, saucer-shaped object hovering against a strong head-on wind, then rotating 90 degrees while remaining in place. Pilot audio captures real-time reactions: \"Look at that thing! It's rotating!\" Skeptics, including AARO contributors, have proposed that the apparent rotation is a gimbal-lock artifact of the ATFLIR pod itself rather than a physical rotation of the object — hence the clip's name. As of 2026 the case is not formally resolved by AARO; it sits between unresolved and anomalous depending on the analyst.",
    sources: [
      { label: "DoD GIMBAL release", url: "https://www.dvidshub.net/" },
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
    related: ["gofast-video-explained", "tic-tac-uap", "famous-ufo-videos"],
  },
  {
    slug: "bob-lazar-claims",
    q: "Who is Bob Lazar and are his Area 51 claims credible?",
    pull:
      "Bob Lazar publicly claimed in 1989 to have worked on reverse-engineering recovered alien craft at \"S-4\" near Area 51. AARO's 2024 Historical Record Report found no empirical evidence for the program he described.",
    a: "Bob Lazar is an American who claimed in a 1989 Las Vegas television interview with George Knapp to have worked as a physicist at \"Sector 4\" (S-4), a classified facility approximately 15 miles south of Area 51 near Papoose Lake, Nevada, reverse-engineering recovered extraterrestrial spacecraft. Lazar described nine craft of varying shapes and a fuel he called \"Element 115.\" His employment, education credentials, and the existence of S-4 itself have never been corroborated by any U.S. government record. AARO's 2024 Historical Record Report explicitly addressed the broader narrative of classified retrieval programs — including those in Lazar's specific claims — and stated that AARO \"found no empirical evidence\" for any such program. Lazar's claims remain widely discussed in popular UFO culture but are not part of any U.S. government public record, including PURSUE Release 01.",
    sources: [
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
    ],
    related: ["area-51", "ufo-crash-retrievals", "are-aliens-real"],
  },
  {
    slug: "area-51",
    q: "What is Area 51 and what's actually known about it?",
    pull:
      "Area 51 is a classified U.S. Air Force test facility at Groom Lake, Nevada — officially acknowledged in 2013 — that hosted U-2, A-12, F-117, and other aircraft programs. No U.S. government source has ever confirmed UFO-related activity at Area 51.",
    a: "Area 51 (also Groom Lake / Homey Airport / Detachment 3, AFFTC) is a classified test facility operated by the U.S. Air Force in southern Nevada. It was established in 1955 to test the U-2 reconnaissance aircraft and subsequently hosted the A-12 OXCART, F-117 Nighthawk, B-2 Spirit, and RQ-170 Sentinel programs. The U.S. government did not officially acknowledge Area 51's existence until July 2013, when a CIA Freedom of Information Act release confirmed the facility's role in the U-2 program. AARO's 2024 Historical Record Report directly addressed the popular narrative connecting Area 51 to extraterrestrial craft retrieval and reverse-engineering, and stated that AARO found \"no empirical evidence\" for any such activity. The Pentagon's PURSUE Release 01 contains no incidents geolocated to Area 51.",
    sources: [
      { label: "CIA Area 51 declassification (2013)", url: "https://www.cia.gov/" },
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
    ],
    related: ["bob-lazar-claims", "ufo-crash-retrievals", "ufo-by-state"],
  },
  {
    slug: "mj-12",
    q: "Is MJ-12 (Majestic 12) real?",
    pull:
      "MJ-12 is the alleged secret committee of scientists, military leaders, and government officials reportedly formed in 1947 to manage UFO recoveries. The FBI and AARO have both stated the documents purporting to prove its existence are not authentic government records.",
    a: "MJ-12 (also Majestic 12, Majic 12) refers to an alleged top-secret committee of twelve scientists, military officers, and government officials reportedly established by President Truman in September 1947 to manage UFO crash recoveries — most prominently the alleged Roswell debris. The narrative is built on a series of documents that surfaced in 1984, purportedly leaked to UFO researcher Jaime Shandera. The FBI examined the documents in 1988 and stated they are \"completely bogus.\" Linguistic and typographic analysis by historians and the National Archives has identified anachronisms and signature inconsistencies that suggest the documents were fabricated in the 1980s. AARO's 2024 Historical Record Report addressed the broader MJ-12 narrative and found no evidence of any such committee in U.S. government records. MJ-12 is not part of PURSUE Release 01.",
    sources: [
      { label: "FBI Vault — MJ-12 file", url: "https://vault.fbi.gov/Majestic%2012" },
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
    ],
    related: ["ufo-crash-retrievals", "are-aliens-real", "fbi-ufo-files"],
  },
  {
    slug: "project-blue-book",
    q: "What was Project Blue Book?",
    pull:
      "Project Blue Book was the U.S. Air Force's longest-running UFO investigation program, active from 1952 to 1969 at Wright-Patterson AFB. It catalogued 12,618 UFO reports; 701 (5.6%) were classified as 'unidentified' at termination.",
    a: "Project Blue Book was the third and longest U.S. Air Force investigation of UFO reports, succeeding Project SIGN (1948) and Project GRUDGE (1949–1952). Active from March 1952 through December 1969 at Wright-Patterson Air Force Base, Ohio, Blue Book catalogued 12,618 reported sightings. Of these, 11,917 were attributed to known phenomena (aircraft, balloons, satellites, astronomical events, hoaxes); 701 cases (5.6%) were classified as \"unidentified\" at the time of termination. The program was wound down following the 1968 Condon Report — a University of Colorado study commissioned by the Air Force — which concluded that further UFO study was unlikely to yield scientific advances. The complete Blue Book archive is now at the National Archives. PURSUE Release 01 does not duplicate Blue Book content; the historical record is explicitly the predecessor catalog.",
    sources: [
      { label: "National Archives — Project Blue Book", url: "https://www.archives.gov/research/military/air-force/ufos" },
    ],
    related: ["project-sign-grudge", "famous-ufo-incidents", "what-is-aaro"],
  },
  {
    slug: "ariel-school",
    q: "What was the Ariel School UFO incident?",
    pull:
      "On 16 September 1994, 62 children at the Ariel School in Ruwa, Zimbabwe reported witnessing one or more landed disc-shaped craft and small humanoid beings during morning recess. Harvard psychiatrist John Mack interviewed the children and concluded they were not hoaxing.",
    a: "The Ariel School UFO incident occurred on the morning of 16 September 1994 at the Ariel School in Ruwa, Zimbabwe, approximately 20 kilometers from Harare. During the morning recess, 62 children aged 6 to 12 reported observing one or more silver disc-shaped objects landed in the field beyond the schoolyard, and one or more small humanoid beings standing near the craft. Children's drawings produced immediately after the incident showed remarkably consistent features. Harvard Medical School psychiatrist Dr. John Mack flew to Zimbabwe and conducted independent interviews with the children, concluding that the witnesses showed no signs of fabrication. The incident is one of the most-cited multi-witness child-witness UFO cases on record. It is not part of PURSUE Release 01 (which is U.S. government records only) but is routinely referenced in international UFO research.",
    sources: [
      { label: "John Mack Institute archive", url: "https://johnemackinstitute.org/" },
    ],
    related: ["famous-ufo-incidents", "are-aliens-real"],
  },
  {
    slug: "battle-of-los-angeles",
    q: "What was the Battle of Los Angeles?",
    pull:
      "On the night of 24-25 February 1942, U.S. Army anti-aircraft batteries fired 1,440 rounds at unidentified objects over Los Angeles. Six civilians died from heart attacks and falling shrapnel. The official explanation was war nerves and weather balloons.",
    a: "The Battle of Los Angeles (also the Great Los Angeles Air Raid) occurred on the night of 24-25 February 1942, less than three months after the attack on Pearl Harbor. U.S. Army anti-aircraft units along the Southern California coast fired 1,440 rounds of 12.8-pound shells at unidentified slow-moving objects over the city; the engagement lasted nearly an hour. Six civilians died — three of heart attacks attributed to the panic, three from falling shrapnel and friendly fire. The Los Angeles Times published a now-famous photograph showing searchlights converging on an apparent object. The Secretary of the Navy attributed the incident to \"war nerves\" the next day; the Army's later position was \"unidentified airplanes, probably commercial.\" Modern UFO researchers cite Battle of LA as a pre-Roswell government acknowledgment of unidentified objects in U.S. airspace. Not part of PURSUE Release 01.",
    sources: [
      { label: "Los Angeles Times archives", url: "https://www.latimes.com/" },
    ],
    related: ["famous-ufo-incidents", "ufo-by-state"],
  },
  {
    slug: "rendlesham-forest",
    q: "What was the Rendlesham Forest incident?",
    pull:
      "Over 26-28 December 1980, multiple U.S. Air Force personnel at RAF Bentwaters / Woodbridge in Suffolk, England reported a triangular craft on the ground and pulsing lights in the adjacent Rendlesham Forest. Deputy Base Commander Lt. Col. Charles Halt recorded the second night's events on micro-cassette.",
    a: "The Rendlesham Forest incident occurred over three nights, 26-28 December 1980, at the joint U.S. Air Force / Royal Air Force bases of Bentwaters and Woodbridge in Suffolk, England. Multiple USAF security personnel reported observing a small, triangular, metallic craft sitting in a clearing in Rendlesham Forest on the first night, with one airman, Sergeant Jim Penniston, reportedly touching the craft. On the third night, Deputy Base Commander Lieutenant Colonel Charles Halt led a patrol into the forest and recorded the events on a micro-cassette dictation device — the recording, now public, captures Halt and his team observing pulsing red lights and an object that appeared to drop molten objects. The British Ministry of Defence eventually released its file (DEFE 24/1948) under FOI in the 2000s; the official UK position is that the incident posed \"no defence significance.\" Not in PURSUE Release 01 (which is U.S. records only).",
    sources: [
      { label: "UK National Archives — DEFE 24/1948", url: "https://www.nationalarchives.gov.uk/" },
    ],
    related: ["famous-ufo-incidents", "are-aliens-real"],
  },
  {
    slug: "kenneth-arnold-sighting",
    q: "Who was Kenneth Arnold and what did he see?",
    pull:
      "On 24 June 1947, civilian pilot Kenneth Arnold reported nine saucer-like objects flying in formation near Mount Rainier, Washington at an estimated 1,200 mph. His description gave the press the term 'flying saucer' and launched the modern UFO era.",
    a: "Kenneth Arnold was a civilian pilot from Idaho who reported a sighting on 24 June 1947 that is widely considered the founding event of the modern UFO era. While flying his CallAir A-2 from Chehalis to Yakima, Washington, Arnold observed nine bright objects flying in formation near Mount Rainier at an estimated speed of 1,200 mph. He described them to reporters in Pendleton, Oregon as moving \"like a saucer would if you skipped it across the water\" — a descriptive simile the press collapsed into the now-iconic term \"flying saucer.\" The sighting predated the Roswell incident by two weeks and is the immediate precedent for the December 1947 Wright Field AMC memorandum (PURSUE-023) that acknowledged \"continued and recent reports from qualified observers.\" The Arnold sighting itself is not in PURSUE Release 01 but is the originating event for the broader catalog.",
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
    related: ["famous-ufo-incidents", "ufo-by-state", "ufo-vs-uap"],
  },
  {
    slug: "mcminnville-photographs",
    q: "What are the McMinnville UFO photographs?",
    pull:
      "On 11 May 1950, Paul and Evelyn Trent photographed a disc-shaped object near McMinnville, Oregon. The 1968 Condon Report concluded the photographs showed 'an extraordinary flying object… disk-shaped, tens of meters in diameter, and evidently artificial.'",
    a: "The McMinnville UFO photographs are two black-and-white images taken by Oregon farmer Paul Trent and his wife Evelyn at approximately 7:30 PM on 11 May 1950, near their farm outside McMinnville. The photographs show a smooth, parabolic, disc-shaped object hovering against the evening sky. They were published in Life magazine on 26 June 1950 and became the canonical reference images for the disc-shape UFO category. The 1968 Condon Report — the U.S. Air Force-commissioned scientific study at the University of Colorado — examined the McMinnville photographs in detail and concluded they showed \"an extraordinary flying object… which appears to have been silvery, metallic, disk-shaped, tens of meters in diameter, and evidently artificial.\" The report noted that the photographic evidence is consistent with a genuine sighting but could not rule out a hoax. The photographs are not in PURSUE Release 01.",
    sources: [
      { label: "Condon Report (1968)", url: "https://archive.org/details/scientificstudyo00unse" },
    ],
    related: ["famous-ufo-incidents", "ufo-by-state", "kenneth-arnold-sighting"],
  },
  {
    slug: "travis-walton",
    q: "What is the Travis Walton case?",
    pull:
      "On 5 November 1975, logger Travis Walton was reportedly struck by a beam of light from a hovering disc-shaped object near Snowflake, Arizona, then disappeared for five days. Six co-workers passed polygraph tests when describing the encounter.",
    a: "The Travis Walton case is one of the most-investigated alleged abduction events in U.S. UFO history. On 5 November 1975, Walton — a 22-year-old logger — was working on a forest-thinning crew in the Apache-Sitgreaves National Forest near Snowflake, Arizona. According to Walton and his six co-workers, the crew encountered a hovering disc-shaped object glowing yellow-white, and when Walton approached the craft, a blue-green beam of light struck him to the ground. The other six men fled and reported him missing. Walton reappeared five days later in Heber, Arizona, in apparent confusion. Six of the seven witnesses (Walton plus five co-workers) passed polygraph examinations administered by the Arizona Department of Public Safety; the seventh result was inconclusive. The case was the basis for the 1993 film \"Fire in the Sky.\" Not part of PURSUE Release 01.",
    sources: [
      { label: "Arizona Department of Public Safety case file", url: "https://www.azdps.gov/" },
    ],
    related: ["famous-ufo-incidents", "ufo-by-state", "are-aliens-real"],
  },
  {
    slug: "stephenville-ufo",
    q: "What was the Stephenville UFO incident?",
    pull:
      "On 8 January 2008, dozens of witnesses across Erath County, Texas reported a large bright object moving silently at high speed. FAA radar later confirmed an unidentified object with no transponder traveling toward the Bush ranch in Crawford.",
    a: "The Stephenville UFO incident is one of the best-radar-corroborated modern civilian sightings in the U.S. record. On the evening of 8 January 2008, dozens of witnesses across Erath County, Texas — centered on the town of Stephenville — reported a large bright object with rapidly-changing lights moving silently at high speed. The U.S. Air Force initially denied any military activity in the area, then revised the statement two weeks later to confirm that 10 F-16s from the 457th Fighter Squadron at Naval Air Station Joint Reserve Base Fort Worth had been on a training exercise. Subsequent FOIA-released FAA radar data showed an unidentified object with no transponder, traveling at high speed on a track that intersected the no-fly zone over the Bush ranch in Crawford. The object's identity remains formally unresolved. Not part of PURSUE Release 01.",
    sources: [
      { label: "MUFON Stephenville case file", url: "https://mufon.com/" },
    ],
    related: ["famous-ufo-incidents", "ufo-by-state"],
  },
  {
    slug: "belgian-wave",
    q: "What was the Belgian UFO wave of 1989-1990?",
    pull:
      "From November 1989 through April 1990, thousands of witnesses across Belgium reported large triangular craft with three or four white lights. The Belgian Air Force formally confirmed two F-16 radar locks on 30-31 March 1990.",
    a: "The Belgian UFO wave was a five-month period of mass-witness sightings across Belgium from November 1989 through April 1990. Thousands of witnesses, including police officers and military personnel, reported large silent triangular craft with three or four bright white lights at the corners. The most-cited single event occurred on the night of 30-31 March 1990: Belgian Air Force radar tracked unidentified objects, two F-16 fighters were scrambled, and the pilots achieved brief radar locks before the objects accelerated beyond the F-16's tracking capability. Belgian Air Force Major-General Wilfried De Brouwer publicly acknowledged the radar tracks and said the events \"could not be explained.\" The wave is one of the most-documented multi-national UFO events of the 20th century. Not part of PURSUE Release 01 (U.S. records only).",
    sources: [
      { label: "Belgian Air Force official report (1990)", url: "https://www.mil.be/" },
    ],
    related: ["famous-ufo-incidents", "are-aliens-real", "ufo-types-and-shapes"],
  },
  {
    slug: "disclosure-project",
    q: "What is the Disclosure Project?",
    pull:
      "The Disclosure Project is a private initiative founded by Dr. Steven Greer in 1993 that has presented hundreds of military, intelligence, and civilian witnesses claiming firsthand UFO experience. It is not affiliated with any U.S. government agency.",
    a: "The Disclosure Project is a private advocacy initiative founded by Dr. Steven M. Greer, an emergency-room physician, in 1993. The project's stated goal is to compel U.S. government acknowledgment of extraterrestrial visitation by collecting and presenting witness testimony from former military, intelligence, and civilian personnel. The most-cited Disclosure Project event was the 9 May 2001 National Press Club briefing in Washington, D.C., at which approximately 20 witnesses publicly stated they had firsthand knowledge of UFO programs. The project's claims are not corroborated by any U.S. government source; AARO's 2024 Historical Record Report did not find evidence supporting the broader narrative. The Disclosure Project is sometimes confused with the formal congressional disclosure efforts of 2022-2024 (Senator Marco Rubio, Senator Kirsten Gillibrand, Representative Tim Burchett); these are independent and unaffiliated.",
    sources: [
      { label: "Disclosure Project archive", url: "https://www.disclosureproject.org/" },
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
    ],
    related: ["grusch-testimony", "are-aliens-real", "ufo-crash-retrievals"],
  },
  {
    slug: "grusch-testimony",
    q: "What did David Grusch testify about UFOs?",
    pull:
      "On 26 July 2023, former intelligence officer David Grusch testified to Congress that the U.S. government operates a 'multi-decade UAP crash retrieval and reverse-engineering program.' AARO's 2024 Historical Record Report stated it found no empirical evidence for the program he described.",
    a: "David Charles Grusch is a former U.S. Air Force intelligence officer and former member of the National Geospatial-Intelligence Agency UAP Task Force. On 26 July 2023, Grusch testified under oath before the House Oversight Committee's Subcommittee on National Security, the Border, and Foreign Affairs. He stated that he had become aware, while serving on the UAP Task Force, of a \"multi-decade UAP crash retrieval and reverse-engineering program\" being run by U.S. government contractors, and that he had filed a whistleblower complaint with the Intelligence Community Inspector General. Grusch did not present physical evidence; his testimony was based on conversations with other officials. AARO's 2024 Historical Record Report directly addressed Grusch's allegations and stated that AARO \"found no empirical evidence\" for the program he described. As of 2026 the broader investigation remains open, but no corroborating documentation has been declassified.",
    sources: [
      { label: "House Oversight Committee hearing transcript (July 26, 2023)", url: "https://oversight.house.gov/" },
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
    ],
    related: ["disclosure-project", "ufo-crash-retrievals", "are-aliens-real"],
  },
  {
    slug: "galileo-project",
    q: "What is the Galileo Project?",
    pull:
      "The Galileo Project is a Harvard-based academic research program founded by astrophysicist Avi Loeb in 2021 to systematically search for evidence of extraterrestrial technology using ground-based observatories and AI image classification.",
    a: "The Galileo Project is an academic research program founded in July 2021 by Harvard astrophysicist Professor Avi Loeb. Headquartered at the Harvard-Smithsonian Center for Astrophysics, the project aims to bring traditional scientific rigor to the search for evidence of extraterrestrial technological artifacts (rather than just biosignatures). It operates ground-based optical-IR-radio observatories — most prominently a station at the Harvard College Observatory — and uses machine-learning classifiers to distinguish conventional objects (birds, drones, balloons, planes) from anomalies. The project also conducted the 2023 Pacific Ocean expedition that recovered metallic spherules from the seafloor near the 2014 IM1 interstellar meteor track; the recovered material's interstellar origin remains debated. The Galileo Project is independent of and unaffiliated with the Pentagon's PURSUE program or AARO. It is the most-funded private scientific UAP research effort to date.",
    sources: [
      { label: "Galileo Project at Harvard", url: "https://projects.iq.harvard.edu/galileo" },
    ],
    related: ["are-aliens-real", "what-is-aaro"],
  },
  {
    slug: "project-sign-grudge",
    q: "What were Project Sign and Project Grudge?",
    pull:
      "Project Sign (1948) was the U.S. Air Force's first formal UFO investigation; it produced the 'Estimate of the Situation' concluding extraterrestrial origin was likely. The estimate was rejected and the program reorganized as Project Grudge (1949–1952), then Project Blue Book.",
    a: "Project Sign was the U.S. Air Force's first formal UFO investigation, established at Wright-Patterson Air Force Base in late 1947 and active through 1948. It produced an internal classified document called the \"Estimate of the Situation,\" which reportedly concluded that the most plausible explanation for the recurring sightings was extraterrestrial origin. Air Force Chief of Staff General Hoyt S. Vandenberg rejected the estimate as unsupported by evidence and ordered the document destroyed; no copy is in the public record. The investigation was renamed Project Grudge in 1949 with a more skeptical institutional posture; Grudge was largely a debunking exercise and was wound down in 1952. The program was then reorganized as Project Blue Book (1952–1969), which catalogued 12,618 cases. Project Sign and Project Grudge predate PURSUE Release 01 by decades, but the December 1947 Wright Field AMC memorandum (PURSUE-023) is the immediate predecessor document.",
    sources: [
      { label: "National Archives — Project Sign / Grudge / Blue Book", url: "https://www.archives.gov/research/military/air-force/ufos" },
    ],
    related: ["project-blue-book", "famous-ufo-incidents", "what-is-pursue-program"],
  },
  {
    slug: "ufo-crash-retrievals",
    q: "Has the U.S. government recovered crashed UFOs?",
    pull:
      "AARO's 2024 Historical Record Report stated AARO 'found no empirical evidence' for any U.S. government UFO crash retrieval or reverse-engineering program. The 1947 Roswell debris was officially attributed to Project Mogul, a high-altitude balloon program.",
    a: "There is no declassified, evidence-backed U.S. government acknowledgment of any UFO crash retrieval program. The 1947 Roswell debris — the foundational event in the broader retrieval narrative — was officially attributed by the U.S. Air Force to Project Mogul, a then-classified high-altitude balloon program for detecting Soviet nuclear tests. The 2023 testimony of former intelligence officer David Grusch alleged a \"multi-decade UAP crash retrieval and reverse-engineering program,\" but Grusch presented no physical evidence and stated his testimony was based on conversations with other officials. AARO's 2024 Historical Record Report — the U.S. government's most-recent comprehensive review of 80 years of UAP records — directly addressed the retrieval narrative and stated AARO \"found no empirical evidence\" for any such program. PURSUE Release 01 contains no recovered material; the 1947 FBI Dallas memo describes the recovered Roswell object as \"suspended from a 20-foot balloon by cable.\"",
    sources: [
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
      { label: "FBI Vault — Hottel memo", url: "https://vault.fbi.gov/hottel_guy" },
    ],
    related: ["roswell-incident", "grusch-testimony", "are-aliens-real"],
  },
  {
    slug: "reverse-engineering-public-record",
    q: "Has the U.S. reverse-engineered alien technology?",
    pull:
      "No. AARO's 2024 Historical Record Report explicitly stated AARO 'found no empirical evidence' for any program that reverse-engineered non-human technology. Public claims to the contrary are uncorroborated by any declassified record.",
    a: "As of May 2026, there is no declassified U.S. government document acknowledging any program that reverse-engineered extraterrestrial or non-human technology. AARO's 2024 Historical Record Report — the most comprehensive U.S. government review of 80 years of UAP records — addressed the reverse-engineering narrative directly and stated that AARO \"found no empirical evidence\" for any such program. The most-public claims of such activity are Bob Lazar's 1989 statements about \"Element 115\" at S-4 (Nevada), and David Grusch's 2023 congressional testimony about a \"multi-decade UAP crash retrieval and reverse-engineering program.\" Neither has been corroborated by any U.S. government source. PURSUE Release 01 contains no recovered material, and no entry references a reverse-engineering program. Some technologies attributed in popular narratives to alien sources — notably stealth coatings and integrated circuits — have been independently traced to human development by historians and the U.S. patent record.",
    sources: [
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
    ],
    related: ["bob-lazar-claims", "grusch-testimony", "ufo-crash-retrievals"],
  },
];

export const faqBySlug: Record<string, FaqEntry> = Object.fromEntries(
  faqEntries.map((f) => [f.slug, f]),
);
