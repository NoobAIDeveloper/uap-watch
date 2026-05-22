import type { EvidenceAudio } from "@/lib/types";

// NASA mission audio — Apollo and Mercury voice loops and post-flight medical
// debriefs released in PURSUE Tranche 2 (2026-05-22). All recordings stream
// from DVIDS; mirror of source URLs is intentional (no local copies — DVIDS
// handles transcoding and CDN for us).

export const audio: EvidenceAudio[] = [
  {
    id: "AUD-001",
    title: "NASA-UAP-D008 / APOLLO 12 MEDICAL DEBRIEFING - TAPE 12, 1969",
    location: "Texas",
    date: "1969",
    durationSeconds: 0,
    sourceUrl: "https://www.dvidshub.net/video/1007870",
    description: `During a medical debriefing of the crew of the Apollo 12 mission, Commander Charles “Pete” Conrad, Command Module Pilot Richard “Dick” F. Gordon, and Lunar Module Pilot Alan L. Bean describe their observations of instances of light flashes or “streaks of lights.” The astronauts each reported that these experiences occurred in the dark as they tried to sleep.
The NASA medical team considered whether similar phenomena reported by Apollo 11 Lunar Module Pilot Buzz Aldrin had been attributable to exposure of the retina by cosmic rays. NASA later determined that the phenomena reported by the Apollo 12 flight crew were internal to the astronauts’ vision rather than external light sources.`,
  },
  {
    id: "AUD-002",
    title: "NASA-UAP-D009 / APOLLO 17 AUDIO EXCERPT, DECEMBER 7, 1972",
    location: "Cislunar Space",
    date: "12/7/72",
    durationSeconds: 0,
    sourceUrl: "https://www.dvidshub.net/video/1007872",
    description: `During the eleventh and final crewed mission in the Apollo program, Apollo 17 Commander Gene Cernan, Lunar Module Pilot Harrison Schmitt, and Command Module Pilot Ronald Evans report seeing small lights outside the Apollo spacecraft during transit to the moon. 
The crew describe bright “particles” or “fragments” as being “jagged,” “angular,” and drifting near the Apollo spacecraft and the separated Saturn S-IVB stage. The Apollo 17 crew speculate that paint chips or ice chips are likely the source of these lights and note that they “twinkle” and move away from the Saturn S-IVB stage.`,
  },
  {
    id: "AUD-003",
    title: "NASA-UAP-D010 / MERCURY ATLAS 9 AUDIO EXCERPT, MAY 15, 1963",
    location: "Low Earth Orbit",
    date: "5/15/63",
    durationSeconds: 0,
    sourceUrl: "https://www.dvidshub.net/video/1007874",
    description: `Approximately one hour and 41 minutes into the final and longest flight of Project Mercury, Mercury-Atlas 9 mission (MA-9) Faith 7 Pilot L. Gordon Cooper Jr. notes that he sees “John’s fireflies,” referring to John Glenn’s term from the Mercury-Atlas 6 mission. NASA later determined that the “fireflies” are attributable to frozen condensation separating from the spacecraft body. The white, green-hued appearance of this phenomenon results from sunlight reflecting off frozen condensation.`,
  },
  {
    id: "AUD-004",
    title: "NASA-UAP-D011 / MERCURY ATLAS 9 AUDIO EXCERPT, MAY 15, 1963",
    location: "Low Earth Orbit",
    date: "5/15/63",
    durationSeconds: 0,
    sourceUrl: "https://www.dvidshub.net/video/1007876",
    description: `During the final and longest flight of Project Mercury, Mercury-Atlas 9 mission (MA-9) Faith 7 Pilot L. Gordon Cooper Jr. describes the brilliant blue of sunrise beneath the haze layer of the Earth’s atmosphere. As he approaches sunrise, he describes small, luminous, brilliant white particles drifting away from the spacecraft. Cooper describes observing “fireflies” after deploying beacons, which are spherical mission-related equipment with xenon strobe lights.`,
  },
  {
    id: "AUD-005",
    title: "NASA-UAP-D012 / MERCURY ATLAS 8 AUDIO EXCERPT, OCTOBER 3, 1962",
    location: "Low Earth Orbit",
    date: "10/3/62",
    durationSeconds: 0,
    sourceUrl: "https://www.dvidshub.net/video/1007877",
    description: `During the Mercury Atlas 8 mission, Sigma 7 pilot Walter M. “Wally” Schirra Jr. describes observing “little white objects that tend to come from the capsule itself and drift off.” Schirra later also refers to those objects as “particles” and “lathe shavings.” Schirra also describes seeing a burst of light in the window, whose source he cannot identify. He speculates that his observation corresponds with the moment the sun passes below the horizon during sunset.`,
  },
  {
    id: "AUD-006",
    title: "NASA-UAP-D013 / MERCURY ATLAS 7, MAY 24, 1962",
    location: "Low Earth Orbit",
    date: "5/24/62",
    durationSeconds: 0,
    sourceUrl: "https://www.dvidshub.net/video/1007879",
    description: `During the fourth crewed spaceflight and second orbital flight of Project Mercury, Mercury-Atlas 7 (MA-7), Aurora 7 pilot Scott Carpenter describes white particles in view that appear to move at “random” and “look exactly like snowflakes.” He describes these phenomena as reflective, and that some seemed to move faster than the Aurora 7 spacecraft.`,
  },
  {
    id: "AUD-007",
    title: "NASA-UAP-D014 / MERCURY-REDSTONE 4, JULY 21, 1961",
    location: "North Atlantic Ocean",
    date: "7/21/61",
    durationSeconds: 0,
    sourceUrl: "https://www.dvidshub.net/video/1007878",
    description: `During the recovery of the fourth launch and second crewed spaceflight of Project Mercury, Mercury-Redstone 4 (MR-4) Liberty Bell 7, the recovery team discusses a dye pack in the water that did not activate.`,
  }

];
