"use client";

import { useEffect, useRef, useState } from "react";
import { useSchemesStore } from "@/store/admin/schemes/schemes.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function EditSchemeModal({ isOpen, onClose, scheme }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [imageFile, setImageFile] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const {
    search,
    updating,
    updateError,
    updateSuccess,
    updateScheme,
    fetchSchemes,
    resetUpdateSchemeState,
  } = useSchemesStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!isOpen || !scheme) {
      return;
    }

    setTitle(scheme.title || "");
    setDescription(scheme.description || "");
    setStatus(String(scheme.status || "ACTIVE").toUpperCase());
    setImageFile(null);
    setLocalError("");
    resetUpdateSchemeState();
  }, [isOpen, scheme, resetUpdateSchemeState]);

  useEffect(() => {
    if (!updateSuccess) {
      return;
    }

    showToast({ type: "success", message: updateSuccess });
    resetUpdateSchemeState();
  }, [resetUpdateSchemeState, showToast, updateSuccess]);

  useEffect(() => {
    if (!updateError) {
      return;
    }

    showToast({ type: "error", message: updateError });
  }, [showToast, updateError]);

  if (!isOpen || !scheme) {
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

    const originalTitle = String(scheme.title || "").trim();
    const originalDescription = String(scheme.description || "").trim();
    const originalStatus = String(scheme.status || "ACTIVE").trim().toUpperCase();
    const normalizedTitle = title.trim();
    const normalizedDescription = description.trim();
    const normalizedStatus = status.trim().toUpperCase();

    const payload = new FormData();
    let hasChanges = false;

    if (normalizedTitle !== originalTitle) {
      if (!normalizedTitle) {
        setLocalError("Scheme title is required.");
        return;
      }

      payload.append("title", normalizedTitle);
      hasChanges = true;
    }

    if (normalizedDescription !== originalDescription) {
      if (!normalizedDescription) {
        setLocalError("Scheme description is required.");
        return;
      }

      payload.append("description", normalizedDescription);
      hasChanges = true;
    }

    if (normalizedStatus !== originalStatus) {
      payload.append("status", normalizedStatus);
      hasChanges = true;
    }

    if (imageFile !== null) {
      payload.append("scheme_image", imageFile);
      hasChanges = true;
    }

    if (!hasChanges) {
      setLocalError("No changes to update.");
      return;
    }

    try {
      await updateScheme(scheme.id, payload);
      await fetchSchemes(search);
      handleClose();
    } catch (error) {
      console.error("Update scheme failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/45 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
          <div className="mb-5 sm:mb-6 flex items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black flex items-center gap-2">
              <span className="material-symbols-outlined text-[#A6F20D] text-xl sm:text-2xl">
                edit
              </span>
              Edit Scheme
            </h2>

            <button
              type="button"
              onClick={handleClose}
              disabled={updating}
              className="size-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Close edit scheme popup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="bg-[#F3F4F6] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1 space-y-4 sm:space-y-6">
              <label className="flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-bold text-charcoal ml-1">
                  Scheme Title
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-none rounded-full shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-[#A6F20D] text-charcoal placeholder:text-gray-400"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-bold text-charcoal ml-1">
                  Scheme Description
                </span>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-none rounded-2xl sm:rounded-3xl shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-[#A6F20D] text-charcoal resize-none"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-bold text-charcoal ml-1">
                  Status
                </span>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-none rounded-full shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-[#A6F20D] text-charcoal"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </label>
            </div>

            <div className="w-full lg:w-[320px] flex flex-col gap-4 sm:gap-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={(event) => setImageFile(event.target.files?.[0] || null)}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[180px] sm:min-h-[220px] border-2 border-dashed border-gray-300 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-6 sm:p-8 bg-white/50 hover:bg-white transition-colors cursor-pointer group"
              >
                <div className="size-14 sm:size-16 bg-[#E9F7D5] rounded-full flex items-center justify-center text-[#A6F20D] mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl">
                    cloud_upload
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-charcoal text-center">
                  Replace Scheme Image (Optional)
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                  PNG, JPG up to 10MB
                </p>
                {imageFile && (
                  <p className="text-[11px] sm:text-xs text-[#4A7A06] mt-2 text-center break-all">
                    {imageFile.name}
                  </p>
                )}
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

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={updating}
                  className="w-full lg:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-charcoal border border-gray-200 font-bold text-sm sm:text-base rounded-full hover:bg-gray-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full lg:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#A6F20D] text-charcoal font-black text-sm sm:text-base rounded-full shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {updating ? "Saving..." : "Save Scheme"}
                  <span className="material-symbols-outlined text-lg sm:text-xl">
                    save
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
