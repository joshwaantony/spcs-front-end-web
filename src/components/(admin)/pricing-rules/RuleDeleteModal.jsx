"use client";

import { HiOutlineTrash, HiX } from "react-icons/hi";

export default function RuleDeleteModal({ isOpen, rule, kind = "rule", onClose, onDelete, deleting, deleteError }) {
  if (!isOpen || !rule) return null;

  const titleLabel = kind === "shipping" ? "Delete shipping rule" : kind === "discount" ? "Delete discount rule" : "Delete rule";
  const heading = kind === "shipping" ? "Remove This Shipping Rule?" : kind === "discount" ? "Remove This Discount Rule?" : "Remove This Rule?";

  const handleClose = () => {
    if (deleting) return;
    onClose && onClose();
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    await onDelete(rule.id);
  };

  return (
    <>
      <div className="fixed inset-0 z-60 bg-[#141810]/55 backdrop-blur-sm" onClick={handleClose} />

      <div className="fixed inset-0 z-70 overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-xl overflow-hidden rounded-4xl border border-white/70 bg-[#fff8f7] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#f2d8d3] bg-white/90 px-6 py-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d14f45]">
                  {titleLabel}
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#141810]">{heading}</h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f1d8d2] bg-white text-[#6B7280]"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="rounded-[28px] border border-[#f2d8d3] bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1ee] text-[#d14f45]">
                    <HiOutlineTrash size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#141810]">{rule.name}</h3>
                    <p className="mt-2 text-sm font-medium text-[#6B7280]">
                      This action removes the rule from the list. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                {deleteError ? (
                  <div className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 sm:mr-auto sm:max-w-sm">
                    {deleteError}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={deleting}
                  className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="h-12 rounded-full bg-[#d14f45] px-6 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
