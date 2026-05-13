import CatalogPageShell from "@/components/(user)/book-store/CatalogPageShell";

export default function EbookPage({ searchParams }) {
  return (
    <CatalogPageShell
      searchParams={searchParams}
      basePath="/e-book"
      currentPathLabel="E-Book"
      title="Instant reads for every screen"
      subtitle="Explore E-Books with a polished digital shelf, subtle motion, and complete filters for price, language, discounts, and digital-first discovery."
      heroTone="emerald"
      lockedFormatType="EBOOK"
      emptyTitle="No E-Books found right now"
      emptyDescription="Try removing a category, price, or language filter to broaden the digital shelf."
      pageToneClassName="bg-[linear-gradient(145deg,#f2fff9_0%,#f7fffd_48%,#e7fff4_100%)]"
      blobOneClassName="left-[-80px] top-[-60px] h-[420px] w-[420px] rounded-full bg-[#b7f5d9] opacity-60 blur-[120px]"
      blobTwoClassName="bottom-[10%] right-[-60px] h-[360px] w-[360px] rounded-full bg-[#d0fff0] opacity-70 blur-[120px]"
    />
  );
}
