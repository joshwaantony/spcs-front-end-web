"use client";

import { useEffect, useRef, useState } from "react";
import { useDownloadsStore } from "@/store/admin/downloads/downloads.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function EditDownloadModal({
  isOpen = false,
  onClose = () => {},
  download = null,
}) {
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const {
    search,
    updating,
    updateError,
    updateSuccess,
    updateDownload,
    fetchDownloads,
    resetUpdateDownloadState,
  } = useDownloadsStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!isOpen || !download) {
      return;
    }

    setTitle(download.title || "");
    setFileName("");
    setFile(null);
    setLocalError("");
    resetUpdateDownloadState();
  }, [isOpen, download, resetUpdateDownloadState]);

  useEffect(() => {
    if (!updateSuccess) {
      return;
    }

    showToast({ type: "success", message: updateSuccess });
    resetUpdateDownloadState();
  }, [resetUpdateDownloadState, showToast, updateSuccess]);

  useEffect(() => {
    if (!updateError) {
      return;
    }

    showToast({ type: "error", message: updateError });
  }, [showToast, updateError]);

  if (!isOpen || !download) {
    return null;
  }

  const handleClose = () => {
    if (updating) {
      return;
    }

    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    const normalizedTitle = title.trim();
    const originalTitle = String(download.title || "").trim();
    const payload = new FormData();
    let hasChanges = false;

    if (!normalizedTitle) {
      setLocalError("File title is required.");
      return;
    }

    if (normalizedTitle !== originalTitle) {
      payload.append("title", normalizedTitle);
      hasChanges = true;
    }

    if (file) {
      payload.append("file", file);
      hasChanges = true;
    }

    if (!hasChanges) {
      setLocalError("No changes to update.");
      return;
    }

    try {
      await updateDownload(download.id, payload);
      await fetchDownloads(search);
      handleClose();
    } catch (error) {
      console.error("Update download failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/45 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-4xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-charcoal">
              Edit Download
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Update title or replace the uploaded file.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={updating}
            className="size-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Close edit download popup"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-[#F9FAFB] rounded-2xl"
        >
          <div className="flex flex-col gap-6">
            <div className="flex-1 w-full">
              <label className="ml-2 text-sm font-bold text-[#161811]">
                File Title
              </label>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="
                  w-full
                  h-12 sm:h-14
                  bg-white
                  border
                  border-[#E5E7EB]
                  rounded-full
                  px-5 sm:px-6
                  text-sm sm:text-base
                  outline-none
                  focus:ring-2
                  focus:ring-[#A6F20D]
                  focus:border-[#A6F20D]
                "
                placeholder="Enter file title..."
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
              <p className="text-xs sm:text-sm font-bold text-[#161811] mb-2">
                Current File
              </p>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#A6F20D]">
                  description
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-charcoal truncate">
                    {download.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {download.type} • {download.size}
                  </p>
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
              onChange={(event) => {
                const nextFile = event.target.files?.[0] || null;
                setFile(nextFile);
                setFileName(nextFile?.name || "");
              }}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-3
                rounded-2xl
                border-2
                border-dashed
                border-[#D1D5DB]
                bg-white
                px-4 sm:px-6
                py-8 sm:py-10
                cursor-pointer
                transition-colors
                hover:border-[#A6F20D]
                hover:bg-[#A6F20D]/5
              "
            >
              <div className="size-14 sm:size-16 rounded-full bg-[#A6F20D]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#A6F20D] text-2xl sm:text-3xl">
                  upload_file
                </span>
              </div>

              <div className="text-center">
                <p className="text-sm sm:text-lg font-bold text-[#161811]">
                  Replace file or keep existing one
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  PDF, DOCX, XLS up to 25MB
                </p>
                {fileName && (
                  <p className="text-[11px] sm:text-xs text-[#4A7A06] mt-3 break-all">
                    {fileName}
                  </p>
                )}
              </div>
            </button>

            {(localError || updateError || updateSuccess) && (
              <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
                {localError && <p className="text-red-600">{localError}</p>}
                {!localError && updateError && (
                  <p className="text-red-600">{updateError}</p>
                )}
                {!localError && !updateError && updateSuccess && (
                  <p className="text-green-700">{updateSuccess}</p>
                )}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={updating}
                className="w-full sm:w-auto px-7 py-3 rounded-full border border-gray-200 bg-white font-bold text-charcoal hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#A6F20D] text-black font-black hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
