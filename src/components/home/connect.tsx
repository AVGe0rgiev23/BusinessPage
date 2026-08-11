import { ArrowUpRight } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/icons/brand-icons";
import { linkedinUrl } from "@/lib/site-config";

/**
 * Connect — the LinkedIn invitation.
 *
 * Deliberately the smallest section on the page. It used to be a full-height
 * section with its own centred icon tile, eyebrow, h2 and lede — the same
 * weight as "what we build", for a link to a social profile. That is a
 * hierarchy problem, not a styling one.
 *
 * It is now a single compressed band: one line of context, one action. Giving a
 * minor thing minor treatment is most of what "restraint" means in practice,
 * and the change also gives the page a genuine pause before the FAQ.
 */
export function Connect() {
  return (
    <section
      id="connect"
      aria-labelledby="connect-heading"
      className="border-t border-border bg-bg-sunken"
    >
      <Container className="py-12 md:py-14">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4 md:items-center">
            <LinkedinIcon
              className="mt-0.5 size-5 shrink-0 text-text-muted md:mt-0"
              aria-hidden="true"
            />
            <p className="max-w-[62ch] text-pretty text-small text-text-secondary">
              <span id="connect-heading" className="text-text-primary">
                Let&apos;s stay in touch.
              </span>{" "}
              Follow along on LinkedIn for how we think about building software,
              automating the busywork, and getting real value out of AI — no
              hype, just what works.
            </p>
          </div>

          <Button
            variant="secondary"
            render={
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" />
            }
            className={cn("group shrink-0", focusRing)}
          >
            Connect on LinkedIn
            <ArrowUpRight
              className="text-text-muted transition-transform duration-[--duration-fast] group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
              aria-hidden="true"
            />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
