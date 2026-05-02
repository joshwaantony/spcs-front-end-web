import BankDetails from "@/components/(user)/sales/scheme/BankDetails";
import HeroSection from "@/components/(user)/sales/scheme/HeroSection";
import HowItWorks from "@/components/(user)/sales/scheme/HowItWorks";
import PlanCard from "@/components/(user)/sales/scheme/PlanCard";


export default function SchemePage() {
  return (
    <main className="bg-[#F6F8F7] min-h-screen transition-colors">
      {/* <Header /> */}

      <div className="relative overflow-hidden pb-24">
        <div className="organic-blob top-[-100px] left-[-200px]" />
        <div className="organic-blob bottom-[-100px] right-[-200px] opacity-50" />

        <HeroSection />
        <PlanCard />
        <HowItWorks />
        <BankDetails />
      </div>

      {/* <Footer /> */}
    </main>
  );
}
