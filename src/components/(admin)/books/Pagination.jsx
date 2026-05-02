
"use client";

import { useBooksStore } from "@/store/admin/books/books.store";

const tabFilterMap = {
  all: "all",
  bestsellers: "best_seller",
  recent: "new_arrival",
};

function Pagination({ activeTab = "all" }) {
  const { page, limit, total, totalPages, loading, fetchBooks } = useBooksStore();
  const safeTotalPages = Math.max(totalPages, 1);
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = total === 0 ? 0 : Math.min(page * limit, total);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > safeTotalPages || loading) {
      return;
    }

    fetchBooks({
      filter: tabFilterMap[activeTab] || "all",
      page: nextPage,
      limit,
    });
  };

  if (!total) {
    return null;
  }

  return (
    <div className=" ">
      {/* PAGINATION FOOTER */}
      <div
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
          bg-white rounded-xl
          px-4 sm:px-8 py-4 sm:py-5
          border border-[#F3F4F6]
        "
      >
        {/* LEFT TEXT */}
        <p className="text-xs sm:text-sm text-gray-400 font-medium text-center sm:text-left">
          Showing{" "}
          <span className="text-charcoal font-semibold">{start}-{end}</span>{" "}
          of{" "}
          <span className="text-charcoal font-semibold">{total}</span>{" "}
          books
        </p>

        {/* PAGINATION BUTTONS */}
        <div
          className="
            flex items-center gap-2
            justify-center
            overflow-x-auto
            scrollbar-hide
          "
        >
          {/* PREV */}
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || loading}
            className="
              size-9 sm:size-10
              rounded-full
              border border-[#F3F4F6]
              flex items-center justify-center
              text-gray-400
              
              hover:text-[#46EC12]
              transition
              shrink-0
              disabled:cursor-not-allowed disabled:opacity-40
            "
          >
            <span className="material-symbols-outlined text-base sm:text-lg">
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
                className={`
                  size-9 shrink-0 rounded-full text-xs font-semibold transition sm:size-10 sm:text-sm
                  ${
                    page === pageNumber
                      ? "bg-[#46EC12] text-charcoal shadow-sm"
                      : "border border-[#F3F4F6] text-[#9CA3AF] hover:text-[#46EC12]"
                  }
                `}
              >
                {pageNumber}
              </button>
            )
          )}

          {/* NEXT */}
          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === safeTotalPages || loading}
            className="
              size-9 sm:size-10
              rounded-full
              border border-[#F3F4F6]
              flex items-center justify-center
              text-gray-400
              hover:text-[#46EC12]
              transition
              shrink-0
              disabled:cursor-not-allowed disabled:opacity-40
            "
          >
            <span className="material-symbols-outlined text-base sm:text-lg">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
