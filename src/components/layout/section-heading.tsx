import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Eyebrow — the small monospace label above a heading.
 *
 * Uppercase JetBrains Mono at 11px with wide tracking. It reads as a document
 * annotation rather than a marketing kicker, which is the whole idea: the site
 * should look like technical documentation someone cared about.
 */
export function Eyebrow({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-mono text-eyebrow uppercase text-text-muted",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  /**
   * Two-digit section index rendered in the rule above the heading, ledger
   * style. Omit it on pages where a running count would be meaningless.
   */
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  /**
   * Supporting paragraph. On wide screens it sits in a second column beside
   * the heading rather than centred underneath it — the single change that
   * most breaks the stacked-and-centred template rhythm.
   */
  lede?: React.ReactNode;
  /** Optional link row or controls rendered under the lede. */
  children?: React.ReactNode;
  className?: string;
  /** Heading element id, for the section's `aria-labelledby`. */
  headingId?: string;
  /**
   * `split` (default) puts the lede in a facing column on lg+.
   * `stacked` keeps it directly under the title, for narrow sections.
   */
  layout?: "split" | "stacked";
}

/**
 * SectionHeading — the shared section opener.
 *
 * Deliberately NOT centred. The previous design centred an eyebrow, an h2 and
 * a lede at the top of all eight homepage sections, which is the single most
 * recognisable tell of a generated marketing page. This version is left-aligned
 * and hangs off a hairline rule with a monospace index, so sections read as
 * chapters in a document.
 *
 * Server Component — the `Reveal` wrapper is the only client boundary.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  children,
  className,
  headingId,
  layout = "split",
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("w-full", className)}>
      {/* Rule + index + eyebrow, all on one baseline. */}
      <div className="flex items-center gap-4">
        {index ? (
          <span
            aria-hidden="true"
            className="tabular font-mono text-eyebrow text-accent"
          >
            {index}
          </span>
        ) : null}
        <Eyebrow>{eyebrow}</Eyebrow>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <div
        className={cn(
          "mt-7",
          layout === "split" &&
            lede &&
            /*
              Baseline, not bottom. Bottom-aligning looks elegant when the
              title and the lede happen to be similar heights and opens a
              conspicuous hole under the eyebrow rule when they aren't — a
              two-line title next to a five-line lede gets shoved halfway down
              the section. Aligning first baselines is stable at any ratio.
            */
            "lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-baseline lg:gap-x-16"
        )}
      >
        <h2
          id={headingId}
          className="max-w-[19ch] text-balance text-h2 font-semibold text-text-primary"
        >
          {title}
        </h2>

        {lede ? (
          <div
            className={cn("mt-5 max-w-[54ch]", layout === "split" && "lg:mt-0")}
          >
            <p className="text-pretty text-body-lg text-text-secondary">
              {lede}
            </p>
            {children ? <div className="mt-6">{children}</div> : null}
          </div>
        ) : (
          children
        )}
      </div>
    </Reveal>
  );
}
