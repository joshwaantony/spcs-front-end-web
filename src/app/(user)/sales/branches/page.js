import BranchGrid from "@/components/(user)/sales/branches/BranchGrid";
import HeadOffice from "@/components/(user)/sales/branches/HeadOffice";
import HeroSection from "@/components/(user)/sales/branches/HeroSection";


export default function BranchesPage() {
  return (
    <div className="bg-[#F6F8F8] text-[#111718] dark:text-white min-h-screen">
      <HeroSection />

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <HeadOffice />
        <BranchGrid />
      </main>

    </div>
  );
}
