import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white/80",
        success: "bg-[#d7ff94] text-[#24320A]",
        muted: "bg-white/8 text-white/60",
        info: "bg-[#dbeafe] text-[#1849a9]",
        priority: "bg-[#2c3648] text-[#d1e9ff]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
