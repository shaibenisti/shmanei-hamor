import Link from "next/link";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ProductGrid from "@/components/ProductGrid";
import AboutPreview from "@/components/AboutPreview";
import TreatmentPreview from "@/components/TreatmentPreview";
import { products } from "@/data/products";
import { site } from "@/data/site";

const values = [
  {
    icon: "🌿",
    title: "מצמחי מרפא",
    text: "שמנים וחליטות המבוססים על צמחי מרפא טבעיים, בקפידה ובאיכות.",
  },
  {
    icon: "🤍",
    title: "בעבודת יד",
    text: "כל מוצר נרקח בעבודת יד, באהבה ובתשומת לב לכל פרט.",
  },
  {
    icon: "🕊️",
    title: "רוגע ושלווה",
    text: "מוצרים וטיפולים המזמינים תחושת רוגע, שלווה וחיבור לגוף ולנפש.",
  },
];

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Brand values */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-gold/15 bg-white p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="text-4xl">{v.icon}</div>
              <h3 className="mt-4 font-serif text-xl font-bold text-deep-green">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {v.text}
              </p>
            </div>
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
