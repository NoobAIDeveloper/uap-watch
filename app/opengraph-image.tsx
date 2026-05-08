import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "UAP.WATCH — Independent visualization of declassified UAP files released by the U.S. Department of War.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Try to load JetBrains Mono + Space Mono. If the fetch fails (e.g. offline
// build), we fall back to Satori's defaults so the route still renders.
async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch (err) {
    console.warn(`[opengraph-image] font fetch failed for ${url}:`, err);
    return null;
  }
}

const COLOR = {
  bg: "#0e1116",
  panel: "#1c2127",
  border: "#2f343c",
  borderBright: "#404854",
  text: "#f6f7f9",
  textDim: "#abb3bf",
  textMute: "#5f6b7c",
  accent: "#4c90f0",
  rose: "#f5498b",
  violet: "#9881f3",
  teal: "#13c9ba",
} as const;

// Faux "global distribution" pin coordinates within a 1200x630 frame.
const PINS: Array<{ x: number; y: number; r: number; color: string }> = [
  { x: 180, y: 470, r: 6, color: COLOR.accent },
  { x: 240, y: 510, r: 5, color: COLOR.rose },
  { x: 320, y: 460, r: 6, color: COLOR.teal },
  { x: 410, y: 495, r: 5, color: COLOR.accent },
  { x: 520, y: 475, r: 6, color: COLOR.violet },
  { x: 610, y: 510, r: 5, color: COLOR.accent },
  { x: 700, y: 465, r: 6, color: COLOR.rose },
  { x: 780, y: 500, r: 5, color: COLOR.teal },
  { x: 860, y: 470, r: 6, color: COLOR.accent },
  { x: 940, y: 505, r: 5, color: COLOR.violet },
  { x: 1020, y: 475, r: 6, color: COLOR.accent },
  { x: 1080, y: 515, r: 5, color: COLOR.rose },
];

const STATS: Array<{ value: string; label: string; color: string }> = [
  { value: "162", label: "FILES", color: COLOR.accent },
  { value: "400+", label: "INCIDENTS", color: COLOR.text },
  { value: "108", label: "REDACTED", color: COLOR.rose },
  { value: "28", label: "VIDEOS", color: COLOR.teal },
];

export default async function Image() {
  const [jetbrainsRegular, jetbrainsBold, spaceMonoBold] = await Promise.all([
    loadFont(
      "https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-400-normal.ttf",
    ),
    loadFont(
      "https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-700-normal.ttf",
    ),
    loadFont(
      "https://fonts.bunny.net/space-mono/files/space-mono-latin-700-normal.ttf",
    ),
  ]);

  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    style: "normal";
    weight: 400 | 700;
  }> = [];
  if (jetbrainsRegular) {
    fonts.push({
      name: "JetBrains Mono",
      data: jetbrainsRegular,
      style: "normal",
      weight: 400,
    });
  }
  if (jetbrainsBold) {
    fonts.push({
      name: "JetBrains Mono",
      data: jetbrainsBold,
      style: "normal",
      weight: 700,
    });
  }
  if (spaceMonoBold) {
    fonts.push({
      name: "Space Mono",
      data: spaceMonoBold,
      style: "normal",
      weight: 700,
    });
  }

  const displayFamily = spaceMonoBold
    ? "Space Mono, JetBrains Mono, monospace"
    : "JetBrains Mono, monospace";
  const monoFamily = jetbrainsRegular
    ? "JetBrains Mono, monospace"
    : "monospace";

  const cornerLineH = (
    pos: { top?: number; bottom?: number; left?: number; right?: number },
  ) => (
    <div
      style={{
        position: "absolute",
        width: 30,
        height: 2,
        background: COLOR.accent,
        ...pos,
      }}
    />
  );
  const cornerLineV = (
    pos: { top?: number; bottom?: number; left?: number; right?: number },
  ) => (
    <div
      style={{
        position: "absolute",
        width: 2,
        height: 30,
        background: COLOR.accent,
        ...pos,
      }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: COLOR.bg,
          color: COLOR.text,
          fontFamily: monoFamily,
          position: "relative",
        }}
      >
        {/* Subtle radial highlight upper-right */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(76, 144, 240, 0.10), transparent 50%)",
            display: "flex",
          }}
        />

        {/* Top classification banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 40,
            background: COLOR.panel,
            borderBottom: `1px solid ${COLOR.borderBright}`,
            color: COLOR.textDim,
            fontSize: 14,
            letterSpacing: "0.18em",
            fontFamily: monoFamily,
          }}
        >
          // UNCLASSIFIED // FOR PUBLIC RELEASE // UAP-WATCH //
          2026-05-08 //
        </div>

        {/* Hero content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "44px 60px 0 60px",
            position: "relative",
          }}
        >
          <div
            style={{
              color: COLOR.accent,
              fontSize: 18,
              letterSpacing: "0.3em",
              fontFamily: monoFamily,
              textTransform: "uppercase",
            }}
          >
            // PRESIDENTIAL UNSEALING & REPORTING SYSTEM //
          </div>

          <div
            style={{
              marginTop: 18,
              fontFamily: displayFamily,
              fontWeight: 700,
              fontSize: 110,
              lineHeight: 1,
              color: COLOR.text,
              letterSpacing: "-0.02em",
            }}
          >
            UAP.WATCH
          </div>

          <div
            style={{
              marginTop: 22,
              maxWidth: 880,
              color: COLOR.textDim,
              fontSize: 26,
              lineHeight: 1.3,
              fontFamily: monoFamily,
            }}
          >
            Independent intel-terminal view of the Pentagon&apos;s declassified
            UAP files.
          </div>
        </div>

        {/* Stats strip */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 380,
            left: 60,
            right: 60,
            justifyContent: "space-between",
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontFamily: displayFamily,
                  fontWeight: 700,
                  fontSize: 64,
                  lineHeight: 1,
                  color: s.color,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 16,
                  fontFamily: monoFamily,
                  color: COLOR.textDim,
                  letterSpacing: "0.25em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pin map silhouette - faint dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.55,
          }}
        >
          {PINS.map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x - p.r,
                top: p.y - p.r,
                width: p.r * 2,
                height: p.r * 2,
                borderRadius: 9999,
                background: p.color,
              }}
            />
          ))}
        </div>

        {/* Bottom hairline + URL */}
        <div
          style={{
            position: "absolute",
            left: 60,
            right: 60,
            bottom: 36,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 1,
              background: COLOR.border,
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
              fontFamily: monoFamily,
              fontSize: 18,
            }}
          >
            <div style={{ color: COLOR.accent }}>uap-watch-flame.vercel.app</div>
            <div style={{ color: COLOR.textDim, letterSpacing: "0.18em" }}>
              // MIRROR OF WAR.GOV/UFO/ //
            </div>
          </div>
        </div>

        {/* Bracket corners */}
        {/* top-left */}
        {cornerLineH({ top: 56, left: 24 })}
        {cornerLineV({ top: 56, left: 24 })}
        {/* top-right */}
        {cornerLineH({ top: 56, right: 24 })}
        {cornerLineV({ top: 56, right: 24 })}
        {/* bottom-left */}
        {cornerLineH({ bottom: 24, left: 24 })}
        {cornerLineV({ bottom: 24, left: 24 })}
        {/* bottom-right */}
        {cornerLineH({ bottom: 24, right: 24 })}
        {cornerLineV({ bottom: 24, right: 24 })}
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
