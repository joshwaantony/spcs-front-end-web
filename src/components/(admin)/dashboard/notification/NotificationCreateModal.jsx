"use client";

import { useRef } from "react";
import { HiX } from "react-icons/hi";

const responseShape = `{
  "success": true,
  "message": "created successfully",
  "data": {
    "item": {
      "id": "ckxyz123",
      "title": "Big Sale",
      "description": "Flat 50% off on books",
      "notification_image_url": "/uploads/notifications/171135123123-image.jpg",
      "notification_url": "https://example.com/sale"
    }
  }
}`;

export default function NotificationCreateModal({
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

  const previewImage =
    form.notification_img_preview_url ||
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80";
  const previewTitle = form.title || "Big Sale";
  const previewDescription =
    form.description || "Flat 50% off on books";
  const previewUrl =
    form.notification_url || "https://example.com/sale";

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-[#141810]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[70] overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-[#f8faf7] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#e9eee3] bg-white/80 px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
                  Notification payload
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Create Notification
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

            <div className="grid gap-0 xl:grid-cols-[0.98fr_1.02fr]">
              <div className="border-b border-[#e9eee3] p-6 sm:p-8 xl:border-b-0 xl:border-r">
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Title
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={onChange}
                      required
                      placeholder="Big Sale"
                      className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
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
                      required
                      rows={4}
                      placeholder="Flat 50% off on books"
                      className="w-full rounded-[24px] border border-gray-200 bg-white px-6 py-4 text-sm text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Notification Image
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
                          Upload notification image
                        </span>
                        <span className="mt-1 block text-xs text-[#6B7280]">
                          PNG, JPG, or WEBP. This image is used for preview and
                          create payload.
                        </span>
                        {form.notification_image && (
                          <span className="mt-2 block text-[11px] font-medium text-[#496619]">
                            {form.notification_image.name}
                          </span>
                        )}
                      </span>
                    </button>
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
                      placeholder="https://example.com/sale"
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
                      {creating ? "Creating..." : "Create Notification"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f2f8ea_100%)] p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                  Live preview
                </p>

                <div className="mt-5 overflow-hidden rounded-[30px] border border-[#e4ebda] bg-white shadow-[0_24px_70px_-32px_rgba(20,24,16,0.35)]">
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt={previewTitle}
                      className="h-[260px] w-full object-cover sm:h-[320px]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(20,24,16,0)_0%,rgba(20,24,16,0.82)_100%)] px-6 pb-6 pt-16 text-white">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">
                        <span className="h-2 w-2 rounded-full bg-[#46EC12]" />
                        Push Notification
                      </div>
                      <h3 className="mt-3 text-2xl font-black leading-tight">
                        {previewTitle}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm text-white/80">
                        {previewDescription}
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
