import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { FaqGroup, type FaqItem } from "@/components/faq/faq-group";
import { FaqCta } from "@/components/faq/faq-cta";

const title = "FAQ — Pricing, Delivery Models & Ownership | AGility";
const description =
  "Straight answers on how AGility works: pricing and infrastructure costs, project timelines, who owns the software, where it runs, who operates it after launch, custom vs low-code, and how we handle security.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/faq",
  },
};

const linkClass =
  "rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/**
 * Answers that need more than one paragraph are written as JSX. `FaqGroup`
 * wraps a plain string in a styled `<p>` for us, but styles multi-part answers
 * only at the container level — so JSX answers carry their own spacing classes.
 */
const paragraph = "text-body text-text-secondary";

const WORKING_TOGETHER: FaqItem[] = [
  {
    q: "What kind of businesses do you work with?",
    a: "Small and growing companies with repetitive, manual work — the kind where people spend hours copy-pasting between systems, chasing updates, re-keying the same data, or answering the same questions. We're based in Europe and work with clients worldwide.",
  },
  {
    q: "Do you build custom software, or use low-code tools like n8n?",
    a: (
      <div className="flex flex-col gap-4">
        <p className={paragraph}>
          We&apos;re code-first. For the processes a business actually runs on,
          we build custom software rather than assembling it inside a proprietary
          visual workflow builder — that&apos;s what gives you flexibility,
          clearer ownership, and room to grow.
        </p>
        <p className={paragraph}>
          That said, we&apos;re not ideological about it. If an existing tool —
          including a low-code one — solves your problem more cheaply, more
          simply, or more safely, we&apos;ll tell you, even when it means a
          smaller project for us. We also use third-party services ourselves;
          nobody builds without them. What we avoid is making a core business
          process depend on a platform you can&apos;t move off.
        </p>
      </div>
    ),
  },
  {
    q: "Can you work with the tools and systems we already use?",
    a: "Almost always. A big part of what we do is connecting the systems you already rely on — your CRM, inbox, spreadsheets, and internal tools — so they finally work together instead of in isolation. We fit around your stack rather than asking you to rip it out.",
  },
  {
    q: "We're not technical — is that a problem?",
    a: "Not at all. Most of the people we work with run a business, not an engineering team. We handle the technical side and explain everything in plain language, so you always understand what you're paying for and why it matters. And if owning cloud infrastructure sounds like a headache you don't need, that's exactly what the fully managed option is for.",
  },
  {
    q: "What if we already have an in-house developer or technical team?",
    a: "Then you're in a good position. We can work alongside your team — taking on something they don't have time for, building in an area they don't specialise in, or handing over cleanly for them to own. We'll follow your conventions and review process where you have them. The goal is to make your setup better, not to build a parallel one only we understand.",
  },
  {
    q: "How do we get started?",
    a: (
      <div className="flex flex-col gap-4">
        <p className={paragraph}>
          It runs in five steps: a free consultation, then discovery, then a
          scope, then a proposal, then the build. The consultation is a short
          conversation about where your business is losing time — and an honest
          answer on whether custom software is the right fix. Discovery maps how
          the work flows today and what a win would actually be worth. From
          there we scope the solution, agree how it should be delivered and
          operated, and put a proposal in front of you. Nothing gets built until
          you&apos;ve approved that.
        </p>
        <p className={paragraph}>
          You can{" "}
          <Link href="/book" className={linkClass}>
            book a consultation
          </Link>{" "}
          or{" "}
          <Link href="/contact" className={linkClass}>
            send us a message
          </Link>{" "}
          whenever you&apos;re ready.
        </p>
      </div>
    ),
  },
];

const PRICING_TIMELINES: FaqItem[] = [
  {
    q: "How does pricing work?",
    a: (
      <div className="flex flex-col gap-4">
        <p className={paragraph}>
          It depends on the scope and on how you want the system delivered. In
          practice a project involves some combination of a fixed fee for a
          defined build, a recurring fee if we operate or maintain the system for
          you, infrastructure and AI API usage costs, and optional ongoing
          development.
        </p>
        <p className={paragraph}>
          Which of those apply to you is set out in the proposal, before any work
          starts. We don&apos;t publish standard rates, because we haven&apos;t
          got a standard project — quoting you properly takes one conversation.
        </p>
      </div>
    ),
  },
  {
    q: "Do you charge a fixed price or by the hour?",
    a: "For a defined project with a settled scope, we prefer a fixed price so the cost is predictable from day one. Ongoing work — maintenance, improvements, new features, or operating the system on your behalf — doesn't fit a one-off number, so that's set up as a recurring arrangement instead. We'll recommend whichever suits the work and explain why.",
  },
  {
    q: "Who pays for infrastructure and AI API usage?",
    a: (
      <div className="flex flex-col gap-4">
        <p className={paragraph}>
          It depends on the delivery model and what&apos;s agreed in the project.
          If you hold the accounts — the client-owned and hybrid models — those
          costs are billed to you directly by the providers, which also means you
          can see exactly what you&apos;re spending.
        </p>
        <p className={paragraph}>
          If we operate the system for you, infrastructure and API usage may be
          included in the fee or accounted for separately, depending on how
          predictable that usage is. AI API costs in particular scale with
          volume, so we&apos;d rather be explicit about them up front than fold
          them into a number that stops making sense once you grow.
        </p>
      </div>
    ),
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope, and we'd rather not invent a universal number. A focused automation — one workflow, a couple of systems — can be a matter of weeks. A larger internal tool, a customer-facing product, or anything touching several systems takes longer. Whatever the size, we work in increments and put something usable in front of you early, instead of disappearing for a quarter.",
  },
  {
    q: "Is the consultation really free?",
    a: "Yes. The first consultation costs nothing and carries no obligation. It's a genuine conversation about your business — and if custom software isn't the right move for you, we'll tell you that too.",
  },
  {
    q: "What if we're not sure exactly what we need yet?",
    a: "That's normal, and it's exactly what discovery is for. You bring the problem — the thing that's slow, costly, or frustrating — and we help shape it into a clear plan before anyone commits to a build. Plenty of good projects start as \"this bit of our week is a mess\".",
  },
];

const DELIVERY_OWNERSHIP: FaqItem[] = [
  {
    q: "Where does the software run?",
    a: (
      <div className="flex flex-col gap-4">
        <p className={paragraph}>
          That&apos;s your call. There are three models, and we&apos;ll
          recommend one based on your technical team, security requirements,
          budget, and how much you want to manage yourself:
        </p>
        <ul className="flex list-disc flex-col gap-3 pl-5">
          <li className={paragraph}>
            <span className="font-medium text-text-primary">
              Fully managed.
            </span>{" "}
            We operate the production system on your behalf — hosting,
            deployments, monitoring, and maintenance. You just use the software.
          </li>
          <li className={paragraph}>
            <span className="font-medium text-text-primary">Client-owned.</span>{" "}
            We build and deploy into infrastructure and accounts you control,
            then hand over the agreed source code, configuration, and
            documentation for your team or another provider to run.
          </li>
          <li className={paragraph}>
            <span className="font-medium text-text-primary">Hybrid.</span> You
            own the environment and the accounts; we keep developing, deploying,
            monitoring, and improving the software inside them with authorised
            access.
          </li>
        </ul>
        <p className={paragraph}>
          None of these is the &ldquo;right&rdquo; one in general — only for you.
          We settle it during scoping, so the system is designed for it from the
          start.
        </p>
      </div>
    ),
  },
  {
    q: "Who owns the software?",
    a: (
      <div className="flex flex-col gap-4">
        <p className={paragraph}>
          Three things get tangled together here, so we keep them separate. The
          custom software we build specifically for you is intended to be yours
          under the project agreement. Your business data is yours. Third-party
          services — cloud hosting, AI providers, payment processors — remain
          subject to their own providers&apos; terms, and who holds those
          accounts depends on the delivery model you choose.
        </p>
        <p className={paragraph}>
          The exact ownership, licensing, access, and hand-off terms belong in
          the project agreement rather than in a sentence on a website. What we
          can say plainly is that we build with ownership and portability in
          mind, and we&apos;ll put the specifics in writing before you commit.
        </p>
      </div>
    ),
  },
  {
    q: "Can you use our existing OpenAI, Anthropic, CRM, or cloud accounts?",
    a: "Yes, where it's technically appropriate — and it's often the better choice. Building against accounts you already hold keeps billing transparent, keeps the data under your own contracts with those providers, and means nothing needs migrating if you later change how we work together.",
  },
  {
    q: "Can you work inside our cloud environment?",
    a: "Yes, where it's technically appropriate. Under the client-owned and hybrid models we deploy into your AWS, Vercel, or other cloud environment. You grant the technical permissions needed to build, deploy, monitor, and maintain the system — scoped to the work rather than blanket administrative control — and you can review or revoke them.",
  },
  {
    q: "Can we own the Trigger.dev project?",
    a: (
      <div className="flex flex-col gap-4">
        <p className={paragraph}>
          Yes. Where a project uses Trigger.dev — a code-first platform for
          long-running background tasks and AI workflows, with retries, queues,
          concurrency controls, scheduling, and observability built in — the
          client-owned and hybrid models mean your company creates and owns the
          organisation and project, and we work inside it with the access we
          need.
        </p>
        <p className={paragraph}>
          Worth knowing: Trigger.dev Cloud runs tasks on Trigger.dev&apos;s own
          managed infrastructure, and there is also a self-hosted option. The two
          are not identical in every respect, so which one fits is something
          we&apos;d work through during scoping — alongside whether the project
          needs that kind of background-job infrastructure at all.
        </p>
      </div>
    ),
  },
  {
    q: "Can AGility manage our Trigger.dev environment?",
    a: "Yes. Under a managed or hybrid arrangement we handle the tasks, deployments, monitoring, retries, and concurrency settings on your behalf, working with the permissions the job requires rather than ownership of your account. If you've chosen a model where you hold the organisation, you keep holding it.",
  },
];

const AFTER_LAUNCH: FaqItem[] = [
  {
    q: "What happens after launch?",
    a: "One of three things, depending on what you want. We can keep operating the system for you. We can maintain and improve it while your team owns the infrastructure. Or we can hand it over — the agreed source code, deployment configuration, and documentation — for your team to run independently. Ongoing support is an option you choose, not a condition of working with us.",
  },
  {
    q: "Can we stop working with AGility?",
    a: (
      <div className="flex flex-col gap-4">
        <p className={paragraph}>
          Yes. We build with portability in mind precisely so that leaving is a
          real option rather than something we can hold over you: standard
          technology, documented setup, and the agreed deliverables.
        </p>
        <p className={paragraph}>
          In practice, how a wind-down runs depends on the model you chose and
          the terms in the project agreement — if we&apos;re operating
          infrastructure on your behalf, there&apos;s a transition to plan rather
          than a switch to flip, and third-party services have their own
          arrangements. We&apos;d far rather agree all of that up front, while
          everyone&apos;s happy, than improvise it later.
        </p>
      </div>
    ),
  },
  {
    q: "What if we want another developer to take over?",
    a: "That's a reasonable thing to want, and properly documented software transitions fine. Your new team gets the agreed deliverables — source code, deployment configuration, and setup and environment documentation — and credentials are re-provisioned under the appropriate owner's control rather than passed around informally. We'll answer their questions during the handover. Software only one person can run is an engineering failure, not a retention strategy.",
  },
  {
    q: "How do you handle security?",
    a: (
      <div className="flex flex-col gap-4">
        <p className={paragraph}>
          Carefully, and honestly. We don&apos;t hold formal certifications like
          SOC 2 or ISO 27001, and we won&apos;t claim compliance we haven&apos;t
          been audited for.
        </p>
        <p className={paragraph}>
          What we do practise: least-privilege access, scoped to the work and
          removed when it&apos;s no longer needed; secrets kept out of source
          control and managed properly; encryption in transit; and collecting
          only the data a system genuinely needs. If your requirements mean the
          system has to run inside your own infrastructure, under your own
          accounts, that&apos;s exactly what the client-owned and hybrid models
          are for.
        </p>
        <p className={paragraph}>
          The third-party providers we build on carry their own security
          responsibilities and publish their own certifications. We&apos;re happy
          to walk through which providers a project would involve and what that
          means for you.
        </p>
      </div>
    ),
  },
];

export default function FaqPage() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="FAQ"
        title="The questions we hear most, answered plainly."
        subtitle="How pricing works, how long things take, who owns what, where the software runs, and what happens after launch — no jargon, no fine print. If your question isn't here, just ask."
      />
      <FaqGroup
        id="working-together"
        index="01"
        eyebrow="Working together"
        heading="Working together"
        items={WORKING_TOGETHER}
      />
      <FaqGroup
        id="pricing-timelines"
        index="02"
        eyebrow="Pricing & timelines"
        heading="Pricing, costs and timelines"
        items={PRICING_TIMELINES}
        className="border-t border-border bg-bg-surface"
      />
      <FaqGroup
        id="delivery-ownership"
        index="03"
        eyebrow="Delivery & ownership"
        heading="Delivery, ownership and infrastructure"
        items={DELIVERY_OWNERSHIP}
        className="border-t border-border"
      />
      <FaqGroup
        id="after-launch"
        index="04"
        eyebrow="After launch"
        heading="After launch, support and security"
        items={AFTER_LAUNCH}
        className="border-t border-border bg-bg-surface"
      />
      <FaqCta />
    </main>
  );
}
