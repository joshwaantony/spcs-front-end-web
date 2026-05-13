
import ProductCard from "./ProductCard";

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_18px_45px_-30px_rgba(20,31,56,0.15)]">
      <div className="h-[255px] animate-pulse bg-[linear-gradient(90deg,#f4f7fc_0%,#fbfcff_50%,#f4f7fc_100%)]" />
      <div className="space-y-3 px-4 pb-4 pt-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
        <div className="mt-6 flex items-center justify-between">
          <div className="h-8 w-20 animate-pulse rounded bg-slate-100" />
          <div className="h-11 w-11 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({
  books,
  loading,
  emptyTitle,
  emptyDescription,
}) {
  if (loading) {
    return (
      <section className="py-2">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (!books.length) {
    return (
      <section className="rounded-[30px] border border-dashed border-slate-200 bg-white/80 px-6 py-16 text-center shadow-[0_18px_60px_-36px_rgba(15,23,42,0.24)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
          No Matches
        </p>
        <h2 className="mt-3 text-2xl font-black text-slate-900">{emptyTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-slate-500">
          {emptyDescription}
        </p>
      </section>
    );
  }

  return (
    <section className="py-2">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {books.map((book) => (
          <ProductCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
