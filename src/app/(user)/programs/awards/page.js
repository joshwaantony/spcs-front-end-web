import AwardAbout from "@/components/(user)/programs/awards/AwardAbout";
import AwardHero from "@/components/(user)/programs/awards/AwardHero";
import AwardStats from "@/components/(user)/programs/awards/AwardStats";
import CeremonyHighlights from "@/components/(user)/programs/awards/CeremonyHighlights";
import WinnerSpotlight from "@/components/(user)/programs/awards/WinnerSpotlight";


export default function AwardPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <AwardHero />
      <AwardAbout />
      <div className="bg-[#F8F8F6]">
              <AwardStats />

      </div>
      <WinnerSpotlight />
      <CeremonyHighlights />
    </div>
  );
}
