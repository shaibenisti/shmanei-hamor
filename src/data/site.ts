// Central site-wide configuration. All user-facing strings are Hebrew;
// keys, ids and structure stay in English.

export const site = {
  name: "שמני המור",
  owner: "לימור בניסטי",
  tagline: "חיבור טבעי בין גוף, נפש וצמחי מרפא",
  description:
    "שמני המור — שמנים מצמחי מרפא, חליטות ומוצרים טבעיים בעבודת יד, לצד טיפולי עיסוי לנשים. חיבור טבעי בין גוף, נפש וצמחי מרפא.",
  phone: "0502551350",
  phoneDisplay: "050-255-1350",
  whatsapp: "https://wa.me/972502551350",
  location: "מושב שדה תרומות",
  disclaimer:
    "המידע באתר אינו מהווה ייעוץ רפואי או תחליף להתייעצות עם גורם מקצועי. השימוש במוצרים בהתאם להנחיות המצורפות.",
} as const;

export const nav = [
  { href: "/", label: "בית" },
  { href: "/products", label: "מוצרים" },
  { href: "/treatments", label: "טיפולים" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
] as const;

// On a GitHub Pages project site the app is served from /<repo>/. `<Link>`
// navigation and `_next/*` assets get this prefix automatically, but
// `next/image` with `unoptimized` does NOT prefix the `src`, so we add it
// manually for any image / public asset referenced by path.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prefix a public asset path with the configured basePath.
 */
export function asset(path: string): string {
  return `${basePath}${path}`;
}

/**
 * Build a WhatsApp link with a pre-filled Hebrew message.
 */
export function whatsappLink(message?: string): string {
  if (!message) return site.whatsapp;
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
