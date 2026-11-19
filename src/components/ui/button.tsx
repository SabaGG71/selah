import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Selah controls (lookbook "Quiet controls"): a solid chip 36px tall with 2px corners on desktop,
// 44px on touch. The interface blue with a white label. No shadows, no pills.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[2px] border border-transparent font-sans font-medium whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-action disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-action text-on-action hover:bg-action-hover",
        outline: "border-action bg-transparent text-action hover:bg-action hover:text-on-action",
        ghost: "text-action hover:bg-muted",
        link: "h-auto px-0 text-action underline decoration-1 underline-offset-4 hover:text-action-hover",
      },
      size: {
        default: "h-11 px-5 text-[0.9375rem] lg:h-9 lg:px-4 lg:text-sm",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-11",
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
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
