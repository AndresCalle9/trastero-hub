import { Home, Receipt, Sparkles, type LucideIcon } from "lucide-react";

/**
 * Set cerrado de íconos disponibles para apps.config.ts. Importamos cada
 * ícono de forma explícita (en vez de todo lucide-react) para que el bundle
 * sólo incluya los que realmente se usan.
 */
export const APP_ICONS = {
  Home,
  Receipt,
  Sparkles,
} satisfies Record<string, LucideIcon>;

export type AppIconName = keyof typeof APP_ICONS;
