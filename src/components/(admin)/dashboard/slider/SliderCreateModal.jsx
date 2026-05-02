"use client";

import { useRef } from "react";
import { HiX } from "react-icons/hi";

export default function SliderCreateModal({
  isOpen,
  form,
  creating,
  createError,
  successMessage,
  onClose,
  onChange,
  onImageUpload,
  onSubmit,
}) {
  const fileInputRef = useRef(null);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-[#141810]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[70] overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/70 bg-[#f8faf7] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#e9eee3] bg-white/80 px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
                  Slider response fields
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Create Slider Popup
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#edf1e8] bg-white text-[#6B7280] transition hover:text-[#141810]"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-[#e9eee3] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Slider Image
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={onImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full items-center justify-center gap-3 rounded-[28px] border-2 border-dashed border-[#d9e6c7] bg-[#fbfdf7] px-6 py-8 text-center transition hover:border-[#46EC12] hover:bg-[#f6fde9]"
                    >
                      <span className="material-symbols-outlined rounded-full bg-white p-3 text-[#7b8a63] shadow-sm">
                        cloud_upload
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-[#141810]">
                          Upload slider image
                        </span>
                        <span className="mt-1 block text-xs text-[#6B7280]">
                          PNG, JPG, or WEBP. This file will be sent as
                          {" `slider_image`."}
                        </span>
                        {form.slider_image && (
                          <span className="mt-2 block text-[11px] font-medium text-[#496619]">
                            {form.slider_image.name}
                          </span>
                        )}
                      </span>
                    </button>
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Title
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={onChange}
                      required
                      placeholder="Malayalam Classics Collection"
                      className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Slider URL
                    </label>
                    <input
                      name="slider_url"
                      type="url"
                      value={form.slider_url}
                      onChange={onChange}
                      required
                      placeholder="https://spcsbooks.com/malayalam-classics-collection"
                      className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                    />
                  </div>

                  {createError && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {createError}
                    </div>
                  )}

                  {successMessage && (
                    <div className="rounded-2xl border border-[#daf2b4] bg-[#f7fde9] px-4 py-3 text-sm font-medium text-[#496619]">
                      {successMessage}
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={creating}
                      className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating}
                      className="h-12 rounded-full bg-[#46EC12] px-6 text-sm font-black text-[#141810] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {creating ? "Creating..." : "Create Slider"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f2f8ea_100%)] p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                  Live preview
                </p>

                <div className="mt-5 rounded-[28px] border border-[#e4ebda] bg-white p-4 shadow-[0_24px_70px_-32px_rgba(20,24,16,0.35)]">
                  <div className="overflow-hidden rounded-[24px] bg-[#eef3e8]">
                    {form.slider_img_preview_url ? (
                      <img
                        src={form.slider_img_preview_url}
                        alt={form.title || "Slider preview"}
                        className="h-[260px] w-full object-cover sm:h-[320px]"
                      />
                    ) : (
                      <div className="flex h-[260px] items-center justify-center px-6 text-center text-sm font-medium text-[#7b8a63] sm:h-[320px]">
                        Select an image to preview it here.
                      </div>
                    )}
                  </div>

                  <div className="px-2 pb-2 pt-5">
                    <h3 className="text-lg font-black text-[#141810] sm:text-xl">
                      {form.title || "Malayalam Classics Collection"}
                    </h3>
                    <p className="mt-2 break-all text-xs text-[#6B7280]">
                      {form.slider_url || "https://chatgpt.com/"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
