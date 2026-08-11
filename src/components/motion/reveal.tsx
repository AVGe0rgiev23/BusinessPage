"use client";

import * as React from "react";
import { animate, stagger } from "animejs";

import {
  duration,
  ease,
  observeOnce,
  prefersReducedMotion,
  revealDistance,
  staggerStep,
} from "@/lib/motion";

/**
 * Marks an element as revealed so the CSS in globals.css stops hiding it.
 * Also the flag the animation checks, so an element is never animated twice.
 */
function markShown(element: HTMLElement) {
  element.dataset.reveal = "shown";
}

interface RevealProps extends React.ComponentProps<"div"> {
  /** Extra delay before this element animates, in **milliseconds**. */
  delay?: number;
}

/**
 * Reveal — the scroll-entrance primitive for a single block.
 *
 * Fades content in with a short upward drift the first time it scrolls into
 * view, then leaves it alone. Server-rendered content passed as `children`
 * stays on the server; only this wrapper is a Client Component.
 *
 * For a set of siblings that should arrive in sequence, use `RevealGroup`
 * instead — it choreographs them from one observer rather than racing N
 * independent timers.
 */
export function Reveal({
  children,
  delay = 0,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || element.dataset.reveal === "shown") return;

    // Reduced motion still needs the element made visible — it just arrives
    // without the transition.
    if (prefersReducedMotion()) {
      markShown(element);
      return;
    }

    return observeOnce(element, () => {
      animate(element, {
        opacity: [0, 1],
        y: [revealDistance, 0],
        duration: duration.slow,
        delay,
        ease: ease.out,
        onBegin: () => markShown(element),
      });
    });
  }, [delay]);

  return (
    <div ref={ref} data-reveal="" {...props}>
      {children}
    </div>
  );
}

interface RevealGroupProps extends React.ComponentProps<"div"> {
  /**
   * CSS selector for the children to stagger. Defaults to direct children,
   * which covers grids and lists without any extra markup.
   */
  selector?: string;
  /** Gap between siblings, in milliseconds. */
  step?: number;
  /** Delay before the first child animates, in milliseconds. */
  delay?: number;
  /** Render as a different element — `ul`, `ol`, `dl` where semantics demand it. */
  as?: "div" | "ul" | "ol" | "dl";
}

/**
 * RevealGroup — choreographs a set of siblings arriving in sequence.
 *
 * One observer on the container drives an anime.js `stagger()` across the
 * children, which is both cheaper than per-child observers and produces a
 * better result: the sequence is guaranteed to be in DOM order and evenly
 * spaced, instead of depending on which element happened to cross the
 * viewport threshold first during a fast scroll.
 *
 * The stagger step is deliberately short. Long staggers look impressive on a
 * dribbble shot and feel broken to someone actually trying to read the page.
 */
export function RevealGroup({
  children,
  selector = ":scope > *",
  step = staggerStep,
  delay = 0,
  as = "div",
  ...props
}: RevealGroupProps) {
  // `as` only ever swaps the semantic wrapper (div/ul/ol/dl) — every one of
  // them takes the same props and produces an HTMLElement, so the union is
  // collapsed to a single member for typing rather than made generic.
  const Tag = as as "div";
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = ref.current;
    if (!container || container.dataset.reveal === "shown") return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(selector)
    );
    if (items.length === 0) return;

    const reveal = () => {
      markShown(container);
      for (const item of items) markShown(item);
    };

    if (prefersReducedMotion()) {
      reveal();
      return;
    }

    // Hide the children up front. They are not individually marked
    // `data-reveal` in the markup, because if JavaScript never runs they must
    // stay visible — so the hidden state is applied here, at the moment we
    // know we are able to undo it.
    for (const item of items) item.style.opacity = "0";

    return observeOnce(container, () => {
      animate(items, {
        opacity: [0, 1],
        y: [revealDistance, 0],
        duration: duration.slow,
        delay: stagger(step, { start: delay }),
        ease: ease.out,
        onBegin: reveal,
        onComplete: () => {
          // Drop the inline styles anime leaves behind so hover transforms and
          // sticky positioning on these elements aren't fighting a stale
          // `transform: translateY(0px)`.
          for (const item of items) {
            item.style.opacity = "";
            item.style.transform = "";
          }
        },
      });
    });
  }, [selector, step, delay]);

  return (
    <Tag ref={ref} data-reveal="" {...(props as React.ComponentProps<"div">)}>
      {children}
    </Tag>
  );
}
