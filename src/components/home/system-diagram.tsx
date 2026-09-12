"use client";

import * as React from "react";
import { animate, stagger, svg } from "animejs";

import { cn } from "@/lib/utils";
import { duration, ease, prefersReducedMotion } from "@/lib/motion";

/**
 * SystemDiagram — the hero's visual centrepiece.
 *
 * It shows the one thing AGility actually sells: repetitive inputs going into
 * a piece of custom software, and finished work coming out. Every label is
 * taken from work described elsewhere on the site — the inbox that never
 * empties, documents to re-key, CRM records to sync — so it is a diagram of
 * the real proposition rather than decoration.
 *
 * Explicitly NOT a fake dashboard. No invented metrics, no fabricated charts,
 * no numbers that imply results that cannot be evidenced. It is a schematic, which is
 * both more honest and more in keeping with an engineering practice.
 *
 * ── How it is built ──────────────────────────────────────────────────────────
 * Nodes are real HTML, so the labels get the site's actual typography, stay
 * crisp at any zoom, and reflow with normal layout rules. The connecting wires
 * are an SVG overlay whose path geometry is *measured* from the laid-out nodes
 * rather than hard-coded. That is what lets the same component work as a
 * left-to-right flow on desktop and a top-to-bottom flow on mobile without a
 * second implementation or a pile of breakpoint-specific coordinates.
 */

const INPUTS = [
  { id: "in-0", label: "Inbox" },
  { id: "in-1", label: "Documents" },
  { id: "in-2", label: "CRM records" },
  { id: "in-3", label: "Spreadsheets" },
  { id: "in-4", label: "Web forms" },
];

const OUTPUTS = [
  { id: "out-0", label: "Enquiries answered" },
  { id: "out-1", label: "Data captured" },
  { id: "out-2", label: "Systems in sync" },
  { id: "out-3", label: "Hours returned" },
];

const SYSTEM_ID = "system";

interface Wire {
  d: string;
  /** Inputs draw before outputs, so the flow reads in the right direction. */
  phase: 0 | 1;
}

/** Centre-point of `rect` on the edge facing `towards`, in container coords. */
function anchor(
  rect: DOMRect,
  container: DOMRect,
  towards: "right" | "left" | "down" | "up"
) {
  const x = rect.left - container.left;
  const y = rect.top - container.top;
  switch (towards) {
    case "right":
      return { x: x + rect.width, y: y + rect.height / 2 };
    case "left":
      return { x, y: y + rect.height / 2 };
    case "down":
      return { x: x + rect.width / 2, y: y + rect.height };
    case "up":
      return { x: x + rect.width / 2, y };
  }
}

export function SystemDiagram({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [wires, setWires] = React.useState<Wire[]>([]);
  const [box, setBox] = React.useState({ w: 0, h: 0 });

  /* ── Measure the laid-out nodes and derive the wire geometry ───────────── */
  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      if (containerRect.width === 0) return;

      const nodeRect = (id: string) => {
        const el = container.querySelector<HTMLElement>(`[data-node="${id}"]`);
        return el?.getBoundingClientRect() ?? null;
      };

      const systemRect = nodeRect(SYSTEM_ID);
      if (!systemRect) return;

      // Orientation is inferred, not assumed: whichever axis separates the
      // first input from the system is the axis the flow runs along. One code
      // path serves the desktop row and the stacked mobile column.
      const firstInput = nodeRect(INPUTS[0].id);
      const horizontal = firstInput
        ? Math.abs(systemRect.left - firstInput.left) >
          Math.abs(systemRect.top - firstInput.top)
        : true;

      const next: Wire[] = [];

      const connect = (
        fromRect: DOMRect,
        toRect: DOMRect,
        phase: 0 | 1
      ): void => {
        const from = anchor(
          fromRect,
          containerRect,
          horizontal ? "right" : "down"
        );
        const to = anchor(toRect, containerRect, horizontal ? "left" : "up");

        // Control points pushed along the flow axis give a calm S-curve. The
        // 0.55 factor is high enough that wires leave and arrive perpendicular
        // to their nodes, which is what makes it read as a schematic rather
        // than a bundle of loose strings.
        const dx = (to.x - from.x) * 0.55;
        const dy = (to.y - from.y) * 0.55;

        const d = horizontal
          ? `M ${from.x},${from.y} C ${from.x + dx},${from.y} ${to.x - dx},${to.y} ${to.x},${to.y}`
          : `M ${from.x},${from.y} C ${from.x},${from.y + dy} ${to.x},${to.y - dy} ${to.x},${to.y}`;

        next.push({ d, phase });
      };

      if (horizontal) {
        // Wide layout: every input fans into the system, and the system fans
        // back out to every outcome. The convergence is the message.
        for (const input of INPUTS) {
          const rect = nodeRect(input.id);
          if (rect) connect(rect, systemRect, 0);
        }
        for (const output of OUTPUTS) {
          const rect = nodeRect(output.id);
          if (rect) connect(systemRect, rect, 1);
        }
      } else {
        /*
          Stacked layout: a chain, not a fan.

          Fanning five inputs to the system when everything sits in one column
          draws five paths straight down the same line, through the nodes in
          between. They overlap into a single stroke of uneven brightness and
          the diagram stops reading as a diagram. Chaining each node to the one
          below it gives a single clean spine that still says "all of this goes
          in, this comes out".
        */
        const chain = [
          ...INPUTS.map((n) => n.id),
          SYSTEM_ID,
          ...OUTPUTS.map((n) => n.id),
        ];

        for (let i = 0; i < chain.length - 1; i++) {
          const from = nodeRect(chain[i]);
          const to = nodeRect(chain[i + 1]);
          if (from && to) connect(from, to, i < INPUTS.length ? 0 : 1);
        }
      }

      setBox({ w: containerRect.width, h: containerRect.height });
      setWires(next);
    };

    // Coalesce bursts of resize callbacks into one measurement per frame.
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    schedule();

    const observer = new ResizeObserver(schedule);
    observer.observe(container);

    // Web fonts change label widths, which moves every anchor point.
    void document.fonts?.ready.then(schedule);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  /* ── Draw the wires, then let data trickle along them ──────────────────── */
  React.useEffect(() => {
    const root = svgRef.current;
    if (!root || wires.length === 0) return;

    const reduced = prefersReducedMotion();

    // Reduced motion gets the finished diagram immediately: fully drawn, fully
    // legible, nothing moving. The information is the point; the animation is
    // the garnish.
    if (reduced) {
      root.querySelectorAll<SVGPathElement>(".wire").forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
        path.style.opacity = "1";
      });
      return;
    }

    const drawing = animate(svg.createDrawable(".wire"), {
      draw: ["0 0", "0 1"],
      duration: duration.cinematic,
      delay: stagger(70, { start: 260 }),
      ease: ease.out,
    });

    /*
      A single dash travelling each wire, once the wire exists. This is the
      only looping animation on the page and it is deliberately slow and faint:
      it should register as "this system is live" out of the corner of the eye,
      never as something demanding attention while someone reads the headline.
    */
    const pulses = Array.from(
      root.querySelectorAll<SVGPathElement>(".pulse")
    ).map((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length * 0.12} ${length}`;
      return animate(path, {
        strokeDashoffset: [length * 1.12, -length * 0.12],
        opacity: [
          { to: 0.9, duration: 400 },
          { to: 0.9, duration: 1400 },
          { to: 0, duration: 500 },
        ],
        duration: 2300,
        delay: 1400 + i * 260,
        loop: true,
        loopDelay: 2600,
        ease: "inOutSine",
      });
    });

    return () => {
      drawing.revert();
      for (const pulse of pulses) pulse.revert();
    };
  }, [wires]);

  return (
    <figure className={cn("relative", className)}>
      {/*
        Drafting registration marks. Four hairline corner brackets crop the
        diagram like a technical drawing, which gives it presence against a very
        large headline without resorting to a bordered card — the site already
        has enough of those to answer for.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {(
          [
            "left-0 top-0 border-l border-t",
            "right-0 top-0 border-r border-t",
            "left-0 bottom-0 border-b border-l",
            "right-0 bottom-0 border-b border-r",
          ] as const
        ).map((position) => (
          <span
            key={position}
            className={cn("absolute size-4 border-border-strong", position)}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        aria-hidden="true"
        className={cn(
          "relative grid gap-y-12 py-10",
          // Mobile: a single top-to-bottom column. Desktop: three columns with
          // the system sitting between its inputs and its outputs.
          "grid-cols-1 justify-items-center px-6",
          /*
            Tight horizontal gutters and gaps on desktop. The outer columns are
            `1fr` either side of an `auto` system node, so every pixel spent on
            padding or gap comes straight out of the label columns — at 48px
            gaps plus 24px padding they were squeezed to ~118px and all four
            outcome chips wrapped to two lines.
          */
          "md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-x-6 md:justify-items-stretch md:px-2 lg:gap-x-8"
        )}
      >
        {/* Wires. Sits behind the nodes and never intercepts pointer events. */}
        <svg
          ref={svgRef}
          aria-hidden="true"
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w || 1} ${box.h || 1}`}
          fill="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
        >
          {wires.map((wire, i) => (
            <g key={i}>
              <path
                className="wire"
                d={wire.d}
                stroke="var(--color-border-strong)"
                strokeWidth="1"
                fill="none"
              />
              <path
                className="pulse"
                d={wire.d}
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0"
              />
            </g>
          ))}
        </svg>

        {/* ── Inputs ─────────────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center gap-2.5 md:items-end">
          <Label className="mb-1.5">Manual work</Label>
          {INPUTS.map((input) => (
            <span
              key={input.id}
              data-node={input.id}
              className="rounded-md border border-border bg-bg-surface px-3.5 py-2 text-small text-text-secondary"
            >
              {input.label}
            </span>
          ))}
        </div>

        {/* ── The system ─────────────────────────────────────────────────── */}
        <div className="relative z-10 flex justify-center">
          <div
            data-node={SYSTEM_ID}
            className={cn(
              "relative flex flex-col items-center gap-1 rounded-lg px-5 py-4 text-center",
              "border border-accent-line bg-bg-elevated",
              // The only shadow-plus-tint in the whole composition, which is
              // exactly why the eye lands here first.
              "shadow-[0_0_0_1px_rgba(224,142,67,0.06),0_12px_40px_-12px_rgba(224,142,67,0.28)]"
            )}
          >
            <span className="font-mono text-eyebrow uppercase text-accent">
              Custom software
            </span>
            <span className="font-display text-h4 font-semibold text-text-primary">
              Built for you
            </span>
          </div>
        </div>

        {/* ── Outputs ────────────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center gap-2.5 md:items-start">
          <Label className="mb-1.5">Handled automatically</Label>
          {OUTPUTS.map((output) => (
            <span
              key={output.id}
              data-node={output.id}
              className="rounded-md border border-border-strong bg-bg-elevated px-3.5 py-2 text-small text-text-primary"
            >
              {output.label}
            </span>
          ))}
        </div>
      </div>

      {/*
        One clean sentence for screen readers instead of ten floating labels
        read out of context. The visual is marked aria-hidden above, so this is
        the sole accessible representation — and it is a better one.
      */}
      <figcaption className="sr-only">
        Diagram: repetitive manual work — the inbox, documents, CRM records,
        spreadsheets and web forms — flows into custom software built by AGility,
        which returns answered enquiries, captured data, systems kept in sync,
        and hours given back to your team.
      </figcaption>
    </figure>
  );
}

function Label({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      // Deliberately allowed to wrap. It sits above a column whose width is
      // driven by the chips, and a two-line heading is a far better failure
      // mode than one that runs past the edge of the figure.
      className={cn("font-mono text-eyebrow uppercase text-text-muted", className)}
    >
      {children}
    </span>
  );
}
