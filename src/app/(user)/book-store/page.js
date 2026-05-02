import SidebarFilters from "@/components/(user)/book-store/SidebarFilters";
import ProductGrid from "@/components/(user)/book-store/ProductGrid";
import Breadcrumb from "@/components/(user)/book-store/Breadcrumb";
import Pagination from "@/components/(user)/book-store/Pagination";

export default function BookStorePage() {
  return (
    <div
      className="
        relative min-h-screen overflow-x-hidden font-display text-[#111418]
        bg-gradient-to-br from-[#F7FAFF] via-[#FDFDFF] to-[#F6F0FF]
      "
    >
      {/* Background blobs */}
      <div
        className="
          pointer-events-none absolute top-[-120px] left-[-120px]
          w-[520px] h-[520px] rounded-full
          bg-[#EAF2FF] opacity-70 blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none absolute bottom-[8%] right-[-80px]
          w-[420px] h-[420px] rounded-full
          bg-[#F3ECFF] opacity-70 blur-[120px]
        "
      />


      <main className="relative z-10 container mx-auto px-4 md:px-8 py-8 max-w-[1400px]">
        <Breadcrumb />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <SidebarFilters />
          <div className="flex-1">
            <ProductGrid />
            <Pagination />
          </div>
        </div>
      </main>

    </div>
  );
}
