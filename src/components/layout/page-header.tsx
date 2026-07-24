import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

/**
 * PageHeader — the shared hero for every top-level route page (Services,
 * Process, About, Technologies, Work, FAQ, Contact, Book).
 *
 * It renders the page's single `<h1>` (via `eyebrow` + `title` + `subtitle`),
 * so an individual page must NOT declare another `<h1>`. Server Component —
 * no client JS. A subtle indigo top-glow keeps it consistent with the Home
 * hero without the heavier animated treatment.
 *
 * `id` defaults to "page-heading"; pass the wrapping `<section>` an
 * `aria-labelledby` of that id (already wired here via the labelled section).
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
      className={cn("relative isolate overflow-hidden", className)}
    >
      {/* Decorative background: soft indigo top-glow + faint fading grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute left-1/2 top-[-30%] h-[560px] w-[min(1000px,120vw)] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(90,110,255,0.22), rgba(90,110,255,0.06) 55%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, #000 40%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, #000 40%, transparent 78%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <Container className="flex flex-col items-center pt-24 pb-16 text-center md:pt-32 md:pb-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface/60 px-4 py-1.5 text-eyebrow font-mono uppercase tracking-wider text-accent">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {eyebrow}
        </p>

        <h1
          id={headingId}
          className="mt-6 max-w-4xl text-balance text-display font-semibold text-text-primary"
        >
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-6 max-w-2xl text-pretty text-body-lg text-text-secondary">
            {subtitle}
          </p>
        ) : null}

        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </section>
  );
}
