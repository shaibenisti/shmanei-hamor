import Link from "next/link";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ProductGrid from "@/components/ProductGrid";
import AboutPreview from "@/components/AboutPreview";
import TreatmentPreview from "@/components/TreatmentPreview";
import { products } from "@/data/products";
import { site } from "@/data/site";

const trust = [
  "רקיחה בעבודת יד",
  "צמחי מרפא טבעיים",
  "טיפולי מגע לנשים",
];

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-y border-gold/15">
        <div className="container-page flex flex-col items-center justify-center gap-3 py-6 text-center sm:flex-row sm:gap-0">
          {trust.map((item, i) => (
            <span key={item} className="flex items-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className="mx-5 hidden h-4 w-px bg-gold/30 sm:block"
                />
              )}
              <span className="font-serif text-sm tracking-wide text-deep-green md:text-base">
                {item}
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page py-12 md:py-16">
        <SectionTitle
          eyebrow="המוצרים שלנו"
          title="מוצרים נבחרים"
          subtitle="מבחר שמנים, חליטות ומוצרים טבעיים הנרקחים בעבודת יד מצמחי מרפא."
        />
        <div className="mt-12">
          <ProductGrid products={featured} />
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/products" className="btn-primary">
            לכל המוצרים
          </Link>
        </div>
      </section>

      <TreatmentPreview />

      <AboutPreview />

      {/* CTA */}
      <section className="container-page pb-8">
        <div className="bg-soft-radial relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-white px-8 py-14 text-center shadow-card md:px-16 md:py-20">
          <h2 className="font-serif text-3xl font-bold text-deep-green md:text-4xl">
            רוצה לשמוע עוד?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/70">
            נשמח ללוות אותך ולהמליץ על המוצר או הטיפול המתאים לך. צרי קשר בטלפון
            או בוואטסאפ ונחזור אלייך בהקדם.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              דברו איתנו בוואטסאפ
            </a>
            <Link href="/contact" className="btn-outline">
              פרטי יצירת קשר
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
