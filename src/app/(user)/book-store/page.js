import CatalogPageShell from "@/components/(user)/book-store/CatalogPageShell";

export default function BookStorePage({ searchParams }) {
  return (
    <CatalogPageShell
      searchParams={searchParams}
      basePath="/book-store"
      currentPathLabel="Book Store"
      title="Browse the full SPCS collection"
      subtitle="Filter by category, price, language, stock, discount, discovery badges, or format and move through the catalog with backend-aligned pagination."
      emptyTitle="No books matched these filters"
      emptyDescription="Try a broader search, adjust price or language filters, or jump into a dedicated format page like E-Books or Audiobooks."
      pageToneClassName="bg-[linear-gradient(135deg,#f6f9ff_0%,#fbfcff_46%,#f7f9ff_100%)]"
      blobOneClassName="left-[-120px] top-[-120px] h-[520px] w-[520px] rounded-full bg-[#dce9ff] opacity-75 blur-[120px]"
      blobTwoClassName="bottom-[8%] right-[-80px] h-[420px] w-[420px] rounded-full bg-[#eef1ff] opacity-80 blur-[120px]"
    />
  );
}
