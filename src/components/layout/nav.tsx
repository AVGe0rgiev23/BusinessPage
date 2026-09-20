"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { animate } from "animejs";
import { Menu, ArrowRight } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { duration, ease, prefersReducedMotion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/layout/brand";

// Ordered to follow the buyer's questions: what you build → how you work →
// what you build with → proof → who you are → objections → get in touch.
const NAV_LINKS = [
  { key: "services", href: "/services" },
  { key: "process", href: "/process" },
  { key: "technologies", href: "/technologies" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

/**
 * Nav — scroll-aware primary navigation.
 *
 * Two states. At the top of the page it is tall, transparent and borderless so
 * the hero reads as full-bleed. Past ~24px it compresses, picks up a blurred
 * background and a hairline bottom rule, and behaves like a product chrome bar.
 * The transition is CSS on height/background, so it costs nothing.
 *
 * The sliding indicator under the desktop links is the one piece of scripted
 * motion here. It parks under the current page and follows hover/focus, which
 * makes the whole bar feel like a single connected control rather than seven
 * independent links. Keyboard focus drives it identically to the mouse, so it
 * is not a hover-only affordance.
 */
export function Nav() {
  const t = useTranslations("common");
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  const listRef = React.useRef<HTMLDivElement>(null);
  const indicatorRef = React.useRef<HTMLSpanElement>(null);
  const linkRefs = React.useRef(new Map<string, HTMLAnchorElement>());

  const activeHref = React.useMemo(() => {
    // `/services/anything` should still light up the Services link.
    const match = NAV_LINKS.find(
      (link) => pathname === link.href || pathname.startsWith(`${link.href}/`)
    );
    return match?.href ?? null;
  }, [pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    // Passive: this listener never calls preventDefault, and saying so lets the
    // browser keep scrolling off the main thread.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Move the indicator to a link, or hide it when there is no target.
   *
   * Every path goes through `animate()`, including the instant ones. Writing
   * `style.opacity` directly does not cancel an anime.js tween already running
   * on that property — the tween keeps writing its own value each frame and
   * wins, which left the indicator stranded visible at x=0 when the pointer
   * left the nav mid-transition. Handing anime a new animation on the same
   * target supersedes the old one properly; a zero duration is how "instant"
   * is expressed.
   */
  const moveIndicator = React.useCallback(
    (href: string | null, animated = true) => {
      const indicator = indicatorRef.current;
      if (!indicator) return;

      const target = href ? linkRefs.current.get(href) : undefined;
      const dur = animated && !prefersReducedMotion() ? duration.base : 0;

      if (!target) {
        animate(indicator, { opacity: 0, duration: dur, ease: ease.out });
        return;
      }

      animate(indicator, {
        opacity: 1,
        x: target.offsetLeft,
        width: target.offsetWidth,
        duration: dur,
        ease: ease.out,
      });
    },
    []
  );

  // Park the indicator on the active link. Re-runs on navigation, and on
  // resize/font-load because both change link widths — without this the
  // indicator sits slightly off after a web font swaps in.
  React.useEffect(() => {
    moveIndicator(activeHref, false);

    const list = listRef.current;
    if (!list) return;

    const observer = new ResizeObserver(() => moveIndicator(activeHref, false));
    observer.observe(list);

    void document.fonts?.ready.then(() => moveIndicator(activeHref, false));

    return () => observer.disconnect();
  }, [activeHref, moveIndicator]);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-[--duration-base] ease-[--ease-standard]",
        "border-b border-transparent",
        scrolled &&
          "border-border bg-bg/85 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70"
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-6 transition-[height] duration-[--duration-base] ease-[--ease-standard]",
          scrolled ? "h-[3.75rem]" : "h-[4.5rem]"
        )}
      >
        <Link
          href="/"
          aria-label={t("brand.homeLabel")}
          className={cn("shrink-0 rounded-sm", focusRing)}
        >
          <Wordmark />
        </Link>

        {/*
          Desktop navigation. Breaks to the sheet below `lg` rather than `md`:
          seven links plus a CTA genuinely does not fit at 768px, and the old
          `md` breakpoint left them cramped against the button.
        */}
        <nav
          aria-label={t("nav.primary")}
          className="hidden lg:block"
          onMouseLeave={() => moveIndicator(activeHref)}
        >
          <div ref={listRef} className="relative flex items-center">
            {/* Indicator sits behind the labels; purely decorative. */}
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-px bg-accent opacity-0"
            />

            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(node) => {
                    if (node) linkRefs.current.set(link.href, node);
                    else linkRefs.current.delete(link.href);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={() => moveIndicator(link.href)}
                  onFocus={() => moveIndicator(link.href)}
                  onBlur={() => moveIndicator(activeHref)}
                  className={cn(
                    "rounded-sm px-3 py-5 text-small transition-colors duration-[--duration-micro]",
                    focusRing,
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            render={<Link href="/book" />}
            className={cn("hidden shrink-0 lg:inline-flex", focusRing)}
          >
            {t("nav.cta")}
          </Button>

          {/* Mobile / tablet menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("nav.openMenu")}
                  aria-expanded={open}
                  className={cn("lg:hidden", focusRing)}
                />
              }
            >
              <Menu />
            </SheetTrigger>

            <SheetContent
              side="right"
              closeLabel={t("nav.close")}
              className="gap-0 border-l-border bg-bg p-0"
            >
              <SheetHeader className="border-b border-border px-6 py-5">
                <SheetTitle className="text-left">
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>

              {/*
                Mono index numbers turn the mobile menu into a table of
                contents rather than a stack of buttons, which keeps it in the
                same visual language as the rest of the site.
              */}
              <nav aria-label={t("nav.mobile")} className="flex flex-col px-3 py-3">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeHref === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        // 48px min touch target.
                        "group flex min-h-12 items-center gap-4 rounded-md px-3 text-body transition-colors",
                        focusRing,
                        isActive
                          ? "bg-bg-elevated text-text-primary"
                          : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "tabular font-mono text-eyebrow",
                          isActive ? "text-accent" : "text-text-muted"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {t(`nav.${link.key}`)}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-border p-6">
                <Button
                  size="lg"
                  render={<Link href="/book" onClick={() => setOpen(false)} />}
                  className={cn("group w-full", focusRing)}
                >
                  {t("nav.cta")}
                  <ArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-[--duration-fast] group-hover/button:translate-x-0.5"
                  />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
