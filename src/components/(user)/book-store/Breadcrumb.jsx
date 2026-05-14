import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-10 rounded-[30px] bg-gradient-to-r ${toneClassName} px-5 py-6 md:px-8 md:py-8`}
    >
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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-black tracking-tight text-[#1a2230] md:text-5xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#667892] md:text-base">
            {subtitle}
          </p>
          <p className="mt-2 text-sm text-[#667892]">
            Showing <span className="font-bold text-[#126DEC]">{total}</span> titles
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.14, duration: 0.45, ease: "easeOut" }}
          className="flex items-center gap-3 self-start lg:self-auto"
        >
          <span className="text-sm font-medium text-[#667892]">Sort by:</span>
          <div className="group relative">
            <button className="flex items-center gap-2 rounded-full border border-white/80 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)] transition hover:border-[#c7d8f6] hover:text-slate-900">
              <span>{sort === "rank" ? "Best Selling" : "Newest"}</span>
              <ChevronDown size={15} className="transition group-hover:rotate-180" />
            </button>

            <div className="invisible absolute right-0 top-full z-20 mt-2 min-w-[190px] rounded-[18px] border border-[#e8eef8] bg-white p-2 opacity-0 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.26)] transition-all group-hover:visible group-hover:opacity-100">
              <SortOption
                href={buildCatalogHref(basePath, currentQuery, {
                  sort: "newest",
                  page: 1,
                })}
                label="Newest"
                active={sort === "newest"}
              />
              <SortOption
                href={buildCatalogHref(basePath, currentQuery, {
                  sort: "rank",
                  page: 1,
                })}
                label="Best Selling"
                active={sort === "rank"}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function SortOption({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-[14px] px-3 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-[#edf5ff] text-[#126DEC]"
          : "text-slate-600 hover:bg-[#f7faff] hover:text-slate-900"
      }`}
    >
      <span>{label}</span>
      {active ? <Check size={15} /> : null}
    </Link>
  );
}
