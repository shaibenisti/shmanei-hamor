import { site, whatsappLink } from "@/data/site";

/**
 * Floating WhatsApp button, fixed to the bottom-left of the viewport (RTL).
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("שלום, אשמח לקבל פרטים נוספים על המוצרים והטיפולים של שמני המור 🌿")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`וואטסאפ ${site.phoneDisplay}`}
      className="group fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-soft transition-transform duration-300 hover:scale-110 md:h-16 md:w-16"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-white md:h-8 md:w-8"
        aria-hidden="true"
      >
        <path d="M16.04 4C9.93 4 4.98 8.95 4.98 15.06c0 1.95.51 3.85 1.47 5.53L4.9 27.1l6.69-1.53a11.02 11.02 0 0 0 4.45.94h.01c6.11 0 11.06-4.95 11.06-11.06C27.11 8.95 22.16 4 16.04 4zm0 20.2h-.01c-1.4 0-2.78-.38-3.98-1.09l-.29-.17-2.97.68.7-2.9-.19-.3a8.99 8.99 0 0 1-1.38-4.79c0-4.98 4.06-9.04 9.06-9.04 2.42 0 4.69.94 6.4 2.65a8.97 8.97 0 0 1 2.65 6.4c0 5-4.06 9.05-9.06 9.05zm5.21-6.78c-.29-.14-1.69-.83-1.95-.92-.26-.1-.45-.14-.64.14-.19.29-.74.92-.9 1.11-.17.19-.33.21-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.44.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.16 2.95c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
      </svg>
      <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-full bg-deep-green px-3 py-1.5 text-xs font-medium text-cream opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 md:block">
        דברו איתנו בוואטסאפ
      </span>
    </a>
  );
}
