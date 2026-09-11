import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, getBaseUrl } from "@/lib/site";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rubik",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: `${SITE_NAME} — hub de apps`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${rubik.variable} ${inter.variable}`}>
      <head>
        {/* dist/styles.css de @andrescalle9/ui, servido tal cual (ver scripts/copy-ui-styles.mjs):
            un import JS pasaría por el pipeline de PostCSS/Tailwind v3 de esta app y rompería el
            build, porque el archivo ya viene compilado con Tailwind v4 (ver README). */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/vendor/andrescalle9-ui.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
