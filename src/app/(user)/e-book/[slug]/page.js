import BookDetailPageClient from "@/components/(user)/book-store/BookDetailPageClient";

export default async function EbookDetailPage({ params }) {
  const { slug } = await params;

  return (
    <BookDetailPageClient
      slug={slug}
      basePath="/e-book"
      currentPathLabel="E-Book"
      heroTone="blue"
    />
  );
}
