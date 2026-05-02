"use client";

import { HiX } from "react-icons/hi";

export default function SliderEditModal({
  isOpen,
  slider,
  form,
  updating,
  updateError,
  onClose,
  onChange,
  onImageUpload,
  onSubmit,
}) {
  if (!isOpen || !slider) {
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
          <div className="w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/70 bg-[#f8faf7] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#e9eee3] bg-white/80 px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
                  Slider response fields
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Edit Slider
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

            <form onSubmit={onSubmit} className="space-y-5 p-6 sm:p-8">
              <div className="overflow-hidden rounded-[24px] border border-[#e4ebda] bg-[#f4f8ef]">
                <img
                  src={
                    form.slider_img_preview_url ||
                    form.slider_img_url ||
                    slider.slider_img_url
                  }
                  alt={slider.title}
                  className="h-[220px] w-full object-contain"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                  Preview image
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={onImageUpload}
                  className="block w-full text-sm text-[#6B7280] file:mr-4 file:rounded-full file:border-0 file:bg-[#eef8e0] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#141810]"
                />
                <p className="mt-2 text-xs text-[#6B7280]">
                  Selecting a file will upload it as {"`slider_image`"} when
                  you save.
                </p>
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
                  className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                />
              </div>

              {updateError && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {updateError}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={updating}
                  className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="h-12 rounded-full bg-[#46EC12] px-6 text-sm font-black text-[#141810] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
