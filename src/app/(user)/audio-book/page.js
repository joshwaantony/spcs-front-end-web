import CatalogPageShell from "@/components/(user)/book-store/CatalogPageShell";

export default function AudioBookPage({ searchParams }) {
  return (
    <CatalogPageShell
      searchParams={searchParams}
      basePath="/audio-book"
      currentPathLabel="Audiobook"
      title="Stories designed for listening"
      subtitle="Discover audiobooks in the same airy catalog pattern, tuned with warm tones and complete filters for price, language, stock, and discount-based discovery."
      heroTone="amber"
      lockedFormatType="AUDIO"
      emptyTitle="No audiobooks matched this view"
      emptyDescription="Broaden the category, price, or language filters to compare more listening-ready titles."
      pageToneClassName="bg-[linear-gradient(145deg,#fff7e8_0%,#fffdf8_50%,#ffe8c7_100%)]"
      blobOneClassName="left-[-90px] top-[-70px] h-[430px] w-[430px] rounded-full bg-[#ffd59e] opacity-55 blur-[120px]"
      blobTwoClassName="bottom-[6%] right-[-60px] h-[340px] w-[340px] rounded-full bg-[#ffe8b9] opacity-75 blur-[120px]"
    />
  );
}
