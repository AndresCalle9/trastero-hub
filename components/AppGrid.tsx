import { apps } from "@/config/apps.config";
import { AppCard } from "./AppCard";

export function AppGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((app) => (
        <AppCard key={app.name} app={app} />
      ))}
    </div>
  );
}
