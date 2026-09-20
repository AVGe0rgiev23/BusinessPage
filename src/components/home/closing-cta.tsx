import { Link } from "@/i18n/navigation";

import { focusRing } from "@/lib/utils";
import { CtaBand } from "@/components/layout/cta-band";

/**
 * ClosingCta — the page's single booking ask.
 *
 * It used to carry a "Get in touch" secondary alongside it, and the hero
 * carried a second "Book a consultation" above the fold. Three high-friction
 * asks and no cheap one meant a visitor who wasn't ready to book had nothing
 * to do but leave. The secondary is gone (the footnote link below already
 * covers "I'd rather write"), the hero now points at the teardown, and this is
 * deliberately the last thing on the page: the expensive ask comes after the
 * free one, not beside it.
 */
export function ClosingCta() {
  return (
    <CtaBand
      id="get-started"
      eyebrow="Get started"
      title="Ready to get those hours back?"
      subtitle="Tell me what's slowing your team down. I'll look at where the time and money are going, give you an honest answer on whether custom software is the right fix — and if it is, work out how you'd want it delivered. No pressure, no jargon."
      primary={{ label: "Book a consultation", href: "/book" }}
      footnote={
        <>
          Prefer to write first? Reach me any time through the{" "}
          <Link
            href="/contact"
            className={`rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline ${focusRing}`}
          >
            contact form
          </Link>
          .
        </>
      }
    />
  );
}
