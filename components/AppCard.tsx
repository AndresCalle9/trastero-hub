import Image from "next/image";
import { Card } from "@andrescalle9/ui";
import type { AppConfig, AppIcon } from "@/config/apps.config";
import { APP_ICONS, type AppIconName } from "./app-icons";

function isImagePath(icon: AppIcon): icon is `/${string}` {
  return icon.startsWith("/");
}

export function AppCard({ app }: { app: AppConfig }) {
  const isLive = app.status === "live";
  const imageIcon = isImagePath(app.icon) ? app.icon : null;
  const Icon = imageIcon ? null : APP_ICONS[app.icon as AppIconName];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-hub-accent/15">
          {imageIcon ? (
            <Image src={imageIcon} alt="" fill sizes="40px" className="object-contain p-1" />
          ) : (
            Icon && <Icon aria-hidden size={20} className="text-hub-accent" />
          )}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isLive
              ? "bg-hub-accent-2/15 text-hub-accent-2"
              : "bg-hub-text/10 text-hub-text/60"
          }`}
        >
          {isLive ? "En vivo" : "Próximamente"}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-heading text-lg font-semibold text-hub-text">{app.name}</h3>
        <p className="mt-1 text-sm text-hub-text/70">{app.description}</p>
      </div>

      {isLive ? (
        // Clases reales del paquete (dist/styles.css): reusamos el look de
        // Button sin duplicar su lógica, porque Button sólo renderiza un
        // <button> y acá necesitamos un link real al subdominio.
        <a href={app.url} className="tui-btn tui-btn--primary tui-btn--md w-full">
          Entrar
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="tui-btn tui-btn--secondary tui-btn--md w-full cursor-not-allowed opacity-50"
        >
          Próximamente
        </span>
      )}
    </Card>
  );
}
