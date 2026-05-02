import GalleryFilters from "@/components/(user)/programs/gallery/GalleryFilters";
import GalleryGrid from "@/components/(user)/programs/gallery/GalleryGrid";
import GalleryHero from "@/components/(user)/programs/gallery/GalleryHero";
import GalleryPagination from "@/components/(user)/programs/gallery/GalleryPagination";


export default function GalleryPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-white transition-colors duration-300">
      <GalleryHero />
      <GalleryFilters />
      <GalleryGrid />
      <GalleryPagination />
    </div>
  );
}
