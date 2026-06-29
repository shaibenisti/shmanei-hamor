import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "מוצרים",
  description:
    "שמנים מצמחי מרפא, חליטות, בשמים ומוצרים טבעיים בעבודת יד — שמני המור.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="bg-soft-radial border-b border-gold/15">
        <div className="container-page py-16 md:py-20">
          <SectionTitle
            eyebrow="קטלוג"
            title="המוצרים שלנו"
            subtitle="מבחר שמנים, חליטות, בשמים וערכות טבעיות הנרקחים בעבודת יד מצמחי מרפא, כחלק משגרת טיפוח טבעית ועדינה."
          />
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <ProductGrid products={products} />

        <p className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gold/15 bg-white/60 p-5 text-center text-xs leading-relaxed text-ink/60">
          {site.disclaimer}
        </p>
      </section>
    </>
  );
}
