"use client";

import { useState } from "react";
import { Copy, MessageSquare, Send } from "lucide-react";

const SHARE_URL = "https://uap.watch";
const TWEET_URL =
  "https://twitter.com/intent/tweet?text=The+US+gov+just+released+a+ton+of+UFO+files.+I+made+this+intel+terminal+to+browse+them%3A+&url=https%3A%2F%2Fuap.watch";
const REDDIT_URL =
  "https://www.reddit.com/submit?url=https%3A%2F%2Fuap.watch&title=UAP.WATCH+%E2%80%94+intel-terminal+view+of+the+Pentagon%27s+declassified+UFO+files";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(SHARE_URL);
      }
    } catch {
      // ignore — clipboard may not be available
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openExternal = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const shareBtn =
    "flex items-center gap-2 text-text-dim hover:text-accent border border-border hover:border-accent px-3 py-2 text-xs tracking-widest transition-colors";

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
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => openExternal(TWEET_URL)}
                className={shareBtn}
              >
                <Send size={14} aria-hidden="true" />
                <span>POST TO X</span>
              </button>
              <button
                type="button"
                onClick={() => openExternal(REDDIT_URL)}
                className={shareBtn}
              >
                <MessageSquare size={14} aria-hidden="true" />
                <span>POST TO REDDIT</span>
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className={shareBtn}
                aria-label="Copy URL to clipboard"
              >
                <Copy size={14} aria-hidden="true" />
                <span>{copied ? "COPIED ✓" : "COPY URL"}</span>
              </button>
            </div>
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
