
"use client";

import { useEffect, useState } from "react";
import { useSchemesStore } from "@/store/admin/schemes/schemes.store";
import DeleteSchemeModal from "./DeleteSchemeModal";
import EditSchemeModal from "./EditSchemeModal";
import SchemeCard from "./SchemeCard";

export default function ActiveSchemes() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const {
    schemes,
    loading,
    error,
    inputSearch,
    setInputSearch,
    applySearch,
    clearSearch,
    fetchSchemes,
  } = useSchemesStore();

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  const hasSearchValue = inputSearch.trim().length > 0;

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    applySearch();
  };

  const openEditModal = (scheme) => {
    setSelectedScheme(scheme);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedScheme(null);
  };

  const openDeleteModal = (scheme) => {
    setSelectedScheme(scheme);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedScheme(null);
  };

  return (
    <section className="mb-10 px-2 sm:px-0">
      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-charcoal flex items-center gap-3">
          <span className="w-6 sm:w-8 h-1 bg-primary rounded-full" />
          Active Schemes
        </h2>

        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row gap-3 sm:items-center"
        >
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              type="text"
              value={inputSearch}
              onChange={(event) => setInputSearch(event.target.value)}
              placeholder="Search schemes (e.g. Summer)"
              className="w-full h-11 sm:h-12 rounded-full border border-gray-200 bg-white pl-12 pr-4 text-sm sm:text-base focus:border-[#A6F20D] focus:ring-2 focus:ring-[#A6F20D]/30 outline-none"
            />
          </div>

          <button
            type="submit"
            className="h-11 sm:h-12 px-6 rounded-full bg-[#A6F20D] text-black text-sm font-bold hover:brightness-95 transition"
          >
            Search
          </button>

          <button
            type="button"
            onClick={clearSearch}
            disabled={!hasSearchValue}
            className="h-11 sm:h-12 px-6 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </form>
      </div>

      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600">
          Loading schemes...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-8 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && schemes.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600">
          No schemes found.
        </div>
      )}

      {!loading && !error && schemes.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            sm:gap-8
          "
        >
          {schemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              title={scheme.title}
              description={scheme.description}
              enrolled={scheme.enrolledCount}
              created={scheme.createdLabel}
              image={scheme.image}
              status={scheme.status}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      )}

      <EditSchemeModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        scheme={selectedScheme}
      />
      <DeleteSchemeModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        scheme={selectedScheme}
      />
    </section>
  );
}
