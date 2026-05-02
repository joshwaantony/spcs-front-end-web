"use client";

import BranchGrid from "@/components/(admin)/dashboard/branch/BranchGrid";
import BranchPagination from "@/components/(admin)/dashboard/branch/BranchPagination";
import NotificationGrid from "@/components/(admin)/dashboard/notification/NotificationGrid";
import NotificationPagination from "@/components/(admin)/dashboard/notification/NotificationPagination";
import SliderGrid from "@/components/(admin)/dashboard/SliderGrid";
import Pagination from "@/components/(admin)/dashboard/Pagination";

function SharedComingSoon({ tab }) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#d7e3c8] bg-[#fbfdf7] px-6 py-12 text-center shadow-[0_24px_70px_-32px_rgba(20,24,16,0.18)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
        Dashboard module
      </p>
      <h3 className="mt-3 text-2xl font-black text-[#141810]">
        {tab}
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-[#6B7280]">
        This tab now switches through a common dashboard component. Connect the
        {` ${tab.toLowerCase()} `}list and actions here when that module is ready.
      </p>
    </div>
  );
}

export default function DashboardTabContent({ activeTab }) {
  if (activeTab === "Slider") {
    return (
      <div className="flex flex-col gap-8">
        <SliderGrid />
        <Pagination />
      </div>
    );
  }

  if (activeTab === "Notifications") {
    return (
      <div className="flex flex-col gap-8">
        <NotificationGrid />
        <NotificationPagination />
      </div>
    );
  }

  if (activeTab === "Branches") {
    return (
      <div className="flex flex-col gap-8">
        <BranchGrid />
        <BranchPagination />
      </div>
    );
  }

  return <SharedComingSoon tab={activeTab} />;
}
