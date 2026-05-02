"use client";

import { useEffect, useRef, useState } from "react";
import { useOffersStore } from "@/store/admin/offers/offers.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function EditOfferModal({ isOpen, onClose, offer }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const {
    updating,
    updateError,
    updateSuccess,
    updateOffer,
    resetUpdateOfferState,
    fetchOffers,
    page,
    limit,
  } = useOffersStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!isOpen || !offer) {
      return;
    }

    setTitle(offer.title || "");
    setLink(offer.link || "");
    setImageFile(null);
    setLocalError("");
    resetUpdateOfferState();
  }, [isOpen, offer, resetUpdateOfferState]);

  useEffect(() => {
    if (!updateSuccess) {
      return;
    }

    showToast({ type: "success", message: updateSuccess });
    resetUpdateOfferState();
  }, [resetUpdateOfferState, showToast, updateSuccess]);

  useEffect(() => {
    if (!updateError) {
      return;
    }

    showToast({ type: "error", message: updateError });
  }, [showToast, updateError]);

  if (!isOpen || !offer) {
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

    const originalTitle = String(offer.title || "").trim();
    const originalLink = String(offer.link || "").trim();
    const normalizedTitle = title.trim();
    const normalizedLink = link.trim();

    const payload = new FormData();
    let hasChanges = false;

    if (normalizedTitle !== originalTitle) {
      if (!normalizedTitle) {
        setLocalError("Campaign name is required.");
        return;
      }

      payload.append("title", normalizedTitle);
      hasChanges = true;
    }

    if (normalizedLink !== originalLink) {
      if (!normalizedLink) {
        setLocalError("Target link is required.");
        return;
      }

      payload.append("link", normalizedLink);
      hasChanges = true;
    }

    if (imageFile !== null) {
      payload.append("image", imageFile);
      hasChanges = true;
    }

    if (!hasChanges) {
      setLocalError("No changes to update.");
      return;
    }

    try {
      await updateOffer(offer.id, payload);
      await fetchOffers(page, limit);
      handleClose();
    } catch (error) {
      console.error("Update offer failed:", error);
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
        <form
          onSubmit={handleSubmit}
          className="px-4 sm:px-6 md:px-10 lg:px-12 py-8 md:py-12 bg-gray-50/50"
        >
          <div className="flex items-center justify-between gap-3 mb-6">
            <h2 className="text-[#1D2210] text-lg sm:text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#A6F20D] text-xl">
                edit
              </span>
              Edit Offer
            </h2>

            <button
              type="button"
              onClick={handleClose}
              disabled={updating}
              className="size-10 rounded-full bg-white text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Close edit offer popup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div className="flex flex-col gap-4">
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
                className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-white px-4 sm:px-6 py-10 sm:py-12 text-center transition-all hover:border-[#A6F20D]"
              >
                <div className="size-14 sm:size-16 rounded-full bg-[#F7FDEC] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#A6F20D] text-2xl sm:text-3xl">
                    cloud_upload
                  </span>
                </div>

                <div>
                  <p className="text-[#1D2210] text-base sm:text-lg font-bold leading-snug">
                    Replace Banner (Optional)
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Recommended size: 1920x600px (JPG, PNG)
                  </p>
                </div>

                <span className="mt-2 w-full sm:w-auto px-6 sm:px-8 py-2.5 bg-[#F3F4F6] text-[#1D2210] text-sm font-bold rounded-full group-hover:bg-[#A6F20D] transition-colors">
                  Browse Files
                </span>

                {imageFile && (
                  <p className="text-[11px] sm:text-xs text-[#4A7A06] mt-1 break-all">
                    {imageFile.name}
                  </p>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] sm:text-sm font-bold text-[#6B7280] uppercase tracking-wider ml-1">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="w-full h-12 sm:h-14 rounded-full border border-gray-200 bg-white px-5 sm:px-6 text-sm sm:text-base placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6F20D]/40"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] sm:text-sm font-bold text-[#6B7280] uppercase tracking-wider ml-1">
                    Target Link
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 text-base">
                      link
                    </span>
                    <input
                      type="url"
                      value={link}
                      onChange={(event) => setLink(event.target.value)}
                      className="w-full h-12 sm:h-14 rounded-full border border-gray-200 bg-white pl-11 sm:pl-14 pr-5 sm:pr-6 text-sm sm:text-base placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6F20D]/40"
                    />
                  </div>
                </div>
              </div>

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

              <button
                type="submit"
                disabled={updating}
                className="w-full h-12 sm:h-14 bg-[#A6F20D] text-[#1D2210] text-sm sm:text-base font-black rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">
                  save
                </span>
                {updating ? "SAVING..." : "SAVE OFFER"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
