import type { Metadata } from "next";
import { SITE_NAME, getBaseUrl } from "./site";

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Path de la ruta, ej. "/" o "/about". */
  path: string;
}

/**
 * Helper local para estandarizar metadata por ruta (title, description, OG,
 * Twitter). @andrescalle9/ui documenta un `generateAppMetadata()` pensado
 * para este mismo propósito, pero la versión publicada (0.2.0) no lo exporta
 * todavía — ver README de este repo, sección "Notas sobre @andrescalle9/ui".
 */
export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  const url = new URL(path, getBaseUrl()).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
