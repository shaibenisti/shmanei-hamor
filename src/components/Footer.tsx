import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/15 bg-deep-green text-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl font-bold text-cream">
            {site.name}
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/75">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm text-cream/70">
            בעלת העסק: {site.owner}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wide text-gold">
            ניווט
          </h4>
          <ul className="space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-cream/80 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wide text-gold">
            יצירת קשר
          </h4>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li>
              טלפון / וואטסאפ:{" "}
              <a
                href={`tel:${site.phone}`}
                dir="ltr"
                className="inline-block transition-colors hover:text-gold"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>מיקום: {site.location}</li>
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-[#d4b370]"
              >
                שליחת הודעה בוואטסאפ
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page py-6">
          <p className="text-xs leading-relaxed text-cream/55">
            {site.disclaimer}
          </p>
          <p className="mt-3 text-xs text-cream/45">
            © {new Date().getFullYear()} {site.name} · {site.owner}. כל הזכויות
            שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
