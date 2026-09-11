// @andrescalle9/ui publica dist/styles.css ya compilado con Tailwind v4.
// Si lo importamos como CSS global vía JS (`import "@andrescalle9/ui/styles.css"`),
// Next.js lo vuelve a pasar por su propio pipeline de PostCSS/Tailwind v3, que no
// entiende la sintaxis de capas de v4 y rompe el build. En vez de eso, lo copiamos
// tal cual a /public y lo enlazamos como stylesheet estático (ver app/layout.tsx),
// evitando que webpack lo reprocese.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(rootDir, "node_modules/@andrescalle9/ui/dist/styles.css");
const destDir = join(rootDir, "public/vendor");
const dest = join(destDir, "andrescalle9-ui.css");

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);

console.log("[copy-ui-styles] @andrescalle9/ui/dist/styles.css -> public/vendor/andrescalle9-ui.css");
