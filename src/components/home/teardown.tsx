import { ArrowUpRight } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { contactEmail } from "@/lib/site-config";

/**
 * Teardown — the low-friction offer.
 *
 * Sits immediately above the closing CTA, and that order is the whole point.
 * The page used to end with three high-commitment asks and nothing beneath
 * them: a visitor who was interested but not ready to book had no move to
 * make except leaving. This gives them one, and it costs them an email rather
 * than a slot in their calendar.
 *
 * ── Constraints on this copy ────────────────────────────────────────────────
 * The cap is stated in the UI, not buried in a footnote, because a limit is
 * only credible if it is visible before someone asks. "No call required" is a
 * promise about the offer's shape and must not quietly become a discovery
 * call. And the admission that the honest answer is sometimes "buy an existing
 * tool" is load-bearing: it is the line that makes a free teardown read as
 * advice rather than as the first step of a pitch. Do not soften it.
 *
 * Uses `mailto:` rather than a new form. The contact form already exists at
 * /contact; adding a second submission path for one offer would be new
 * infrastructure to maintain for no gain, and a pre-filled subject line gets
 * the enquiry into the inbox already labelled.
 */
const SUBJECT = "Teardown request";

const TERMS = [
  "Three a week — that's the honest limit for one person.",
  "No call required.",
  "No pitch attached.",
];

export function Teardown() {
  const href = `mailto:${contactEmail}?subject=${encodeURIComponent(SUBJECT)}`;

  return (
    <Section
      id="teardown"
      aria-labelledby="teardown-heading"
      className="border-t border-border bg-bg-sunken"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <Eyebrow className="text-accent">Free teardown</Eyebrow>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
            </div>

            <h2
              id="teardown-heading"
              className="mt-7 max-w-[20ch] text-balance text-h2 font-semibold text-text-primary"
            >
              Send me the process your team hates most.
            </h2>

            <p className="mt-6 max-w-[56ch] text-pretty text-body-lg text-text-secondary">
              I&apos;ll record a free 5-minute screen teardown — where the time
              goes, what&apos;s automatable, what isn&apos;t, and what I&apos;d
              do first. Sometimes the honest answer is &ldquo;buy an existing
              tool&rdquo; — that&apos;s a valid outcome.
            </p>

            <Button
              size="lg"
              render={<a href={href} />}
              className={cn("group mt-9", focusRing)}
            >
              Send me the process
              <ArrowUpRight
                className="transition-transform duration-[--duration-fast] group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>

            <p className="mt-5 font-mono text-eyebrow uppercase text-text-muted">
              Opens your email to {contactEmail}
            </p>
          </Reveal>

          {/* The terms, stated where they can't be missed rather than as small
              print under the button. */}
          <Reveal className="lg:pt-2">
            <ul className="border-t border-border">
              {TERMS.map((term) => (
                <li
                  key={term}
                  className="border-b border-border py-6 text-pretty text-body text-text-secondary"
                >
                  {term}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
