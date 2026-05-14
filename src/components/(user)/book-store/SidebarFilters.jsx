"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  X,
  SlidersHorizontal,
  BadgeIndianRupee,
  Languages,
  PackageCheck,
  Tags,
  ChevronDown,
} from "lucide-react";
import {
  buildCatalogHref,
  FLAG_FILTERS,
  FORMAT_FILTERS,
  isFilterActive,
} from "./catalog.utils";

const DEFAULT_OPEN_SECTIONS = {
  search: true,
  format: true,
  category: true,
  budget: true,
  language: true,
  availability: true,
  curated: true,
};

export default function SidebarFilters({
  categories,
  currentQuery,
  basePath,
  lockedFormatType,
  allowedFormats,
  hideDigitalToggle,
}) {
  const [openSections, setOpenSections] = useState(DEFAULT_OPEN_SECTIONS);
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

  const toggleSection = (sectionKey) => {
    setOpenSections((current) => ({
      ...current,
      [sectionKey]: !current[sectionKey],
    }));
  };

  return (
    <aside className="w-full self-start lg:sticky lg:top-28 lg:w-[270px]">
      <div className="rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.2)]">
        <div className="mb-6 rounded-[22px] bg-[linear-gradient(135deg,#f7faff_0%,#eef4ff_100%)] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#126DEC] shadow-[0_12px_20px_-16px_rgba(18,109,236,0.8)]">
                <SlidersHorizontal size={18} />
              </div>
              <h3 className="mt-3 text-[24px] font-black leading-none text-[#1a2230]">
                Refine Your Shelf
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-[#6b7d96]">
                Start with a title, then narrow by format, budget, language, or
                availability.
              </p>
            </div>
          </div>
          {hasActiveFilters ? (
            <Link
              href={basePath}
              className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#126DEC] shadow-[0_10px_20px_-16px_rgba(18,109,236,0.65)] transition hover:-translate-y-0.5"
            >
              Clear all
            </Link>
          ) : null}
        </div>

        <AccordionSection
          title="Search books"
          description="Look up a book title, author, or keyword."
          icon={<Search size={14} />}
          isOpen={openSections.search}
          onToggle={() => toggleSection("search")}
        >
          <form action={basePath} className="space-y-0">
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
              <input
                type="hidden"
                name="languageCode"
                value={currentQuery.languageCode}
              />
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
        </AccordionSection>

        {!lockedFormatType ? (
          <AccordionSection
            title="Choose a format"
            description="Pick the edition that suits how you want to read."
            icon={<PackageCheck size={14} />}
            isOpen={openSections.format}
            onToggle={() => toggleSection("format")}
          >
            <div className="flex flex-wrap gap-2">
              {FORMAT_FILTERS.filter((format) =>
                Array.isArray(allowedFormats) && allowedFormats.length > 0
                  ? allowedFormats.includes(format.key)
                  : true
              ).map((format) => {
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
          </AccordionSection>
        ) : (
          <div className="mb-4 rounded-[20px] bg-[#126DEC] px-4 py-4 text-white shadow-[0_16px_40px_-28px_rgba(18,109,236,0.8)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              Curated Format
            </p>
            <p className="mt-2 text-base font-black">{activeFormatType}</p>
            <p className="mt-1 text-sm font-medium text-white/70">
              This page is already focused on this reading format, so you can
              browse faster.
            </p>
          </div>
        )}

        <AccordionSection
          title="Browse by category"
          description="Jump straight into the kind of books you want."
          icon={<Sparkles size={14} />}
          isOpen={openSections.category}
          onToggle={() => toggleSection("category")}
        >
          <div className="flex flex-col gap-2">
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
        </AccordionSection>

        <AccordionSection
          title="Set your budget"
          description="Show books within the price range you want."
          icon={<BadgeIndianRupee size={14} />}
          isOpen={openSections.budget}
          onToggle={() => toggleSection("budget")}
        >
          <form action={basePath} className="space-y-3">
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
              Update price range
            </button>
          </form>
        </AccordionSection>

        <AccordionSection
          title="Choose a language"
          description="Filter by language code like EN or ML."
          icon={<Languages size={14} />}
          isOpen={openSections.language}
          onToggle={() => toggleSection("language")}
        >
          <form action={basePath} className="space-y-3">
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
              Update language
            </button>
          </form>
        </AccordionSection>

        <AccordionSection
          title="Ready to buy"
          description="Show books that match how and when you want to order."
          icon={<Tags size={14} />}
          isOpen={openSections.availability}
          onToggle={() => toggleSection("availability")}
        >
          <div className="space-y-2">
            <ToggleLink
              label="Only show books in stock"
              active={currentQuery.inStock}
              href={buildCatalogHref(basePath, currentQuery, {
                inStock: currentQuery.inStock ? undefined : true,
                page: 1,
              })}
            />
            <ToggleLink
              label="Only show discounted books"
              active={currentQuery.hasDiscount}
              href={buildCatalogHref(basePath, currentQuery, {
                hasDiscount: currentQuery.hasDiscount ? undefined : true,
                page: 1,
              })}
            />
            {!hideDigitalToggle ? (
              <ToggleLink
                label="Only show digital books"
                active={currentQuery.isDigital}
                href={buildCatalogHref(basePath, currentQuery, {
                  isDigital: currentQuery.isDigital ? undefined : true,
                  page: 1,
                })}
              />
            ) : null}
          </div>
        </AccordionSection>

        <AccordionSection
          title="Curated picks"
          description="Let us narrow the shelf based on popular discovery cues."
          icon={<PackageCheck size={14} />}
          isOpen={openSections.curated}
          onToggle={() => toggleSection("curated")}
        >
          <div className="space-y-2">
            {FLAG_FILTERS.map((flag) => {
              const active = isFilterActive(currentQuery[flag.key]);

              return (
                <ToggleLink
                  key={flag.key}
                  label={flag.label}
                  active={active}
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
                />
              );
            })}
          </div>
        </AccordionSection>
      </div>
    </aside>
  );
}

function AccordionSection({
  title,
  description,
  icon,
  isOpen,
  onToggle,
  children,
}) {
  return (
    <section className="mb-4 rounded-[22px] border border-[#eef2f8] bg-[#fcfdff] px-4 py-3">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-bold text-[#111418]">
            {icon ? (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f3f7ff] text-[#126DEC]">
                {icon}
              </span>
            ) : null}
            {title}
          </p>
          {description ? (
            <p className="mt-1 text-xs font-medium leading-5 text-[#7a8aa2]">
              {description}
            </p>
          ) : null}
        </div>
        <span
          className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#6f7f97] shadow-[0_10px_20px_-18px_rgba(15,23,42,0.55)] transition ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={16} />
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
          isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </section>
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
      className={`flex items-center justify-between rounded-[18px] border px-4 py-3 text-sm font-bold transition ${
        active
          ? "border-[#b8d4ff] bg-[#edf5ff] text-[#126DEC]"
          : "border-[#edf1f7] bg-white text-slate-600 hover:border-[#d8e1f1]"
      }`}
    >
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <span
          className={`text-[10px] font-black uppercase tracking-[0.18em] ${
            active ? "text-[#126DEC]" : "text-slate-500"
          }`}
        >
          {active ? "On" : "Off"}
        </span>
        <span
          className={`relative h-6 w-11 rounded-full transition ${
            active ? "bg-[#126DEC]" : "bg-[#dbe4f2]"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-[0_4px_10px_-4px_rgba(15,23,42,0.35)] transition ${
              active ? "left-6" : "left-1"
            }`}
          />
        </span>
      </span>
    </Link>
  );
}
