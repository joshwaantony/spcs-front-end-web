import BookDetailPageClient from "@/components/(user)/book-store/BookDetailPageClient";

export default async function BookStoreDetailPage({ params }) {
  const { slug } = await params;

  return (
    <BookDetailPageClient
      slug={slug}
      basePath="/book-store"
      currentPathLabel="Book Store"
      heroTone="blue"
    />
  );
}
