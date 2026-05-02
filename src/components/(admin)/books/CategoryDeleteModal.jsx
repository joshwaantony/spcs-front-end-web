"use client";

import { useEffect } from "react";
import { HiOutlineTrash, HiX } from "react-icons/hi";
import { useCategoryStore } from "@/store/admin/books/category.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function CategoryDeleteModal({ isOpen, category, onClose }) {
  const showToast = useToastStore((state) => state.showToast);
  const {
    page,
    limit,
    deleting,
    deleteError,
    deleteCategory,
    fetchCategories,
    resetDeleteCategoryState,
  } = useCategoryStore();

  useEffect(() => {
    if (!deleteError) {
      return;
    }

    showToast({ type: "error", message: deleteError });
  }, [deleteError, showToast]);

  if (!isOpen || !category) {
    return null;
  }

  const handleClose = () => {
    if (deleting) {
      return;
    }

    resetDeleteCategoryState();
    onClose();
  };

  const handleConfirmDelete = async () => {
    const categoryId = category?.id || category?.category_id;

    if (!categoryId) {
      return;
    }

    try {
      await deleteCategory(categoryId);
      showToast({ type: "success", message: "Category deleted successfully." });
      await fetchCategories(page || 1, limit || 10);
      resetDeleteCategoryState();
      onClose();
    } catch (error) {
      console.error("Delete category failed:", error);
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
          <div className="w-full max-w-xl overflow-hidden rounded-[32px] border border-white/70 bg-[#fffaf9] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#f3dfda] bg-white/90 px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#b16a5b]">
                  Delete confirmation
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  Delete Category
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f4e5df] bg-white text-[#6B7280] transition hover:text-[#141810]"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6 sm:p-8">
              <div className="flex items-center gap-4 rounded-[24px] border border-[#f6ddd7] bg-[#fff3f0] px-5 py-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffe1da] text-[#c75b49]">
                  <HiOutlineTrash size={24} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#7a2f24]">
                    This action will permanently delete:
                  </p>
                  <p className="mt-2 break-words text-xl font-black text-[#141810]">
                    {category.name}
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#f1e2dc] bg-white px-5 py-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b16a5b]">
                  Warning
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6b5f5c]">
                  Once deleted, this category name will be removed from the
                  current list. Please confirm before continuing.
                </p>
              </div>

              {deleteError && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {deleteError}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={deleting}
                  className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="h-12 rounded-full bg-[#ef4444] px-6 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
