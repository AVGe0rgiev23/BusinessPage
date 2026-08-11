import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Accordion, restyled for AGility.
 *
 * Changes from the stock shadcn/Base UI styling:
 *   - The paired chevron-up / chevron-down icons are replaced by a single plus
 *     that rotates 45° into a cross. One element that transforms reads as a
 *     considered interaction; two icons swapping visibility reads as a widget.
 *   - `hover:underline` is gone. Underlining a whole FAQ question on hover is
 *     link affordance applied to something that is not a link.
 *   - Hairline dividers and much more generous vertical padding, so a list of
 *     questions has the same density as the rest of the page.
 *
 * The rotation is a CSS transition, so the global reduced-motion reset in
 * globals.css flattens it without any extra handling here.
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col border-t border-border", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-start justify-between gap-6 rounded-sm py-6 text-left",
          "text-h4 font-medium text-text-primary transition-colors duration-[--duration-fast] outline-none",
          "hover:text-accent aria-expanded:text-text-primary",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-bg",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <PlusIcon
          aria-hidden="true"
          data-slot="accordion-trigger-icon"
          className={cn(
            "mt-0.5 size-4 shrink-0 text-text-muted",
            "transition-[transform,color] duration-[--duration-base] ease-[--ease-out]",
            "group-hover/accordion-trigger:text-accent",
            "group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:text-accent"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pb-7 data-ending-style:h-0 data-starting-style:h-0",
          "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-accent-hover",
          "[&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
