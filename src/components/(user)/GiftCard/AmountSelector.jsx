"use client";

import { useState } from "react";

export default function AmountSelector() {
  const [selected, setSelected] = useState(250);
  const amounts = [250, 500, 1000, 2000];

  return (
    <section className="w-full mt-10">
      {/* Title */}
      <h2 className="flex items-center gap-3 mb-6 text-xl font-bold text-gray-900">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white text-sm font-bold">
          2
        </span>
        Select Amount
      </h2>

      {/* Amount Pills */}
      <div className="flex flex-wrap gap-4 mb-6">
        {amounts.map((amt) => {
          const isActive = selected === amt;

          return (
            <button
              key={amt}
              onClick={() => setSelected(amt)}
              className={`
                px-8 py-3 rounded-full
                text-base font-semibold
                transition-all duration-200
                ${
                  isActive
                    ? "bg-green-500 text-white shadow-md scale-[1.02]"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-green-400"
                }
              `}
            >
              ₹{amt}
            </button>
          );
        })}
      </div>

      {/* Custom Amount Input */}
      <input
        type="text"
        placeholder="₹ Enter Custom Amount"
        className="
          w-full max-w-sm
          px-5 py-3
          rounded-full
          border border-gray-300
          text-base
          placeholder-gray-400
          focus:outline-none
          focus:ring-2 focus:ring-green-400
          focus:border-green-400
        "
      />
    </section>
  );
}
