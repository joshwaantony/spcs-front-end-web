"use client";

import { FormProvider } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function RuleDialogShell({
  open,
  onOpenChange,
  title,
  description,
  methods,
  onSubmit,
  submitLabel,
  loading,
  variant = "dark",
  children,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent variant={variant}>
        <DialogHeader>
          <p
            className={cn(
              "text-[11px] font-black uppercase tracking-[0.24em]",
              variant === "light" ? "text-[#46EC12]" : "text-[#d7ff94]"
            )}
          >
            Pricing Rules
          </p>
          <DialogTitle
            className={variant === "light" ? "text-[#141810]" : undefined}
          >
            {title}
          </DialogTitle>
          <DialogDescription
            className={variant === "light" ? "text-slate-600" : undefined}
          >
            {description}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6">
            {children}

            <DialogFooter>
              <Button
                type="button"
                variant={variant === "light" ? "light" : "outline"}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
