"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useReviewsStore } from "@/store/admin/reviews/reviews.store";
import DeleteReviewModal from "./DeleteReviewModal";
import { useToastStore } from "@/store/ui/toast.store";

const getReviewImage = (item) =>
  item?.book_image_url ||
  item?.image_url ||
  item?.book?.image_url ||
  item?.book?.cover_image_url ||
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=900&auto=format&fit=crop";

const getReviewTitle = (item) =>
  item?.book_title ||
  item?.book?.title ||
  item?.book?.name ||
  item?.title ||
  "Untitled Review";

const getReviewAuthor = (item) =>
  item?.user_name ||
  item?.user?.name ||
  item?.customer_name ||
  item?.author ||
  "Anonymous";

const getReviewText = (item) =>
  item?.review_text ||
  item?.description ||
  item?.review ||
  item?.comment ||
  item?.content ||
  "No review content available.";

const getReviewRating = (item) => {
  const value = Number(item?.rating || item?.stars || 0);
  return Number.isFinite(value) ? Math.max(0, Math.min(5, value)) : 0;
};

const formatReviewTime = (value) => {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function ReviewsGrid() {
  const [deletingReview, setDeletingReview] = useState(null);
  const {
    reviews,
    loading,
    error,
    fetchReviews,
    deleteReview,
    deleting,
    deleteError,
    deleteSuccess,
    updateReviewStatus,
    updating,
    updateError,
    updateSuccess,
    resetUpdateState,
    resetDeleteState,
    page,
    filter,
  } =
    useReviewsStore();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    fetchReviews(page, filter);
  }, [fetchReviews, page, filter]);

  useEffect(() => {
    if (!updateSuccess) {
      return;
    }

    showToast({ type: "success", message: updateSuccess });
    resetUpdateState();
  }, [resetUpdateState, showToast, updateSuccess]);

  useEffect(() => {
    if (!updateError) {
      return;
    }

    showToast({ type: "error", message: updateError });
  }, [showToast, updateError]);

  useEffect(() => {
    if (!deleteSuccess) {
      return;
    }

    showToast({ type: "success", message: deleteSuccess });
    resetDeleteState();
  }, [deleteSuccess, resetDeleteState, showToast]);

  useEffect(() => {
    if (!deleteError) {
      return;
    }

    showToast({ type: "error", message: deleteError });
  }, [deleteError, showToast]);

  if (loading) {
    return <p className="py-10 text-center text-sm text-zinc-500">Loading reviews...</p>;
  }

  if (error) {
    return <p className="py-10 text-center text-sm text-red-500">{error}</p>;
  }

  if (!reviews || reviews.length === 0) {
    return <p className="py-10 text-center text-sm text-zinc-500">No reviews found.</p>;
  }

  const handleStatusUpdate = async (reviewId, status) => {
    try {
      await updateReviewStatus(reviewId, status);
    } catch (error) {
      console.error("Update review status failed:", error);
    }
  };

  const openDeleteModal = (review) => {
    setDeletingReview(review);
  };

  const closeDeleteModal = () => {
    if (!deleting) {
      setDeletingReview(null);
    }
  };

  const confirmDelete = async () => {
    if (!deletingReview) {
      return;
    }

    try {
      await deleteReview(deletingReview.id);
      setDeletingReview(null);
    } catch (error) {
      console.error("Delete review failed:", error);
    }
  };

  return (
    <>
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-2
          gap-6 sm:gap-8
        "
      >
        {reviews.map((item) => (
          <ReviewCard
            key={item.id}
            status={item.status}
            deleting={deleting && deletingReview?.id === item.id}
            title={getReviewTitle(item)}
            time={formatReviewTime(item.review_date || item.created_at || item.createdAt)}
            author={getReviewAuthor(item)}
            rating={getReviewRating(item)}
            image={getReviewImage(item)}
            text={getReviewText(item)}
            updating={updating}
            onApprove={() => handleStatusUpdate(item.id, "published")}
            onReject={() => handleStatusUpdate(item.id, "rejected")}
            onDelete={() =>
              openDeleteModal({
                id: item.id,
                title: getReviewTitle(item),
                author: getReviewAuthor(item),
              })
            }
          />
        ))}
      </div>
      <DeleteReviewModal
        isOpen={Boolean(deletingReview)}
        review={deletingReview}
        deleting={deleting}
        error={deleteError}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  );
}
