import FooterShareButtons from "./FooterShareButtons";

// Server component — only the share buttons need client interactivity
// (clipboard + window.open). Splitting them out keeps the footer shell
// out of the client bundle and trims hydration cost.
export default function Footer() {
  return (
    <footer
      id="footer"
      className="mt-16 hairline-t bg-panel-2/30 px-6 py-12"
    >
      <div className="max-w-[1480px] mx-auto">
        {/* END OF FEED rule */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="hairline-t" />
          <div
            className="text-3xl text-text-dim text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            // END OF FEED //
          </div>
          <div className="hairline-t" />
        </div>

        {/* Disclaimer block */}
        <div className="mt-8">
          <div className="bg-bg/40 border border-border rounded-sm p-5 max-w-3xl mx-auto">
            <p className="font-mono text-xs leading-relaxed text-text-dim">
              UAP.WATCH is an independent visualization layer for public
              records released by the U.S. Department of War on 2026-05-08
              under the Presidential Unsealing &amp; Reporting System for UAP
              Encounters (PURSUE) program. This site is a tribute and does not
              host classified information; all source material — original
              PDFs, video files, and image archives — remains hosted at
              war.gov/UFO/. UAP.WATCH is not affiliated with, endorsed
              by, or operated on behalf of any U.S. government agency.
            </p>
            <div className="text-text-mute text-[10px] tracking-[0.25em] mt-3">
              // FOR INFORMATIONAL PURPOSES ONLY // NO INTELLIGENCE VALUE //
            </div>
          </div>
        </div>

        {/* 3-column meta block */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SOURCE */}
          <div>
            <div className="text-text-mute text-[10px] tracking-[0.25em] mb-3">
              // SOURCE //
            </div>
            <div>
              <a
                href="https://www.war.gov/UFO/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-accent text-xs tracking-wide block py-0.5"
              >
                war.gov/UFO/
              </a>
              <a
                href="https://www.war.gov/News/Releases/Release/Article/4480582/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-accent text-xs tracking-wide block py-0.5"
              >
                war.gov press release
              </a>
              <a
                href="https://www.war.gov/UFO/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-accent text-xs tracking-wide block py-0.5"
              >
                Pentagon UAP program portal
              </a>
            </div>
          </div>

          {/* TECHNICAL */}
          <div>
            <div className="text-text-mute text-[10px] tracking-[0.25em] mb-3">
              // TECHNICAL //
            </div>
            <div className="space-y-1">
              <div className="text-text-mute text-xs">static next.js // app router</div>
              <div className="text-text-mute text-xs">tailwind v4 // motion react</div>
              <div className="text-text-mute text-xs">d3-geo // natural earth projection</div>
              <div className="text-text-mute text-xs">topojson world atlas</div>
            </div>
          </div>

          {/* SHARE */}
          <div>
            <div className="text-text-mute text-[10px] tracking-[0.25em] mb-3">
              // SHARE THIS DOSSIER //
            </div>
            <FooterShareButtons />
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 hairline-t pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div className="text-text-mute text-[10px] tracking-widest">
            © INDEPENDENTLY OPERATED // 2026 // NO AFFILIATION CLAIMED
          </div>
          <div className="text-text-mute text-[10px] tracking-widest">
            // UNCLASSIFIED // UAP-WATCH MIRROR // OBS-001 //
          </div>
        </div>
      </div>
    </footer>
  );
}
