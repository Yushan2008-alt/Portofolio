import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0a0a0f",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(168,85,247,0.35)",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            fontWeight: 700,
            color: "#a855f7",
            letterSpacing: "0.1em",
          }}
        >
          YS
        </span>
      </div>
    ),
    { ...size }
  );
}
