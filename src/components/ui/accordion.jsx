"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col overflow-hidden rounded-[28px] bg-white", className)}
      {...props} />
  );
}

function AccordionItem({
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("last:border-b-0", className)}
      {...props} />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-5 px-5 py-5 text-left text-[16px] font-semibold tracking-tight text-ink transition-colors duration-200 hover:bg-[var(--color-soft)] hover:text-ink focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 sm:px-8 sm:py-6 sm:text-[17px]",
          className
        )}
        {...props}>
        {children}
        <span
          aria-hidden="true"
          className="relative ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-transparent text-ink transition-all duration-300 ease-out group-aria-expanded/accordion-trigger:rotate-180"
        >
          <PlusIcon
            data-slot="accordion-trigger-icon"
            className="absolute h-4 w-4 transition-all duration-200 ease-out group-aria-expanded/accordion-trigger:scale-0 group-aria-expanded/accordion-trigger:opacity-0" />
          <MinusIcon
            data-slot="accordion-trigger-icon"
            className="absolute h-4 w-4 scale-0 opacity-0 transition-all duration-200 ease-out group-aria-expanded/accordion-trigger:scale-100 group-aria-expanded/accordion-trigger:opacity-100" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}>
      <div
        className={cn(
          "h-(--radix-accordion-content-height) px-5 pb-5 pt-0 text-[14px] leading-7 text-muted transition-opacity duration-300 ease-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100 sm:px-8 sm:pb-6 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
