import { cn } from "@/lib/utils";

/**
 * Container — horizontal max-width wrapper.
 * Max width 1280px, 1.5rem gutters on mobile and 2rem from md up.
 * Server Component.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-8", className)}
      {...props}
    />
  );
}
