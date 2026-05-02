


"use client";

import { useState } from "react";
import Sidebar from "@/components/(admin)/layout/Sidebar";
import BookHeader from "@/components/(admin)/books/BookHeader";
import BookFilters from "@/components/(admin)/books/BookFilters";
import BookTabs from "@/components/(admin)/books/BookTabs";
import BookGrid from "@/components/(admin)/books/BookGrid";
import Pagination from "@/components/(admin)/books/Pagination";
import CategoryList from "@/components/(admin)/books/CategoryList";
import BookCreateModal from "@/components/(admin)/books/BookCreateModal";


export default function BookPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateBookOpen, setIsCreateBookOpen] = useState(false);

  return (
    <div className="bg-background-light min-h-screen text-charcoal">
      <div className="flex h-screen overflow-hidden p-6 gap-6">
        
     
        <Sidebar />


        <main className="flex-1 flex flex-col gap-3 overflow-hidden">
          
          <BookHeader />

          <div className="flex-1 overflow-y-auto">
            <div className="bg-white rounded-[24px]  p-4 sm:p-6">
              <BookFilters
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onOpenCreateBook={() => setIsCreateBookOpen(true)}
              />
              <BookTabs active={activeTab} onTabChange={setActiveTab} />
              {activeTab === "category" ? (
                <div className="pt-8">
                  <CategoryList />
                </div>
              ) : (
                <>
                  <BookGrid activeTab={activeTab} />
                  <Pagination activeTab={activeTab} />
                </>
              )}
            </div>
          </div>

        </main>
      </div>

      <BookCreateModal
        isOpen={isCreateBookOpen}
        onClose={() => setIsCreateBookOpen(false)}
      />
    </div>
  );
}
