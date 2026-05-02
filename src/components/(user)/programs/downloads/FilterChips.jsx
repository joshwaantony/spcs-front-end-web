


"use client";

export default function FilterChips() {
  const filters = ["Tenders", "Forms", "Notices", "Reports"];

  return (
    <div
      className="
        w-full
        flex
        gap-3
        py-4
        overflow-x-auto
        sm:flex-wrap
        scrollbar-hide
      "
    >
      {/* Active */}
      <button
        className="
          shrink-0
          h-9
          sm:h-10
          md:h-11
          px-4
          sm:px-6
          md:px-7
          rounded-full
          bg-[#2B8CEE]
          text-white
          text-sm
          sm:text-base
          font-semibold
          shadow-md
          whitespace-nowrap
        "
      >
        All Documents
      </button>

      {/* Inactive */}
      {filters.map((filter) => (
        <button
          key={filter}
          className="
            shrink-0
            h-9
            sm:h-10
            md:h-11
            px-4
            sm:px-6
            md:px-7
            rounded-full
            bg-white
            border
            border-gray-200
            text-[#111418]
            text-sm
            sm:text-base
            font-medium
            hover:bg-gray-50
            transition
            whitespace-nowrap
          "
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
