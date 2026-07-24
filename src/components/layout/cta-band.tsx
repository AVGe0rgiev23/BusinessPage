import Link from "next/link";
import { ArrowRight, CalendarClock, Send } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

interface CtaLink {
  label: string;
  href: string;
}

interface CtaSecondary extends CtaLink {
  /** Whether to show the leading Send icon (some CTAs omit it). */
  icon?: boolean;
}

interface CtaBandProps {
  /** Section landmark id — also the in-page anchor target. */
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: CtaLink;
  secondary?: CtaSecondary;
  /**
   * Optional closing line under the buttons. Typed as `ReactNode` rather than a
   * plain string so the existing footnotes can keep their inline links intact.
   */
  footnote?: React.ReactNode;
  /** Max width applied to the heading. Defaults to `max-w-3xl`. */
  maxWidth?: string;
}

/**
 * CtaBand — the shared closing conversion band used across the site (home page
 * plus every subpage). The shell is identical everywhere — rounded surface, a
 * decorative glow, and a two-button row inside a `Reveal` — so pages supply
 * only their own eyebrow/title/subtitle/links/footnote. Server Component.
 */
export function CtaBand({
  id,
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  footnote,
  maxWidth = "max-w-3xl",
}: CtaBandProps) {
  const headingId = `${id}-heading`;
  // Internal routes use next/link; anything else (an external Calendly URL or
  // the "#" placeholder) renders as a plain anchor.
  const primaryIsExternal = !primary.href.startsWith("/");

  return (
    <Section id={id} aria-labelledby={headingId}>
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
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className={cn(
                "mx-auto mt-4 text-balance text-h1 font-semibold text-text-primary",
                maxWidth
              )}
            >
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-body-lg text-text-secondary">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                render={
                  primaryIsExternal ? (
                    <a href={primary.href} />
                  ) : (
                    <Link href={primary.href} />
                  )
                }
                className={cn(
                  "group h-12 rounded-full px-7 text-base hover:bg-accent-hover",
                  focusRing
                )}
              >
                <CalendarClock aria-hidden="true" />
                {primary.label}
                <ArrowRight
                  className="transition-transform group-hover/button:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
              {secondary ? (
                <Button
                  variant="outline"
                  render={<Link href={secondary.href} />}
                  className={cn(
                    "h-12 rounded-full border-border px-7 text-base text-text-primary hover:border-border-hover hover:bg-bg-elevated",
                    focusRing
                  )}
                >
                  {secondary.icon ? <Send aria-hidden="true" /> : null}
                  {secondary.label}
                </Button>
              ) : null}
            </div>

            {footnote ? (
              <p className="mt-6 text-small text-text-secondary">{footnote}</p>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
