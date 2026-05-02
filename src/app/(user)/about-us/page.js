import React from 'react';
import HeroSection from '@/components/(user)/about-us/HeroSection';
import StatsSection from '@/components/(user)/about-us/StatsSection';
import TimelineSection from '@/components/(user)/about-us/TimelineSection';
import FoundersSection from '@/components/(user)/about-us/FoundersSection';
import EcosystemSection from '@/components/(user)/about-us/EcosystemSection';
import LeadershipSection from '@/components/(user)/about-us/LeadershipSection';

export default function AboutUsPage() {
  return (
    // Wrapper div to apply body classes specifically for this page route
    <div className="bg-background-light dark:bg-background-dark text-[#111318] antialiased">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <main className="flex-1 flex flex-col items-center">
          <HeroSection />
          <StatsSection />
          <TimelineSection />
          <FoundersSection />
          <EcosystemSection />
          <LeadershipSection />
        </main>
      </div>
    </div>
  );
}



