"use client";

import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { useCategoryStore } from "@/store/admin/books/category.store";
import { useToastStore } from "@/store/ui/toast.store";

const initialForm = {
  name: "",
};

export default function CategoryCreateModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");
  const showToast = useToastStore((state) => state.showToast);
  const {
    page,
    limit,
    creating,
    createError,
    createCategory,
    fetchCategories,
    resetCreateCategoryState,
  } = useCategoryStore();

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

    setForm(initialForm);
    setSuccessMessage("");
    resetCreateCategoryState();
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");

    const name = form.name.trim();

    if (!name) {
      return;
    }

    try {
      const res = await createCategory({ name });
      setSuccessMessage(res?.message || "Category created");
      showToast({ type: "success", message: res?.message || "Category created" });
      await fetchCategories(page || 1, limit || 10);

      window.setTimeout(() => {
        setForm(initialForm);
        setSuccessMessage("");
        resetCreateCategoryState();
        onClose();
      }, 900);
    } catch (error) {
      console.error("Create category failed:", error);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-[#141810]/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-[70] overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/70 bg-[#f8faf7] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#e9eee3] bg-white/80 px-6 py-5 backdrop-blur sm:px-8">
              <div>
            
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Create Category
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#edf1e8] bg-white text-[#6B7280] transition hover:text-[#141810]"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="grid gap-0 ">
              <div className="border-b border-[#e9eee3] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[28px] border border-[#dce8cd] bg-white p-5 shadow-[0_20px_60px_-34px_rgba(20,24,16,0.16)] sm:p-6"
                >
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                    Category name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={(event) =>
                      setForm({ name: event.target.value })
                    }
                    placeholder="Ashbin"
                    className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm font-semibold text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                  />

                  {createError && (
                    <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {createError}
                    </div>
                  )}

                  {successMessage && (
                    <div className="mt-4 rounded-2xl border border-[#daf2b4] bg-[#f7fde9] px-4 py-3 text-sm font-medium text-[#496619]">
                      {successMessage}
                    </div>
                  )}

                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={creating}
                      className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563] transition hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating}
                      className="h-12 rounded-full bg-[#46EC12] px-6 text-sm font-black text-[#141810] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {creating ? "Creating..." : "Create Category"}
                    </button>
                  </div>
                </form>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
