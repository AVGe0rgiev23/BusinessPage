import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function WorkCta() {
  return (
    <Section id="start-a-project" aria-labelledby="work-cta-heading">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-bg-surface px-6 py-16 text-center md:px-12 md:py-24">
            {/* Decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div
                className="absolute left-1/2 top-[-30%] h-[520px] w-[min(900px,110%)] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(90,110,255,0.22), transparent 72%)",
                }}
              />
            </div>

            <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
              Start a project
            </p>
            <h2
              id="work-cta-heading"
              className="mx-auto mt-4 max-w-3xl text-balance text-h1 font-semibold text-text-primary"
            >
              Judge us by the work, then let&apos;s talk.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-body-lg text-text-secondary">
              Until the case studies land, everything you need to weigh us up is
              already public — how we build, what we ship, and the standards we
              hold. Look at the work, then bring us the problem that&apos;s costing
              you time.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                render={<Link href="/book" />}
                className={`group h-12 rounded-full px-7 text-base hover:bg-accent-hover ${focusRing}`}
              >
                <CalendarClock aria-hidden="true" />
                Book a consultation
                <ArrowRight
                  className="transition-transform group-hover/button:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/contact" />}
                className={`h-12 rounded-full border-border px-7 text-base text-text-primary hover:border-border-hover hover:bg-bg-elevated ${focusRing}`}
              >
                Tell us about your project
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
