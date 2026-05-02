"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAdsStore } from "@/store/admin/ads/ads.store";
import { useToastStore } from "@/store/ui/toast.store";

const placements = [
  { label: "Sidebar Square", value: "sidebar_square" },
  { label: "Top Banner", value: "top_banner" },
];

const getUiPlacementValue = (value) =>
  ["square", "sidebar_square"].includes(String(value || "").toLowerCase())
    ? "sidebar_square"
    : "top_banner";

export default function EditAdModal({
  isOpen = false,
  onClose = () => {},
  ad = null,
}) {
  const [placement, setPlacement] = useState("top_banner");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const {
    updating,
    updateError,
    updateSuccess,
    updateAd,
    resetUpdateAdState,
  } = useAdsStore();
  const showToast = useToastStore((state) => state.showToast);

  const API_ORIGIN =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const currentImageUrl = useMemo(() => {
    const imagePath = ad?.image_url || ad?.ad_image_url;

    if (!imagePath) {
      return "";
    }

    return imagePath.startsWith("http")
      ? imagePath
      : `${API_ORIGIN}${imagePath}`;
  }, [API_ORIGIN, ad?.ad_image_url, ad?.image_url]);

  const previewImageUrl = useMemo(() => {
    if (!imageFile) {
      return currentImageUrl;
    }

    return URL.createObjectURL(imageFile);
  }, [currentImageUrl, imageFile]);

  useEffect(() => {
    return () => {
      if (previewImageUrl && previewImageUrl !== currentImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [currentImageUrl, previewImageUrl]);

  useEffect(() => {
    if (!isOpen || !ad) {
      return;
    }

    setPlacement(getUiPlacementValue(ad?.type || ad?.placement));
    setLink(ad.link || "");
    setImageFile(null);
    setLocalError("");
    resetUpdateAdState();
  }, [ad, isOpen, resetUpdateAdState]);

  useEffect(() => {
    if (!updateSuccess) {
      return;
    }

    showToast({ type: "success", message: updateSuccess });
    resetUpdateAdState();
  }, [resetUpdateAdState, showToast, updateSuccess]);

  useEffect(() => {
    if (!updateError) {
      return;
    }

    showToast({ type: "error", message: updateError });
  }, [showToast, updateError]);

  if (!isOpen || !ad) {
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

    const normalizedLink = link.trim();
    const originalLink = String(ad.link || "").trim();
    const payload = new FormData();
    let hasChanges = false;

    if (!normalizedLink) {
      setLocalError("Target URL is required.");
      return;
    }

    if (placement !== getUiPlacementValue(ad?.type || ad?.placement)) {
      payload.append("type", placement);
      hasChanges = true;
    }

    if (normalizedLink !== originalLink) {
      payload.append("link", normalizedLink);
      hasChanges = true;
    }

    if (imageFile) {
      payload.append("image", imageFile);
      hasChanges = true;
    }

    if (!hasChanges) {
      setLocalError("No changes to update.");
      return;
    }

    try {
      await updateAd(ad.id, payload);
      handleClose();
    } catch (error) {
      console.error("Update ad failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[95] flex items-start justify-center overflow-y-auto bg-black/45 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#E5E7EB] p-5 sm:p-6">
          <div>
            <h3 className="text-lg font-black text-zinc-900 sm:text-xl">
              Edit Ad
            </h3>
            <p className="mt-0.5 text-sm text-zinc-500">
              Placement, target URL, creative image ellam ivide ninn update
              cheyyam.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={updating}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Close edit ad popup"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="flex flex-col gap-3">
                <label className="ml-1 text-sm font-bold text-[#3F3F46]">
                  Placement Selector
                </label>

                <div className="flex w-fit flex-wrap rounded-full bg-zinc-100 p-1.5">
                  {placements.map((item) => (
                    <label
                      key={item.value}
                      className={`flex cursor-pointer items-center rounded-full px-4 py-2 transition-all sm:px-6 ${
                        placement === item.value ? "bg-white shadow-sm" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="edit-placement"
                        value={item.value}
                        checked={placement === item.value}
                        onChange={() => setPlacement(item.value)}
                        className="hidden"
                      />
                      <span
                        className={`text-xs font-semibold sm:text-sm ${
                          placement === item.value
                            ? "text-zinc-900"
                            : "text-zinc-500"
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="ml-1 text-sm font-bold text-[#3F3F46]">
                  Target URL
                </label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                    link
                  </span>
                  <input
                    type="url"
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                    placeholder="https://spcsindia.com/promotions/summer-sale"
                    className="w-full rounded-full border border-[#E4E4E7] bg-zinc-50 py-3 pl-11 pr-5 text-sm focus:border-primary focus:ring-primary sm:py-4 sm:pl-12 sm:pr-6"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Current Creative
                </p>
                <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                  <div
                    className={`bg-cover bg-center ${
                      placement === "top_banner"
                        ? "aspect-[16/9] md:aspect-[3/1]"
                        : "aspect-square"
                    }`}
                    style={{ backgroundImage: `url('${previewImageUrl}')` }}
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={updating}
                  className="w-full rounded-full border border-zinc-200 bg-white px-7 py-3 font-bold text-zinc-900 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full rounded-full bg-[#A6F20D] px-7 py-3 font-black text-zinc-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="ml-1 text-sm font-bold text-[#3F3F46]">
                Replace Creative
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={(event) => {
                  setImageFile(event.target.files?.[0] || null);
                }}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-4/3 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 px-4 transition-colors hover:bg-zinc-100 sm:aspect-video lg:aspect-square"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110 sm:size-14">
                  <span className="material-symbols-outlined text-zinc-400">
                    upload_file
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-sm font-bold text-black sm:text-base">
                    Upload new creative if needed
                  </p>
                  <p className="text-xs text-zinc-500 sm:text-sm">
                    PNG, JPG or WEBP (max 5MB)
                  </p>
                </div>

                {imageFile && (
                  <p className="mt-1 break-all text-[11px] text-[#4A7A06] sm:text-xs">
                    {imageFile.name}
                  </p>
                )}
              </button>

              {(localError || updateError || updateSuccess) && (
                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
                  {localError && <p className="text-red-600">{localError}</p>}
                  {!localError && updateError && (
                    <p className="text-red-600">{updateError}</p>
                  )}
                  {!localError && !updateError && updateSuccess && (
                    <p className="text-green-700">{updateSuccess}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
