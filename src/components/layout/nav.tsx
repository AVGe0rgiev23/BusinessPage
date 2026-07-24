"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/layout/container";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Technologies", href: "/technologies" },
  { label: "Work", href: "/work" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/60"
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          className={`shrink-0 rounded-sm text-lg font-semibold tracking-tight text-text-primary transition-colors hover:text-white ${focusRing}`}
        >
          AGility
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary ${focusRing}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Button
          render={<Link href="/book" />}
          className={`hidden h-10 shrink-0 rounded-full px-5 hover:bg-accent-hover md:inline-flex ${focusRing}`}
        >
          Book a consultation
        </Button>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                aria-expanded={open}
                className={`md:hidden ${focusRing}`}
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="gap-6">
            <SheetHeader>
              <SheetTitle className="text-left text-text-primary">
                AGility
              </SheetTitle>
            </SheetHeader>
            <nav
              className="flex flex-col gap-1 px-4"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-base text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary ${focusRing}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto p-4">
              <Button
                render={<Link href="/book" onClick={() => setOpen(false)} />}
                className={`h-11 w-full rounded-full hover:bg-accent-hover ${focusRing}`}
              >
                Book a consultation
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </motion.header>
  );
}
