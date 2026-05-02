"use client";

import CustomerList from "@/components/(admin)/customer/CustomerList";
import FilterBar from "@/components/(admin)/customer/FilterBar";
import Header from "@/components/(admin)/customer/Header";
import Pagination from "@/components/(admin)/customer/Pagination";
import Sidebar from "@/components/(admin)/layout/Sidebar";


export default function CustomerPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal">
      <div className="flex h-screen overflow-hidden p-6 gap-6">
        <Sidebar />

        <main className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
          <Header />
          <FilterBar />
          <CustomerList />
          <Pagination />
        </main>
      </div>
    </div>
  );
}
