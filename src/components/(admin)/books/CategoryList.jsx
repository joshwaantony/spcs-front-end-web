"use client";

import { useEffect, useRef, useState } from "react";
import CategoryDeleteModal from "@/components/(admin)/books/CategoryDeleteModal";
import CategoryEditModal from "@/components/(admin)/books/CategoryEditModal";
import { useCategoryStore } from "@/store/admin/books/category.store";

export default function CategoryList() {
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const successTimeoutRef = useRef(null);
  const {
    categories,
    page,
    limit,
    total,
    totalPages,
    search,
    loading,
    error,
    fetchCategories,
  } = useCategoryStore();
  const safeTotalPages = Math.max(totalPages, 1);
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = total === 0 ? 0 : Math.min(page * limit, total);

  useEffect(() => {
    fetchCategories(1, 10, search);
  }, [fetchCategories, search]);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);

    if (successTimeoutRef.current) {
      window.clearTimeout(successTimeoutRef.current);
    }

    successTimeoutRef.current = window.setTimeout(() => {
      setSuccessMessage("");
    }, 2200);
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > safeTotalPages || loading) {
      return;
    }

    fetchCategories(nextPage, limit, search);
  };

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[24px] border border-[#e2ead7] bg-white p-5 shadow-[0_18px_50px_-34px_rgba(20,24,16,0.22)]"
          >
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-full bg-[#eef3e8]" />
              <div className="min-w-0 flex-1">
                <div className="h-3 w-20 rounded bg-[#eef3e8]" />
                <div className="mt-3 h-5 w-11/12 rounded bg-[#e7ede0]" />
                <div className="mt-2 h-5 w-8/12 rounded bg-[#eef3e8]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[24px] border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
        {error}
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#d7e3c8] bg-[#fbfdf7] px-6 py-12 text-center shadow-[0_24px_70px_-32px_rgba(20,24,16,0.18)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
          Category field
        </p>
        <h3 className="mt-3 text-2xl font-black text-[#141810]">
          No categories found
        </h3>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[32px] border border-[#dce8cd] bg-[linear-gradient(180deg,#fcfef9_0%,#f2f8ea_100%)] shadow-[0_28px_80px_-36px_rgba(20,24,16,0.24)]">
      <div className="flex flex-col gap-4 border-b border-[#e3ecd8] px-6 py-6 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
            Category field
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-[#141810] sm:text-[28px]">
            Categories
          </h3>
         
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d7e8bb] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#496619]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#46EC12]" />
          {total || categories.length} Items
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {successMessage && (
          <div className="mb-5 rounded-[24px] border border-[#daf2b4] bg-[#f7fde9] px-5 py-4 text-sm font-medium text-[#496619]">
            {successMessage}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={category.id || category.category_id || `${category.name}-${index}`}
              className="group rounded-[24px] border border-[#e2ead7] bg-white p-5 shadow-[0_18px_50px_-34px_rgba(20,24,16,0.22)] transition hover:-translate-y-1 hover:border-[#cfe4b2]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef8e0] text-sm font-black text-[#496619]">
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7b8a63]">
                    Name
                  </p>
                  <h4 className="mt-2 break-words text-base font-black leading-6 text-[#141810]">
                    {category.name}
                  </h4>
                  <p className="mt-2 text-sm font-semibold text-[#6B7280]">
                    {category.books_count || 0} books
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(category)}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-[#dce8cd] px-5 text-xs font-bold text-[#496619] transition hover:bg-[#eef8e0]"
                >
                  Edit Name
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingCategory(category)}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-[#f4d4ce] px-5 text-xs font-bold text-[#d14f45] transition hover:bg-[#fff1ee]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-[24px] border border-[#e4ebda] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-center text-xs font-medium text-[#6B7280] sm:text-left sm:text-sm">
            Showing{" "}
            <span className="font-semibold text-[#141810]">
              {start}-{end}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#141810]">{total}</span>{" "}
            categories
          </p>

          <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              type="button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e4ebda] text-[#6B7280] transition hover:text-[#46EC12] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[18px]">
                chevron_left
              </span>
            </button>

            {Array.from({ length: safeTotalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={loading}
                  className={`h-10 w-10 shrink-0 rounded-full text-sm font-semibold transition ${
                    page === pageNumber
                      ? "bg-[#46EC12] text-[#141810]"
                      : "border border-[#e4ebda] text-[#6B7280] hover:text-[#46EC12]"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === safeTotalPages || loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e4ebda] text-[#6B7280] transition hover:text-[#46EC12] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>

      <CategoryEditModal
        isOpen={Boolean(editingCategory)}
        category={editingCategory}
        onClose={() => setEditingCategory(null)}
        onSuccess={showSuccessMessage}
      />

      <CategoryDeleteModal
        isOpen={Boolean(deletingCategory)}
        category={deletingCategory}
        onClose={() => setDeletingCategory(null)}
      />
    </div>
  );
}
