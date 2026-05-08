"use client";

import { useState } from "react";
import { Copy, MessageSquare, Send } from "lucide-react";

const SHARE_URL = "https://uap.watch";
const TWEET_URL =
  "https://twitter.com/intent/tweet?text=The+US+gov+just+released+a+ton+of+UFO+files.+I+made+this+intel+terminal+to+browse+them%3A+&url=https%3A%2F%2Fuap.watch";
const REDDIT_URL =
  "https://www.reddit.com/submit?url=https%3A%2F%2Fuap.watch&title=UAP.WATCH+%E2%80%94+intel-terminal+view+of+the+Pentagon%27s+declassified+UFO+files";

const shareBtn =
  "flex items-center gap-2 text-text-dim hover:text-accent border border-border hover:border-accent px-3 py-2 text-xs tracking-widest transition-colors";

export default function FooterShareButtons() {
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

  return (
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
  );
}
