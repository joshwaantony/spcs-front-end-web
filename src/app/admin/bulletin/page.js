"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/(admin)/layout/Sidebar";
import { useBulletinsStore } from "@/store/admin/bulletins/bulletins.store";

import BulletinHeader from "@/components/(admin)/bulletin/BulletinHeader";
import Header from "@/components/(admin)/bulletin/Header";
import MagazineGrid from "@/components/(admin)/bulletin/MagazineGrid";
import Pagination from "@/components/(admin)/bulletin/Pagination";
import PublishIssue from "@/components/(admin)/bulletin/PublishIssue";

export default function BulletinPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { page, limit, search, getBulletins } = useBulletinsStore();

  useEffect(() => {
    // Initial fetch
    getBulletins(1, 10, "").catch((error) => {
      console.error("Error fetching bulletins:", error);
    });
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal">
      <div className="flex h-screen overflow-hidden p-6 gap-6">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-3 overflow-hidden">

          {/* Top Header */}
          <BulletinHeader />

          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="bg-white rounded-[24px] card-shadow p-4 sm:p-6 lg:p-8 space-y-8">

              <Header onOpenCreate={() => setIsCreateOpen(true)} />

              <MagazineGrid />
              <Pagination />

            </div>
          </div>

        </main>
      </div>

      {isCreateOpen ? (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px]"
            onClick={() => setIsCreateOpen(false)}
          />
          <div className="fixed inset-0 z-[70] overflow-y-auto p-4 sm:p-6">
            <div className="flex min-h-full items-center justify-center">
              <div className="w-full max-w-5xl">
                <div className="mb-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#4B5563] shadow hover:bg-gray-100"
                    aria-label="Close"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      close
                    </span>
                  </button>
                </div>
                <PublishIssue
                  onCreated={async () => {
                    await getBulletins(page, limit, search);
                    setIsCreateOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
