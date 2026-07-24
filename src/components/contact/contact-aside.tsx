import Link from "next/link";
import { ArrowRight, CalendarClock, Clock, Mail, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { LinkedinIcon } from "@/components/icons/brand-icons";
import { contactEmail, linkedinUrl } from "@/lib/site-config";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const reassurances = [
  { icon: Clock, label: "Replies within one business day" },
  { icon: ShieldCheck, label: "Free consultation — no pressure, ever" },
  { icon: Mail, label: "Plain-spoken answers, no jargon" },
];

export function ContactAside() {
  return (
    <div className="rounded-2xl border border-border bg-bg-surface/60 p-6 md:p-8">
      <h3
        id="contact-alt-heading"
        className="text-h3 font-semibold text-text-primary"
      >
        Prefer another way to reach us?
      </h3>
      <p className="mt-3 text-body text-text-secondary">
        Pick whatever&apos;s easiest. Every option reaches the same small team.
      </p>

      {/* Primary alternative: book a consultation */}
      <Link
        href="/book"
        className={cn(
          "group mt-6 flex items-center gap-4 rounded-xl border border-border bg-bg p-4 transition-colors hover:border-border-hover hover:bg-bg-elevated",
          focusRing
        )}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent">
          <CalendarClock aria-hidden="true" className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-body font-medium text-text-primary">
            Book a consultation
          </span>
          <span className="block text-small text-text-secondary">
            Grab a free 30-minute call
          </span>
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-text-primary"
        />
      </Link>

      {/* Email + LinkedIn */}
      <ul className="mt-4 grid gap-3">
        <li>
          <a
            href={`mailto:${contactEmail}`}
            className={cn(
              "group flex items-center gap-4 rounded-xl border border-border bg-bg p-4 transition-colors hover:border-border-hover hover:bg-bg-elevated",
              focusRing
            )}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-bg-elevated text-text-secondary">
              <Mail aria-hidden="true" className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body font-medium text-text-primary">
                Email us
              </span>
              <span className="block truncate text-small text-text-secondary">
                {contactEmail}
              </span>
            </span>
          </a>
        </li>
        <li>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex items-center gap-4 rounded-xl border border-border bg-bg p-4 transition-colors hover:border-border-hover hover:bg-bg-elevated",
              focusRing
            )}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-bg-elevated text-text-secondary">
              <LinkedinIcon aria-hidden="true" className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body font-medium text-text-primary">
                Connect on LinkedIn
              </span>
              <span className="block text-small text-text-secondary">
                Follow along and message us
              </span>
            </span>
          </a>
        </li>
      </ul>

      {/* Reassurance */}
      <ul className="mt-6 grid gap-3 border-t border-border pt-6">
        {reassurances.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-small text-text-secondary">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-accent" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
