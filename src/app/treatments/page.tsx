import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { asset, site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "טיפולים",
  description:
    "עיסוי גוף עם צמחי מרפא לנשים — טיפול ייחודי המשלב מגע, שמנים מצמחי מרפא ואווירה רגועה ומכילה.",
};

const details = [
  { label: "סוג הטיפול", value: "עיסוי ייחודי לנשים בלבד" },
  { label: "משך הטיפול", value: "שעה" },
  { label: "מחיר", value: "240 ₪" },
  { label: "מיקום", value: site.location },
  { label: "קביעת תור", value: `טלפון / וואטסאפ ${site.phoneDisplay}` },
];

export default function TreatmentsPage() {
  const message = whatsappLink(
    "שלום, אשמח לקבוע תור לעיסוי גוף עם צמחי מרפא לנשים 🌿"
  );

  return (
    <>
      <section className="bg-soft-radial border-b border-gold/15">
        <div className="container-page py-16 md:py-20">
          <SectionTitle
            eyebrow="טיפולים"
            title="עיסוי גוף עם צמחי מרפא לנשים"
            subtitle="טיפול עיסוי ייחודי לנשים בלבד, המשלב מגע, שמנים מצמחי מרפא ואווירה רגועה ומכילה."
          />
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <div className="relative mb-12 aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-gold/20 shadow-soft sm:aspect-[16/9]">
          <Image
            src={asset("/images/treatments/treatment-room.png")}
            alt="חדר הטיפולים של שמני המור"
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="font-serif text-2xl font-bold text-deep-green">
              על הטיפול
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              טיפול עיסוי ייחודי לנשים בלבד, המשלב מגע, שמנים מצמחי מרפא ואווירה
              רגועה ומכילה. הטיפול נועד להעניק תחושת רוגע, שלווה וחיבור מחודש
              לגוף, בליווי אישי ומקצועי.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              לאורך כל הטיפול נשמרת אווירה נעימה, דיסקרטית ומכבדת, מתוך הקשבה
              לצרכים האישיים של כל אישה. השמנים המשמשים בטיפול נרקחים בעבודת יד
              מצמחי מרפא טבעיים.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={message}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                קביעת תור בוואטסאפ
              </a>
              <a href={`tel:${site.phone}`} className="btn-outline">
                התקשרו: {site.phoneDisplay}
              </a>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-3xl border border-gold/15 bg-white p-7 shadow-card">
              <h3 className="font-serif text-xl font-bold text-deep-green">
                פרטי הטיפול
              </h3>
              <dl className="mt-5 divide-y divide-gold/15">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between gap-4 py-3"
                  >
                    <dt className="text-sm text-ink/60">{item.label}</dt>
                    <dd className="text-end text-sm font-medium text-ink/85">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        <p className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gold/15 bg-white/60 p-5 text-center text-xs leading-relaxed text-ink/60">
          {site.disclaimer}
        </p>
      </section>
    </>
  );
}
