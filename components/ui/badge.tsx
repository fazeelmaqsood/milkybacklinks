import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#f97316]/20 text-[#fdba74] border border-[#f97316]/30",
        success: "bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/30",
        warning: "bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/30",
        danger: "bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/30",
        secondary: "bg-[#f2f0eb] text-[#6b6866] border border-[#e0ddd8]",
        outline: "border border-[#e0ddd8] text-[#6b6866]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
