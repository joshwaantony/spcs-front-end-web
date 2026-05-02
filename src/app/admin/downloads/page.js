



"use client";

import { useState } from "react";
import Sidebar from "@/components/(admin)/layout/Sidebar";

import Header from "@/components/(admin)/downloads/Header";
import UploadSection from "@/components/(admin)/downloads/UploadSection";
import ResourcesList from "@/components/(admin)/downloads/ResourcesList";
import StatsCards from "@/components/(admin)/downloads/StatsCards";

export default function DownloadsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto p-6">

        {/* Optional Top Header (same pattern as Gallery) */}
        <Header />

        {/* Main Card */}
        <div
          className="
            mt-6
            bg-white
            rounded-[24px]
            shadow-2xl shadow-charcoal/5
            overflow-hidden
            flex
            flex-col
          "
        >
          {/* Page Heading */}
          <div className="p-6 sm:p-8 lg:p-12 border-b border-[#F3F4F6]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
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
                  Downloads Manager
                </h1>

                <p className="text-[#7C8A60] max-w-3xl">
                  Manage public files, tender notices, and application forms.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="self-start lg:self-auto lg:ml-auto flex items-center gap-2 px-5 py-3 rounded-full bg-[#A6F20D] text-black font-bold text-sm hover:-translate-y-0.5 transition"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Create Download
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6 sm:p-8 lg:p-12 space-y-10">
            <ResourcesList />
          </div>
        </div>

        {/* Stats Cards – BELOW main card */}
        <StatsCards />

        <UploadSection
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      </main>
    </div>
  );
}
