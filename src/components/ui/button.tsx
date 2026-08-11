import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * AGility button system.
 *
 * Three things distinguish this from the stock shadcn styling:
 *
 *   1. **Rectangles, not pills.** `rounded-md` (6px). Fully-rounded buttons are
 *      the house style of the exact template aesthetic this design system
 *      exists to avoid, and a tighter radius reads as a tool rather than a
 *      landing page.
 *   2. **A real hierarchy.** `primary` is a solid copper fill and is the only
 *      variant that carries the accent colour. `secondary` is a hairline
 *      outline. `ghost` and `link` are quieter still. Because there is exactly
 *      one loud variant, a visitor can always tell what the page wants them to
 *      do — which is the entire job of a CTA system.
 *   3. **Sizes that match the type scale**, so call sites stop overriding
 *      heights and padding inline (the old code shipped `h-12 rounded-full
 *      px-7` at nearly every call site, which meant the variants weren't
 *      really doing anything).
 *
 * The primary variant's inset top highlight and one-pass sheen on hover are
 * borrowed from the physical-button treatments common on Uiverse, dialled far
 * down: a 1px light edge and a low-opacity sweep. At full strength that effect
 * looks like a toy; at this strength it just looks like the button is made of
 * something. Both are pure CSS transitions, so the global reduced-motion reset
 * in globals.css neutralises them without any JS involvement.
 */
const buttonVariants = cva(
  [
    "group/button relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden",
    "rounded-md border border-transparent bg-clip-padding font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-[--duration-fast] ease-[--ease-standard]",
    "outline-none select-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-45",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/25",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-accent-foreground",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_1px_2px_rgba(0,0,0,0.4)]",
          "hover:bg-accent-hover",
          "active:bg-accent-active",
          // Single sheen pass on hover.
          "before:pointer-events-none before:absolute before:inset-y-0 before:-left-full before:-z-10 before:w-full",
          "before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
          "before:transition-transform before:duration-700 before:ease-[--ease-out]",
          "hover:before:translate-x-[200%]",
        ],
        secondary: [
          "border-border-strong bg-bg-surface/60 text-text-primary",
          "hover:border-border-hover hover:bg-bg-elevated",
          "aria-expanded:border-border-hover aria-expanded:bg-bg-elevated",
        ],
        ghost:
          "text-text-secondary hover:bg-bg-elevated hover:text-text-primary aria-expanded:bg-bg-elevated aria-expanded:text-text-primary",
        link: "h-auto rounded-sm px-0 text-accent underline-offset-4 hover:text-accent-hover hover:underline",
        destructive:
          "border-destructive/25 bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/40",
      },
      size: {
        sm: "h-8 gap-1.5 px-3 text-small",
        md: "h-10 gap-2 px-4 text-small",
        lg: "h-12 gap-2.5 px-6 text-body [&_svg:not([class*='size-'])]:size-[1.125rem]",
        icon: "size-10",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "md",
  render,
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const classes = cn(buttonVariants({ variant, size, className }))

  /**
   * Most call sites pass `render={<Link href/>}` or `render={<a href/>}` — a
   * link that merely *looks* like a button. Those are links, not buttons, and
   * they must keep link semantics: announced as a link, opened in a new tab,
   * listed in a screen reader's links list.
   *
   * Routing them through Base UI's Button primitive is wrong in both directions.
   * Left alone it warns ("expected a native <button>"); silenced with
   * `nativeButton={false}` it stamps `role="button" tabindex="0"` onto a real
   * `<a href>`, which is worse than the warning. So for a non-button `render`
   * element we skip the primitive entirely and just apply the button *styling*
   * to the element the caller gave us.
   *
   * An explicit `nativeButton` from the caller opts back into the primitive —
   * that's the escape hatch for genuinely button-like non-button elements.
   */
  if (
    nativeButton === undefined &&
    React.isValidElement(render) &&
    render.type !== "button"
  ) {
    type UnknownProps = Record<string, unknown>
    const renderProps = render.props as UnknownProps

    return React.cloneElement(render as React.ReactElement<UnknownProps>, {
      ...(props as UnknownProps),
      "data-slot": "button",
      className: cn(classes, renderProps.className as string | undefined),
    })
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={classes}
      render={render}
      nativeButton={nativeButton}
      {...props}
    />
  )
}

export { Button, buttonVariants }
