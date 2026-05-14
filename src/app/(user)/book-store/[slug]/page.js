import { notFound } from "next/navigation";
import BookDetailView from "@/components/(user)/book-store/BookDetailView";
import { getPublicBookBySlug } from "@/services/user/book-store/books.api";

export default async function BookStoreDetailPage({ params }) {
  const { slug } = await params;

  try {
    const book = await getPublicBookBySlug(slug);

    if (!book?.id) {
      notFound();
    }

    return (
      <BookDetailView
        book={book}
        basePath="/book-store"
        currentPathLabel="Book Store"
        heroTone="blue"
      />
    );
  } catch {
    notFound();
  }
}
