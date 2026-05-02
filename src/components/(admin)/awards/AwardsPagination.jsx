"use client";

const getVisiblePages = (currentPage, totalPages) => {
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    pages.push(pageNumber);
  }

  return pages;
};

export default function AwardsPagination({
  page,
  totalPages,
  total = 0,
  limit = 10,
  currentCount = 0,
  label = "awards",
  onPageChange = () => {},
  disabled = false,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(page, totalPages);
  const start = total > 0 ? (page - 1) * limit + 1 : 0;
  const end = total > 0 ? Math.min((page - 1) * limit + currentCount, total) : 0;

  return (
    <div className="mt-8 rounded-[20px] border border-[#e7ece7] bg-[#f8faf7] px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm sm:text-[17px] font-medium text-[#8c97a6]">
          Showing {start}-{end} of {total} {label}
        </p>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={disabled || page <= 1}
            className="size-11 sm:size-12 rounded-full border border-[#dbe2db] bg-white text-[#8c97a6] hover:bg-[#f2f5f2] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Previous page"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              disabled={disabled}
              className={`size-11 sm:size-12 rounded-full text-lg font-bold transition flex items-center justify-center ${
                pageNumber === page
                  ? "bg-[#39e600] text-black"
                  : "border border-[#dbe2db] bg-white text-[#8c97a6] hover:bg-[#f2f5f2]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={disabled || page >= totalPages}
            className="size-11 sm:size-12 rounded-full border border-[#dbe2db] bg-white text-[#8c97a6] hover:bg-[#f2f5f2] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Next page"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
