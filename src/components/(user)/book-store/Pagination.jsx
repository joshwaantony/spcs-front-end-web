import Link from "next/link";
import { buildCatalogHref } from "./catalog.utils";

const getVisiblePages = (currentPage, totalPages) => {
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
};

export default function Pagination({ page, totalPages, basePath, currentQuery }) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="flex justify-center mt-14">
      <nav className="flex items-center gap-1 rounded-[20px] border border-white/80 bg-white px-3 py-2 shadow-[0_16px_45px_-32px_rgba(15,23,42,0.16)]">
        <Link
          aria-label="Previous page"
          href={buildCatalogHref(basePath, currentQuery, {
            page: Math.max(page - 1, 1),
          })}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
            page === 1
              ? "pointer-events-none text-slate-300"
              : "text-slate-500 hover:bg-[#f4f8ff]"
          }`}
        >
          ‹
        </Link>

        {visiblePages.map((visiblePage, index) => {
          const previousPage = visiblePages[index - 1];
          const shouldShowGap = previousPage && visiblePage - previousPage > 1;

          return (
            <div key={visiblePage} className="flex items-center gap-1">
              {shouldShowGap ? (
                <span className="flex h-9 w-7 items-center justify-center text-slate-400">
                  …
                </span>
              ) : null}
              <Link
                href={buildCatalogHref(basePath, currentQuery, {
                  page: visiblePage,
                })}
                className={`flex h-9 w-9 items-center justify-center rounded-full font-semibold transition ${
                  visiblePage === page
                    ? "bg-[#126DEC] text-white shadow-[0_10px_24px_-10px_rgba(18,109,236,0.85)]"
                    : "text-slate-500 hover:bg-[#f4f8ff]"
                }`}
              >
                {visiblePage}
              </Link>
            </div>
          );
        })}

        <Link
          aria-label="Next page"
          href={buildCatalogHref(basePath, currentQuery, {
            page: Math.min(page + 1, totalPages),
          })}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
            page === totalPages
              ? "pointer-events-none text-slate-300"
              : "text-slate-500 hover:bg-[#f4f8ff]"
          }`}
        >
          ›
        </Link>
      </nav>
    </div>
  );
}
