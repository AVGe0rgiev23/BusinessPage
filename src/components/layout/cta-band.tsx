import { Link } from "@/i18n/navigation";
import { ArrowRight, Send } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
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
}

/**
 * CtaBand — the closing conversion moment, shared by the home page and every
 * subpage.
 *
 * Rebuilt as a full-bleed band rather than the old rounded card floating on a
 * radial glow. Two reasons. It is the last thing on the page, so letting it run
 * edge to edge gives it the finality a closing statement needs; and it means
 * the CTA is the one section on the site with a different *shape*, not just
 * different words — which is how a visitor's eye knows it matters.
 *
 * The heading sits left and the actions sit right on desktop, so the primary
 * button lands in its own space instead of being one of two centred pills.
 * Server Component.
 */
export function CtaBand({
  id,
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  footnote,
}: CtaBandProps) {
  const headingId = `${id}-heading`;
  // Internal routes use the locale-aware Link; anything else (an external Calendly URL or
  // the "#" placeholder) renders as a plain anchor.
  const primaryIsExternal = !primary.href.startsWith("/");

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative isolate mt-8 overflow-hidden border-t border-border bg-bg-surface"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Warm wash anchored bottom-left, so it reads as light spilling in
            from off-page rather than a decorative orb sitting on the surface. */}
        <div
          className="absolute bottom-[-40%] left-[-5%] h-[560px] w-[min(820px,90vw)] rounded-full opacity-80 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(224,142,67,0.11), transparent 74%)",
          }}
        />
        <div className="absolute inset-0 grain" />
      </div>

      <Container className="py-24 md:py-32">
        <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
          <div>
            <Eyebrow className="text-accent">{eyebrow}</Eyebrow>
            <h2
              id={headingId}
              className="mt-6 max-w-[16ch] text-balance text-h1 font-semibold text-text-primary"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-[58ch] text-pretty text-body-lg text-text-secondary">
              {subtitle}
            </p>
          </div>

          <div className="lg:pb-2">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Button
                size="lg"
                render={
                  primaryIsExternal ? (
                    <a
                      href={primary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ) : (
                    <Link href={primary.href} />
                  )
                }
                className={cn("group justify-between", focusRing)}
              >
                {primary.label}
                <ArrowRight
                  className="transition-transform duration-[--duration-fast] group-hover/button:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>

              {secondary ? (
                <Button
                  size="lg"
                  variant="secondary"
                  render={<Link href={secondary.href} />}
                  className={cn("justify-between", focusRing)}
                >
                  {secondary.label}
                  {secondary.icon ? (
                    <Send aria-hidden="true" className="text-text-muted" />
                  ) : null}
                </Button>
              ) : null}
            </div>

            {footnote ? (
              <p className="mt-6 text-small text-text-muted">{footnote}</p>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
