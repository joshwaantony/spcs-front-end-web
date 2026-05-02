"use client";

import { useEffect } from "react";
import { useArchivesStore } from "@/store/admin/archives/archives.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function DeleteArchiveModal({
  isOpen = false,
  onClose = () => {},
  archive = null,
}) {
  const {
    search,
    deletingId,
    deleteError,
    deleteSuccess,
    deleteArchiveById,
    fetchArchives,
    resetDeleteArchiveState,
  } = useArchivesStore();
  const showToast = useToastStore((state) => state.showToast);

  const deleting = deletingId === archive?.id;

  useEffect(() => {
    if (!isOpen || !archive) {
      return;
    }

    resetDeleteArchiveState();
  }, [archive, isOpen, resetDeleteArchiveState]);

  useEffect(() => {
    if (!deleteSuccess) {
      return;
    }

    showToast({ type: "success", message: deleteSuccess });
    resetDeleteArchiveState();
  }, [deleteSuccess, resetDeleteArchiveState, showToast]);

  useEffect(() => {
    if (!deleteError) {
      return;
    }

    showToast({ type: "error", message: deleteError });
  }, [deleteError, showToast]);

  if (!isOpen || !archive) {
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
      await deleteArchiveById(archive.id);
      await fetchArchives({ search });
      handleClose();
    } catch (error) {
      console.error("Delete archive failed:", error);
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
            <div className="mb-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <span className="material-symbols-outlined text-2xl text-red-600">
                  warning
                </span>
              </div>
              <h3 className="text-xl font-black text-[#141810]">
                Delete Archive?
              </h3>
            </div>

            <div className="mb-6">
              <p className="text-sm leading-relaxed text-[#6B7280]">
                Are you sure you want to delete{" "}
                <span className="font-bold text-[#141810]">{archive.title}</span>
                ? This action cannot be undone.
              </p>

              {deleteError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-xs font-medium text-red-600 sm:text-sm">
                    {deleteError}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={deleting}
                className="flex-1 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-bold text-[#6B7280] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting && (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {deleting ? "Deleting..." : "Delete Archive"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
