"use client";

import Sidebar from "@/components/(admin)/layout/Sidebar";

import FeedbackHeader from "@/components/(admin)/feedback/FeedbackHeader";
import FeedbackToolbar from "@/components/(admin)/feedback/FeedbackToolbar";
import FeedbackList from "@/components/(admin)/feedback/FeedbackList";
import FeedbackPagination from "@/components/(admin)/feedback/FeedbackPagination";
import Header from "@/components/(admin)/feedback/Header";

export default function FeedbackPage() {
  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Header/>
        
        <div className="bg-white rounded-[24px] shadow-2xl shadow-charcoal/5 dark:shadow-black/20
                        overflow-hidden flex flex-col min-h-full">

          {/* Header */}
          <FeedbackHeader />

          {/* Toolbar */}
          <FeedbackToolbar />

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            <FeedbackList />
          </div>

          {/* Pagination */}
          <FeedbackPagination />

        </div>
      </main>
    </div>
  );
}
