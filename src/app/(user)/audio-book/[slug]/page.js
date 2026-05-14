import BookDetailPageClient from "@/components/(user)/book-store/BookDetailPageClient";

export default async function AudioBookDetailPage({ params }) {
  const { slug } = await params;

  return (
    <BookDetailPageClient
      slug={slug}
      basePath="/audio-book"
      currentPathLabel="Audiobook"
      heroTone="blue"
    />
  );
}
