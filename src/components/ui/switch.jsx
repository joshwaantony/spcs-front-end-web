"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({ className, variant = "dark", ...props }) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        variant === "light"
          ? "peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-slate-200 bg-slate-100 p-1 transition data-[state=checked]:bg-[#46EC12]"
          : "peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-white/10 bg-white/10 p-1 transition data-[state=checked]:bg-[#d7ff94]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block h-5 w-5 rounded-full bg-white transition data-[state=checked]:translate-x-5",
          variant === "light" ? "data-[state=checked]:bg-[#111827]" : "data-[state=checked]:bg-[#111827]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}
