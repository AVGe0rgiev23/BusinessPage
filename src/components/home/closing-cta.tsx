import Link from "next/link";

import { focusRing } from "@/lib/utils";
import { CtaBand } from "@/components/layout/cta-band";

export function ClosingCta() {
  return (
    <CtaBand
      id="get-started"
      eyebrow="Get started"
      title="Ready to get those hours back?"
      subtitle="Book a free consultation and we'll look at where your business is losing time and money — and exactly how custom software could win it back. No pressure, no jargon."
      primary={{ label: "Book a consultation", href: "/book" }}
      secondary={{ label: "Get in touch", href: "/contact", icon: true }}
      footnote={
        <>
          Prefer to write first? Reach us any time through the{" "}
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
