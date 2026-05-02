"use client";

import { useEffect, useState } from "react";
import { useArchivesStore } from "@/store/admin/archives/archives.store";
import { useToastStore } from "@/store/ui/toast.store";

const ARCHIVE_ACCEPT = "application/pdf,.pdf";

export default function AddArchiveForm({ isOpen, onClose }) {
  const [localError, setLocalError] = useState("");
  const {
    form,
    creating,
    createError,
    createSuccess,
    setArchiveFormValue,
    createArchive,
    resetArchiveForm,
  } = useArchivesStore();
  const showToast = useToastStore((state) => state.showToast);
  const fileName = form.archiveFile?.name || "";
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 8 }, (_, index) =>
    String(currentYear - index)
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    resetArchiveForm();
    setLocalError("");
  }, [isOpen, resetArchiveForm]);

  useEffect(() => {
    if (!isOpen || !createSuccess) {
      return;
    }

    showToast({ type: "success", message: createSuccess });
    onClose?.();
  }, [createSuccess, isOpen, onClose, showToast]);

  useEffect(() => {
    if (!localError) {
      return;
    }

    showToast({ type: "error", message: localError });
  }, [localError, showToast]);

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

    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    if (
      form.archiveFile &&
      !String(form.archiveFile.name || "").toLowerCase().endsWith(".pdf")
    ) {
      setLocalError("Only PDF files are allowed for archives.");
      return;
    }

    try {
      await createArchive();
    } catch (error) {
      console.error("Create archive failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
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
                  add_circle
                </span>
                Add New Archive
              </h2>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={creating}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#edf1e8] bg-white text-[#6B7280] transition hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Close create archive popup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-5">
              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  setArchiveFormValue("title", event.target.value)
                }
                placeholder="e.g. Annual Book List 2024"
                className="form-input h-12 w-full rounded-full border border-gray-200 bg-white px-5 text-black shadow-sm focus:border-primary focus:ring-primary sm:h-14 sm:px-6"
              />

              <div className="relative">
                <select
                  value={form.year}
                  onChange={(event) =>
                    setArchiveFormValue("year", event.target.value)
                  }
                  className="form-input h-12 w-full appearance-none rounded-full border border-gray-200 bg-white px-5 text-black shadow-sm focus:border-primary focus:ring-primary sm:h-14 sm:px-6"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <span className="material-symbols-outlined pointer-events-none absolute right-4 top-3.5 text-gray-400 sm:right-5 sm:top-4">
                  expand_more
                </span>
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
                      setLocalError("Only PDF files are allowed for archives.");
                      setArchiveFormValue("archiveFile", null);
                      return;
                    }

                    setLocalError("");
                    setArchiveFormValue("archiveFile", nextFile);
                  }}
                  className="hidden"
                />

                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-[#e7fbc3] sm:size-12">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-[#A6F20D]">
                    history
                  </span>
                </div>

                <p className="text-center text-sm font-bold text-black sm:text-base">
                  Drag PDF files here
                </p>

                <p className="mt-1 text-center text-xs text-gray-500 sm:text-sm">
                  Upload historical documents and records in PDF format
                </p>

                <p className="mt-2 text-center text-[11px] font-medium text-[#B45309] sm:text-xs">
                  Only PDF files can be uploaded here. Unsupported files cannot be created.
                </p>

                {fileName && (
                  <p className="mt-2 break-all text-center text-xs font-semibold text-[#4A7A06] sm:text-sm">
                    {fileName}
                  </p>
                )}

                <span className="mt-4 rounded-full bg-gray-100 px-6 py-2 text-sm font-bold text-black transition-colors hover:bg-gray-200">
                  Browse Files
                </span>
              </label>
            </div>
          </div>

          {(localError || createError || createSuccess) && (
            <div
              className={`mt-6 rounded-2xl px-4 py-3 text-sm font-medium ${
                localError || createError
                  ? "border border-red-100 bg-red-50 text-red-600"
                  : "border border-[#daf2b4] bg-[#f7fde9] text-[#496619]"
              }`}
            >
              {localError || createError || createSuccess}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={creating}
              className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creating}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#A6F20D] px-8 text-sm font-black text-charcoal shadow-lg shadow-[#A6F20D]/20 transition-all hover:bg-[#96e20c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating ? "Archiving..." : "Archive Document"}
              <span className="material-symbols-outlined">
                cloud_upload
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
