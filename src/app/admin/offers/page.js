


"use client";

import { useState } from "react";
import Sidebar from "@/components/(admin)/layout/Sidebar";

import ActiveCampaigns from "@/components/(admin)/offers/ActiveCampaigns";
import AddOfferSection from "@/components/(admin)/offers/AddOfferSection";
import FooterStats from "@/components/(admin)/offers/FooterStats";
import OffersHeader from "@/components/(admin)/offers/OffersHeader";

export default function OffersPage() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <OffersHeader />

        <div className="mt-6 bg-white  rounded-[24px] shadow-2xl shadow-charcoal/5 dark:shadow-black/20 overflow-hidden flex flex-col">
          
          {/* Page Title */}
       <div className="p-5 sm:p-6 md:p-8 lg:p-12 border-b border-[#F3F4F6] ">
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
    
    {/* Title Section */}
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
        Offers & Banners
      </h1>
      <p className="mt-1 text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400">
        Manage homepage sliders and promotional images.
      </p>
    </div>

    <button
      type="button"
      onClick={() => setCreateModalOpen(true)}
      className="
        w-full sm:w-auto
        h-11 sm:h-12
        flex items-center justify-center gap-2
        px-5 sm:px-6
        bg-[#A6F20D]
        rounded-full
        text-sm sm:text-base font-black text-black
        hover:brightness-95
        transition
      "
    >
      <span className="material-symbols-outlined text-base">
        add_circle
      </span>
      Create Offer
    </button>

  </div>
</div>


          <ActiveCampaigns />
          {/* <FooterStats /> */}
        </div>

        <AddOfferSection
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      </main>
    </div>
  );
}
