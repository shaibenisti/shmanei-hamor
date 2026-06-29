import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset, site } from "@/data/site";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "לימור בניסטי — מטפלת בארומתרפיה, מייסדת שמני המור. שמנים מצמחי מרפא ומוצרים טבעיים בעבודת יד.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-soft-radial border-b border-gold/15">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span className="h-px w-6 bg-gold/60" />
              אודות
              <span className="h-px w-6 bg-gold/60" />
            </span>
            <h1 className="font-serif text-4xl font-bold text-deep-green md:text-5xl">
              {site.owner}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              {site.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/20 shadow-soft">
              <Image
                src={asset("/images/about/limor-benisti.png")}
                alt={site.owner}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-deep-green">
              דרך טבעית, מכילה ואישית
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/75">
              <p>
                לימור בניסטי למדה ארומתרפיה מתוך אהבה עמוקה לטבע ולצמחים, ומתוך
                רצון להנגיש דרך טבעית ומכילה לכל מי שזקוקה לרוגע, שלווה וטיפול
                אישי.
              </p>
              <p>
                לאחר הלימודים היא החלה ליישם את הידע בפועל, לרקוח שמנים מצמחי
                מרפא וליצור מוצרים טבעיים בעבודת יד.
              </p>
              <p>
                דרך שמני המור, לימור משלבת בין רוחניות, צמחי מרפא, מגע אישי
                וחיבור לגוף ולנפש.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                למוצרים שלנו
              </Link>
              <Link href="/contact" className="btn-outline">
                ליצירת קשר
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy strip */}
      <section className="border-t border-gold/15 bg-white/50">
        <div className="container-page grid gap-6 py-14 sm:grid-cols-3">
          {[
            { title: "רוחניות וטבע", text: "שילוב בין עולם הצמחים לבין חיבור פנימי ורוגע." },
            { title: "מגע אישי", text: "ליווי אישי ומכיל, מתוך הקשבה לצרכים של כל אחת." },
            { title: "בעבודת יד", text: "מוצרים הנרקחים בקפידה מצמחי מרפא, באהבה." },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="font-serif text-xl font-bold text-deep-green">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
