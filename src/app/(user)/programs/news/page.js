import FeaturedNews from "@/components/(user)/programs/news/FeaturedNews";
import NewsGrid from "@/components/(user)/programs/news/NewsGrid";
import PageHeader from "@/components/(user)/programs/news/PageHeader";
import Pagination from "@/components/(user)/programs/news/Pagination";


export default function NewsPage() {
  return (
    <main className="bg-background-light dark:bg-background-dark">

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <PageHeader />
        <FeaturedNews />
        <NewsGrid />
        <Pagination />
      </div>

    </main>
  );
}
