"use client";

import Sidebar from "@/components/(admin)/layout/Sidebar";

import Header from "@/components/(admin)/reviews/Header";
import ReviewsToolbar from "@/components/(admin)/reviews/ReviewsToolbar";
import ReviewsGrid from "@/components/(admin)/reviews/ReviewsGrid";
import ReviewsPagination from "@/components/(admin)/reviews/ReviewsPagination";

export default function ReviewsPage() {
  return (
    <div className="flex h-screen gap-6 p-6 bg-background-light dark:bg-background-dark">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Top Header */}
        <Header />

        {/* Content Card */}
        <div className="mt-6 bg-white rounded-[24px] shadow-2xl shadow-gray-200/50 dark:shadow-none p-6 sm:p-8 lg:p-12">
          
          {/* Page Heading */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h1
              className="
                text-black
                font-black
                tracking-tight
                mb-3
                text-2xl
                sm:text-3xl
                md:text-4xl
                lg:text-[2.75rem]
                leading-tight
              "
            >
              Review Moderation
            </h1>

            <p
              className="
                text-[#7C8A60]
                text-sm
                sm:text-base
                md:text-lg
                max-w-full
                sm:max-w-xl
                md:max-w-2xl
                leading-relaxed
              "
            >
              Manage user feedback, approve ratings, and moderate book content
              from the SPCS India community.
            </p>
          </div>

          {/* Toolbar */}
          <ReviewsToolbar />

          {/* Reviews */}
          <ReviewsGrid />

          {/* Pagination */}
          <ReviewsPagination />

        </div>
      </main>
    </div>
  );
}
