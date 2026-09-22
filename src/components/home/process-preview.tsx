"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import { Link } from "@/i18n/navigation";
import { animate, stagger } from "animejs";
import { ArrowRight } from "lucide-react";

import { arrowLink, cn, focusRing } from "@/lib/utils";
import { duration, ease, observeOnce, prefersReducedMotion } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * ProcessPreview — Discovery → Design → Build → Deploy → Support.
 *
 * A process is a connected sequence, so it is drawn as one: nodes on a rail
 * that draws itself left-to-right as the section arrives. Five disconnected
 * cards actively misrepresented this content — they implied five separate
 * offerings rather than one path from problem to production.
 *
 * The rail animates via `scaleX` on a 1px element, which the compositor handles
 * without touching layout. No width tweening, no reflow, no jank on a long page.
 */
const STEPS = [
  { id: "discovery" },
  { id: "design" },
  { id: "build" },
  { id: "deploy" },
  { id: "support" },
] as const;

export function ProcessPreview() {
  const t = useTranslations("home.processPreview");
  const railRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLOListElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const rail = railRef.current;
    if (!root || !rail) return;

    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const show = () => {
      rail.style.transform = "";
      for (const step of steps) step.style.opacity = "";
    };

    if (prefersReducedMotion()) {
      show();
      return;
    }

    // Pre-hide here rather than in the markup: if this effect never runs, the
    // section must still be fully visible.
    rail.style.transform = "scaleX(0)";
    for (const step of steps) step.style.opacity = "0";

    let railAnim: ReturnType<typeof animate> | undefined;
    let stepAnim: ReturnType<typeof animate> | undefined;

    const cancel = observeOnce(root, () => {
      // The rail draws slightly ahead of the nodes, so each step appears to be
      // reached by the line rather than landing on it.
      railAnim = animate(rail, {
        scaleX: [0, 1],
        duration: duration.cinematic,
        ease: ease.out,
      });

      stepAnim = animate(steps, {
        opacity: [0, 1],
        y: [12, 0],
        duration: duration.slow,
        delay: stagger(90, { start: 160 }),
        ease: ease.out,
        onComplete: show,
      });
    });

    return () => {
      cancel();
      railAnim?.revert();
      stepAnim?.revert();
      show();
    };
  }, []);

  return (
    <Section
      id="process"
      aria-labelledby="process-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="05"
          eyebrow={t("heading.eyebrow")}
          headingId="process-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <div className="relative mt-16 md:mt-24">
          {/*
            The rail. Horizontal from `lg`, vertical below it — one element in
            each orientation, positioned so it passes exactly through the centre
            of the fixed-height marker rows.
          */}
          <div
            ref={railRef}
            aria-hidden="true"
            className={cn(
              "absolute origin-left bg-border",
              // Vertical rail down the left gutter on small screens.
              "left-[5px] top-2 h-[calc(100%-1rem)] w-px origin-top",
              // Horizontal rail across the marker row on large screens.
              "lg:left-0 lg:top-[5px] lg:h-px lg:w-full lg:origin-left"
            )}
          />

          <ol
            ref={rootRef}
            className="grid gap-y-9 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0"
          >
            {STEPS.map((step, i) => (
              <li
                key={step.id}
                data-step=""
                className="group relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 lg:block"
              >
                {/* Marker. 11px box keeps the 3px dot centred on the rail. */}
                <span
                  aria-hidden="true"
                  className="relative flex size-[11px] items-center justify-center lg:mb-6"
                >
                  <span className="size-[11px] rounded-full bg-bg-surface" />
                  <span className="absolute size-[7px] rounded-full border border-border-hover bg-bg-surface transition-[background-color,border-color,transform] duration-[--duration-base] ease-[--ease-out] group-hover:scale-125 group-hover:border-accent group-hover:bg-accent" />
                </span>

                <div className="lg:contents">
                  <span
                    aria-hidden="true"
                    className="tabular block font-mono text-eyebrow text-text-muted transition-colors duration-[--duration-fast] group-hover:text-accent lg:mb-3"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-h4 font-semibold text-text-primary lg:mt-0">
                    {t(`steps.${step.id}.title`)}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-pretty text-small text-text-secondary lg:mt-2.5 lg:pr-2">
                    {t(`steps.${step.id}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14">
          <Link
            href="/process"
            className={cn(arrowLink, focusRing)}
          >
            {t("fullProcessLink")}
            <ArrowRight
              className="size-4 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
