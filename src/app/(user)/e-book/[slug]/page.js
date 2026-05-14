import { notFound } from "next/navigation";
import BookDetailView from "@/components/(user)/book-store/BookDetailView";
import { getPublicBookBySlug } from "@/services/user/book-store/books.api";

export default async function EbookDetailPage({ params }) {
  const { slug } = await params;

  try {
    const book = await getPublicBookBySlug(slug);

    if (!book?.id) {
      notFound();
    }

    return (
      <BookDetailView
        book={book}
        basePath="/e-book"
        currentPathLabel="E-Book"
        heroTone="emerald"
      />
    );
  } catch {
    notFound();
  }
}
