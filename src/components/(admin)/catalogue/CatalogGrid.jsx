"use client";

import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import EditCatalogModal from "./EditCatalogModal";
import DeleteCatalogModal from "./DeleteCatalogModal";
import { useCataloguesStore } from "@/store/admin/catalogues/catalogues.store";

export default function CatalogGrid() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCatalogue, setSelectedCatalogue] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetCatalogue, setDeleteTargetCatalogue] = useState(null);

  const {
    catalogues,
    loading,
    error,
    inputSearch,
    setInputSearch,
    applySearch,
    clearSearch,
    fetchCatalogues,
  } = useCataloguesStore();

  useEffect(() => {
    fetchCatalogues();
  }, [fetchCatalogues]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    applySearch();
  };

  const hasSearchValue = inputSearch.trim().length > 0;

  const openEditModal = (catalogue) => {
    setSelectedCatalogue(catalogue);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedCatalogue(null);
  };

  const openDeleteModal = (catalogue) => {
    setDeleteTargetCatalogue(catalogue);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteTargetCatalogue(null);
  };

  return (
    <>
      <section className="px-0 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">
              Active Library
            </h2>
            <span className="text-xs text-gray-500 sm:text-sm">
              Showing {catalogues.length} items
            </span>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-3 lg:flex-row lg:items-center"
          >
            <div className="relative min-w-0 flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                value={inputSearch}
                onChange={(event) => setInputSearch(event.target.value)}
                placeholder="Search catalogues (e.g. March)"
                className="w-full h-11 sm:h-12 rounded-full border border-gray-200 bg-white pl-12 pr-4 text-sm sm:text-base focus:border-[#A6F20D] focus:ring-2 focus:ring-[#A6F20D]/30 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:shrink-0">
              <button
                type="submit"
                className="h-11 rounded-full bg-[#A6F20D] px-5 text-sm font-bold text-black transition hover:brightness-95 sm:h-12 sm:px-6"
              >
                Search
              </button>

              <button
                type="button"
                onClick={clearSearch}
                disabled={!hasSearchValue}
                className="h-11 rounded-full border border-gray-200 px-5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:px-6"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600">
            Loading catalogues...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-8 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
              gap-4 sm:gap-5 xl:gap-6
            "
            >
              {catalogues.map((item) => (
                <CatalogCard
                  key={item.id || item.title}
                  id={item.id}
                  title={item.title}
                  size={item.size}
                  date={item.date}
                  year={item.year}
                  isNew={item.isNew}
                  fileUrl={item.fileUrl}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              ))}
            </div>

            {catalogues.length === 0 && (
              <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600 mt-6">
                No catalogues found.
              </div>
            )}
          </>
        )}
      </section>

      <EditCatalogModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        catalogue={selectedCatalogue}
      />

      <DeleteCatalogModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        catalogue={deleteTargetCatalogue}
      />
    </>
  );
}
