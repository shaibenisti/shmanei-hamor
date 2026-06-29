import Image from "next/image";
import type { Product } from "@/data/products";
import { asset, whatsappLink } from "@/data/site";

export default function ProductCard({ product }: { product: Product }) {
  const orderMessage = `שלום, אשמח להזמין את "${product.name}" (${product.size}) במחיר ${product.price} ₪ 🌿`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-square overflow-hidden bg-cream">
        <Image
          src={asset(product.image)}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-brown shadow-sm backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-bold leading-snug text-deep-green">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-ink/60">
          <span>{product.size}</span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-gold/15 pt-4">
          <span className="text-lg font-bold text-brown">
            {product.price} ₪
          </span>
          <a
            href={whatsappLink(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M16.04 4C9.93 4 4.98 8.95 4.98 15.06c0 1.95.51 3.85 1.47 5.53L4.9 27.1l6.69-1.53a11.02 11.02 0 0 0 4.45.94c6.11 0 11.06-4.95 11.06-11.06C27.11 8.95 22.16 4 16.04 4zm0 20.2c-1.4 0-2.78-.38-3.99-1.09l-.29-.17-2.97.68.7-2.9-.19-.3a8.99 8.99 0 0 1-1.38-4.79c0-4.98 4.06-9.04 9.06-9.04 2.42 0 4.69.94 6.4 2.65a8.97 8.97 0 0 1 2.65 6.4c0 5-4.06 9.05-9.06 9.05z" />
            </svg>
            הזמנה
          </a>
        </div>
      </div>
    </article>
  );
}
