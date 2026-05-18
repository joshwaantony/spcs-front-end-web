"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

export function AlertDialogOverlay({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn("fixed inset-0 z-[90] bg-[#050816]/70 backdrop-blur-sm", className)}
      {...props}
    />
  );
}

export function AlertDialogContent({ className, ...props }) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-[100] w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(10,16,30,0.98))] p-6 text-white shadow-[0_40px_120px_-50px_rgba(0,0,0,0.85)]",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

export function AlertDialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

export function AlertDialogTitle({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Title
      className={cn("text-2xl font-black tracking-[-0.03em] text-white", className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-sm leading-6 text-white/65", className)}
      {...props}
    />
  );
}

export function AlertDialogFooter({ className, ...props }) {
  return (
    <div
      className={cn("mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}
