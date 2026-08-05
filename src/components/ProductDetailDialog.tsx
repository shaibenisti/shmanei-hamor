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
import BotanicalMark from "./BotanicalMark";

// Motion is deliberately asymmetric: the sheet unfolds slowly and settles,
// then leaves quickly. Easings mirror the iOS sheet curves.
const OPEN_MS = 560;
const CLOSE_MS = 320;
const REDUCED_MS = 120;
const EASE_OUT = "cubic-bezier(0.32, 0.72, 0, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 0.7, 1)";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Transform that parks the panel over the button that opened it, so the sheet
 * appears to grow out of the card instead of simply appearing.
 */
function collapsedTransform(panel: DOMRect, trigger: DOMRect | null) {
  if (!trigger) return { origin: "50% 50%", transform: "scale(0.94)" };

  const triggerX = trigger.left + trigger.width / 2;
  const triggerY = trigger.top + trigger.height / 2;
  // The growth point, clamped to the panel so an off-screen trigger still
  // produces a sane origin.
  const origin = `${clamp(triggerX - panel.left, 0, panel.width)}px ${clamp(
    triggerY - panel.top,
    0,
    panel.height,
  )}px`;
  // A light pull towards the card — enough to read as motion, not a fly-in.
  const dx = (triggerX - (panel.left + panel.width / 2)) * 0.12;
  const dy = (triggerY - (panel.top + panel.height / 2)) * 0.12;

  return { origin, transform: `translate(${dx}px, ${dy}px) scale(0.86)` };
}

export default function ProductDetailDialog({
  product,
  detail,
  triggerRef,
  onClose,
}: {
  product: Product;
  detail: ProductDetail;
  /** Button that opened the sheet — the motion origin and focus to restore. */
  triggerRef: RefObject<HTMLElement>;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const triggerRect = useRef<DOMRect | null>(null);
  const closing = useRef(false);
  const titleId = useId();

  /** Play the exit animation, then let the parent unmount us. */
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;

    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) {
      onClose();
      return;
    }

    const reduced = prefersReducedMotion();
    const duration = reduced ? REDUCED_MS : CLOSE_MS;
    const options: KeyframeAnimationOptions = {
      duration,
      easing: EASE_IN,
      fill: "forwards",
    };
    const { transform } = collapsedTransform(
      panel.getBoundingClientRect(),
      triggerRect.current,
    );

    backdrop.animate([{ opacity: 1 }, { opacity: 0 }], options);
    const exit = panel.animate(
      reduced
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [
            { transform: "none", opacity: 1 },
            { transform, opacity: 0 },
          ],
      options,
    );
    exit.onfinish = onClose;
  }, [onClose]);

  // Entrance. Runs before paint so the panel is never seen at its final size.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    triggerRect.current = triggerRef.current?.getBoundingClientRect() ?? null;

    const reduced = prefersReducedMotion();
    const duration = reduced ? REDUCED_MS : OPEN_MS;
    const options: KeyframeAnimationOptions = {
      duration,
      easing: reduced ? "ease-out" : EASE_OUT,
      fill: "backwards",
    };
    const { origin, transform } = collapsedTransform(
      panel.getBoundingClientRect(),
      triggerRect.current,
    );

    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], options);
    panel.style.transformOrigin = origin;
    panel.animate(
      reduced
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [
            { transform, opacity: 0 },
            { transform: "none", opacity: 1 },
          ],
      options,
    );
  }, [triggerRef]);

  // Freeze the page behind the sheet, compensating for the scrollbar so the
  // layout does not jump. In RTL the browser may park it on the left.
  useEffect(() => {
    const { body, documentElement: root } = document;
    const gutter = window.innerWidth - root.clientWidth;
    const side =
      root.getBoundingClientRect().left > 0 ? "paddingLeft" : "paddingRight";
    const previous = { overflow: body.style.overflow, pad: body.style[side] };

    body.style.overflow = "hidden";
    if (gutter > 0) body.style[side] = `${gutter}px`;

    return () => {
      body.style.overflow = previous.overflow;
      body.style[side] = previous.pad;
    };
  }, []);

  // Move focus into the sheet, keep it there, and hand it back on close.
  useEffect(() => {
    const restoreTo = triggerRef.current;
    panelRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const stops = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (stops.length === 0) {
        event.preventDefault();
        return;
      }

      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        ref={backdropRef}
        onClick={close}
        aria-hidden="true"
        className="absolute inset-0 bg-ink/45 backdrop-blur-md"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={
          {
            "--accent": detail.accent.base,
            "--accent-soft": detail.accent.soft,
          } as CSSProperties
        }
        className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-gold/25 bg-cream shadow-soft outline-none"
      >
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
              delayMs={120 + index * 70}
            />
          ))}

          <footer
            className="detail-reveal mt-12 animate-fade-up border-t border-gold/20 pt-8 text-center"
            style={{ animationDelay: `${160 + detail.sections.length * 70}ms` }}
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
