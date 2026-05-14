"use client";

import Link from "next/link";
import { Flame, Sparkles, Tag, Zap } from "lucide-react";
import { buildCatalogHref, isFilterActive } from "./catalog.utils";

export default function ImportantFiltersBar({
  basePath,
  currentQuery,
  hideDigitalToggle,
}) {
  const items = [
    {
      key: "inStock",
      label: "In Stock",
      description: "Ready to order now",
      icon: <Zap size={16} />,
      active: currentQuery.inStock,
      href: buildCatalogHref(basePath, currentQuery, {
        inStock: currentQuery.inStock ? undefined : true,
        page: 1,
      }),
    },
    {
      key: "hasDiscount",
      label: "Discounted",
      description: "Offers you can grab",
      icon: <Tag size={16} />,
      active: currentQuery.hasDiscount,
      href: buildCatalogHref(basePath, currentQuery, {
        hasDiscount: currentQuery.hasDiscount ? undefined : true,
        page: 1,
      }),
    },
    {
      key: "isFeatured",
      label: "Staff Picks",
      description: "Editorially highlighted",
      icon: <Sparkles size={16} />,
      active: isFilterActive(currentQuery.isFeatured),
      href: buildCatalogHref(basePath, currentQuery, {
        isFeatured: isFilterActive(currentQuery.isFeatured) ? undefined : true,
        page: 1,
      }),
    },
    {
      key: "isNewArrival",
      label: "New Arrivals",
      description: "Freshly added titles",
      icon: <Flame size={16} />,
      active: isFilterActive(currentQuery.isNewArrival),
      href: buildCatalogHref(basePath, currentQuery, {
        isNewArrival: isFilterActive(currentQuery.isNewArrival)
          ? undefined
          : true,
        page: 1,
      }),
    },
  ];

  if (!hideDigitalToggle) {
    items.push({
      key: "isDigital",
      label: "Digital Only",
      description: "Read or listen instantly",
      icon: <Zap size={16} />,
      active: currentQuery.isDigital,
      href: buildCatalogHref(basePath, currentQuery, {
        isDigital: currentQuery.isDigital ? undefined : true,
        page: 1,
      }),
    });
  }

  return (
    <div className="mb-5 rounded-[24px] border border-white/80 bg-white/95 p-3.5 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.25)] backdrop-blur-sm sm:mb-6 sm:rounded-[26px] sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
        
          <h3 className="mt-1 text-lg font-black leading-tight text-[#111418] min-[360px]:text-xl">
            Pick the fastest way to narrow the shelf
          </h3>
        </div>
        <p className="text-[13px] font-medium leading-6 text-[#6b7d96] sm:text-sm">
          These shortcuts help shoppers reach the right books faster.
        </p>
      </div>

      <div className="mt-4 -mx-1.5 overflow-x-auto px-1.5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 2xl:grid-cols-5">
        <div className="flex gap-3 pr-1 sm:contents">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`group min-w-[220px] snap-start rounded-[20px] border px-4 py-4 transition first:ml-0 sm:min-w-0 sm:rounded-[22px] ${
              item.active
                ? "border-[#bfd7ff] bg-[linear-gradient(135deg,#126DEC_0%,#3d8bff_100%)] text-white shadow-[0_20px_36px_-26px_rgba(18,109,236,0.7)]"
                : "border-[#e7edf7] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-[#111418] hover:-translate-y-1 hover:border-[#cfe0ff] hover:shadow-[0_18px_36px_-28px_rgba(18,109,236,0.28)]"
            }`}
          >
            <div
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl transition min-[360px]:h-11 min-[360px]:w-11 ${
                item.active
                  ? "bg-white/16 text-white"
                  : "bg-[#eef5ff] text-[#126DEC] group-hover:bg-[#dfeaff]"
              }`}
            >
              {item.icon}
            </div>
            <p className="mt-4 text-[13px] font-black uppercase tracking-[0.16em] min-[360px]:text-sm">
              {item.label}
            </p>
            <p
              className={`mt-1 text-[13px] font-medium leading-5 min-[360px]:leading-6 ${
                item.active ? "text-white/78" : "text-[#6b7d96]"
              }`}
            >
              {item.description}
            </p>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
