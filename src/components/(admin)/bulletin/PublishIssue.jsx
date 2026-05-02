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

const formatFileName = (file, fallback) => {
  if (!file?.name) {
    return fallback;
  }

  const { name } = file;

  if (name.length <= 26) {
    return name;
  }

  const extensionIndex = name.lastIndexOf(".");

  if (extensionIndex <= 0) {
    return `${name.slice(0, 23)}...`;
  }

  const extension = name.slice(extensionIndex);
  const baseName = name.slice(0, extensionIndex);

  return `${baseName.slice(0, 18)}...${extension}`;
};

export default function PublishIssue({ onCreated = () => {} }) {
  const [form, setForm] = useState({
    title: "",
    year: String(currentYear),
    month: monthOptions[new Date().getMonth()],
    cover_image: null,
    bulletin_pdf: null,
  });
  const coverInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const { creating, createError, createSuccess, createBulletin, resetCreateBulletinState } =
    useBulletinsStore();
  const showToast = useToastStore((state) => state.showToast);
  const coverPreviewUrl = useMemo(() => {
    if (!form.cover_image) {
      return "";
    }

    return URL.createObjectURL(form.cover_image);
  }, [form.cover_image]);

  const canSubmit = useMemo(
    () =>
      Boolean(
        form.title.trim() &&
          form.year &&
          form.month &&
          form.cover_image &&
          form.bulletin_pdf
      ),
    [form]
  );

  useEffect(() => {
    return () => {
      if (coverPreviewUrl) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
    };
  }, [coverPreviewUrl]);

  useEffect(() => {
    if (!createSuccess) {
      return;
    }

    showToast({ type: "success", message: createSuccess });
  }, [createSuccess, showToast]);

  useEffect(() => {
    if (!createError) {
      return;
    }

    showToast({ type: "error", message: createError });
  }, [createError, showToast]);

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
      await createBulletin(payload);
      setForm({
        title: "",
        year: String(currentYear),
        month: monthOptions[new Date().getMonth()],
        cover_image: null,
        bulletin_pdf: null,
      });

      if (coverInputRef.current) {
        coverInputRef.current.value = "";
      }

      if (pdfInputRef.current) {
        pdfInputRef.current.value = "";
      }

      await onCreated();
      resetCreateBulletinState();
    } catch (error) {
      console.error("Create bulletin failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-100 w-full"
    >
      <h2 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#A6F20D] text-xl sm:text-2xl">
          add_circle
        </span>
        Publish New Issue
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <p className="text-xs sm:text-sm font-bold mb-2 ml-1">Issue Title</p>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full h-12 sm:h-14 px-4 sm:px-6 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-[#A6F20D] outline-none text-sm sm:text-base"
              placeholder="e.g. March 2026 Bulletin"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold mb-2 ml-1">Year</p>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full h-12 sm:h-14 px-4 sm:px-6 rounded-full bg-white border border-gray-200 appearance-none text-sm sm:text-base"
                required
              >
                {yearOptions.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold mb-2 ml-1">Month</p>
              <select
                name="month"
                value={form.month}
                onChange={handleChange}
                className="w-full h-12 sm:h-14 px-4 sm:px-6 rounded-full bg-white border border-gray-200 appearance-none text-sm sm:text-base"
                required
              >
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-44 md:w-48">
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
              className={`relative w-full aspect-square overflow-hidden rounded-2xl border-2 border-dashed bg-white transition ${
                form.cover_image
                  ? "border-[#A6F20D] shadow-[0_18px_40px_-24px_rgba(166,242,13,0.9)]"
                  : "border-gray-300 hover:border-[#A6F20D]"
              }`}
              title={form.cover_image?.name || "Cover Image"}
            >
              {coverPreviewUrl ? (
                <>
                  <img
                    src={coverPreviewUrl}
                    alt="Selected cover preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141810]/88 via-[#141810]/20 to-transparent" />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#496619]">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    Selected
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
                      Cover Image
                    </p>
                    <p className="mt-1 break-all text-[11px] font-semibold leading-tight text-white">
                      {formatFileName(form.cover_image, "Cover Image")}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl text-gray-400">
                    image
                  </span>
                  <p className="max-w-full break-all px-3 text-center text-[9px] font-bold uppercase tracking-widest text-gray-400 leading-tight sm:text-[10px]">
                    Cover Image
                  </p>
                </div>
              )}
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4">
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
              className={`border-2 rounded-2xl flex flex-col items-center justify-center gap-2 bg-white transition min-h-[130px] sm:min-h-[160px] ${
                form.bulletin_pdf
                  ? "border-[#A6F20D] bg-[#fbffe9]"
                  : "border-dashed border-gray-300 hover:border-[#A6F20D]"
              }`}
              title={form.bulletin_pdf?.name || "Bulletin PDF File"}
            >
              <span
                className={`material-symbols-outlined text-2xl sm:text-3xl ${
                  form.bulletin_pdf ? "text-[#496619]" : "text-gray-400"
                }`}
              >
                picture_as_pdf
              </span>
              <p
                className={`max-w-full break-all text-center px-3 leading-tight text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${
                  form.bulletin_pdf ? "text-[#496619]" : "text-gray-400"
                }`}
              >
                {formatFileName(form.bulletin_pdf, "Bulletin PDF File")}
              </p>
            </button>

            <button
              type="submit"
              disabled={!canSubmit || creating}
              className="w-full min-h-[48px] sm:min-h-[56px] px-4 sm:px-6 rounded-full bg-[#A6F20D] font-black uppercase tracking-wider flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:opacity-90 transition text-xs sm:text-sm md:text-base whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="material-symbols-outlined bg-black/10 rounded-full p-1 text-sm sm:text-base md:text-lg flex-shrink-0">
                save
              </span>
              <span className="leading-none">{creating ? "Saving..." : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {createSuccess ? (
        <p className="mt-4 text-sm font-semibold text-[#496619]">{createSuccess}</p>
      ) : null}
      {createError ? (
        <p className="mt-4 text-sm font-semibold text-red-600">{createError}</p>
      ) : null}
    </form>
  );
}
