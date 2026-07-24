"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Optional stagger delay in seconds. */
  delay?: number;
}

/**
 * Reveal — the single scroll-entrance primitive for the site.
 *
 * Fades content in with a subtle 16px upward slide the first time it scrolls
 * into view. Honors `prefers-reduced-motion`: when reduced, it renders a plain,
 * static wrapper with no transform or opacity animation.
 *
 * Server-rendered section content can be passed as `children` and stays on the
 * server — only this thin wrapper is a Client Component.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
