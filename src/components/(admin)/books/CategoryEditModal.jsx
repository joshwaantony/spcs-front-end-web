"use client";

import { useEffect, useState } from "react";
import { HiPencilAlt, HiX } from "react-icons/hi";
import { useCategoryStore } from "@/store/admin/books/category.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function CategoryEditModal({
  isOpen,
  category,
  onClose,
  onSuccess = () => {},
}) {
  const [name, setName] = useState("");
  const showToast = useToastStore((state) => state.showToast);
  const {
    page,
    limit,
    updating,
    updateError,
    updateCategory,
    fetchCategories,
    resetUpdateCategoryState,
  } = useCategoryStore();

  useEffect(() => {
    if (isOpen && category?.name) {
      setName(category.name);
      resetUpdateCategoryState();
    }
  }, [isOpen, category, resetUpdateCategoryState]);

  useEffect(() => {
    if (!updateError) {
      return;
    }

    showToast({ type: "error", message: updateError });
  }, [showToast, updateError]);

  if (!isOpen || !category) {
    return null;
  }

  const handleClose = () => {
    if (updating) {
      return;
    }

    resetUpdateCategoryState();
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const categoryId = category?.id || category?.category_id;

    if (!trimmedName || !categoryId) {
      return;
    }

    try {
      const res = await updateCategory(categoryId, { name: trimmedName });
      await fetchCategories(page || 1, limit || 10);
      resetUpdateCategoryState();
      onClose();
      showToast({ type: "success", message: res?.message || "Category updated" });
      onSuccess(res?.message || "Category updated");
    } catch (error) {
      console.error("Update category failed:", error);
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
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
                  Category response fields
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Edit Category
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

            <div className="grid ">
              <div className="border-b border-[#e9eee3] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[28px] border border-[#dce8cd] bg-white p-5 shadow-[0_20px_60px_-34px_rgba(20,24,16,0.16)] sm:p-6"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef8e0] text-[#496619]">
                      <HiPencilAlt size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                        Edit field
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#141810]">
                        Update category name only
                      </p>
                    </div>
                  </div>

                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#6B7280]">
                    Category name
                  </label>
                  <input
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Geography"
                    className="h-14 w-full rounded-full border border-gray-200 bg-white px-6 text-sm font-semibold text-[#141810] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#46EC12]/30"
                  />

                  {updateError && (
                    <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {updateError}
                    </div>
                  )}

                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
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
        </div>
      </div>
    </>
  );
}
