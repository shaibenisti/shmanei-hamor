import Link from "next/link";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="bg-soft-radial relative overflow-hidden">
      <div className="container-page grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/50 px-4 py-1.5 text-xs font-medium tracking-wide text-brown">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            ארומתרפיה · צמחי מרפא · בעבודת יד
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
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sage/30 to-gold/20 blur-2xl" />
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[2.5rem] border border-gold/20 bg-white/60 p-10 text-center shadow-soft backdrop-blur">
              <div className="animate-float text-6xl">🌿</div>
              <p className="mt-6 font-serif text-2xl font-bold text-deep-green">
                טבע · רוגע · נפש
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                כל מוצר נרקח בקפידה מצמחי מרפא, כחלק משגרת טיפוח טבעית ועדינה.
              </p>
              <div className="mt-6 h-px w-16 bg-gold/50" />
              <p className="mt-4 text-sm text-brown">{site.owner}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
