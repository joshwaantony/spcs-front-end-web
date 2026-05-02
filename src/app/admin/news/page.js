


"use client";

import Sidebar from "@/components/(admin)/layout/Sidebar";

import AddNewsForm from "@/components/(admin)/news/AddNewsForm";
import Header from "@/components/(admin)/news/Header";
import NewsGrid from "@/components/(admin)/news/NewsGrid";
import Pagination from "@/components/(admin)/news/Pagination";
import StatsBar from "@/components/(admin)/news/StatsBar";

export default function NewsPage() {
  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Header />

        <div className="mt-6 bg-white rounded-[24px] shadow-2xl shadow-charcoal/5 dark:shadow-black/20 overflow-hidden flex flex-col">
          
          {/* Page Heading */}
          <div className="p-6 sm:p-8 lg:p-12 border-b border-[#F3F4F6]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-2">
              News & Events Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create, curate, and manage literary announcements for the SPCS India community.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-12 space-y-10">
            <AddNewsForm />
            <NewsGrid />
            <Pagination />
          </div>

          {/* Footer Stats */}
          <StatsBar />
        </div>
      </main>
    </div>
  );
}
