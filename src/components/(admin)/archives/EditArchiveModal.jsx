"use client";

import { useEffect, useState } from "react";
import { useArchivesStore } from "@/store/admin/archives/archives.store";
import { useToastStore } from "@/store/ui/toast.store";

const ARCHIVE_ACCEPT = "application/pdf,.pdf";

export default function EditArchiveModal({
  isOpen = false,
  onClose = () => {},
  archive = null,
}) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [fileName, setFileName] = useState("");
  const [archiveFile, setArchiveFile] = useState(null);
  const [localError, setLocalError] = useState("");

  const {
    updating,
    updateError,
    updateSuccess,
    updateArchiveById,
    resetUpdateArchiveState,
  } = useArchivesStore();
  const showToast = useToastStore((state) => state.showToast);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 8 }, (_, index) =>
    String(currentYear - index)
  );

  useEffect(() => {
    if (!isOpen || !archive) {
      return;
    }

    setTitle(archive.title || "");
    setYear(archive.year || String(currentYear));
    setFileName("");
    setArchiveFile(null);
    setLocalError("");
    resetUpdateArchiveState();
  }, [archive, currentYear, isOpen, resetUpdateArchiveState]);

  useEffect(() => {
    if (!isOpen || !updateSuccess) {
      return;
    }

    showToast({ type: "success", message: updateSuccess });
    onClose();
  }, [isOpen, onClose, showToast, updateSuccess]);

  useEffect(() => {
    if (!localError) {
      return;
    }

    showToast({ type: "error", message: localError });
  }, [localError, showToast]);

  useEffect(() => {
    if (!updateError) {
      return;
    }

    showToast({ type: "error", message: updateError });
  }, [showToast, updateError]);

  if (!isOpen || !archive) {
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
    const normalizedYear = String(year || "").trim();
    const originalTitle = String(archive.title || "").trim();
    const originalYear = String(archive.year || "").trim();
    const payload = new FormData();
    let hasChanges = false;

    if (!normalizedTitle) {
      setLocalError("Archive title is required.");
      return;
    }

    if (!normalizedYear) {
      setLocalError("Archive year is required.");
      return;
    }

    if (normalizedTitle !== originalTitle) {
      payload.append("title", normalizedTitle);
      hasChanges = true;
    }

    if (normalizedYear !== originalYear) {
      payload.append("year", normalizedYear);
      hasChanges = true;
    }

    if (archiveFile) {
      payload.append("archive_file", archiveFile);
      hasChanges = true;
    }

    if (!hasChanges) {
      setLocalError("No changes to update.");
      return;
    }

    try {
      await updateArchiveById(archive.id, payload);
    } catch (error) {
      console.error("Update archive failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/45 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[#F3F4F6] px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                Digital archive
              </p>
              <h2 className="mt-1 flex items-center gap-2 text-xl font-black text-black sm:text-2xl">
                <span className="material-symbols-outlined text-[#A6F20D]">
                  edit
                </span>
                Edit Archive
              </h2>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={updating}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#edf1e8] bg-white text-[#6B7280] transition hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Close edit archive popup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-5">
              <div>
                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
                  Archive Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Annual Report 2025"
                  className="h-12 w-full rounded-full border border-gray-200 bg-white px-5 text-black shadow-sm outline-none focus:border-[#A6F20D] focus:ring-2 focus:ring-[#A6F20D]/30 sm:h-14 sm:px-6"
                />
              </div>

              <div className="relative">
                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
                  Archive Year
                </label>
                <select
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  className="h-12 w-full appearance-none rounded-full border border-gray-200 bg-white px-5 text-black shadow-sm outline-none focus:border-[#A6F20D] focus:ring-2 focus:ring-[#A6F20D]/30 sm:h-14 sm:px-6"
                >
                  {yearOptions.map((itemYear) => (
                    <option key={itemYear} value={itemYear}>
                      {itemYear}
                    </option>
                  ))}
                </select>

                <span className="material-symbols-outlined pointer-events-none absolute right-4 top-[3.05rem] text-gray-400 sm:right-5 sm:top-[3.2rem]">
                  expand_more
                </span>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
                  Current Archive
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#A6F20D]">
                    {archive.icon || "description"}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-charcoal">
                      {archive.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {archive.fileType || "FILE"} {archive.date ? `• ${archive.date}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col">
              <label className="group flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white p-6 transition-colors hover:border-[#A6F20D] sm:min-h-[260px] sm:p-8">
                <input
                  type="file"
                  accept={ARCHIVE_ACCEPT}
                  onChange={(event) => {
                    const nextFile = event.target.files?.[0] || null;

                    if (
                      nextFile &&
                      !String(nextFile.name || "").toLowerCase().endsWith(".pdf")
                    ) {
                      setArchiveFile(null);
                      setFileName("");
                      setLocalError("Only PDF files are allowed for archives.");
                      return;
                    }

                    setArchiveFile(nextFile);
                    setFileName(nextFile?.name || "");
                    setLocalError("");
                  }}
                  className="hidden"
                />

                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-[#e7fbc3] sm:size-12">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-[#A6F20D]">
                    upload_file
                  </span>
                </div>

                <p className="text-center text-sm font-bold text-black sm:text-base">
                  Replace archive file
                </p>

                <p className="mt-1 text-center text-xs text-gray-500 sm:text-sm">
                  Leave this empty if you only want to update title or year
                </p>

                <p className="mt-2 text-center text-[11px] font-medium text-[#B45309] sm:text-xs">
                  Only PDF files can be replaced here. Unsupported files cannot be updated.
                </p>

                {fileName && (
                  <p className="mt-2 break-all text-center text-xs font-semibold text-[#4A7A06] sm:text-sm">
                    {fileName}
                  </p>
                )}

                <span className="mt-4 rounded-full bg-gray-100 px-6 py-2 text-sm font-bold text-black transition-colors hover:bg-gray-200">
                  Choose New File
                </span>
              </label>
            </div>
          </div>

          {(localError || updateError || updateSuccess) && (
            <div
              className={`mt-6 rounded-2xl px-4 py-3 text-sm font-medium ${
                localError || updateError
                  ? "border border-red-100 bg-red-50 text-red-600"
                  : "border border-[#daf2b4] bg-[#f7fde9] text-[#496619]"
              }`}
            >
              {localError || updateError || updateSuccess}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={updating}
              className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#A6F20D] px-8 text-sm font-black text-charcoal shadow-lg shadow-[#A6F20D]/20 transition-all hover:bg-[#96e20c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "Updating..." : "Update Archive"}
              <span className="material-symbols-outlined">save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
