
"use client";

import { useEffect, useState } from "react";
import { useOffersStore } from "@/store/admin/offers/offers.store";
import CampaignCard from "./CampaignCard";
import DeleteOfferModal from "./DeleteOfferModal";
import EditOfferModal from "./EditOfferModal";

export default function ActiveCampaigns() {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const {
    offers,
    loading,
    error,
    page,
    limit,
    total,
    totalPages,
    fetchOffers,
    goToPage,
  } = useOffersStore();

  useEffect(() => {
    fetchOffers(1, limit);
  }, [fetchOffers, limit]);

  const startIndex = total === 0 ? 0 : (page - 1) * limit + 1;
  const endIndex = total === 0 ? 0 : Math.min(page * limit, total);

  const openEditModal = (offer) => {
    setSelectedOffer(offer);
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setSelectedOffer(null);
  };

  const openDeleteModal = (offer) => {
    setSelectedOffer(offer);
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteOpen(false);
    setSelectedOffer(null);
  };

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-black">
          Active Campaigns
        </h2>

        <span className="w-fit px-4 py-1.5 bg-[#F7FDEC] text-[#A6F20D] text-xs font-bold rounded-full border border-[#E7FBC8]">
          {total} SLIDERS LIVE
        </span>
      </div>

      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600">
          Loading offers...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-8 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {offers.map((campaign, index) => (
              <CampaignCard
                key={campaign.id || index}
                {...campaign}
                onEdit={() => openEditModal(campaign)}
                onDelete={() => openDeleteModal(campaign)}
              />
            ))}
          </div>

          {offers.length === 0 && (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-600 mt-6">
              No offers found.
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 rounded-2xl border border-gray-100 bg-[#fbfcfb] px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-[#8c97a6] font-semibold">
                Showing {startIndex}-{endIndex} of {total} offers
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={loading || page <= 1}
                  className="size-10 rounded-full border border-[#dbe2db] bg-white text-[#8c97a6] hover:bg-[#f2f5f2] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  aria-label="Previous page"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                  </span>
                </button>

                <span className="px-4 py-2 rounded-full bg-[#A6F20D] text-black text-sm font-black min-w-[84px] text-center">
                  {page} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={loading || page >= totalPages}
                  className="size-10 rounded-full border border-[#dbe2db] bg-white text-[#8c97a6] hover:bg-[#f2f5f2] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  aria-label="Next page"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <EditOfferModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        offer={selectedOffer}
      />
      <DeleteOfferModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        offer={selectedOffer}
      />
    </section>
  );
}
