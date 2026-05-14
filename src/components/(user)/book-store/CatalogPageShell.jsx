"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/(user)/book-store/Breadcrumb";
import Pagination from "@/components/(user)/book-store/Pagination";
import ProductGrid from "@/components/(user)/book-store/ProductGrid";
import SidebarFilters from "@/components/(user)/book-store/SidebarFilters";
import { useUserBookStore } from "@/store/user/bookstore/bookStore.store";

const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function CatalogPageShell({
  searchParams,
  basePath,
  currentPathLabel,
  title,
  subtitle,
  heroTone = "blue",
  lockedFormatType = "",
  requestQueryOverrides,
  allowedFormats,
  hideDigitalToggle = false,
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
      ...requestQueryOverrides,
      formatType: lockedFormatType || requestQueryOverrides?.formatType || undefined,
      allowedFormats,
    });
  }, [allowedFormats, fetchBooks, lockedFormatType, requestQueryOverrides, searchParams]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`relative min-h-screen overflow-x-hidden font-display text-[#111418] ${pageToneClassName}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`pointer-events-none absolute ${blobOneClassName}`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.95, delay: 0.08, ease: "easeOut" }}
        className={`pointer-events-none absolute ${blobTwoClassName}`}
      />

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
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-auto"
          >
            <SidebarFilters
              categories={categories}
              currentQuery={filters}
              basePath={basePath}
              lockedFormatType={lockedFormatType}
              allowedFormats={allowedFormats}
              hideDigitalToggle={hideDigitalToggle}
            />
          </motion.div>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08, duration: 0.5, ease: "easeOut" }}
            className="flex-1"
          >
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-[22px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
              >
                {error}
              </motion.div>
            ) : null}

            <ProductGrid
              books={books}
              loading={loading}
              emptyTitle={emptyTitle}
              emptyDescription={emptyDescription}
              basePath={basePath}
            />

            <Pagination
              page={filters.page}
              totalPages={totalPages}
              basePath={basePath}
              currentQuery={filters}
            />
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
