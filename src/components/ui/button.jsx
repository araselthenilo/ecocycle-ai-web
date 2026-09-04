import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "btn-cta-primary",
        primary: "btn-cta-primary",
        outline: "btn-cta-outline",
        secondary:
          "rounded-2xl bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        ghost:
          "rounded-2xl hover:bg-muted hover:text-foreground",
        destructive:
          "rounded-2xl bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
        "shadcn-default":
          "rounded-2xl border border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        "shadcn-outline":
          "rounded-2xl border border-border bg-background hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "",
        sm: "h-8 gap-1.5 px-3 text-xs",
        md: "h-10 gap-2 px-4 text-sm",
        lg: "h-12 gap-2 px-6 text-base",
        icon: "size-8",
        "icon-sm": "size-7",
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
  href,
  children,
  ...props
}) {
  if (href) {
    return (
      <a
        data-slot="button"
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
export default Button
