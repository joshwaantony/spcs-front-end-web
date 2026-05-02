 "use client";

import { useReviewsStore } from "@/store/admin/reviews/reviews.store";

export default function ReviewsPagination() {
  const { page, totalPages, loading, fetchReviews, filter } = useReviewsStore();

  const safeTotalPages = Math.max(totalPages, 1);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > safeTotalPages || loading) {
      return;
    }

    fetchReviews(nextPage, filter);
  };

  if (safeTotalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
      <nav className="flex items-center gap-2 sm:gap-3">
        
        {/* Previous */}
        <button
          aria-label="Previous page"
          type="button"
          onClick={() => handlePageChange(page - 1)}
          disabled={loading || page <= 1}
          className="
            p-2 sm:p-2.5
            rounded-full
            bg-gray-100
            text-black
            hover:bg-[#A6F20D]
            transition-colors
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <span className="material-symbols-outlined text-base sm:text-lg">
            chevron_left
          </span>
        </button>

        {/* Page Info */}
        <span
          className="
            px-3 sm:px-4
            text-xs sm:text-sm
            font-bold
            text-black
            whitespace-nowrap
          "
        >
          Page {page} of {safeTotalPages}
        </span>

        {/* Next */}
        <button
          aria-label="Next page"
          type="button"
          onClick={() => handlePageChange(page + 1)}
          disabled={loading || page >= safeTotalPages}
          className="
            p-2 sm:p-2.5
            rounded-full
            bg-gray-100
            text-black
            hover:bg-[#A6F20D]
            transition-colors
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <span className="material-symbols-outlined text-base sm:text-lg">
            chevron_right
          </span>
        </button>

      </nav>
    </div>
  );
}
