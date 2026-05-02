"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useBulletinsStore } from "@/store/admin/bulletins/bulletins.store";
import { useToastStore } from "@/store/ui/toast.store";

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 8 }, (_, index) => currentYear - index);

const getInitialYearMonth = (bulletin) => {
  if (bulletin?.date) {
    const dateValue = new Date(bulletin.date);

    if (!Number.isNaN(dateValue.getTime())) {
      return {
        year: String(dateValue.getFullYear()),
        month: monthOptions[dateValue.getMonth()],
      };
    }
  }

  const titleParts = String(bulletin?.title || "").trim().split(/\s+/);
  const firstPart = titleParts[0];
  const secondPart = titleParts[1];

  if (monthOptions.includes(firstPart) && /^\d{4}$/.test(secondPart || "")) {
    return { month: firstPart, year: secondPart };
  }

  return {
    year: String(currentYear),
    month: monthOptions[new Date().getMonth()],
  };
};

export default function EditBulletinModal({
  isOpen,
  bulletin,
  onClose = () => {},
  onSaved = () => {},
}) {
  const [form, setForm] = useState({
    title: "",
    year: String(currentYear),
    month: monthOptions[new Date().getMonth()],
    cover_image: null,
    bulletin_pdf: null,
  });
  const coverInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const {
    updating,
    updateError,
    updateSuccess,
    updateBulletin,
    resetUpdateBulletinState,
  } = useBulletinsStore();
  const showToast = useToastStore((state) => state.showToast);

  const canSubmit = useMemo(
    () => Boolean(form.title.trim() && form.year && form.month),
    [form]
  );

  useEffect(() => {
    if (isOpen) {
      const initialDate = getInitialYearMonth(bulletin);
      setForm({
        title: bulletin?.title || "",
        year: initialDate.year,
        month: initialDate.month,
        cover_image: null,
        bulletin_pdf: null,
      });
      if (coverInputRef.current) {
        coverInputRef.current.value = "";
      }
      if (pdfInputRef.current) {
        pdfInputRef.current.value = "";
      }
      resetUpdateBulletinState();
    }
  }, [isOpen, bulletin, resetUpdateBulletinState]);

  useEffect(() => {
    if (!updateSuccess) {
      return;
    }

    showToast({ type: "success", message: updateSuccess });
  }, [showToast, updateSuccess]);

  useEffect(() => {
    if (!updateError) {
      return;
    }

    showToast({ type: "error", message: updateError });
  }, [showToast, updateError]);

  if (!isOpen || !bulletin) {
    return null;
  }

  const handleClose = () => {
    if (updating) {
      return;
    }

    resetUpdateBulletinState();
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    const { name } = event.target;

    setForm((current) => ({
      ...current,
      [name]: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append("title", form.title.trim());
    payload.append("year", form.year);
    payload.append("month", form.month);

    if (form.cover_image) {
      payload.append("cover_image", form.cover_image);
    }

    if (form.bulletin_pdf) {
      payload.append("bulletin_pdf", form.bulletin_pdf);
    }

    try {
      await updateBulletin(bulletin.id, payload);
      onSaved(form.title.trim());
    } catch (error) {
      console.error("Update bulletin failed:", error);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-[90] overflow-y-auto p-4 sm:p-6">
        <div className="flex min-h-full items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl rounded-[28px] border border-[#E5E7EB] bg-white p-5 sm:p-7 shadow-[0_30px_100px_-40px_rgba(20,24,16,0.4)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7C8A60]">
                  Bulletin
                </p>
                <h3 className="mt-1 text-2xl font-black text-[#141810]">
                  Edit Bulletin
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
                  Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="h-12 w-full rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-5 text-sm font-semibold text-[#141810] outline-none focus:border-[#A6F20D]"
                  placeholder="Enter bulletin title"
                  required
                />
              </div>

              <div>
                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
                  Year
                </label>
                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="h-12 w-full rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-5 text-sm font-semibold text-[#141810] outline-none focus:border-[#A6F20D]"
                  required
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={String(year)}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
                  Month
                </label>
                <select
                  name="month"
                  value={form.month}
                  onChange={handleChange}
                  className="h-12 w-full rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-5 text-sm font-semibold text-[#141810] outline-none focus:border-[#A6F20D]"
                  required
                >
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
                  Replace Cover Image
                </label>
                <input
                  ref={coverInputRef}
                  type="file"
                  name="cover_image"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="flex h-12 w-full items-center justify-between rounded-full border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-5 text-sm font-semibold text-[#141810] hover:border-[#A6F20D]"
                >
                  <span className="truncate">
                    {form.cover_image
                      ? form.cover_image.name
                      : "Choose cover image (optional)"}
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#6B7280]">
                    upload
                  </span>
                </button>
              </div>

              <div>
                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280]">
                  Replace Bulletin PDF
                </label>
                <input
                  ref={pdfInputRef}
                  type="file"
                  name="bulletin_pdf"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => pdfInputRef.current?.click()}
                  className="flex h-12 w-full items-center justify-between rounded-full border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-5 text-sm font-semibold text-[#141810] hover:border-[#A6F20D]"
                >
                  <span className="truncate">
                    {form.bulletin_pdf
                      ? form.bulletin_pdf.name
                      : "Choose PDF file (optional)"}
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#6B7280]">
                    upload_file
                  </span>
                </button>
              </div>
            </div>

            {updateError ? (
              <p className="mt-4 text-sm font-semibold text-red-600">{updateError}</p>
            ) : null}
            {updateSuccess ? (
              <p className="mt-4 text-sm font-semibold text-[#496619]">{updateSuccess}</p>
            ) : null}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                disabled={updating}
                className="h-11 rounded-full border border-[#E5E7EB] px-5 text-sm font-bold text-[#4B5563] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating || !canSubmit}
                className="h-11 rounded-full bg-[#A6F20D] px-6 text-sm font-black text-[#141810] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updating ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
