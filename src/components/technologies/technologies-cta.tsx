import Link from "next/link";

import { focusRing } from "@/lib/utils";
import { CtaBand } from "@/components/layout/cta-band";

export function TechnologiesCta() {
  return (
    <CtaBand
      id="get-started"
      eyebrow="Get started"
      title="Want to talk through the right approach for your project?"
      subtitle="Book a free consultation and we'll walk through what to build, how it fits the systems you already run, and the stack that makes sense for your goals. Plain language, no jargon."
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
