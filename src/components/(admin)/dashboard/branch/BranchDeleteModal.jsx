"use client";

import { HiX } from "react-icons/hi";

export default function BranchDeleteModal({
  isOpen,
  branch,
  deleting,
  deleteError,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !branch) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-[#141810]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[70] overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-lg overflow-hidden rounded-[32px] border border-white/70 bg-[#fffaf9] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#f3dfda] bg-white/90 px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#b16a5b]">
                  Delete confirmation
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Delete Branch
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f4e5df] bg-white text-[#6B7280] transition hover:text-[#141810]"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6 sm:p-8">
              <div className="rounded-[24px] border border-[#f6ddd7] bg-[#fff3f0] px-5 py-4">
                <p className="text-sm font-semibold text-[#7a2f24]">
                  This will permanently delete:
                </p>
                <p className="mt-2 text-base font-black text-[#141810]">
                  {branch.branch_name}
                </p>
                <p className="mt-2 text-sm text-[#7b6f6b]">
                  {branch.branch_address}
                </p>
                <p className="mt-2 text-xs text-[#7b6f6b]">{branch.phone}</p>
              </div>

              {deleteError && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {deleteError}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={deleting}
                  className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={deleting}
                  className="h-12 rounded-full bg-[#ef4444] px-6 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
