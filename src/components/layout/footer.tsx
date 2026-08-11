import Link from "next/link";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/layout/brand";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { contactEmail, githubUrl, linkedinUrl } from "@/lib/site-config";

const FOOTER_SECTIONS = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Work", href: "/work" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Services", href: "/services" },
      { label: "Technologies", href: "/technologies" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Book a consultation", href: "/book" },
    ],
  },
];

const SOCIALS = [
  { href: githubUrl, label: "AGility on GitHub", Icon: GithubIcon },
  { href: linkedinUrl, label: "AGility on LinkedIn", Icon: LinkedinIcon },
];

/**
 * Footer.
 *
 * Kept quiet on purpose — it follows the CTA band, and a loud footer competes
 * with the conversion moment immediately above it. The contact address is
 * surfaced directly rather than hidden one click away on the contact page:
 * someone who scrolled this far and wants to email should not have to navigate
 * to find out how.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] md:gap-20">
          <div>
            <Link
              href="/"
              aria-label="AGility — home"
              className={cn("inline-block rounded-sm", focusRing)}
            >
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-[38ch] text-pretty text-small text-text-secondary">
              Custom software and AI automation that reclaims the hours lost to
              repetitive work and cuts operating costs — delivered the way you
              choose to run it.
            </p>

            <a
              href={`mailto:${contactEmail}`}
              className={cn(
                "mt-5 -ml-2 inline-block rounded-sm px-2 py-1.5 font-mono text-small text-text-primary underline-offset-4 transition-colors hover:text-accent hover:underline",
                focusRing
              )}
            >
              {contactEmail}
            </a>

            <div className="mt-7 flex items-center gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "inline-flex size-9 items-center justify-center rounded-md border border-border text-text-muted transition-colors duration-[--duration-fast] hover:border-border-hover hover:text-text-primary",
                    focusRing
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-mono text-eyebrow uppercase text-text-muted">
                  {section.title}
                </h2>
                {/*
                  `-mx-2 px-2 py-1.5` lifts each link's hit area from a 20px
                  line box to 32px, clearing the WCAG 2.2 target-size minimum
                  of 24px with room to spare, while the negative margin keeps
                  the text visually flush with the column heading. The list gap
                  shrinks to compensate, so the vertical rhythm is unchanged.
                */}
                <ul className="mt-4 flex flex-col gap-0.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "-mx-2 inline-block rounded-sm px-2 py-1.5 text-small text-text-secondary transition-colors duration-[--duration-fast] hover:text-text-primary",
                          focusRing
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-eyebrow uppercase text-text-muted">
            &copy; {year} AGility. All rights reserved.
          </p>
          <p className="font-mono text-eyebrow uppercase text-text-muted">
            Custom software &amp; AI automation
          </p>
        </div>
      </Container>
    </footer>
  );
}
