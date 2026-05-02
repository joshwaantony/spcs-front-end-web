"use client";

import { useEffect, useState } from "react";
import { useAwardsStore } from "@/store/admin/awards/awards.store";
import AwardsPagination from "./AwardsPagination";
import EditAwardModal from "./EditAwardModal";
import DeleteAwardModal from "./DeleteAwardModal";

export default function AwardsGrid() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);

  const {
    awards,
    loading,
    error,
    page,
    total,
    totalPages,
    limit,
    fetchAwards,
    goToPage,
  } = useAwardsStore();

  useEffect(() => {
    fetchAwards(1, limit);
  }, [fetchAwards, limit]);

  const openEditModal = (award) => {
    setSelectedAward(award);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedAward(null);
  };

  const openDeleteModal = (award) => {
    setSelectedAward(award);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedAward(null);
  };

  return (
    <>
      <section className="w-full">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-charcoal">
          Recent Awards
        </h3>

        <span className="text-xs sm:text-sm text-gray-500 font-semibold">
          {total} items total
        </span>
      </div>

      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600">
          Loading awards...
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
              lg:grid-cols-3
              xl:grid-cols-4
              gap-4
              sm:gap-5
              lg:gap-6
            "
          >
            {awards.map((award, index) => (
              <div
                key={award.id || `${award.title}-${index}`}
                className="
                  group
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  border border-gray-100
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                  hover:-translate-y-1
                "
              >
                <div className="relative h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="
                      w-full h-full object-cover
                      transition-all duration-500
                      group-hover:brightness-75
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      flex items-center justify-center gap-3 sm:gap-4
                      opacity-100 sm:opacity-0
                      sm:group-hover:opacity-100
                      transition-opacity duration-300
                    "
                  >
                    <button
                      type="button"
                      onClick={() => openEditModal(award)}
                      className="
                        w-10 h-10 sm:w-12 sm:h-12
                        rounded-full
                        bg-[#A6F20D]
                        text-black
                        flex items-center justify-center
                        shadow-lg
                        hover:scale-110
                        transition
                      "
                    >
                      <span className="material-symbols-outlined font-bold text-[18px] sm:text-[22px]">
                        edit
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openDeleteModal(award)}
                      className="
                        w-10 h-10 sm:w-12 sm:h-12
                        rounded-full
                        bg-white
                        text-red-600
                        flex items-center justify-center
                        shadow-lg
                        hover:scale-110
                        transition
                      "
                    >
                      <span className="material-symbols-outlined font-bold text-[18px] sm:text-[22px]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h4 className="font-bold text-sm sm:text-base mb-3 leading-tight text-charcoal">
                    {award.title}
                  </h4>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider ${award.badgeClass}`}
                  >
                    {award.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {awards.length === 0 && (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600 mt-6">
              No awards found.
            </div>
          )}

          <AwardsPagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            currentCount={awards.length}
            label="awards"
            onPageChange={goToPage}
            disabled={loading}
          />
        </>
      )}
      </section>

      <EditAwardModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        award={selectedAward}
      />
      <DeleteAwardModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        award={selectedAward}
      />
    </>
  );
}
