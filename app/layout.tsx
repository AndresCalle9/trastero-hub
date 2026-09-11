import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
// Orden importante: globals.css primero. Es lo que compila `@import "tailwindcss"`
// completo (declara los 5 layers: properties, theme, base, components, utilities).
// @andrescalle9/ui/styles.css es un build de Tailwind v4 aparte que sólo declara
// properties/theme/utilities (no base/components). Si se importa primero, esos dos
// layers quedan "primero vistos" recién cuando carga nuestro CSS, y terminan
// insertados DESPUÉS de utilities en el orden global de layers — o sea, el preflight
// de Tailwind (layer base) le termina ganando a nuestras propias utilidades
// (layer utilities) en cualquier propiedad que ambos toquen. Ver README.
import "./globals.css";
import "@andrescalle9/ui/styles.css";
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

// @andrescalle9/ui fija --hub-font-heading/--hub-font-body en su propio :root
// (sin capa/unlayered). Como el orden de import de arriba pone su stylesheet
// después del nuestro, ese :root ganaría por orden de aparición si
// intentáramos sobreescribirlo con otro :root — por eso el override va como
// inline style en <html>, que gana siempre sin depender del orden del CSS.
const fontVars = {
  "--hub-font-heading": "var(--font-rubik), ui-sans-serif, system-ui, sans-serif",
  "--hub-font-body": "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
} as CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${rubik.variable} ${inter.variable}`} style={fontVars}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
