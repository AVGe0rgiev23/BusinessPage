import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/icons/brand-icons";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Connect() {
  return (
    <Section id="connect" aria-labelledby="connect-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-border bg-bg-elevated text-accent">
            <LinkedinIcon className="size-7" aria-hidden="true" />
          </span>
          <p className="mt-6 text-eyebrow font-mono uppercase tracking-wider text-accent">
            Connect
          </p>
          <h2
            id="connect-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            Let&apos;s stay in touch.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            Follow along on LinkedIn for how we think about building software,
            automating the busywork, and getting real value out of AI — no hype,
            just what works.
          </p>
          <div className="mt-9 flex justify-center">
            <Button
              variant="outline"
              /* TODO: point href at the real LinkedIn URL, then restore
                 target="_blank" rel="noopener noreferrer" (omitted while this is
                 a placeholder so it can't open a blank duplicate tab). */
              render={<a href="#" />}
              className={`group h-12 rounded-full border-border px-7 text-base text-text-primary hover:border-border-hover hover:bg-bg-elevated ${focusRing}`}
            >
              <LinkedinIcon className="size-5" aria-hidden="true" />
              Connect on LinkedIn
              <ArrowUpRight
                className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
