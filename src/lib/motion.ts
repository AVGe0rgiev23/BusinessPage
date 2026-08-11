import { cubicBezier } from "animejs";

/**
 * The AGility motion language.
 *
 * Every animation on the site draws its duration and easing from this file
 * rather than inventing its own. That is the whole point: a coherent motion
 * system is what separates software that feels designed from a page with
 * animations bolted onto it.
 *
 * The numbers mirror the `--duration-*` / `--ease-*` custom properties in
 * globals.css, so a CSS `transition` and an anime.js tween on the same element
 * move at exactly the same rate. Change one, change the other.
 */

/** Milliseconds. Matches `--duration-*` in globals.css. */
export const duration = {
  /** Barely perceptible — hover tints, icon nudges, focus rings. */
  micro: 120,
  /** Ordinary UI state changes. */
  fast: 200,
  /** Element entrances, accordion panels, tab swaps. */
  base: 320,
  /** Section reveals on scroll. */
  slow: 520,
  /** The hero timeline and the diagram draw. Once per page load. */
  cinematic: 900,
} as const;

/**
 * Easing curves, as anime.js easing functions built from the same cubic-bezier
 * control points as the CSS tokens.
 *
 * `out` is a strong expo-out: it leaves fast and settles slowly. Used for
 * anything entering the screen, because a long settle is what reads as
 * "expensive" rather than "mechanical".
 */
export const ease = {
  out: cubicBezier(0.16, 1, 0.3, 1),
  inOut: cubicBezier(0.65, 0, 0.35, 1),
  standard: cubicBezier(0.4, 0, 0.2, 1),
} as const;

/** Distance, in px, that revealed content travels. Deliberately small — a big
 *  slide draws attention to the animation instead of the content. */
export const revealDistance = 14;

/** Gap between staggered siblings, in ms. */
export const staggerStep = 55;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/*
  ─────────────────────────────────────────────────────────────────────────────
  Shared IntersectionObserver

  One observer for the entire page rather than one per revealed element. A long
  page has 60+ reveal targets; 60 observers each with their own callback is
  measurable jank on mid-range phones, and it is entirely avoidable — the
  observers would all have identical options anyway.

  Targets unregister themselves on first intersection, so the observer's set
  shrinks as the visitor scrolls rather than growing.
  ─────────────────────────────────────────────────────────────────────────────
*/

type RevealCallback = () => void;

const pending = new Map<Element, RevealCallback>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const callback = pending.get(entry.target);
        if (!callback) continue;
        pending.delete(entry.target);
        observer?.unobserve(entry.target);
        callback();
      }
    },
    {
      // Fire slightly before the element's top edge reaches the viewport
      // bottom, so content has finished animating by the time it is properly
      // in view. Making the visitor watch a fade-in is a failure state.
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.01,
    }
  );
  return observer;
}

/**
 * Run `callback` once, the first time `element` scrolls into view.
 * Returns a cleanup function that cancels the pending observation.
 */
export function observeOnce(
  element: Element,
  callback: RevealCallback
): () => void {
  // If the element is already in view on mount (above the fold, or a short
  // page), IntersectionObserver still fires on its first pass — but only after
  // a frame. Checking synchronously avoids a flash of hidden above-fold
  // content on fast connections.
  const rect = element.getBoundingClientRect();
  const inView =
    rect.top < (window.innerHeight || 0) && rect.bottom > 0 && rect.height >= 0;

  if (inView) {
    callback();
    return () => {};
  }

  pending.set(element, callback);
  getObserver().observe(element);

  return () => {
    pending.delete(element);
    observer?.unobserve(element);
  };
}
