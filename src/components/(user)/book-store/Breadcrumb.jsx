import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { buildCatalogHref } from "./catalog.utils";

export default function Breadcrumb({
  title,
  subtitle,
  total,
  sort,
  basePath,
  currentQuery,
  currentPathLabel,
  heroTone = "blue",
}) {
  const toneClassName =
    heroTone === "amber"
      ? "from-[#fdf7eb] via-[#fffdf9] to-[#fff5de]"
      : heroTone === "emerald"
        ? "from-[#eefcf6] via-[#fbfffd] to-[#e8fff5]"
        : "from-[#edf4ff] via-[#fbfdff] to-[#f7f9ff]";

  return (
    <section className={`mb-10 rounded-[30px] bg-gradient-to-r ${toneClassName} px-5 py-6 md:px-8 md:py-8`}>
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm font-medium text-[#5f7494]">
          <Link href="/home" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/book-store" className="hover:text-slate-900">
            Store
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-900">{currentPathLabel}</span>
      </nav>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#1a2230] md:text-5xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#667892] md:text-base">
            {subtitle}
          </p>
          <p className="mt-2 text-sm text-[#667892]">
            Showing <span className="font-bold text-[#126DEC]">{total}</span> titles
          </p>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-auto">
          <span className="text-sm font-medium text-[#667892]">Sort by:</span>
          <div className="flex items-center rounded-full border border-white/80 bg-white px-1.5 py-1 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)]">
            <Link
              href={buildCatalogHref(basePath, currentQuery, {
                sort: "newest",
                page: 1,
              })}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                sort === "newest"
                  ? "bg-[#126DEC] text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Newest
            </Link>
            <Link
              href={buildCatalogHref(basePath, currentQuery, {
                sort: "rank",
                page: 1,
              })}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                sort === "rank"
                  ? "bg-[#126DEC] text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Best Selling
              <ChevronDown size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
