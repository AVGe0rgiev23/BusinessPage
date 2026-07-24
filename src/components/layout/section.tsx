import { cn } from "@/lib/utils";

/**
 * Section — vertical rhythm wrapper for page sections.
 * ~6rem mobile / 8rem md / 10rem lg of vertical padding.
 * Accepts an optional `id` (for anchor-linked nav) and `className`, both of
 * which flow through the spread props. Server Component.
 */
export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-24 md:py-32 lg:py-40", className)} {...props} />
  );
}
