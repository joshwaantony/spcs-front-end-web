"use client";

import { useEffect } from "react";
import Breadcrumb from "@/components/(user)/book-store/Breadcrumb";
import Pagination from "@/components/(user)/book-store/Pagination";
import ProductGrid from "@/components/(user)/book-store/ProductGrid";
import SidebarFilters from "@/components/(user)/book-store/SidebarFilters";
import { useUserBookStore } from "@/store/user/bookstore/bookStore.store";

export default function CatalogPageShell({
  searchParams,
  basePath,
  currentPathLabel,
  title,
  subtitle,
  heroTone = "blue",
  lockedFormatType = "",
  emptyTitle,
  emptyDescription,
  pageToneClassName,
  blobOneClassName,
  blobTwoClassName,
}) {
  const books = useUserBookStore((state) => state.books);
  const total = useUserBookStore((state) => state.total);
  const totalPages = useUserBookStore((state) => state.totalPages);
  const categories = useUserBookStore((state) => state.categories);
  const filters = useUserBookStore((state) => state.filters);
  const loading = useUserBookStore((state) => state.loading);
  const error = useUserBookStore((state) => state.error);
  const fetchBooks = useUserBookStore((state) => state.fetchBooks);
  const fetchCategories = useUserBookStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchBooks(searchParams, {
      formatType: lockedFormatType || undefined,
    });
  }, [fetchBooks, lockedFormatType, searchParams]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden font-display text-[#111418] ${pageToneClassName}`}
    >
      <div className={`pointer-events-none absolute ${blobOneClassName}`} />
      <div className={`pointer-events-none absolute ${blobTwoClassName}`} />

      <main className="relative z-10 mx-auto max-w-[1400px] px-4 py-8 md:px-8">
        <Breadcrumb
          title={title}
          subtitle={subtitle}
          total={total}
          sort={filters.sort}
          basePath={basePath}
          currentQuery={filters}
          currentPathLabel={currentPathLabel}
          heroTone={heroTone}
        />

        <div className="flex flex-col items-start gap-7 lg:flex-row">
          <SidebarFilters
            categories={categories}
            currentQuery={filters}
            basePath={basePath}
            lockedFormatType={lockedFormatType}
          />
          <div className="flex-1">
            {error ? (
              <div className="mb-6 rounded-[22px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            ) : null}
            <ProductGrid
              books={books}
              loading={loading}
              emptyTitle={emptyTitle}
              emptyDescription={emptyDescription}
            />
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              basePath={basePath}
              currentQuery={filters}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
