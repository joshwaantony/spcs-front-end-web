"use client";

import { useEffect, useState } from "react";
import DeleteDownloadModal from "./DeleteDownloadModal";
import EditDownloadModal from "./EditDownloadModal";
import { useDownloadsStore } from "@/store/admin/downloads/downloads.store";

export default function ResourcesList() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDownload, setSelectedDownload] = useState(null);
  const {
    downloads,
    loading,
    error,
    inputSearch,
    setInputSearch,
    applySearch,
    clearSearch,
    fetchDownloads,
  } = useDownloadsStore();

  useEffect(() => {
    fetchDownloads();
  }, [fetchDownloads]);

  const hasSearchValue = inputSearch.trim().length > 0;

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    applySearch();
  };

  const openEditModal = (download) => {
    setSelectedDownload(download);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedDownload(null);
  };

  const openDeleteModal = (download) => {
    setSelectedDownload(download);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedDownload(null);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-charcoal">
            Active Resources
          </h3>
          <span className="text-sm font-medium text-gray-400">
            {downloads.length} Files Uploaded
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
              placeholder="Search downloads (e.g. March)"
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
          Loading downloads...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-8 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && downloads.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600">
          No downloads found.
        </div>
      )}

      {!loading && !error && downloads.length > 0 && (
        <div className="flex flex-col">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 rounded-2xl border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <div
                className={`size-12 sm:size-14 ${item.bg} flex items-center justify-center rounded-xl shrink-0`}
              >
                <span
                  className={`material-symbols-outlined text-2xl sm:text-3xl ${item.iconColor}`}
                >
                  {item.icon}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-charcoal truncate">
                  {item.title}
                </h4>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {item.type}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {item.size} • Uploaded on {item.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  title="Edit"
                  onClick={() => openEditModal(item)}
                  className="size-9 sm:size-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#A6F20D]/10 hover:text-[#7FB800] transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                    edit
                  </span>
                </button>

                <button
                  title="Copy Link"
                  className="size-9 sm:size-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-charcoal transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                    link
                  </span>
                </button>

                <button
                  title="Delete"
                  type="button"
                  onClick={() => openDeleteModal(item)}
                  className="size-9 sm:size-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <EditDownloadModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        download={selectedDownload}
      />

      <DeleteDownloadModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        download={selectedDownload}
      />
    </div>
  );
}
