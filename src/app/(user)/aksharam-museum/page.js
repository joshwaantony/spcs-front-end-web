import FeaturesSection from "@/components/(user)/aksharam-museum/FeaturesSection";
import HeroSection from "@/components/(user)/aksharam-museum/HeroSection";
import LocationSection from "@/components/(user)/aksharam-museum/LocationSection";
import VideoSection from "@/components/(user)/aksharam-museum/VideoSection";
import VisionSection from "@/components/(user)/aksharam-museum/VisionSection";


export default function AksharamMuseumPage() {
  return (
    <main className="bg-background-light text-[#111813] font-display antialiased overflow-x-hidden">
      <HeroSection />
      <VisionSection />
      <FeaturesSection />
      <VideoSection />
      <LocationSection />
    </main>
  );
}
