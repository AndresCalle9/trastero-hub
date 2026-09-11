import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/site";

export const alt = "Trastero — hub de apps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
          color: "#1a1a1a",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Trastero
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#1a1a1a99",
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            marginTop: 48,
            width: 120,
            height: 6,
            borderRadius: 3,
            background: "#e8a33d",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
