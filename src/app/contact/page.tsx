import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import ContactCard from "@/components/ContactCard";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "יצירת קשר עם שמני המור — טלפון, וואטסאפ ומיקום. נשמח ללוות אותך ולהמליץ על המוצר או הטיפול המתאים.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-soft-radial border-b border-gold/15">
        <div className="container-page py-16 md:py-20">
          <SectionTitle
            eyebrow="יצירת קשר"
            title="נשמח לשמוע ממך"
            subtitle="לכל שאלה, התלבטות או קביעת תור — צרי קשר בטלפון או בוואטסאפ ונחזור אלייך בהקדם."
          />
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <ContactCard />

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-gold/15 bg-white p-8 text-center shadow-card md:p-12">
          <h2 className="font-serif text-2xl font-bold text-deep-green">
            הדרך המהירה ביותר ליצירת קשר
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/70">
            שלחי הודעה בוואטסאפ ונשמח לענות על כל שאלה לגבי המוצרים והטיפולים.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(
                "שלום, אשמח לקבל פרטים נוספים על המוצרים והטיפולים של שמני המור 🌿"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              שליחת הודעה בוואטסאפ
            </a>
            <a href={`tel:${site.phone}`} className="btn-outline" dir="ltr">
              {site.phoneDisplay}
            </a>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-xs leading-relaxed text-ink/55">
          {site.disclaimer}
        </p>
      </section>
    </>
  );
}
