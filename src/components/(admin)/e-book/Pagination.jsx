



import React from "react";

function Pagination() {
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
          <span className="text-charcoal font-semibold">1–10</span>{" "}
          of{" "}
          <span className="text-charcoal font-semibold">240</span>{" "}
          orders
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

          {/* PAGE 1 */}
          <button
            className="
              size-9 sm:size-10
              rounded-full text-black
              bg-[#46EC12]
              text-charcoal
              font-bold
              text-xs sm:text-sm
              shadow-sm
              shrink-0
            "
          >
            1
          </button>

          {/* PAGE 2 */}
          <button
            className="
              size-9 sm:size-10
              rounded-full
              border border-[#F3F4F6]
              text-charcoal
              text-xs sm:text-sm
              font-semibold
              text-[#9CA3AF]
              hover:text-[#46EC12]
              transition
              shrink-0
            "
          >
            2
          </button>

          {/* PAGE 3 */}
          <button
            className="
              size-9 sm:size-10
              rounded-full
              border border-[#F3F4F6]
              text-charcoal
              text-xs sm:text-sm
              font-semibold
              text-[#9CA3AF]
              hover:text-[#46EC12]
              transition
              shrink-0
            "
          >
            3
          </button>

          {/* NEXT */}
          <button
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
