"use client";

import { HiX } from "react-icons/hi";

export default function BranchCreateModal({
  isOpen,
  form,
  creating,
  createError,
  successMessage,
  onClose,
  onChange,
  onSubmit,
}) {
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
                  Branch payload
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Create Branch
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
                      Branch Name
                    </label>
                    <input
                      name="branch_name"
                      value={form.branch_name}
                      onChange={onChange}
                      required
                      placeholder="Chennai Branch"
                      className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Branch Address
                    </label>
                    <textarea
                      name="branch_address"
                      value={form.branch_address}
                      onChange={onChange}
                      required
                      rows={4}
                      placeholder="T Nagar, Chennai"
                      className="w-full rounded-[24px] border border-gray-200 bg-white px-6 py-4 text-sm text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      required
                      placeholder="9123456789"
                      className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                      Map URL
                    </label>
                    <input
                      name="map_url"
                      type="url"
                      value={form.map_url}
                      onChange={onChange}
                      required
                      placeholder="https://maps.google.com/chennai"
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
                      {creating ? "Creating..." : "Create Branch"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f2f8ea_100%)] p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                  Live preview
                </p>

                <div className="mt-5 overflow-hidden rounded-[30px] border border-[#e4ebda] bg-white shadow-[0_24px_70px_-32px_rgba(20,24,16,0.35)]">
                  <div className="bg-[linear-gradient(135deg,#f6fde9_0%,#eef7de_55%,#ffffff_100%)] p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
                          Branch Location
                        </p>
                        <h3 className="mt-3 text-2xl font-black leading-tight text-[#141810]">
                          {form.branch_name || "Chennai Branch"}
                        </h3>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#496619] shadow-sm">
                        New
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="rounded-[22px] border border-[#e8ede0] bg-[#fbfdf7] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                        Address
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                        {form.branch_address || "T Nagar, Chennai"}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[22px] border border-[#e8ede0] bg-white p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                          Phone
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[#141810]">
                          {form.phone || "9123456789"}
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-[#e8ede0] bg-white p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                          Maps
                        </p>
                        <p className="mt-2 break-all text-sm font-semibold text-[#141810]">
                          {form.map_url || "https://maps.google.com/chennai"}
                        </p>
                      </div>
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
