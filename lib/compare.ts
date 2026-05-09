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
];

export const compareBySlug: Record<string, CompareEntry> = Object.fromEntries(
  compareEntries.map((c) => [c.slug, c]),
);
