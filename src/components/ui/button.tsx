import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
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
