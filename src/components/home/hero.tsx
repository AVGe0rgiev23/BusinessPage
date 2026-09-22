"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import { Link } from "@/i18n/navigation";
import { createTimeline } from "animejs";
import { ArrowRight } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { duration, ease, prefersReducedMotion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SystemDiagram } from "@/components/home/system-diagram";

/**
 * Hero.
 *
 * The headline names the problem the buyer already has rather than promising
 * outcomes. "Save time. Cut costs. Scale faster." was three verbs any agency
 * could have written; a business owner reads it and learns nothing about
 * whether this is for them. Naming the manual work directly does that job.
 *
 * The old hero was centred: eyebrow pill, headline, paragraph and two pill
 * buttons stacked down the middle over an indigo radial glow and a faint grid.
 * That is the single most recognisable layout on the internet right now, and no
 * amount of polish makes it look like a considered piece of design.
 *
 * This version is an asymmetric two-column: an editorial type stack on the
 * left, the system diagram on the right. The headline breaks across three
 * hand-set lines of a narrowed display face, which is what turns a sentence
 * into a statement.
 *
 * Those line breaks are manual `block` spans, so they do not reflow: at the top
 * of the clamp the display face is 84px, which fits roughly 13 characters in
 * this column. Keep each line at or under that or the headline will overflow.
 */
export function Hero() {
  const t = useTranslations("home.hero");
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-hero]")
    );
    if (targets.length === 0) return;

    const reveal = () => {
      for (const el of targets) el.dataset.reveal = "shown";
    };

    if (prefersReducedMotion()) {
      reveal();
      return;
    }

    /*
      One timeline, not six independent animations. The elements arrive in
      reading order with a short overlap, so the eye is led down the stack
      rather than presented with six things fading in at once.

      `-=380` on each step starts it before the previous one finishes. That
      overlap is the difference between a sequence that feels choreographed and
      one that feels like a queue.
    */
    const timeline = createTimeline({
      defaults: {
        duration: duration.cinematic,
        ease: ease.out,
      },
    });

    timeline.call(reveal);

    targets.forEach((target, i) => {
      timeline.add(
        target,
        { opacity: [0, 1], y: [18, 0] },
        i === 0 ? 0 : "-=380"
      );
    });

    return () => {
      timeline.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/*
        Background. Three quiet layers instead of one loud purple orb:
        a warm off-centre wash anchored to the diagram side, a hairline grid
        that fades out, and film grain over the top so the flat dark ground
        reads as a material. Nothing here glows.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute right-[-10%] top-[-30%] h-[760px] w-[min(900px,100vw)] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(224,142,67,0.10), rgba(224,142,67,0.03) 55%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #efebe4 1px, transparent 1px), linear-gradient(to bottom, #efebe4 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.4) 55%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.4) 55%, transparent 92%)",
          }}
        />
        <div className="absolute inset-0 grain" />
      </div>

      <Container>
        <div
          ref={rootRef}
          /*
            Two columns only from `xl`. At `lg` (1024) the split left the
            diagram about 450px to fit five input chips, a system node, four
            outcome chips and two column headings — everything wrapped and the
            "Handled automatically" label clipped. Below 1280 the hero stacks
            instead, which gives the diagram the full container width and lets
            it keep its left-to-right reading order.
          */
          className="grid items-center gap-16 pt-20 pb-24 md:pt-28 lg:pt-32 lg:pb-36 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] xl:gap-16"
        >
          {/* ── Type stack ───────────────────────────────────────────────── */}
          <div>
            <p
              data-hero=""
              data-reveal=""
              className="flex items-center gap-2.5 font-mono text-eyebrow uppercase text-text-muted"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent"
              />
              {t("eyebrow")}
            </p>

            <h1
              id="hero-heading"
              data-hero=""
              data-reveal=""
              className="mt-7 text-display font-semibold text-text-primary"
            >
              <span className="block">{t("headline.line1")}</span>
              <span className="block">{t("headline.line2")}</span>
              <span className="block text-accent">{t("headline.accent")}</span>
            </h1>

            <p
              data-hero=""
              data-reveal=""
              className="mt-8 max-w-[52ch] text-pretty text-body-lg text-text-secondary"
            >
              {t("lede")}
            </p>

            <div
              data-hero=""
              data-reveal=""
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {/* Points at the teardown, not at /book. The page now has exactly
                  one "Book a consultation" and it sits below the teardown, so
                  the hero must not reintroduce the higher-commitment ask above
                  the lower-friction one. */}
              <Button
                size="lg"
                render={<a href="#teardown" />}
                className={cn("group", focusRing)}
              >
                {t("primaryCta")}
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-[--duration-fast] group-hover/button:translate-x-0.5"
                />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                render={<Link href="/process" />}
                className={focusRing}
              >
                {t("secondaryCta")}
              </Button>
            </div>

            {/*
              A grounded reassurance line rather than invented social proof.
              Everything asserted here is already promised elsewhere on the
              site — no client counts, no fabricated logos, no statistics.
            */}
            {/*
              Kept short enough to hold one line at every width. Uppercase mono
              at 11px with wide tracking is expensive to read; two lines of it
              under the CTAs reads as fine print, which is the opposite of
              reassuring. Both halves are wording used elsewhere on the site
              ("No obligation" on /book, "Honest answers either way" in the
              About CTA) — nothing new is claimed here.

              Set as inline content rather than flex children so that if it
              ever does wrap, it breaks at a word like prose instead of
              stranding the separator on its own line.
            */}
            <p
              data-hero=""
              data-reveal=""
              className="mt-7 font-mono text-eyebrow uppercase leading-relaxed text-text-muted"
            >
              {t("reassurance.first")}
              <span aria-hidden="true" className="px-2.5 text-border-hover">
                /
              </span>
              {t("reassurance.second")}
            </p>
          </div>

          {/* ── Diagram ──────────────────────────────────────────────────── */}
          <div data-hero="" data-reveal="">
            <SystemDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}
