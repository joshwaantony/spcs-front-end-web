export default function GalleryPagination() {
  return (
    <div
      className="
        mt-16 sm:mt-20 lg:mt-28
        flex flex-wrap justify-center items-center
        gap-2 sm:gap-3 md:gap-4 mb-20
      "
    >
      {/* Previous */}
      <button
        className="
          w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
          flex items-center justify-center
          rounded-full
          bg-white
          border border-[#E5E7EB]
          text-black
          shadow-sm
          transition-all
          hover:text-[#12D442]
          hover:scale-105
        "
      >
        <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl">
          chevron_left
        </span>
      </button>

      {/* Pages */}
      {[1, 2, 3].map((n) => (
        <button
          key={n}
          className={`
            w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
            flex items-center justify-center
            rounded-full
            text-sm sm:text-base md:text-lg
            font-semibold
            shadow-sm
            transition-all
            ${
              n === 1
                ? "bg-[#12D442] text-white scale-105 shadow-md"
                : "bg-white border border-[#E5E7EB] text-black hover:text-[#12D442] hover:scale-105"
            }
          `}
        >
          {n}
        </button>
      ))}

      {/* Dots (hide on very small screens if needed) */}
      <span className="hidden sm:inline px-1 sm:px-2 text-lg sm:text-xl text-gray-400 select-none">
        ...
      </span>

      {/* Last Page */}
      <button
        className="
          w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
          flex items-center justify-center
          rounded-full
          text-sm sm:text-base md:text-lg
          font-semibold
          bg-white
          border border-[#E5E7EB]
          text-black
          shadow-sm
          transition-all
          hover:text-[#12D442]
          hover:scale-105
        "
      >
        12
      </button>

      {/* Next */}
      <button
        className="
          w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
          flex items-center justify-center
          rounded-full
          bg-white
          border border-[#E5E7EB]
          text-black
          shadow-sm
          transition-all
          hover:text-[#12D442]
          hover:scale-105
        "
      >
        <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl">
          chevron_right
        </span>
      </button>
    </div>
  );
}
