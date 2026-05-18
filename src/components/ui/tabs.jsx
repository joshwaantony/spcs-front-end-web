"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex gap-2 rounded-full border border-[#DEE6DB] bg-white p-1",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex min-w-[148px] items-center justify-center rounded-full px-4 py-2.5 text-sm font-black text-[#131811]/70 transition hover:text-[#131811] data-[state=active]:bg-[#46EC12] data-[state=active]:text-[#131811] data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content className={cn("mt-6", className)} {...props} />;
}
