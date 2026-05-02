"use client";

import { useEffect, useState } from "react";
import ArchiveRow from "./ArchiveRow";
import DeleteArchiveModal from "./DeleteArchiveModal";
import EditArchiveModal from "./EditArchiveModal";
import { useArchivesStore } from "@/store/admin/archives/archives.store";

export default function ArchivesList() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetArchive, setDeleteTargetArchive] = useState(null);
  const {
    archives,
    loading,
    error,
    deletingId,
    deleteError,
    deleteSuccess,
    downloading,
    downloadError,
    inputSearch,
    setInputSearch,
    applySearch,
    clearSearch,
    fetchArchives,
    downloadArchiveById,
  } = useArchivesStore();

  useEffect(() => {
    fetchArchives();
  }, [fetchArchives]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    applySearch();
  };

  const hasSearchValue = inputSearch.trim().length > 0;

  const openEditModal = (archive) => {
    setSelectedArchive(archive);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedArchive(null);
  };

  const openDeleteModal = (archive) => {
    setDeleteTargetArchive(archive);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setDeleteTargetArchive(null);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-10 pb-10 sm:pb-12">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-charcoal text-lg sm:text-[22px] font-bold tracking-tight">
              Recent Archives
            </h2>
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              {archives.length} items total
            </span>
          </div>

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
                placeholder="Search archives (e.g. Annual)"
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
            Loading archives...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-8 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="border-t border-gray-100">
            {archives.map((archive) => (
              <ArchiveRow
                key={archive.id || archive.title}
                id={archive.id}
                title={archive.title}
                year={archive.year}
                date={archive.date}
                fileType={archive.fileType}
                icon={archive.icon}
                downloading={downloading}
                deleting={deletingId === archive.id}
                onEdit={openEditModal}
                onDownload={() => downloadArchiveById(archive)}
                onDelete={() => openDeleteModal(archive)}
              />
            ))}
          </div>
        )}

        {!loading && !error && (downloadError || deleteError || deleteSuccess) && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm mt-4 ${
              deleteSuccess
                ? "border border-[#daf2b4] bg-[#f7fde9] text-[#496619]"
                : "border border-red-100 bg-red-50 text-red-600"
            }`}
          >
            {downloadError || deleteError || deleteSuccess}
          </div>
        )}

        {!loading && !error && archives.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600 mt-6">
            No archives found.
          </div>
        )}
      </div>

      <EditArchiveModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        archive={selectedArchive}
      />

      <DeleteArchiveModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        archive={deleteTargetArchive}
      />
    </>
  );
}
