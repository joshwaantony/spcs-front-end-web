
import { useEffect, useMemo, useRef, useState } from "react";
import { useCategoryStore } from "@/store/admin/books/category.store";
import { useBooksStore } from "@/store/admin/books/books.store";

const filterOptions = [
  { label: "All Books", value: "all" },
  { label: "Bestsellers", value: "bestsellers" },
  { label: "Recently Added", value: "recent" },
];

const formatDateForApi = (value) => {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) {
    return "";
  }

  return `${day}-${month}-${year}`;
};

const formatDateForInput = (value) => {
  if (!value) {
    return "";
  }

  const [day, month, year] = value.split("-");

  if (!day || !month || !year) {
    return "";
  }

  return `${year}-${month}-${day}`;
};

export default function BookFilters({
  activeTab = "all",
  onTabChange = () => {},
  onOpenCreateBook = () => {},
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const {
    inputSearch,
    setInputSearch,
    applySearch,
    clearSearch,
  } = useCategoryStore();
  const {
    inputSearch: booksInputSearch,
    setInputSearch: setBooksInputSearch,
    applySearch: applyBooksSearch,
    clearSearch: clearBooksSearch,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    applyDateFilter,
    clearDateFilter,
    exporting,
    exportError,
    exportBooksCsv,
  } = useBooksStore();

  useEffect(() => {
    if (activeTab !== "category" && inputSearch) {
      clearSearch();
    }
  }, [activeTab, clearSearch, inputSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!filterRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeFilterLabel = useMemo(() => {
    return (
      filterOptions.find((option) => option.value === activeTab)?.label ||
      "Filter"
    );
  }, [activeTab]);

  const handleCategorySearchChange = (event) => {
    const value = event.target.value;

    if (activeTab === "category") {
      setInputSearch(value);
      return;
    }

    setBooksInputSearch(value);
  };

  const handleCategorySearchSubmit = (event) => {
    event.preventDefault();

    if (activeTab === "category") {
      applySearch();
      return;
    }

    applyBooksSearch();
  };

  const handleFilterSelect = (nextTab) => {
    if (activeTab === "category") {
      clearSearch();
    }

    onTabChange(nextTab);
    setIsFilterOpen(false);
  };

  const handleBooksDateSubmit = (event) => {
    event.preventDefault();
    applyDateFilter();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-[#141810]">
          Books
        </h1>

        {activeTab !== "category" && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenCreateBook}
              className="
                flex items-center justify-center gap-2
                h-11 px-6
                rounded-full
                bg-[#46EC12]
                text-[#141810]
                text-sm font-bold
                hover:brightness-110
                transition
                w-full sm:w-auto
              "
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Add New Book
            </button>

            <button
              type="button"
              onClick={exportBooksCsv}
              disabled={exporting}
              className="
                flex items-center justify-center gap-2
                h-11 px-6
                rounded-full
                bg-white
                border border-[#E5E7EB]
                text-[#141810]
                text-sm font-bold
                hover:bg-[#F9FAFB]
                transition
                w-full sm:w-auto
                disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              <span className="material-symbols-outlined text-lg">ios_share</span>
              {exporting ? "Exporting..." : "Export"}
            </button>
          </div>
        )}
      </div>
      {activeTab !== "category" && exportError ? (
        <p className="mb-4 text-sm font-medium text-red-600">{exportError}</p>
      ) : null}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        {/* Search */}
        <form
          onSubmit={handleCategorySearchSubmit}
          className="flex-1 min-w-full sm:min-w-[280px]"
        >
          <div
            className="
              flex items-center h-11
              rounded-full
              bg-[#f1f4f0]
              border border-transparent
              focus-within:border-[#46EC12]/50
              transition
            "
          >
            <span className="material-symbols-outlined text-[#7B7E7A] pl-4">
              search
            </span>
            <input
              type="text"
              value={activeTab === "category" ? inputSearch : booksInputSearch}
              onChange={handleCategorySearchChange}
              placeholder={
                activeTab === "category"
                  ? "Search categories..."
                  : "Search by Title, Author, or ISBN..."
              }
              className="
                flex-1 h-full bg-transparent
                border-none outline-none
                px-3
                text-sm font-medium
                placeholder:text-[#7B7E7A]
              "
            />
            <button
              type="submit"
              className="mr-2 rounded-full bg-[#46EC12] px-4 py-1.5 text-xs font-black text-[#141810] transition hover:opacity-90"
            >
              Search
            </button>
          </div>
        </form>

        {activeTab !== "category" && booksInputSearch && (
          <button
            type="button"
            onClick={clearBooksSearch}
            className="
              flex items-center justify-center gap-2
              h-11 px-5
              rounded-full
              bg-white
              border border-[#E5E7EB]
              text-[#141810]
              text-sm font-semibold
              hover:bg-[#F9FAFB]
              transition
              w-full sm:w-auto
            "
          >
            <span className="material-symbols-outlined text-[18px]">
              close
            </span>
            Clear
          </button>
        )}

        {activeTab !== "category" && (
          <form
            onSubmit={handleBooksDateSubmit}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <label className="flex h-11 items-center gap-2 rounded-full border border-transparent bg-[#f1f4f0] px-4 transition hover:border-[#D1D5DB]">
              <span className="material-symbols-outlined text-[20px] text-[#7B7E7A]">
                calendar_today
              </span>
              <input
                type="date"
                value={formatDateForInput(fromDate)}
                max={formatDateForInput(toDate) || undefined}
                onChange={(event) =>
                  setFromDate(formatDateForApi(event.target.value))
                }
                className="w-[132px] bg-transparent text-sm font-semibold text-[#141810] outline-none"
              />
            </label>

            <label className="flex h-11 items-center gap-2 rounded-full border border-transparent bg-[#f1f4f0] px-4 transition hover:border-[#D1D5DB]">
              <span className="material-symbols-outlined text-[20px] text-[#7B7E7A]">
                calendar_today
              </span>
              <input
                type="date"
                value={formatDateForInput(toDate)}
                min={formatDateForInput(fromDate) || undefined}
                onChange={(event) =>
                  setToDate(formatDateForApi(event.target.value))
                }
                className="w-[132px] bg-transparent text-sm font-semibold text-[#141810] outline-none"
              />
            </label>

            <button
              type="submit"
              className="
                flex h-11 items-center justify-center rounded-full bg-[#46EC12] px-5
                text-sm font-bold text-[#141810] transition hover:opacity-90
              "
            >
              Apply Dates
            </button>

            {(fromDate || toDate) && (
              <button
                type="button"
                onClick={clearDateFilter}
                className="
                  flex h-11 items-center justify-center rounded-full border border-[#E5E7EB]
                  bg-white px-5 text-sm font-semibold text-[#141810] transition hover:bg-[#F9FAFB]
                "
              >
                Clear Dates
              </button>
            )}
          </form>
        )}

        {activeTab !== "category" && (
          <div className="relative w-full sm:w-auto" ref={filterRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen((open) => !open)}
              className="
                flex h-11 w-full items-center justify-between gap-3 rounded-full
                border border-transparent bg-[#f1f4f0] px-5 transition hover:border-[#D1D5DB]
                sm:min-w-[220px]
              "
            >
              <span className="text-sm font-semibold text-[#141810]">
                Filter
              </span>
              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-semibold text-[#6B7280] sm:inline">
                  {activeFilterLabel}
                </span>
                <span className="material-symbols-outlined text-[20px] text-[#7B7E7A]">
                  expand_more
                </span>
              </div>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 z-20 mt-2 w-full min-w-[220px] overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white p-2 shadow-[0_20px_60px_-28px_rgba(20,24,16,0.28)]">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleFilterSelect(option.value)}
                    className={`flex w-full items-center justify-between rounded-[18px] px-4 py-3 text-left text-sm font-semibold transition ${
                      activeTab === option.value
                        ? "bg-[#eef8e0] text-[#496619]"
                        : "text-[#141810] hover:bg-[#f8faf7]"
                    }`}
                  >
                    <span>{option.label}</span>
                    {activeTab === option.value && (
                      <span className="material-symbols-outlined text-[18px]">
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
