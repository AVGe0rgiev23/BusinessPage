import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shared focus-visible ring used on interactive elements across the site so
 * keyboard focus reads consistently. Import this instead of redefining it
 * per file.
 */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"

/**
 * The tertiary "read more" link with a trailing arrow — the site's third and
 * quietest CTA tier, below the primary and secondary buttons.
 *
 * `py-1 -my-1` is load-bearing, not padding for looks: at `text-body` the bare
 * line box is 24px tall, which is exactly on the WCAG 2.2 target-size minimum
 * with nothing to spare. The padding lifts the hit area to 32px while the
 * negative margin keeps the visual position unchanged.
 *
 * Pair with `focusRing`. The arrow itself needs
 * `group-hover:translate-x-0.5` at the call site.
 */
export const arrowLink =
  "group inline-flex items-center gap-2 -my-1 rounded-sm py-1 text-body font-medium text-accent transition-colors duration-[--duration-fast] hover:text-accent-hover"
