Trastero

Hub de apps web — soluciones simples, útiles e inútiles, para el día a día. Landing estática que agrupa cada app propia y sirve como punto de entrada compartido y portafolio.

Doble propósito:

Cross-traffic: un usuario de cualquier app del hub descubre las demás desde aquí (y desde el HubFooter que cada app expone vía @andrescalle9/ui).
Portafolio: vitrina de lo desarrollado, con cada app en su propio subdominio.
Stack

Next.js 14 (App Router) + TypeScript + Tailwind. Sitio completamente estático salvo la generación de imágenes Open Graph (@vercel/og). Sin autenticación, sin backend propio, sin base de datos — el listado de apps es contenido estático versionado en el repo.

Desarrollo
bash
npm install
npm run dev
Estructura
/app        rutas (App Router), metadata, sitemap, robots
/components específicos del hub (no duplica nada de @andrescalle9/ui)
/lib        utilidades
/config     apps.config.ts — fuente de verdad del grid de apps
Agregar una nueva app al grid

Edita config/apps.config.ts y agrega un objeto al array:

ts
{
  name: "Nombre de la app",
  description: "Una línea, tono informal.",
  url: "https://nombre-app.trastero.dev",
  icon: "IconoLucide", // o ruta a /public
  status: "live", // "live" | "soon"
}

No requiere tocar componentes ni rutas — el grid se genera a partir de este archivo.

SEO
generateMetadata por ruta.
app/sitemap.ts, app/robots.ts dinámicos.
Open Graph image generada con @vercel/og.
JSON-LD schema.org/CollectionPage listando las apps como hasPart.
Deploy

Desplegado en Vercel. Mientras el dominio propio (trastero.dev) no esté configurado, se usa la URL auto-generada de Vercel — no bloquea nada del desarrollo. Al activar el dominio custom, agregar redirect 301 desde el dominio antiguo de cada app migrada (ver roadmap del proyecto).