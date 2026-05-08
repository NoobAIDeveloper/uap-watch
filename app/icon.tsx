import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0e1116",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* horizontal crosshair line */}
        <div
          style={{
            position: "absolute",
            top: 15.25,
            left: 2,
            width: 28,
            height: 1.5,
            background: "#4c90f0",
          }}
        />
        {/* vertical crosshair line */}
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 15.25,
            width: 1.5,
            height: 28,
            background: "#4c90f0",
          }}
        />
        {/* circle outline */}
        <div
          style={{
            position: "absolute",
            top: 7,
            left: 7,
            width: 18,
            height: 18,
            border: "1.5px solid #4c90f0",
            borderRadius: "50%",
            background: "#0e1116",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
