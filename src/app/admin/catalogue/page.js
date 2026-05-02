"use client";

import { useState } from "react";
import Sidebar from "@/components/(admin)/layout/Sidebar";

import Header from "@/components/(admin)/catalogue/Header";
import PageHeader from "@/components/(admin)/catalogue/PageHeader";
import UploadSection from "@/components/(admin)/catalogue/UploadSection";
import CatalogGrid from "@/components/(admin)/catalogue/CatalogGrid";

export default function CatalogueLayout() {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal">
      <div className="flex h-screen overflow-hidden p-6 gap-6">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-3 overflow-hidden">

          {/* Top Header */}
          <Header />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="bg-white rounded-[24px] card-shadow p-4 sm:p-6 lg:p-8 space-y-8">

              {/* Page Header */}
              <PageHeader onCreateClick={() => setUploadModalOpen(true)} />

              {/* Catalog Grid */}
              <CatalogGrid />

            </div>
          </div>

        </main>
      </div>

      <UploadSection
        isOpen={isUploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
}
