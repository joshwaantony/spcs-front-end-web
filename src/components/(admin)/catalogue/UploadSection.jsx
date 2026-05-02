"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCataloguesStore } from "@/store/admin/catalogues/catalogues.store";
import { useToastStore } from "@/store/ui/toast.store";

const getInitialForm = () => ({
  title: "",
  year: String(new Date().getFullYear()),
  catalogPdf: null,
});

const getYearOptions = (count = 5) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, index) => String(currentYear - index));
};

export default function UploadSection({ isOpen, onClose }) {
  const [form, setForm] = useState(getInitialForm);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const {
    creating,
    createError,
    createSuccess,
    createCatalogue,
    fetchCatalogues,
    resetCreateCatalogueState,
  } = useCataloguesStore();
  const showToast = useToastStore((state) => state.showToast);

  const yearOptions = useMemo(() => getYearOptions(6), []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm(getInitialForm());
    setLocalError("");
    resetCreateCatalogueState();
  }, [isOpen, resetCreateCatalogueState]);

  useEffect(() => {
    if (!createSuccess) {
      return;
    }

    showToast({ type: "success", message: createSuccess });
    resetCreateCatalogueState();
  }, [createSuccess, resetCreateCatalogueState, showToast]);

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

    setForm(getInitialForm());
    setLocalError("");
    resetCreateCatalogueState();
    onClose();
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      title: value,
    }));
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      year: value,
    }));
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files?.[0] || null;

    setForm((current) => ({
      ...current,
      catalogPdf: selectedFile,
    }));

    setLocalError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    const normalizedTitle = form.title.trim();

    if (!normalizedTitle) {
      setLocalError("Catalogue title is required.");
      return;
    }

    if (!form.year) {
      setLocalError("Publication year is required.");
      return;
    }

    if (!form.catalogPdf) {
      setLocalError("Please upload a PDF file.");
      return;
    }

    const payload = new FormData();
    payload.append("title", normalizedTitle);
    payload.append("year", String(form.year));
    payload.append("catalog_pdf", form.catalogPdf);

    try {
      await createCatalogue(payload);
      await fetchCatalogues();
      handleClose();
    } catch (error) {
      console.error("Create catalogue failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 bg-gray-50/50">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#A6F20D]">
                add_circle
              </span>
              Upload New Catalog
            </h2>

            <button
              type="button"
              onClick={handleClose}
              disabled={creating}
              className="size-10 rounded-full bg-white text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Close upload popup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold px-2">
                  Catalog Title
                </span>
                <input
                  type="text"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Summer Collection 2026"
                  className="w-full h-12 sm:h-14 rounded-full bg-white border border-gray-200 px-5 sm:px-6
                         focus:ring-2 focus:ring-[#A6F20D] focus:border-transparent
                         text-charcoal placeholder:text-gray-400 text-sm sm:text-base"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold px-2">
                  Publication Year
                </span>

                <div className="relative">
                  <select
                    value={form.year}
                    onChange={handleYearChange}
                    className="w-full h-12 sm:h-14 rounded-full bg-white border border-gray-200 px-5 sm:px-6
                           appearance-none focus:ring-2 focus:ring-[#A6F20D]
                           focus:border-transparent text-charcoal text-sm sm:text-base"
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <span className="material-symbols-outlined absolute right-5 sm:right-6 top-1/2
                               -translate-y-1/2 text-soft-gray pointer-events-none">
                    expand_more
                  </span>
                </div>
              </label>
            </div>

            <div className="flex flex-col h-full">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex flex-col items-center justify-center gap-4
                       rounded-xl border-2 border-dashed border-gray-300
                       bg-white/50 px-5 sm:px-6 py-8 sm:py-10
                       cursor-pointer text-center
                       hover:border-[#A6F20D] hover:bg-[#F8FBF3]
                       transition-all group"
              >
                <div className="size-14 sm:size-16 rounded-full bg-gray-100
                            flex items-center justify-center
                            group-hover:bg-[#E8F9CE] transition-colors">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl text-soft-gray
                               group-hover:text-[#A6F20D]">
                    picture_as_pdf
                  </span>
                </div>

                <div>
                  <p className="text-base sm:text-lg font-bold text-charcoal">
                    Drag PDF Catalog here
                  </p>
                  <p className="text-xs sm:text-sm text-soft-gray mt-1">
                    Upload digital catalogs (Max 50MB)
                  </p>
                  {form.catalogPdf && (
                    <p className="text-xs sm:text-sm font-semibold text-[#4A7A06] mt-2 break-all">
                      {form.catalogPdf.name}
                    </p>
                  )}
                </div>

                <span
                  className="mt-2 rounded-full h-9 sm:h-10 px-6 inline-flex items-center
                         bg-[#1F2838] text-white text-xs sm:text-sm font-bold"
                >
                  Browse Files
                </span>
              </button>
            </div>
          </div>

          {(localError || createError || createSuccess) && (
            <div className="mt-5 px-2 text-sm">
              {localError && <p className="text-red-600">{localError}</p>}
              {!localError && createError && <p className="text-red-600">{createError}</p>}
              {!localError && !createError && createSuccess && (
                <p className="text-green-700">{createSuccess}</p>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-center sm:justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={creating}
              className="w-full sm:w-auto min-w-[150px] h-12 sm:h-14 px-8
                     rounded-full bg-white text-charcoal border border-gray-200
                     font-bold flex items-center justify-center gap-2
                     hover:bg-gray-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creating}
              className="w-full sm:w-auto min-w-[200px] h-12 sm:h-14 px-8
                     rounded-full bg-[#A6F20D] text-background-dark
                     font-black flex items-center justify-center gap-2
                     shadow-lg hover:brightness-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">publish</span>
              {creating ? "Publishing..." : "Publish Catalog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
