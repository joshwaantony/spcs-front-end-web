"use client";

import { useEffect } from "react";
import { HiOutlineTrash, HiX } from "react-icons/hi";
import { useBooksStore } from "@/store/admin/books/books.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function BookDeleteModal({ isOpen, book, onClose }) {
  const showToast = useToastStore((state) => state.showToast);
  const {
    page,
    limit,
    filter,
    search,
    fromDate,
    toDate,
    deleting,
    deleteError,
    deleteBook,
    fetchBooks,
    resetDeleteBookState,
  } = useBooksStore();

  useEffect(() => {
    if (!deleteError) {
      return;
    }

    showToast({ type: "error", message: deleteError });
  }, [deleteError, showToast]);

  if (!isOpen || !book) {
    return null;
  }

  const handleClose = () => {
    if (deleting) {
      return;
    }

    resetDeleteBookState();
    onClose();
  };

  const handleDelete = async () => {
    try {
      await deleteBook(book.id || book.book_id);
      showToast({ type: "success", message: "Book deleted successfully." });
      await fetchBooks({
        filter,
        page,
        limit,
        search,
        fromDate,
        toDate,
      });
      resetDeleteBookState();
      onClose();
    } catch (error) {
      console.error("Delete book failed:", error);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-[#141810]/55 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-[70] overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-xl overflow-hidden rounded-[32px] border border-white/70 bg-[#fff8f7] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#f2d8d3] bg-white/90 px-6 py-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d14f45]">
                  Delete Book
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#141810]">
                  Remove This Card?
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f1d8d2] bg-white text-[#6B7280]"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="rounded-[28px] border border-[#f2d8d3] bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1ee] text-[#d14f45]">
                    <HiOutlineTrash size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#141810]">
                      {book.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-[#6B7280]">
                      This action removes the book card from all tabs including
                      All Books, Best Sellers, and Recently Added.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                {deleteError ? (
                  <div className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 sm:mr-auto sm:max-w-sm">
                    {deleteError}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={deleting}
                  className="h-12 rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#4B5563]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="h-12 rounded-full bg-[#d14f45] px-6 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete Book"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
