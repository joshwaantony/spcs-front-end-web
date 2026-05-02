"use client";

import { useRef } from "react";
import { HiX } from "react-icons/hi";

export default function NotificationEditModal({
  isOpen,
  notification,
  form,
  updating,
  updateError,
  onClose,
  onChange,
  onImageUpload,
  onSubmit,
}) {
  const fileInputRef = useRef(null);

  if (!isOpen || !notification) {
    return null;
  }

  const previewImage =
    form.notification_img_preview_url || notification.notification_image_url;

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
                  Notification response fields
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Edit Notification
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

            <div className="grid gap-0 lg:grid-cols-[1fr_0.92fr]">
              <form
                onSubmit={onSubmit}
                className="space-y-5 border-b border-[#e9eee3] p-6 sm:p-8 lg:border-b-0 lg:border-r"
              >
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                    Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    required
                    className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm text-[#141810] focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    rows={4}
                    className="w-full rounded-[24px] border border-gray-200 bg-white px-6 py-4 text-sm text-[#141810] focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                  />
                  <p className="mt-2 text-xs text-[#6B7280]">
                    Optional. Leave as-is if the API only needs title and URL.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                    Notification URL
                  </label>
                  <input
                    name="notification_url"
                    type="url"
                    value={form.notification_url}
                    onChange={onChange}
                    required
                    className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm text-[#141810] focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                    Replace image
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
                      image
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[#141810]">
                        Upload new notification image
                      </span>
                      <span className="mt-1 block text-xs text-[#6B7280]">
                        Leave unchanged if you want to keep the current image.
                      </span>
                      {form.notification_image && (
                        <span className="mt-2 block text-[11px] font-medium text-[#496619]">
                          {form.notification_image.name}
                        </span>
                      )}
                    </span>
                  </button>
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

              <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f2f8ea_100%)] p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                  Live preview
                </p>

                <div className="mt-5 overflow-hidden rounded-[30px] border border-[#e4ebda] bg-white shadow-[0_24px_70px_-32px_rgba(20,24,16,0.35)]">
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt={form.title || notification.title}
                      className="h-[260px] w-full object-cover sm:h-[320px]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(20,24,16,0)_0%,rgba(20,24,16,0.82)_100%)] px-6 pb-6 pt-16 text-white">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                        Updated notification
                      </p>
                      <h3 className="mt-2 text-2xl font-black leading-tight">
                        {form.title || notification.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/80">
                        {form.description || notification.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="rounded-[22px] border border-[#e8ede0] bg-[#fbfdf7] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                        Redirect URL
                      </p>
                      <p className="mt-2 break-all text-sm font-semibold text-[#141810]">
                        {form.notification_url || notification.notification_url}
                      </p>
                    </div>
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
