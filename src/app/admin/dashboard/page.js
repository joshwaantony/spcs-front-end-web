"use client";

import { useState } from "react";
import Header from "@/components/(admin)/dashboard/Header";
import Sidebar from "@/components/(admin)/layout/Sidebar";
import StatCards from "@/components/(admin)/dashboard/StatCards";
import TabsHeader from "@/components/(admin)/dashboard/TabsHeader";
import DashboardTabContent from "@/components/(admin)/dashboard/DashboardTabContent";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("Slider");

  return (
    <div className="flex h-screen overflow-hidden p-6 gap-6 bg-background-light text-text-main font-display">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto pr-2">
        <div className="max-w-7xl mx-auto flex flex-col">
          <Header />
          <StatCards />
          <section className="flex flex-col gap-8">
            <TabsHeader activeTab={activeTab} onTabChange={setActiveTab} />
            <DashboardTabContent activeTab={activeTab} />
          </section>
        </div>
      </main>
    </div>
  );
}
