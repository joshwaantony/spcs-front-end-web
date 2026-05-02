import HeroSection from "@/components/(user)/krithi/HeroSection";
import Mission from "@/components/(user)/krithi/Mission";
import Initiative from "@/components/(user)/krithi/Initiative";
import Timeline from "@/components/(user)/krithi/Timeline";
import Highlights from "@/components/(user)/krithi/Highlights";
import Impact from "@/components/(user)/krithi/Impact";

export default function KrithiPage() {
  return (
    <main className="bg-background-light text-text-main font-display antialiased overflow-x-hidden">
      <HeroSection />
      <Mission />
      <Initiative />
      <Timeline />
      <Highlights />
      <Impact />
    </main>
  );
}
