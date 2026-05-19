import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#f97316] text-white hover:bg-[#ea6a0a] shadow-lg shadow-[#f97316]/20",
        destructive: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
        outline:
          "border border-[#e0ddd8] bg-transparent text-[#1a1a1a] hover:bg-[#f2f0eb] hover:border-[#f97316]",
        ghost: "text-[#6b6866] hover:bg-[#f2f0eb] hover:text-[#1a1a1a]",
        link: "text-[#f97316] underline-offset-4 hover:underline",
        secondary:
          "border border-[#e0ddd8] bg-[#f2f0eb] text-[#1a1a1a] hover:bg-[#ebe8e2] hover:border-[#f97316]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
