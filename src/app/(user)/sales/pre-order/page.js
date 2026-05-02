import BookCard from "@/components/(user)/sales/pre-order/BookCard";
import HeroSection from "@/components/(user)/sales/pre-order/HeroSection";
import ProcessSection from "@/components/(user)/sales/pre-order/ProcessSection";
import SubscriptionSection from "@/components/(user)/sales/pre-order/SubscriptionSection";
import UpcomingGrid from "@/components/(user)/sales/pre-order/UpcomingGrid";

export default function PreOrderPage() {
  return (
    <main className="bg-[#F7F6F8] dark:bg-background-dark font-display text-[#141118] dark:text-white transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20 pb-20">
        <HeroSection />
        <ProcessSection />
        {/* <BookCard/> */}
        <UpcomingGrid />
        <SubscriptionSection />
      </div>
      
    </main>
  );
}
