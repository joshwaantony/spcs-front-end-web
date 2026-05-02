import Hero from "@/components/(user)/programs/event/Hero";
import PastHighlights from "@/components/(user)/programs/event/PastHighlights";
import UpcomingEvents from "@/components/(user)/programs/event/UpcomingEvents";


export default function EventPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#181311] dark:text-white transition-colors duration-300">
     
      <main>
        <Hero />
       <div className="bg-[#F8F6F6]">
         <UpcomingEvents />
       </div>
        <PastHighlights />
      </main>
    </div>
  );
}
