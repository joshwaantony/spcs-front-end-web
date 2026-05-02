"use client";

import { useEffect } from "react";
import { useAwardsStore } from "@/store/admin/awards/awards.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function DeleteAwardModal({ isOpen, onClose, award }) {
  const {
    deleting,
    deleteError,
    deleteSuccess,
    deleteAward,
    resetDeleteAwardState,
    fetchAwards,
    page,
    limit,
  } = useAwardsStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    resetDeleteAwardState();
  }, [isOpen, resetDeleteAwardState]);

  useEffect(() => {
    if (!deleteSuccess) {
      return;
    }

    showToast({ type: "success", message: deleteSuccess });
    resetDeleteAwardState();
  }, [deleteSuccess, resetDeleteAwardState, showToast]);

  useEffect(() => {
    if (!deleteError) {
      return;
    }

    showToast({ type: "error", message: deleteError });
  }, [deleteError, showToast]);

  if (!isOpen || !award) {
    return null;
  }

  const handleClose = () => {
    if (deleting) {
      return;
    }

    onClose();
  };

  const handleDelete = async () => {
    try {
      await deleteAward(award.id);
      await fetchAwards(page, limit);
      handleClose();
    } catch (error) {
      console.error("Delete award failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white p-5 sm:p-7 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="size-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <span className="material-symbols-outlined">delete</span>
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-charcoal">
                Delete Award
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={deleting}
            className="size-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Close delete award popup"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-gray-700">
          Are you sure you want to delete{" "}
          <span className="font-bold text-charcoal">"{award.title}"</span>?
        </div>

        {(deleteError || deleteSuccess) && (
          <div className="mt-4 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
            {deleteError && <p className="text-red-600">{deleteError}</p>}
            {!deleteError && deleteSuccess && (
              <p className="text-green-700">{deleteSuccess}</p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={deleting}
            className="w-full sm:w-auto px-7 py-3 rounded-full border border-gray-200 bg-white font-bold text-charcoal hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-red-600 text-white font-black hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {deleting ? "Deleting..." : "Delete Award"}
          </button>
        </div>
      </div>
    </div>
  );
}
