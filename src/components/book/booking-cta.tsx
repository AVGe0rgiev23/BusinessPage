import Link from "next/link";

import { focusRing } from "@/lib/utils";
import { CtaBand } from "@/components/layout/cta-band";

// TODO: replace "#" with the real Calendly/scheduling URL — when it's a real
// external link, also add target="_blank" + rel="noopener noreferrer" to the
// booking buttons below (and to the one in the page header).
export const CALENDLY_URL = "#";

export function BookingCta() {
  return (
    <CtaBand
      id="book-now"
      eyebrow="Book your call"
      title="Pick a time that works for you"
      subtitle="Choose a free 30-minute slot and we'll talk through where your business is losing time — and whether custom software is worth it. No pressure, no obligation."
      maxWidth="max-w-2xl"
      primary={{ label: "Book a consultation", href: CALENDLY_URL }}
      secondary={{ label: "Send a message instead", href: "/contact" }}
      footnote={
        <>
          Rather not book yet? Ask us anything through the{" "}
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
