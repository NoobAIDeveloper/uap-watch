// US state pages — pSEO targeting "UFO sightings in [state]" head terms.
// Each entry is a real, citable summary of the state's UAP record:
// PURSUE Release 01 entries that map to the state, plus famous historical
// sightings outside the federal catalog. Where a state has no direct PURSUE
// coverage we say so — never fabricate.

export type StateEntry = {
  slug: string;
  name: string;
  abbr: string;
  // 134-167 word lead — the citable passage.
  lead: string;
  pullQuote?: string;
  // Direct hits in the PURSUE catalog (incident IDs).
  pursueIncidents: string[];
  // Famous sightings outside PURSUE.
  historicalSightings: { title: string; year: string; description: string }[];
  sources: { label: string; url: string }[];
};

export const stateEntries: StateEntry[] = [
  {
    slug: "california",
    name: "California",
    abbr: "CA",
    lead:
      "California leads the United States in total reported UFO sightings — the National UFO Reporting Center (NUFORC) catalogues more reports from California than any other state, a function of population density, military airspace from Edwards AFB through China Lake, and a long civilian-aviation history along the Pacific coast. The Pentagon's PURSUE Release 01 (2026-05-08) does not include any incidents geolocated specifically to California, but Western US-region entries — including the 2023 \"Eye of Sauron\" federal-agent encounter and the 2023 \"blacker than black\" Prius-sized object that shot upward faster than known drones — are reported from undisclosed Western US locations that may include parts of California. Historically, California is the state of the 1942 Battle of Los Angeles air-defense incident, the 1953 Coast Guard photographs from Salem (Oregon coast adjacent), and the 1990s Edwards AFB high-altitude cases.",
    pullQuote:
      "California leads the United States in total reported UFO sightings.",
    pursueIncidents: [],
    historicalSightings: [
      {
        title: "Battle of Los Angeles",
        year: "1942",
        description:
          "U.S. Army anti-aircraft batteries fired 1,440 rounds of 12.8-pound shells at unidentified objects over Los Angeles on the night of February 24-25, 1942. Six civilians died from heart attacks and falling shrapnel. The official explanation was war nerves and weather balloons; the photograph in the Los Angeles Times remains famous.",
      },
      {
        title: "Edwards AFB encounters",
        year: "various",
        description:
          "Multiple unconfirmed reports of high-altitude objects over Edwards Air Force Base in the Mojave from the 1950s through 2000s. None included in PURSUE Release 01, but referenced in earlier UFO program documentation.",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "NUFORC", url: "https://nuforc.org/" },
    ],
  },
  {
    slug: "nevada",
    name: "Nevada",
    abbr: "NV",
    lead:
      "Nevada is the U.S. state most associated with UFO mythology — a function of Area 51 (Groom Lake), the Nellis Test and Training Range, and the broader \"Extraterrestrial Highway\" along Nevada State Route 375. The Pentagon's PURSUE Release 01 does not contain any incidents publicly geolocated to Nevada, but the All-domain Anomaly Resolution Office (AARO) has historically rated multiple Nellis-range encounters worth investigation. The 1989 Bob Lazar claims about reverse-engineering programs at \"S-4\" near Papoose Lake remain unverified by any government source. AARO's 2024 Historical Record Report stated it found \"no empirical evidence\" for the alleged classified retrieval program at any Nevada facility. Nevada's broader UAP record is dominated by civilian reports along US-95 and US-93, military test-range sensor anomalies, and confusion between actual classified aircraft (F-117, B-2, RQ-170) and UAP.",
    pullQuote:
      "AARO found no empirical evidence for the alleged Nevada retrieval program.",
    pursueIncidents: [],
    historicalSightings: [
      {
        title: "Bob Lazar / S-4 claims",
        year: "1989",
        description:
          "Engineer Bob Lazar publicly claimed to have worked on reverse-engineering recovered alien craft at \"Sector 4\" (S-4) near Papoose Lake, south of Area 51. No U.S. government source has corroborated the claim; AARO's 2024 Historical Record Report explicitly addressed and rejected the underlying narrative.",
      },
      {
        title: "Area 51 / Groom Lake",
        year: "1955–present",
        description:
          "Area 51 was a classified test facility from 1955 onward; the U.S. government did not officially acknowledge its existence until 2013. The facility has hosted U-2, A-12, F-117, and other classified aircraft programs. The conflation of classified aircraft testing with UFO activity is a documented source of confusion in the AARO Historical Record.",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "AARO Historical Record Report (2024)", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "arizona",
    name: "Arizona",
    abbr: "AZ",
    lead:
      "Arizona is the state of the Phoenix Lights — the largest mass UFO sighting in modern U.S. history. On the night of March 13, 1997, thousands of witnesses across Arizona observed two distinct phenomena: a slow-moving, V-shaped or \"carpenter's-square\"-shaped formation of lights drifting south from Nevada toward Tucson, and a separate set of stationary hovering lights over Phoenix several hours later. The U.S. Air Force later attributed the second set of stationary lights to A-10 Warthog flare drops over the Barry M. Goldwater Range during a training exercise. The earlier moving formation has never been definitively identified. Then-Governor Fife Symington publicly mocked the sightings at the time, then in 2007 acknowledged he had personally seen the formation and described it as \"otherworldly.\" The Phoenix Lights are not part of PURSUE Release 01 but are routinely cited as the highest-witness-count modern U.S. UFO event.",
    pullQuote:
      "I saw a craft of unknown origin… it was definitely not man-made.",
    pursueIncidents: [],
    historicalSightings: [
      {
        title: "Phoenix Lights",
        year: "1997",
        description:
          "The 1997 Phoenix Lights remain the highest-witness-count UFO event in U.S. history, with thousands of witnesses across Arizona on the night of March 13. The Air Force attributed the second set of stationary lights to A-10 flares; the earlier moving V-formation has never been officially identified.",
      },
      {
        title: "Tucson UAP reports",
        year: "ongoing",
        description:
          "Davis-Monthan AFB and the broader Tucson basin generate recurring civilian UAP reports, often correlated with classified aircraft test flights from nearby ranges.",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "Arizona Republic — Phoenix Lights archive", url: "https://www.azcentral.com/" },
    ],
  },
  {
    slug: "new-mexico",
    name: "New Mexico",
    abbr: "NM",
    lead:
      "New Mexico is the state of the 1947 Roswell incident — the most-cited UFO event in U.S. history and the originating event in the modern UFO record. On 8 July 1947, the FBI Dallas field office sent a memorandum to FBI Director J. Edgar Hoover describing a recovered \"hexagonal object suspended from a 20-foot balloon by cable.\" The memo, now declassified and released in PURSUE Release 01 as DOC-001 (PURSUE-001), describes the object as \"bronze, metallic, of ellipsoid form, between 130 and 195 feet in apparent dimension.\" The U.S. Air Force officially attributed the Roswell debris to Project Mogul, a classified high-altitude balloon program for detecting Soviet nuclear tests. New Mexico also hosts White Sands Missile Range, Holloman AFB, and Kirtland AFB — three facilities with extensive Cold War-era UAP investigation history including the 1948 \"Green Fireballs\" investigation centered at Los Alamos.",
    pullQuote:
      "Hexagonal object suspended from a 20-foot balloon by cable.",
    pursueIncidents: ["PURSUE-001"],
    historicalSightings: [
      {
        title: "Roswell crash debris",
        year: "1947",
        description:
          "FBI Dallas field office memo to Director Hoover, dated 8 July 1947, describes recovered hexagonal object near Roswell. Released to the public via the FBI Vault and now in PURSUE Release 01 as DOC-001. Air Force attribution: Project Mogul balloon train.",
      },
      {
        title: "Green Fireballs",
        year: "1948–1952",
        description:
          "Recurring green-colored fireball sightings over northern New Mexico (Los Alamos, Sandia) prompted Project Twinkle. Atmospheric physicist Lincoln La Paz led a formal investigation; cause never definitively identified, official conclusion attributed most cases to unusual meteors.",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "FBI Vault", url: "https://vault.fbi.gov/UFO" },
    ],
  },
  {
    slug: "texas",
    name: "Texas",
    abbr: "TX",
    lead:
      "Texas is the state of the 2008 Stephenville UFO incident, one of the most well-documented modern civilian sightings on the U.S. record. On the evening of 8 January 2008, dozens of witnesses across Erath County (centered on Stephenville) reported a large bright object with rapidly-changing lights moving silently at high speed; FAA radar later confirmed the presence of an unidentified object with no transponder traveling toward the Bush ranch in Crawford. The U.S. Air Force initially denied any military activity in the area, then revised the statement two weeks later to confirm 10 F-16s from the 457th Fighter Squadron had been on a training exercise. The object's identity remains formally unresolved. Texas is also home to the Dyess AFB (Abilene) and Sheppard AFB (Wichita Falls) ranges, both of which generate recurring civilian sighting reports correlated with classified-aircraft testing.",
    pullQuote: "An unidentified object traveling at high speed with no transponder.",
    pursueIncidents: [],
    historicalSightings: [
      {
        title: "Stephenville UFO",
        year: "2008",
        description:
          "Multiple-witness sighting of a large bright object over Erath County on January 8, 2008. FAA radar tracking confirmed an unidentified object; USAF revised initial denial to confirm F-16 training activity. Identity of original object remains formally unresolved.",
      },
      {
        title: "Aurora airship crash",
        year: "1897",
        description:
          "Apocryphal 19th-century report from Aurora, Texas of an \"airship\" crashing on a windmill, with a deceased \"alien pilot\" allegedly buried in the local cemetery. Unverified; included in popular UFO catalogs but not in any government record.",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "MUFON Stephenville case file", url: "https://mufon.com/" },
    ],
  },
  {
    slug: "florida",
    name: "Florida",
    abbr: "FL",
    lead:
      "Florida sits at the geographic intersection of two heavily-investigated UAP regions: the Atlantic-coast Navy operating areas off Jacksonville and Cape Canaveral (where multiple GIMBAL/GOFAST-era F/A-18 encounters occurred prior to formal declassification), and the Caribbean drug-interdiction airspace patrolled by the U.S. Coast Guard and Customs and Border Protection. While PURSUE Release 01 does not include any incidents geolocated specifically to Florida, the broader USS Theodore Roosevelt operating area off the East Coast is the source of the 2017 GOFAST clip (resolved by AARO in 2026 as a parallax artifact at ~13,000 feet altitude). Florida is also home to NASA's Kennedy Space Center, Cape Canaveral SFS, MacDill AFB (USCENTCOM HQ), and the 1979 Gulf Breeze photographs — a recurring Florida UAP photographic case in the 1980s widely debated as either a hoax or a genuine sighting.",
    pursueIncidents: [],
    historicalSightings: [
      {
        title: "Gulf Breeze photographs",
        year: "1987–1988",
        description:
          "Series of photographs taken by Ed Walters in Gulf Breeze, Florida, showing a disc-shaped object near rooftops. The case generated extensive debate; later analysis by skeptics found a model UFO matching the photographs in a house Walters had previously occupied. Inconclusive but widely-cited civilian case.",
      },
      {
        title: "USS Theodore Roosevelt East Coast operating area",
        year: "2014–2015",
        description:
          "Multiple GIMBAL/GOFAST-era F/A-18 ATFLIR encounters occurred in the Atlantic Test and Evaluation Range off Florida and Virginia. The 2017 GOFAST clip is the marquee case, resolved by AARO in 2026.",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "washington",
    name: "Washington",
    abbr: "WA",
    lead:
      "Washington state is where the modern UFO era began. On 24 June 1947, civilian pilot Kenneth Arnold reported nine \"saucer-like\" objects flying in formation near Mount Rainier at an estimated 1,200 mph. Arnold's description of the objects as moving \"like a saucer would if you skipped it across the water\" gave the press the term \"flying saucer\" — and the modern UFO discourse begins with this report. The Arnold sighting is not in PURSUE Release 01 but is the foundational event referenced in the December 1947 Wright Field AMC memorandum (PURSUE-023), which acknowledged \"continued and recent reports from qualified observers.\" Washington also hosts the Maury Island incident of 21 June 1947 (three days before Arnold) — a contested case later largely attributed to a hoax. Modern Washington UAP reports cluster near Joint Base Lewis-McChord and the Olympic Peninsula.",
    pullQuote:
      "Like a saucer would if you skipped it across the water.",
    pursueIncidents: [],
    historicalSightings: [
      {
        title: "Kenneth Arnold sighting",
        year: "1947",
        description:
          "Civilian pilot Kenneth Arnold's June 24, 1947 sighting of nine saucer-like objects near Mount Rainier coined the term \"flying saucer\" and is considered the founding event of the modern UFO era. Predates the Roswell incident by two weeks.",
      },
      {
        title: "Maury Island incident",
        year: "1947",
        description:
          "Three days before the Arnold sighting, harbormaster Harold Dahl reported six donut-shaped objects over Maury Island in Puget Sound. Two FBI investigators died investigating the case in a B-25 crash. Most-cited 1947 case after Roswell and Arnold; later contested as a hoax.",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "oregon",
    name: "Oregon",
    abbr: "OR",
    lead:
      "Oregon is the state of the McMinnville UFO photographs — the most analyzed civilian UFO photographs of the 20th century. On 11 May 1950, Paul and Evelyn Trent photographed a disc-shaped object hovering near their farm in McMinnville. The two original photographs were published in Life magazine the next month and became the canonical reference images for the disc-shape UFO category. The U.S. Air Force-commissioned Condon Report in 1968 examined the McMinnville photographs and concluded they showed \"an extraordinary flying object… which appears to have been silvery, metallic, disk-shaped, tens of meters in diameter, and evidently artificial.\" PURSUE Release 01 does not include the McMinnville photographs. Oregon's modern UAP record clusters around Klamath Falls, the Cascade Range, and offshore Coast Guard reports along the northern California-Oregon border.",
    pullQuote:
      "An extraordinary flying object… disk-shaped, tens of meters in diameter, and evidently artificial.",
    pursueIncidents: [],
    historicalSightings: [
      {
        title: "McMinnville UFO photographs",
        year: "1950",
        description:
          "Paul and Evelyn Trent's two photographs from McMinnville, Oregon on May 11, 1950 are among the most-analyzed civilian UFO photographs in history. The 1968 Condon Report — the U.S. Air Force-commissioned scientific study — concluded the photographs showed \"an extraordinary flying object… evidently artificial.\"",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "Condon Report (1968)", url: "https://www.archive.org/details/scientificstudyo00unse" },
    ],
  },
  {
    slug: "idaho",
    name: "Idaho",
    abbr: "ID",
    lead:
      "Idaho appears in the Pentagon's PURSUE Release 01 catalog through a 1950 FBI regional office memorandum (DOC-014, PURSUE-010) in which the Idaho FBI office expressed formal concern that unexplained UFO sightings could cause \"hysteria, or panic\" among the public. The memo is one of the earliest known instances of the FBI formally acknowledging UFO reports as a public-safety consideration rather than a fringe topic. Idaho's broader UAP record is shaped by its proximity to the Mountain Home Air Force Base, the Idaho National Laboratory (formerly the Idaho Engineering Lab — a nuclear research facility with a long history of unexplained sightings), and the open desert ranges of the Snake River Plain. Multiple PURSUE \"Western US (undisclosed)\" entries from 2023-2025 plausibly include Idaho locations.",
    pullQuote: "Hysteria, or panic.",
    pursueIncidents: ["PURSUE-010"],
    historicalSightings: [
      {
        title: "Idaho FBI memo",
        year: "1950",
        description:
          "Idaho regional FBI office memo expressed concern that unexplained sightings could cause \"hysteria, or panic\" among the population. Released with redactions in PURSUE Release 01 as DOC-014.",
      },
      {
        title: "Idaho National Laboratory anomalies",
        year: "various",
        description:
          "Multiple unconfirmed UAP reports near the Idaho National Laboratory and the Snake River Plain test ranges. None individually in PURSUE, but referenced in broader AARO documentation.",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
    ],
  },
  {
    slug: "ohio",
    name: "Ohio",
    abbr: "OH",
    lead:
      "Ohio is the institutional center of U.S. government UFO investigation. Wright Field (now Wright-Patterson Air Force Base) outside Dayton was the headquarters of the U.S. Air Force Air Material Command in 1947 and is the originating location of the December 1947 AMC memorandum (PURSUE-023) which formally acknowledged that \"continued and recent reports from qualified observers concerning this phenomenon still makes this matter one of concern to Headquarters, Air Material Command.\" That memo is the predecessor document to Project SIGN (1948), Project GRUDGE (1949–1952), and Project Blue Book (1952–1969). Wright-Patterson AFB allegedly hosted recovered material from Roswell and other crash retrievals — claims that are persistent in UFO mythology but not corroborated by any declassified U.S. government source. AARO's 2024 Historical Record Report explicitly addressed and found no empirical evidence for the alleged Wright-Patterson retrieval program.",
    pullQuote:
      "Continued and recent reports from qualified observers concerning this phenomenon still makes this matter one of concern.",
    pursueIncidents: ["PURSUE-023"],
    historicalSightings: [
      {
        title: "Wright Field AMC memorandum",
        year: "1947",
        description:
          "December 1947 Air Material Command memorandum from Wright Field, Ohio, formally acknowledging continued UFO reports as a matter of HQ concern. Predecessor document to Project SIGN. Released in PURSUE Release 01 as PURSUE-023.",
      },
      {
        title: "Project Blue Book",
        year: "1952–1969",
        description:
          "U.S. Air Force investigation of UFO reports headquartered at Wright-Patterson AFB. Catalogued 12,618 cases over 17 years; 701 cases (5.6%) classified as \"unidentified\" at termination. Successor to Project SIGN and Project GRUDGE.",
      },
    ],
    sources: [
      { label: "war.gov/UFO/", url: "https://www.war.gov/UFO/" },
      { label: "Project Blue Book archive (NARA)", url: "https://www.archives.gov/research/military/air-force/ufos" },
    ],
  },
];

export const stateBySlug: Record<string, StateEntry> = Object.fromEntries(
  stateEntries.map((s) => [s.slug, s]),
);
