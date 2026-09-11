import Image from "next/image";
import { SITE_TAGLINE } from "@/lib/site";

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-12 pt-20 text-center sm:pt-28">
      <Image
        src="/assets/brand/trastero-mark.png"
        alt=""
        width={64}
        height={64}
        priority
        className="mx-auto mb-4"
      />
      <h1 className="font-heading text-5xl font-semibold tracking-tight text-hub-text sm:text-6xl">
        Trastero
      </h1>
      <p className="mt-4 text-lg text-hub-text/70">{SITE_TAGLINE}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-hub-text/50">
        Cada app vive en su propio rincón. Acá abajo están todas juntas.
      </p>
    </section>
  );
}
