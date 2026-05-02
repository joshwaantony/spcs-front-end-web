




"use client";

import { useEffect, useRef, useState } from "react";
import { useAdsStore } from "@/store/admin/ads/ads.store";
import { useToastStore } from "@/store/ui/toast.store";

const placements = [
  { label: "Sidebar Square", value: "sidebar_square" },
  { label: "Top Banner", value: "top_banner" },
];

export default function CreateAdSection({ onCreated = () => {} }) {
  const [placement, setPlacement] = useState("top_banner");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const { creating, createError, createSuccess, createAd, resetCreateAdState } =
    useAdsStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!createSuccess) {
      return;
    }

    showToast({ type: "success", message: createSuccess });
    resetCreateAdState();
  }, [createSuccess, resetCreateAdState, showToast]);

  useEffect(() => {
    if (!createError) {
      return;
    }

    showToast({ type: "error", message: createError });
  }, [createError, showToast]);

  const handleFileSelect = (event) => {
    setImageFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    const normalizedLink = link.trim();

    if (!normalizedLink) {
      setLocalError("Target URL is required.");
      return;
    }

    if (!imageFile) {
      setLocalError("Creative image is required.");
      return;
    }

    const payload = new FormData();
    payload.append("type", placement);
    payload.append("link", normalizedLink);
    payload.append("image", imageFile);

    try {
      await createAd(payload);
      setPlacement("top_banner");
      setLink("");
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onCreated();
    } catch (error) {
      console.error("Create ad failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <section className="w-full">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-[#A6F20D]">
            add_circle
          </span>
          <h2 className="text-black text-lg sm:text-xl font-bold">
            Create New Ad
          </h2>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Placement Selector */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-[#3F3F46] ml-1">
                Placement Selector
              </label>

              <div className="flex flex-wrap bg-zinc-100 p-1.5 rounded-full w-fit">
                {placements.map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center px-4 sm:px-6 py-2 rounded-full cursor-pointer transition-all group ${
                      placement === item.value ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="placement"
                      value={item.value}
                      checked={placement === item.value}
                      onChange={() => setPlacement(item.value)}
                      className="hidden"
                    />
                    <span
                      className={`text-xs sm:text-sm font-semibold ${
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

            {/* Target URL */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-[#3F3F46] ml-1">
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
                  className="w-full bg-zinc-50 border border-[#E4E4E7] rounded-full py-3 sm:py-4 pl-11 sm:pl-12 pr-5 sm:pr-6 text-sm focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Publish Button */}
            <button
              type="submit"
              disabled={creating}
              className="w-full sm:w-fit px-8 sm:px-12 py-3 sm:py-4 bg-[#A6F20D] text-zinc-900 rounded-full font-black tracking-wide shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">publish</span>
              {creating ? "CREATING..." : "PUBLISH AD"}
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-[#3F3F46] ml-1">
              Creative Upload
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-200 rounded-2xl aspect-4/3 sm:aspect-video lg:aspect-square flex flex-col items-center justify-center gap-4 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer group px-4"
            >
              <div className="bg-white size-12 sm:size-14 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-zinc-400 group-hover:text-[#A6F20D]">
                  upload_file
                </span>
              </div>

              <div className="text-center">
                <p className="text-black font-bold text-sm sm:text-base">
                  Drag & drop your creative
                </p>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  PNG, JPG or WEBP (max 5MB)
                </p>
              </div>

              {imageFile && (
                <p className="text-[11px] sm:text-xs text-[#4A7A06] mt-1 break-all">
                  {imageFile.name}
                </p>
              )}
            </button>
          </div>
        </div>

        {(localError || createError || createSuccess) && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
            {localError && <p className="text-red-600">{localError}</p>}
            {!localError && createError && <p className="text-red-600">{createError}</p>}
            {!localError && !createError && createSuccess && (
              <p className="text-green-700">{createSuccess}</p>
            )}
          </div>
        )}
      </section>
    </form>
  );
}
