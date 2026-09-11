import type { Metadata } from "next";
import { apps } from "@/config/apps.config";
import { AppGrid } from "@/components/AppGrid";
import { Hero } from "@/components/Hero";
import { buildMetadata } from "@/lib/metadata";
import { SITE_DESCRIPTION, SITE_NAME, getBaseUrl } from "@/lib/site";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `${SITE_NAME} — hub de apps`,
    description: SITE_DESCRIPTION,
    path: "/",
  });
}

function collectionJsonLd() {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} — hub de apps`,
    description: SITE_DESCRIPTION,
    url: baseUrl,
    hasPart: apps.map((app) => ({
      "@type": "SoftwareApplication",
      name: app.name,
      description: app.description,
      url: app.url,
      applicationCategory: "WebApplication",
    })),
  };
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd()) }}
      />
      <Hero />
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <AppGrid />
      </section>
    </main>
  );
}
