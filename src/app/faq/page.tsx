import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { FaqGroup, type FaqItem } from "@/components/faq/faq-group";
import { FaqCta } from "@/components/faq/faq-cta";

const title = "FAQ — Pricing, Timelines & How We Work | AGility";
const description =
  "Straight answers on how AGility works: pricing and engagement, project timelines, who owns the code, support after launch, custom vs low-code, and how we handle your data.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

const linkClass =
  "rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const WORKING_TOGETHER: FaqItem[] = [
  {
    q: "What kind of businesses do you work with?",
    a: "Small and growing companies with repetitive, manual work — the kind where people spend hours copy-pasting between systems, chasing updates, or re-keying the same data. We're based in Europe and work with clients worldwide.",
  },
  {
    q: "Do you build custom software, or use low-code tools like n8n?",
    a: "We build custom software instead of relying primarily on low-code automation platforms. This gives you greater flexibility, ownership, scalability, and eliminates dependence on third-party workflow builders. Low-code tools have their place, and we'll say so when one is genuinely the right fit — but for the processes your business runs on, owning the software tends to pay off.",
  },
  {
    q: "Can you work with the tools and systems we already use?",
    a: "Almost always. A big part of what we do is connecting the systems you already rely on — your CRM, inbox, spreadsheets, and internal tools — so they finally work together instead of in isolation. We fit around your stack rather than asking you to rip it out.",
  },
  {
    q: "We're not technical — is that a problem?",
    a: "Not at all. Most of the people we work with run a business, not an engineering team. We handle the technical side and explain everything in plain language, so you always understand what you're paying for and why it matters.",
  },
  {
    q: "How do we get started?",
    a: (
      <p className="max-w-2xl text-body text-text-secondary">
        The first step is a short, free consultation. We&apos;ll look at where
        your business is losing time and tell you honestly whether custom
        software is the right answer. You can{" "}
        <Link href="/book" className={linkClass}>
          book a consultation
        </Link>{" "}
        or{" "}
        <Link href="/contact" className={linkClass}>
          send us a message
        </Link>{" "}
        whenever you&apos;re ready.
      </p>
    ),
  },
];

const PRICING_TIMELINES: FaqItem[] = [
  {
    q: "How does pricing work?",
    a: "Every project is scoped and quoted individually, because every business is different. After a short discovery conversation, we give you a clear proposal — so you know the investment before any work begins, with no surprise hourly bills.",
  },
  {
    q: "Do you charge a fixed price or by the hour?",
    a: "For a defined project, we prefer a fixed scope and a fixed price, so the cost is predictable from day one. For ongoing work — maintenance, improvements, and new features over time — we set up a simpler continuing arrangement. We'll recommend whichever fits the work and explain why.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on scope, but most focused automations or internal tools land in a matter of weeks rather than months. We work in increments and get something useful into your hands early, instead of disappearing for a quarter and hoping it lands.",
  },
  {
    q: "Is the consultation really free?",
    a: "Yes. The first consultation costs nothing and carries no obligation. It's a genuine conversation about your business — and if custom software isn't the right move for you, we'll tell you that too.",
  },
  {
    q: "What if we're not sure exactly what we need yet?",
    a: "That's normal, and it's exactly what the discovery stage is for. You bring the problem — the thing that's slow, costly, or frustrating — and we help shape it into a clear plan before anyone commits to a build.",
  },
];

const OWNERSHIP_SUPPORT: FaqItem[] = [
  {
    q: "Who owns the code you build?",
    a: "You do — completely. The code, the data, and the software are yours to keep, host, and extend however you like. You're never locked into us or into a platform you don't control.",
  },
  {
    q: "What happens after launch?",
    a: "We stay involved. We offer ongoing support to maintain, monitor, and improve what we've built, and to extend it as your business grows. You're never left holding software you can't maintain.",
  },
  {
    q: "How do you handle our data and security?",
    a: "Seriously, and at a level that fits your business. In practice that means least-privilege access, keeping secrets out of the code, encrypting data in transit, and building on your own accounts and infrastructure wherever we can. We don't sell or share your data, and we're happy to walk through the specifics for anything sensitive.",
  },
  {
    q: "What if we already have software or an in-house team?",
    a: "That's common, and it's fine. We can build alongside what you already have, integrate with it, or hand work off cleanly to your team with the documentation to run it. The goal is to make your setup better, not to make you start over.",
  },
];

export default function FaqPage() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="FAQ"
        title="The questions we hear most, answered plainly."
        subtitle="How pricing works, how long things take, who owns what, and what happens after launch — no jargon, no fine print. If your question isn't here, just ask."
      />
      <FaqGroup
        id="working-together"
        eyebrow="Working together"
        heading="Working together"
        items={WORKING_TOGETHER}
      />
      <FaqGroup
        id="pricing-timelines"
        eyebrow="Pricing & timelines"
        heading="Pricing and timelines"
        items={PRICING_TIMELINES}
        className="bg-bg-surface"
      />
      <FaqGroup
        id="ownership-support"
        eyebrow="After launch"
        heading="Ownership, support and security"
        items={OWNERSHIP_SUPPORT}
      />
      <FaqCta />
    </main>
  );
}
