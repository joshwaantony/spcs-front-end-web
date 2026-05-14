"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookDetailView from "@/components/(user)/book-store/BookDetailView";
import { getPublicBookBySlug } from "@/services/user/book-store/books.api";

function DetailStateCard({ basePath, title, message }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,#f4f8ff_0%,#fbfdff_48%,#f5f7fb_100%)] px-4 py-10">
      <div className="mx-auto max-w-[1380px] rounded-[28px] border border-[#dfe6f0] bg-white p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.28)] sm:p-8">
        <Link
          href={basePath}
          className="inline-flex items-center rounded-full border border-[#e0e8f5] bg-white px-4 py-2 text-sm font-semibold text-[#50637d] transition hover:text-slate-900"
        >
          Back to shelf
        </Link>
        <div className="mt-6 rounded-[24px] border border-[#ebf0f7] bg-[#f8fbff] px-5 py-10 text-center sm:px-8">
          <h1 className="text-2xl font-black text-[#131821]">{title}</h1>
          <p className="mt-3 text-sm font-medium leading-7 text-[#617289]">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BookDetailPageClient({
  slug,
  basePath,
  currentPathLabel,
  heroTone = "blue",
}) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadBook() {
      setLoading(true);
      setError("");

      try {
        const nextBook = await getPublicBookBySlug(slug);

        if (!active) {
          return;
        }

        if (!nextBook?.id) {
          setBook(null);
          setError("not_found");
          return;
        }

        setBook(nextBook);
      } catch {
        if (!active) {
          return;
        }

        setBook(null);
        setError("failed");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBook();

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <DetailStateCard
        basePath={basePath}
        title="Loading book details"
        message="Fetching the latest book details from the catalog."
      />
    );
  }

  if (error === "not_found") {
    return (
      <DetailStateCard
        basePath={basePath}
        title="Book not found"
        message="This title could not be found in the current shelf."
      />
    );
  }

  if (error || !book) {
    return (
      <DetailStateCard
        basePath={basePath}
        title="Unable to load this book"
        message="Please try again in a moment."
      />
    );
  }

  return (
    <BookDetailView
      book={book}
      basePath={basePath}
      currentPathLabel={currentPathLabel}
      heroTone={heroTone}
    />
  );
}
