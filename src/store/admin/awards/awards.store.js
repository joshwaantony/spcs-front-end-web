"use client";

import { create } from "zustand";
import {
  createAward as createAwardRequest,
  deleteAward as deleteAwardRequest,
  getAwards as getAwardsRequest,
  updateAward as updateAwardRequest,
} from "@/services/admin/awards/awards.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const getFirstNestedErrorMessage = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return getFirstNestedErrorMessage(value[0]);
  }

  if (typeof value === "object") {
    for (const nestedValue of Object.values(value)) {
      const message = getFirstNestedErrorMessage(nestedValue);

      if (message) {
        return message;
      }
    }
  }

  return "";
};

const getErrorMessage = (error, fallback) =>
  getFirstNestedErrorMessage(error?.error?.details?.fieldErrors) ||
  getFirstNestedErrorMessage(error?.error?.details?.formErrors) ||
  getFirstNestedErrorMessage(error?.errors) ||
  getFirstNestedErrorMessage(error?.data?.errors) ||
  error?.error?.message ||
  error?.message ||
  error?.msg ||
  error?.data?.message ||
  fallback;

const getBadgeClass = (category = "") => {
  const key = String(category).toUpperCase();

  if (key === "CEREMONY") {
    return "bg-lime-100 text-lime-800";
  }

  if (key === "LITERARY") {
    return "bg-blue-100 text-blue-700";
  }

  if (key === "SPECIAL") {
    return "bg-purple-100 text-purple-700";
  }

  if (key === "AKSHARAPURASKARAM") {
    return "bg-lime-100 text-lime-800";
  }

  if (key === "AWARDED") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-gray-100 text-gray-700";
};

const normalizeAward = (item) => {
  if (!item) {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const rawImage =
    item.image ||
    item.image_url ||
    item.photo ||
    item.photo_url ||
    "";
  const image =
    rawImage && /^https?:\/\//i.test(rawImage)
      ? rawImage
      : rawImage
      ? `${baseUrl}${rawImage}`
      : "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800";

  return {
    ...item,
    id: item.id || item.award_id || item._id || "",
    title: item.title || item.name || item.award_title || "Untitled Award",
    category: item.category || item.award_type || "GENERAL",
    image,
    badgeClass: getBadgeClass(item.category || item.award_type || ""),
  };
};

const parsePaginationData = (responseData, fallbackPage, fallbackLimit) => {
  if (Array.isArray(responseData)) {
    const normalizedAll = responseData.map(normalizeAward).filter(Boolean);
    const total = normalizedAll.length;
    const totalPages = Math.max(1, Math.ceil(total / fallbackLimit));
    const safePage = Math.min(Math.max(1, fallbackPage), totalPages);
    const startIndex = (safePage - 1) * fallbackLimit;

    return {
      items: normalizedAll.slice(startIndex, startIndex + fallbackLimit),
      page: safePage,
      limit: fallbackLimit,
      total,
      totalPages,
    };
  }

  const list =
    responseData?.items ||
    responseData?.awards ||
    responseData?.data ||
    [];

  const normalizedItems = Array.isArray(list)
    ? list.map(normalizeAward).filter(Boolean)
    : [];

  const total =
    responseData?.total ||
    responseData?.count ||
    normalizedItems.length;

  const limit = responseData?.limit || fallbackLimit;
  const totalPages =
    responseData?.totalPages || Math.max(1, Math.ceil(total / limit));
  const page = responseData?.page || fallbackPage;

  return {
    items: normalizedItems,
    page,
    limit,
    total,
    totalPages,
  };
};

export const useAwardsStore = create((set, get) => ({
  awards: [],
  loading: false,
  error: null,
  page: 1,
  limit: 8,
  total: 0,
  totalPages: 1,
  creating: false,
  createError: null,
  createSuccess: "",
  updating: false,
  updateError: null,
  updateSuccess: "",
  deleting: false,
  deleteError: null,
  deleteSuccess: "",

  fetchAwards: async (page = 1, limit = 8) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getAwardsRequest(page, limit);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch awards");
      }

      const parsed = parsePaginationData(res?.data, page, limit);

      set({
        awards: parsed.items,
        loading: false,
        error: null,
        page: parsed.page,
        limit: parsed.limit,
        total: parsed.total,
        totalPages: parsed.totalPages,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch awards");

      set({
        awards: [],
        loading: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  goToPage: async (nextPage) => {
    const state = get();
    const safePage = Math.max(1, Math.min(nextPage, state.totalPages || 1));
    return get().fetchAwards(safePage, state.limit);
  },

  setLimit: async (nextLimit) => {
    const numericLimit = Number(nextLimit) || 8;
    return get().fetchAwards(1, numericLimit);
  },

  createAward: async (payload) => {
    try {
      set({
        creating: true,
        createError: null,
        createSuccess: "",
      });

      const res = await createAwardRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to create award");
      }

      set({
        creating: false,
        createError: null,
        createSuccess: res?.message || "Award created successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create award");

      set({
        creating: false,
        createError: message,
        createSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetCreateAwardState: () => {
    set({
      creating: false,
      createError: null,
      createSuccess: "",
    });
  },

  updateAward: async (awardId, payload) => {
    try {
      set({
        updating: true,
        updateError: null,
        updateSuccess: "",
      });

      const res = await updateAwardRequest(awardId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update award");
      }

      set({
        updating: false,
        updateError: null,
        updateSuccess: res?.message || "Award updated successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update award");

      set({
        updating: false,
        updateError: message,
        updateSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetUpdateAwardState: () => {
    set({
      updating: false,
      updateError: null,
      updateSuccess: "",
    });
  },

  deleteAward: async (awardId) => {
    try {
      set({
        deleting: true,
        deleteError: null,
        deleteSuccess: "",
      });

      const res = await deleteAwardRequest(awardId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete award");
      }

      set({
        deleting: false,
        deleteError: null,
        deleteSuccess: res?.message || "Award deleted successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete award");

      set({
        deleting: false,
        deleteError: message,
        deleteSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetDeleteAwardState: () => {
    set({
      deleting: false,
      deleteError: null,
      deleteSuccess: "",
    });
  },
}));
