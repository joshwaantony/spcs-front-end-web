"use client";

import { useEffect } from "react";
import { useFeedbackStore } from "@/store/admin/feedback/feedback.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function DeleteFeedbackModal({ feedback, open, onClose }) {
  const { deleteFeedback, deleting, deleteError, deleteSuccess, resetDeleteState } =
    useFeedbackStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!open) {
      resetDeleteState();
    }
  }, [open, resetDeleteState]);

  useEffect(() => {
    if (deleteSuccess && open) {
      onClose();
    }
  }, [deleteSuccess, open, onClose]);

  useEffect(() => {
    if (!deleteSuccess) {
      return;
    }

    showToast({ type: "success", message: deleteSuccess });
    resetDeleteState();
  }, [deleteSuccess, resetDeleteState, showToast]);

  useEffect(() => {
    if (!deleteError) {
      return;
    }

    showToast({ type: "error", message: deleteError });
  }, [deleteError, showToast]);

  if (!open || !feedback) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteFeedback(feedback.id);
    } catch {
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#161811]">Delete Feedback</h2>
            <p className="mt-1 text-sm text-[#4C5563]">
              This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-gray-50 p-4">
          <p className="text-sm font-semibold text-[#161811]">
            {feedback.subject || feedback.title || "Feedback"}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {feedback.name || feedback.user_name || "Anonymous"}
          </p>
          <p className="mt-2 line-clamp-3 text-sm text-gray-500">
            {feedback.message ||
              feedback.description ||
              feedback.content ||
              "No message preview available."}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold text-[#161811] transition hover:bg-gray-200 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
