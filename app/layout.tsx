import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "@andrescalle9/ui/styles.css";
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
