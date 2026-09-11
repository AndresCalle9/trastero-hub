# Trastero

Hub de apps web — soluciones simples, útiles e inútiles, para el día a día. Landing estática que agrupa cada app propia y sirve como punto de entrada compartido y portafolio.

Doble propósito:

- **Cross-traffic**: un usuario de cualquier app del hub descubre las demás desde aquí (y desde el `HubFooter` que cada app expone vía `@andrescalle9/ui`).
- **Portafolio**: vitrina de lo desarrollado, con cada app en su propio subdominio.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind v4. Sitio completamente estático salvo la generación de imágenes Open Graph (`next/og`, que empaqueta `@vercel/og`). Sin autenticación, sin backend propio, sin base de datos — el listado de apps es contenido estático versionado en el repo.

Usamos Tailwind v4 (en vez del v3 que trae `create-next-app` por defecto) para alinear la versión con la que ya usa `@andrescalle9/ui` internamente — así su `dist/styles.css` se importa como CSS global normal (`app/layout.tsx`) y pasa por el mismo pipeline de PostCSS sin conflictos.

## Desarrollo

```bash
npm install
npm run dev
```

## Estructura

```
/app        rutas (App Router), metadata, sitemap, robots, OG image
/components específicos del hub (no duplica nada de @andrescalle9/ui)
/lib        utilidades (metadata, constantes del sitio)
/config     apps.config.ts — fuente de verdad del grid de apps
```

## Agregar una nueva app al grid

Edita `config/apps.config.ts` y agrega un objeto al array:

```ts
{
  name: "Nombre de la app",
  description: "Una línea, tono informal.",
  url: "https://nombre-app.trastero.dev",
  icon: "Home", // un ícono de lucide-react (ver components/app-icons.tsx) o una ruta a /public, ej. "/apps/mi-app-logo.png"
  status: "live", // "live" | "soon"
}
```

Si usas un ícono de Lucide y no está en `components/app-icons.tsx`, impórtalo ahí desde `lucide-react` y agrégalo al mapa `APP_ICONS` (se hace explícito a propósito, para no bundlear el paquete de íconos completo). Si usas el logo propio de la app, ponlo en `public/assets/apps/` y referencia la ruta (`/assets/apps/...`) — `components/AppCard.tsx` detecta el string automáticamente.

## Assets estáticos

```
public/assets/brand/  logo/isotipo de Trastero (Hero, OG image)
public/assets/apps/   logos propios de cada app (cuando no alcanza un ícono de Lucide)
```

El favicon (`app/favicon.ico`), el ícono moderno (`app/icon.png`) y el ícono de iOS (`app/apple-icon.png`) vivimos **dentro de `/app`**, no en `/public`: es una convención de archivo de Next.js — sólo ahí el framework los detecta automáticamente y genera los `<link rel="icon">`/`<link rel="apple-touch-icon">` correspondientes. Si se movieran a `/public` dejarían de generarse esos tags solos.

No requiere tocar componentes ni rutas — el grid se genera a partir de este archivo.

## SEO

- `generateMetadata` por ruta (ver `lib/metadata.ts` para el helper compartido).
- `app/sitemap.ts`, `app/robots.ts` dinámicos, resueltos contra la URL real del deploy.
- JSON-LD `schema.org/CollectionPage` listando las apps como `hasPart` (inline en `app/page.tsx`).
- Open Graph image generada en `app/opengraph-image.tsx` vía `next/og` (el `ImageResponse` de Next.js empaqueta `@vercel/og`; no hace falta instalarlo aparte).

## Notas sobre `@andrescalle9/ui`

El paquete instalado (`0.2.0`) expone menos de lo que documenta su propio README:

- **No hay preset de Tailwind que extender.** El paquete no exporta ninguno (Tailwind v4 es CSS-first: no existe el concepto de "preset" de v3). Publica un `dist/styles.css` ya compilado, con sus tokens como CSS custom properties (`--hub-bg`, `--hub-text`, `--hub-accent`, `--hub-accent-2`, `--hub-font-heading`, `--hub-font-body`). En `app/globals.css` los exponemos como theme de Tailwind (bloque `@theme`) para poder usarlos con utilidades (`bg-hub-accent`, `font-heading`, etc.).
- **Requiere que el host esté en Tailwind v4.** Si el host usa Tailwind v3 (como deja `create-next-app` por defecto), importar `dist/styles.css` como CSS global rompe el build: el plugin de PostCSS de v3 no entiende los `@layer` que genera la v4. Por eso este repo usa Tailwind v4 en vez del v3 default — ver más arriba.
- **Orden de import de CSS crítico (cascade layers).** `dist/styles.css` declara sus propios `@layer properties/theme/utilities` pero nunca declara `base` ni `components`. Si se importa *antes* que nuestro propio `@import "tailwindcss"` (que sí declara los 5 layers de una), esos dos layers quedan "vistos por primera vez" recién con nuestro CSS y el algoritmo de CSS Cascade Layers los inserta **después** de `utilities` en el orden global — o sea, el preflight de Tailwind (layer `base`, que resetea margin/padding/font-size) le termina ganando a nuestras propias utilidades (layer `utilities`). Resultado: se pierden spacing, tipografía y demás en todo el sitio. Por eso en `app/layout.tsx` `./globals.css` se importa **antes** que `@andrescalle9/ui/styles.css` (nunca al revés), y el override de `--hub-font-heading`/`--hub-font-body` se hace con inline style en `<html>` en vez de otro bloque `:root`, para no depender del orden de cascada entre los dos archivos.
- **`generateAppMetadata()` no está exportado.** El README del paquete lo menciona, pero `dist/index.js` sólo exporta `Button`, `Card`, `HubFooter`, `HubHeader`. Por eso este repo define su propio helper en `lib/metadata.ts`. Si una versión futura del paquete lo agrega, vale la pena migrar.
- **El botón "Entrar" no usa el componente `Button`.** `Button` sólo renderiza un `<button>`, y acá necesitamos un link real (`<a>`) al subdominio de cada app. `components/AppCard.tsx` reutiliza las clases CSS reales del paquete (`tui-btn`, `tui-btn--primary`, etc.) sobre un `<a>`, para no duplicar la lógica de estilos ni perder la semántica de link.
- `HubHeader`/`HubFooter` están pensados para las apps satélite (para volver al hub y cruzar tráfico entre ellas), no para el hub mismo — por eso no se usan en este repo.

## Deploy

Desplegado en Vercel. Mientras el dominio propio (`trastero.dev`) no esté configurado, se usa la URL auto-generada de Vercel — no bloquea nada del desarrollo (`lib/site.ts` resuelve la URL base a partir de `VERCEL_URL` automáticamente). Al activar el dominio custom:

1. Agregar el dominio en el proyecto de Vercel y configurar el DNS.
2. Definir `NEXT_PUBLIC_SITE_URL=https://trastero.dev` en las env vars del proyecto (tiene prioridad sobre `VERCEL_URL` en `lib/site.ts`).
3. Actualizar cada `url` en `config/apps.config.ts` si algún subdominio cambia.
4. Agregar redirect 301 desde el dominio antiguo de cada app migrada (ver roadmap del proyecto).
