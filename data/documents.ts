import type { GovDocument } from "@/lib/types";

export const documents: GovDocument[] = [
  // note: original seed entry — not a row in the canonical PURSUE CSV.
  // Kept as illustrative "synthetic memo" content; sourceUrl points at the
  // landing page rather than a specific PDF.
  {
    id: "DOC-001",
    title: "FBI DALLAS FIELD MEMO — OBJECT RECOVERY",
    source: "FBI",
    date: "1947-07-08",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `MEMORANDUM
TO: DIRECTOR, FEDERAL BUREAU OF INVESTIGATION
FROM: DALLAS FIELD OFFICE
DATE: 08 JULY 1947

SUBJECT: OBJECT RECOVERED IN VICINITY OF [[REDACT:LOCATION]]

1. AT APPROXIMATELY [[REDACT:TIME]] HOURS LOCAL, [[REDACT:UNIT]] PERSONNEL RECOVERED A HEXAGONAL OBJECT IN THE VICINITY OF [[REDACT:LOCATION]]. OBJECT WAS SUSPENDED FROM A 20-FOOT BALLOON BY CABLE.

2. WITNESS [[REDACT:NAME]] PROVIDED EYEWITNESS SKETCH. OBJECT DESCRIBED AS BRONZE, METALLIC, OF ELLIPSOID FORM, BETWEEN 130 AND 195 FEET IN APPARENT DIMENSION.

3. NO RADIOACTIVITY DETECTED. RECOMMEND IMMEDIATE FORWARDING TO [[REDACT:AGENCY]] FOR TECHNICAL EXAMINATION.

4. [[REDACT:PARAGRAPH]]

5. PUBLIC AFFAIRS POSTURE: STANDARD WEATHER BALLOON ATTRIBUTION RECOMMENDED PENDING FURTHER REVIEW.

END MEMORANDUM`,
    sourceUrl: "https://www.war.gov/UFO/",
    incidentIds: ["PURSUE-001"],
  },
  {
    id: "DOC-002",
    title: "DOW-UAP-D14 — USCENTCOM MISREP // IRAQ // MAY 2022",
    source: "USAF",
    date: "2022-05-15",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `SECRET//REL TO USA, FVEY
MISREP undefined-7561279 NARRATIVE

ORIGINATOR: [[REDACT:UNIT]], OPERATING FROM SIGONELLA AB
MISSION: ISR // OPERATION INHERENT RESOLVE
DATE: 15 MAY 2022
DECLAS BY: MAJOR GENERAL RICHARD A. HARRISON, USCENTCOM CHIEF OF STAFF, 07 OCT 2025

1. (S//REL) AT 1514Z, [[REDACT:CALLSIGN]] OBSERVED 1X UAP (SEE OBSERVATION 1).

2. (S//REL) OBSERVATION 1: [[REDACT:PARAGRAPH]]

3. (S//REL) AIRCRAFT POSITION AT TIME OF CONTACT: [[REDACT:COORDINATES]]. ALTITUDE [[REDACT:CLASSIFICATION]]. SENSOR: [[REDACT:CLASSIFICATION]].

4. (S//REL) UAP CHARACTERISTICS: SMALL, [[REDACT:PARAGRAPH]]. NO RF EMISSIONS DETECTED. NO TRANSPONDER. CORRELATION WITH SCHEDULED AIR ACTIVITY: NEGATIVE.

5. (S//REL) AIRCREW ASSESSMENT: ANOMALOUS. RECOMMEND ROUTING TO AARO PER DEPSECDEF MEMO 14 SEP 2024.

6. (U) [[REDACT:PARAGRAPH]]

END NARRATIVE`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d14-mission-report-iraq-may-2022.pdf",
    incidentIds: ["PURSUE-012", "PURSUE-015"],
    pageCount: 6,
  },
  {
    id: "DOC-003",
    title: "DOW-UAP-D54 — MISSION REPORT // MEDITERRANEAN SEA",
    source: "USN",
    date: "2024-01-01",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `SECRET//REL TO USA, FVEY
MISSION REPORT — MEDITERRANEAN SEA AOR

ORIGINATOR: [[REDACT:UNIT]]
DATE: [[REDACT:TIME]] 2024
DECLAS BY: [[REDACT:NAME]]

1. (S) DURING [[REDACT:OPERATION]] TRANSIT, AIRCREW VISUALLY ACQUIRED 1X UAP AT FLIGHT LEVEL 250 (25,000 FT MSL).

2. (S) OBJECT DESCRIBED BY PILOT AS "TRIANGULAR AND METALLIC". ESTIMATED RANGE [[REDACT:PARAGRAPH]].

3. (S) NO ASSOCIATED RADAR RETURN. NO IFF. NO TRACK FILE. CONTACT DURATION [[REDACT:TIME]].

4. (S) SECONDARY OBSERVER [[REDACT:NAME]] CORROBORATED VISUAL.

5. (U) AIRCREW ASSESSMENT: UAP // UNRESOLVED. RECOMMEND ROUTING TO ALL-DOMAIN ANOMALY RESOLUTION OFFICE.

6. (S) [[REDACT:PARAGRAPH]]

END REPORT`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d54-mission-report-mediterranean-sea-na.pdf",
    incidentIds: ["PURSUE-009"],
  },
  {
    id: "DOC-004",
    title: "DOS-UAP-D2 — DIPLOMATIC CABLE // U.S. EMBASSY DUSHANBE // JANUARY 1994",
    source: "STATE",
    date: "1994-01-15",
    classification: "CONFIDENTIAL//DECLASSIFIED",
    redacted: true,
    body: `CONFIDENTIAL
DEPARTMENT OF STATE — INCOMING TELEGRAM
FROM: AMEMBASSY [[REDACT:LOCATION]]
TO: SECSTATE WASHDC
SUBJECT: REPORTED ANOMALOUS PHENOMENON OBSERVED BY COMMERCIAL AIRCREW

1. (C) ON [[REDACT:TIME]] JANUARY 1994, A PANAM B-747 OPERATING ON A SCHEDULED ROUTE OBSERVED AT FL410 A BRIGHT LIGHT OF ENORMOUS INTENSITY APPROACHING FROM THE EAST AT GREAT SPEED.

2. (C) PER CAPTAIN [[REDACT:NAME]], THE OBJECT EXECUTED "CIRCLES, CORKSCREWS, AND 90-DEGREE TURNS AT RAPID RATES OF SPEED AND UNDER VERY HIGH G's". DURATION OF OBSERVATION [[REDACT:TIME]].

3. (C) AIRCREW ASSESSMENT TO POST: OBJECT WAS "EXTRATERRESTRIAL AND UNDER INTELLIGENT CONTROL".

4. (C) POST POSITION: WE HAVE NO OPINION AND REPORT THE ABOVE FOR WHAT IT MAY BE WORTH.

5. (C) [[REDACT:PARAGRAPH]]

6. (U) PLEASE PROTECT IDENTITY OF SOURCE. END CABLE.`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dos-uap-d2-cable-2-kazakhstan-january-1994.pdf",
    incidentIds: ["PURSUE-004", "PURSUE-011"],
  },
  {
    id: "DOC-005",
    title: "NASA APOLLO 17 — LUNAR PHOTOGRAPHIC ANOMALY ADDENDUM",
    source: "NASA",
    date: "1972-12-11",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DEPARTMENT OF WAR — UAP CASE FILE ADDENDUM
ASSOCIATED MISSION: APOLLO 17 (TAURUS-LITTROW)
PHOTO: AS17-[[REDACT:PARAGRAPH]]
CASE OPENED: 08 MAY 2026

1. SUBJECT IMAGE, RECORDED 11 DECEMBER 1972, DEPICTS THREE "DOTS" IN A TRIANGULAR FORMATION IN THE LOWER RIGHT QUADRANT OF THE LUNAR SKY, CLEARLY VISIBLE UPON MAGNIFICATION OF THE IMAGE.

2. LUNAR MODULE PILOT HARRISON H. "JACK" SCHMITT REPORTED A FLASH ON THE LUNAR SURFACE NORTH OF GRIMALDI CRATER. CREW TRANSCRIPT EXCERPT: "IT LOOKS LIKE THE FOURTH OF JULY OUT OF RON'S WINDOW"; "THERE'S A WHOLE BUNCH OF BIG ONES ON MY WINDOW DOWN THERE — JUST BRIGHT"; "THEY'RE VERY JAGGED, ANGULAR FRAGMENTS THAT ARE TUMBLING".

3. PRELIMINARY US GOVERNMENT ANALYSIS SUGGESTS THE IMAGE FEATURE IS POTENTIALLY THE RESULT OF A PHYSICAL OBJECT.

4. THERE IS NO CONSENSUS ABOUT THE NATURE OF THE ANOMALY. CASE REMAINS OPEN UNDER PURSUE FOR FURTHER ANALYSIS.

END ADDENDUM`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-d2-apollo-17-transcript-1972.pdf",
    incidentIds: ["PURSUE-003"],
  },
  // note: original seed entry — not a row in the canonical PURSUE CSV.
  // Period-flavored synthetic memo; sourceUrl points at the landing page.
  {
    id: "DOC-006",
    title: "FBI MEMO — IDAHO FIELD OFFICE // PUBLIC ORDER CONCERNS",
    source: "FBI",
    date: "1950-04-01",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `MEMORANDUM
FROM: SAC, [[REDACT:LOCATION]] (IDAHO)
TO: DIRECTOR, FBI
SUBJECT: UNEXPLAINED AERIAL OBJECTS — PUBLIC ORDER CONSIDERATIONS

1. THIS OFFICE WISHES TO ADVISE THE BUREAU OF INCREASING CIVILIAN REPORTS OF UNEXPLAINED AERIAL OBJECTS WITHIN THE [[REDACT:LOCATION]] AREA OF RESPONSIBILITY.

2. THIS OFFICE BELIEVES THAT THE CONTINUED APPEARANCE OF SUCH OBJECTS WITHOUT OFFICIAL EXPLANATION MAY RESULT IN HYSTERIA, OR PANIC, AMONG THE LOCAL POPULATION.

3. RECOMMENDATION: COORDINATE WITH [[REDACT:AGENCY]] AND [[REDACT:UNIT]] TO DEVELOP A UNIFIED PUBLIC POSTURE.

4. WITNESS [[REDACT:NAME]] DESCRIBED THE OBJECT AS [[REDACT:PARAGRAPH]].

5. [[REDACT:PARAGRAPH]]

END MEMORANDUM`,
    sourceUrl: "https://www.war.gov/UFO/",
    incidentIds: ["PURSUE-010"],
  },
  {
    id: "DOC-007",
    title: "AARO ASSESSMENT — WESTERN US ORB EVENTS // 2-DAY MULTI-WITNESS ENCOUNTER",
    source: "DOD",
    date: "2023-09-15",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `ALL-DOMAIN ANOMALY RESOLUTION OFFICE
ASSESSMENT // PURSUE RELEASE 01
SUBJECT: WESTERN U.S. EVENT — FEDERAL WITNESS CLUSTER

1. OVER A TWO-DAY PERIOD IN [[REDACT:TIME]] 2023, MULTIPLE TEAMS OF [[REDACT:UNIT]] FEDERAL LAW ENFORCEMENT PERSONNEL OBSERVED ANOMALOUS PHENOMENA AT [[REDACT:LOCATION]] FROM VARYING VANTAGE POINTS.

2. PRIMARY DESCRIPTION (AGENT [[REDACT:NAME]]): "ORB SIMILAR TO THE EYE OF SAURON FROM LORD OF THE RINGS, EXCEPT WITHOUT THE PUPIL, OR MAYBE AN ORANGE STORM ELECTRIFY BOWLING BALL".

3. SECONDARY DESCRIPTION: ORANGE ORBS EMITTED SMALLER RED ORBS IN GROUPS OF TWO TO FOUR.

4. ASSOCIATED OBSERVATION: A "BLACKER THAN BLACK" OBJECT, APPROXIMATELY THE SIZE OF A PRIUS, TILTED 45 DEGREES, SHOT UPWARD AT A RATE FASTER THAN ANY KNOWN UNMANNED AIRCRAFT, AND EMITTED RED AND BLUE LIGHT. CLOSEST APPROACH ESTIMATED 40-60 METERS FROM WITNESS.

5. AARO ASSESSMENT: AMONG THE MOST COMPELLING CASES IN CURRENT HOLDINGS DUE TO WITNESS CREDIBILITY AND CORROBORATION ACROSS MULTIPLE TEAMS.

6. [[REDACT:PARAGRAPH]]

END ASSESSMENT`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/western_us_event_slides_5.08.2026.pdf",
    incidentIds: ["PURSUE-005", "PURSUE-019", "PURSUE-021"],
  },
  // note: original seed entry — not a row in the canonical PURSUE CSV.
  // Period-flavored synthetic memo; sourceUrl points at the landing page.
  {
    id: "DOC-008",
    title: "AMC MEMORANDUM — RECURRING DISC REPORTS // DECEMBER 1947",
    source: "USAF",
    date: "1947-12-01",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `HEADQUARTERS, AIR MATERIAL COMMAND
WRIGHT FIELD, DAYTON, OHIO
DATE: [[REDACT:TIME]] DECEMBER 1947

SUBJECT: FLYING DISCS

1. THIS COMMAND HAS RECEIVED, AND CONTINUES TO RECEIVE, REPORTS FROM QUALIFIED OBSERVERS DESCRIBING UNCONVENTIONAL AERIAL OBJECTS OF DISC OR ELLIPSOID FORM.

2. CONTINUED AND RECENT REPORTS FROM QUALIFIED OBSERVERS CONCERNING THIS PHENOMENON STILL MAKES THIS MATTER ONE OF CONCERN TO HEADQUARTERS, AIR MATERIAL COMMAND.

3. RECOMMEND ESTABLISHMENT OF A FORMAL INVESTIGATIVE PROJECT, CODENAME [[REDACT:OPERATION]], REPORTING DIRECTLY TO THIS COMMAND.

4. WITNESS POOL INCLUDES [[REDACT:UNIT]] PILOTS, AIR TRAFFIC CONTROLLERS, AND [[REDACT:NAME]].

5. [[REDACT:PARAGRAPH]]

END MEMO`,
    sourceUrl: "https://www.war.gov/UFO/",
    incidentIds: ["PURSUE-023", "PURSUE-024"],
  },
  {
    id: "DOC-009",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 10",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_10
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_10.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-010",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 2",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_2
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_2.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-011",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 3",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_3
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_3.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-012",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 4",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_4
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_4.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-013",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 5",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_5
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_5.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-014",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 6",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_6
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_6.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-015",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 7",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_7
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_7.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-016",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 9",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_9
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_9.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-017",
    title: "65 HS1-834228961 62-HQ-83894 SERIAL 130",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Serial_130
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_serial_130.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-018",
    title: "65 HS1-834228961 62-HQ-83894 SERIAL 153",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Serial_153
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-8342289+M5+M11",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-019",
    title: "65 HS1-834228961 62-HQ-83894 SERIAL 164",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Serial_164
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_serial_164.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-020",
    title: "65 HS1-834228961 62-HQ-83894 SERIAL 220",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Serial_220
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_serial_220.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-021",
    title: "65 HS1-834228961 62-HQ-83894 SERIAL 403",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Serial_403
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_serial_403.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-022",
    title: "65 HS1-834228961 62-HQ-83894 SERIAL 438",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Serial_438
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_serial_438.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-023",
    title: "65 HS1-834228961 62-HQ-83894 SERIAL 449",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Serial_449
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_serial_449.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-024",
    title: "65 HS1-834228961 62-HQ-83894 SUB A",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_SUB_A
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_sub_a.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-025",
    title: "18 100754 GENERAL 1946-7 VOL 2",
    source: "DOD",
    date: "1947-12-30",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 18_100754_ General 1946-7_Vol_2
SOURCE: Department of War
DATE: 12/30/47
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This file contains memorandums and correspondence related to flying disc/saucer sightings and that those are a matter of concern for the Air Materiel Command.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/18_100754_ general 1946-7_vol_2.pdf",
    incidentIds: ["PURSUE-023", "PURSUE-024"],
  },
  {
    id: "DOC-026",
    title: "18 6369445 GENERAL 1948 VOL 1",
    source: "DOD",
    date: "1948-06-15",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 18_6369445_General_1948_Vol_1
SOURCE: Department of War
DATE: 6/15/48
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This file contains memorandums, correspondence, and forms related to the reporting of information on flying discs and investigations into sightings.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/18_6369445_general_1948_vol_1.pdf",
    incidentIds: ["PURSUE-023", "PURSUE-024"],
  },
  {
    id: "DOC-027",
    title: "255 413270 UFO'S AND DEFENSE WHAT SHOULD WE PREPARE FOR",
    source: "NASA",
    date: "",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: 255_413270_UFO's_and_Defense_What_Should_we_Prepare_For
SOURCE: NASA
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This file contains an independent report on UFOs written by the French association COMETA (previously published in the French magazine VDS in 1999), which details the results of a study by the Institute of Higher Studies for National Defence. The file also includes a letter from Carol Rosin in which she notes that she was spokesperson for von Braun during the last years of his life.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/255_413270_ufo's_and_defense_what_should_we_prepare_for.pdf",
  },
  {
    id: "DOC-028",
    title: "255 T 763 R1B TRANSCRIPTS",
    source: "NASA",
    date: "1965-12-05",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 255_t_763_r1b_transcripts
SOURCE: NASA
DATE: 12/5/65
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This is an excerpt from the complete transcript of the Gemini VII mission, highlighting the segment in which Astronaut Frank Borman reports seeing an unidentified object. It includes identification of the NASA recording number, and hand written notes documenting which portions of the mission audio appear on the accompanying recording.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/255_t_763_r1b_transcripts.pdf",
  },
  {
    id: "DOC-029",
    title: "331 120752 NUMERIC FILES 1944–1945 37153 GERMAN ARMAMENT EQUIPMENT DOCUMENTS",
    source: "DOD",
    date: "1945-03-18",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 331_120752_Numeric_Files_1944–1945_37153_German_Armament_Equipment_Documents
SOURCE: Department of War
DATE: 3/18/45
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This file contains SHAEF messages and memorandums related to "night phenomena (foofighters)," flak rockets, unidentified cylindrical objects, and blinking lights. The documents include multiple references to the observations of the 415th Night Fighter Squadron.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/331_120752_numeric_files_1944–1945_37153_german_armament_equipment_documents.pdf",
  },
  {
    id: "DOC-030",
    title: "341 110448 RECORDS RELATING TO THE COLLECTION AND DISSEMINATION OF INTELLIGENCE 1948-1955-TS CONT NO.2 2-5300-2-5399",
    source: "DOD",
    date: "1948-11-08",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 341_110448_Records_Relating_to_the_Collection_and_Dissemination_of_Intelligence_1948-1955-TS_CONT_No.2_2-5300-2-5399
SOURCE: Department of War
DATE: 11/8/48
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
An Air Force intelligence report from November 1948 relating to unidentified flying objects and flying saucers.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/341_110448_records_relating_to_the_collection_and_dissemination_of_intelligence_1948-1955-ts_cont_no.2_2-5300-2-5399.pdf",
    incidentIds: ["PURSUE-023", "PURSUE-024"],
  },
  {
    id: "DOC-031",
    title: "341 110677 NUMERICAL FILE, 5-2500",
    source: "DOD",
    date: "1955-10-14",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 341_110677_Numerical_File,_5-2500
SOURCE: Department of War
DATE: 10/14/55
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Air Intelligence Information Report, 14 October 1955, Report of eye witness account of the ascent and flight of a unconventional aircraft in the trans-Caucasus region on the USSR.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/341_110677_numerical_file_5-2500.pdf",
  },
  {
    id: "DOC-032",
    title: "342 HS1-416511228 319.1 FLYING DISCS 1949",
    source: "DOD",
    date: "1950-01-09",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 342_HS1-416511228_319.1 Flying Discs 1949
SOURCE: Department of War
DATE: 1/9/50
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This file primarily contains incident reports on Unidentified Flying Objects (UFOs) written in compliance with the 1948 Flight Service Regulation (FSR) 200-4. The incidents were witnessed by military sources, as well as well as by some Civilian Aviation Authority (CAA) ones. The reports typically include information such as dates, locations, weather, and altitude, plus detailed descriptions of appearance and movement. Some messages from the Military Air Transport Service (MATS) and Army Airways Communications System (AACS) are also included, as well as additional military intelligence reports, several diagrams, and a report from a weather station in Japan.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/342_hs1-416511228_box186_319.1-flying-discs-1949.pdf",
    incidentIds: ["PURSUE-023", "PURSUE-024"],
  },
  {
    id: "DOC-033",
    title: "38 143685 BOX INCIDENT SUMMARIES 101-172",
    source: "DOD",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 38_143685_box_Incident_Summaries_101-172
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Each of these incident summaries includes a "Check-List - Unidentified Flying Objects" that contains details about the incident. Many summaries also include witness lists or statements and other narrative reports or descriptions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/38_143685_box7_incident_summaries_101-172.pdf",
  },
  {
    id: "DOC-034",
    title: "38 143685 BOX INCIDENT SUMMARIES 173-233",
    source: "DOD",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 38_143685_box_Incident_Summaries_173-233
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Each of these incident summaries includes a "Check-List - Unidentified Flying Objects" that contains details about the incident. Many summaries also include witness lists or statements and other narrative reports or descriptions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/38_143685_box7_incident_summaries_173-233.pdf",
  },
  {
    id: "DOC-035",
    title: "38 143685 BOX7 INCIDENT SUMMARIES 1-100",
    source: "DOD",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 38_143685_box7_Incident_Summaries_1-100
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Each of these incident summaries includes a "Check-List - Unidentified Flying Objects" that contains details about the incident. Many summaries also include witness lists or statements and other narrative reports or descriptions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/38_143685_box7_incident_summaries_1-100.pdf",
  },
  {
    id: "DOC-036",
    title: "59 214434 SP 16 [7.18.1963]",
    source: "STATE",
    date: "1963-07-18",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 59_214434_SP 16 [7.18.1963]
SOURCE: Department of State
DATE: 7/18/63
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This memorandum, dated July 18, 1963, from the Executive Office of the President, National Aeronautics and Space Council, relates to thoughts on the space alien race question. Included are details relating to plans if alien intelligence is discovered, expanding scientific knowledge, the possibility of life on Mars, and diplomatic policy.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/59_214434_sp_16_[7.18.1963].pdf",
  },
  {
    id: "DOC-037",
    title: "59 64634 711.5612[7-2852",
    source: "STATE",
    date: "1952-07-18",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 59_64634_711.5612[7-2852
SOURCE: Department of State
DATE: 7/18/52
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This two page memorandum, dated July 18, 1952, relates to increased reports of unidentified flying objects (UFOs). Included in the record are possible explanations of increased sightings, such as technological improvements, historical records of UFOs, and U.S. Air Force opinions on UFOs.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/59_214434_sp_16_7.18.1963.pdf",
  },
  {
    id: "DOC-038",
    title: "65 HS1-101634279 100-DE-18221 SERIAL 844",
    source: "FBI",
    date: "1958-04-17",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-101634279_100-DE-18221_Serial_844
SOURCE: FBI
DATE: 4/17/58
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
An FBI memo from 1958 reporting a UFO sighting by a Detroit man who described a "circular object with a crystal-type dome," and recommending that the information be forwarded to "proper air force authorities."

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-101634279_100-de-18221_serial_844.pdf",
  },
  {
    id: "DOC-039",
    title: "65 HS1-101634279 100-DE-26505",
    source: "FBI",
    date: "1957-11-07",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: 65_HS1-101634279_100-DE-26505
SOURCE: FBI
DATE: 11/7/57
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
An FBI report from 1957 detailing the interview with Wladyslaw Krasuski, who recounted seeing a large, circular, vertically-rising vehicle in 1944 Germany near a German military compound.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-101634279_100-de-26505.pdf",
  },
  {
    id: "DOC-040",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 1",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_1
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_1.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-041",
    title: "65 HS1-834228961 62-HQ-83894 SECTION 8",
    source: "FBI",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: 65_HS1-834228961_62-HQ-83894_Section_8
SOURCE: FBI
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The FBI's 62-HQ-83894 case file includes investigative records, eyewitness testimonies, and public reports concerning Unidentified Flying Objects and flying discs documented between June 1947 and July 1968. The records include high-profile incident accounts, photographic evidence from sites like Oak Ridge, TN, and technical proposals regarding potential propulsion systems. Additional topics include convention programs, researcher accounts, and extensive media coverage from the period.  This file is partially posted on FBI vault with more redactions and some pages missing.  Included here is the complete case file with several newly declassified pages and only minor redactions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_8.pdf",
    incidentIds: ["PURSUE-001", "PURSUE-023"],
  },
  {
    id: "DOC-042",
    title: "DOW-UAP-D10, MISSION REPORT, MIDDLE EAST, MAY 2022",
    source: "DOD",
    date: "2022-05-06",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D10, Mission Report, Middle East, May 2022
SOURCE: Department of War
DATE: 5/6/22
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report. 
A U.S. military operator reported observing “5x UAP fly across the screen.” The report continues by describing one of those observations as a “possible missile” and the remaining four as “possible birds.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d10-mission-report-middle-east-may-2022.pdf",
    incidentIds: ["PURSUE-012", "PURSUE-015"],
  },
  {
    id: "DOC-043",
    title: "DOW-UAP-D12, MISSION REPORT, IRAQ, MAY 2022",
    source: "DOD",
    date: "2022-05-20",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D12, Mission Report, Iraq, May 2022
SOURCE: Department of War
DATE: 5/20/22
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one UAP flying north to northeast. The observer reported following the UAP for as long as possible but was unable to positively identify it.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d12-mission-report-iraq-may-2022.pdf",
  },
  {
    id: "DOC-044",
    title: "DOW-UAP-D16, MISSION REPORT, SYRIA, JULY 2022",
    source: "DOD",
    date: "2022-07-31",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D16, Mission Report, Syria, July 2022
SOURCE: Department of War
DATE: 7/31/22
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one UAP move from north to south, with a total duration of under one minute.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d16-mission-report-syria-july-2022.pdf",
    incidentIds: ["PURSUE-008", "PURSUE-013"],
  },
  {
    id: "DOC-045",
    title: "DOW-UAP-D18, MISSION REPORT, IRAQ, DECEMBER 2022",
    source: "DOD",
    date: "2022-12-01",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D18, Mission Report, Iraq, December 2022
SOURCE: Department of War
DATE: 12/1/22
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one “possible UAP” flying from west to east. The observer did not pursue the UAP.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d18-mission-report-iraq-december-2022.pdf",
  },
  {
    id: "DOC-046",
    title: "DOW-UAP-D19, MISSION REPORT, SYRIA, FEBRUARY 21, 2023",
    source: "DOD",
    date: "2023-02-21",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D19, Mission Report, Syria, February 21, 2023
SOURCE: Department of War
DATE: 2/21/23
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one “possible balloon” at approximately 2,100 feet.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d19-mission-report-syria-february-21-2023.pdf",
    incidentIds: ["PURSUE-008", "PURSUE-013"],
  },
  {
    id: "DOC-047",
    title: "DOW-UAP-D20, MISSION REPORT, SOUTHERN UNITED STATES, 2020",
    source: "DOD",
    date: "2023-03-31",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D20, Mission Report, Southern United States, 2020
SOURCE: Department of War
DATE: 3/31/23
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing “several bright objects maneuvering quickly west to east northeast. The operator reported achieving a track on the UAP via an onboard targeting pod for approximately 20 seconds. The report describes that UAP then dimmed and disappeared from the targeting pod.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d20-mission-report-southern-united-states-2020.pdf",
  },
  {
    id: "DOC-048",
    title: "DOW-UAP-D23, MISSION REPORT, UNITED ARAB EMIRATES, OCTOBER 2023",
    source: "DOD",
    date: "2023-10-31",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D23, Mission Report, United Arab Emirates, October 2023
SOURCE: Department of War
DATE: 10/31/23
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one UAP.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d23-mission-report-united-arab-emirates-october-2023.pdf",
    incidentIds: ["PURSUE-014"],
  },
  {
    id: "DOC-049",
    title: "DOW-UAP-D25, MISSION REPORT, GREECE, JANUARY 2024",
    source: "DOD",
    date: "2024-01-25",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D25, Mission Report, Greece, January 2024
SOURCE: Department of War
DATE: 1/25/24
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one UAP, estimating its speed as “approximately 434 knots (499 mph)”. The observer described the UAP as diamond-shaped, with a non-maneuvering probe at the bottom. The observer noted that the UAP was only visible when viewed via an onboard Short-Wave Infrared (SWIR) sensor. The observer reported that the event occurred over a duration of approximately two minutes. 
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d25-mission-report-greece-january-2024.pdf",
    incidentIds: ["PURSUE-006", "PURSUE-009"],
  },
  {
    id: "DOC-050",
    title: "DOW-UAP-D27, MISSION REPORT, UNITED ARAB EMIRATES, OCTOBER 2023",
    source: "DOD",
    date: "2024-06-07",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D27, Mission Report, United Arab Emirates, October 2023
SOURCE: Department of War
DATE: 6/7/24
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one UAP at an estimated altitude of approximately 24,000 feet. The observer estimated the UAP’s speed as 163 knots (187 mph).
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d27-mission-report-united-arab-emirates-october-2023.pdf",
    incidentIds: ["PURSUE-014"],
  },
  {
    id: "DOC-051",
    title: "DOW-UAP-D28, MISSION REPORT, IRAQ, SEPTEMBER 2024",
    source: "DOD",
    date: "2024-09-20",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D28, Mission Report, Iraq, September 2024
SOURCE: Department of War
DATE: 9/20/24
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
While conducting a weapons calibration test, U.S. military operators reported observing a lens flare via MX-20 and MX-25 IR sensors after firing an AGM-176 Griffin air-to-surface missile. The operators described the source of the flare as a UAP moving through the aircraft’s sensor’s field-of-view at a high rate of speed. The reporter assessed that the flare was associated with “a significant heat source.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d28-mission-report-east-china-sea-2024.pdf",
  },
  {
    id: "DOC-052",
    title: "DOW-UAP-D3, MISSION REPORT, ARABIAN GULF, 2020",
    source: "DOD",
    date: "",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D3, Mission Report, Arabian Gulf, 2020
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing a “line of dots followed by a trailing dot.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d3-mission-report-arabian-gulf-2020.pdf",
  },
  {
    id: "DOC-053",
    title: "DOW-UAP-D32, MISSION REPORT, SYRIA, OCTOBER 2024",
    source: "DOD",
    date: "2024-10-20",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D32, Mission Report, Syria, October 2024
SOURCE: Department of War
DATE: 10/20/24
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing a “misshapen and uneven ball of white light,” describing multiple “glares or light” emanating from an “unknown origin.” The reporter described the UAP as a “light/glare halo effect” at the top of the Full-Motion Video (FMV) feed.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d32-mission-report,-syria-october-2024.pdf",
    incidentIds: ["PURSUE-008", "PURSUE-013"],
  },
  {
    id: "DOC-054",
    title: "DOW-UAP-D33, MISSION REPORT, GREECE, OCTOBER 2023",
    source: "DOD",
    date: "2023-10-27",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D33, Mission Report, Greece, October 2023
SOURCE: Department of War
DATE: 10/27/23
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing a UAP “flying just above the surface of the ocean.” The report describes the UAP as taking “multiple 90-degree turns at an estimated 80 mph.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d33-mission-report-greece-october-2023.pdf",
    incidentIds: ["PURSUE-006"],
  },
  {
    id: "DOC-055",
    title: "DOW-UAP-D35, MISSION REPORT, GREECE, OCTOBER 2023",
    source: "DOD",
    date: "2023-10-29",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D35, Mission Report, Greece, October 2023
SOURCE: Department of War
DATE: 10/29/23
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing a UAP “flying just above the surface of the ocean.” The report describes the UAP as “[flying] straight above the ocean towards lands.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d35-mission-report-greece-october-2023.pdf",
    incidentIds: ["PURSUE-006"],
  },
  {
    id: "DOC-056",
    title: "DOW-UAP-D38, RANGE FOULER DEBRIEF, MIDDLE EAST, MAY 2020",
    source: "USN",
    date: "2020-05-14",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D38, Range Fouler Debrief, Middle East, May 2020
SOURCE: Department of War
DATE: 5/14/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Range Fouler Debrief, a standardized reporting form the U.S. Navy uses to record the circumstances surrounding an unauthorized intrusion into controlled airspace during active military operations or training. These reports contain a narrative description of the observer’s experiences. 
A U.S. military operator reported observing a “solid white object [fly] through the [field-of-view]. The reporter described the UAP as making erratic [movements] above the water.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d38-range-fouler-debrief-middle-east-may-2020.pdf",
  },
  {
    id: "DOC-057",
    title: "DOW-UAP-D4, MISSION REPORT, ARABIAN GULF, 2020",
    source: "DOD",
    date: "",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D4, Mission Report, Arabian Gulf, 2020
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing a UAP traveling at an estimated speed of 321 knots (369 mph). The observer reported that the UAP “increased speed and changed direction towards the east.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d4-mission-report-arabian-gulf-2020.pdf",
  },
  {
    id: "DOC-058",
    title: "DOW-UAP-D42, RANGE FOULER DEBRIEF, JAPAN, 2023",
    source: "USN",
    date: "2020-08-31",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D42, Range Fouler Debrief, Japan, 2023
SOURCE: Department of War
DATE: 8/31/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Range Fouler Debrief Form, a standardized reporting form the U.S. Navy uses to record the circumstances surrounding an unauthorized intrusion into controlled airspace during active military operations or training. These reports contain a narrative description of the observer’s experiences. 
A U.S. military operator reported observing an “object fly through the screen.” The observer described a second object surpassing the first, at a higher speed. The report describes a total of three UAP “moving amongst each other.” 
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d42-range-fouler-debrief-japan-2023.pdf",
  },
  {
    id: "DOC-059",
    title: "DOW-UAP-D44, RANGE FOULER REPORTING FORM, GULF OF ADEN, OCTOBER 2020",
    source: "USN",
    date: "2020-10-15",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D44, Range Fouler Reporting Form, Gulf of Aden, October 2020
SOURCE: Department of War
DATE: 10/15/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Range Fouler Reporting Form, a standardized reporting form the U.S. Navy uses to record the circumstances surrounding an unauthorized intrusion into controlled airspace during active military operations or training. These reports contain a narrative description of the observer’s experiences. 
A U.S. military operator reported observing a “round, cold object” via infrared sensor, traveling at 319 degrees (northwest) at approximately 20 mph. The report describes the UAP making “abrupt directional changes” during the event.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d44-range-fouler-arabian-sea-october-2020.pdf",
  },
  {
    id: "DOC-060",
    title: "DOW-UAP-D48, DEPARTMENT OF THE AIR FORCE REPORT, 1996",
    source: "USAF",
    date: "1996-09-10",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: DOW-UAP-D48, Department of the Air Force Report, 1996
SOURCE: Department of War
DATE: 9/10/96
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This report describes the Modeling of Unlikely Space-Booster Failures in Risk Calculations, documenting historical launch failure modes and recommending corrective actions to address them using novel modelling techniques.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d48-report-september-1996.pdf",
  },
  {
    id: "DOC-061",
    title: "DOW-UAP-D49, LAUNCH SUMMARY, VANDENBERG AFB, 2000",
    source: "USAF",
    date: "2000-02-03",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: DOW-UAP-D49, Launch Summary, Vandenberg AFB, 2000
SOURCE: Department of War
DATE: 2/3/00
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This report summarizes the historical record of launches occurring at Vandenberg Air Force Base between 1958 and 2000.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d49-launch-summary-february-2000.pdf",
  },
  {
    id: "DOC-062",
    title: "DOW-UAP-D5, MISSION REPORT, ARABIAN GULF, 2020",
    source: "DOD",
    date: "",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D5, Mission Report, Arabian Gulf, 2020
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing two UAP traveling at an estimated speed of 278 knots (320 mph. The observer reported that the UAP “increased speed and changed direction towards the south.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d5-mission-report-arabian-gulf-2020.pdf",
    incidentIds: ["PURSUE-009"],
  },
  {
    id: "DOC-063",
    title: "DOW-UAP-D50, EMAIL CORRESPONDENCE, INDOPACOM, APRIL 2025",
    source: "DOD",
    date: "2025-04-10",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D50, Email Correspondence, INDOPACOM, April 2025
SOURCE: Department of War
DATE: 4/10/2025-4/11/2025
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is email correspondence describing the content of a mission report and requesting clarification on its content.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d50-email-correspondence-indopacom-april-2025.pdf",
    incidentIds: ["PURSUE-007", "PURSUE-016"],
  },
  {
    id: "DOC-064",
    title: "DOW-UAP-D51, EMAIL CORRESPONDENCE, PACIFIC TIME ZONE, MARCH 2023",
    source: "DOD",
    date: "2026-03-23",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D51, Email Correspondence, Pacific Time Zone, March 2023
SOURCE: Department of War
DATE: 3/23/26
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is email correspondence describing the content of a mission report and requesting clarification on its content.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d51-email-correspondence-pacific-time-zone-march-2023.pdf",
  },
  {
    id: "DOC-065",
    title: "DOW-UAP-D52, EMAIL CORRESPONDANCE, NA, AUGUST 2024",
    source: "DOD",
    date: "2024-10-31",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D52, Email Correspondance, NA, August 2024
SOURCE: Department of War
DATE: 10/31/24
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is email correspondence describing the content of a mission report and requesting clarification on its content.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d52-email-correspondance-na-august-2024.pdf",
  },
  {
    id: "DOC-066",
    title: "DOW-UAP-D55, MISSION REPORT, SYRIA, NOVEMBER 2016",
    source: "DOD",
    date: "2016-11-18",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D55, Mission Report, Syria, November 2016
SOURCE: Department of War
DATE: 11/18/16
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a mission briefing summarizing an observation of Unidentified Anomalous Phenomena (UAP) by a U.S. military platform near Latakia, Syria.
A U.S. military pilot flying a P-8A aircraft reported observing an object via the aircraft’s EO/IR sensor, which they characterized as appearing to be in “sea skim mode,” traveling at approximately 500 knots (575 mph) on a southeasterly heading. The P-8A lost visual contact with the object after two minutes.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d55-mission-report-syria-november-2016.pdf",
    incidentIds: ["PURSUE-008", "PURSUE-013"],
  },
  {
    id: "DOC-067",
    title: "DOW-UAP-D56, RANGE FOULER DEBRIEF, ARABIAN SEA, AUGUST 2020",
    source: "USN",
    date: "2020-08-24",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D56, Range Fouler Debrief, Arabian Sea, August 2020
SOURCE: Department of War
DATE: 8/24/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Range Fouler Debrief Form, a standardized reporting form the U.S. Navy uses to record the circumstances surrounding an unauthorized intrusion into controlled airspace during active military operations or training. These reports contain a narrative description of the observer’s experiences. 
A U.S. military operator reported an encounter with a group of three “unidentified small air contacts” over the North Arabian Sea. The reporter described the UAP as having “wings/airframe” structure, and as initially bearing on a westerly heading. The operator tracked one UAP before losing sight of it behind a cloud. Upon regaining contact, the operator reported observing two additional UAP to the east of the first. The report states that all three objects then “appeared to maintain their relative course, speed, and altitude.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d56-range-fouler-debrief-arabian-sea-august-2020.pdf",
  },
  {
    id: "DOC-068",
    title: "DOW-UAP-D57, RANGE FOULER REPORTING FORM, GULF OF ADEN, SEPTEMBER 2020",
    source: "USN",
    date: "2020-09-04",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D57, Range Fouler Reporting Form, Gulf of Aden, September 2020
SOURCE: Department of War
DATE: 9/4/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Range Fouler Reporting Form, a standardized reporting form the U.S. Navy uses to record the circumstances surrounding an unauthorized intrusion into controlled airspace during active military operations or training. These reports contain a narrative description of the observer’s experiences. 
A U.S. military operator reported tracking a “round, cold object” over the Gulf of Aden for eight minutes via “black hot” IR sensor, making the UAP appear “bright white.” The report states that the UAP was “traveling 168 degrees at 277 mph” and “made a few abrupt directional changes” during the encounter.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d57-mission-report-gulf-of-aden-september-2020.pdf",
  },
  {
    id: "DOC-069",
    title: "DOW-UAP-D58, RANGE FOULER DEBRIEF, NA, OCTOBER 2020",
    source: "USN",
    date: "2020-10-27",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D58, Range Fouler Debrief, NA, October 2020
SOURCE: Department of War
DATE: 10/27/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Range Fouler Debrief, a standardized reporting form the U.S. Navy uses to record the circumstances surrounding an unauthorized intrusion into controlled airspace during active military operations or training. These reports contain a narrative description of the observer’s experiences. 
A U.S. military operator reported an encounter with a group of two UAP. The operator described the UAP as “balloon-shaped,” metallic, and reflective, characterizing them as “2x red blinking strobes.” The report states that “one range fouler was circling around the other.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d58-range-fouler-debrief-na-october-2020.pdf",
  },
  {
    id: "DOC-070",
    title: "DOW-UAP-D6, MISSION REPORT, ARABIAN GULF, 2020",
    source: "DOD",
    date: "",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D6, Mission Report, Arabian Gulf, 2020
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing a UAP.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d6-mission-report-arabian-gulf-2020.pdf",
    incidentIds: ["PURSUE-007", "PURSUE-016"],
  },
  {
    id: "DOC-071",
    title: "DOW-UAP-D60, MISSION REPORT, PERSIAN GULF, AUGUST 2020",
    source: "DOD",
    date: "2020-08-08",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D60, Mission Report, Persian Gulf, August 2020
SOURCE: Department of War
DATE: 8/8/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one UAP. The report describes the UAP as “transiting” and notes it had “no impact to mission.” The report also states that “dense cloud coverage intermittently impacted FMV collection.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d60-mission-report-persian-gulf-august-2020.pdf",
  },
  {
    id: "DOC-072",
    title: "DOW-UAP-D61, MISSION REPORT, PERSIAN GULF, AUGUST 2020",
    source: "DOD",
    date: "2020-08-27",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D61, Mission Report, Persian Gulf, August 2020
SOURCE: Department of War
DATE: 8/27/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing a “formation of unknown flying objects” traveling northeast to northwest along the coast for approximately two minutes. The report notes that light cloud coverage “prevented the continuous tracking of the formation.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d61-mission-report-persian-gulf-august-2020.pdf",
  },
  {
    id: "DOC-073",
    title: "DOW-UAP-D62, MISSION REPORT, STRAIT OF HORMUZ, SEPTEMBER 2020",
    source: "DOD",
    date: "2020-09-16",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D62, Mission Report, Strait of Hormuz, September 2020
SOURCE: Department of War
DATE: 9/16/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one UAP at an estimated altitude of 1,800 feet.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d62-mission-report-strait-of-hormuz-september-2020.pdf",
  },
  {
    id: "DOC-074",
    title: "DOW-UAP-D63, MISSION REPORT, STRAIT OF HORMUZ, OCTOBER 2020",
    source: "DOD",
    date: "2020-10-01",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D63, Mission Report, Strait of Hormuz, October 2020
SOURCE: Department of War
DATE: 10/1/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing a UAP.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d63-mission-report-strait-of-hormuz-october-2020.pdf",
  },
  {
    id: "DOC-075",
    title: "DOW-UAP-D64, MISSION REPORT, IRAN, NOVEMBER 2020",
    source: "DOD",
    date: "2020-11-02",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D64, Mission Report, Iran, November 2020
SOURCE: Department of War
DATE: 11/2/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing two UAP on November 2, 2020, at 2143Z and at 2148Z. The first observation occurred at an unknown altitude. The reporter described the second UAP’s direction of travel as proceeding to the northwest.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d64-mission-report-iran-november-2020.pdf",
  },
  {
    id: "DOC-076",
    title: "DOW-UAP-D65, MISSION REPORT, PERSIAN GULF, JULY 2020",
    source: "DOD",
    date: "2020-07-16",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D65, Mission Report, Persian Gulf, July 2020
SOURCE: Department of War
DATE: 7/16/20
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported encountering three separate UAP on July 16, 2020, at 1830Z, 1920Z, and 2345Z. 
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d65-mission-report-persian-gulf-july-2020.pdf",
  },
  {
    id: "DOC-077",
    title: "DOW-UAP-D7, MISSION REPORT, ARABIAN GULF, 2020",
    source: "DOD",
    date: "",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D7, Mission Report, Arabian Gulf, 2020
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing a UAP, describing it as “look[ing] like a balloon.” The report describes the UAP as “traveling with the winds at approximately 31,000 ft.” The visually tracked the UAP via onboard infrared sensor.
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d7-mission-report-arabian-gulf-2020.pdf",
  },
  {
    id: "DOC-078",
    title: "DOW-UAP-D74, MISSION REPORT, SYRIA, NOVEMBER 2023",
    source: "DOD",
    date: "2023-11-09",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D74, Mission Report, Syria, November 2023
SOURCE: Department of War
DATE: 11/9/23
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one UAP “shaped as a bouncy ball.” The observer described the UAP as traveling “~424kn (483 mph) consistently for at least 7mins.” The reporter described the UAP approaching from the south. The operator assessed the object as “benign.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d74-mission-report-syria-november-2023.pdf",
    incidentIds: ["PURSUE-008", "PURSUE-013"],
  },
  {
    id: "DOC-079",
    title: "DOW-UAP-D75, MISSION REPORT, GULF OF ADEN, JULY 2024",
    source: "DOD",
    date: "2024-07-14",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D75, Mission Report, Gulf of Aden, July 2024
SOURCE: Department of War
DATE: 7/14/24
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing one UAP on July 14, 2024. The observer reported that the UAP maintained a “straight flight path at same altitude”. The report notes that the UAP’s “speed was faster than flying speed,” and the operator assessed the object as “benign.” The operator reported following the UAP “till the distance became too far.”
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d75-mission-report-gulf-of-aden-july-2024.pdf",
  },
  {
    id: "DOC-080",
    title: "DOW-UAP-D8, MISSION REPORT, DJIBOUTI, 2025",
    source: "DOD",
    date: "",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-D8, Mission Report, Djibouti, 2025
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a Mission Report (MISREP), a standardized reporting form the U.S. Military uses to record the circumstances surrounding its operations. U.S. military services often use MISREPs to report Unidentified Anomalous Phenomena (UAP) to AARO. The GENTEXT, or “general text” section of these reports often contains important qualitative, contextual information, distinguishing it from the more quantitative, or numerical, data found elsewhere in the report.
A U.S. military operator reported observing two “white hot UAPs.” The reporter estimated the UAP’s speed as approximately 240 nautical miles per hour (276 mph).
All descriptive and estimative language contained in this report reflects the reporter’s subjective interpretation at the time of the event. Such characterizations should not be interpreted as a conclusive indication of the presence or absence of any intrinsic object features or performance characteristics.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d8-mission-report-djibouti-2025.pdf",
    incidentIds: ["PURSUE-009"],
  },
  {
    id: "DOC-081",
    title: "DOW-UAP-PR20, UNRESOLVED UAP REPORT, KUWAIT, MAY 2022",
    source: "DOD",
    date: "",
    classification: "SECRET//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: DOW-UAP-PR20, Unresolved UAP Report, Kuwait, May 2022
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: SECRET//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2022. The original reporter digitally altered the imagery by adding a red line encircling an area of interest before submitting it to AARO. An accompanying mission report, DoW-UAP-D12, described the UAP as moving from north to northeast. The operator reported that they were unable to positively identify the UAP.

Image Description: The image contains an encircled, elongated area of contrast in the top left quarter. The area of contrast increases in intensity along its length from top left to bottom right.

This image description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-pr20.pdf",
  },
  {
    id: "DOC-082",
    title: "FBI PHOTO B1",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B1
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set. 

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small, dark, circular object is visible in the upper right quadrant, near the center of the frame. The background appears to show an indistinct mountain range or cloud formation.This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b1.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-083",
    title: "FBI PHOTO B10",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B10
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small, dark, circular object is visible just to the top right quadrant of the center of the reticle. The background shows an indistinct mountain range.This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b10.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-084",
    title: "FBI PHOTO B11",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B11
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small, dark, circular object is visible in the upper right quadrant of the frame. The background appears to show an indistinct mountain range. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b11.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-085",
    title: "FBI PHOTO B12",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B12
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small, dark, circular object is visible in the upper right quadrant of the frame. The background shows an indistinct mountain range.This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b12.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-086",
    title: "FBI PHOTO B13",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B13
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a simplified central crosshair. Two small, dark, elongated objects are visible near the center of the frame in the bottom right quadrant. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b13.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-087",
    title: "FBI PHOTO B14",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B14
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a simplified central crosshair. Two small, dark, circular objects are visible near the center of the frame. A digital artifact or distortion is visible along the edge of the redaction box in the lower right quadrant. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b14.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-088",
    title: "FBI PHOTO B15",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B15
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a simplified central crosshair. Two small, dark, circular objects are visible near the center of the frame in the upper right quadrant. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b15.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-089",
    title: "FBI PHOTO B16",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B16
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a simplified central crosshair. Two dark, irregular-shaped objects are visible just right of the center in the upper right quadrant. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b16.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-090",
    title: "FBI PHOTO B17",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B17
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a simplified central crosshair. Two small, dark, circular objects are visible near the center of the frame. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b17.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-091",
    title: "FBI PHOTO B18",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B18
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a simplified central crosshair. Two small, dark, elongated objects are visible near the center of the frame in the lower left quadrant. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b18.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-092",
    title: "FBI PHOTO B19",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B19
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small cluster of dark pixels, forming an object, is visible at the exact center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b19.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-093",
    title: "FBI PHOTO B2",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B2
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small, dark, circular object is visible in the upper right quadrant. The background shows an indistinct mountain range or cloud formation. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b2.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-094",
    title: "FBI PHOTO B20",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B20
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. One to two small, dark, objects are visible just above and to the right of the center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b20.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-095",
    title: "FBI PHOTO B21",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B21
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. One to two small, dark, objects are visible just above and to the right of the center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b21.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-096",
    title: "FBI PHOTO B22",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B22
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a simplified central crosshair. Two small, dark, elongated objects are visible near the center of the frame in the upper right quadrant.This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b22.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-097",
    title: "FBI PHOTO B23",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B23
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a simplified central crosshair. A single dark, elongated object is visible near the edge of the reticle to the right of center. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b23.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-098",
    title: "FBI PHOTO B24",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B24
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a simplified central crosshair. A single dark, irregular-shaped object is visible just above the center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b24.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-099",
    title: "FBI PHOTO B3",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B3
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.  The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small, dark, circular object is visible just to the right of the center of the reticle. The background appears to show an indistinct mountain range or cloud formation. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b3.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-100",
    title: "FBI PHOTO B4",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B4
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.  The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small, dark, circular object is visible in the center right quadrant, close to the center of the frame. An indistinct, possibly natural, landscape is visible in the background. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b4.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-101",
    title: "FBI PHOTO B5",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B5
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.  The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. No distinct objects are clearly visible within the central area of the frame. The background shows an indistinct formation, possibly a mountain range. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b5.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-102",
    title: "FBI PHOTO B6",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B6
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.  The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A dark, structured object with an appendage on its left side is visible just at the top of the reticle. A second, smaller, dark circular object is visible below the reticle in the bottom right quadrant. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b6.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-103",
    title: "FBI PHOTO B7",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B7
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A dark object, consistent in appearance with a helicopter, is visible in the upper right quadrant. A second, smaller, dark circular object is visible below the reticle. The background is indistinct. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b7.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-104",
    title: "FBI PHOTO B8",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B8
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small, dark, circular object is visible just right of the center of the reticle in the top right quadrant. The background shows an indistinct mountain range. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b8.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-105",
    title: "FBI PHOTO B9",
    source: "FBI",
    date: "2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo B9
SOURCE: FBI
DATE: Late 2025
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. military system in 2025. The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP. The date in the image is incorrect due to system date/time not being set.

Narrative Description: The monochrome image displays a grainy texture with a central crosshair reticle. A small, dark, circular object is visible just below and to the left of the center of the reticle. The background appears to show an indistinct mountain range. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b9.pdf",
    incidentIds: ["PURSUE-005"],
  },
  {
    id: "DOC-106",
    title: "NASA-UAP-D1, APOLLO 12 TRANSCRIPT, 1969",
    source: "NASA",
    date: "1969",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-D1, Apollo 12 Transcript, 1969
SOURCE: NASA
DATE: 1969
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Apollo 12 was the fourth crewed U.S. mission to the Moon and the second to land astronauts on the lunar surface. This document is an excerpt from the Apollo 12 Technical Air-to-Ground Voice Transcription, November 1969, highlighting two periods in which astronauts reported observing unidentified phenomenon: a one hour period on the fifth day, and a two minute period on the sixth day. These transcripts contain contemporaneous observations by the flight crew reacting to unidentified phenomenon.
•	Day 05, Hour 19, Minute 14, Second 58 through Day 05, Hour 20, Minute 12, Second 14:
o	At 05:19:27:25, the pilot of the Lunar Module (LMP-LM), Astronaut Alan L. Bean, described observing particles and flashes of light “sailing off in space” via the onboard Alignment Optical Telescope (AOT). He characterized these phenomenon as “escaping the Moon.”
•	Day 06, Hour 00, Minute 21, Second 42 through Day 06, Hour 00, Minute 23, Second 33:
o	Mission Commander, Charles “Pete” Conrad, described observing floating debris outside the lunar module, which had been illuminated by the module’s onboard tracking light. At 06:00:21:51, Conrad assessed that the tracking light had burnt out because he could no longer see the debris from the module.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-d1-apollo-12-transcript-1969.pdf",
    incidentIds: ["PURSUE-002"],
  },
  {
    id: "DOC-107",
    title: "NASA-UAP-D2, APOLLO 17 TRANSCRIPT, 1972",
    source: "NASA",
    date: "1972",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-D2, Apollo 17 Transcript, 1972
SOURCE: NASA
DATE: 1972
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Apollo 17 was the ninth crewed U.S. mission to the Moon, and the sixth to land astronauts on the lunar surface. This document is an excerpt from the Apollo 17 Technical Air-to-Ground Voice Transcription, December 1972, highlighting three periods in which astronauts reported observing unidentified phenomenon: a nine minute period on the first day, a three hour period on the second day, and a six minute period on the third day. 
•	Day 00, Hour 03, Minute 34, Second 10 through Day 00, Hour 03, Minute 42, Second 29:
    o	Command Module Pilot (CMP), Ronald Evans, reported observing “very bright particles or fragments” drifting and “tumbling” near the spacecraft as it maneuvered. Lunar Module Pilot (LMP), Harrison “Jack” Schmitt, described the phenomenon as looking “like the Fourth of July.” The astronauts speculated that the phenomenon may be attributable to ice or paint fragments dislodging from a separated component of the spacecraft (S-IVB) but characterized that assessment as a “wild guess.”
•	Day 02, Hour 18, Minute 42, Second 34 through Day 02, Hour 21, Minute 07, Second 05:
    o	Mission Commander, Eugene A. Cernan, reported difficulty sleeping and described having observed “some sets of the streaks.” He also described an intense light flashing between his eyes, describing its intensity as comparable to that of a train headlight and characterizing it as “imposing.” Over the next three hours, Cernan described observing several flashing, rotating phenomenon that he assessed as corresponding to physical objects in space rather than a purely optical phenomenon. LMP Schmitt also reported observing similar phenomenon, though he again assessed the source of his observation to be a separated rocket stage (S-IVB). At 02:20:55:22, Cernan reported observing two additional distant flashing objects, though he assessed them as Spacecraft/Lunar Module Adapter panels (SLA panel), another separated component of the Saturn V rocket.
•	Day 03, Hour 15, Minute 33, Second 25 through Day 03, Hour 15, Minute 39, Second 46:
    o	At 03:15:38:09, LMP Schmitt exclaimed that he had observed a flash on the lunar surface north of Grimaldi (crater).

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-d2-apollo-17-transcript-1972.pdf",
    incidentIds: ["PURSUE-003"],
  },
  {
    id: "DOC-108",
    title: "NASA-UAP-D3, GEMINI 7 TRANSCRIPT, 1965",
    source: "NASA",
    date: "1965",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-D3, Gemini 7 Transcript, 1965
SOURCE: NASA
DATE: 1965
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Gemini 7 was the tenth crewed American spaceflight. This document is a transcript of communications between the flight crew, Astronauts James “Jim” Lovell and Frank Borman, and the Manned Flight Center (now known as Johnson Space Center) in Houston, Texas. The transcript begins with Borman’s report of a “bogey,” contemporary nomenclature for an unknown aircraft, as well as a debris field. Borman described the debris field as consisting of “very, very many […] hundreds of little particles.” He estimated the particles’ distance from the spacecraft to be four miles. Lovell described observing a “brilliant body in the sun against a black background with trillions of particles on it.”
This document also includes handwritten notes documenting the encounter, annotated with the phrase “UFO Sighting by Borman” in the top right corner.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-d3-gemini-7-transcript-1965.pdf",
  },
  {
    id: "DOC-109",
    title: "NASA-UAP-D4, APOLLO 11 TECHNICAL CREW DEBRIEFING, 1969",
    source: "NASA",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-D4, Apollo 11 Technical Crew Debriefing, 1969
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Apollo 11 was the third crewed mission to the Moon and the first to land Astronauts on the lunar surface. This document is an excerpt from the Apollo 11 Technical Crew Debriefing (Volumes 1 and 2) from July 31, 1969. The document highlights three observations: one, an object on the way out to the Moon; two, flashes of light inside the cabin; and three, a sighting on the return trip of a bright light tentatively assumed by the crew to be a laser.

•	Page 6-33 (Vol. 1). [Lunar Module Pilot for Apollo 11, Buzz Aldrin]: “The first unusual thing that we saw I guess was 1 day out or something pretty close to the moon. It had a sizeable dimension to it, so we put the monocular on it.” The crew speculated that it could have been the S-IVB stage of the Saturn V launch vehicle.
•	Page 6-37 (Vol. 1). [Lunar Module Pilot for Apollo 11, Buzz Aldrin] “The other observation that I made accumulated gradually. I don’t know whether I saw it the first night, but I’m sure I saw it the second night. I was trying to go to sleep with all the lights out. I observed what I thought were little flashes inside the cabin, spaced a couple of minutes apart…”
•	Page 21-1 (Vol. 2). [Lunar Module Pilot for Apollo 11, Buzz Aldrin] “I observed what appeared to be a fairly bright light source which we tentatively ascribed to a possible laser.”

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-d4-apollo-11-technical-crew-debriefing-1969.pdf",
  },
  {
    id: "DOC-110",
    title: "NASA-UAP-D5, APOLLO 17 CREW DEBRIEFING FOR SCIENCE, 1973",
    source: "NASA",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-D5, Apollo 17 Crew Debriefing for Science, 1973
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Apollo 17 was the ninth crewed U.S. mission to the Moon, and the sixth to land Astronauts on the lunar surface. This document is an excerpt from the Apollo 17 Crew Debriefing for Science on January 8, 1973, in which Dick Henry, co-investigator on the ultraviolet experiment on Apollo 17, discusses seeing results that were unexpected. 
•	Pages 119-120. “One of the most exciting results of X-ray astronomy was the fact that an X-ray background was observed over the sky that nobody had expected, and part of this is the gamma-ray background that Dr. Trombka talked about. In the UV, nobody knows, but you never know until you look. You do have to deal with this background of stars that we know is there. So, we did look at a large number of different points at high galactic latitudes, both north and south. The spectrum that we see is above this dark count. In other words, this abnormally high dark current did not, in fact, interfere with that experiment. The spectrum that we see looks like the spectrum of the hot star; however, we know that there were no hot stars within our field of view. Therefore, the most conservative interpretation, I think, is that what we're seeing is light from hot stars in the galactic plane going up out of the plane and reflecting off interstellar dust. There are certain characteristics of the spectrum, though, that don't fit that theory, and it's at least possible that this is extragalactic radiation. I'm looking forward very much to the detailed computer study of this, but it's going to take a long time.”

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-d5-apollo-17-crew-debriefing-for-science-1973.pdf",
    incidentIds: ["PURSUE-003"],
  },
  {
    id: "DOC-111",
    title: "NASA-UAP-D6, APOLLO 17 TECHNICAL CREW DEBRIEFING, 1973",
    source: "NASA",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-D6, Apollo 17 Technical Crew Debriefing, 1973
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Apollo 17 was the ninth crewed U.S. mission to the Moon, and the sixth to land Astronauts on the lunar surface. This document is an excerpt from the Apollo 17 Technical Crew Debriefing on January 4, 1973, in which astronaut Harrison Schmitt reported seeing light flashes.
•	Page 24-4. [Lunar Module Pilot Harrison Schmitt]: “We had light flashes just about continuously during the whole flight when we were dark adapted. I had one which I thought was a flash on the lunar surface. That one period of time when we had the blindfolds on for the ALFMED [Apollo Light Flash Moving Emulsion Detector] experiment there were just no visible flashes, although that evening, that night, before I went to sleep, I noticed that I was seeing the light flashes again.”

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-d6-apollo-17-technical-crew-debriefing-1973.pdf",
    incidentIds: ["PURSUE-003"],
  },
  {
    id: "DOC-112",
    title: "NASA-UAP-D7, SKYLAB TECHINCAL CREW DEBRIEFING 1973",
    source: "NASA",
    date: "",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-D7, Skylab Techincal Crew Debriefing 1973
SOURCE: Department of War
DATE: N/A
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Launched on May 14, 1973, Skylab was the United States’ first laboratory in space. From 1973 to 1974, the station was visited by three crews. This document contains excerpts from all three crews to visit the station. In the first excerpt taken from Skylab 1/2 [first crew] Technical Debriefing from June 30, 1973, highlights crew observations of light flashes. The second excerpt taken from Skylab 1/3 Technical Crew Debriefing from October 4, 1973, highlights two observations—a satellite in similar orbit and another object with a “reddish hue to it.” The final excerpt taken from the Skylab 1/4 Technical Crew Debriefing from February 22, 1974, highlights an observation of flashing lights outside Skylab.
•	Skylab 2 crew observation: 
o	Page 23-20. [Science Pilot for Skylab 2, Joesph Kerwin] “We saw light flashes. I think all of us saw them. I saw them most often when I was in the sack at night with my eyes closed but awake naturally. They tended to wax and wane in frequency.”
•	Skylab 3 crew observations: 
o	Page 7-4. [Science Pilot for Skylab 3, Owen Garriott] “We saw that satellite about a week before splashdown. That was one of the most unusual things that we saw and I guess Jack [Lousma] noticed it looking out the window. This bright reddish object was out there and we tracked it for about 5 or 10 minutes. It was obviously a satellite in a very similar orbit to our own.”
o	Page 20-1. [Science Pilot for Skylab 3, Owen Garriott] “Jack [Lousma] first noticed this rather large red star out the wardroom window. Upon close examination, it was much brighter than Jupiter or any of the other planets. It had a reddish hue to it, even though it was well above the horizon.”
•	Skylab 4 crew observation 
o	Page 7-8. [Commander for Skylab 4, Gerald P. Carr] “One other area of unusual events that we reported on the dump tapes was that on occasion we saw some lights flashing outside with very a definite motion relative to ours. We presumed that they were other pieces of Skylab, or possibly other satellites.”

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-d7-skylab-technical-crew-debriefing-1973.pdf",
  },
  {
    id: "DOC-113",
    title: "STATE DEPARTMENT UAP CABLE 1, PAPUA NEW GUINEA, JANUARY 28, 1985",
    source: "STATE",
    date: "1985-01-24",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: State Department UAP Cable 1, Papua New Guinea, January 28, 1985
SOURCE: Department of State
DATE: 1/24/85
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a U.S. Department of State diplomatic cable from the U.S. Embassy in Port Moresby, Papua New Guinea to USCINCPAC (United States Indo-Pacific Command) at Honolulu, HI on January 28, 1985. 
The cable reports that the U.S. Embassy to Papua New Guinea received an inquiry from the host nation’s intelligence services regarding reports of high-altitude, high-speed aircraft in Papua New Guinean airspace on the evening of January 24, 1985. The cable refers to a representative of the local intelligence services as “NIO,” or National Intelligence Officer, throughout. The NIO relayed to U.S. diplomatic personnel that residents had been “frightened by overflights, which led to the provincial premier’s calling of a public meeting on the subject.” The NIO also stated there had been “various reports of unidentified aerial phenomena the night of January 24, including fast-moving objects with lights, contrails, and noise.” The NIO assessed these reports as credible based upon the testimony of an Air Niugini pilot who said that their radar had “picked up aircraft flying south to north at high altitude and high speed.”
The cable concludes by characterizing the information provided by the NIO as “very sketchy.” It also sought clarification from U.S. INDOPACOM on the presence or absence of U.S. military aircraft within Papua New Guinean airspace on the night in question.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dos-uap-d1-cable-1-papua-new-guinea-january-1985.pdf",
    incidentIds: ["PURSUE-011"],
  },
  {
    id: "DOC-114",
    title: "STATE DEPARTMENT UAP CABLE 3, TBILISI, GEORGIA, OCTOBER 30, 2001",
    source: "STATE",
    date: "2001-10-28",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: State Department UAP Cable 3, Tbilisi, Georgia, October 30, 2001
SOURCE: Department of State
DATE: 10/28/2001-10/29/2001
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
On October 28-29, there was an incident alleged by the Georgian Foreign Ministry that Russian aircraft had violated Georgian airspace and bombed areas of the Kodori Gorge.  Russians denied any of the claims and said that it could have been UFOs.  Cable authors note that Russians typically engage in the “bold lie” when they wish to conceal actions.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/059uap00011.pdf",
    incidentIds: ["PURSUE-011"],
  },
  {
    id: "DOC-115",
    title: "STATE DEPARTMENT UAP CABLE 4, ASHGABAT, TURKMENISTAN, NOVEMBER 5, 2004",
    source: "STATE",
    date: "2004-11-05",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: State Department UAP Cable 4, Ashgabat, Turkmenistan, November 5, 2004
SOURCE: Department of State
DATE: 11/5/04
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
UFOlogists of Turkmenistan has gained a positive reputation as a reliable partner for the United States in Turkmenistan to the bemusement of the cable’s author in the build up of civil society organizations within the country.  The reputation has become earned because everyone in Turkmenistan, apparently, “is interested in UFOs.”

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/059uap00012.pdf",
    incidentIds: ["PURSUE-011"],
  },
  {
    id: "DOC-116",
    title: "STATE DEPARTMENT UAP CABLE 5, MEXICO, SEPTEMBER 16, 2003",
    source: "STATE",
    date: "2003-09-12",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: State Department UAP Cable 5, Mexico, September 16, 2003
SOURCE: Department of State
DATE: 9/12/03
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
On September 12, 20023 the Mexican Congress heard testimony on UAP from experts related to the debate about an Aerial Space Protection Law, which, if approved, would make Mexico the first country to formally acknowledge the presence of alien life on earth. Experts asked legislators to recognize UAP, guarantee airspace security, and allow UAP to be studied.  They presented to alleged alien corpses and videos of Mexican pilot’s encounters with fast-moving flying objects during flight. Disagreement about the efficacy and validity of the purported alien corpses.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/059uap00013.pdf",
    incidentIds: ["PURSUE-011"],
  },
  {
    id: "DOC-117",
    title: "USPER STATEMENT ABOUT UAP SIGHTING",
    source: "STATE",
    date: "2025",
    classification: "CONFIDENTIAL//DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: USPER Statement about UAP Sighting
SOURCE: Department of State
DATE: Late 2025
CLASSIFICATION: CONFIDENTIAL//DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This is an FBI 302 interview conducted with a senior US intelligence official regarding his first-hand account of a UAP encounter at a US military facility. USPER relayed to FBI agents that he and other federal and state personnel conducted searches to where orbs had been previously seen.  After searching the area with a helicopter, they found a “super-hot” orb hovering over the ground.  The orb is reported to have travelled for 20 miles at a speed too fast for the helicopter in pursuit.  An additional “swarm” of lights were seen moving in all directions.  A total of four or five additional orbs were seen shortly thereafter for a short time, flaring up and then down.  This pattern of four or five orbs flaring up, then down continued over the next thirty minutes across the area.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/usper-statement-redacted.pdf",
    incidentIds: ["PURSUE-026"],
  },
  {
    id: "DOC-118",
    title: "FBI SEPTEMBER 2023 SIGHTING - COMPOSITE SKETCH",
    source: "FBI",
    date: "2023-09-01",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: FBI September 2023 Sighting - Composite Sketch
SOURCE: FBI
DATE: 9/1/23
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
Actual site photo with FBI Lab rendered graphic overlay depicting corroborating eyewitness reports from September 2023 of an apparent ellipsoid bronze metallic object materializing out of a bright light in the sky, 130-195 feet in length, and disappearing instantaneously.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/2024-04-30-composite-sketch.pdf",
    incidentIds: ["PURSUE-026", "PURSUE-019", "PURSUE-020"],
  },
  {
    id: "DOC-119",
    title: "FBI SEPTEMBER 2023 SIGHTING - SERIAL 3",
    source: "FBI",
    date: "2023-09-01",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI September 2023 Sighting - Serial 3
SOURCE: FBI
DATE: 9/1/23
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This is an FBI 302 interview conducted with a US citizen regarding their first-hand account of a UAP encounter at a US test site.  USPER described an object "metallic bronze in color."

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/serial 5 redacted_redacted.pdf",
    incidentIds: ["PURSUE-026", "PURSUE-019", "PURSUE-020"],
  },
  {
    id: "DOC-120",
    title: "FBI SEPTEMBER 2023 SIGHTING - SERIAL 4",
    source: "FBI",
    date: "2023-09-01",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI September 2023 Sighting - Serial 4
SOURCE: FBI
DATE: 9/1/23
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This is an FBI 302 interview conducted with a US citizen regarding their first-hand account of a UAP encounter at a US test site. USPER described an object "metallic/gray in color."

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/serial-3_redacted.pdf",
    incidentIds: ["PURSUE-026", "PURSUE-019", "PURSUE-020"],
  },
  {
    id: "DOC-121",
    title: "FBI SEPTEMBER 2023 SIGHTING - SERIAL 5",
    source: "FBI",
    date: "2023-09-01",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI September 2023 Sighting - Serial 5
SOURCE: FBI
DATE: 9/1/23
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This is an FBI 302 interview conducted with a US citizen regarding their first-hand account of a UAP encounter at a US test site. USPER described a "bright light over the horizon."

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/serial-4-redacted_redacted.pdf",
    incidentIds: ["PURSUE-026", "PURSUE-019", "PURSUE-020"],
  },
  {
    id: "DOC-122",
    title: "WESTERN US EVENT",
    source: "DOD",
    date: "2023",
    classification: "DECLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: Western US Event
SOURCE: Department of War
DATE: 2023
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This document is a summary of statements by seven US PERSONs employed by the federal government who separately reported observing several unidentified anomalous phenomena in the western United States over the course of two days in 2023.  The summary notes the US PERSONS reported four distinct categories of experiences, including observing “orbs launching other orbs” at a distance, observing a large stationary glowing orb at close estimated range, pursuing a large phenomenon near the ground, and observing a large, seemingly transparent phenomenon, reported to being akin to a “translucent kite.” Although there is no technical data directly associated with this report, contextual factors — such as these events sharing features with others reported to the All-domain Anomaly Resolution Office (AARO), the reporters’ credibility, and the potentially anomalous nature of the events themselves — combine to make this report among the most compelling within AARO’s current holdings.

FULL TEXT NOT YET INDEXED LOCALLY. DOWNLOAD ORIGINAL VIA SOURCE LINK BELOW.

[[REDACT:CONTENT — PENDING TRANCHE 02 INDEXING]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/western_us_event_slides_5.08.2026.pdf",
    incidentIds: ["PURSUE-005", "PURSUE-019", "PURSUE-021"],
  },
  {
    id: "DOC-123",
    title: "FBI PHOTO A1",
    source: "FBI",
    date: "Late 2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo A1
SOURCE: FBI
DATE: Late 2025
LOCATION: N/A
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. government system. The date and location of the event have not been provided.  The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.

Narrative Description: The monochrome image displays a uniform, grainy texture with a central crosshair reticle. A small, dark, and slightly irregular object is visible just below and to the right of the center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a1.png",
    incidentIds: ["PURSUE-017", "PURSUE-018"],
  },
  {
    id: "DOC-124",
    title: "FBI PHOTO A2",
    source: "FBI",
    date: "Late 2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo A2
SOURCE: FBI
DATE: Late 2025
LOCATION: N/A
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. government system. The date and location of the event have not been provided.  The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.

Narrative Description: The monochrome image displays a mottled background with a central crosshair reticle. A dark, circular object is located at the center of the reticle. The background has a textured, uneven appearance suggesting a varied landscape or surface. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a2.png",
    incidentIds: ["PURSUE-017", "PURSUE-018"],
  },
  {
    id: "DOC-125",
    title: "FBI PHOTO A3",
    source: "FBI",
    date: "Late 2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo A3
SOURCE: FBI
DATE: Late 2025
LOCATION: N/A
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. government system. The date and location of the event have not been provided.  The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.

Narrative Description: The monochrome image displays a mottled background with a central crosshair reticle. A dark, circular object is positioned exactly at the center of the reticle. The background shows a textured pattern, possibly depicting ground terrain. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a3.png",
    incidentIds: ["PURSUE-017", "PURSUE-018"],
  },
  {
    id: "DOC-126",
    title: "FBI PHOTO A4",
    source: "FBI",
    date: "Late 2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo A4
SOURCE: FBI
DATE: Late 2025
LOCATION: N/A
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. government system. The date and location of the event have not been provided.  The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.

Narrative Description: The monochrome image displays a mottled background with a central crosshair reticle. A dark, circular object is visible just below and to the right of the center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a4.png",
    incidentIds: ["PURSUE-017", "PURSUE-018"],
  },
  {
    id: "DOC-127",
    title: "FBI PHOTO A5",
    source: "FBI",
    date: "Late 2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo A5
SOURCE: FBI
DATE: Late 2025
LOCATION: N/A
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. government system. The date and location of the event have not been provided.  The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.

Narrative Description: The monochrome image displays a background with a dense, speckled pattern and a central crosshair reticle. A dark, circular object is located at the bottom quadrant and right of center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a5.png",
    incidentIds: ["PURSUE-017", "PURSUE-018"],
  },
  {
    id: "DOC-128",
    title: "FBI PHOTO A6",
    source: "FBI",
    date: "Late 2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo A6
SOURCE: FBI
DATE: Late 2025
LOCATION: N/A
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. government system. The date and location of the event have not been provided.  The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.

Narrative Description: The monochrome image displays a lightly textured background with a central crosshair reticle. A dark, circular object is positioned at the center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a6.png",
    incidentIds: ["PURSUE-017", "PURSUE-018"],
  },
  {
    id: "DOC-129",
    title: "FBI PHOTO A7",
    source: "FBI",
    date: "Late 2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo A7
SOURCE: FBI
DATE: Late 2025
LOCATION: N/A
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. government system. The date and location of the event have not been provided.  The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.

Narrative Description: The monochrome image displays a smooth, grainy background with a central crosshair reticle. A light-colored, circular object with a bright specular highlight is visible just below the center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a7.png",
    incidentIds: ["PURSUE-017", "PURSUE-018"],
  },
  {
    id: "DOC-130",
    title: "FBI PHOTO A8",
    source: "FBI",
    date: "Late 2025",
    classification: "DECLASSIFIED",
    redacted: true,
    body: `DOCUMENT TITLE: FBI Photo A8
SOURCE: FBI
DATE: Late 2025
LOCATION: N/A
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: DECLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
The Federal Bureau of Investigation (FBI) submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of a still image derived from a U.S. government system. The date and location of the event have not been provided.  The original imagery was altered with redactions before being submitted to AARO. An accompanying mission report was not provided. The operator reported that they were unable to positively identify the UAP.

Narrative Description: The monochrome image displays a background with faint, swirling patterns and a central crosshair reticle. A small, dark, irregular object is visible just below and to the right of the center of the reticle. This narrative description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a8.png",
    incidentIds: ["PURSUE-017", "PURSUE-018"],
  },
  {
    id: "DOC-131",
    title: "NASA-UAP-VM1, APOLLO 12, 1969",
    source: "NASA",
    date: "1969",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-VM1, Apollo 12, 1969
SOURCE: NASA
DATE: 1969
LOCATION: Moon
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This archival photograph depicts the lunar surface as viewed from the landing site of Apollo 12. This image features a highlighted area of interest slightly to the right of the vertical axis of the frame, above the horizon, in which unidentified phenomena are visible. 

This image has been modified from its original state to assist viewers in identifying specific areas of interest. These highlights are provided for contextual purposes only. Such alterations do not constitute an analytical judgment, investigative conclusion, or factual determination regarding the nature or significance of the subject matter.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm1-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
  },
  {
    id: "DOC-132",
    title: "NASA-UAP-VM2, APOLLO 12, 1969",
    source: "NASA",
    date: "1969",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-VM2, Apollo 12, 1969
SOURCE: NASA
DATE: 1969
LOCATION: Moon
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This archival photograph depicts the lunar surface as viewed from the landing site of Apollo 12. This image features two highlighted areas of interest, labeled “Area 1” and “Area 2,” slightly to the right of the vertical axis of the frame, above the horizon, in which unidentified phenomena are visible.

This image has been modified from its original state to assist viewers in identifying specific areas of interest. These highlights are provided for contextual purposes only. Such alterations do not constitute an analytical judgment, investigative conclusion, or factual determination regarding the nature or significance of the subject matter.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm2-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
  },
  {
    id: "DOC-133",
    title: "NASA-UAP-VM3, APOLLO 12, 1969",
    source: "NASA",
    date: "1969",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-VM3, Apollo 12, 1969
SOURCE: NASA
DATE: 1969
LOCATION: Moon
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This archival photograph depicts the lunar surface as viewed from the landing site of Apollo 12. This image features a highlighted area of interest near the right edge of the frame, above the horizon, in which unidentified phenomena are visible.
This image has been modified from its original state to assist viewers in identifying specific areas of interest. These highlights are provided for contextual purposes only. Such alterations do not constitute an analytical judgment, investigative conclusion, or factual determination regarding the nature or significance of the subject matter.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm3-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
  },
  {
    id: "DOC-134",
    title: "NASA-UAP-VM4, APOLLO 12, 1969",
    source: "NASA",
    date: "1969",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-VM4, Apollo 12, 1969
SOURCE: NASA
DATE: 1969
LOCATION: Moon
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This archival photograph depicts the lunar surface as viewed from the landing site of Apollo 12. This image features a highlighted area of interest slightly to the left of the vertical axis of the frame, above the horizon, in which unidentified phenomena are visible. 
This image has been modified from its original state to assist viewers in identifying specific areas of interest. These highlights are provided for contextual purposes only. Such alterations do not constitute an analytical judgment, investigative conclusion, or factual determination regarding the nature or significance of the subject matter.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm4-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
  },
  {
    id: "DOC-135",
    title: "NASA-UAP-VM5, APOLLO 12, 1969",
    source: "NASA",
    date: "1969",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-VM5, Apollo 12, 1969
SOURCE: NASA
DATE: 1969
LOCATION: Moon
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
This archival photograph depicts the lunar surface as viewed from the landing site of Apollo 12. This image features five highlighted areas of interest, labeled “Area 1” through “Area 5,” above the horizon, in which unidentified phenomena are visible.
This image has been modified from its original state to assist viewers in identifying specific areas of interest. These highlights are provided for contextual purposes only. Such alterations do not constitute an analytical judgment, investigative conclusion, or factual determination regarding the nature or significance of the subject matter.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm5-apollo-12-1969.jpg",
    incidentIds: ["PURSUE-002"],
  },
  {
    id: "DOC-136",
    title: "NASA-UAP-VM6, APOLLO 17, 1972",
    source: "NASA",
    date: "1972",
    classification: "UNCLASSIFIED",
    redacted: false,
    body: `DOCUMENT TITLE: NASA-UAP-VM6, Apollo 17, 1972
SOURCE: NASA
DATE: 1972
LOCATION: Moon
TYPE: STILL IMAGE / PHOTOGRAPH
CLASSIFICATION: UNCLASSIFIED

OFFICIAL DESCRIPTION (DEPARTMENT OF WAR):
As part of the review of historical UAP materials under PURSUE, DOW has opened a case to investigate the accompanying NASA photograph from the Apollo 17 mission, taken December 1972. The image contains three “dots” in a triangular formation in the lower right quadrant of the lunar sky that is clearly visible upon magnification of the image. While this photo has been previously released and discussed by keen observers, there is no consensus about the nature of the anomaly. New preliminary US government analysis suggests the image feature is potentially the result of a physical object in the scene. Additionally, as part of this investigation, the government has obtained the original film from the Apollo 17 mission and the results of the full NASA and DOW analysis will be released when completed.

FULL TEXT NOT YET INDEXED LOCALLY. VIEW ORIGINAL IMAGE VIA SOURCE LINK BELOW.

[[REDACT:LOCATION — REDACTED PER PURSUE GUIDANCE]]`,
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm6-apollo-17-1972.jpg",
    incidentIds: ["PURSUE-003"],
  }

];
