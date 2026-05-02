import DocumentList from "@/components/(user)/programs/downloads/DocumentList";
import FilterChips from "@/components/(user)/programs/downloads/FilterChips";
import PageHeader from "@/components/(user)/programs/downloads/PageHeader";


export default function DownloadPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#F6F7F8] text-[#111418] dark:text-white antialiased">
      <main className="flex-1 ">
        <div className="bg-[#EDF2F7]">
            <PageHeader />
        </div>
        
        <div className="max-w-[960px] mx-auto px-10 py-10 space-y-8 ">
          <FilterChips />
          <DocumentList />
        </div>
      </main>
    </div>
  );
}
