// Comparison pages — pSEO targeting "X vs Y" queries which LLMs and humans
// both heavily query. Each page renders a side-by-side fact table plus a
// substantive narrative on what's similar and what's different. Two-entity
// pages are uniquely effective for GEO citation because they answer a
// natural-language question with structured fact pairs.

export type CompareSide = {
  name: string;
  // Bullet-list facts shown in the comparison column.
  facts: { label: string; value: string }[];
  // Optional related links rendered below the column.
  links?: { href: string; label: string }[];
};

export type CompareEntry = {
  slug: string;
  title: string;
  description: string;
  // 134-167 word lead summarising both entities together.
  lead: string;
  pullQuote?: string;
  left: CompareSide;
  right: CompareSide;
  // Sectioned narrative on key contrasts.
  sections: { heading: string; body: string }[];
  keywords: string[];
  related: string[];
  sources: { label: string; url: string }[];
};

export const compareEntries: CompareEntry[] = [
  {
    slug: "gofast-vs-gimbal",
    title: "GOFAST vs GIMBAL — How the Two Famous Navy UFO Videos Differ",
    description:
      "GOFAST and GIMBAL are both 2015 Navy F/A-18 ATFLIR clips declassified by the Pentagon. GOFAST was resolved by AARO in 2026 as a parallax illusion at 13,000 feet. GIMBAL remains formally unresolved.",
    lead:
      "GOFAST and GIMBAL are the two most-cited Navy ATFLIR (Advanced Targeting Forward-Looking Infrared) clips officially declassified by the U.S. Department of Defense in 2017–2020. Both were recorded in 2015 by F/A-18F Super Hornets from the USS Theodore Roosevelt strike group operating off the East Coast. The two clips look superficially similar — small white object, gun-camera framing, pilot audio in the background — but resolve into very different cases. AARO formally resolved GOFAST in 2026: geospatial-intelligence analysis placed the object at approximately 13,000 feet altitude, not skimming the ocean as it appeared, and identified parallax as the cause of the illusion of low altitude and high speed. GIMBAL remains formally unresolved as of 2026; the apparent 90-degree rotation may be either a real physical rotation or a gimbal-lock artifact of the ATFLIR pod itself, and AARO has not committed to either interpretation.",
    pullQuote:
      "The object is not actually close to the water, but is rather closer to 13,000 feet.",
    left: {
      name: "GOFAST",
      facts: [
        { label: "Recorded", value: "2015 (declassified 2017)" },
        { label: "Platform", value: "F/A-18F Super Hornet ATFLIR" },
        { label: "Strike group", value: "USS Theodore Roosevelt" },
        { label: "Location", value: "Atlantic Test and Evaluation Range" },
        { label: "Duration", value: "35 seconds" },
        { label: "Apparent behavior", value: "Small white object skimming ocean at high speed" },
        { label: "AARO status (2026)", value: "RESOLVED — parallax artifact, ~13,000 ft altitude" },
      ],
      links: [{ href: "/q/gofast-video-explained", label: "Full GOFAST explainer" }],
    },
    right: {
      name: "GIMBAL",
      facts: [
        { label: "Recorded", value: "2015 (declassified 2020)" },
        { label: "Platform", value: "F/A-18F Super Hornet ATFLIR" },
        { label: "Strike group", value: "USS Theodore Roosevelt" },
        { label: "Location", value: "Off East Coast" },
        { label: "Duration", value: "34 seconds" },
        { label: "Apparent behavior", value: "Saucer-shaped object hovering, then rotating 90 degrees" },
        { label: "AARO status (2026)", value: "Unresolved — possible gimbal-lock artifact" },
      ],
      links: [{ href: "/q/gimbal-video-explained", label: "Full GIMBAL explainer" }],
    },
    sections: [
      {
        heading: "What's the same",
        body:
          "Both clips were recorded in 2015 by F/A-18F Super Hornets from the USS Theodore Roosevelt strike group, both use the same ATFLIR sensor, both were officially declassified by the Department of Defense, and both feature pilot audio reacting in real time. Both are part of the broader narrative that drove the 2022 establishment of AARO under the National Defense Authorization Act.",
      },
      {
        heading: "What's different",
        body:
          "GOFAST has been formally resolved by AARO in 2026 — the object was at approximately 13,000 feet altitude, not skimming the ocean, and the apparent high speed and low altitude were both parallax illusions. GIMBAL remains unresolved. The skeptical interpretation of GIMBAL is that the object's apparent 90-degree rotation is a gimbal-lock artifact caused by the ATFLIR sensor pod itself reaching a tracking-axis singularity — hence the clip's name. AARO has not formally committed to either the gimbal-lock or the genuine-rotation interpretation as of 2026.",
      },
    ],
    keywords: ["GOFAST", "GIMBAL", "Navy UFO video", "ATFLIR", "USS Theodore Roosevelt", "AARO"],
    related: ["gofast-video-explained", "gimbal-video-explained", "tic-tac-uap"],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "DoD ATFLIR releases (DVIDS)", url: "https://www.dvidshub.net/" },
    ],
  },
  {
    slug: "tic-tac-vs-gofast",
    title: "Tic Tac vs GOFAST — Comparing the Two Most-Cited Navy UAP Encounters",
    description:
      "The 2004 Tic Tac (USS Nimitz) and 2015 GOFAST (USS Theodore Roosevelt) are the two best-known U.S. Navy UAP encounters. Tic Tac remains formally unresolved; GOFAST was resolved by AARO in 2026.",
    lead:
      "The Tic Tac UFO encounter (November 2004, USS Nimitz Carrier Strike Group) and the GOFAST clip (2015, USS Theodore Roosevelt strike group) are the two most-cited modern U.S. Navy UAP encounters. Both involve F/A-18 Super Hornet aircrew and ATFLIR/FLIR1 sensor footage, but the two cases differ on almost every other dimension. Tic Tac is a multi-day multi-witness multi-radar event with a 40-foot visual object directly observed by an experienced strike-group commander; GOFAST is a 35-second sensor clip of a small white object whose true altitude and speed were misperceived. AARO formally resolved GOFAST in 2026 as a parallax artifact at ~13,000 feet altitude. Tic Tac remains formally unresolved by AARO as of 2026, with the case still rated anomalous due to the multi-sensor corroboration and the experience level of the witnesses.",
    pullQuote:
      "Smooth, white, 40-foot object shaped like a Tic Tac.",
    left: {
      name: "Tic Tac (USS Nimitz)",
      facts: [
        { label: "Date", value: "November 2004" },
        { label: "Strike group", value: "USS Nimitz" },
        { label: "Location", value: "Off Baja California, Pacific" },
        { label: "Witnesses", value: "Multi-day multi-aircrew + USS Princeton SPY-1 radar" },
        { label: "Visual description", value: "40-foot white object resembling a Tic Tac" },
        { label: "Sensor footage", value: "FLIR1 ATFLIR (released 2017)" },
        { label: "AARO status (2026)", value: "Anomalous, formally unresolved" },
      ],
      links: [{ href: "/q/tic-tac-uap", label: "Full Tic Tac explainer" }],
    },
    right: {
      name: "GOFAST",
      facts: [
        { label: "Date", value: "2015" },
        { label: "Strike group", value: "USS Theodore Roosevelt" },
        { label: "Location", value: "Atlantic Test and Evaluation Range" },
        { label: "Witnesses", value: "Single F/A-18 aircrew" },
        { label: "Visual description", value: "Small white object (apparent low-altitude, high-speed)" },
        { label: "Sensor footage", value: "ATFLIR (released 2017)" },
        { label: "AARO status (2026)", value: "RESOLVED — parallax at ~13,000 ft" },
      ],
      links: [{ href: "/q/gofast-video-explained", label: "Full GOFAST explainer" }],
    },
    sections: [
      {
        heading: "Why Tic Tac is harder to dismiss",
        body:
          "The Tic Tac case has multi-sensor corroboration that GOFAST lacks. The Nimitz event was tracked over multiple days by E-2C Hawkeye radar and the USS Princeton's SPY-1 radar before any aircraft were vectored to investigate; Commander David Fravor and Lt. Commander Jim Slaight then visually observed the object hovering over churning water and watched it accelerate beyond their tracking capability. GOFAST, by contrast, is a single 35-second sensor clip with one aircrew, and the apparent extraordinary behavior turned out to be a parallax illusion.",
      },
      {
        heading: "Why GOFAST was resolvable",
        body:
          "GOFAST's resolution by AARO in 2026 was possible precisely because the case has a single sensor, a known aircraft altitude, and a recoverable geospatial geometry. AARO Director Dr. Jon Kosloski stated: \"Through a very careful geospatial intelligence analysis and using trigonometry, we assess with high confidence that the object is not actually close to the water, but is rather closer to 13,000 feet.\" The same trigonometric resolution approach is harder to apply to Tic Tac because there were multiple independent sensors and visual confirmation.",
      },
    ],
    keywords: ["Tic Tac", "GOFAST", "USS Nimitz", "USS Theodore Roosevelt", "Navy UAP", "AARO"],
    related: ["tic-tac-uap", "gofast-video-explained", "navy-uap-encounters"],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "roswell-vs-phoenix-lights",
    title: "Roswell vs Phoenix Lights — How Two Iconic UFO Events Compare",
    description:
      "Roswell (1947) is the foundational government-record UFO event; Phoenix Lights (1997) is the highest-witness-count modern civilian event. Roswell is in PURSUE Release 01; Phoenix Lights is not.",
    lead:
      "Roswell (July 1947) and the Phoenix Lights (March 1997) are the two most-recognized UFO events in U.S. cultural memory, but they differ on almost every dimension. Roswell is a single-incident government-record event — the FBI Dallas field memo describing a recovered \"hexagonal object suspended from a 20-foot balloon by cable\" is in PURSUE Release 01 as DOC-001 (PURSUE-001). The Phoenix Lights, by contrast, is a multi-witness civilian mass-sighting with thousands of independent witnesses across Arizona, but no government acknowledgment beyond the Air Force attributing the second wave of stationary lights to A-10 flare drops. Roswell is documented but small in witness count; Phoenix Lights is undocumented in any government record but has the largest witness pool of any modern U.S. UFO event.",
    pullQuote: "Hexagonal object suspended from a 20-foot balloon by cable.",
    left: {
      name: "Roswell (1947)",
      facts: [
        { label: "Date", value: "July 1947" },
        { label: "Location", value: "Roswell, New Mexico" },
        { label: "Witnesses", value: "Small (FBI / military personnel)" },
        { label: "Government record", value: "Yes — FBI Dallas memo (PURSUE-001)" },
        { label: "Official explanation", value: "Project Mogul balloon train" },
        { label: "Status today", value: "Corroborated as historical event; non-extraterrestrial per USAF" },
      ],
      links: [{ href: "/q/roswell-incident", label: "Full Roswell explainer" }],
    },
    right: {
      name: "Phoenix Lights (1997)",
      facts: [
        { label: "Date", value: "March 13, 1997" },
        { label: "Location", value: "Phoenix and Arizona at large" },
        { label: "Witnesses", value: "Thousands across the state" },
        { label: "Government record", value: "No — not in PURSUE Release 01" },
        { label: "Official explanation", value: "A-10 flares (second wave); first wave unidentified" },
        { label: "Status today", value: "Civilian mass-sighting, formally unidentified V-formation" },
      ],
      links: [{ href: "/q/phoenix-lights", label: "Full Phoenix Lights explainer" }],
    },
    sections: [
      {
        heading: "Documentation vs witness count",
        body:
          "Roswell has a paper trail — the 1947 FBI Dallas memo to Director Hoover, now declassified and in PURSUE Release 01 — but a small witness pool. Phoenix Lights has the opposite shape: thousands of independent civilian witnesses including then-Governor Fife Symington, but no government documentation beyond the Air Force's flare-drop attribution. The two cases are often grouped together as \"famous UFO events\" but they're actually opposite types of evidence.",
      },
      {
        heading: "What survives in 2026",
        body:
          "Roswell remains the most-cited single UFO event because it is in the official record (PURSUE-001). The Air Force's Project Mogul attribution is the standing official explanation; AARO's 2024 Historical Record Report did not contradict it. Phoenix Lights remains the highest-witness-count modern U.S. civilian UFO event; the V-formation first wave has never been officially identified, while the later stationary lights are explained as A-10 flares from the Barry M. Goldwater Range.",
      },
    ],
    keywords: ["Roswell", "Phoenix Lights", "UFO history", "PURSUE", "AARO"],
    related: ["roswell-incident", "phoenix-lights", "famous-ufo-incidents"],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "FBI Vault — Hottel memo", url: "https://vault.fbi.gov/hottel_guy" },
    ],
  },
  {
    slug: "aaro-vs-uap-task-force",
    title: "AARO vs the UAP Task Force — Pentagon UAP Investigation Bodies Compared",
    description:
      "AARO (All-domain Anomaly Resolution Office) succeeded the Navy UAP Task Force in 2022. AARO is congressionally mandated, all-domain, and unifies investigation across Air Force, Navy, intelligence, and NASA.",
    lead:
      "The U.S. government has had multiple UAP investigation bodies over the decades; the two most relevant to the modern record are the Navy UAP Task Force (UAPTF, 2020–2022) and AARO (All-domain Anomaly Resolution Office, 2022–present). UAPTF was a Navy-led ad-hoc body established under the Office of the Under Secretary of Defense for Intelligence and Security; AARO is a congressionally-mandated, all-domain body established under the 2022 National Defense Authorization Act. UAPTF produced the June 2021 Preliminary Assessment to Congress (the so-called \"ODNI Report\") covering 144 incidents from 2004 to 2021. AARO publishes the formal Annual UAP Report and conducts the case-by-case resolution work — including the 2026 GOFAST resolution. AARO also administers PURSUE Release 01 in cooperation with the Department of War.",
    pullQuote:
      "AARO is the central body for investigating UAP reports under 50 U.S.C. § 3373.",
    left: {
      name: "UAP Task Force (UAPTF)",
      facts: [
        { label: "Active", value: "August 2020 – November 2022" },
        { label: "Authority", value: "Navy / Office of the Under Secretary of Defense" },
        { label: "Scope", value: "Aerial only" },
        { label: "Key product", value: "June 2021 Preliminary Assessment (144 cases)" },
        { label: "Status today", value: "Dissolved; superseded by AARO" },
      ],
      links: [{ href: "/q/what-is-aaro", label: "Full AARO explainer" }],
    },
    right: {
      name: "AARO",
      facts: [
        { label: "Established", value: "December 2022 (NDAA)" },
        { label: "Authority", value: "Congressionally mandated under 50 U.S.C. § 3373" },
        { label: "Scope", value: "All-domain (air, space, surface, underwater)" },
        { label: "Key products", value: "Annual UAP Report, Historical Record Report, PURSUE Release" },
        { label: "Status today", value: "Active; central UAP body" },
      ],
      links: [{ href: "/q/what-is-aaro", label: "Full AARO explainer" }],
    },
    sections: [
      {
        heading: "What changed in 2022",
        body:
          "The 2022 National Defense Authorization Act (NDAA) elevated UAP investigation from a Navy-led ad-hoc body to a congressionally-mandated all-domain office under 50 U.S.C. § 3373. This change unified investigation across the Air Force, Navy, intelligence community, and NASA, and required AARO to publish an annual public UAP report and a Historical Record Report covering 80 years of U.S. government UAP records.",
      },
      {
        heading: "Why the upgrade mattered",
        body:
          "UAPTF was air-only; AARO covers air, space, surface, and underwater (trans-medium) phenomena. UAPTF's reporting was largely classified; AARO's public reporting is statutory. The 2026 GOFAST resolution, the Historical Record Report, and the PURSUE Release 01 catalog are all AARO-era products that would not have existed under the UAPTF structure. The UAP Task Force should be understood as the bridge between earlier Navy efforts (UAPTF predecessor: the 2017 Advanced Aerospace Threat Identification Program (AATIP)) and the current AARO regime.",
      },
    ],
    keywords: ["AARO", "UAP Task Force", "UAPTF", "Pentagon UAP", "AATIP"],
    related: ["what-is-aaro", "what-is-pursue-program", "famous-ufo-incidents"],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "ODNI 2021 Preliminary Assessment", url: "https://www.dni.gov/" },
    ],
  },
  {
    slug: "blue-book-vs-pursue",
    title: "Project Blue Book vs PURSUE — Comparing U.S. UFO Investigations Across Eras",
    description:
      "Project Blue Book (1952–1969) was the U.S. Air Force's longest UFO program, cataloguing 12,618 cases. PURSUE Release 01 (2026) is the modern Pentagon catalog, 162 files released through AARO.",
    lead:
      "Project Blue Book and PURSUE Release 01 are the two largest U.S. government UFO/UAP catalogs ever made publicly available. Blue Book was the third U.S. Air Force investigation, active 1952–1969 at Wright-Patterson AFB, and catalogued 12,618 reported sightings — of which 701 (5.6%) were classified as \"unidentified\" at termination. PURSUE Release 01 is the modern Pentagon catalog, released by the Department of War on 2026-05-08, containing 162 declassified files: 120 PDFs, 28 videos, and 14 images. The two catalogs differ in scope (broad civilian sighting reports vs. military-grade incident files), in classification (Blue Book was unclassified-from-the-start; PURSUE entries are mostly DECLASSIFIED from prior SECRET originals), and in evidentiary weight (Blue Book's median entry is a single witness report; PURSUE's median entry is a multi-sensor mission report).",
    pullQuote:
      "12,618 cases catalogued, 701 unidentified at program close.",
    left: {
      name: "Project Blue Book",
      facts: [
        { label: "Active", value: "1952–1969" },
        { label: "Headquarters", value: "Wright-Patterson AFB, Ohio" },
        { label: "Cases", value: "12,618 catalogued" },
        { label: "Unidentified", value: "701 (5.6%)" },
        { label: "Source agency", value: "U.S. Air Force" },
        { label: "Public archive", value: "National Archives" },
        { label: "Classification", value: "Mostly unclassified" },
      ],
      links: [{ href: "/q/project-blue-book", label: "Full Blue Book explainer" }],
    },
    right: {
      name: "PURSUE Release 01",
      facts: [
        { label: "Released", value: "2026-05-08" },
        { label: "Administered by", value: "Department of War + AARO" },
        { label: "Files", value: "162 (120 PDF + 28 video + 14 image)" },
        { label: "Indexed incidents", value: "26 named, 400+ broader catalog" },
        { label: "Source agencies", value: "FBI, USAF, USN, NASA, State, DoD" },
        { label: "Public archive", value: "war.gov/UFO/ + UAP.WATCH" },
        { label: "Classification", value: "DECLASSIFIED from SECRET originals" },
      ],
      links: [{ href: "/wiki/pentagon-ufo-files", label: "Full PURSUE explainer" }],
    },
    sections: [
      {
        heading: "Different evidentiary standards",
        body:
          "Blue Book accepted reports from civilians, police, pilots, and military witnesses on essentially equal footing — most entries are single-witness encounters with limited sensor corroboration. PURSUE entries are predominantly military mission reports (USAF MISREP, USN MISREP), State Department diplomatic cables, FBI agent witness statements, and DoD full-motion-video clips. The median PURSUE entry has multi-sensor corroboration that the median Blue Book entry does not.",
      },
      {
        heading: "What carries forward",
        body:
          "PURSUE explicitly does not duplicate Blue Book content; the historical record is the predecessor catalog and the FBI Vault is the historical FBI corpus. The newer release is curated, classification-reduced, and oriented toward modern military encounters. AARO's Historical Record Report (2024) is the work product that bridges the two eras — it reviewed 80 years of U.S. government UAP records, including the Blue Book archive, and produced consolidated findings.",
      },
    ],
    keywords: ["Project Blue Book", "PURSUE", "Pentagon UFO files", "AARO", "UAP history"],
    related: ["project-blue-book", "what-is-pursue-program", "what-is-aaro"],
    sources: [
      { label: "National Archives — Project Blue Book", url: "https://www.archives.gov/research/military/air-force/ufos" },
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "civilian-ufo-vs-military-uap",
    title: "Civilian UFO Reports vs Military UAP Encounters — How They Differ",
    description:
      "Civilian UFO reports are dominated by single-witness visual sightings; military UAP encounters typically involve multi-sensor radar and FLIR/EO corroboration. The two categories require different evidentiary standards.",
    lead:
      "Civilian UFO reports and military UAP encounters are usually grouped under the same headline, but they differ fundamentally in evidentiary structure. Civilian reports — like those catalogued by the National UFO Reporting Center (NUFORC, ~150,000+ entries) — are dominated by single-witness visual sightings, often without sensor corroboration, often involving identifiable phenomena (Venus, satellites, drones, balloons). Military UAP encounters — as catalogued by AARO and released in PURSUE Release 01 — typically involve multi-sensor radar and FLIR/EO/SAR corroboration, witnesses with high training and credentials (F/A-18 aircrew, federal agents, ISR operators), and operational consequences such as scrambled fighters or interrupted flight operations. The two categories should be analyzed under different evidentiary frameworks.",
    pullQuote:
      "Multi-sensor radar and FLIR corroboration is the hallmark of military UAP; visual single-witness is the hallmark of civilian UFO.",
    left: {
      name: "Civilian UFO reports",
      facts: [
        { label: "Volume", value: "~150,000+ via NUFORC since 1974" },
        { label: "Median witness", value: "Single civilian, visual only" },
        { label: "Sensor corroboration", value: "Rare" },
        { label: "Resolution rate", value: "High (most resolve to known phenomena)" },
        { label: "Geography", value: "Population-density-weighted (CA leads)" },
      ],
      links: [{ href: "/q/ufo-by-state", label: "UFO sightings by state" }],
    },
    right: {
      name: "Military UAP encounters",
      facts: [
        { label: "Volume", value: "162 in PURSUE; 400+ in AARO catalog" },
        { label: "Median witness", value: "Multiple credentialed military personnel" },
        { label: "Sensor corroboration", value: "Common — radar + FLIR + visual" },
        { label: "Resolution rate", value: "Lower; many remain unresolved" },
        { label: "Geography", value: "Military-airspace-weighted (CENTCOM, INDOPACOM, Atlantic)" },
      ],
      links: [{ href: "/wiki/pentagon-ufo-files", label: "PURSUE Release 01" }],
    },
    sections: [
      {
        heading: "Why the distinction matters",
        body:
          "Single-witness civilian reports are easy to debunk and easy to falsify; the median civilian UFO turns out to be a satellite, a drone, a planet, or a flare. Multi-sensor military encounters are harder to dismiss — when an F/A-18 aircrew, an E-2C Hawkeye radar, and a SPY-1 cruiser radar all track the same object, the standard explanations (sensor glitch, atmospheric anomaly) become statistically less likely. This is why AARO weights military-platform encounters more heavily in the resolution effort and why PURSUE Release 01 is dominated by military source material.",
      },
      {
        heading: "Where they overlap",
        body:
          "Some PURSUE entries blur the categories — most prominently the 2023 \"Eye of Sauron\" Western U.S. case, in which multiple federal law enforcement agents (credentialed witnesses) made a multi-day visual observation without primary sensor corroboration. AARO rated this case \"among the most compelling cases in current AARO holdings\" precisely because the witness credentials substituted for sensor corroboration. The category line is not always sharp.",
      },
    ],
    keywords: ["civilian UFO", "military UAP", "NUFORC", "AARO", "PURSUE"],
    related: ["what-are-uaps", "ufo-by-state", "what-is-aaro"],
    sources: [
      { label: "NUFORC", url: "https://nuforc.org/" },
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "pursue-vs-fbi-vault",
    title: "PURSUE vs FBI Vault — The Two Main U.S. Government UFO Document Repositories",
    description:
      "The Pentagon's 2026 PURSUE Release at war.gov/UFO and the FBI Vault are the two primary official U.S. UFO document repositories. They differ in scope, era, format, and how to search them.",
    lead:
      "The Pentagon's PURSUE Release 01 at war.gov/UFO and the FBI Vault at vault.fbi.gov are the two principal official U.S. government repositories of declassified UFO/UAP records. They overlap less than most researchers expect. PURSUE is a curated 2026 release of 162 files from the FBI, USAF, USN, NASA, State, and DoD, centered on the modern military UAP record (2004-2025) with selected historical FBI and USAF anchors from 1947-1950. The FBI Vault, by contrast, is the Bureau's running FOIA reading room: it hosts the 1949 Hottel memo (the famous \"Guy Hottel\" Roswell memo) and a 1,600-page general UFO file but no modern Navy ATFLIR videos or AARO assessments. PURSUE is curated and AARO-classified; FBI Vault is raw FOIA. Researchers typically use both in parallel: PURSUE for modern military encounters, FBI Vault for 1947-1965 civilian-FBI correspondence.",
    pullQuote:
      "PURSUE is curated and AARO-classified; FBI Vault is raw FOIA.",
    left: {
      name: "PURSUE Release 01 (war.gov/UFO)",
      facts: [
        { label: "Launched", value: "2026-05-08" },
        { label: "Total files", value: "162 (120 PDFs, 28 videos, 14 images)" },
        { label: "Source agencies", value: "FBI, USAF, USN, NASA, State, DoD" },
        { label: "Era coverage", value: "1947 to 2025, weighted modern (2004+)" },
        { label: "Curation", value: "Curated, AARO-classified" },
        { label: "Video content", value: "28 FLIR/IR/EO clips on DVIDS" },
        { label: "Full-text search", value: "Via UAP.WATCH mirror" },
      ],
      links: [{ href: "/wiki/pentagon-ufo-files", label: "PURSUE catalog overview" }],
    },
    right: {
      name: "FBI Vault (vault.fbi.gov/UFO)",
      facts: [
        { label: "Launched", value: "Reading room — running FOIA reads since 2011" },
        { label: "Total files", value: "1,600+ pages across multiple files" },
        { label: "Source agencies", value: "FBI only" },
        { label: "Era coverage", value: "1947 to ~1990, weighted historical" },
        { label: "Curation", value: "Raw FOIA — no classification or assessment" },
        { label: "Video content", value: "None" },
        { label: "Full-text search", value: "FBI Vault search box (limited)" },
      ],
      links: [{ href: "/q/fbi-ufo-files", label: "FBI UFO files explainer" }],
    },
    sections: [
      {
        heading: "What's in PURSUE but not in FBI Vault",
        body:
          "PURSUE Release 01 contains 28 declassified video clips on DVIDS — Greek airspace UAP, INDOPACOM \"football-shaped object,\" Mediterranean January 2024 metallic triangle, and Syria 2024 orange-area video — none of which are in the FBI Vault. PURSUE also contains modern AARO classifications (corroborated, anomalous, unresolved, resolved) and U.S. Navy ATFLIR sensor clips from F/A-18 Super Hornet aircrew. The FBI Vault has no aerial sensor data and no modern military encounters.",
      },
      {
        heading: "What's in FBI Vault but not in PURSUE",
        body:
          "The FBI Vault contains a much broader 1947-1965 civilian-FBI correspondence record — citizen complaint letters, J. Edgar Hoover personal annotations, regional field-office memos, and the 1949 Hottel memo on three flying-disc recoveries in New Mexico (the so-called \"Guy Hottel memo\"). PURSUE includes only a small curated subset of FBI material — the 1947 Dallas hexagonal-object memo and the 1950 Idaho \"hysteria, or panic\" memo are the two highest-profile FBI items in PURSUE.",
      },
      {
        heading: "How to use both together",
        body:
          "Modern military UAP research starts with PURSUE: it is the only repository with current AARO classifications and aerial sensor data. Historical FBI research starts with the FBI Vault: it has the broadest 1947-1965 raw record. For a comprehensive look at any one incident, UAP.WATCH cross-references both repositories — the 1947 Roswell debris memo appears in both PURSUE (as PURSUE-001) and the FBI Vault (as the Hottel memo), with subtly different metadata.",
      },
    ],
    keywords: ["PURSUE vs FBI Vault", "FBI UFO files", "war.gov/UFO", "government UFO repositories"],
    related: ["pentagon-ufo-files", "fbi-ufo-files", "what-is-pursue-program"],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "FBI Vault — UFO", url: "https://vault.fbi.gov/UFO" },
    ],
  },
  {
    slug: "aatip-vs-aawsap",
    title: "AATIP vs AAWSAP — The Two Confused Pentagon UAP Programs",
    description:
      "AATIP and AAWSAP are the two Pentagon UAP programs of the late-2000s era. They are routinely confused but were technically distinct: AATIP was the DIA program; AAWSAP was the $22M Bigelow Aerospace contract that funded AATIP and Skinwalker Ranch.",
    lead:
      "AATIP and AAWSAP are the two Pentagon UAP investigation efforts of the 2007-2012 era, routinely conflated in public reporting but technically distinct. AAWSAP — the Advanced Aerospace Weapon System Applications Program — was a $22 million Defense Intelligence Agency contract awarded in 2008 to Bigelow Aerospace Advanced Space Studies (BAASS). AATIP — the Advanced Aerospace Threat Identification Program — was the internal DIA program (also approximately $22 million across roughly the same period) that consumed the AAWSAP contract's output. AAWSAP produced 38 Defense Intelligence Reference Documents (DIRDs) on theoretical physics topics and funded BAASS investigations at Skinwalker Ranch in Utah. AATIP focused on military UAP encounters, most notably the 2004 USS Nimitz Tic Tac event. Both programs ended by 2012; AARO is their organizational successor. AARO's 2024 Historical Record Report addressed both and found no evidence of any classified retrieval activity under either.",
    pullQuote:
      "AATIP was the program; AAWSAP was the contract.",
    left: {
      name: "AATIP",
      facts: [
        { label: "Full name", value: "Advanced Aerospace Threat Identification Program" },
        { label: "Type", value: "DIA internal program" },
        { label: "Period", value: "2007 to 2012 (per AARO Historical Record)" },
        { label: "Funding", value: "~$22M (consumed via AAWSAP contract)" },
        { label: "Focus", value: "Military UAP encounters, most notably 2004 USS Nimitz Tic Tac" },
        { label: "Public exposure", value: "December 2017 New York Times investigation" },
        { label: "Most-cited leader", value: "Luis Elizondo (per Elizondo, 2010-2017)" },
      ],
      links: [{ href: "/q/aatip-program", label: "AATIP explainer" }],
    },
    right: {
      name: "AAWSAP",
      facts: [
        { label: "Full name", value: "Advanced Aerospace Weapon System Applications Program" },
        { label: "Type", value: "DIA contract vehicle" },
        { label: "Period", value: "2008 to ~2010" },
        { label: "Funding", value: "$22M awarded to BAASS (Bigelow Aerospace)" },
        { label: "Focus", value: "Theoretical physics DIRDs + Skinwalker Ranch investigation" },
        { label: "Public exposure", value: "Disclosed by James Lacatski (former DIA) in 2021" },
        { label: "Most-cited leaders", value: "James Lacatski (DIA), Robert Bigelow (BAASS)" },
      ],
      links: [{ href: "/q/aawsap-program", label: "AAWSAP explainer" }],
    },
    sections: [
      {
        heading: "Why they get confused",
        body:
          "AATIP and AAWSAP overlap in time (both active circa 2008-2010), funding scale (both ~$22M), and home agency (DIA). Critically, the AAWSAP contract was the primary funding vehicle for AATIP investigators — the contract paid BAASS subcontractors who performed work consumed by AATIP. Many of the most-cited Pentagon UAP \"program\" documents (the 38 DIRDs, the Skinwalker Ranch reports) are technically AAWSAP deliverables that were used by AATIP. Press reporting has frequently treated them as a single program, and Luis Elizondo's public discussion of \"AATIP\" effectively bundles both.",
      },
      {
        heading: "Where they differ in scope",
        body:
          "AAWSAP was wider: it commissioned theoretical physics papers on warp drives, propulsion alternatives, and \"advanced aerospace weapon systems\" — most authored by Eric Davis and other contracted physicists. AAWSAP also funded paranormal-phenomena investigations at Skinwalker Ranch that were not the kind of work AATIP staff focused on. AATIP, narrower, focused on operational military UAP encounters with U.S. assets and produced incident-level threat assessments rather than physics papers.",
      },
      {
        heading: "AARO's 2024 review",
        body:
          "AARO's 2024 Historical Record Report reviewed both programs as part of its comprehensive look at 80 years of U.S. government UAP activity. The report concluded that no evidence emerged from either AATIP or AAWSAP of any confirmed extraterrestrial material, reverse-engineering activity, or \"non-human intelligence\" program. Bob Lazar-style \"S-4\" reverse-engineering claims and David Grusch-style crash-retrieval claims were addressed and found unsupported by the AATIP/AAWSAP record.",
      },
    ],
    keywords: ["AATIP", "AAWSAP", "Pentagon UAP program", "DIA UFO", "Skinwalker Ranch"],
    related: ["aatip-program", "aawsap-program", "luis-elizondo"],
    sources: [
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "release-01-vs-release-02",
    title: "PURSUE Release 01 vs Release 02 — Side-by-Side Comparison",
    description:
      "Side-by-side comparison of the Pentagon's two declassified UAP file releases: Release 01 (2026-05-08, 162 files) and Release 02 (2026-05-22, 64 files). Records, agencies, media types, and headline cases.",
    lead:
      "The U.S. Department of War has published two tranches of declassified UAP records under PURSUE since the program launched in May 2026. Release 01 on 2026-05-08 contained 162 files (120 PDFs, 28 videos, 14 images) drawn from six agencies — FBI, DoD, NASA, State Department, USAF, USN. Release 02 on 2026-05-22 added 64 records (6 PDFs, 51 videos, 7 NASA audio recordings) from five agencies, including three new ones: CIA, ODNI, and DOE. The combined PURSUE catalog now contains 226 records spanning nine agencies and 79 years (1947 to 2026). Release 01 weighted heavily toward modern military video; Release 02 introduces NASA mission audio as a new media type and pulls historical content forward via the 116-page Sandia Base 1948-1950 green-fireball bundle.",
    pullQuote:
      "Release 01 weighted modern; Release 02 broadens to CIA, ODNI, DOE and adds historical depth via the 116-page Sandia bundle.",
    left: {
      name: "PURSUE Release 01 (May 8, 2026)",
      facts: [
        { label: "Date published", value: "2026-05-08" },
        { label: "Total records", value: "162 files" },
        { label: "PDFs", value: "120" },
        { label: "Videos", value: "28" },
        { label: "Images", value: "14" },
        { label: "Audio", value: "0 (audio not yet introduced)" },
        { label: "Agencies", value: "FBI, DoD, NASA, State, USAF, USN (6 total)" },
        { label: "Bundle size", value: "1.2GB docs + 1.3GB videos" },
        { label: "Headline doc", value: "DOC-001 FBI Dallas 1947 hexagonal-object memo" },
        { label: "Headline video", value: "VID-001 Greece 90-deg turn @ 80mph (2023)" },
      ],
      links: [
        { href: "/wiki/pentagon-ufo-files", label: "PURSUE catalog overview" },
      ],
    },
    right: {
      name: "PURSUE Release 02 (May 22, 2026)",
      facts: [
        { label: "Date published", value: "2026-05-22" },
        { label: "Total records", value: "64 files" },
        { label: "PDFs", value: "6" },
        { label: "Videos", value: "51" },
        { label: "Images", value: "0" },
        { label: "Audio", value: "7 (new media type: NASA Apollo + Mercury voice loops)" },
        { label: "Agencies", value: "DoW, NASA, CIA, ODNI, DOE (3 of these are new: CIA, ODNI, DOE)" },
        { label: "Bundle size", value: "70MB docs + 5.6GB videos" },
        { label: "Headline doc", value: "DOC-141 Sandia Base 1948-50 green fireballs (116 pages)" },
        { label: "Headline video", value: "PR051 Syrian UAP 'instant acceleration' (2021)" },
      ],
      links: [
        { href: "/wiki/pursue-release-02-overview", label: "Release 02 overview" },
      ],
    },
    sections: [
      {
        heading: "What changed in Release 02",
        body:
          "Release 02 adds three previously-absent agencies to the PURSUE catalog: the Central Intelligence Agency (one 1973 Sary Shagan intelligence report), the Office of the Director of National Intelligence (one 2025 senior-USIC helicopter narrative), and the Department of Energy (three records tied to the Pantex Plant and Los Alamos National Laboratory). It also adds audio as a new media type, with seven NASA Apollo and Mercury voice loops covering the 'fireflies' and 'streaks of lights' astronaut reports. Modern military video coverage expanded by 51 clips — primarily CENTCOM and INDOPACOM infrared captures.",
      },
      {
        heading: "Why Release 02 has fewer total files but a similar story",
        body:
          "Although Release 02 contains 64 files versus Release 01's 162, the second tranche's video count alone (51) is nearly double Release 01's (28). The PDF count dropped because Release 02 concentrated on a single 116-page mega-document — the Sandia Base 1948-1950 bundle — rather than dozens of smaller mission reports. The DoW press release for Release 02 confirms additional tranches are 'actively' in preparation, with a third release planned 'in the near future.'",
      },
      {
        heading: "Headline incidents introduced in Release 02",
        body:
          "Release 02's most-discussed records: DOW-UAP-PR050 (four-UAP infrared formation over Iran, August 26 2022), DOW-UAP-PR051 (the uploader-titled 'Syrian UAP instant acceleration' clip), DOW-UAP-PR071 (the February 12 2023 USAF F-16C engagement over Lake Huron, depicting 'a kinetic interaction... fragmenting in a radial displacement pattern'), DOC-141 (Sandia Base 1948-1950 green fireballs, 116 pages including Lincoln LaPaz reports), and DOC-142 (the ODNI senior intelligence officer's 2025 helicopter narrative — 'We were virtually speechless after these observations').",
      },
      {
        heading: "How to research both releases together",
        body:
          "UAP.WATCH indexes both releases under the same schema so you can cross-reference. Filter by year (1947-2026), agency (now 9 in the dropdown), region (Continental US, CENTCOM, INDOPACOM, NORTHCOM, USSR, lunar, low Earth orbit), and status (corroborated, anomalous, unresolved, resolved). The full Release 01 + Release 02 file index is at /browse. Document-level full-text search runs against the locally-mirrored OCR'd text for both tranches — including the Release 02 records that were OCR'd via Claude vision before Reducto's bulk HuggingFace publication.",
      },
    ],
    keywords: ["PURSUE Release 01", "PURSUE Release 02", "Pentagon UFO files comparison", "Tranche 2", "war.gov/UFO"],
    related: ["pursue-release-02-overview", "whats-new-in-pursue-release-02", "pursue-vs-fbi-vault"],
    sources: [
      { label: "Department of War — Release 02 announcement", url: "https://www.war.gov/News/Releases/Release/Article/4499305/" },
      { label: "Department of War — Release 01 announcement", url: "https://www.war.gov/News/Releases/Release/Article/4480582/" },
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "sary-shagan-vs-tic-tac",
    title: "Sary Shagan vs Tic Tac — Cold War CIA vs Modern Navy UAP",
    description:
      "Side-by-side comparison of two declassified UAP encounters separated by 31 years and the Iron Curtain: the 1973 CIA Sary Shagan green-circles report from a Soviet weapons-testing range, and the 2004 USS Nimitz Tic Tac event off Southern California.",
    lead:
      "The 1973 Sary Shagan green-circles report and the 2004 Tic Tac event are separated by 31 years, two continents, and the Iron Curtain — but both sit in the declassified U.S. government UAP record and both share an oddly consistent observational core: a luminous object at a sensitive military installation, observed by credible witnesses, whose behavior could not be explained by known platforms. Sary Shagan is a 1973 CIA Intelligence Information Report describing a human source at the Soviet anti-ballistic-missile testing range in Kazakhstan SSR observing an 'unidentified sharp (bright) green circular object or mass' that expanded into concentric green circles before fading. Tic Tac is a 2004 U.S. Navy encounter off Southern California in which USS Nimitz strike-group F/A-18 pilots tracked a 40-foot oblong white object with no exhaust, no wings, and no observable means of propulsion.",
    pullQuote:
      "Sary Shagan and Tic Tac sit 31 years and two continents apart — same observational core, opposite sides of the Iron Curtain.",
    left: {
      name: "Sary Shagan (1973)",
      facts: [
        { label: "Date", value: "Late summer 1973" },
        { label: "Location", value: "Sary Shagan ABM testing range, Kazakhstan SSR" },
        { label: "Originating agency", value: "Central Intelligence Agency (CIA)" },
        { label: "Catalog ID", value: "CIA-UAP-D001 / DOC-137" },
        { label: "Sensor", value: "Human eyewitness — Soviet source" },
        { label: "Object description", value: "Bright green circular mass widening into concentric circles" },
        { label: "Classification", value: "CONFIDENTIAL" },
        { label: "PURSUE release", value: "Release 02 (2026-05-22)" },
      ],
      links: [
        { href: "/q/cia-ufo-soviet-union-1973", label: "Full Sary Shagan explainer" },
        { href: "/wiki/cia-uap-records", label: "CIA UAP records" },
      ],
    },
    right: {
      name: "Tic Tac (2004)",
      facts: [
        { label: "Date", value: "November 14, 2004" },
        { label: "Location", value: "Off Southern California, Pacific Ocean" },
        { label: "Originating agency", value: "U.S. Navy (USS Nimitz strike group)" },
        { label: "Catalog ID", value: "Pre-PURSUE — DoD-released FLIR1 clip (2017)" },
        { label: "Sensor", value: "F/A-18 ATFLIR + USS Princeton AN/SPY-1 radar" },
        { label: "Object description", value: "40-foot oblong white object, no wings, no exhaust" },
        { label: "Classification", value: "Originally SECRET — declassified 2017" },
        { label: "PURSUE release", value: "Not in PURSUE; resolved status: Unresolved (AARO 2026)" },
      ],
      links: [
        { href: "/q/tic-tac-uap", label: "Full Tic Tac explainer" },
        { href: "/compare/tic-tac-vs-gofast", label: "Tic Tac vs GOFAST" },
      ],
    },
    sections: [
      {
        heading: "What's the same",
        body:
          "Both encounters were observed at sensitive military installations (Sary Shagan ABM testing range, USS Nimitz off Southern California). Both involve credible institutional witnesses (a CIA-rated foreign source for Sary Shagan; multiple U.S. Navy aviators and radar operators for Tic Tac). Both objects exhibit behavior that the originating agency's standard reporting framework could not classify as a known platform. Both sit in the declassified U.S. government record under their respective release frameworks.",
      },
      {
        heading: "What's different",
        body:
          "Sary Shagan is a single eyewitness account routed through a human-intelligence pipeline; Tic Tac is a multi-sensor, multi-witness engagement with FLIR video, AN/SPY-1 radar tracks, and corroborating pilot testimony. Sary Shagan's object behavior is short-duration luminous expansion (seconds); Tic Tac's is sustained kinematic anomaly (minutes of tracked maneuver). Sary Shagan is a Soviet-territory record obtained via foreign collection; Tic Tac is a U.S.-territory record from organic military sensors. Sary Shagan paragraphs 1 through 9 are withheld entirely from the declassification; Tic Tac's full mission-report text remains classified, but the FLIR1 video clip and the bulk of the pilot testimony are public.",
      },
      {
        heading: "What both tell us about the UAP record",
        body:
          "Both cases sit decades apart and on opposite sides of the Iron Curtain, but the observational pattern — an unexplained luminous or kinematic anomaly at a sensitive military installation, recorded by an institutionally-credible witness — recurs throughout the declassified UAP record. The 1948-1950 Sandia green fireballs (DOC-141), the 1994 PanAm Tajikistan State cable, and the 2025 ODNI helicopter narrative (DOC-142) all fit the same shape. Sary Shagan and Tic Tac are the Cold War and modern bookends.",
      },
    ],
    keywords: ["Sary Shagan", "Tic Tac", "CIA UAP vs Navy UAP", "1973 vs 2004 UFO", "Cold War UFO vs modern"],
    related: ["cia-ufo-soviet-union-1973", "tic-tac-uap", "cia-uap-records"],
    sources: [
      { label: "UAP.WATCH — DOC-137 Sary Shagan", url: "https://uap-watch-flame.vercel.app/document/doc-137" },
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "lake-huron-shootdown-vs-chinese-balloon-2023",
    title: "Lake Huron Shootdown vs Chinese Balloon (February 2023) — Same Week, Different Objects",
    description:
      "Side-by-side comparison of the two most-publicized U.S. shootdowns in the February 2023 high-altitude object series: the February 4 Chinese surveillance balloon downed off South Carolina, and the February 12 F-16 Lake Huron engagement now declassified as DOW-UAP-PR071 in PURSUE Release 02.",
    lead:
      "The February 2023 high-altitude object series produced four U.S. and Canadian shootdowns within nine days, but only two attracted sustained public attention: the February 4 Chinese surveillance balloon off the South Carolina coast (formally attributed to the People's Republic of China) and the February 12 F-16C engagement over Lake Huron (still formally unidentified by AARO in 2026). The two events share a sensor environment, an engagement pattern (AIM-9X Sidewinder missile launch), and a public-affairs framing — but diverge on every analytical dimension that matters: the balloon was attributed within 48 hours; the Lake Huron object remains officially unidentified three years later. The Lake Huron gun-camera footage was declassified under PURSUE Release 02 on May 22, 2026 as catalog entry DOW-UAP-PR071; the balloon engagement footage was released publicly through DoD press channels in February 2023.",
    pullQuote:
      "The February 4 balloon was attributed within 48 hours. The February 12 Lake Huron object remains officially unidentified three years later.",
    left: {
      name: "Chinese Surveillance Balloon (Feb 4, 2023)",
      facts: [
        { label: "Date", value: "February 4, 2023" },
        { label: "Location", value: "Off South Carolina coast, Atlantic Ocean" },
        { label: "Engaging aircraft", value: "USAF F-22 Raptor (1st Fighter Wing)" },
        { label: "Weapon", value: "AIM-9X Sidewinder air-to-air missile" },
        { label: "Object altitude at engagement", value: "~60,000 feet" },
        { label: "Object size", value: "~200 feet diameter envelope" },
        { label: "AARO / official attribution", value: "RESOLVED — PRC surveillance platform" },
        { label: "Debris recovered", value: "Yes — extensive recovery off South Carolina coast" },
        { label: "In PURSUE catalog", value: "No (released via standard DoD channels)" },
      ],
      links: [
        { href: "/wiki/february-2023-high-altitude-object-shootdowns", label: "Full Feb 2023 timeline" },
      ],
    },
    right: {
      name: "Lake Huron Object (Feb 12, 2023)",
      facts: [
        { label: "Date", value: "February 12, 2023" },
        { label: "Location", value: "Over Lake Huron, USNORTHCOM AOR" },
        { label: "Engaging aircraft", value: "USAF Air National Guard F-16C" },
        { label: "Weapon", value: "AIM-9X Sidewinder air-to-air missile" },
        { label: "Object altitude at engagement", value: "~20,000 feet" },
        { label: "Object size", value: "Smaller — 'cylindrical' per public DoD characterization" },
        { label: "AARO / official attribution", value: "UNRESOLVED — origin not publicly identified" },
        { label: "Debris recovered", value: "Limited — engaged over open water" },
        { label: "In PURSUE catalog", value: "Yes — DOW-UAP-PR071 (declassified 2026-05-22)" },
      ],
      links: [
        { href: "/q/f16-shot-down-ufo-lake-huron-2023", label: "Lake Huron FAQ" },
        { href: "/wiki/f-16-lake-huron-2023-incident", label: "Lake Huron wiki" },
      ],
    },
    sections: [
      {
        heading: "What's the same",
        body:
          "Both engagements occurred within nine days under USNORTHCOM and NORAD command and control. Both used the AIM-9X Sidewinder as the engagement weapon. Both were captured on gun-camera infrared sensors mounted on USAF tactical aircraft. Both were publicly acknowledged in real time by senior U.S. officials including then-President Biden. Both produced declassified imagery that was eventually released to the public — though through different release pathways (DoD press channels for the balloon; PURSUE Release 02 three years later for Lake Huron).",
      },
      {
        heading: "What's different",
        body:
          "The Chinese balloon was attributed to a known foreign-state surveillance platform within 48 hours via a combination of visual identification, AN/APG-77 radar signature, ground-based weather radar tracking from the platform's transit across the continental United States, and post-recovery debris analysis. The Lake Huron object remains unattributed three years later — AARO has not publicly identified the object's origin, propulsion mechanism, or platform class. The Lake Huron clip's AARO description ('a kinetic interaction between two distinct areas of contrast, with the initial subject of the footage fragmenting in a radial displacement pattern that suggests a high-energy event') is unusually descriptive for a still-unidentified object.",
      },
      {
        heading: "Why the three-year declassification delay on Lake Huron",
        body:
          "The Lake Huron clip was uploaded to a classified network in February 2023 — the same month the engagement occurred — but was not declassified for public release until May 22, 2026, more than three years later. The most-likely factors in the holdback are the AIM-9X Sidewinder engagement geometry (which would reveal precise capability parameters of the F-16C weapons system) and the fact that the underlying object remains unidentified (creating analytical sensitivity around what the gun-camera footage's 'fragmenting in a radial displacement pattern' actually shows). The Chinese balloon clip had no equivalent classification sensitivity — the platform was attributed, the engagement was conventional, and the public-affairs framing was settled within days.",
      },
    ],
    keywords: ["Lake Huron 2023", "Chinese balloon 2023", "February 2023 shootdowns", "DOW-UAP-PR071", "AIM-9X Sidewinder", "Biden UFO"],
    related: ["f16-shot-down-ufo-lake-huron-2023", "f-16-lake-huron-2023-incident", "february-2023-high-altitude-object-shootdowns"],
    sources: [
      { label: "UAP.WATCH — DOW-UAP-PR071", url: "https://uap-watch-flame.vercel.app/video/vid-070" },
      { label: "DVIDS — DOW-UAP-PR071 source clip", url: "https://www.dvidshub.net/video/1007727" },
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  }
];

export const compareBySlug: Record<string, CompareEntry> = Object.fromEntries(
  compareEntries.map((c) => [c.slug, c]),
);
