



"use client";

import { useEffect, useState } from "react";
import { useAdsStore } from "@/store/admin/ads/ads.store";
import { useToastStore } from "@/store/ui/toast.store";
import AdCard from "./AdCard";
import EditAdModal from "./EditAdModal";
import DeleteAdModal from "./DeleteAdModal";
import AdsPagination from "./AdsPagination";

export default function LiveAdsGrid() {
  const [editingAd, setEditingAd] = useState(null);
  const [deletingAd, setDeletingAd] = useState(null);
  const {
    ads,
    loading,
    fetchAds,
    deleteAd,
    deleting,
    deleteError,
    deleteSuccess,
    resetDeleteAdState,
    page,
    limit,
    total,
    totalPages,
  } = useAdsStore();
  const showToast = useToastStore((state) => state.showToast);

  const API_ORIGIN =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  /* FETCH */
  useEffect(() => {
    fetchAds(page, limit);
  }, [fetchAds, page, limit]);

  useEffect(() => {
    if (!deleteSuccess) {
      return;
    }

    showToast({ type: "success", message: deleteSuccess });
    resetDeleteAdState();
  }, [deleteSuccess, resetDeleteAdState, showToast]);

  useEffect(() => {
    if (!deleteError) {
      return;
    }

    showToast({ type: "error", message: deleteError });
  }, [deleteError, showToast]);

  const handlePageChange = (newPage) => {
    fetchAds(newPage, limit);
  };

  const openEditModal = (ad) => {
    setEditingAd(ad);
  };

  const closeEditModal = () => {
    setEditingAd(null);
  };

  const openDeleteModal = (ad) => {
    setDeletingAd(ad);
    resetDeleteAdState();
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setDeletingAd(null);
    resetDeleteAdState();
  };

  const confirmDelete = async () => {
    if (!deletingAd) {
      return;
    }

    try {
      await deleteAd(deletingAd.id);
      closeDeleteModal();
    } catch (error) {
      console.error("Delete ad failed:", error);
    }
  };

  /* LOADING */
  if (loading) {
    return <p className="text-center py-10">Loading ads...</p>;
  }

  /* EMPTY */
  if (!ads || ads.length === 0) {
    return <p className="text-center py-10">No ads found</p>;
  }

  return (
    <section>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">
            sensors
          </span>
          <h2 className="text-black text-lg sm:text-xl font-bold">
            Live Advertisements
          </h2>
        </div>

        <span className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-bold text-zinc-500 w-fit">
          {ads.length} Active
        </span>
      </div>

      {/* GRID (UNCHANGED DESIGN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {ads.map((ad) => {
          const imageUrl = ad.ad_image_url?.startsWith("http")
            ? ad.ad_image_url
            : `${API_ORIGIN}${ad.ad_image_url}`;

          return (
            <AdCard
              key={ad.id}
              type={ad.placement_label}
              aspect={
                ad.placement === "top_banner" ? "banner" : "square"
              }
              span={ad.placement === "top_banner"}
              url={ad.link}
              image={imageUrl}
              onEdit={() => openEditModal(ad)}
              onDelete={() => openDeleteModal(ad)}
            />
          );
        })}
      </div>
      <EditAdModal
        isOpen={Boolean(editingAd)}
        ad={editingAd}
        onClose={closeEditModal}
      />
      <DeleteAdModal
        isOpen={Boolean(deletingAd)}
        ad={deletingAd}
        deleting={deleting}
        error={deleteError}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
      <AdsPagination
        page={page}
        totalPages={totalPages}
        total={total}
        limit={limit}
        loading={loading}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
