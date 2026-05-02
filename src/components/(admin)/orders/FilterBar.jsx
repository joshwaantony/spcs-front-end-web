// export default function FilterBar() {
//   return (
//     <div className="px-4 mb-8">
//       <div className="bg-white rounded-xl p-3 shadow-sm flex items-center justify-between border border-[#F3F4F6]">
//         <div className="flex items-center flex-1 max-w-xl">
//           <span className="material-symbols-outlined text-gray-400 pl-4 pr-3">
//             search
//           </span>
//           <input
//             className="w-full bg-transparent text-sm placeholder:text-gray-400 focus:ring-0"
//             placeholder="Search by Order ID, Customer Name..."
//           />
//         </div>

//         <div className="flex items-center gap-3">
//           <select className="bg-gray-50 text-black rounded-full px-6 py-2.5 text-sm font-semibold">
//             <option>Select Date</option>
//             <option>Last 7 Days</option>
//             <option>Last 30 Days</option>
//           </select>

//           <button className="bg-charcoal bg-[#1F2838] text-white dark:text-charcoal rounded-full px-8 py-2.5 text-sm font-bold shadow-lg flex items-center gap-2">
//             <span className="material-symbols-outlined text-lg">
//               filter_list
//             </span>
//             Filter
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useOrdersStore } from "@/store/admin/orders/orders.store";

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
    inputQuery,
    fromDate,
    toDate,
    setInputQuery,
    setFromDate,
    setToDate,
    applyFilters,
    loading,
  } = useOrdersStore();

  return (
    <div className="px-3 sm:px-4 mb-6 sm:mb-8">
      <div
        className="
          bg-white
          rounded-xl
          p-3 sm:p-4
          shadow-sm
          border border-[#F3F4F6]
          flex flex-col lg:flex-row
          gap-3
          lg:items-center
          lg:justify-between
        "
      >
        {/* 🔍 Search Section */}
        <div
          className="
            flex items-center
            bg-gray-50
            rounded-full
            w-full
            lg:max-w-xl
            border border-gray-100
          "
        >
          <span className="material-symbols-outlined text-gray-400 pl-4 pr-3 text-[20px]">
            search
          </span>

          <input
            type="text"
            placeholder="Search by Order ID, Customer Name..."
            value={inputQuery}
            onChange={(event) => setInputQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                applyFilters();
              }
            }}
            className="
              w-full
              bg-transparent
              text-sm
              py-2.5
              pr-4
              placeholder:text-gray-400
              focus:outline-none
            "
          />
        </div>

        {/* 📅 Date + Filter Button */}
        <div
          className="
            flex flex-col sm:flex-row
            gap-3
            w-full
            lg:w-auto
          "
        >
          <input
            type="date"
            value={fromDate ? fromDate.split("-").reverse().join("-") : ""}
            onChange={(event) =>
              setFromDate(formatDateForApi(event.target.value))
            }
            className="
              w-full sm:w-auto
              bg-gray-50
              text-black
              rounded-full
              px-5
              py-2.5
              text-sm
              font-semibold
              border border-gray-200
              focus:outline-none
              focus:ring-2
              focus:ring-gray-200
            "
          />

          <input
            type="date"
            value={toDate ? toDate.split("-").reverse().join("-") : ""}
            onChange={(event) =>
              setToDate(formatDateForApi(event.target.value))
            }
            className="
              w-full sm:w-auto
              bg-gray-50
              text-black
              rounded-full
              px-5
              py-2.5
              text-sm
              font-semibold
              border border-gray-200
              focus:outline-none
              focus:ring-2
              focus:ring-gray-200
            "
          />

          <button
            type="button"
            onClick={() => applyFilters()}
            disabled={loading}
            className="
              w-full sm:w-auto
              bg-[#1F2838]
              text-white
              rounded-full
              px-6 sm:px-8
              py-2.5
              text-sm
              font-bold
              shadow-md
              hover:opacity-90
              transition
              flex items-center justify-center gap-2
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            <span className="material-symbols-outlined text-[18px]">
              filter_list
            </span>
            {loading ? "Loading..." : "Filter"}
          </button>
        </div>
      </div>
    </div>
  );
}
