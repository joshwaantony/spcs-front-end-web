"use client";

import { useFeedbackStore } from "@/store/admin/feedback/feedback.store";

export default function FeedbackToolbar() {
  const {
    inputSearch,
    setInputSearch,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    applySearch,
    loading,
  } = useFeedbackStore();

  return (
    <div
      className="
        bg-white border-b border-gray-100
        px-4 sm:px-6 md:px-8
        py-3 sm:py-4
        flex flex-col
        gap-3 sm:gap-4
      "
    >
      <div
        className="
          flex flex-col lg:flex-row
          w-full
          gap-3 sm:gap-4
        "
      >
        <div className="w-full lg:flex-1">
          <label className="flex w-full h-11">
            <div className="flex w-full items-stretch rounded-full bg-gray-100">
              <div className="flex items-center justify-center pl-4 text-muted-charcoal">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                value={inputSearch}
                onChange={(event) => setInputSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    applySearch();
                  }
                }}
                className="
                  form-input flex-1 border-none bg-transparent
                  focus:ring-0 px-3
                  text-charcoal placeholder:text-gray-500
                  text-sm font-medium
                "
                placeholder="Search by Email or Subject..."
              />
            </div>
          </label>
        </div>

        <div className="grid w-full lg:w-auto grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex h-11 items-center rounded-full bg-gray-100 px-4">
            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              className="form-input w-full border-none bg-transparent p-0 text-sm font-medium text-charcoal focus:ring-0"
            />
          </label>

          <label className="flex h-11 items-center rounded-full bg-gray-100 px-4">
            <input
              type="date"
              value={toDate}
              min={fromDate || undefined}
              onChange={(event) => setToDate(event.target.value)}
              className="form-input w-full border-none bg-transparent p-0 text-sm font-medium text-charcoal focus:ring-0"
            />
          </label>
        </div>

        <div
          className="
            flex w-full lg:w-auto
            items-center
            justify-between sm:justify-start
            gap-2 sm:gap-3
          "
        >
          <button
            type="button"
            onClick={applySearch}
            disabled={loading}
            className="
              flex flex-1 sm:flex-none
              h-11 items-center justify-center gap-x-2
              rounded-full bg-gray-100 px-4 sm:px-5
              hover:bg-gray-200 transition-colors
              disabled:opacity-60
            "
          >
            <p className="text-black text-sm font-semibold whitespace-nowrap">
              Search
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
