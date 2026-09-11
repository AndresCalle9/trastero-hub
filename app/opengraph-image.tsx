import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/site";

export const alt = "Trastero — hub de apps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const markData = readFileSync(join(process.cwd(), "public/assets/brand/trastero-mark.png"));
  const markSrc = `data:image/png;base64,${markData.toString("base64")}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element -- satori (next/og) no soporta next/image */}
        <img src={markSrc} width={120} height={120} alt="" />
        <div
          style={{
            marginTop: 16,
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
      </div>
    ),
    { ...size }
  );
}
