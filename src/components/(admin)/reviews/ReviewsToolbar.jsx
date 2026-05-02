"use client";

import { useReviewsStore } from "@/store/admin/reviews/reviews.store";

const filters = [
  { label: "All", value: "all" },

];

const ratings = [
  { label: "All Stars", value: "" },
  { label: "5 Stars", value: "5" },
  { label: "4 Stars", value: "4" },
  { label: "3 Stars", value: "3" },
  { label: "2 Stars", value: "2" },
  { label: "1 Star", value: "1" },
];

export default function ReviewsToolbar() {
  const {
    filter,
    setFilter,
    loading,
    inputRating,
    setInputRating,
    inputSearch,
    setInputSearch,
    applyFilters,
  } = useReviewsStore();

  return (
    <div className="bg-white flex flex-col gap-6 mb-8 pb-6 border-b border-[#E6EAD9]
                    lg:flex-row lg:items-center lg:justify-between">

      {/* Status Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            disabled={loading}
            className={`shrink-0 px-5 py-2.5 font-semibold rounded-full text-sm transition disabled:opacity-60 ${
              filter === item.value
                ? "bg-[#B6F300] text-[#1F2A12]"
                : "bg-[#F3F4F6] text-[#6E7C52] hover:bg-[#EAF1D8]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:justify-end sm:w-auto">
        
        {/* Rating Dropdown */}
        <select
          value={inputRating}
          onChange={(event) => setInputRating(event.target.value)}
          disabled={loading}
          className="px-5 py-2.5 bg-white border border-[#E6EAD9]
                     rounded-full text-sm font-medium text-[#55623B]
                     w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#B6F300]"
        >
          {ratings.map((item) => (
            <option key={item.value || "all"} value={item.value}>
              Rating: {item.label}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-4 top-1/2
                           -translate-y-1/2 text-[#8A9772]">
            search
          </span>
          <input
            type="text"
            value={inputSearch}
            onChange={(event) => setInputSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                applyFilters();
              }
            }}
            placeholder="Search by book or user..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#F9FAFB]
                       border border-[#E6EAD9]
                       rounded-full text-sm text-[#3E4A2D]
                       placeholder-[#8A9772]
                       focus:outline-none focus:ring-2 focus:ring-[#B6F300]"
          />
        </div>

        <button
          type="button"
          onClick={applyFilters}
          disabled={loading}
          className="px-5 py-2.5 bg-[#B6F300] text-[#1F2A12] font-semibold rounded-full text-sm disabled:opacity-60"
        >
          Search
        </button>
      </div>
    </div>
  );
}
