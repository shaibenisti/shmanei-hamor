import Image from "next/image";
import Link from "next/link";
import { asset, site } from "@/data/site";

export default function Hero() {
  return (
    <section className="bg-soft-radial relative overflow-hidden">
      <div className="container-page grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/50 px-4 py-1.5 text-xs font-medium tracking-wide text-brown">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            ארומתרפיה · צמחי מרפא · בעבודת יד · עיסויים
          </span>

          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-deep-green md:text-6xl">
            {site.name}
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75 md:text-xl">
            {site.tagline}
          </p>

          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60">
            שמנים מצמחי מרפא, חליטות ומוצרים טבעיים הנרקחים בעבודת יד, לצד טיפולי
            עיסוי לנשים — מתוך אהבה לטבע, רוגע וחיבור לגוף ולנפש.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary">
              לצפייה במוצרים
            </Link>
            <Link href="/treatments" className="btn-outline">
              טיפולי עיסוי לנשים
            </Link>
          </div>
        </div>

        <div className="relative animate-fade-up">
          <div className="relative mx-auto w-full max-w-sm">
            {/* soft premium halo */}
            <div className="absolute -inset-4 rounded-[2.75rem] bg-gradient-to-br from-sage/30 to-gold/20 blur-2xl" />

            {/* portrait card */}
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-gold/30 shadow-soft">
              <Image
                src={asset("/images/hero/limor-portrait.png")}
                alt={site.owner}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />

              {/* gentle gradient at the bottom for caption readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep-green/85 via-deep-green/25 to-transparent" />

              {/* delicate inner hairline frame */}
              <div className="pointer-events-none absolute inset-2.5 rounded-[2rem] border border-cream/25" />

              <figcaption className="absolute inset-x-0 bottom-0 p-6 pb-7 text-center">
                <p className="font-serif text-xl font-bold tracking-wide text-cream">
                  {site.owner}
                </p>
                <div className="mx-auto my-2.5 h-px w-10 bg-gold/50" />
                <p className="text-[11px] font-medium leading-relaxed tracking-wide text-cream/90">
                  רקיחה בעבודת יד · צמחי מרפא טבעיים · טיפולי מגע לנשים
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
