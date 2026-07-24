import Link from "next/link";

import { focusRing } from "@/lib/utils";
import { CtaBand } from "@/components/layout/cta-band";

/**
 * AboutCta — closing conversion block for the About page. A thin wrapper around
 * the shared `CtaBand` with About-specific copy, funnelling to `/book`
 * (primary) and `/contact` (secondary). Server Component.
 */
export function AboutCta() {
  return (
    <CtaBand
      id="get-started"
      eyebrow="Get started"
      title="If that's how you'd want it built, let's talk."
      subtitle="Book a free consultation and we'll look at where your business is losing time and money — and whether custom software is the right way to win it back. Honest answers either way."
      primary={{ label: "Book a consultation", href: "/book" }}
      secondary={{ label: "Get in touch", href: "/contact", icon: true }}
      footnote={
        <>
          Curious how a project runs? See{" "}
          <Link
            href="/process"
            className={`rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline ${focusRing}`}
          >
            our full process
          </Link>
          .
        </>
      }
    />
  );
}
