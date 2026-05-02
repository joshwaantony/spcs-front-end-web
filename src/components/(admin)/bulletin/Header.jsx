"use client";

import { useState } from "react";
import { useBulletinsStore } from "@/store/admin/bulletins/bulletins.store";

export default function Header({ onOpenCreate = () => {} }) {
  const [searchInput, setSearchInput] = useState("");
  const { search, limit, getBulletins } = useBulletinsStore();

  const handleSearch = (e) => {
    e.preventDefault();
    getBulletins(1, limit, searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    getBulletins(1, limit, "");
  };

  return (
    <header
      className="
        flex flex-col gap-6
        mb-8 sm:mb-10
      "
    >
      {/* Title + Subtitle */}
      <div className="max-w-3xl">
        <h1
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-black
            tracking-tight
            text-black
          "
        >
          Bulletin &amp; Magazine Manager
        </h1>

        <p
          className="
            mt-2
            text-sm
            sm:text-base
            lg:text-lg
            text-[#7C8A60]
          "
        >
          Upload and manage monthly digital publications.
        </p>
      </div>

      {/* Search Bar + Buttons */}
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search bulletins by title, date, or keywords..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="
                w-full px-4 py-2.5 sm:py-3 rounded-full
                border border-gray-200 focus:border-[#A6F20D]
                focus:outline-none focus:ring-2 focus:ring-[#A6F20D]/20
                transition
                text-sm sm:text-base
              "
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="
              bg-gray-100 hover:bg-gray-200
              transition-colors
              px-4 sm:px-6 py-2.5 sm:py-3
              rounded-full font-bold text-sm
              flex items-center gap-2 whitespace-nowrap
            "
          >
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex w-full items-center justify-between gap-3">
          <button
            type="button"
            className="
              bg-gray-100
              hover:bg-gray-200
              transition-colors
              px-4 sm:px-6
              py-2.5 sm:py-3
              rounded-full
              font-bold
              text-sm
              flex items-center gap-2
              whitespace-nowrap
            "
          >
            <span className="material-symbols-outlined text-[20px]">
              visibility
            </span>
            View Live Library
          </button>

          <button
            type="button"
            onClick={onOpenCreate}
            className="
              bg-[#46EC12]
              hover:brightness-110
              transition
              px-4 sm:px-6
              py-2.5 sm:py-3
              rounded-full
              font-bold
              text-sm
              text-[#141810]
              flex items-center gap-2
              whitespace-nowrap
            "
          >
            <span className="material-symbols-outlined text-[20px]">
              add
            </span>
            Create Bulletin
          </button>
        </div>
      </div>
    </header>
  );
}
