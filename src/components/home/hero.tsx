"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Decorative background: indigo radial glow + faint fading grid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-20%] h-[720px] w-[min(1100px,120vw)] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(90,110,255,0.28), rgba(90,110,255,0.08) 55%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, #000 40%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, #000 40%, transparent 78%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <Container className="flex flex-col items-center pt-28 pb-24 text-center md:pt-40 md:pb-32">
        <motion.p
          {...rise(0)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface/60 px-4 py-1.5 text-eyebrow font-mono uppercase tracking-wider text-accent"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent"
          />
          Custom AI &amp; Automation
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          id="hero-heading"
          className="mt-6 max-w-4xl text-balance text-display font-semibold text-text-primary"
        >
          Save time. Cut costs.{" "}
          <span className="text-accent">Scale faster.</span>
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-6 max-w-2xl text-pretty text-body-lg text-text-secondary"
        >
          We build custom software that removes the repetitive work quietly
          draining your team&apos;s hours and your budget — shaped around how your
          business actually runs, and yours to own.
        </motion.p>

        <motion.div
          {...rise(0.24)}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            render={<Link href="/book" />}
            className={`group h-12 rounded-full px-7 text-base hover:bg-accent-hover ${focusRing}`}
          >
            Book a consultation
            <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
          </Button>
          <Button
            variant="outline"
            render={<Link href="/process" />}
            className={`h-12 rounded-full border-border px-7 text-base text-text-primary hover:border-border-hover hover:bg-bg-elevated ${focusRing}`}
          >
            See how we work
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
