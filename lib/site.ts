export const SITE_NAME = "Trastero";

export const SITE_TAGLINE = "Un rincón con apps que hice porque sí.";

export const SITE_DESCRIPTION =
  "Trastero es el hub de apps web de Andrés Calle: soluciones simples, útiles e inútiles para el día a día, cada una en su propio rincón.";

/**
 * URL base del sitio. Usa NEXT_PUBLIC_SITE_URL si está definida (para cuando
 * el dominio propio esté activo), y si no cae a la URL auto-generada que
 * Vercel expone en cada deploy. En local, localhost.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
