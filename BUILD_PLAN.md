# AGility — Build Status & Plan

_Last updated: 2026-07-24_

## What AGility is

A premium marketing site for **AGility**, a custom software/AI engineering company. It must read as a venture-backed product company (Linear/Vercel/Stripe/Anthropic/Cursor/Resend/Raycast tier), never as a freelancer portfolio or generic agency template.

### Positioning (locked — do not drift from this)
- **Sell business outcomes, not AI.** Businesses don't wake up wanting "automation" — they think "we're wasting hours," "too many emails," "leads aren't getting answered," "we're paying people to copy-paste." AI/code is the *method*, never the headline.
- **Never claim code is unconditionally superior to no-code/low-code (e.g. n8n).** The defensible framing, to be used near-verbatim where relevant: *"We build custom software instead of relying primarily on low-code automation platforms. This gives you greater flexibility, ownership, scalability, and eliminates dependence on third-party workflow builders."*
- **No fabricated testimonials/case studies.** Trust is built via honest sections instead: built with modern AI, fully custom software, own your code, fast communication, long-term support, transparent development, GitHub projects, LinkedIn, open-source contributions, technology stack.
- **Copy rules:** avoid "revolutionize your business," "unlock AI," "next generation," and similar buzzwords. Always name the business problem → why it costs money → how AGility solves it. Confident, intelligent tone, written for business owners/decision-makers, not engineers.
- **Audience:** SMBs and growing companies with repetitive workflows, primarily Europe, available worldwide.
- **Primary conversions:** book a Zoom consultation, send an email, submit a contact form. Every page should funnel toward these.

### Copy on file (from earlier brainstorm, to be refined not replaced)
- Tagline: "Save Time. Cut Costs. Scale Faster."
- Badge/category: "Custom AI & Automation"
- CTA: "Book a consultation →"

## Decisions (resolved this session)

| Decision | Resolution |
|---|---|
| Site structure | **Multi-page**: `/`, `/services`, `/process`, `/about`, `/technologies`, `/work` (GitHub/engineering practice, not fake case studies), `/faq`, `/contact`, `/book` |
| Color palette | **Electric Indigo**, dark-only brand identity (no light/dark toggle — matches Linear/Vercel/Cursor/Raycast convention for a fixed dark brand). Base `#0A0A0D`, accent `#5A6EFF`, refined into a full token system during foundation setup. |
| Fonts | Keep **Geist Sans / Geist Mono** (already wired via `next/font`) — genuinely fits the "engineered SaaS" register the inspiration set uses. |
| Motion | **Framer Motion**, tasteful only: scroll reveals, hover/magnetic micro-interactions, smooth transitions — never decorative-only motion. |
| Components | shadcn/ui (CLI-installed, not MCP — no shadcn/React Bits MCP server is configured in this environment, so premium components are either pulled via the shadcn CLI's URL-registry mechanism where reachable, or hand-built with Framer Motion). |
| Research inputs | Linear, Vercel, OpenAI, Anthropic, Stripe, Cursor, Arc, Resend, Clerk, Raycast — synthesized, not copied. |

## Current state

### Done
- Healthy Next.js 16.2.11 + React 19.2.4 + Tailwind v4 + TypeScript scaffold, pnpm-managed, `install`/`lint`/`build` all verified passing.
- Positioning, structure, and design decisions locked (this document).

### Not done yet (the actual build)
Everything below `src/app/` is still default boilerplate. Full build required.

## Implementation plan

### Phase 0 — Foundation (in progress)
- `git init` + baseline commit.
- Install Framer Motion, lucide-react, shadcn/ui (`init`), `cn()` utility.
- Establish full design-token system (colors, type scale, spacing, radii) in `globals.css`.
- Shared primitives: `Container`/`Section`, `Nav` (with mobile menu), `Footer`, base `Button` variants.
- Real metadata (title/description/OpenGraph), replace favicon.

### Phase 1 — Home page (flagship / reference implementation)
Hero → problem statement → business outcomes → services preview → why custom software (the n8n-alternative framing) → process preview → technology → why choose AGility → GitHub section → LinkedIn section → FAQ preview → contact CTA → footer. Built first and reviewed before other pages copy its patterns.

### Phase 2 — Remaining pages (parallelized once Home is validated)
`/services`, `/process`, `/about`, `/technologies`, `/work`, `/faq`, `/contact`, `/book`.

### Phase 3 — Review & QA (subagent-driven)
- Code/architecture review (duplication, component structure).
- Accessibility (WCAG AA, keyboard nav, reduced motion, ARIA).
- Performance (Core Web Vitals, image/font loading, bundle size) — target Lighthouse 95+.
- Content/positioning review against the locked positioning rules above.
- Fix everything flagged.

### Phase 4 — SEO
Per-page metadata, OpenGraph, semantic headings, schema where relevant, alt text.

### Phase 5 — Deploy
Vercel (natural fit for the stack) — pending your confirmation when we get there.

## Working method for the rest of this build
Subagents do all building, testing, and reviewing. I gate each phase transition (verify build/lint/review results) before the next phase starts or parallelizes, so problems don't propagate across 8 pages at once.
