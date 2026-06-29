import Image from "next/image";
import Link from "next/link";
import { asset, site } from "@/data/site";

const highlights = [
  { label: "לנשים בלבד", icon: "🌸" },
  { label: "שעה", icon: "⏳" },
  { label: "240 ₪", icon: "🌿" },
  { label: site.location, icon: "📍" },
];

export default function TreatmentPreview() {
  return (
    <section className="relative overflow-hidden bg-deep-green text-cream">
      <div className="bg-soft-radial absolute inset-0 opacity-30" />
      <div className="container-page relative grid items-center gap-10 py-20 md:grid-cols-2 md:py-24">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold/60" />
            הטיפול שלנו
          </span>
          <h2 className="font-serif text-3xl font-bold text-cream md:text-4xl">
            עיסוי גוף עם צמחי מרפא לנשים
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/80">
            טיפול עיסוי ייחודי לנשים בלבד, המשלב מגע, שמנים מצמחי מרפא ואווירה
            רגועה ומכילה. הטיפול נועד להעניק תחושת רוגע, שלווה וחיבור מחודש לגוף,
            בליווי אישי ומקצועי.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-sm font-medium text-cream/90 backdrop-blur-sm"
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/treatments"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:bg-[#d4b370] active:scale-[0.98]"
            >
              פרטים וקביעת תור
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-medium text-cream transition-all duration-300 hover:bg-cream/10"
            >
              קביעת תור בוואטסאפ
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-cream/15 shadow-soft">
            <Image
              src={asset("/images/treatments/treatment-room.png")}
              alt="חדר הטיפולים של שמני המור"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
