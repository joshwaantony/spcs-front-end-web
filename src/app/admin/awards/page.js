
"use client";

import { useState } from "react";
import AddAwardForm from "@/components/(admin)/awards/AddAwardForm";
import AwardsGrid from "@/components/(admin)/awards/AwardsGrid";
import Header from "@/components/(admin)/awards/Header";
import Sidebar from "@/components/(admin)/layout/Sidebar";


export default function AwardsPage() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Header />

        <div className="mt-6 bg-white rounded-[24px] shadow-2xl shadow-charcoal/5 dark:shadow-black/20 overflow-hidden flex flex-col">
          
          {/* Page Heading */}
          <div className="p-5 sm:p-6 md:p-8 lg:p-12 border-b border-[#F3F4F6]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1
                  className="
                    text-xl
                    sm:text-2xl
                    md:text-3xl
                    lg:text-4xl
                    xl:text-[40px]
                    font-extrabold
                    tracking-tight
                    text-charcoal
                    leading-tight
                    mb-2
                  "
                >
                  Awards & Recognitions
                </h1>

                <p
                  className="
                    text-sm
                    sm:text-base
                    md:text-lg
                    text-gray-500
                    dark:text-gray-400
                    max-w-2xl
                  "
                >
                  Manage literary prizes, winners, and certificates.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="h-11 sm:h-12 px-6 rounded-full bg-[#A6F20D] text-black text-sm sm:text-base font-black hover:brightness-95 transition-all"
              >
                Create Award
              </button>
            </div>
          </div>


          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-12 space-y-10">
            <AwardsGrid />
          </div>


        </div>
        <AddAwardForm
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />

      </main>
    </div>
  );
}
