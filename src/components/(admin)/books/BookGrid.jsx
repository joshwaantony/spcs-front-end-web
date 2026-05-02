
"use client";

import { useEffect, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import BookDeleteModal from "@/components/(admin)/books/BookDeleteModal";
import BookEditModal from "@/components/(admin)/books/BookEditModal";
import { useBooksStore } from "@/store/admin/books/books.store";

const tabFilterMap = {
  all: "all",
  bestsellers: "best_seller",
  recent: "new_arrival",
};

const fallbackCover =
  "https://placehold.co/600x800/F3F4F6/6B7280?text=No+Cover";

export default function BookGrid({ activeTab = "all" }) {
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const { books, loading, error, search, fetchBooks } = useBooksStore();

  useEffect(() => {
    fetchBooks({
      filter: tabFilterMap[activeTab] || "all",
      search,
      page: 1,
      limit: 10,
    });
  }, [activeTab, fetchBooks, search]);

  if (loading) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-[#F5F5F5] bg-white"
            >
              <div className="aspect-[3/4] animate-pulse bg-gray-100" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!books.length) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-dashed border-[#d7e3c8] bg-[#fbfdf7] px-6 py-12 text-center shadow-[0_24px_70px_-32px_rgba(20,24,16,0.18)]">
          <h3 className="text-2xl font-black text-[#141810]">No books found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div
        className="
          grid grid-cols-1
          md:grid-cols-2
          2xl:grid-cols-3
          gap-6 lg:gap-8
        "
      >
        {books.map((book) => (
          <div
            key={book.book_id || book.id}
            className="
              group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#E9ECE7] bg-white
              md:flex-row lg:flex-col xl:flex-row
              transition-all
              shadow-[0_18px_40px_-30px_rgba(20,24,16,0.28)]
              hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(20,24,16,0.28)]
            "
          >
            {/* IMAGE */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 md:w-[220px] md:min-w-[220px] md:aspect-auto lg:w-full lg:min-w-0 lg:aspect-[4/5] xl:w-[220px] xl:min-w-[220px] xl:aspect-auto">
              <span
                className={`absolute left-3 top-3 z-10 max-w-[calc(100%-24px)] rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] sm:left-auto sm:right-4 sm:top-4 sm:px-4 sm:py-2
                  ${
                    book.badge === "Bestseller"
                      ? "bg-[#46EC12] text-charcoal"
                      : "bg-white/90 text-charcoal/70"
                  }`}
              >
                {book.badge}
              </span>

              <img
                src={book.cover_image_url || fallbackCover}
                alt={book.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
              <div className="space-y-3">
                <h3 className="line-clamp-2 text-[18px] font-black leading-tight text-[#141810] sm:text-[22px]">
                  {book.name}
                </h3>
                <p className="text-sm font-medium text-[#141810]/70 sm:text-base">
                  {book.author}
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]">
                  {book.category_name || book.category ? (
                    <span className="rounded-full bg-[#F4F7EF] px-3 py-1.5 text-[#5F6F4C]">
                      {book.category_name || book.category}
                    </span>
                  ) : null}
                  {book.language ? (
                    <span className="rounded-full bg-[#F8F8F8] px-3 py-1.5">
                      {book.language}
                    </span>
                  ) : null}
                  {book.price ? (
                    <span className="rounded-full bg-[#FFF7E8] px-3 py-1.5 text-[#8A5A00]">
                      Rs. {book.price}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-auto flex flex-col gap-3 border-t border-[#EEF1EB] pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setEditingBook(book)}
                  className="
                    flex h-12 w-full flex-1 items-center justify-center rounded-full
                    border border-[#B9DB8A] bg-[#EEF9D8]
                    text-sm font-black text-[#254108]
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                    transition hover:border-[#A6CF6D] hover:bg-[#E4F5C4]
                  "
                >
                  <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#254108]">
                    <HiPencil className="text-[15px]" />
                  </span>
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingBook(book)}
                  className="
                    flex h-12 w-full flex-1 items-center justify-center rounded-full
                    border border-[#F3D2CC] bg-[#FFF4F1]
                    text-sm font-black text-[#D14F45]
                    transition hover:bg-[#FFE9E3]
                  "
                >
                  <HiTrash className="mr-2 text-sm" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BookEditModal
        isOpen={Boolean(editingBook)}
        book={editingBook}
        onClose={() => setEditingBook(null)}
      />

      <BookDeleteModal
        isOpen={Boolean(deletingBook)}
        book={deletingBook}
        onClose={() => setDeletingBook(null)}
      />
    </div>
  );
}
