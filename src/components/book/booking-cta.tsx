import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

// TODO: replace "#" with the real Calendly/scheduling URL — when it's a real
// external link, also add target="_blank" + rel="noopener noreferrer" to the
// booking buttons below (and to the one in the page header).
export const CALENDLY_URL = "#";

export function BookingCta() {
  return (
    <Section id="book-now" aria-labelledby="book-cta-heading">
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
              Book your call
            </p>
            <h2
              id="book-cta-heading"
              className="mx-auto mt-4 max-w-2xl text-balance text-h1 font-semibold text-text-primary"
            >
              Pick a time that works for you
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-body-lg text-text-secondary">
              Choose a free 30-minute slot and we&apos;ll talk through where your
              business is losing time — and whether custom software is worth it.
              No pressure, no obligation.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                render={<a href={CALENDLY_URL} />}
                className={cn(
                  "group h-12 rounded-full px-7 text-base hover:bg-accent-hover",
                  focusRing
                )}
              >
                <CalendarClock aria-hidden="true" />
                Book a consultation
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover/button:translate-x-0.5"
                />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/contact" />}
                className={cn(
                  "h-12 rounded-full border-border px-7 text-base text-text-primary hover:border-border-hover hover:bg-bg-elevated",
                  focusRing
                )}
              >
                Send a message instead
              </Button>
            </div>

            <p className="mt-6 text-small text-text-secondary">
              Rather not book yet? Ask us anything through the{" "}
              <Link
                href="/contact"
                className={cn(
                  "rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline",
                  focusRing
                )}
              >
                contact form
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
