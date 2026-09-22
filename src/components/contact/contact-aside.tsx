import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CalendarClock, Clock, Mail, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { LinkedinIcon } from "@/components/icons/brand-icons";
import { contactEmail, linkedinUrl } from "@/lib/site-config";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const reassurances = [
  { id: "replies", icon: Clock },
  { id: "free", icon: ShieldCheck },
  { id: "plain", icon: Mail },
] as const;

export async function ContactAside() {
  const t = await getTranslations("contact");
  return (
    <div className="rounded-xl border border-border bg-bg-surface p-6 md:p-8">
      <h3
        id="contact-alt-heading"
        className="text-h3 font-semibold text-text-primary"
      >
        {t("aside.title")}
      </h3>
      <p className="mt-3 text-body text-text-secondary">
        {t("aside.lede")}
      </p>

      {/* Primary alternative: book a consultation */}
      <Link
        href="/book"
        className={cn(
          "group mt-6 flex items-center gap-4 rounded-md border border-border bg-bg p-4 transition-colors duration-[--duration-fast] hover:border-border-hover hover:bg-bg-elevated",
          focusRing
        )}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-subtle text-accent">
          <CalendarClock aria-hidden="true" className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-body font-medium text-text-primary">
            {t("aside.book.title")}
          </span>
          <span className="block text-small text-text-secondary">
            {t("aside.book.subtitle")}
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
              "group flex items-center gap-4 rounded-md border border-border bg-bg p-4 transition-colors duration-[--duration-fast] hover:border-border-hover hover:bg-bg-elevated",
              focusRing
            )}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bg-elevated text-text-muted">
              <Mail aria-hidden="true" className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body font-medium text-text-primary">
                {t("aside.email.title")}
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
              "group flex items-center gap-4 rounded-md border border-border bg-bg p-4 transition-colors duration-[--duration-fast] hover:border-border-hover hover:bg-bg-elevated",
              focusRing
            )}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bg-elevated text-text-muted">
              <LinkedinIcon aria-hidden="true" className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body font-medium text-text-primary">
                {t("aside.linkedin.title")}
              </span>
              <span className="block text-small text-text-secondary">
                {t("aside.linkedin.subtitle")}
              </span>
            </span>
          </a>
        </li>
      </ul>

      {/* Reassurance */}
      <ul className="mt-6 grid gap-3 border-t border-border pt-6">
        {reassurances.map(({ id, icon: Icon }) => (
          <li key={id} className="flex items-center gap-3 text-small text-text-secondary">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-accent" />
            {t(`aside.reassurances.${id}`)}
          </li>
        ))}
      </ul>
    </div>
  );
}
