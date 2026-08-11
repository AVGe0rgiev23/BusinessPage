import { cn } from "@/lib/utils";
import { RevealGroup } from "@/components/motion/reveal";

export interface Point {
  title: string;
  body: React.ReactNode;
}

interface PointListProps {
  items: Point[];
  /** One column reads as a document; two as a comparison of peers. */
  columns?: 1 | 2;
  /** Show a monospace index before each title. */
  numbered?: boolean;
  /** Render as `<ol>` when the order carries meaning. */
  as?: "ul" | "ol";
  className?: string;
}

/**
 * PointList — the site's standard "list of titled points".
 *
 * Roughly a dozen sections across the site are the same content shape: a set of
 * short titled paragraphs. Previously each one re-implemented that as a grid of
 * bordered cards with an icon chip, which is how the site ended up with fifty
 * near-identical cards and a different arbitrary icon for every abstract noun.
 *
 * One primitive, hairline-ruled, no icons. Points are marked with a short rule
 * that extends and turns copper on hover — an affordance that says "this is a
 * discrete item" without pretending a glyph explains "Transparency".
 *
 * Sections that need a genuinely different shape (the comparison table, the
 * process rail, the delivery matrix, the capability index) deliberately do NOT
 * use this. It is the default, not the only option — the page still has to have
 * structural variety, and a primitive used everywhere would just be a nicer
 * version of the original problem.
 */
export function PointList({
  items,
  columns = 1,
  numbered = false,
  as = "ul",
  className,
}: PointListProps) {
  return (
    <RevealGroup
      as={as}
      selector=":scope > li"
      className={cn(
        "grid border-t border-border",
        columns === 2 && "md:grid-cols-2",
        className
      )}
    >
      {items.map((item, i) => (
        <li
          key={item.title}
          className={cn(
            "group border-b border-border py-7",
            // Column rule and gutters, fully specified per position so the
            // two-up layout doesn't leave a stray border on the left column.
            columns === 2 && "md:[&:nth-child(odd)]:pr-10",
            columns === 2 &&
              "md:[&:nth-child(even)]:border-l md:[&:nth-child(even)]:pl-10"
          )}
        >
          <div className="flex gap-5">
            {numbered ? (
              <span
                aria-hidden="true"
                className="tabular mt-1.5 w-6 shrink-0 font-mono text-eyebrow text-text-muted transition-colors duration-[--duration-fast] group-hover:text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="mt-3.5 h-px w-5 shrink-0 bg-border-hover transition-[width,background-color] duration-[--duration-base] ease-[--ease-out] group-hover:w-8 group-hover:bg-accent"
              />
            )}
            <div>
              <h3 className="text-h4 font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 max-w-[62ch] text-pretty text-body text-text-secondary">
                {item.body}
              </p>
            </div>
          </div>
        </li>
      ))}
    </RevealGroup>
  );
}
