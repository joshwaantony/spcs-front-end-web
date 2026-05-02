"use client";

import { useEffect } from "react";
import Sidebar from "@/components/(admin)/layout/Sidebar";
import FilterBar from "@/components/(admin)/orders/FilterBar";
import Header from "@/components/(admin)/orders/Header";
import OrdersTable from "@/components/(admin)/orders/OrdersTable";
import Pagination from "@/components/(admin)/orders/Pagination";
import StatusTabs from "@/components/(admin)/orders/StatusTabs";
import { useOrdersStore } from "@/store/admin/orders/orders.store";

export default function OrdersPageContent({ activeType = "Book" }) {
  const { section, setSection, fetchOrders } = useOrdersStore();
  const normalizedSection = activeType.toLowerCase();

  useEffect(() => {
    if (section !== normalizedSection) {
      setSection(normalizedSection);
    }
  }, [normalizedSection, section, setSection]);

  useEffect(() => {
    if (section === normalizedSection) {
      fetchOrders(1);
    }
  }, [section, normalizedSection, fetchOrders]);

  return (
    <div className="flex h-screen gap-6 bg-background-light p-6 dark:bg-background-dark">
      <Sidebar />

      <main className="flex flex-1 flex-col overflow-y-auto pr-6 py-6">
        <Header />
        {/* <OrderTypeTabs activeType={activeType} /> */}
        <StatusTabs />
        <FilterBar />
        <OrdersTable />
        <Pagination />
      </main>
    </div>
  );
}
