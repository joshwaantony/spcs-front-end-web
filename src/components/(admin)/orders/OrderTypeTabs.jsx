"use client";

import Link from "next/link";

const ORDER_TYPE_TABS = [
  { label: "Book", href: "/admin/orders/book" },
  { label: "Ebook", href: "/admin/orders/ebook" },
  { label: "Audiobook", href: "/admin/orders/audiobook" },
];

export default function OrderTypeTabs({ activeType = "Book" }) {
  return (
    <div className="mb-4 px-3 sm:px-4">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex w-max gap-2 py-1 sm:w-full sm:justify-start sm:gap-3 sm:py-2 ">
          {ORDER_TYPE_TABS.map((tab) => {
            const isActive = tab.label === activeType;

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`
                  h-10 whitespace-nowrap rounded-full border px-5 text-sm font-semibold
                  flex items-center justify-center transition-all duration-200
                  ${
                    isActive
                      ? "scale-105 border-[#46EC12] bg-[#46EC12] text-[#131811] shadow-md"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:shadow-sm"
                  }
                `}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
