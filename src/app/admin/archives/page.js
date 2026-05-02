


"use client";

import { useState } from "react";
import Sidebar from "@/components/(admin)/layout/Sidebar";
import ArchivesHeader from "@/components/(admin)/archives/ArchivesHeader";
import AddArchiveForm from "@/components/(admin)/archives/AddArchiveForm";
import ArchivesList from "@/components/(admin)/archives/ArchivesList";

export default function ArchivesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto p-6">

        {/* Top Header */}
        <ArchivesHeader />

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
          <div className="flex flex-col gap-5 border-b border-[#F3F4F6] p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:p-12">
            <div>
              <h1 className="mb-2 text-2xl font-black tracking-tight text-black sm:text-3xl md:text-4xl">
                Digital Archives
              </h1>

              <p className="max-w-3xl text-base text-gray-500 sm:text-lg">
                Manage past book lists, historical records, and digitized publications.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full bg-[#A6F20D] px-6 text-sm font-bold text-black transition hover:brightness-95 sm:h-12"
            >
              <span className="material-symbols-outlined text-[20px]">
                add
              </span>
              Create Archive
            </button>
          </div>

          {/* Page Content */}
          <div className="p-6 sm:p-8 lg:p-12">
            <ArchivesList />
          </div>
        </div>

        <AddArchiveForm
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      </main>
    </div>
  );
}
