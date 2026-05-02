


"use client";

import { useState } from "react";
import Sidebar from "@/components/(admin)/layout/Sidebar";
import Header from "@/components/(admin)/ads/Header";
import CreateAdSection from "@/components/(admin)/ads/CreateAdSection";
import LiveAdsGrid from "@/components/(admin)/ads/LiveAdsGrid";

export default function AdsPage() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto p-6">

        {/* Top Header */}
        <Header />

        {/* Main Card */}
        <div
          className="
            mt-6
            bg-white
            rounded-3xl
            shadow-2xl shadow-charcoal/5
            overflow-hidden
            flex
            flex-col
          "
        >
          {/* Page Heading */}
          <div className="p-6 sm:p-8 lg:p-12 border-b border-[#F3F4F6]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <h1
                  className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-black
                    tracking-tight
                    mb-2
                  "
                >
                  Ads Manager
                </h1>

                <p className="text-[#7C8A60] max-w-3xl">
                  Create, manage and monitor live advertisements.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="
                  inline-flex items-center justify-center
                  rounded-full bg-[#A6F20D] px-5 py-3
                  text-sm font-black uppercase tracking-wide
                  text-zinc-900 shadow-lg shadow-primary/20
                  hover:bg-lime-300 transition-colors
                "
              >
                <span className="material-symbols-outlined mr-2">add</span>
                Create Ad
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6 sm:p-8 lg:p-12">
            <LiveAdsGrid />
          </div>
        </div>

        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
            <div className="w-full max-w-6xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between gap-4 border-b border-[#E5E7EB] p-5 sm:p-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Create New Ad
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200"
                  aria-label="Close create ad popup"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <CreateAdSection onCreated={closeCreateModal} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
