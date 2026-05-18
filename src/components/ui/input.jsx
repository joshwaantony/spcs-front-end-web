import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef(function Input({ className, variant = "dark", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        variant === "light"
          ? "flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-[#141810] placeholder:text-slate-500 outline-none transition focus:border-[#46EC12] focus:bg-white"
          : "flex h-11 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#d7ff94] focus:bg-white/10",
        className
      )}
      {...props}
    />
  );
});
