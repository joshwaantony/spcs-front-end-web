


"use client";

import Sidebar from "@/components/(admin)/layout/Sidebar";

import GalleryHeader from "@/components/(admin)/gallery/GalleryHeader";
import GalleryTabs from "@/components/(admin)/gallery/GalleryTabs";
import GalleryToolbar from "@/components/(admin)/gallery/GalleryToolbar";
import MasonryGrid from "@/components/(admin)/gallery/MasonryGrid";
import Pagination from "@/components/(admin)/gallery/Pagination";
import UploadZone from "@/components/(admin)/gallery/UploadZone";

export default function GalleryPage() {
  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto p-6">

        {/* Optional top header (same style as News page header) */}
        <GalleryHeader />

        <div className="
          mt-6
          bg-white
          rounded-[24px]
          shadow-2xl shadow-charcoal/5
          dark:shadow-black/20
          overflow-hidden
          flex
          flex-col
        ">

          {/* Page Heading */}
          <div className="p-6 sm:p-8 lg:p-12 border-b border-[#F3F4F6]">
            <h1 className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-black
              tracking-tight
              mb-2
            ">
              Gallery Management
            </h1>

            <p className="text-gray-500 dark:text-gray-400 max-w-xl">
              Organize event photos and albums.
            </p>
          </div>

          {/* Page Content */}
          <div className="p-6 sm:p-8 lg:p-12 space-y-10">
            <GalleryToolbar />
            <UploadZone />
            <GalleryTabs />
            <MasonryGrid />
            <Pagination />
          </div>

        </div>
      </main>
    </div>
  );
}
