"use client";

import { useToastStore } from "@/store/ui/toast.store";

export default function AppToaster() {
  const { toasts, dismissToast } = useToastStore();

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[140] flex w-[min(92vw,380px)] flex-col gap-3">
      {toasts.map((toast) => {
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto overflow-hidden rounded-3xl border px-4 py-4 shadow-2xl backdrop-blur ${
              isError
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-[#D8F5A7] bg-white text-[#24320A]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isError ? "bg-red-100 text-red-600" : "bg-[#ECF9D1] text-[#5C8A09]"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isError ? "error" : "check_circle"}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-5">{toast.message}</p>
              </div>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-current/70 transition hover:bg-black/5"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
