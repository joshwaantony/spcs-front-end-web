


"use client";

import Sidebar from "@/components/(admin)/layout/Sidebar";

import ScheduleEventForm from "@/components/(admin)/events/ScheduleEventForm";
import UpcomingEvents from "@/components/(admin)/events/UpcomingEvents";
import Header from "@/components/(admin)/events/Header";

export default function EventsPage() {
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
              Events Calendar
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Schedule book launches, cultural programs, and meetings.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-12 space-y-10">
            <ScheduleEventForm />
            <UpcomingEvents />
          </div>

     
        </div>
      </main>
    </div>
  );
}
