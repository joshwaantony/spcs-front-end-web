import { notFound } from "next/navigation";
import BookDetailView from "@/components/(user)/book-store/BookDetailView";
import { getPublicBookBySlug } from "@/services/user/book-store/books.api";

export default async function AudioBookDetailPage({ params }) {
  const { slug } = await params;

  try {
    const book = await getPublicBookBySlug(slug);

    if (!book?.id) {
      notFound();
    }

    return (
      <BookDetailView
        book={book}
        basePath="/audio-book"
        currentPathLabel="Audiobook"
        heroTone="amber"
      />
    );
  } catch {
    notFound();
  }
}
