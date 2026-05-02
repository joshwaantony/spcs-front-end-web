"use client";

import { useCustomersStore } from "@/store/admin/customers/customers.store";

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

export default function FilterBar() {
  const {
    inputSearch,
    fromDate,
    toDate,
    loading,
    exporting,
    exportError,
    setInputSearch,
    setFromDate,
    setToDate,
    applyFilters,
    exportCustomersCsv,
  } = useCustomersStore();

  return (
    <div
      className="
        bg-white
        p-4
        rounded-[20px]
        shadow-sm
        border border-[#F3F4F6]
        flex flex-col gap-4
        lg:flex-row lg:items-center
        mb-6
      "
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:flex-1">

        {/* SEARCH */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Name, Mobile, or Pincode..."
            value={inputSearch}
            onChange={(event) => setInputSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                applyFilters();
              }
            }}
            className="
              w-full
              pl-11 pr-4 py-2.5
              bg-[#F9FAFB]
              border border-[#F3F4F6]
              rounded-full
              text-sm
              focus:ring-1 focus:ring-[#46EC12]
            "
          />
        </div>

        {/* DATE WRAPPER */}
        <div className="flex gap-3 sm:gap-4">

          {/* FROM DATE */}
          <div className="relative w-full sm:w-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-[#6B7280]">
              From
            </span>
            <input
              type="date"
              value={fromDate ? fromDate.split("-").reverse().join("-") : ""}
              onChange={(event) =>
                setFromDate(formatDateForApi(event.target.value))
              }
              className="
                w-full
                pl-14 pr-4 py-2.5
                bg-[#F9FAFB]
                border border-[#F3F4F6]
                rounded-full
                text-sm
                text-[#1F2838]
              "
            />
          </div>

          {/* TO DATE */}
          <div className="relative w-full sm:w-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-[#6B7280]">
              To
            </span>
            <input
              type="date"
              value={toDate ? toDate.split("-").reverse().join("-") : ""}
              onChange={(event) =>
                setToDate(formatDateForApi(event.target.value))
              }
              className="
                w-full
                pl-12 pr-4 py-2.5
                bg-[#F9FAFB]
                border border-[#F3F4F6]
                rounded-full
                text-sm
                text-[#1F2838]
              "
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
        <button
          type="button"
          onClick={() => applyFilters()}
          disabled={loading}
          className="
            bg-[#46EC12]
            text-[#1F2838]
            font-bold
            text-sm
            px-8 py-2.5
            rounded-full
            flex items-center justify-center gap-2
            w-full lg:w-auto
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          <span className="material-symbols-outlined text-lg">
            filter_alt
          </span>
          {loading ? "Loading..." : "Apply Filters"}
        </button>

        <button
          type="button"
          onClick={() => exportCustomersCsv()}
          disabled={exporting}
          className="
            border border-[#D7F7CD]
            bg-[#F3FEEA]
            text-[#1F2838]
            font-bold
            text-sm
            px-8 py-2.5
            rounded-full
            flex items-center justify-center gap-2
            w-full lg:w-auto
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          <span className="material-symbols-outlined text-lg">
            download
          </span>
          {exporting ? "Exporting..." : "Export CSV"}
        </button>
      </div>

      {exportError ? (
        <p className="w-full text-sm font-medium text-red-600 lg:basis-full">
          {exportError}
        </p>
      ) : null}
    </div>
  );
}
