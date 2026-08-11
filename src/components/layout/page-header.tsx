import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-heading";

/**
 * PageHeader — the shared hero for every top-level route (Services, Process,
 * About, Technologies, Work, FAQ, Contact, Book).
 *
 * It renders the page's single `<h1>` (via `eyebrow` + `title` + `subtitle`),
 * so an individual page must NOT declare another `<h1>`.
 *
 * Rebuilt to match the home hero's left-aligned, asymmetric composition rather
 * than the old centred stack over an indigo radial glow. The subtitle sits in a
 * facing column on large screens, which keeps the headline measure short and
 * punchy instead of letting it sprawl to `max-w-4xl` across the page.
 *
 * Server Component — no client JS.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className,
  headingId = "page-heading",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  headingId?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "relative isolate overflow-hidden border-b border-border",
        className
      )}
    >
      {/* Same three quiet layers as the home hero: an off-centre warm wash, a
          fading hairline grid, and grain. No glow, no purple. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute right-[-8%] top-[-45%] h-[600px] w-[min(820px,100vw)] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(224,142,67,0.09), transparent 76%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #efebe4 1px, transparent 1px), linear-gradient(to bottom, #efebe4 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.35) 60%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.35) 60%, transparent 95%)",
          }}
        />
        <div className="absolute inset-0 grain" />
      </div>

      <Container className="pt-16 pb-20 md:pt-24 md:pb-24">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          <Eyebrow>{eyebrow}</Eyebrow>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-9 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-baseline lg:gap-x-16">
          <h1
            id={headingId}
            className="max-w-[20ch] text-balance text-h1 font-semibold text-text-primary"
          >
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-6 max-w-[56ch] text-pretty text-body-lg text-text-secondary lg:mt-0">
              {subtitle}
            </p>
          ) : null}
        </div>

        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </section>
  );
}
