


"use client";

import { ChevronDown, Plus } from "lucide-react";

export default function SidebarFilters() {
  return (
    <aside className="w-full lg:w-80 lg:sticky lg:top-28 self-start">
      <div className="bg-white rounded-2xl shadow-soft border border-[#F6F7FB] p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg text-[#111418]">Filters</h3>
          <button className="text-sm text-[#126DEC] font-semibold hover:underline">
            Reset
          </button>
        </div>

        {/* Categories */}
        <details open className="group">
          <summary className="flex items-center justify-between cursor-pointer font-bold text-sm text-[#111418]">
            Categories
            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
          </summary>

          <div className="mt-4 space-y-3 text-sm text-[#617289]">
            {["Novels", "Poetry", "History", "Children's Lit", "Drama"].map(
              (item, index) => (
                <label
                  key={item}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked={index === 0}
                    className="h-4 w-4 rounded-md border-gray-300 text-[#126DEC] focus:ring-[#126DEC]"
                  />
                  {item}
                </label>
              )
            )}

            <button className="flex items-center gap-1 text-[#126DEC] text-sm font-bold pt-1">
              Show More <Plus className="w-4 h-4" />
            </button>
          </div>
        </details>

        <hr className="my-6" />

        {/* Price Range */}
        <details open className="group">
          <summary className="flex items-center justify-between cursor-pointer font-bold text-sm text-[#111418]">
            Price Range
            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
          </summary>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between text-sm text-[#617289]">
              <span className="px-3 py-1 bg-gray-100 rounded-lg">₹0</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg">₹2000</span>
            </div>

            <input
              type="range"
              min="0"
              max="2000"
              className="w-full accent-[#126DEC]"
            />

            <button className="w-full py-2.5 rounded-full border border-[#126DEC] text-[#126DEC] font-semibold hover:bg-[#126DEC] hover:text-white transition">
              Apply Price
            </button>
          </div>
        </details>

        <hr className="my-6" />

        {/* In Stock Only – SWITCH */}
        <div className="flex items-center justify-between text-sm font-bold text-[#111418]">
          <span>In Stock Only</span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />

            {/* Track */}
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#126DEC] transition-colors"></div>

            {/* Thumb */}
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>

      </div>
    </aside>
  );
}
