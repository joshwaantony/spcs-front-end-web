"use client";

import { useBranchStore } from "@/store/admin/dashboard/branch.store";

export default function BranchPagination() {
  const { page, totalPages, total, limit, loading, fetchBranches } =
    useBranchStore();

  const safeTotalPages = Math.max(totalPages, 1);
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = total === 0 ? 0 : Math.min(page * limit, total);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > safeTotalPages || loading) {
      return;
    }

    fetchBranches(nextPage);
  };

  return (
    <div className="px-4 sm:px-[25px]">
      <div
        className="
          flex flex-col gap-4
          rounded-xl border border-[#F3F4F6] bg-white
          px-4 py-4
          sm:flex-row sm:items-center sm:justify-between
          sm:px-8 sm:py-5
        "
      >
        <p className="text-center text-xs font-medium text-gray-400 sm:text-left sm:text-sm">
          Showing{" "}
          <span className="font-semibold text-charcoal">
            {start}-{end}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-charcoal">{total}</span>{" "}
          branches
        </p>

        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || loading}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#F3F4F6] text-gray-400 transition hover:text-[#46EC12] sm:size-10"
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
                  size-9 shrink-0 rounded-full text-xs font-semibold sm:size-10 sm:text-sm
                  ${
                    page === pageNumber
                      ? "bg-[#46EC12] font-bold text-charcoal shadow-sm"
                      : "border border-[#F3F4F6] text-[#9CA3AF] hover:text-[#46EC12]"
                  }
                `}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === safeTotalPages || loading}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#F3F4F6] text-gray-400 transition hover:text-[#46EC12] sm:size-10"
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
