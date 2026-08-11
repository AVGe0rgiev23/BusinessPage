import { cn } from "@/lib/utils";

/**
 * BrandMark — the AGility "A" glyph.
 *
 * The same geometry as the favicon: an apex with a crossbar, drawn rather than
 * filled so it reads as a drafting mark. `currentColor` on the strokes lets the
 * mark inherit copper in the nav and bone in the footer without a second asset.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-full", className)}
    >
      <path
        d="M9 25 L16 7 L23 25"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 18.6 H19.8"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Wordmark — mark plus name, used in the nav and footer.
 *
 * "AG" is set in the display face at full weight and "ility" a step lighter.
 * It is a small thing, but it turns a plain text logo into something that looks
 * drawn, and it quietly reinforces the initials the company is named for.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="size-[1.375rem] text-accent">
        <BrandMark />
      </span>
      <span className="font-display text-[1.0625rem] leading-none tracking-[-0.02em] text-text-primary">
        <span className="font-bold">AG</span>
        <span className="font-medium">ility</span>
      </span>
    </span>
  );
}
