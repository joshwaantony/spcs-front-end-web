



"use client";

import { useEffect, useRef, useState } from "react";
import { useDownloadsStore } from "@/store/admin/downloads/downloads.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function UploadSection({
  isOpen = false,
  onClose = () => {},
}) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const {
    search,
    creating,
    createError,
    createSuccess,
    createDownload,
    fetchDownloads,
    resetCreateDownloadState,
  } = useDownloadsStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setTitle("");
    setFile(null);
    setLocalError("");
    resetCreateDownloadState();
  }, [isOpen, resetCreateDownloadState]);

  useEffect(() => {
    if (!createSuccess) {
      return;
    }

    showToast({ type: "success", message: createSuccess });
    resetCreateDownloadState();
  }, [createSuccess, resetCreateDownloadState, showToast]);

  useEffect(() => {
    if (!createError) {
      return;
    }

    showToast({ type: "error", message: createError });
  }, [createError, showToast]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (creating) {
      return;
    }

    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setLocalError("File title is required.");
      return;
    }

    if (!file) {
      setLocalError("Please choose a file to upload.");
      return;
    }

    const payload = new FormData();
    payload.append("title", normalizedTitle);
    payload.append("file", file);

    try {
      await createDownload(payload);
      await fetchDownloads(search);
      handleClose();
    } catch (error) {
      console.error("Create download failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-4xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-charcoal">
              Create Download
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Upload a new public file, tender notice, or form.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              size-10
              bg-gray-100
              rounded-full
              text-gray-600
              hover:bg-gray-200
              transition-colors
            "
            aria-label="Close create download popup"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-[#F9FAFB] rounded-2xl"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
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
                  placeholder="Enter file title (e.g., Annual Report 2023)..."
                />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
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
                  gap-4
                  rounded-2xl
                  border-2
                  border-dashed
                  border-[#D1D5DB]
                  bg-white
                  px-4 sm:px-6
                  py-8 sm:py-12
                  cursor-pointer
                  transition-colors
                  hover:border-[#A6F20D]
                  hover:bg-[#A6F20D]/5
                "
              >
                <div className="size-14 sm:size-16 rounded-full bg-[#A6F20D]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#A6F20D] text-2xl sm:text-3xl">
                    description
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-sm sm:text-lg font-bold text-[#161811]">
                    Drag PDF/Doc files here or{" "}
                    <span className="text-[#A6F20D] underline">Browse</span>
                  </p>

                  <p className="text-xs sm:text-sm text-gray-500">
                    Maximum file size: 25MB (PDF, DOCX, XLS)
                  </p>

                  {file && (
                    <p className="text-[11px] sm:text-xs text-[#4A7A06] mt-2 break-all">
                      {file.name}
                    </p>
                  )}
                </div>
              </button>
            </div>

            {(localError || createError || createSuccess) && (
              <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
                {localError && <p className="text-red-600">{localError}</p>}
                {!localError && createError && (
                  <p className="text-red-600">{createError}</p>
                )}
                {!localError && !createError && createSuccess && (
                  <p className="text-green-700">{createSuccess}</p>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={creating}
                className="
                  w-full md:w-auto
                  bg-[#A6F20D]
                  h-12 sm:h-14
                  px-8 sm:px-10
                  rounded-full
                  font-bold
                  text-sm sm:text-base
                  flex
                  items-center
                  justify-center
                  gap-2
                  whitespace-nowrap
                  shadow-md
                  hover:brightness-105
                  transition-all
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                <span className="material-symbols-outlined text-base sm:text-lg">
                  upload
                </span>
                {creating ? "Uploading..." : "Upload Resource"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
