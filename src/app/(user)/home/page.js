import Hero from "@/components/(user)/landing/Hero";
import Ticker from "@/components/(user)/landing/Ticker";
import EventBanner from "@/components/(user)/landing/EventBanner";
import LimitedOffers from "@/components/(user)/landing/LimitedOffers";
import NewArrivals from "@/components/(user)/landing/NewArrivals";
import Categories from "@/components/(user)/landing/Categories";
import TopSellers from "@/components/(user)/landing/TopSellers";
import MediaSection from "@/components/(user)/landing/MediaSection";
import BulletinSection from "@/components/(user)/landing/BulletinSection";
import Founders from "@/components/(user)/landing/Founders";
import AboutSection from "@/components/(user)/landing/AboutSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Ticker />
      <EventBanner />
      <LimitedOffers />
      <NewArrivals />
      <Categories />
      <TopSellers />
      <MediaSection />
      <BulletinSection />
      <Founders />
      <AboutSection />
    </main>
  );
}