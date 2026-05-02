






"use client";

import { useSliderStore } from "@/store/admin/dashboard/slider.store";

function Pagination() {
  const { page, totalPages, total, limit, loading, fetchSliders } = useSliderStore();
  const safeTotalPages = Math.max(totalPages, 1);
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = total === 0 ? 0 : Math.min(page * limit, total);

  const handlePageChange = (p) => {
    if (p < 1 || p > safeTotalPages) return;
    fetchSliders(p);
  };

  return (
    <div className="px-4 sm:px-[25px]">
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
          <span className="text-charcoal font-semibold">
            {start}–{end}
          </span>{" "}
          of{" "}
          <span className="text-charcoal font-semibold">
            {total}
          </span>{" "}
          sliders
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
            "
          >
            <span className="material-symbols-outlined text-base sm:text-lg">
              chevron_left
            </span>
          </button>

          {/* PAGE NUMBERS */}
          {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              disabled={loading}
              className={`
                size-9 sm:size-10
                rounded-full
                text-xs sm:text-sm
                font-semibold
                shrink-0
                ${
                  page === p
                    ? "bg-[#46EC12] text-charcoal font-bold shadow-sm"
                    : "border border-[#F3F4F6] text-[#9CA3AF] hover:text-[#46EC12]"
                }
              `}
            >
              {p}
            </button>
          ))}

          {/* NEXT */}
          <button
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
