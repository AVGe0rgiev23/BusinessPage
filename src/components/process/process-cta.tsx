import Link from "next/link";

import { focusRing } from "@/lib/utils";
import { CtaBand } from "@/components/layout/cta-band";

/**
 * ProcessCta — closing conversion block for the Process page. A thin wrapper
 * around the shared `CtaBand` with Process-specific copy, funnelling to `/book`
 * (primary) and `/contact` (secondary). Server Component.
 */
export function ProcessCta() {
  return (
    <CtaBand
      id="get-started"
      eyebrow="Get started"
      title="See exactly how we'd approach your project."
      subtitle="Book a free consultation and we'll walk you through what the first steps would look like for your business — the problem worth solving, the plan to solve it, and what it would take. No pressure, no jargon."
      primary={{ label: "Book a consultation", href: "/book" }}
      secondary={{ label: "Get in touch", href: "/contact", icon: true }}
      footnote={
        <>
          Still weighing it up? Read more about{" "}
          <Link
            href="/about"
            className={`rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline ${focusRing}`}
          >
            how we think and what we stand for
          </Link>
          .
        </>
      }
    />
  );
}
