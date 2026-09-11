import type { AppIconName } from "@/components/app-icons";

export type AppStatus = "live" | "soon";

/** Nombre de ícono de components/app-icons.tsx, o una ruta a una imagen en /public. */
export type AppIcon = AppIconName | `/${string}`;

export interface AppConfig {
  name: string;
  description: string;
  url: string;
  icon: AppIcon;
  status: AppStatus;
}

/**
 * Fuente de verdad del grid de apps del hub. Para agregar una app nueva,
 * agrega un objeto al array — no hace falta tocar componentes ni rutas.
 * Ver README para el detalle de cada campo.
 */
export const apps: AppConfig[] = [
  {
    name: "Nest",
    description: "Reparte las tareas de la casa sin que nadie se pelee por quién lava.",
    url: "https://home-tasks-phi.vercel.app/",
    icon: "/apps/nest-logo.png",
    status: "live",
  },
  {
    name: "Ledger",
    description: "Gastos compartidos sin abrir una hoja de cálculo cada vez.",
    url: "",
    icon: "Receipt",
    status: "soon",
  },
  {
    name: "Wisp",
    description: "Notas rápidas que se archivan solas cuando ya no las necesitas.",
    url: "",
    icon: "Sparkles",
    status: "soon",
  },
];
