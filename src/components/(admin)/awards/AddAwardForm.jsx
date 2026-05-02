"use client";

import { useEffect, useRef, useState } from "react";
import { useAwardsStore } from "@/store/admin/awards/awards.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function AddAwardForm({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("aksharapuraskaram");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const {
    creating,
    createError,
    createSuccess,
    createAward,
    resetCreateAwardState,
    fetchAwards,
    page,
    limit,
  } = useAwardsStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setTitle("");
    setType("aksharapuraskaram");
    setDescription("");
    setImageFile(null);
    setLocalError("");
    resetCreateAwardState();
  }, [isOpen, resetCreateAwardState]);

  useEffect(() => {
    if (!createSuccess) {
      return;
    }

    showToast({ type: "success", message: createSuccess });
    resetCreateAwardState();
  }, [createSuccess, resetCreateAwardState, showToast]);

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
    const normalizedType = type.trim();
    const normalizedDescription = description.trim();

    if (!normalizedTitle) {
      setLocalError("Award title is required.");
      return;
    }

    if (!normalizedType) {
      setLocalError("Award type is required.");
      return;
    }

    if (!imageFile) {
      setLocalError("Award image is required.");
      return;
    }

    const payload = new FormData();
    payload.append("title", normalizedTitle);
    payload.append("type", normalizedType);
    payload.append("image", imageFile);

    if (normalizedDescription) {
      payload.append("description", normalizedDescription);
    }

    try {
      await createAward(payload);
      await fetchAwards(page, limit);
      handleClose();
    } catch (error) {
      console.error("Create award failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
          <div className="mb-5 sm:mb-6 flex items-center justify-between gap-3">
            <h2
              className="
                text-lg
                sm:text-xl
                md:text-2xl
                font-bold
                text-black
                flex
                items-center
                gap-2
              "
            >
              <span className="material-symbols-outlined text-[#A6F20D] text-xl sm:text-2xl">
                add_circle
              </span>
              Create New Award
            </h2>

            <button
              type="button"
              onClick={handleClose}
              disabled={creating}
              className="size-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Close create award popup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div
            className="
              bg-[#F3F4F6]
              rounded-2xl
              sm:rounded-3xl
              p-4
              sm:p-6
              lg:p-8
              flex
              flex-col
              lg:flex-row
              gap-6
              lg:gap-8
            "
          >
            <div className="flex-1 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-xs sm:text-sm font-bold text-charcoal ml-1">
                    Award Title / Winner Name
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="e.g. Akshara Puraskaram 2024"
                    className="
                      w-full
                      px-4
                      sm:px-6
                      py-3
                      sm:py-4
                      bg-white
                      border-none
                      rounded-full
                      shadow-sm
                      text-sm
                      sm:text-base
                      focus:ring-2
                      focus:ring-[#A6F20D]
                      text-charcoal
                      placeholder:text-gray-400
                    "
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs sm:text-sm font-bold text-charcoal ml-1">
                    Award Type
                  </span>
                  <select
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    className="
                      w-full
                      px-4
                      sm:px-6
                      py-3
                      sm:py-4
                      bg-white
                      border-none
                      rounded-full
                      shadow-sm
                      text-sm
                      sm:text-base
                      focus:ring-2
                      focus:ring-[#A6F20D]
                      text-charcoal
                      appearance-none
                    "
                  >
                    <option value="aksharapuraskaram">Aksharapuraskaram</option>
                    <option value="awarded">Awarded</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-bold text-charcoal ml-1">
                  Citation Text
                </span>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Brief description of the award achievement..."
                  className="
                    w-full
                    px-4
                    sm:px-6
                    py-3
                    sm:py-4
                    bg-white
                    border-none
                    rounded-2xl
                    sm:rounded-3xl
                    shadow-sm
                    text-sm
                    sm:text-base
                    focus:ring-2
                    focus:ring-[#A6F20D]
                    text-charcoal
                    resize-none
                  "
                />
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
                className="
                  min-h-[180px]
                  sm:min-h-[220px]
                  border-2
                  border-dashed
                  border-gray-300
                  rounded-2xl
                  sm:rounded-3xl
                  flex
                  flex-col
                  items-center
                  justify-center
                  p-6
                  sm:p-8
                  bg-white/50
                  hover:bg-white
                  transition-colors
                  cursor-pointer
                  group
                "
              >
                <div
                  className="
                    size-14
                    sm:size-16
                    bg-[#E9F7D5]
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[#A6F20D]
                    mb-3
                    sm:mb-4
                    group-hover:scale-110
                    transition-transform
                  "
                >
                  <span className="material-symbols-outlined text-3xl sm:text-4xl">
                    cloud_upload
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-charcoal text-center">
                  Drag & Drop Certificate or Photo
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

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={creating}
                  className="
                    w-full
                    lg:w-auto
                    px-8
                    sm:px-10
                    py-3
                    sm:py-4
                    bg-white
                    text-charcoal
                    border border-gray-200
                    font-bold
                    text-sm
                    sm:text-base
                    rounded-full
                    hover:bg-gray-50
                    transition-all
                    disabled:opacity-60 disabled:cursor-not-allowed
                    flex
                    items-center
                    justify-center
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="
                    w-full
                    lg:w-auto
                    px-8
                    sm:px-10
                    py-3
                    sm:py-4
                    bg-[#A6F20D]
                    text-charcoal
                    font-black
                    text-sm
                    sm:text-base
                    rounded-full
                    shadow-lg
                    hover:-translate-y-0.5
                    transition-all
                    disabled:opacity-60 disabled:cursor-not-allowed
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  {creating ? "Publishing..." : "Publish Award"}
                  <span className="material-symbols-outlined text-lg sm:text-xl">
                    send
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
