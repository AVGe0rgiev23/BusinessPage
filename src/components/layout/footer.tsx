import Link from "next/link";

import { Container } from "@/components/layout/container";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { githubUrl, linkedinUrl } from "@/lib/site-config";

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

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-surface">
      <Container className="py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              className={`rounded-sm text-lg font-semibold tracking-tight text-text-primary transition-colors hover:text-white ${focusRing}`}
            >
              AGility
            </Link>
            <p className="mt-4 text-small text-text-secondary">
              Custom software and AI automation that reclaims the hours lost to
              repetitive work, cuts operating costs, and leaves you owning what
              you run on.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AGility on GitHub"
                className={`inline-flex size-9 items-center justify-center rounded-md border border-border text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary ${focusRing}`}
              >
                <GithubIcon className="size-5" aria-hidden="true" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AGility on LinkedIn"
                className={`inline-flex size-9 items-center justify-center rounded-md border border-border text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary ${focusRing}`}
              >
                <LinkedinIcon className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="text-eyebrow font-mono uppercase text-text-secondary">
                  {section.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`rounded-sm text-small text-text-secondary transition-colors hover:text-text-primary ${focusRing}`}
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

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-small text-text-secondary">
            &copy; {year} AGility. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
