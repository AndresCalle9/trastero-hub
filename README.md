# Trastero

Hub de apps web — soluciones simples, útiles e inútiles, para el día a día. Landing estática que agrupa cada app propia y sirve como punto de entrada compartido y portafolio.

Doble propósito:

- **Cross-traffic**: un usuario de cualquier app del hub descubre las demás desde aquí (y desde el `HubFooter` que cada app expone vía `@andrescalle9/ui`).
- **Portafolio**: vitrina de lo desarrollado, con cada app en su propio subdominio.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind. Sitio completamente estático salvo la generación de imágenes Open Graph (`next/og`, que empaqueta `@vercel/og`). Sin autenticación, sin backend propio, sin base de datos — el listado de apps es contenido estático versionado en el repo.

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
  icon: "Home", // debe existir en components/app-icons.tsx
  status: "live", // "live" | "soon"
}
```

Si el ícono que necesitas no está en `components/app-icons.tsx`, impórtalo ahí desde `lucide-react` y agrégalo al mapa `APP_ICONS` (se hace explícito a propósito, para no bundlear el paquete de íconos completo).

No requiere tocar componentes ni rutas — el grid se genera a partir de este archivo.

## SEO

- `generateMetadata` por ruta (ver `lib/metadata.ts` para el helper compartido).
- `app/sitemap.ts`, `app/robots.ts` dinámicos, resueltos contra la URL real del deploy.
- JSON-LD `schema.org/CollectionPage` listando las apps como `hasPart` (inline en `app/page.tsx`).
- Open Graph image generada en `app/opengraph-image.tsx` vía `next/og` (el `ImageResponse` de Next.js empaqueta `@vercel/og`; no hace falta instalarlo aparte).

## Notas sobre `@andrescalle9/ui`

El paquete instalado (`0.2.0`) expone menos de lo que documenta su propio README:

- **No hay preset de Tailwind que extender.** El paquete usa Tailwind v4 internamente y publica un `dist/styles.css` ya compilado — sus tokens viven como CSS custom properties (`--hub-bg`, `--hub-text`, `--hub-accent`, `--hub-accent-2`, `--hub-font-heading`, `--hub-font-body`). En `tailwind.config.ts` mapeamos esas mismas variables a utilidades (`bg-hub-accent`, `font-heading`, etc.) en vez de extender un preset inexistente.
- **`generateAppMetadata()` no está exportado.** El README del paquete lo menciona, pero `dist/index.js` sólo exporta `Button`, `Card`, `HubFooter`, `HubHeader`. Por eso este repo define su propio helper en `lib/metadata.ts`. Si una versión futura del paquete lo agrega, vale la pena migrar.
- **El botón "Entrar" no usa el componente `Button`.** `Button` sólo renderiza un `<button>`, y acá necesitamos un link real (`<a>`) al subdominio de cada app. `components/AppCard.tsx` reutiliza las clases CSS reales del paquete (`tui-btn`, `tui-btn--primary`, etc.) sobre un `<a>`, para no duplicar la lógica de estilos ni perder la semántica de link.
- `HubHeader`/`HubFooter` están pensados para las apps satélite (para volver al hub y cruzar tráfico entre ellas), no para el hub mismo — por eso no se usan en este repo.

## Deploy

Desplegado en Vercel. Mientras el dominio propio (`trastero.dev`) no esté configurado, se usa la URL auto-generada de Vercel — no bloquea nada del desarrollo (`lib/site.ts` resuelve la URL base a partir de `VERCEL_URL` automáticamente). Al activar el dominio custom:

1. Agregar el dominio en el proyecto de Vercel y configurar el DNS.
2. Definir `NEXT_PUBLIC_SITE_URL=https://trastero.dev` en las env vars del proyecto (tiene prioridad sobre `VERCEL_URL` en `lib/site.ts`).
3. Actualizar cada `url` en `config/apps.config.ts` si algún subdominio cambia.
4. Agregar redirect 301 desde el dominio antiguo de cada app migrada (ver roadmap del proyecto).
