



export default function Pagination() {
  return (
    <div className="mt-10 sm:mt-16 flex justify-center px-4">
      <nav
        className="
          inline-flex items-center gap-1
          bg-[#F9FAFB]
          p-1 sm:p-1.5
          rounded-full
          border border-gray-200/60
          shadow-sm
        "
      >
        {/* Previous */}
        <button
          className="
            w-8 h-8 sm:w-10 sm:h-10
            flex items-center justify-center
            rounded-full
            text-gray-500
            hover:bg-gray-100
            transition
          "
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[22px]">
            chevron_left
          </span>
        </button>

        {/* Active page */}
        <button
          className="
            w-8 h-8 sm:w-10 sm:h-10
            flex items-center justify-center
            rounded-full
            bg-[#A6F20D]
            text-charcoal
            font-black
            text-xs sm:text-sm
          "
        >
          1
        </button>

        {/* Pages – hidden on mobile */}
        <div className="hidden sm:flex items-center gap-1">
          <button className="w-10 h-10 rounded-full text-gray-500 font-bold hover:bg-gray-100">
            2
          </button>
          <button className="w-10 h-10 rounded-full text-gray-500 font-bold hover:bg-gray-100">
            3
          </button>
        </div>

        {/* Ellipsis */}
        <span className="px-1 sm:px-2 text-gray-400 font-bold">
          …
        </span>

        {/* Last page */}
        <button
          className="
            w-8 h-8 sm:w-10 sm:h-10
            flex items-center justify-center
            rounded-full
            text-gray-500
            font-bold
            hover:bg-gray-100
          "
        >
          12
        </button>

        {/* Next */}
        <button
          className="
            w-8 h-8 sm:w-10 sm:h-10
            flex items-center justify-center
            rounded-full
            text-gray-500
            hover:bg-gray-100
            transition
          "
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[22px]">
            chevron_right
          </span>
        </button>
      </nav>
    </div>
  );
}
