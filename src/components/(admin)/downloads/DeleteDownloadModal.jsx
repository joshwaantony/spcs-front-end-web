"use client";

import { useEffect } from "react";
import { useDownloadsStore } from "@/store/admin/downloads/downloads.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function DeleteDownloadModal({
  isOpen = false,
  onClose = () => {},
  download = null,
}) {
  const {
    search,
    deleting,
    deleteError,
    deleteSuccess,
    deleteDownload,
    fetchDownloads,
    resetDeleteDownloadState,
  } = useDownloadsStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!isOpen || !download) {
      return;
    }

    resetDeleteDownloadState();
  }, [isOpen, download, resetDeleteDownloadState]);

  useEffect(() => {
    if (!deleteSuccess) {
      return;
    }

    showToast({ type: "success", message: deleteSuccess });
    resetDeleteDownloadState();
  }, [deleteSuccess, resetDeleteDownloadState, showToast]);

  useEffect(() => {
    if (!deleteError) {
      return;
    }

    showToast({ type: "error", message: deleteError });
  }, [deleteError, showToast]);

  if (!isOpen || !download) {
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
      await deleteDownload(download.id);
      await fetchDownloads(search);
      handleClose();
    } catch (error) {
      console.error("Delete download failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[96] flex items-center justify-center bg-black/45 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <span className="material-symbols-outlined text-[30px]">delete</span>
        </div>

        <div className="mt-5 text-center">
          <h3 className="text-xl font-black text-charcoal">
            Delete Download?
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            This will permanently remove{" "}
            <span className="font-semibold text-charcoal">{download.title}</span>.
          </p>
        </div>

        {(deleteError || deleteSuccess) && (
          <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
            {deleteError && <p className="text-red-600">{deleteError}</p>}
            {!deleteError && deleteSuccess && (
              <p className="text-green-700">{deleteSuccess}</p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleClose}
            disabled={deleting}
            className="h-12 rounded-full border border-gray-200 px-6 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="h-12 rounded-full bg-red-600 px-6 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete Download"}
          </button>
        </div>
      </div>
    </div>
  );
}
