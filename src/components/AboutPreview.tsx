import Image from "next/image";
import Link from "next/link";
import { asset, site } from "@/data/site";

export default function AboutPreview() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative order-2 md:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-gold/20 shadow-soft">
            <Image
              src={asset("/images/about/limor-benisti.png")}
              alt={site.owner}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-5 rounded-2xl bg-deep-green px-5 py-3 text-cream shadow-soft md:right-10">
            <p className="font-serif text-lg font-bold">{site.owner}</p>
            <p className="text-xs text-cream/75">מטפלת בארומתרפיה</p>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold/60" />
            הסיפור שלנו
          </span>
          <h2 className="font-serif text-3xl font-bold text-deep-green md:text-4xl">
            אהבה לטבע, לצמחים ולאדם
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/75">
            לימור בניסטי למדה ארומתרפיה מתוך אהבה עמוקה לטבע ולצמחים, ומתוך רצון
            להנגיש דרך טבעית ומכילה לכל מי שזקוקה לרוגע, שלווה וטיפול אישי.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            דרך שמני המור, לימור משלבת בין רוחניות, צמחי מרפא, מגע אישי וחיבור
            לגוף ולנפש.
          </p>
          <Link href="/about" className="btn-outline mt-7">
            עוד על לימור ושמני המור
          </Link>
        </div>
      </div>
    </section>
  );
}
