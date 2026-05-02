


export default function Pagination() {
  return (
    <div className="mt-8 sm:mt-12 flex justify-center px-2">
      <nav
        className="
          flex items-center
          bg-gray-100
          p-1.5
          rounded-full
          shadow-sm
          max-w-full
          overflow-x-auto
        "
      >
        {/* Prev */}
        <button
          className="
            w-9 h-9 sm:w-10 sm:h-10
            flex items-center justify-center
            rounded-full
            hover:bg-gray-200
            text-black
            transition-colors
            shrink-0
          "
        >
          <span className="material-symbols-outlined text-[20px] leading-none">
            chevron_left
          </span>
        </button>

        {/* Pages */}
        <div className="flex px-2 sm:px-4 gap-1 shrink-0">

          {/* Active */}
          <button
            className="
              w-9 h-9 sm:w-10 sm:h-10
              flex items-center justify-center
              rounded-full
              bg-[#A6F20D]
              text-black
              font-semibold
              text-sm
              tabular-nums
              leading-none
            "
          >
            1
          </button>

          {/* Page 2 */}
          <button
            className="
              w-9 h-9 sm:w-10 sm:h-10
              flex items-center justify-center
              rounded-full
              hover:bg-gray-200
              text-black
              font-semibold
              text-sm
              tabular-nums
              leading-none
              transition-colors
            "
          >
            2
          </button>

          {/* Page 3 */}
          <button
            className="
              hidden xs:flex
              w-9 h-9 sm:w-10 sm:h-10
              flex items-center justify-center
              rounded-full
              hover:bg-gray-200
              text-black
              font-semibold
              text-sm
              tabular-nums
              leading-none
              transition-colors
            "
          >
            3
          </button>

          {/* Ellipsis */}
          <span
            className="
              hidden sm:flex
              w-9 h-9 sm:w-10 sm:h-10
              items-center justify-center
              text-gray-400
              text-sm
              leading-none
            "
          >
            …
          </span>

          {/* Last Page */}
          <button
            className="
              hidden sm:flex
              w-9 h-9 sm:w-10 sm:h-10
              flex items-center justify-center
              rounded-full
              hover:bg-gray-200
              text-black
              font-semibold
              text-sm
              tabular-nums
              leading-none
              transition-colors
            "
          >
            12
          </button>
        </div>

        {/* Next */}
        <button
          className="
            w-9 h-9 sm:w-10 sm:h-10
            flex items-center justify-center
            rounded-full
            hover:bg-gray-200
            text-black
            transition-colors
            shrink-0
          "
        >
          <span className="material-symbols-outlined text-[20px] leading-none">
            chevron_right
          </span>
        </button>
      </nav>
    </div>
  );
}
