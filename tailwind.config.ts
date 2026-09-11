import type { Config } from "tailwindcss";

// @andrescalle9/ui no exporta un preset de Tailwind (usa Tailwind v4 internamente
// y publica un stylesheet ya compilado). Sus tokens viven como CSS custom
// properties (--hub-bg, --hub-text, --hub-accent, --hub-accent-2,
// --hub-font-heading, --hub-font-body), fijadas por @andrescalle9/ui/styles.css
// e importadas en app/globals.css. Mapeamos esas mismas variables a utilidades
// de Tailwind para que el hub use la paleta y tipografía del paquete sin
// duplicar valores hardcodeados.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "hub-bg": "var(--hub-bg)",
        "hub-text": "var(--hub-text)",
        "hub-accent": "var(--hub-accent)",
        "hub-accent-2": "var(--hub-accent-2)",
      },
      fontFamily: {
        heading: ["var(--hub-font-heading)"],
        body: ["var(--hub-font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
