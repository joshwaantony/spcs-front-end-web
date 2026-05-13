
"use client";

import Link from "next/link";
import { Search, Sparkles, X } from "lucide-react";
import {
  buildCatalogHref,
  FLAG_FILTERS,
  FORMAT_FILTERS,
  isFilterActive,
} from "./catalog.utils";

export default function SidebarFilters({
  categories,
  currentQuery,
  basePath,
  lockedFormatType,
}) {
  const activeCategoryId = currentQuery.categoryId || "";
  const activeFormatType = lockedFormatType || currentQuery.formatType || "";
  const hasActiveFilters = Boolean(
    currentQuery.search ||
      currentQuery.categoryId ||
      (!lockedFormatType && currentQuery.formatType) ||
      currentQuery.minPrice !== "" ||
      currentQuery.maxPrice !== "" ||
      currentQuery.languageCode ||
      currentQuery.hasDiscount ||
      currentQuery.inStock ||
      currentQuery.isDigital ||
      FLAG_FILTERS.some(({ key }) => isFilterActive(currentQuery[key])) ||
      currentQuery.sort === "rank"
  );

  return (
    <aside className="self-start w-full lg:sticky lg:top-28 lg:w-[270px]">
      <div className="rounded-[26px] border border-white/80 bg-white p-5 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.2)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-[30px] font-black leading-none text-[#1a2230]">Filters</h3>
          </div>
          {hasActiveFilters ? (
            <Link
              href={basePath}
              className="text-sm font-semibold text-[#126DEC] hover:underline"
            >
              Reset
            </Link>
          ) : null}
        </div>

        <form action={basePath} className="mb-6">
          <input type="hidden" name="page" value="1" />
          {activeCategoryId ? (
            <input type="hidden" name="categoryId" value={activeCategoryId} />
          ) : null}
          {activeFormatType ? (
            <input type="hidden" name="formatType" value={activeFormatType} />
          ) : null}
          {FLAG_FILTERS.map(({ key }) =>
            isFilterActive(currentQuery[key]) ? (
              <input key={key} type="hidden" name={key} value="true" />
            ) : null
          )}
          {currentQuery.sort === "rank" ? (
            <input type="hidden" name="sort" value="rank" />
          ) : null}
          {currentQuery.minPrice !== "" ? (
            <input type="hidden" name="minPrice" value={currentQuery.minPrice} />
          ) : null}
          {currentQuery.maxPrice !== "" ? (
            <input type="hidden" name="maxPrice" value={currentQuery.maxPrice} />
          ) : null}
          {currentQuery.languageCode ? (
            <input type="hidden" name="languageCode" value={currentQuery.languageCode} />
          ) : null}
          {currentQuery.hasDiscount ? (
            <input type="hidden" name="hasDiscount" value="true" />
          ) : null}
          {currentQuery.inStock ? (
            <input type="hidden" name="inStock" value="true" />
          ) : null}
          {currentQuery.isDigital ? (
            <input type="hidden" name="isDigital" value="true" />
          ) : null}
          <label className="flex items-center gap-3 rounded-[18px] border border-[#edf1f7] bg-[#f8faff] px-4 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              type="search"
              name="search"
              defaultValue={currentQuery.search || ""}
              placeholder="Search by title or author"
              className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />
          </label>
        </form>

        {!lockedFormatType ? (
          <>
            <SectionLabel title="Format" />
            <div className="mb-6 flex flex-wrap gap-2">
              {FORMAT_FILTERS.map((format) => {
                const active = activeFormatType === format.key;

                return (
                  <Link
                    key={format.key}
                    href={
                      active
                        ? buildCatalogHref(basePath, currentQuery, {
                            formatType: undefined,
                            page: 1,
                          })
                        : buildCatalogHref(basePath, currentQuery, {
                            formatType: format.key,
                            page: 1,
                          })
                    }
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      active
                        ? "bg-slate-950 text-white"
                        : "border border-[#edf1f7] bg-white text-slate-600 hover:border-[#c8d7f2] hover:text-slate-900"
                    }`}
                  >
                    {format.label}
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <div className="mb-6 rounded-[20px] bg-[#126DEC] px-4 py-4 text-white shadow-[0_16px_40px_-28px_rgba(18,109,236,0.8)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              Format Focus
            </p>
            <p className="mt-2 text-base font-black">{activeFormatType}</p>
            <p className="mt-1 text-sm font-medium text-white/70">
              This page is curated specifically for this format.
            </p>
          </div>
        )}

        <SectionLabel title="Categories" />
        <div className="mb-6 flex flex-col gap-2">
          {categories.slice(0, 8).map((category) => {
            const active = activeCategoryId === category.id;

            return (
              <Link
                key={category.id}
                href={
                  active
                    ? buildCatalogHref(basePath, currentQuery, {
                        categoryId: undefined,
                        page: 1,
                      })
                    : buildCatalogHref(basePath, currentQuery, {
                        categoryId: category.id,
                        page: 1,
                      })
                }
                className={`flex items-center justify-between rounded-[16px] px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-[#126DEC] text-white"
                    : "text-[#617289] hover:bg-[#f7faff] hover:text-slate-900"
                }`}
              >
                <span>{category.name}</span>
                {active ? <X size={14} /> : <Sparkles size={14} />}
              </Link>
            );
          })}
        </div>

        <SectionLabel title="Price Range" />
        <form action={basePath} className="mb-6 space-y-3">
          <input type="hidden" name="page" value="1" />
          <PersistedQueryInputs
            currentQuery={currentQuery}
            excludeKeys={["minPrice", "maxPrice"]}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              name="minPrice"
              defaultValue={currentQuery.minPrice}
              placeholder="₹0"
              className="h-11 rounded-[16px] border border-[#edf1f7] bg-[#f8faff] px-4 text-sm font-semibold text-slate-800 outline-none focus:border-[#126DEC]"
            />
            <input
              type="number"
              min="0"
              name="maxPrice"
              defaultValue={currentQuery.maxPrice}
              placeholder="₹2000"
              className="h-11 rounded-[16px] border border-[#edf1f7] bg-[#f8faff] px-4 text-sm font-semibold text-slate-800 outline-none focus:border-[#126DEC]"
            />
          </div>
          <button className="w-full rounded-full border border-[#cfe0ff] bg-white py-2.5 text-sm font-bold text-[#126DEC] transition hover:border-[#126DEC] hover:bg-[#f3f8ff]">
            Apply Price
          </button>
        </form>

        <SectionLabel title="Language" />
        <form action={basePath} className="mb-6 space-y-3">
          <input type="hidden" name="page" value="1" />
          <PersistedQueryInputs
            currentQuery={currentQuery}
            excludeKeys={["languageCode"]}
          />
          <input
            type="text"
            name="languageCode"
            defaultValue={currentQuery.languageCode}
            placeholder="EN, ML..."
            className="h-11 w-full rounded-[16px] border border-[#edf1f7] bg-[#f8faff] px-4 text-sm font-semibold uppercase text-slate-800 outline-none focus:border-[#126DEC]"
          />
          <button className="w-full rounded-full border border-[#cfe0ff] bg-white py-2.5 text-sm font-bold text-[#126DEC] transition hover:border-[#126DEC] hover:bg-[#f3f8ff]">
            Apply Language
          </button>
        </form>

        <SectionLabel title="Availability" />
        <div className="mb-6 space-y-2">
          <ToggleLink
            label="In Stock Only"
            active={currentQuery.inStock}
            href={buildCatalogHref(basePath, currentQuery, {
              inStock: currentQuery.inStock ? undefined : true,
              page: 1,
            })}
          />
          <ToggleLink
            label="Discounted Titles"
            active={currentQuery.hasDiscount}
            href={buildCatalogHref(basePath, currentQuery, {
              hasDiscount: currentQuery.hasDiscount ? undefined : true,
              page: 1,
            })}
          />
          <ToggleLink
            label="Digital Only"
            active={currentQuery.isDigital}
            href={buildCatalogHref(basePath, currentQuery, {
              isDigital: currentQuery.isDigital ? undefined : true,
              page: 1,
            })}
          />
        </div>

        <SectionLabel title="Editorial Filters" />
        <div className="space-y-2">
          {FLAG_FILTERS.map((flag) => {
            const active = isFilterActive(currentQuery[flag.key]);

            return (
              <Link
                key={flag.key}
                href={
                  active
                    ? buildCatalogHref(basePath, currentQuery, {
                        [flag.key]: undefined,
                        page: 1,
                      })
                    : buildCatalogHref(basePath, currentQuery, {
                        [flag.key]: true,
                        page: 1,
                      })
                }
                className={`flex items-center justify-between rounded-[16px] border px-4 py-3 text-sm font-bold transition ${
                  active
                    ? "border-[#b8d4ff] bg-[#edf5ff] text-[#126DEC]"
                    : "border-[#edf1f7] bg-white text-slate-600 hover:border-[#d8e1f1]"
                }`}
              >
                <span>{flag.label}</span>
                <span className="text-xs uppercase tracking-[0.18em]">
                  {active ? "On" : "Off"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function SectionLabel({ title }) {
  return (
    <p className="mb-3 text-sm font-bold text-[#111418]">
      {title}
    </p>
  );
}

function PersistedQueryInputs({ currentQuery, excludeKeys = [] }) {
  return Object.entries(currentQuery).map(([key, value]) => {
    if (excludeKeys.includes(key) || key === "page") {
      return null;
    }

    if (value === "" || value === false || value === undefined || value === null) {
      return null;
    }

    return <input key={key} type="hidden" name={key} value={String(value)} />;
  });
}

function ToggleLink({ label, active, href }) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-[16px] border px-4 py-3 text-sm font-bold transition ${
        active
          ? "border-[#b8d4ff] bg-[#edf5ff] text-[#126DEC]"
          : "border-[#edf1f7] bg-white text-slate-600 hover:border-[#d8e1f1]"
      }`}
    >
      <span>{label}</span>
      <span className="text-xs uppercase tracking-[0.18em]">
        {active ? "On" : "Off"}
      </span>
    </Link>
  );
}
