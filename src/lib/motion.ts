// Motion primitives for the product sheet transition. Dependency-free on
// purpose: springs are sampled into a CSS `linear()` easing, so the browser's
// animation engine drives every frame instead of a JavaScript loop.

export type SpringConfig = {
  stiffness: number;
  damping: number;
  mass?: number;
};

export type Timing = {
  easing: string;
  /** Milliseconds until the spring has visually come to rest. */
  duration: number;
};

/** Amplitude below which the spring is considered settled. */
const REST = 0.001;
const SAMPLES = 64;

// Browsers without `linear()` (Safari < 17.4) still get a curve with the same
// character — a little past the target, then back.
const FALLBACK_OVERSHOOT = "cubic-bezier(0.34, 1.28, 0.42, 1)";
const FALLBACK_SETTLE = "cubic-bezier(0.32, 0.72, 0, 1)";

let linearEasing: boolean | null = null;

function supportsLinearEasing(): boolean {
  if (linearEasing === null) {
    linearEasing =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("transition-timing-function", "linear(0, 1)");
  }
  return linearEasing;
}

/**
 * Turn a spring into an easing curve plus the duration it needs. Under-damped
 * configs (`damping` below critical) overshoot slightly before settling.
 */
export function spring({ stiffness, damping, mass = 1 }: SpringConfig): Timing {
  const naturalFrequency = Math.sqrt(stiffness / mass);
  const ratio = damping / (2 * Math.sqrt(stiffness * mass));
  const decay = ratio * naturalFrequency;
  const duration = Math.round((-Math.log(REST) / decay) * 1000);

  if (!supportsLinearEasing()) {
    return {
      easing: ratio < 1 ? FALLBACK_OVERSHOOT : FALLBACK_SETTLE,
      duration,
    };
  }

  const damped =
    ratio < 1 ? naturalFrequency * Math.sqrt(1 - ratio * ratio) : 0;
  const points: string[] = [];

  for (let i = 0; i <= SAMPLES; i += 1) {
    const t = (i / SAMPLES) * (duration / 1000);
    const envelope = Math.exp(-decay * t);
    const value =
      damped > 0
        ? 1 -
          envelope *
            (Math.cos(damped * t) + (decay / damped) * Math.sin(damped * t))
        : 1 - envelope * (1 + decay * t);
    points.push(value.toFixed(4));
  }
  // Land exactly on the target, whatever the sampling did.
  points[points.length - 1] = "1";

  return { easing: `linear(${points.join(",")})`, duration };
}

/** A rectangle plus the corner radius that goes with it. */
export type Surface = {
  top: number;
  left: number;
  width: number;
  height: number;
  radius: number;
};

/** Measure an element's box and corner radius in viewport coordinates. */
export function readSurface(element: Element): Surface {
  const box = element.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left,
    width: box.width,
    height: box.height,
    radius: parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0,
  };
}

/** The same box, shrunk about its centre — used when there is no origin element. */
export function shrinkSurface(surface: Surface, scale = 0.92): Surface {
  const width = surface.width * scale;
  const height = surface.height * scale;
  return {
    top: surface.top + (surface.height - height) / 2,
    left: surface.left + (surface.width - width) / 2,
    width,
    height,
    radius: surface.radius,
  };
}

/** Geometry as an animatable keyframe. Real box properties, so nothing distorts. */
export function surfaceKeyframe(surface: Surface): Keyframe {
  return {
    top: `${surface.top}px`,
    left: `${surface.left}px`,
    width: `${surface.width}px`,
    height: `${surface.height}px`,
    borderRadius: `${surface.radius}px`,
  };
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
