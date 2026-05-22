import type { EvidenceVideo } from "@/lib/types";

export const videos: EvidenceVideo[] = [
  {
    id: "VID-001",
    title: "GREECE // 90-DEG TURN @ 80 MPH",
    location: "Greece",
    date: "2023",
    durationSeconds: 14,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006080",
    description: "Object making 90-degree turns at approximately 80 mph.",
    incidentIds: ["PURSUE-006"],
  },
  {
    id: "VID-002",
    title: "INDO-PACIFIC // FOOTBALL-SHAPED OBJECT",
    location: "Indo-Pacific",
    date: "2024",
    durationSeconds: 22,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006107",
    description: "Football-shaped object documented from military platform.",
    incidentIds: ["PURSUE-007", "PURSUE-016"],
  },
  {
    id: "VID-003",
    title: "SYRIA // ORANGE ORB SEMI-TRANSPARENT",
    location: "Syria",
    date: "OCT 2024",
    durationSeconds: 8,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006078",
    description: "Two semi-transparent orange areas, 2 seconds each.",
    incidentIds: ["PURSUE-008"],
  },
  // note: not a row in the canonical PURSUE CSV's VID block. Catalog source
  // for this event is a slide-deck PDF (Western US event slides), not a
  // DVIDS video. Surfaced in the grid for narrative completeness; sourceUrl
  // links out to the deck.
  {
    id: "VID-004",
    title: "WESTERN US // ORB FORMATION",
    location: "Western United States",
    date: "2023",
    durationSeconds: 47,
    format: "EO",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/western_us_event_slides_5.08.2026.pdf",
    description: "Orange orbs emitting smaller red orbs in formation.",
    incidentIds: ["PURSUE-005", "PURSUE-019"],
  },
  {
    id: "VID-005",
    title: "MEDITERRANEAN // METALLIC TRIANGLE",
    location: "Mediterranean Sea",
    date: "2024",
    durationSeconds: 31,
    format: "IR",
    // Direct DVIDS clip not yet identified — closest CSV match is PR-28 (Greece, Jan 2024).
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/dow-uap-d54-mission-report-mediterranean-sea-na.pdf",
    description: "Triangular metallic object at 25,000 ft, gun-camera capture.",
    incidentIds: ["PURSUE-009"],
  },
  // note: catalog row for Apollo 17 is an IMG (NASA-UAP-VM6 .jpg), not a
  // DVIDS video. Rendered here in the video grid because the lunar event is
  // most legible as motion narrative; sourceUrl points to the canonical
  // image asset.
  {
    id: "VID-006",
    title: "APOLLO 17 // LUNAR ANOMALY",
    location: "Lunar Sky, Grimaldi vicinity",
    date: "DEC 1972",
    durationSeconds: 12,
    format: "EO",
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm6-apollo-17-1972.jpg",
    description: "Apollo 17 imagery sequence with anomaly highlighted.",
    incidentIds: ["PURSUE-003"],
  },
  // note: alt-framed entry pointing at the same DVIDS clip as VID-001
  // (DOW-UAP-PR34, Greece). Kept because the longer description and
  // incident-linkage are useful — but DVIDS row in the canonical CSV is
  // singular (1006080).
  {
    id: "VID-007",
    title: "GREECE // 90-DEG TURNS // OCEAN-SURFACE TRACK",
    location: "Greece (vicinity)",
    date: "OCT 2023",
    durationSeconds: 177,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006080",
    description: "2-minute 57-second infrared clip from 2023 of a UAP near the ocean surface executing multiple 90-degree turns at approximately 80 mph. Logged in PURSUE catalog as DOW-UAP-PR34.",
    incidentIds: ["PURSUE-006"],
  },
  {
    id: "VID-008",
    title: "UAE // UNRESOLVED UAP // DOW-UAP-PR26",
    location: "United Arab Emirates (vicinity)",
    date: "OCT 2023",
    durationSeconds: 18,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006063",
    description: "DOW-UAP-PR26 unresolved UAP report from CENTCOM AOR — IR sensor footage of unidentified object near UAE airspace.",
    incidentIds: ["PURSUE-014"],
  },
  {
    id: "VID-009",
    title: "CENTCOM // WHITE-LIGHT BALL // HALO EFFECT",
    location: "CENTCOM AOR",
    date: "2024",
    durationSeconds: 25,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006074",
    description: "One of three 2024 CENTCOM full-motion-video clips showing a 'misshapen and uneven ball of white light' with a 'light/glare halo effect'. Catalog match: DOW-UAP-PR29 (UAE / Gulf of Oman, June 2024).",
    incidentIds: ["PURSUE-016"],
  },
  // note: alt-framed entry pointing at the same DVIDS clip as VID-002
  // (DOW-UAP-PR47, INDOPACOM football body, 1006107). Single row in CSV.
  {
    id: "VID-010",
    title: "INDOPACOM // FOOTBALL-SHAPED BODY // NEAR JAPAN",
    location: "Near Japan (INDOPACOM)",
    date: "2024",
    durationSeconds: 20,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006107",
    description: "U.S. Indo-Pacific Command full-motion-video capture of a football-shaped body. Status: unresolved. Catalog match: DOW-UAP-PR47 (Japan, 2023).",
    incidentIds: ["PURSUE-007", "PURSUE-016"],
  },
  {
    id: "VID-011",
    title: "MIDDLE EAST // OPERATOR-SCREEN UAP // DOW-UAP-PR19",
    location: "Middle East (CENTCOM AOR)",
    date: "MAY 2022",
    durationSeconds: 9,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006056",
    description: "Video still from DOW-UAP-PR19: UAP crossing a military operator's full-motion-video screen during a CENTCOM-region sortie. Companion document: DOW-UAP-D10.",
    incidentIds: ["PURSUE-012", "PURSUE-015"],
  },
  {
    id: "VID-012",
    title: "SYRIA // OPERATOR-SCREEN UAP // DOW-UAP-PR22",
    location: "Syria",
    date: "JUL 2022",
    durationSeconds: 14,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006060",
    description: "DOW-UAP-PR22 unresolved UAP report. Mission report video from a July 2022 sortie in Syria; UAP crossing operator's screen. Companion document: DOW-UAP-D16.",
    incidentIds: ["PURSUE-013"],
  },
  {
    id: "VID-013",
    title: "GOFAST (RESOLVED) // USS THEODORE ROOSEVELT",
    location: "Off East Coast (Atlantic)",
    date: "2017",
    durationSeconds: 35,
    format: "IR",
    // GOFAST is hosted on AARO's Official UAP Imagery page; not a PURSUE Release-01 file.
    sourceUrl: "https://www.aaro.mil/UAP-Cases/Official-UAP-Imagery/",
    description: "Re-released GOFAST F/A-18 ATFLIR clip. Resolved by AARO in 2026: object was at ~13,000 ft, parallax explained the apparent low altitude and high speed.",
    incidentIds: ["PURSUE-022"],
  },
  {
    id: "VID-014",
    title: "WESTERN US // BLACK-HOT INFRARED // SEP 2025",
    location: "Western United States (undisclosed)",
    date: "SEP 2025",
    durationSeconds: 16,
    format: "IR",
    // FBI A-series in PURSUE Release-01 are still images, not videos. Direct video URL TBD.
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-a1.png",
    description: "Black-hot IR sequence of an unidentified object observed below a helicopter platform in the western U.S., September 2025. Catalog references FBI Photo A1-A8 still-image set.",
    incidentIds: ["PURSUE-017"],
  },
  {
    id: "VID-015",
    title: "WESTERN US // BLACK-HOT INFRARED // DEC 2025",
    location: "Western United States (undisclosed)",
    date: "DEC 2025",
    durationSeconds: 14,
    format: "IR",
    // FBI B-series PDFs (B1-B24) are the still-frame catalog entries. Direct video URL TBD.
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/fbi-photo-b1.pdf",
    description: "December 2025 black-hot infrared frames of UAP collected by FBI/DoD assets over the western U.S. Catalog references FBI Photo B1-B24 still-frame set.",
    incidentIds: ["PURSUE-018"],
  },
  {
    id: "VID-016",
    title: "APOLLO 17 // 'FOURTH OF JULY' OPERATOR TRANSCRIPT",
    location: "Lunar transit",
    date: "DEC 1972",
    durationSeconds: 28,
    format: "EO",
    // Apollo 17 PURSUE artifact is a transcript PDF (NASA-UAP-D2), not a video.
    sourceUrl: "https://www.war.gov/medialink/ufo/release_1/nasa-uap-d2-apollo-17-transcript-1972.pdf",
    description: "Apollo 17 cabin imagery and transcript audio: 'Looks like the Fourth of July out of Ron's window' — bright particles tumbling past spacecraft.",
    incidentIds: ["PURSUE-003"],
  },
  {
    id: "VID-017",
    title: "255-T-763-R1B-EXCERPT",
    location: "Low Earth Orbit",
    date: "1965-12-05",
    durationSeconds: 0,
    format: "EO",
    sourceUrl: "https://www.dvidshub.net/video/1006119",
    description: "This audio recording contains air to ground communications and the NASA Public Affairs audio feed with commentary, recorded during the flight of the Gemini VII mission. In this excerpted segment of audio, Astronaut Frank Borman reports to NASA mission control in Houston his sighting of an unidentified object, which he referred to as a \"bogey.\" This sighting occurred on December 5, 1965. The dialogue includes Borman's initial report, as well as additional comments by Astronaut Jim Lovell, Borman'",
  },
  {
    id: "VID-018",
    title: "DOW-UAP-PR19 / UNRESOLVED UAP REPORT / MIDDLE EAST / MAY 2022",
    location: "Middle East",
    date: "2022-05",
    durationSeconds: 5,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006056",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of five seconds of video footage from an infrared sensor aboard a U.S. military platform in 2022. An accompanying mission report, DoW-UAP-D10, described the observation as a “possible missile” moving across the field-of-view. The report also described four other objects not depicted in the video as “possible birds.”\n\nVideo Description: At the ",
    incidentIds: ["PURSUE-012", "PURSUE-015"],
  },
  {
    id: "VID-019",
    title: "DOW-UAP-PR21 / UNRESOLVED UAP REPORT / IRAQ / MAY 2022",
    location: "Iraq",
    date: "2022-05",
    durationSeconds: 10,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006059",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of ten seconds of video footage from an infrared sensor aboard a U.S. military platform in 2022. An accompanying mission report, DoW-UAP-D14, described the UAP as a “probable SU-27/35.\" \n\nVideo Description: The video depicts two areas of contrast moving together near the center of the field-of-view throughout the runtime.\n\nThis video des",
    incidentIds: ["PURSUE-012", "PURSUE-015"],
  },
  {
    id: "VID-020",
    title: "DOW-UAP-PR22 / UNRESOLVED UAP REPORT / SYRIA / JULY 2022",
    location: "Syria",
    date: "2022-07",
    durationSeconds: 14,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006060",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of 14 seconds of video footage from an infrared (left) and electro-optical (right) sensor aboard a U.S. military platform in 2022. An accompanying mission report, DoW-UAP-D16, described the UAP as “moving from north to south.”\n\nVideo Description: At the five second mark, the video depicts an object moving from right to left across the to",
    incidentIds: ["PURSUE-008", "PURSUE-013"],
  },
  {
    id: "VID-021",
    title: "DOW-UAP-PR23 / UNRESOLVED UAP REPORT / IRAQ / DECEMBER 2022",
    location: "Iraq",
    date: "2022-12",
    durationSeconds: 10,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006062",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of ten seconds of video footage from an infrared sensor aboard a U.S. military platform in 2022. An accompanying mission report, DoW-UAP-D18, described the UAP as \"flying west to east.\"\n\nVideo Description: The video depicts an area of contrast moving from the bottom left to the top right of the sensor field-of-view. At approximately six second",
  },
  {
    id: "VID-022",
    title: "DOW-UAP-PR26 / UNRESOLVED UAP REPORT / UNITED ARAB EMIRATES / OCTOBER 2023",
    location: "United Arab Emirates",
    date: "2023-10",
    durationSeconds: 43,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006063",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of 43 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2023. An accompanying mission report, DoW-UAP-D23, mentions a UAP was observed during the mission.\n\nVideo Description:\n00:00-00:17: An area of contrast remains generally within the top left quarter of the display.\n00:17-00:18: The sensor pans from right t",
    incidentIds: ["PURSUE-014"],
  },
  {
    id: "VID-023",
    title: "DOW-UAP-PR27 / UNRESOLVED UAP REPORT / UNITED ARAB EMIRATES / OCTOBER 2023",
    location: "United Arab Emirates",
    date: "2023-10",
    durationSeconds: 297,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006067",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of four minutes and 57 seconds of video footage from an infrared (IR) sensor aboard a U.S. military platform in 2023. An accompanying mission report, DoW-UAP-D23, mentions a UAP was observed during the mission.\n\nVideo Description:\n00:00-01:55: No content.\n01:56: An area of contrast becomes distinguishable against the background in the center o",
    incidentIds: ["PURSUE-014"],
  },
  {
    id: "VID-024",
    title: "DOW-UAP-PR28 / UNRESOLVED UAP REPORT / GREECE / JANUARY 2024",
    location: "Greece",
    date: "2024-01",
    durationSeconds: 65,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006073",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of one minute and five seconds of video footage captured via multiple sensor modalities aboard a U.S. military platform in 2024. An accompanying mission report, DoW-UAP-D7, described the UAP as “diamond-shaped” and moving at approximately 434 knots. The observer also reported that the UAP was only detectable via short-wave infrared (SWIR",
    incidentIds: ["PURSUE-006"],
  },
  {
    id: "VID-025",
    title: "DOW-UAP-PR29 / UNRESOLVED UAP REPORT / UNITED ARAB EMIRATES / JUNE 2024",
    location: "Gulf of Oman",
    date: "2024-06",
    durationSeconds: 21,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006074",
    description: "The United States Northern Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of 21 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2024. An accompanying mission report, DoW-UAP-D8, described the UAP as consisting of an object with a vertical pole or bar attached to the bottom of the object. The observer also reported that the UAP may instead be a reflection from an object in t",
  },
  {
    id: "VID-026",
    title: "DOW-UAP-PR31 / UNRESOLVED UAP REPORT / SYRIA / OCTOBER 2024",
    location: "Syria",
    date: "2024-10",
    durationSeconds: 5,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006076",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of five seconds of video footage from a full-motion video (FMV) camera aboard a U.S. military platform in 2024. An accompanying mission report, DoW-UAP-D32, described the UAP as consisting of a “misshapen and uneven ball of white light,” and reported that a “light/glare halo effect” occurred at the top of the FMV feed.\n\nVideo Description",
    incidentIds: ["PURSUE-008", "PURSUE-013"],
  },
  {
    id: "VID-027",
    title: "DOW-UAP-PR32 / UNRESOLVED UAP REPORT / SYRIA / OCTOBER 2024",
    location: "Syria",
    date: "2024-10",
    durationSeconds: 6,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006078",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of six seconds of video footage from a full-motion video (FMV) camera aboard a U.S. military platform in 2024. An accompanying mission report, DoW-UAP-D32, described the UAP as consisting of a “misshapen and uneven ball of white light,” and reported that a “light/glare halo effect” occurred at the top of the FMV feed.\n\nVideo Description:",
    incidentIds: ["PURSUE-008", "PURSUE-013"],
  },
  {
    id: "VID-028",
    title: "DOW-UAP-PR33 / UNRESOLVED UAP REPORT / SYRIA / OCTOBER 2024",
    location: "Syria",
    date: "2024-10",
    durationSeconds: 5,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006079",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of five seconds of video footage from a full-motion video (FMV) camera aboard a U.S. military platform in 2024. An accompanying mission report, DoW-UAP-D32, described the UAP as consisting of a “misshapen and uneven ball of white light,” and reported that a “light/glare halo effect” occurred at the top of the FMV feed.\n\nVideo Description",
    incidentIds: ["PURSUE-008", "PURSUE-013"],
  },
  {
    id: "VID-029",
    title: "DOW-UAP-PR34 / UNRESOLVED UAP REPORT / GREECE / OCTOBER 2023",
    location: "Greece",
    date: "2023-10",
    durationSeconds: 177,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006080",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of two minutes and 57 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2023. An accompanying mission report, DoW-UAP-D33, described the UAP as flying near the surface of the ocean and making multiple “90-degree turns” at approximately 80 miles per hour.\n\nVideo Description:\n00:04: An area of contrast ent",
    incidentIds: ["PURSUE-006"],
  },
  {
    id: "VID-030",
    title: "DOW-UAP-PR35 / UNRESOLVED UAP REPORT / GREECE / OCTOBER 2023",
    location: "Greece",
    date: "2023-10",
    durationSeconds: 24,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006082",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of 24 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2023. An accompanying mission report, DoW-UAP-D35, described the UAP as small and circular, flying near the surface of the ocean toward land.\n\nVideo Description:\n00:02: The sensor narrows its field-of-view to zoom in on an area of contrast near the ",
    incidentIds: ["PURSUE-006"],
  },
  {
    id: "VID-031",
    title: "DOW-UAP-PR36 / UNRESOLVED UAP REPORT / MIDDLE EAST / MAY 2020",
    location: "Middle East",
    date: "2020-05",
    durationSeconds: 137,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006083",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of two minutes and 17 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2020. An accompanying Range Fouler report, DoW-UAP-D38, described the UAP as a solid white object making erratic movements above the water.\n\nVideo Description:\n00:05: An area of contrast briefly enters the sensor field-of-view from t",
  },
  {
    id: "VID-032",
    title: "DOW-UAP-PR37 / UNRESOLVED UAP REPORT / MIDDLE EAST / 2020",
    location: "Arabian Gulf",
    date: "2020",
    durationSeconds: 9,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006087",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of nine seconds of video footage from an infrared sensor aboard a U.S. military platform in 2020. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:06-00:08: An area of contrast enters the sensor field-of-view from the bottom left quarter of the screen, follows a generally linear path from ",
  },
  {
    id: "VID-033",
    title: "DOW-UAP-PR38 / UNRESOLVED UAP REPORT / MIDDLE EAST / 2013",
    location: "Middle East",
    date: "2013",
    durationSeconds: 106,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006088",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of one minute and 46 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2013. The reporter did not provide any oral or written description of the observation.\n\nVideo Description: This video depicts an area of contrast resembling an eight-pointed star with arms of alternating length.\n00:10: The sensor field-of-v",
  },
  {
    id: "VID-034",
    title: "DOW-UAP-PR39 / UNRESOLVED UAP REPORT / MIDDLE EAST / 2020",
    location: "Arabian Gulf",
    date: "2020",
    durationSeconds: 5,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006089",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of five seconds of video footage from an infrared sensor aboard a U.S. military platform in 2020. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:03-00:05: A faint area of contrast enters the sensor field-of-view from the bottom half of the right edge of the screen, proceeds from right to",
  },
  {
    id: "VID-035",
    title: "DOW-UAP-PR40 / UNRESOLVED UAP REPORT / MIDDLE EAST / 2020",
    location: "Arabian Gulf",
    date: "2020",
    durationSeconds: 63,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006093",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of one minute and three seconds of video footage from an infrared sensor aboard a U.S. military platform in 2020. The original reporter digitally altered the imagery by pausing the video playback and adding a white line encircling an area of interest at timestamp 00:10, annotated with the phrase “U/I SMALL THERMAL SIGNATURE.” AARO did not edit",
  },
  {
    id: "VID-036",
    title: "DOW-UAP-PR41 / UNRESOLVED UAP REPORT / MIDDLE EAST / 2020",
    location: "Arabian Gulf",
    date: "2020",
    durationSeconds: 94,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006094",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of one minute and 34 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2020. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:01: An area of contrast enters the sensor field-of-view from the bottom third of the left side of the screen.\n00:02-01:34: The sen",
  },
  {
    id: "VID-037",
    title: "DOW-UAP-PR42 / UNRESOLVED UAP REPORT / MIDDLE EAST / 2020",
    location: "Arabian Gulf",
    date: "2020",
    durationSeconds: 293,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006097",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of four minutes and 53 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2020. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:00-00:12: An area of contrast enters the sensor field-of-view from the bottom left corner of the frame. The sensor pans to track",
  },
  {
    id: "VID-038",
    title: "DOW-UAP-PR43 / UNRESOLVED UAP REPORT / AFRICA / 2025",
    location: "Djibouti",
    date: "2025",
    durationSeconds: 2,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006159",
    description: "The United States Africa Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of two seconds of video footage from an infrared sensor aboard a U.S. military platform in 2025. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:00-00:02: A small, barely distinguishable area of contrast moves from the left side of the sensor field-of-view to the right side, exiting the sc",
  },
  {
    id: "VID-039",
    title: "DOW-UAP-PR44 / UNRESOLVED UAP REPORT / MIDDLE EAST / 2020",
    location: "Arabian Gulf",
    date: "2020",
    durationSeconds: 311,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006104",
    description: "The United States Central Command submitted a report of an unidentified anomalous phenomenon (UAP) to the All-domain Anomaly Resolution Office (AARO) consisting of five minutes and 11 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2020. The reporter did not provide any oral or written description of the observation.\n\nVideo Description: This video features incidentally recorded audio, which does not relate to the visual content described below.\n00:00-00:30: No",
  },
  {
    id: "VID-040",
    title: "DOW-UAP-PR45 / UNRESOLVED UAP REPORT / MIDDLE EAST / 2020",
    location: "Southern United States",
    date: "2020",
    durationSeconds: 58,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006105",
    description: "The Department of the Air Force submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of 58 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2020. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:00-00:03: The sensor tracks an area of contrast acquiring a reticle lock.\n00:04-00:30: The area of contrast gradually increases in distinctiveness ",
  },
  {
    id: "VID-041",
    title: "DOW-UAP-PR46 / UNRESOLVED UAP REPORT / INDOPACOM / 2024",
    location: "East China Sea",
    date: "2024",
    durationSeconds: 9,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006106",
    description: "The United States Indo-Pacific Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of nine seconds of video footage from an infrared sensor aboard a U.S. military platform in 2024. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:00-00:09: The sensor focuses on an area of contrast that resembles a football-shaped body with three radial projections: one oriented vert",
    incidentIds: ["PURSUE-007", "PURSUE-016"],
  },
  {
    id: "VID-042",
    title: "DOW-UAP-PR47 / UNRESOLVED UAP REPORT / INDOPACOM / 2023",
    location: "Japan",
    date: "2023",
    durationSeconds: 119,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006107",
    description: "The United States Indo-Pacific Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of one minute and 59 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2023. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:00-01:59: The sensor tracks three distinct areas of contrast, maintaining their positions generally within the center of the ",
    incidentIds: ["PURSUE-007", "PURSUE-016"],
  },
  {
    id: "VID-043",
    title: "DOW-UAP-PR48 / UNRESOLVED UAP REPORT / INDOPACOM / 2024",
    location: "Indo-PACOM",
    date: "2024",
    durationSeconds: 99,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006110",
    description: "The United States Indo-Pacific Command submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of one minute and 39 seconds of video footage from an infrared sensor aboard a U.S. military platform in 2024. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:00-01:39: The sensor tracks an area of contrast, maintaining its position generally within the center of the frame.\n\nThis vid",
    incidentIds: ["PURSUE-007", "PURSUE-016"],
  },
  {
    id: "VID-044",
    title: "DOW-UAP-PR49 / UNRESOLVED UAP REPORT / DEPARTMENT OF THE ARMY / 2026",
    location: "North America",
    date: "2026",
    durationSeconds: 109,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1006111",
    description: "The Department of the Army submitted a report of an unidentified anomalous phenomenon to the All-domain Anomaly Resolution Office (AARO) consisting of one minute and 49 seconds of video from an infrared sensor aboard a U.S. military platform in 2026. The reporter did not provide any oral or written description of the observation.\n\nVideo Description:\n00:00-00:08: The sensor tracks an initial area of interest.\n00:09-00:16: The sensor disengages from its previous area of focus and pans from right t",
  },
{
    id: "VID-045",
    title: "DOW-UAP-PR050 / 4 UAP FORMATION IRAN 26 AUG 2022 OVER WATER [CALLSIGN]",
    location: "CENTCOM",
    date: "2022",
    durationSeconds: 20,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007706",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “4 UAP Formation Iran 26 Aug 2022 over water [CALLSIGN],” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2022. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:00:20
Video Description:
00:01-00:04: Four areas of contrast transit the sensor field-of-view, entering from the lower third of the left side of the screen and exiting near the center of the bottom of the frame.
00:05-00:06: An area of contrast enters the sensor field-of-view from the top left corner of the screen.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-046",
    title: "DOW-UAP-PR051 / SYRIAN UAP INSTANT ACCELERATION",
    location: "CENTCOM",
    date: "2021",
    durationSeconds: 302,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007707",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Syrian UAP instant acceleration,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2021. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:05:02
Video Description: This media was digitally altered prior to its upload to a classified network, and is presented as received.
00:01-00:19: The sensor pans to maintain the position of an area of contrast within the center of the frame.
00:20-00:21: The sensor stops tracking the area of contrast, causing it to rapidly exit the right side of the frame.
00:22-00:27: No content.
00:27-00:29 A black screen appears featuring the phrase “white edge threshold enhancement in attempt to highlight UAP shape. Original clip excerpt at 100% speed.” 
00:30-00:50: The video replays with digital alterations applied.
00:51-00:53: A black screen appears featuring the phrase “50% speed.”
00:54-01:05: The video replays with digital alterations applied.
01:06-01:08: A black screen appears featuring the phrase “25% speed.”
01:09-01:35: The video replays with digital alterations applied.
01:36-01:41: A black screen appears featuring the phrase “B/W values inverted, picture zoomed”
01:42-02:03: The video replays with digital alterations applied.
02:04-02:09: A black screen appears featuring the phrase “full original clip TRT: 2:52”
02:10-03:49: The video replays, showing additional footage of the area of contrast at its original resolution on a far zoom.
03:50-04:02: The sensor rapidly zooms in and out.
04:03-04:28: The sensor focuses and zooms in, locking a reticle around the area of contrast.
04:29-5:01: The video replays 00:20-00:21, the period in which the sensor stops tracking the area of contrast, causing it to rapidly exit the right side of the frame.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-047",
    title: "DOW-UAP-PR052 / UAP USO FORMATION [CALLSIGN] (MISSION)",
    location: "Undisclosed",
    date: "2026-05-22",
    durationSeconds: 496,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007708",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “UAP USO Formation [CALLSIGN] (Mission),” is likely derived from an infrared sensor aboard a U.S. military platform. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:08:16
Video Description: This media was digitally altered prior to its upload to a classified network, and is presented as received.

00:00-00:05: Four areas of contrast transit the frame from the bottom third of the left side to the bottom third of the right side of the frame.
00:06-00:38: The video appears to cut, refocusing on four areas of contrast. Visual elements of the sensor display enter and exit the frame.
00:39-06:08: The video seems to cut multiple times, applying various contrast filters and zoom levels. Visual elements of the sensor display enter and exit the frame.
06:09-06:50: The sensor zooms in on four areas of contrast.
06:51-08:10: The areas of contrast become increasingly indistinct over time as the video quality degrades.
08:11-08:15: Video appears to cut, or zoom out, likely cutting to an earlier portion of the video, with the areas of contrast more visible.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-048",
    title: "DOW-UAP-PR053 / CIGAR SHAPED OR FAST SHERICAL UAP CLIP 15 OCT 22",
    location: "CENTCOM",
    date: "2022",
    durationSeconds: 21,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007709",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Cigar Shaped or Fast Spherical UAP clip 15 OCT 22,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in October 2022. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:00:21
Video Description: This media was digitally altered prior to its upload to a classified network, and is presented as received.

00:01-00:04: An area of contrast transits the sensor field-of-view from left to right. 
00:06-00:14: The video replays at a slower speed.
00:15-00:21: The video replays again at an even slower speed.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-049",
    title: "DOW-UAP-PR054 / SPHERICAL UAP ERRATIC MOVEMENT [CALLSIGN] (MISSION) 2022",
    location: "EUCOM",
    date: "2022",
    durationSeconds: 237,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007711",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is “Spherical UAP Erratic movement [CALLSIGN] (Mission) 2022,” is likely derived from an infrared sensor aboard a U.S. military platform operating in the United States European Command area of responsibility in August 2022. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:03:57
Video Description: This media was digitally altered prior to its upload to a classified network, and is presented as received. 

00:00-00:45: The video features an area of contrast generally within the center the frame. The sensor pans to track the area of contrast. Digital alterations to the video footage significantly influence the area of contrast’s apparent performance characteristics.
00:46-03:57: The video appears to cut, refocusing on an area of contrast generally within the center of the frame. The area of contrast intermittently passes in and out of frame as the sensor pans to track it.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-050",
    title: "DOW-UAP-PR055 / SPHERICAL UAP OVER AFG IN AND OUT OF CLOUDS 23 NOV 2020",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 47,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007713",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Spherical UAP over AFG in and out of clouds 23 Nov 2020,” is likely derived from an infrared sensor aboard a U.S. military platform operating in the United States Central Command area of responsibility in November 2020. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:00:47
Video Description: This media was digitally altered prior to its upload to a classified network, and is presented as received.

00:00-00:02: A black screen appears featuring the phrase “zoomed in.”
00:03-00:10: An area of contrast becomes visible near the top left corner of the screen, transiting from left to right before losing distinctiveness against the background.
00:11-00:12: A black screen appears featuring the phrase “sharpened, zoomed motion tracked contrast enhanced slow to 60% speed.”
00:12-00:28: The video replays at reduced speed and increased zoom level.
00:28-00:29: A black screen appears featuring the phrase, “original video.”
00:30-00:47: An area of contrast appears near the center of the top of the frame, transits downward to the left, before moving to the right and losing distinctiveness against the background.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-051",
    title: "DOW-UAP-PR056 / SPHERICAL UAP PULSING OVER WATER [CALLSIGN]",
    location: "Undisclosed",
    date: "2026-05-22",
    durationSeconds: 212,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007718",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Spherical UAP pulsing over water [CALLSIGN],” is likely derived from an infrared sensor aboard a U.S. military platform. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:03:32
Video Description: This media was digitally altered prior to its upload to a classified network, and is presented as received.

00:01-0:47: The video features an area of contrast generally within the center of the frame.
00:48-00:52: The sensor briefly switches contrast modes, with the area of contrast remaining generally within the center of the frame.
00:53-03:32: The sensor returns to its original contrast mode, with the area of contrast remaining generally within the center of the frame.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-052",
    title: "DOW-UAP-PR057 / A, \"SPHERICAL UAP IN CLOUDS",
    location: "Yellow Sea",
    date: "2023",
    durationSeconds: 0,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007720",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody. 
AARO assesses that this video, whose uploader-defined title is, “Spherical UAP in clouds,” is likely derived from an infrared sensor aboard a U.S. military platform operating above the Yellow Sea in January 2023. A user uploaded this video to a classified network in June 2024.

Video Duration: 1:10
Video Description: 
00:00-00:06: No content.
00:07-00:08: An area of contrast enters the sensor field-of-view from left and exits near the center of the right side of the frame.
00:09-00:20: The sensor pans and cycles zoom levels multiple times.
00:21-00:31: An area of contrast enters the frame from the left side of the screen. The area of contrast becomes indistinguishable against the background.
00:32-00:34: The sensor zooms in. An area of contrast becomes distinguishable against the background near the center of the frame.
00:35-00:52: The sensor pans to track the area of contrast from left to right.
00:53-00:56: The sensor zooms in. An area of contrast transits the sensor field-of-view from left to right in the bottom third of the frame. 
00:57-01:10: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

AARO Comment: This media is a duplicate of DOW-UAP-PR57b, alternately titled, “[Platform] observes UAP in East China Sea 05 JAN 2023 INDOPACOM.” This discrepancy exists because two uploaders titled the underlying material differently on a classified network.`,
  },
  {
    id: "VID-053",
    title: "DOW-UAP-PR057 / B, \"[PLATFORM] OBSERVES UAP IN EAST CHINA SEA 05 JAN 2023 INDOPACOM",
    location: "Yellow Sea",
    date: "2023",
    durationSeconds: 0,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007720",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody. 

AARO assesses that this video, whose uploader-defined title is, “Spherical UAP in clouds,” is likely derived from an infrared sensor aboard a U.S. military platform operating above the Yellow Sea in January 2023. A user uploaded this video to a classified network in June 2024.

Video Duration: 1:10
Video Description: 
00:00-00:06: No content.
00:07-00:08: An area of contrast enters the sensor field-of-view from left and exits near the center of the right side of the frame.
00:09-00:20: The sensor pans and cycles zoom levels multiple times.
00:21-00:31: An area of contrast enters the frame from the left side of the screen. The area of contrast becomes indistinguishable against the background.
00:32-00:34: The sensor zooms in. An area of contrast becomes distinguishable against the background near the center of the frame.
00:35-00:52: The sensor pans to track the area of contrast from left to right.
00:53-00:56: The sensor zooms in. An area of contrast transits the sensor field-of-view from left to right in the bottom third of the frame. 
00:57-01:10: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

AARO Comment: This media is a duplicate of DOW-UAP-PR57a, alternately titled, “Spherical UAP in clouds.” This discrepancy exists because two uploaders titled the underlying material differently on a classified network.`,
  },
  {
    id: "VID-054",
    title: "DOW-UAP-PR058 / [CALLSIGN] (MISSION) UAP",
    location: "INDOPACOM",
    date: "2026-05-22",
    durationSeconds: 648,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007723",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “[CALLSIGN] (Mission) UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Indo-Pacific Command area of responsibility. A user uploaded this video to a classified network in June 2024. 

Video Duration: 00:10:48
Video Description: This media was digitally altered prior to its upload to a classified network, and is presented as received.

00:01-00:04: A black screen appears featuring the phrase, “[CALLSIGN] recording - 8x speed possible changes of shape stabilized and enhanced 38 secs.”
00:05-00:41: An area of contrast remains centered within the frame. Visual elements of the sensor display enter and exit the frame intermittently throughout.
00:42-00:45: A black screen appears featuring the phrase, “UAP recording original speed stabilized, sharpened, contrast enhanced 5 min.”
00:46-05:45: An area of contrast remains generally within the center of the frame. The sensor cycles contrast modes multiple times.
05:46-05:48: A black screen appears featuring the phrase, “UAP recording original clip 5 minutes.” 
05:49-10:48: The sensor pans to track an area of contrast keeping it generally within the center of the frame. The overall quality of the footage progressively degrades throughout.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-055",
    title: "DOW-UAP-PR059 / NAG UAP 1 JUN 20",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 291,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007727",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “NAG UAP 1 Jun 20,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:04:51
Video Description:
00:02-00:36: An area of contrast appears in the sensor field-of-view. The sensor zooms and pans to keep the area of contrast in the field-of-view. 
00:37-03:37: The sensor continues to pan to track the area of contrast, highlighting it with a reticle.
03:38: The area of contrast exits the sensor field-of-view, leaving the frame in the bottom left quarter of the screen. 
03:39-04:35: The sensor zooms out, pans to track the area of contrast, and zooms in to keep the area of contrast in the field-of-view.
04:36-04:51: The sensor cycles zoom levels to keep the area of contrast within the sensor field-of-view.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-056",
    title: "DOW-UAP-PR060 / SPHERICAL UAP [CALLSIGN] 2021/04/12 OBJ 2",
    location: "CENTCOM",
    date: "2021",
    durationSeconds: 290,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007734",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Spherical UAP [CALLSIGN] 2021/04/12 obj 2,” is likely derived from a full-motion video camera and an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2021. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:04:50
Video Description:
00:00-00:26: An area of contrast transits the sensor field-of-view from right to left. The sensor pans and zooms in and out to track the area of contrast.
00:27-02:04: The area of contrast re-enters the sensor field-of-view. The sensor pans to the left and up to track it.
02:05-04:50: The sensor refocuses on the original subject matter of the video.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-057",
    title: "DOW-UAP-PR061 / SPHERICAL UAP [CALLSIGN] 2021/04/12 VID 0",
    location: "CENTCOM",
    date: "2021",
    durationSeconds: 286,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007735",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is “Spherical UAP [CALLSIGN] 2021/04/12 vid 0,” is likely derived from a full-motion video camera and an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2021. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:04:46
Video Description:
03:02-04:00: An area of contrast enters the sensor field-of-view from the upper right corner of the frame, exiting in the bottom right corner of the screen. The sensor pans to track the area of contrast, centering it within the sensor field-of-view.
04:01-04:46: The sensor changes modes as the area of contrast becomes indistinct against the background.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-058",
    title: "DOW-UAP-PR062 / SPHERICAL UAP [CALLSIGN] 2021/04/12 VID 1",
    location: "CENTCOM",
    date: "2021",
    durationSeconds: 289,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007739",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Spherical UAP [CALLSIGN] 2021/04/12 vid 1,” is likely derived from a color and infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2021. A user uploaded this video to a classified network in May 2024.

Video Duration: 00:04:49
Video Description:
00:00-04:49: The sensor pans and cycles zoom levels to track an area of contrast, keeping it generally within the center of the sensor field-of-view.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-059",
    title: "DOW-UAP-PR063 / SPHERICAL UAP [CALLSIGN] 2021/04/12 VID 2",
    location: "CENTCOM",
    date: "2021",
    durationSeconds: 289,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007740",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Spherical UAP [CALLSIGN] 2021/04/12 vid 2,” is likely derived from a full-motion video camera and an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2021. A user uploaded this video to a classified network in May 2024.

Video Duration: 00:04:49
Video Description:
00:00-00:49: The sensor pans to track an area of contrast, keeping it generally within the center of the sensor field-of-view.
00:50: The sensor pans away from the area of contrast.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-060",
    title: "DOW-UAP-PR064 / AFSOC KABUL UAP JUL 2017",
    location: "CENTCOM",
    date: "2026-05-22",
    durationSeconds: 17,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007741",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “AFSOC Kabul UAP Jul 2017,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:00:17
Video Description:
00:00-00:13: No content.
00:14-00:15: An area of contrast moves into the sensor field-of-view from the left edge and moves to the right edge out of the field-of-view.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-061",
    title: "DOW-UAP-PR065 / USCG C-144 TYNDALL UAP 2 TIC TAC IR HOT 24 APRIL 2024",
    location: "Southeastern United States",
    date: "2024",
    durationSeconds: 38,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007777",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “USCG C-144 Tyndall UAP 2 TIC TAC IR hot 24 April 2024,” is likely derived from an infrared sensor aboard a U.S. Coast Guard platform operating in the Southeastern United States in 2024. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:00:38
Video Description:
00:00-00:32: A sensor pans to keep an area of contrast in its field-of-view.
00:33: The sensor pans to the left causing the area of contrast to leave the field-of-view on the right side of the frame.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-062",
    title: "DOW-UAP-PR066 / USCG C-144 TYNDALL UAP 1 TIC TAC IR HOT 24 APRIL 2024",
    location: "Southeastern United States",
    date: "2024",
    durationSeconds: 48,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007778",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “USCG C-144 Tyndall UAP 1 TIC TAC IR hot 24 April 2024,” is likely derived from an infrared sensor aboard a U.S. Coast Guard platform operating in the Southeastern United States in 2024. A user uploaded this video to a classified network in June 2024.

Video Duration: 00:00:48
Video Description:
00:09-00:15: An area of contrast appears from the upper right side of the screen. The sensor does not pan to track the area of contrast, causing it to leave the field-of-view on the left side of the frame. 
00:33-00:48: An area of contrast enters the field-of-view from the lower right side of the screen and leaves the field-of-view on the lower left side of the screen. The sensor pans to the left, but is unable to track the area of contrast.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-063",
    title: "DOW-UAP-PR067 / MULTIPLE SPHERICAL UAP USO NEAR SUB. [CALLSIGN] 2022/03/25 IN AND OUT OF WATER",
    location: "Undisclosed",
    date: "2026-05-22",
    durationSeconds: 290,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007779",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Multiple Spherical UAP USO near Sub. [CALLSIGN] 2022/03/25 in and out of water,” is likely derived from an infrared sensor aboard a U.S. military platform. A user uploaded this video to a classified network in May 2024.

Video Duration: 00:04:50
Video Description:
00:45-00:56: An area of contrast enters the field-of-view from the bottom left side of the screen and moves to the bottom right of the screen. The sensor pans to track the area of contrast. 
00:57-01:10: A second area of contrast enters the field-of-view from the bottom right side of the screen. The sensor pans to keep both objects in its field-of-view, but the second object briefly leaves the field of view off the right side of the screen. The first area of contrast leaves the field-of-view off the right side of the frame, and the sensor pans to continue tracking the second object, which then appears from the middle of the left side of the frame.
01:11-01:35: The sensor continues to pan to track the second area of contrast.
01:36: The sensor zooms out, losing view of the second area of contrast.
02:11-03:05: An area of contrast enters the field-of-view from the lower right side of the screen, moves off the left side of the screen, and the sensor pans to track it. The area of contrast reenters the field-of-view from the lower right side of the screen and the sensor continues to pan to track it.
04:09-04:37: An area of contrast enters the field-of-view from the right side of the screen, crosses the field-of-view, and the sensor pans to track it.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-064",
    title: "DOW-UAP-PR068 / IIR 1 666 S0151 23/VIDEO FOOTAGE OF UNIDENTIFIED AERIAL PHENOMENON (UAP) CAPTURED BY FIFTH GENERATION AIRCRAFT ON 20 JAN 23",
    location: "NORTHCOM",
    date: "2023",
    durationSeconds: 63,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007780",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “IIR 1 666 S0151 23/Video Footage of Unidentified Aerial Phenomenon (UAP) captured by fifth generation aircraft on 20 Jan 23,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Northern Command area of responsibility in 2023. A user uploaded this video to a classified network in July 2023.

Video Duration: 00:01:03
Video Description:
00:00-00:31: A sensor tracks an area of contrast, keeping it generally within the center of the field-of-view.
00:32-01:03: The area of contrast briefly moves in and out of the field-of-view from the top of the frame as the sensor pans to track it.
00:48: A second area of contrast becomes visible in the upper right quarter of the screen.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-065",
    title: "DOW-UAP-PR069 / F/A-18 FLIR UAP",
    location: "NORTHCOM",
    date: "2026-05-22",
    durationSeconds: 29,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007781",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “F/A-18 FLIR UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Northern Command area of responsibility in 2022. A user uploaded this video to a classified network in July 2023.

Video Duration: 00:00:29
Video Description: A sensor pans to track an area of contrast. At the 14 second mark, a reticle surrounds the area of contrast. At the 27 second mark, the reticle loses its track on the area of contrast.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-066",
    title: "DOW-UAP-PR070 / IIR 1 655 S0301 23/EGLIN AFB AIRCREW OBSERVED UNIDENTIFIED AERIAL PHENOMENA (UAP) ON 13 FEB 23",
    location: "Southeastern United States",
    date: "2023",
    durationSeconds: 30,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007783",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “IIR 1 655 S0301 23/Eglin AFB Aircrew Observed Unidentified Aerial Phenomena (UAP) on 13 Feb 23,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Northern Command area of responsibility in 2023. A user uploaded this video to a classified network in March 2023.

Video Duration: 00:00:30
Video Description: A sensor pans to keep an area of contrast in the center of its field-of-view, cycling contrast modes multiple times. At the 22 second mark, the area of contrast loses distinctiveness against the background.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-067",
    title: "DOW-UAP-PR071 / USAF ANG F-16C (CALLSIGN [CALLSIGN]) SHOOTS DOWN UAP OVER LAKE HURON WITH [WEAPON SYSTEM], 12 FEB 2023",
    location: "NORTHCOM",
    date: "2023",
    durationSeconds: 46,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007784",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “USAF ANG F-16C (callsign [CALLSIGN]) Shoots Down UAP over Lake Huron with [Weapon System], 12 Feb 2023,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Northern Command area of responsibility in 2023. A user uploaded this video to a classified network in February 2023.

Video Duration: 00:00:46
Video Description: At the 11 second mark, the sensor focuses on an area of contrast in the center of its field-of-view. At the 20 second mark, the footage appears to depict a kinetic interaction between two distinct areas of contrast, with the initial subject of the footage fragmenting in a radial displacement pattern that suggests a high-energy event.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-068",
    title: "DOW-UAP-PR072 / ADMINISTRATIVE REVISION: IIR 1777 J0032 22 KAZAKHSTAN - UAP IN THE VICINITY OF KARAGANDA INTERNATIONAL AIRPORT",
    location: "Kazakhstan",
    date: "2022",
    durationSeconds: 17,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007788",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “ADMINISTRATIVE REVISION: IIR 1777 J0032 22 Kazakhstan - UAP in the vicinity of Karaganda International Airport,” is likely derived from a commercially available cellular device’s rear-facing camera in March 2022. A user uploaded this video to a classified network in April 2023. 

Video Duration: 00:00:17
Video Description: This media was digitally altered prior to its upload to a classified network, and is presented as received.

00:00-00:03: No Content.
00:04-00:12: The video fades in from black to show a luminous phenomenon with trails of diminishing brightness extending from the center. The camera pans left and right, and zooms in on the phenomenon.
00:13: Video fades to black.
00:14-00:17: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-069",
    title: "DOW-UAP-PR073 / IIR 1 655 S0053 23/SEVERAL UNIDENTIFIED AERIAL PHENOMENON ENCOUNTERED IN THE VICINITY OF COLUMBUS OH",
    location: "Midwestern United States",
    date: "2022",
    durationSeconds: 88,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007790",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “IIR 1 655 S0053 23/Several Unidentified Aerial Phenomenon Encountered In The Vicinity of Columbus OH,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Northern Command area of responsibility in November 2022. A user uploaded this video to a classified network in March 2023.

Video Duration: 00:01:28
Video Description:
00:00-00:04: No content.
00:05-00:07: The sensor pans to center a small area of contrast within its field-of-view.
00:11-00:37: The sensor cycles contrast modes and zoom levels while the area of contrast remains generally within the sensor field-of-view.
00:38-00:41: The orientation of the sensor relative to the area of contrast causes the area of contrast to appear to rotate.
00:42-01:14: A second area of contrast enters the frame from near the center of the top of the screen. It transits the sensor field-of-view, before becoming obscured by a redacted visual element of the sensor display.
01:17: The initial area of contrast loses distinctiveness against the background.
01:20: The sensor rotates, causing the second area of contrast to re-enter the scene before exiting the frame at the center of the top of the screen.
01:23-01:28: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-070",
    title: "DOW-UAP-PR074 / [CALLSIGN] (MISSION)HD_20220613",
    location: "CENTCOM",
    date: "2022",
    durationSeconds: 285,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007791",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “[CALLSIGN] (Mission) HD_20220613,” is likely derived from an infrared sensor aboard a U.S. military platform operating in the United States Central Command area of responsibility in June 2022. A user uploaded this video to a classified network in June 2022.

Video Duration: 00:04:45
Video Description:
00:00-00:10: The sensor pans from right to left tracking an area of contrast moving towards the center of the field-of-view, before losing distinctiveness against the background.
00:11-00:14: The sensor zooms in. An area of contrast transits the sensor field-of-view, entering from the right and exiting from the left side of the frame.
00:15-00:43: The sensor zooms out to track an area of contrast.  
00:44-00:47: The sensor zooms in. An area of contrast transits the sensor field-of-view, entering from the right and exiting from the left side of the frame.
00:48-01:05: The sensor cycles its zoom settings multiple times.
01:06-01:13: A small area of contrast transits from the right to the center of the sensor field-of-view.
01:14-01:18: The sensor zooms in on an area of contrast. The area of contrast transits from the right to the center of the frame while the sensor pans up.
01:19-02:05: The sensor zooms and pans to track the area of contrast until it exits the field-of-view at the top of the display.
02:06-03:42: No content.
03:43-03:47: Several areas of contrast become visible near the center of the sensor field-of-view.
03:48-03:50: No content.
03:51-04:00: Four small areas of contrast become visible in the center of the sensor field-of-view. The sensor pans to track the areas of contrast.
04:01-04:21: The sensor cycles its zoom level out and pans to the right to track an area of contrast in the bottom right of the field-of-view.
04:22-04:39: The sensor cycles its zoom level to focus on an area of contrast multiple times.
04:40-04:43: The sensor switches modalities and refocuses on an area of contrast centered in its field-of-view.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-071",
    title: "DOW-UAP-PR075 / 09JUN2021 [PLATFORM] OBSERVED UAP IN THE ECS",
    location: "East China Sea",
    date: "2021",
    durationSeconds: 23,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007795",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “09JUN2021 [Platform] observed UAP in the ECS,” is likely derived from an infrared sensor aboard a U.S. military platform operating above the East China Sea in 2021. A user uploaded this video to a classified network in June 2021.

Video Duration: 00:00:23
Video Description:
00:01-00:18: The sensor pans to track an area of contrast. At the 18 second mark, the sensor loses sight of the object.
00:19-00:23: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-072",
    title: "DOW-UAP-PR076 / 03 JANUARY 2021 [CALLSIGN] (MISSION) OBSERVES UAP",
    location: "CENTCOM",
    date: "2021",
    durationSeconds: 297,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007804",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is “03 January 2021 [CALLSIGN] (Mission) observes UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in January 2021. A user uploaded this video to a classified network in January 2021.

Video Duration: 00:04:57
Video Description:
00:00-01:51: No content.
01:52-02:48: An area of contrast becomes visible near the center of the top half of the frame. The sensor pans to track the area of contrast, keeping it generally within the center of the field-of-view.
02:49-02:55: The sensor zooms in. The area of contrast exits the frame in the bottom left of the display.
02:55-04:57: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-073",
    title: "DOW-UAP-PR077 / 2 NOVEMBER 2020 [CALLSIGN] [CALLSIGN] OBSERVES AND TRACKS UAP 1 OF 2",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 298,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007809",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is “2 November 2020 [CALLSIGN] [CALLSIGN] Observes and tracks UAP 1 of 2,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in November 2020. A user uploaded this video to a classified network in November 2020.

Video Duration: 00:04:58
Video Description:
00:00-03:21: The sensor pans to keep a low area of contrast within the center of the field-of-view. The relative intensity of the area of contrast increases throughout the video.
03:15-03:17: A second area of contrast transits the top right corner of the sensor field-of-view.
03:22-04:58: The sensor pans from the first area of contrast to the second area of contrast and pans to keep it within the field-of-view.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

AARO Comment: DOW-UAP-PR077 and DOW-UAP-PR078 are not duplicates. Both videos depict highly similar subject matter, but are distinct.`,
  },
  {
    id: "VID-074",
    title: "DOW-UAP-PR078 / 2 NOVEMBER 2020 [CALLSIGN] [CALLSIGN] OBSERVES AND TRACKS UAP 2 OF 2",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 298,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007812",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “2 November 2020 [CALLSIGN] [CALLSIGN] Observes and tracks UAP 2 of 2,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in November 2020. A user uploaded this video to a classified network in November 2020.

Video Duration: 00:04:58
Video Description:
00:00-03:21: The sensor pans to keep a low area of contrast within the center of the field-of-view. The relative intensity of the area of contrast increases throughout the video.
03:15-03:17: A second area of contrast transits the top right corner of the sensor field-of-view.
03:22-04:58: The sensor pans from the first area of contrast to the second area of contrast and pans to keep it within the field-of-view.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

AARO Comment: DOW-UAP-PR077 and DOW-UAP-PR078 are not duplicates. Both videos depict highly similar subject matter, but are distinct.`,
  },
  {
    id: "VID-075",
    title: "DOW-UAP-PR079 / 29 OCTOBER 2020 [CALLSIGN] (MISSION) OBSERVES 3 FAST MOVING UAP'S",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 240,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007816",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “29 October 2020 [CALLSIGN] (Mission) observes 3 fast moving UAP’s,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in October 2020. A user uploaded this video to a classified network in October 2020.

Video Duration: 00:04:00
Video Description:
00:02-00:22: The sensor pans to track an area of contrast.
00:23-00:28: The sensor zooms in.
00:29-01:01: The sensor zooms out, panning to track an area of contrast.
01:02-01:17: A second area of contrast enters the frame from the top left quarter of the screen. Both remain in the frame for approximately 15 seconds.
01:18-1:41: The sensor pans to track the second area of contrast, causing the first to exit the frame at the bottom of the screen. The area of contrast remains generally within the center of the sensor field-of-view.
01:42-1:58: The sensor pans and cycles its zoom level multiple times. No content.
01:59-02:58: The sensor pans to track an area of contrast. The area of contrast becomes increasingly indistinct against the background.
02:59-04:00: The sensor pans and cycles its zoom level multiple times. No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-076",
    title: "DOW-UAP-PR080 / 20 OCTOBER 2020 [CALLSIGN] [CALLSIGN] OBSERVES UAP",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 294,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007803",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “20 October 2020 [CALLSIGN] [CALLSIGN] Observes UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in October 2020.

Video Duration: 00:04:54
Video Description:
01:17-01:21: An area of contrast enters the sensor field-of-view from the top right of the screen. The sensor pans toward the object, then pans away. 
02:45-02:46: An area of contrast transits the sensor field-of-view across the bottom right quarter to the bottom middle edge of the screen.
03:12-03:13: An area of contrast transits the sensor field-of-view from the top right quarter to the bottom left quarter, after which the sensor changes modes and attempts to track the area of contrast.
03:20-03:21: An area of contrast transits the sensor field-of-view from the top right quarter to the bottom left quarter, after which the sensor changes modes and attempts to track the area of contrast.
03:35-03:36: An area of contrast transits the sensor field-of-view across the bottom right quarter, after which the sensor attempts to track the area of contrast.
03:40-03:41: An area of contrast transits the sensor field-of-view across the bottom right quarter to the bottom middle edge of the screen, after which the sensor attempts to track the area of contrast.
04:02-04:03: An area of contrast transits the sensor field-of-view across the bottom right quarter to the bottom middle edge of the screen, after which the sensor attempts to track the area of contrast.
04:22-04:23: An area of contrast transits the sensor field-of-view across the bottom left quarter.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-077",
    title: "DOW-UAP-PR081 / 18 OCT 2020 [CALLSIGN] OBSERVES UAP",
    location: "AFRICOM",
    date: "2020",
    durationSeconds: 299,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007805",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “18 Oct 2020 [CALLSIGN] observes UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Africa Command area of responsibility in 2020. A user uploaded this video to a classified network in October 2020.

Video Duration: 00:04:59
Video Description:
00:00-00:57: No content.
00:58-01:03: An area of contrast transits the sensor field-of-view, entering from near the top left corner of the screen and exiting near the bottom right corner of the screen.
01:04-04:59: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-078",
    title: "DOW-UAP-PR082 / 16 OCT 2020 [CALLSIGN] VIEWS UAP",
    location: "AFRICOM",
    date: "2020",
    durationSeconds: 286,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007807",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “16 OCT 2020 [CALLSIGN] views UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Africa Command area of responsibility in 2020. A user uploaded this video to a classified network in October 2020.

Video Duration: 00:04:46
Video Description:
00:28-00:29: An area of contrast transits the frame from the middle left side of the frame to the upper right side of the frame.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-079",
    title: "DOW-UAP-PR083 / 7 OCTOBER 2020 [CALLSIGN] OBSERVES UAP",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 274,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007808",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “7 October 2020 [CALLSIGN] observes UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in October 2020. A user uploaded this video to a classified network in October 2020.
Video Duration: 00:04:34
Video Description:
00:09-00:25: An area of contrast enters the right side of the sensor field-of-view. The sensor pans to track the area of contrast, keeping it generally within the center of the frame.
00:26-03:20: The sensor cycles its zoom level multiple times, panning to track the area of contrast.
03:21-04:08: The sensor cycles modalities and zoom levels multiple times to focus on a faint area of contrast.
04:09: The area of contrast loses distinctiveness against the background.
04:10-04:26: No content.
04:27-04:34: An area of contrast appears on the right side of the sensor field-of-view, and the sensor pans to bring the area of contrast to the center of the display.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-080",
    title: "DOW-UAP-PR084 / 17 SEPT 2020 [CALLSIGN] OBSERVES UAP",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 253,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007810",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “17 Sept 2020 [CALLSIGN] observes UAP,” is likely derived from a full-motion video camera aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in September 2020.

Video Duration: 00:04:13
Video Description:
00:00-00:24: No Content.
00:25-00:27: An area of contrast enters from the lower right-hand side of the screen and exits the screen in the upper left.
00:28-04:13 No Content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-081",
    title: "DOW-UAP-PR085 / 16 SEPT 2020 [CALLSIGN] [CALLSIGN] OBSERVES UAP",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 284,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007796",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “16 Sept 2020 [CALLSIGN] [CALLSIGN] observes UAP,” is likely derived from a full-motion video camera aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in September 2020.
Video Duration: 00:04:44
Video Description:
00:00-01:17: No Content.
01:18-02:24: An area of contrast enters the bottom of the screen and moves up the screen as the sensor pans and zooms to hold it in the center of the frame.
02:25-04:29: The sensor zooms in, with the area of contrast remaining generally within the center of the frame.
04:30-04:44: The area of contrast leaves the field-of-view in the lower left-hand quarter of the screen.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-082",
    title: "DOW-UAP-PR086 / UAP FROM DEC 2019 (EAST COAST)",
    location: "NORTHCOM",
    date: "2019",
    durationSeconds: 34,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007797",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “UAP from Dec 2019 (East Coast),” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Northern Command area of responsibility in 2019. A user uploaded this video to a classified network in September 2020.
Video Duration: 00:00:34
Video Description:
00:00-00:02: The sensor pans to track an area of contrast.
00:03-00:21: The sensor switches contrast modes while tracking an area of contrast.
00:22-00:23: The sensor pans to track an area of contrast.
00:24-00:34: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-083",
    title: "DOW-UAP-PR087 / 05 SEPTEMBER 2020 [CALLSIGN] UAP",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 294,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007799",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “05 September 2020 [CALLSIGN] UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in September 2020.
Video Duration: 00:04:54
Video Description:
00:00-01:22: No content.
01:23-01:26: An area of contrast transits the screen, entering from the bottom and exiting the top of the frame.
01:27-02:52: No content.
02:53-02:56: An area of contrast transits the screen, entering from the bottom and exiting the top of the frame.
02:57-04:21: No Content.
04:22-04:26: An area of contrast transits the screen, entering from the bottom and exiting the top of the frame.
04:27-04:54: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-084",
    title: "DOW-UAP-PR088 / 31 AUG [CALLSIGN] [CALLSIGN] OBSERVES UAP",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 298,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007800",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “31 AUG 2020 [CALLSIGN] [CALLSIGN] Observes UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in August 2020.

Video Duration: 00:04:58
Video Description:
00:00-01:21: No content.
01:22-01:55: An area of contrast enters the field-of-view in the upper left corner of the screen, transits the frame, and exits the bottom of the screen.
01:56-02:47: The sensor cycles its zoom level several times. An area of contrast becomes visible in the lower half of the screen.
02:48-03:08: Another area of contrast enters the field-of-view from the left side of the screen.
03:09-03:29: The sensor pans to track the second area of contrast. The first area of contrast exits the field-of-view at the left edge of the screen.
03:30-04:58: Several areas of contrast enter and exit the field-of-view. The sensor remains focused on the second-appearing area of contrast.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-085",
    title: "DOW-UAP-PR089 / 31 AUG [CALLSIGN] [CALLSIGN] OBSERVES UAP PART2",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 298,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007712",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “31 AUG 2020 [CALLSIGN] [CALLSIGN] Observes UAP part2,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in August 2020.

Video Duration: 00:04:58
Video Description:
00:00-00:45: The sensor tracks an area of contrast near the center of the screen.
00:46-01:09: Another area of contrast enters the field-of-view from the lower right side of the screen. The sensor pans to track both areas, but the second area of contrast exits the field-of-view.
01:10-01:22: The sensor cycles contrast modes, causing the area of contrast to momentarily lose distinctiveness against the background.
01:23-02:35: Several areas of contrast enter and exit the frame.
02:36-02:41: The areas of contrast become indistinct against the background.
02:42-03:22: The areas of contrast become distinguishable again.
03:23-03:43: Several areas of contrast enter and exit the screen.
03:44-03:48: The sensor pans to track the area of contrast.
03:49-04:01: The area of contrast exits the sensor field of view from the right side of the frame.
04:02-04:58: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-086",
    title: "DOW-UAP-PR090 / 24 AUG 2020 [CALLSIGN] (MISSION) OBSERVES UAP",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 297,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007719",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “24 AUG 2020 [CALLSIGN] (Mission) Observes UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in August 2020.

Video Duration: 00:04:57
Video Description:
00:00-00:03: The sensor tracks an area of contrast as it moves down the left side of the screen.
00:03-00:21: The sensor pans to track the area of contrast within the center of its field-of-view.
00:22-01:04: The sensor zooms in on the area of contrast.
01:05-01:14: The area of contrast exits and re-enters the field of view several times.
01:15-04:57: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-087",
    title: "DOW-UAP-PR091 / 21 AUG [CALLSIGN] OBSERVES UAP IN PERSIAN GULF",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 288,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007716",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “21 AUG 2020 [CALLSIGN] Observes UAP in Persian Gulf,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in August 2020.

Video Duration: 00:04:48
Video Description:
00:00-03:07: No content.
03:08-03:10: The sensor zooms out. An area of contrast transits from the top of the screen to the bottom, exiting the frame.
03:11-03:48: The sensor zooms out and back in. The sensor pans to track the area of contrast.
03:49-04:48: The area of contrast becomes indistinguishable from the grain of the video and the sensor zooms out.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-088",
    title: "DOW-UAP-PR092 / 08 AUG 2020 [CALLSIGN] [CALLSIGN] UAP OBSERVATION",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 292,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007715",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “08 AUG 2020 [CALLSIGN] [CALLSIGN] UAP observation,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in August 2020.

Video Duration: 00:04:52
Video Description:
00:00-00:47: No content.
00:48-00:51: An area of contrast enters the field-of-view from the lower right side of the screen.
00:52-00:53: The area of contrast exits the field-of-view from the lower left side of the screen.
00:54-01:09: The sensor pans to track the area of contrast and hold it within the center of the screen.
01:10-01:34: The sensor zooms in on the area of contrast.
01:35-01:37: The sensor zooms in further. The area of contrast remains visible at the top of the screen.
01:38-03:45: The sensor zooms out to track the area of contrast.
03:46-03:50: The sensor zooms in. The area of contrast remains visible at the top of the screen.
03:51-04:07: The sensor zooms out to track the area of contrast.
04:08-04:25: The sensor changes visual settings, continuing to track the area of contrast.
04:26-04:52: The sensor zooms out and in several times.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-089",
    title: "DOW-UAP-PR093 / MAY 05 2020 GULF OF ARABIA [CALLSIGN] (PLATFORM) DUAL UAP",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 30,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007721",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “May 05 2020 Gulf of Arabia [CALLSIGN] (Platform) Dual UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in July 2020.

Video Duration: 00:00:30
Video Description:
00:00-00:07: The sensor pans to track an area of contrast.
00:07-00:30: Several areas of contrast enter and exit the field-of-view. The sensor adjusts contrast settings.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

AARO Comment: DOW-UAP-PR093 and DOW-UAP-PR095 are not duplicates. Both videos share an uploader-defined title and depict highly similar subject matter, but are distinct.`,
  },
  {
    id: "VID-090",
    title: "DOW-UAP-PR094 / [CALLSIGN] (MISSION) - HD 2020-02-13",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 299,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007722",
    description: `46. DOW-UAP-PR094, “[CALLSIGN] (Mission) - HD 2020-02-13”

On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “[CALLSIGN] (Mission) - HD 2020-02-13,” is likely derived from an electro-optical and infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in February 2020.

Video Duration: 00:04:59
Video Description:
00:00-01:46: No content.
01:47-01:51: An area of contrast enters the frame in the upper right corner and leaves the field-of-view on the left side of the screen.
01:52-02:10: The sensor pans to track the area of contrast.
02:11-02:17: The sensor zooms out. The area of contrast is visible in the lower right quarter of the screen.
02:18-02:28: The sensor zooms in on the area of contrast.
02:29-04:38: The sensor zooms in and out several times.
04:40-04:43: The sensor changes modalities, causing the area of contrast to lose distinctiveness against the background.
04:44-04:53: The sensor changes back to electro-optical collection, again rendering the area of contrast visible near the center of the screen.
04:54-04:59: The sensor zooms in and out. The area of contrast is briefly visible in the upper left of the screen.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-091",
    title: "DOW-UAP-PR095 / MAY 05 2020 GULF OF ARABIA [CALLSIGN] (PLATFORM) DUAL UAP",
    location: "CENTCOM",
    date: "2020",
    durationSeconds: 289,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007725",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “May 05 2020 Gulf of Arabia [CALLSIGN] (Platform) Dual UAP,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2020. A user uploaded this video to a classified network in May 2020.

Video Duration: 00:04:49
Video Description:
00:00-00:16: The sensor tracks an area of contrast.
00:17-00:20: The sensor zooms in on the area of contrast. At higher magnification, the area appears as multiple distinct areas of contrast.
00:21-00:35: The sensor zooms in further. The areas of contrast move in and out of the field-of-view as the sensor pans to keep them in frame.
00:36-00:54: The sensor zooms out.
00:55-01:46: The sensor zooms in. The areas of contrast again become more distinct at higher magnification. The areas enter and exit the field-of-view as the sensor pans to keep them in frame.
01:47-01:51: The areas of contrast leave the frame at the lower right edge of the screen.
01:52-04:49: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.

AARO Comment: DOW-UAP-PR093 and DOW-UAP-PR095 are not duplicates. Both videos share an uploader-defined title and depict highly similar subject matter, but are distinct.`,
  },
  {
    id: "VID-092",
    title: "DOW-UAP-PR096 / HH11 03 JULY 2018 UAPS",
    location: "CENTCOM",
    date: "2018",
    durationSeconds: 79,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007726",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “HH11 03 July 2018 UAPs,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2018. A user uploaded this video to a classified network in July 2020.

Video Duration: 00:01:19
Video Description:
00:00-00:12: No Content.
00:13-00:21: Two areas of contrast enter the lower right side of the screen and exit the bottom of the screen.
00:13-00:29: The sensor pans to track the two areas of contrast, centering them generally within the center of the field-of-view.
00:30-00:47: The sensor zooms in. One of the areas of contrast is no longer visible within the frame at this level of magnification. The area of contrast within the sensor field-of-view appears as three distinct areas of contrast in a generally straight line.
00:47-00:58: The distance between the rightmost area of contrast and the center and left areas of contrast appears to increase. The center and left areas of contrast appear to remain at a roughly fixed distance from one another.
00:59-01:19: Other areas of contrast enter the field-of-view from the top of the screen.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-093",
    title: "DOW-UAP-PR097 / HI-RES: [CALLSIGN] OBSERVES UAP ON 25SEP19 AT 2135Z",
    location: "CENTCOM",
    date: "2019",
    durationSeconds: 299,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007728",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Hi-Res: [CALLSIGN] Observes UAP on 25SEP19 at 2135Z,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2019. A user uploaded this video to a classified network in October 2019.

Video Duration: 00:04:59
Video Description:
00:00-00:33: No Content.
00:34-00:36: An area of contrast enters the sensor field-of-view at the bottom of the screen.
00:37-00:44: The sensor rotates clockwise and corrects slightly counterclockwise to center the area of contrast in the frame.
00:37-01:37: The sensor cycles through several contrast and zoom levels while tracking the area of contrast.
01:38-02:10: At a higher magnification level, the area of contrast appears as a several areas grouped together in the center of the field-of-view.
02:11-03:06: The sensor changes contrast settings several times, causing the screen to flash black and white. The sensor continues to track the areas of contrast.
03:07-04:59: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-094",
    title: "DOW-UAP-PR098 / UFOS IN FORMATION OVER PERSIAN GULF?",
    location: "CENTCOM",
    date: "2026-05-22",
    durationSeconds: 1056,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007737",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “UFOs in formation over Persian Gulf?” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility. A user uploaded this video to a classified network in October 2019.

Video Duration: 00:17:36
Video Description:
00:00-00:02: No Content.
00:02-00:21: An area of contrast becomes visible. The sensor pans to track the area of contrast within the center of the field-of-view.
00:22-01:59: The sensor zooms in on the area of contrast. At a higher level of magnification, the area appears as multiple distinct areas of contrast.
02:00-02:02: The areas of contrast briefly leave the field-of-view.
02:03-04:00: The sensor zooms in and out multiple times to track the area of contrast.
04:01-04:26: The area of contrast becomes less distinguishable against the background. The sensor zooms in further.
04:27-06:29: The sensor progressively zooms in on the area of contrast.
06:30-13:17: The area of contrast is at times indistinguishable from the grain of the video. The sensor makes several contrast adjustments to compensate.
13:18-16:22: The sensor zooms in and out several times.
16:23-17:23: The area of contrast repeatedly exits and enters the frame.
17:24-17:27: The sensor zooms out to track the area of contrast.
17:27-17:36: No content.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  },
  {
    id: "VID-095",
    title: "DOW-UAP-PR099 / HI-RES: [CALLSIGN] OBSERVES UAP ON 25SEP19 AT 1715Z",
    location: "CENTCOM",
    date: "2023",
    durationSeconds: 291,
    format: "IR",
    sourceUrl: "https://www.dvidshub.net/video/1007738",
    description: `On March 6, 2026, eight members of the U.S. House of Representatives requested access to 51 potentially UAP-related records allegedly held by the Department of War and the Intelligence Community. The All-domain Anomaly Resolution Office (AARO) identified a collection of responsive materials held on a classified network. Many of these materials lack a substantiated chain-of-custody.

AARO assesses that this video, whose uploader-defined title is, “Hi-Res: [CALLSIGN] Observes UAPs on 23SEP19 at 1715Z,” is likely derived from an infrared sensor aboard a U.S. military platform operating within the United States Central Command area of responsibility in 2019. A user uploaded this video to a classified network in November 2019.

Video Duration: 00:04:51
Video Description:
00:00-00:44: No Content.
00:45-00:46: An area of contrast enters the field-of-view on the left side of the frame and exits the bottom of the frame in the lower left corner.
00:47-01:07: No Content.
01:08-01:25: An area of contrast appears from the left side of the frame. The sensor pans to hold the object in the center of its field-of-view.
01:26-01:45: The sensor changes visual settings and continues to track the area of contrast.
01:46-01:47: Another area of contrast enters the scene from the bottom of the frame.
01:47-01:55: The screen flashes black before the sensor continues tracking the areas of contrast. Multiple areas of contrast enter and exit the field-of-view during this period. The sensor pans to track them.
04:00-04:51: The screen flashes black for before continuing to track an area of contrast.

This video description is provided for informational purposes only. Readers should not interpret any part of this description as reflecting an analytical judgment, investigative conclusion, or factual determination regarding the described event’s validity, nature, or significance.`,
  }
];
