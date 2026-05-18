"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-90 bg-[#050816]/70 backdrop-blur-sm", className)}
      {...props}
    />
  );
}

export function DialogContent({ className, children, showClose = true, variant = "dark", ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          variant === "light"
            ? "fixed left-1/2 top-1/2 z-100 w-[min(92vw,780px)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-slate-200 bg-white p-6 text-[#141810] shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)]"
            : "fixed left-1/2 top-1/2 z-100 w-[min(92vw,780px)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(10,16,30,0.98))] p-6 text-white shadow-[0_40px_120px_-50px_rgba(0,0,0,0.85)]",
          className
        )}
        {...props}
      >
        {children}
        {showClose ? (
          <DialogPrimitive.Close
            className={cn(
              variant === "light"
                ? "absolute right-5 top-5 rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                : "absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

export function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      className={cn("text-2xl font-black tracking-[-0.03em] text-white", className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm leading-6 text-white/65", className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }) {
  return (
    <div
      className={cn("mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}
