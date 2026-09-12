import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import { PointList, type Point } from "@/components/shared/point-list";

/**
 * HowWeBuild — how AGility thinks about building software: custom vs low-code
 * (using the sanctioned, defensible framing near-verbatim), code ownership, and
 * building around how a business actually runs. Two-column editorial layout
 * with a sticky argument beside the principles.
 */
const PRINCIPLES: Point[] = [
  {
    title: "Built around your process",
    body: "Off-the-shelf tools make you bend how you work to fit their assumptions. I do the opposite — shaping the software to the way you already run, then removing the friction you’d learned to live with.",
  },
  {
    title: "Ownership, defined clearly",
    body: "The custom software I build for you is yours under the project agreement, and your data stays yours. Third-party services keep their own providers’ terms — and I’m precise about which is which instead of hand-waving at it.",
  },
  {
    title: "Grows as you grow",
    body: "Custom software has room to handle more volume, more users, and more complexity — instead of hitting the ceiling a general-purpose builder puts on everyone.",
  },
  {
    title: "Portable by design",
    body: "I build with ownership and portability in mind, on standard technology wherever practical — so you’re never forced to depend on AGility, or on any one platform, to keep your business running.",
  },
];

export function HowWeBuild() {
  return (
    <Section id="how-we-build" aria-labelledby="how-we-build-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="tabular font-mono text-eyebrow text-accent"
              >
                02
              </span>
              <Eyebrow>How I build</Eyebrow>
            </div>

            <h2
              id="how-we-build-heading"
              className="mt-7 max-w-[18ch] text-balance text-h2 font-semibold text-text-primary"
            >
              I build around how your business actually runs.
            </h2>

            <p className="mt-6 max-w-[52ch] text-pretty text-body-lg text-text-secondary">
              I&apos;m code-first: the processes your business runs on get
              built as software, rather than assembled inside a proprietary
              visual workflow builder. That buys you flexibility, clearer
              ownership, and room to grow.
            </p>
            <p className="mt-4 max-w-[52ch] text-pretty text-body text-text-secondary">
              Low-code tools are genuinely useful, and when one is the right
              answer I&apos;ll say so. But the more a process matters to your
              business, the more it pays to own it outright — rather than rent
              it from a platform that can change its rules, its pricing, or its
              availability overnight.
            </p>
            <p className="mt-4 max-w-[52ch] text-pretty text-body text-text-secondary">
              And you decide how much of it I operate. Some clients want the
              whole system run for them so they never think about it again;
              others want it deployed into their own cloud and handed over;
              plenty want something in between. I&apos;ll recommend a model —
              you pick one.
            </p>
          </Reveal>

          <PointList items={PRINCIPLES} />
        </div>
      </Container>
    </Section>
  );
}
