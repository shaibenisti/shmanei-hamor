"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/data/products";
import { sheetBlessing, type DetailSection, type ProductDetail } from "@/data/productDetails";
import { site } from "@/data/site";
import {
  prefersReducedMotion,
  readSurface,
  shrinkSurface,
  spring,
  surfaceKeyframe,
  type Surface,
  type SpringConfig,
} from "@/lib/motion";
import BotanicalMark from "./BotanicalMark";

// The sheet is not a modal that appears — it is the product card itself,
// growing. One surface animates its box and its corners from the card's
// geometry to the sheet's; the card underneath hands over in the first frames
// and takes over again at the end, so there is never a second element to see.

/** Opening: under-damped, so the surface eases just past its size and settles. */
const OPEN_SPRING: SpringConfig = { stiffness: 240, damping: 22.5 };
/** Closing: critically damped — quick, no bounce on the way back to the card. */
const CLOSE_SPRING: SpringConfig = { stiffness: 420, damping: 41 };

/** Only ever applied to the backdrop, and to the hand-over at each end. */
const HANDOVER_MS = 180;
const CONTENT_IN_MS = 260;
const CONTENT_OUT_MS = 150;
const BACKDROP_MS = 420;
const REDUCED_MS = 140;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Freeze the page behind the sheet without letting the layout shift. */
function lockPageScroll(): () => void {
  const { body, documentElement: root } = document;
  const gutter = window.innerWidth - root.clientWidth;
  // In RTL the browser may park the scrollbar on the left.
  const side =
    root.getBoundingClientRect().left > 0 ? "paddingLeft" : "paddingRight";
  const previous = { overflow: body.style.overflow, pad: body.style[side] };

  body.style.overflow = "hidden";
  if (gutter > 0) body.style[side] = `${gutter}px`;

  return () => {
    body.style.overflow = previous.overflow;
    body.style[side] = previous.pad;
  };
}

/**
 * Take the surface out of the centring flow so its box can be animated, and
 * freeze the content at the sheet's final size. Frozen content is the reason
 * the morph reads as one surface: nothing inside reflows or re-wraps while the
 * box changes — the growing surface simply reveals more of a page that is
 * already laid out.
 */
function pin(
  surface: HTMLElement,
  content: HTMLElement,
  box: Surface,
  sheet: Surface,
) {
  Object.assign(surface.style, {
    position: "fixed",
    top: `${box.top}px`,
    left: `${box.left}px`,
    width: `${box.width}px`,
    height: `${box.height}px`,
    // Explicit geometry must win over the layout classes, including while the
    // spring is reaching past its target.
    maxWidth: "none",
    maxHeight: "none",
    margin: "0",
  });
  Object.assign(content.style, {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: `${sheet.width}px`,
    height: `${sheet.height}px`,
    maxHeight: "none",
  });
}

function unpin(surface: HTMLElement, content: HTMLElement) {
  for (const property of [
    "position",
    "top",
    "left",
    "width",
    "height",
    "maxWidth",
    "maxHeight",
    "margin",
    "transform",
  ] as const) {
    surface.style[property] = "";
    content.style[property] = "";
  }
}

export default function ProductDetailDialog({
  product,
  detail,
  originRef,
  triggerRef,
  onClose,
}: {
  product: Product;
  detail: ProductDetail;
  /** The product card — the surface this sheet grows out of and back into. */
  originRef: RefObject<HTMLElement>;
  /** Button that opened the sheet; focus returns here. */
  triggerRef: RefObject<HTMLElement>;
  onClose: () => void;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  /** The sheet's resting geometry, kept so the content can stay frozen at it. */
  const sheetBox = useRef<Surface | null>(null);
  const pinned = useRef(false);
  const closing = useRef(false);
  const titleId = useId();

  /** Collapse the surface back into the card, then let the parent unmount us. */
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;

    const surface = surfaceRef.current;
    const content = contentRef.current;
    const backdrop = backdropRef.current;
    if (!surface || !content || !backdrop) {
      onClose();
      return;
    }

    if (prefersReducedMotion()) {
      backdrop.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: REDUCED_MS,
        fill: "forwards",
      });
      const fade = surface.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: REDUCED_MS,
        fill: "forwards",
      });
      fade.onfinish = onClose;
      return;
    }

    // Start from wherever the surface is *right now*, so closing mid-open
    // reverses from that point instead of jumping to the finished size.
    const from = readSurface(surface);
    const sheet = (pinned.current ? sheetBox.current : readSurface(surface)) ?? from;
    for (const element of [surface, content, backdrop]) {
      element.getAnimations().forEach((animation) => animation.cancel());
    }
    pin(surface, content, from, sheet);
    pinned.current = true;

    const origin = originRef.current;
    const target = origin ? readSurface(origin) : shrinkSurface(sheet);
    const { easing, duration } = spring(CLOSE_SPRING);
    const handover = Math.min(HANDOVER_MS, Math.round(duration * 0.5));

    backdrop.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
      easing: "ease-in",
      fill: "forwards",
    });
    surface.animate([surfaceKeyframe(from), surfaceKeyframe(target)], {
      duration,
      easing,
      fill: "forwards",
    });
    content.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: CONTENT_OUT_MS,
      easing: "ease-in",
      fill: "forwards",
    });
    // The surface itself only gives way at the very end, once it is back at
    // card size and the card behind it can take over unnoticed.
    const fade = surface.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: handover,
      delay: duration - handover,
      easing: "ease-in",
      fill: "forwards",
    });
    fade.onfinish = onClose;
  }, [onClose, originRef]);

  // Grow out of the card. Runs before paint, so the sheet is never seen at its
  // final size first.
  useLayoutEffect(() => {
    const surface = surfaceRef.current;
    const content = contentRef.current;
    const backdrop = backdropRef.current;
    if (!surface || !content || !backdrop) return;

    // Lock first, measure second: compensating for the scrollbar nudges the
    // centred page, and the card's box has to be read after that settles.
    const unlock = lockPageScroll();
    const reduced = prefersReducedMotion();

    // Leave no trace behind: the effect has to be re-runnable, or a second
    // pass would measure the surface mid-morph and animate it to itself.
    const reset = () => {
      unlock();
      for (const element of [surface, content, backdrop]) {
        element.getAnimations().forEach((animation) => animation.cancel());
      }
      unpin(surface, content);
      pinned.current = false;
    };

    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: reduced ? REDUCED_MS : BACKDROP_MS,
      easing: "ease-out",
      fill: "backwards",
    });

    if (reduced) {
      surface.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: REDUCED_MS,
        easing: "ease-out",
        fill: "backwards",
      });
      return reset;
    }

    const sheet = readSurface(surface);
    const origin = originRef.current;
    const from = origin ? readSurface(origin) : shrinkSurface(sheet);

    sheetBox.current = sheet;
    pin(surface, content, sheet, sheet);
    pinned.current = true;

    const { easing, duration } = spring(OPEN_SPRING);
    const geometry = surface.animate(
      [surfaceKeyframe(from), surfaceKeyframe(sheet)],
      { duration, easing, fill: "backwards" },
    );
    // A short hand-over from the card underneath — not a fade-in. By the time
    // the surface has grown noticeably it is already solid.
    surface.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: HANDOVER_MS,
      easing: "ease-out",
      fill: "backwards",
    });
    content.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: CONTENT_IN_MS,
      delay: 70,
      easing: "ease-out",
      fill: "backwards",
    });

    // Once at rest, hand the geometry back to the stylesheet so the sheet stays
    // responsive to viewport changes.
    geometry.finished
      .then(() => {
        if (closing.current) return;
        unpin(surface, content);
        pinned.current = false;
      })
      .catch(() => {
        /* cancelled by an early close */
      });

    return reset;
  }, [originRef]);

  // Move focus into the sheet, keep it there, and hand it back on close.
  useEffect(() => {
    const restoreTo = triggerRef.current;
    surfaceRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const surface = surfaceRef.current;
      if (!surface) return;
      const stops = Array.from(surface.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (stops.length === 0) {
        event.preventDefault();
        return;
      }

      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === surface)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreTo?.focus({ preventScroll: true });
    };
  }, [close, triggerRef]);

  if (typeof document === "undefined") return null;

  // Size sits under the title as context, not as a second product header.
  const context = [product.category, product.size].filter(Boolean).join(" · ");

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={
        {
          "--accent": detail.accent.base,
          "--accent-soft": detail.accent.soft,
        } as CSSProperties
      }
    >
      <div
        ref={backdropRef}
        onClick={close}
        aria-hidden="true"
        className="absolute inset-0 bg-ink/45 backdrop-blur-md"
      />

      {/* The morphing surface: box, corners and shadow all interpolate. */}
      <div
        ref={surfaceRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-gold/25 bg-cream shadow-soft outline-none"
      >
        <div ref={contentRef} className="relative flex max-h-[88vh] w-full flex-col">
          <button
            type="button"
            onClick={close}
            aria-label="סגירה"
            className="absolute left-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 bg-white/70 text-ink/60 backdrop-blur transition-all duration-300 hover:bg-white hover:text-ink active:scale-95 sm:left-7 sm:top-7"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Sheet head — centred like the printed page it comes from. */}
          <header className="relative shrink-0 overflow-hidden border-b border-gold/15 px-7 pb-8 pt-9 text-center sm:px-12 sm:pb-9 sm:pt-11">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:var(--accent-soft)] via-[color:var(--accent-soft)] to-transparent opacity-60"
            />
            <BotanicalMark
              className="pointer-events-none absolute -top-8 right-2 h-48 w-28 text-[color:var(--accent)] opacity-[0.08]"
            />
            <BotanicalMark
              flip
              className="pointer-events-none absolute -bottom-16 left-2 h-48 w-28 text-[color:var(--accent)] opacity-[0.06]"
            />

            <div className="relative">
              <p className="text-[10px] font-semibold tracking-[0.35em] text-[color:var(--accent)]">
                {sheetBlessing.opening}
              </p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-ink/55">
                {sheetBlessing.verse}
              </p>

              <Ornament className="my-5" />

              <h2
                id={titleId}
                className="font-serif text-2xl font-bold leading-snug text-deep-green sm:text-[2rem]"
              >
                {detail.title}
              </h2>

              {detail.subtitle && (
                <p className="mt-3 font-serif text-lg text-[color:var(--accent)]">
                  {detail.subtitle}
                </p>
              )}

              {context && (
                <p className="mt-4 text-[11px] tracking-[0.15em] text-ink/45">
                  {context}
                </p>
              )}
            </div>
          </header>

          {/* Focusable so the sheet can be scrolled from the keyboard alone. */}
          <div
            tabIndex={0}
            className="relative flex-1 overflow-y-auto overscroll-contain px-7 py-9 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/40 sm:px-12 sm:py-10"
          >
            {detail.sections.map((section, index) => (
              <Section
                key={section.title ?? `untitled-${index}`}
                section={section}
                lede={index === 0 && !section.title}
                delayMs={140 + index * 60}
              />
            ))}

            <footer
              className="detail-reveal mt-12 animate-fade-up border-t border-gold/20 pt-8 text-center"
              style={{ animationDelay: `${180 + detail.sections.length * 60}ms` }}
            >
              <p className="mx-auto max-w-md text-[11px] leading-relaxed text-ink/45">
                {site.disclaimer}
              </p>

              <Ornament className="my-6" />

              <p className="font-serif text-lg text-[color:var(--accent)]">
                {sheetBlessing.closing}
              </p>
              <p className="mt-3 text-xs text-ink/50">
                {site.owner} · {site.phoneDisplay}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Hairline–diamond–hairline divider used around the blessings. */
function Ornament({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <span className="h-px w-10 bg-gold/40" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[color:var(--accent)] opacity-60" />
      <span className="h-px w-10 bg-gold/40" />
    </div>
  );
}

function Section({
  section,
  lede,
  delayMs,
}: {
  section: DetailSection;
  /** Opening block: set larger, as the page's first breath. */
  lede: boolean;
  delayMs: number;
}) {
  const { title, paragraphs, items, tone = "default" } = section;
  const warning = tone === "warning";

  return (
    <section
      className={`detail-reveal animate-fade-up ${
        warning
          ? "mt-10 rounded-2xl border border-gold/20 bg-white/60 px-6 py-6"
          : tone === "note"
            ? "mt-10 rounded-2xl bg-[color:var(--accent-soft)] px-6 py-6"
            : "first:mt-0 mt-11"
      }`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {title &&
        (tone === "verse" ? (
          <p className="text-center text-[11px] font-semibold tracking-[0.25em] text-[color:var(--accent)]">
            {title}
          </p>
        ) : warning ? (
          <h3 className="flex items-center gap-2.5 text-sm font-semibold tracking-wide text-brown">
            <WarningGlyph />
            {title}
          </h3>
        ) : (
          <h3 className="flex items-center gap-3 font-serif text-xl font-bold text-deep-green">
            <span className="h-5 w-0.5 rounded-full bg-[color:var(--accent)]" />
            {title}
          </h3>
        ))}

      {paragraphs && (
        <div
          className={
            tone === "verse"
              ? "mt-3 text-center font-serif text-xl leading-relaxed text-[color:var(--accent)]"
              : warning
                ? "mt-3 space-y-1.5 text-sm leading-relaxed text-ink/60"
                : lede
                  ? "space-y-2 text-lg leading-loose text-ink/75"
                  : "mt-4 space-y-3 text-[15px] leading-loose text-ink/75"
          }
        >
          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      )}

      {items && (
        <ul
          className={`${title || paragraphs ? "mt-4" : ""} ${
            warning
              ? "space-y-2"
              : items.length > 6
                ? "grid gap-x-8 gap-y-2.5 sm:grid-cols-2"
                : "space-y-2.5"
          }`}
        >
          {items.map((item) => (
            <li
              key={item}
              className={`flex items-start gap-3 leading-relaxed ${
                warning ? "text-sm text-ink/60" : "text-[15px] text-ink/75"
              }`}
            >
              <span
                aria-hidden="true"
                className={
                  warning
                    ? "mt-2.5 h-px w-2.5 shrink-0 bg-brown/40"
                    : "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]"
                }
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function WarningGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.4v.1" />
    </svg>
  );
}
