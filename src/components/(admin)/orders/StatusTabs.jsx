



"use client";

import { useOrdersStore } from "@/store/admin/orders/orders.store";

const tabs = [
  "All",
  "Pending",
  "Fulfilled",
  "Shipped",
  "Completed",
  "Refunded",
  "Canceled",
];

export default function StatusTabs() {
  const { filter, setFilter, fetchOrders } = useOrdersStore();

  return (
    <div className="w-full mb-4 sm:mb-6 px-3 sm:px-4">
      
      {/* Scroll Container for Mobile */}
      <div className="overflow-x-auto scrollbar-hide">
        
        <div
          className="
            flex gap-2 sm:gap-3
            w-max sm:w-full
            sm:justify-start 
            py-1 sm:py-2
          "
        >
          {tabs.map((tab) => {
            const normalizedTab = tab.toLowerCase();
            const isActive = filter === normalizedTab;

            return (
              <button
                key={tab}
                onClick={() => {
                  setFilter(normalizedTab);
                  fetchOrders(1);
                }}
                className={`
                  h-9 sm:h-10 md:h-11
                  px-4 sm:px-5 md:px-6
                  rounded-full
                  text-xs sm:text-sm
                  whitespace-nowrap
                  transition-all duration-200
                  font-semibold
                  border
                  ${
                    isActive
                      ? "bg-[#46EC12] text-[#131811] border-[#46EC12] shadow-md scale-105"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                  }
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
