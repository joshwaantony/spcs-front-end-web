"use client";

import { useState } from "react";
import SchemeCreateModal from "@/components/(admin)/schemes/SchemeCreateModal";

export default function SchemeForm() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-[24px] shadow-xl shadow-gray-200/50
                   p-5 sm:p-6 md:p-10 lg:p-12 mb-12"
      >
        <div
          className="flex flex-col lg:flex-row lg:items-end
                     justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl
                         font-black tracking-tight mb-3"
            >
              Schemes & Plans
            </h1>
            <p className="text-gray-500 text-base sm:text-lg">
              Manage monthly deposit schemes, membership tiers, and installment plans.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="self-start lg:self-auto lg:ml-auto
                       flex items-center gap-2 px-5 py-3
                       rounded-full bg-[#A6F20D] text-charcoal font-bold text-sm
                       hover:-translate-y-0.5 transition"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Create Schemes & Plans
          </button>
        </div>
      </div>

      <SchemeCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
}
