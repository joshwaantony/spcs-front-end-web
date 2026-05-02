import { useBulletinsStore } from "@/store/admin/bulletins/bulletins.store";

export default function Pagination({ onPageChange = () => {} }) {
  const { page, totalPages, search, limit, getBulletins } =
    useBulletinsStore();

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = async (newPage) => {
    await getBulletins(newPage, limit, search);
    onPageChange(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-10 sm:mt-12 flex justify-center px-4">
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
                     flex items-center justify-center
                     text-charcoal hover:bg-gray-100
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
            chevron_left
          </span>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => (
          pageNum === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-1 sm:px-2 text-gray-400 font-bold select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full
                          flex items-center justify-center
                          font-bold text-sm sm:text-base
                          transition-all
                          ${
                            pageNum === page
                              ? "bg-[#A6F20D] text-charcoal shadow-md"
                              : "text-charcoal hover:bg-gray-100"
                          }`}
            >
              {pageNum}
            </button>
          )
        ))}

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
                     flex items-center justify-center
                     text-charcoal hover:bg-gray-100
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
