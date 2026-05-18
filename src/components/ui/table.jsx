import { cn } from "@/lib/utils";

export function Table({ className, ...props }) {
  return <table className={cn("w-full caption-bottom text-sm", className)} {...props} />;
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn("[&_tr]:border-b [&_tr]:border-white/8", className)} {...props} />;
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        "border-b border-white/8 transition hover:bg-white/[0.03]",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle text-[11px] font-black uppercase tracking-[0.18em] text-white/45",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }) {
  return (
    <td
      className={cn("px-4 py-4 align-middle text-white/80", className)}
      {...props}
    />
  );
}
