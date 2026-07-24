import Link from "next/link";

import { focusRing } from "@/lib/utils";
import { CtaBand } from "@/components/layout/cta-band";

export function ServicesCta() {
  return (
    <CtaBand
      id="get-started"
      eyebrow="Get started"
      title="Not sure where to start? That's what the call is for."
      subtitle="Book a free consultation and we'll look at the repetitive work costing your team the most — then map out what's worth building first. No pressure, no jargon."
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
