import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { asset, whatsappLink } from "@/data/site";

const highlights = [
  "מתאים לכל טיפול",
  "מתנה מושלמת לימי הולדת, חגים ואירועים מיוחדים",
  "בתיאום מראש",
];

export default function GiftVoucher() {
  const order = whatsappLink("שלום, אשמח להזמין שובר מתנה לטיפול 🌿");

  return (
    <section className="bg-soft-radial relative overflow-hidden border-t border-gold/15">
      <div className="container-page py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-7">
            {/* soft premium halo */}
            <div className="absolute -inset-4 rounded-[2.75rem] bg-gradient-to-br from-sage/30 to-gold/20 blur-2xl" />

            <figure className="relative aspect-[3/2] w-full overflow-hidden rounded-[2rem] border border-gold/30 shadow-soft">
              <Image
                src={asset("/images/treatments/gift-voucher.png")}
                alt="שובר מתנה לטיפולים של שמני המור"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />

              {/* delicate inner hairline frame */}
              <div className="pointer-events-none absolute inset-2.5 rounded-[1.6rem] border border-cream/30" />
            </figure>
          </div>

          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow="מתנה"
              align="start"
              title="כרטיס מתנה לטיפולים"
              subtitle="העניקו חוויה של רוגע, איזון ובריאות לאנשים היקרים לכם."
            />

            <ul className="mt-8 space-y-3.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span className="text-base leading-relaxed text-ink/75">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={order}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-9"
            >
              הזמנת שובר מתנה
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
