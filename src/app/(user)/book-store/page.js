import CatalogPageShell from "@/components/(user)/book-store/CatalogPageShell";

export default async function BookStorePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  return (
    <CatalogPageShell
      searchParams={resolvedSearchParams}
      basePath="/book-store"
      currentPathLabel="Book Store"
      title="Browse the full SPCS collection"
      subtitle="Browse physical books only, then refine by category, price, language, stock, discount, discovery badges, or print format."
      requestQueryOverrides={{ physicalOnly: true }}
      allowedFormats={["PAPERBACK", "HARDCOVER"]}
      hideDigitalToggle
      emptyTitle="No books matched these filters"
      emptyDescription="Try a broader search or adjust the print filters to discover more paperback and hardcover titles."
      pageToneClassName="bg-[linear-gradient(135deg,#f6f9ff_0%,#fbfcff_46%,#f7f9ff_100%)]"
      blobOneClassName="left-[-120px] top-[-120px] h-[520px] w-[520px] rounded-full bg-[#dce9ff] opacity-75 blur-[120px]"
      blobTwoClassName="bottom-[8%] right-[-80px] h-[420px] w-[420px] rounded-full bg-[#eef1ff] opacity-80 blur-[120px]"
    />
  );
}
