import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-[#d7ff94] text-[#111827] hover:brightness-95",
        secondary: "border border-white/10 bg-white/8 text-white hover:bg-white/12",
        outline:
          "border border-white/10 bg-white/5 text-white hover:bg-white/10",
        ghost: "text-white/80 hover:bg-white/10 hover:text-white",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        light:
          "border border-[#e5e7eb] bg-white text-[#111827] hover:bg-[#f8fafc]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = forwardRef(function Button(
  { className, variant, size, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});

export { buttonVariants };
