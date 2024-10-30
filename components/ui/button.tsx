import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors" +
    " focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "button-ceramic text-primary-foreground shadow hover:button-ceramic:hover",
                destructive:
                    "button-ceramic-destructive text-destructive-foreground shadow-sm hover:button-ceramic-destructive:hover",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "button-ceramic-secondary text-secondary-foreground shadow-sm hover:button-ceramic-secondary:hover",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "button-ceramic-link text-primary underline-offset-4 hover:underline",
                muted: "bg-neutral-200 text-neutral-600 hover:bg-neutral-200/80",
                tertiary: "button-ceramic-tertiary text-neutral-600 hover:button-ceramic-tertiary:hover",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-md px-3",
                xs: "h-7 rounded-md px-2 text-xs",
                lg: "h-11 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
