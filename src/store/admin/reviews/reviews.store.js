"use client";

import { create } from "zustand";
import {
  deleteReview as deleteReviewRequest,
  getReviews as getReviewsRequest,
  updateReviewStatus as updateReviewStatusRequest,
} from "@/services/admin/reviews/reviews.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const getErrorMessage = (error, fallback) => {
  const errorData = error?.error || error?.data?.error || error?.data || error;
  const fieldErrors = errorData?.details?.fieldErrors;

  return (
    fieldErrors?.body?.[0] ||
    fieldErrors?.filter?.[0] ||
    errorData?.message ||
    error?.message ||
    error?.msg ||
    fallback
  );
};

const parseReviews = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.reviews)) {
    return responseData.reviews;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

const getPaginationMeta = (responseData, fallbackPage, fallbackLimit, itemCount) => {
  const page = Number(responseData?.page) || fallbackPage;
  const limit = Number(responseData?.limit) || fallbackLimit;
  const total =
    Number(responseData?.total) ||
    Number(responseData?.count) ||
    Number(responseData?.active_count) ||
    itemCount;
  const totalPages =
    Number(responseData?.totalPages) || Math.max(Math.ceil(total / limit), 1);

  return {
    page,
    limit,
    total,
    totalPages,
  };
};

export const useReviewsStore = create((set, get) => ({
  reviews: [],
  filter: "all",
  rating: "",
  search: "",
  inputRating: "",
  inputSearch: "",
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  loading: false,
  error: null,
  updating: false,
  updateError: null,
  updateSuccess: "",
  deleting: false,
  deleteError: null,
  deleteSuccess: "",

  setInputSearch: (inputSearch) => {
    set({ inputSearch });
  },

  setInputRating: (inputRating) => {
    set({ inputRating });
  },

  setFilter: (filter) => {
    set({ filter, page: 1 });
    return get().fetchReviews(1, filter);
  },

  applyFilters: () => {
    const { inputSearch, inputRating } = get();
    set({
      search: inputSearch.trim(),
      rating: String(inputRating).trim(),
      page: 1,
    });
    return get().fetchReviews(1);
  },

  fetchReviews: async (nextPage, nextFilter) => {
    const state = get();
    const page = nextPage || state.page || 1;
    const filter = nextFilter || state.filter || "all";
    const rating = state.rating || "";
    const search = state.search || "";

    try {
      set({ loading: true, error: null });

      const res = await getReviewsRequest({
        filter,
        rating,
        search,
        page,
        limit: state.limit,
      });

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch reviews");
      }

      const reviews = parseReviews(res?.data).filter(Boolean);
      const pagination = getPaginationMeta(
        res?.data,
        page,
        state.limit,
        reviews.length
      );

      set({
        reviews,
        filter,
        rating,
        search,
        inputRating: state.inputRating,
        inputSearch: state.inputSearch,
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: pagination.totalPages,
        loading: false,
        error: null,
      });

      return res;
    } catch (error) {
      set({
        reviews: [],
        loading: false,
        error: getErrorMessage(error, "Failed to fetch reviews"),
      });
      return null;
    }
  },

  updateReviewStatus: async (reviewId, status) => {
    try {
      set({ updating: true, updateError: null, updateSuccess: "" });

      const res = await updateReviewStatusRequest(reviewId, { status });

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update review");
      }

      const updatedReview =
        res?.data?.item || res?.data?.data?.item || res?.item || null;

      set((state) => ({
        reviews: updatedReview
          ? state.reviews.map((item) =>
              item.id === reviewId ? { ...item, ...updatedReview } : item
            )
          : state.reviews.map((item) =>
              item.id === reviewId ? { ...item, status } : item
            ),
        updating: false,
        updateError: null,
        updateSuccess: res?.message || "Review updated successfully",
      }));

      return res;
    } catch (error) {
      set({
        updating: false,
        updateError: getErrorMessage(error, "Failed to update review"),
        updateSuccess: "",
      });
      throw error;
    }
  },

  deleteReview: async (reviewId) => {
    try {
      set({ deleting: true, deleteError: null, deleteSuccess: "" });

      const res = await deleteReviewRequest(reviewId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete review");
      }

      set((state) => ({
        reviews: state.reviews.filter((item) => item.id !== reviewId),
        deleting: false,
        deleteError: null,
        deleteSuccess: res?.message || "Review deleted successfully",
        total: Math.max(state.total - 1, 0),
      }));

      return res;
    } catch (error) {
      set({
        deleting: false,
        deleteError: getErrorMessage(error, "Failed to delete review"),
        deleteSuccess: "",
      });
      throw error;
    }
  },

  resetUpdateState: () => {
    set({ updating: false, updateError: null, updateSuccess: "" });
  },

  resetDeleteState: () => {
    set({ deleting: false, deleteError: null, deleteSuccess: "" });
  },
}));
