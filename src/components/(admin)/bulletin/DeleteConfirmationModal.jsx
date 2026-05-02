"use client";

import { useBulletinsStore } from "@/store/admin/bulletins/bulletins.store";
import { useToastStore } from "@/store/ui/toast.store";
import { useEffect } from "react";

export default function DeleteConfirmationModal({
  isOpen,
  bulletin,
  onClose = () => {},
  onDeleted = () => {},
}) {
  const {
    deleting,
    deleteError,
    deleteSuccess,
    deleteBulletin,
    resetDeleteBulletinState,
  } =
    useBulletinsStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!deleteSuccess) {
      return;
    }

    showToast({ type: "success", message: deleteSuccess });
  }, [deleteSuccess, showToast]);

  useEffect(() => {
    if (!deleteError) {
      return;
    }

    showToast({ type: "error", message: deleteError });
  }, [deleteError, showToast]);

  if (!isOpen || !bulletin) {
    return null;
  }

  const handleClose = () => {
    if (deleting) return;
    resetDeleteBulletinState();
    onClose();
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBulletin(bulletin.id);
      onDeleted(bulletin.id);
      handleClose();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-[90] overflow-y-auto p-4 sm:p-6">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-sm rounded-[24px] border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-[0_30px_100px_-40px_rgba(20,24,16,0.4)]">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <span className="material-symbols-outlined text-2xl text-red-600">
                  warning
                </span>
              </div>
              <h3 className="text-xl font-black text-[#141810]">
                Delete Bulletin?
              </h3>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="font-bold text-[#141810]">{bulletin.title}</span>
                ? This action cannot be undone.
              </p>

              {deleteError && (
                <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-xs sm:text-sm text-red-600 font-medium">
                    {deleteError}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={deleting}
                className="flex-1 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 font-bold text-sm text-[#6B7280] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 rounded-full bg-red-600 px-4 py-2.5 font-bold text-sm text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting && (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {deleting ? "Deleting..." : "Delete Bulletin"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
