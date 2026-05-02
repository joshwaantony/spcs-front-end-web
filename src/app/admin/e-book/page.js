import EbookTable from "@/components/(admin)/e-book/EbookTable";
import FilterBar from "@/components/(admin)/e-book/FilterBar";
import Header from "@/components/(admin)/e-book/Header";
import Pagination from "@/components/(admin)/e-book/Pagination";
import Sidebar from "@/components/(admin)/layout/Sidebar";


export default function EbookPage() {
  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">
      <Sidebar />

      <main className="flex-1 flex flex-col gap-6 overflow-hidden">
        <Header />
        <FilterBar />

        <section className="flex-1   rounded-lg shadow-sm overflow-hidden flex flex-col gap-3">
          <EbookTable />
          <Pagination />
        </section>
      </main>
    </div>
  );
}
