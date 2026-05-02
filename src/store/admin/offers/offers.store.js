"use client";

import { create } from "zustand";
import {
  createOffer as createOfferRequest,
  deleteOffer as deleteOfferRequest,
  getOffers as getOffersRequest,
  updateOffer as updateOfferRequest,
} from "@/services/admin/offers/offers.api";

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

const normalizeViews = (raw) => {
  if (raw === null || raw === undefined || raw === "") {
    return "0 views";
  }

  const numeric = Number(raw);

  if (!Number.isNaN(numeric)) {
    return `${numeric.toLocaleString("en-US")} views`;
  }

  const value = String(raw);
  return value.toLowerCase().includes("view") ? value : `${value} views`;
};

const normalizeOffer = (item) => {
  if (!item) {
    return null;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const apiOrigin = apiUrl.replace(/\/api\/?$/i, "").replace(/\/$/, "");
  const rawImage =
    item.offer_image_url ||
    item.offerImageUrl ||
    item.image ||
    item.image_url ||
    item.banner ||
    item.banner_url ||
    "";
  const image =
    rawImage && /^https?:\/\//i.test(rawImage)
      ? rawImage
      : rawImage
      ? `${apiOrigin}${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`
      : "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200";

  return {
    ...item,
    id: item.id || item.offer_id || item._id || "",
    title: item.title || item.name || item.campaign_name || "Untitled Offer",
    link: item.link || item.target_link || item.url || "",
    displayLink:
      item.display_link ||
      item.displayLink ||
      item.link ||
      item.target_link ||
      item.url ||
      "",
    views:
      item.views_label ||
      item.viewsLabel ||
      normalizeViews(item.views || item.view_count || item.impressions || 0),
    image,
  };
};

const extractCreatedOfferItem = (response) =>
  response?.data?.item ||
  response?.data?.data?.item ||
  response?.item ||
  null;

const parseOffers = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.offers)) {
    return responseData.offers;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

const parsePagination = (responseData, fallbackPage, fallbackLimit) => {
  const page = Number(responseData?.page) || fallbackPage;
  const limit = Number(responseData?.limit) || fallbackLimit;
  const total = Number(responseData?.total) || 0;
  const totalPages =
    Number(responseData?.totalPages) || Math.max(1, Math.ceil(total / limit));

  return {
    page,
    limit,
    total,
    totalPages,
  };
};

export const useOffersStore = create((set, get) => ({
  offers: [],
  loading: false,
  error: null,
  page: 1,
  limit: 6,
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

  fetchOffers: async (page = 1, limit = 6) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getOffersRequest(page, limit);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch offers");
      }

      const items = parseOffers(res?.data).map(normalizeOffer).filter(Boolean);
      const pagination = parsePagination(res?.data, page, limit);

      set({
        offers: items,
        loading: false,
        error: null,
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: pagination.totalPages,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch offers");

      set({
        offers: [],
        loading: false,
        error: message,
        total: 0,
        totalPages: 1,
      });

      throw new Error(message);
    }
  },

  goToPage: async (nextPage) => {
    const state = get();
    const safePage = Math.max(1, Math.min(nextPage, state.totalPages || 1));
    return get().fetchOffers(safePage, state.limit);
  },

  createOffer: async (payload) => {
    try {
      set({
        creating: true,
        createError: null,
        createSuccess: "",
      });

      const res = await createOfferRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to create offer");
      }

      const createdItem = normalizeOffer(extractCreatedOfferItem(res));
      const state = get();
      const nextOffers =
        createdItem && state.page === 1
          ? [createdItem, ...state.offers].slice(0, state.limit)
          : state.offers;
      const nextTotal = (state.total || 0) + 1;
      const nextTotalPages = Math.max(1, Math.ceil(nextTotal / state.limit));

      set({
        offers: nextOffers,
        total: nextTotal,
        totalPages: nextTotalPages,
        creating: false,
        createError: null,
        createSuccess: res?.message || "Offer created successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create offer");

      set({
        creating: false,
        createError: message,
        createSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetCreateOfferState: () => {
    set({
      creating: false,
      createError: null,
      createSuccess: "",
    });
  },

  updateOffer: async (offerId, payload) => {
    try {
      set({
        updating: true,
        updateError: null,
        updateSuccess: "",
      });

      const res = await updateOfferRequest(offerId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update offer");
      }

      set({
        updating: false,
        updateError: null,
        updateSuccess: res?.message || "Offer updated successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update offer");

      set({
        updating: false,
        updateError: message,
        updateSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetUpdateOfferState: () => {
    set({
      updating: false,
      updateError: null,
      updateSuccess: "",
    });
  },

  deleteOffer: async (offerId) => {
    try {
      set({
        deleting: true,
        deleteError: null,
        deleteSuccess: "",
      });

      const res = await deleteOfferRequest(offerId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete offer");
      }

      set({
        deleting: false,
        deleteError: null,
        deleteSuccess: res?.message || "Offer deleted successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete offer");

      set({
        deleting: false,
        deleteError: message,
        deleteSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetDeleteOfferState: () => {
    set({
      deleting: false,
      deleteError: null,
      deleteSuccess: "",
    });
  },
}));
