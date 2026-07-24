import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Expectations } from "@/components/book/expectations";
import { Preparation } from "@/components/book/preparation";
import { BookingCta, CALENDLY_URL } from "@/components/book/booking-cta";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const title = "Book a Consultation — A Free 30-Minute Call with AGility";
const description =
  "Book a free, 30-minute consultation. We'll look at where your business is losing time and money and give you an honest answer on whether custom software is worth it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/book",
  },
};

const perks = ["About 30 minutes", "Free", "No pressure", "No obligation"];

export default function BookPage() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Book a consultation"
        title="Book a free 30-minute consultation."
        subtitle="We'll look at where your business is losing time and money — and give you an honest answer on whether custom software is worth it. No pressure, no obligation, no jargon."
      >
        <div className="flex flex-col items-center gap-6">
          <Button
            render={
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" />
            }
            className={cn(
              "h-12 rounded-full px-7 text-base hover:bg-accent-hover",
              focusRing
            )}
          >
            <CalendarClock aria-hidden="true" />
            Book a consultation
          </Button>
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {perks.map((perk) => (
              <li
                key={perk}
                className="rounded-full border border-border bg-bg-surface/60 px-3 py-1 text-small text-text-secondary"
              >
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </PageHeader>

      <Expectations />
      <Preparation />
      <BookingCta />
    </main>
  );
}
