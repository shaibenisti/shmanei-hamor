import { site, whatsappLink } from "@/data/site";

const items = [
  {
    label: "טלפון",
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
    icon: "📞",
  },
  {
    label: "וואטסאפ",
    value: "שליחת הודעה מהירה",
    href: whatsappLink("שלום, אשמח לקבל פרטים נוספים 🌿"),
    icon: "💬",
    external: true,
  },
  {
    label: "מיקום",
    value: site.location,
    icon: "📍",
  },
];

export default function ContactCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => {
        const content = (
          <div className="flex h-full flex-col items-center rounded-2xl border border-gold/15 bg-white p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
            <div className="text-3xl">{item.icon}</div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold">
              {item.label}
            </p>
            <p
              className="mt-1 text-base font-medium text-ink/80"
              dir={item.label === "טלפון" ? "ltr" : undefined}
            >
              {item.value}
            </p>
          </div>
        );

        if (!item.href) {
          return (
            <div key={item.label} className="h-full">
              {content}
            </div>
          );
        }

        return (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="h-full"
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}
