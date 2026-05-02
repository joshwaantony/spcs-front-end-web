"use client";

import { create } from "zustand";
import {
  createAd as createAdRequest,
  deleteAd as deleteAdRequest,
  getAds as getAdsRequest,
  updateAd as updateAdRequest,
} from "@/services/admin/ads/ads.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const getErrorMessage = (error, fallback) => {
  const errorData = error?.error || error?.data?.error || error?.data || error;
  const fieldErrors = errorData?.details?.fieldErrors;

  return (
    fieldErrors?.body?.[0] ||
    fieldErrors?.type?.[0] ||
    fieldErrors?.link?.[0] ||
    fieldErrors?.ad_image_url?.[0] ||
    fieldErrors?.image?.[0] ||
    errorData?.message ||
    error?.message ||
    error?.msg ||
    error?.data?.message ||
    fallback
  );
};

const getCreatedAdItem = (response) =>
  response?.data?.item || response?.data?.data?.item || response?.item || null;

const parseAds = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.ads)) {
    return responseData.ads;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

const getAdsTotal = (responseData, fallbackCount = 0) => {
  const total =
    Number(responseData?.total) ||
    Number(responseData?.active_count) ||
    Number(responseData?.count) ||
    fallbackCount;

  return Number.isFinite(total) ? total : fallbackCount;
};

export const useAdsStore = create((set, get) => ({
  ads: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
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

  fetchAds: async (page = 1, limit = 10) => {
    try {
      set({ loading: true, error: null });
      const res = await getAdsRequest(page, limit);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch ads");
      }

      const ads = parseAds(res?.data).filter(Boolean);
      const total = getAdsTotal(res?.data, ads.length);
      const totalPages =
        Number(res?.data?.totalPages) || Math.max(Math.ceil(total / limit), 1);

      set({
        ads,
        loading: false,
        error: null,
        page,
        limit,
        total,
        totalPages,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch ads");
      set({ ads: [], loading: false, error: message });
      return null;
    }
  },

  createAd: async (payload) => {
    try {
      set({ creating: true, createError: null, createSuccess: "" });
      const res = await createAdRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to create ad");
      }

      const createdAd = getCreatedAdItem(res);
      set((state) => ({
        ads: createdAd ? [createdAd, ...state.ads] : state.ads,
        creating: false,
        createError: null,
        createSuccess: res?.message || "Ad created successfully",
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create ad");
      set({ creating: false, createError: message, createSuccess: "" });
      throw error;
    }
  },

  updateAd: async (adId, payload) => {
    try {
      set({ updating: true, updateError: null, updateSuccess: "" });
      const res = await updateAdRequest(adId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update ad");
      }

      const updatedAd = getCreatedAdItem(res);
      set((state) => ({
        ads: updatedAd
          ? state.ads.map((item) => (item.id === adId ? updatedAd : item))
          : state.ads,
        updating: false,
        updateError: null,
        updateSuccess: res?.message || "Ad updated successfully",
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update ad");
      set({ updating: false, updateError: message, updateSuccess: "" });
      throw error;
    }
  },

  deleteAd: async (adId) => {
    try {
      set({ deleting: true, deleteError: null, deleteSuccess: "" });
      const res = await deleteAdRequest(adId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete ad");
      }

      set((state) => ({
        ads: state.ads.filter((item) => item.id !== adId),
        deleting: false,
        deleteError: null,
        deleteSuccess: res?.message || "Ad deleted successfully",
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete ad");
      set({ deleting: false, deleteError: message, deleteSuccess: "" });
      throw error;
    }
  },

  resetCreateAdState: () =>
    set({ creating: false, createError: null, createSuccess: "" }),

  resetUpdateAdState: () =>
    set({ updating: false, updateError: null, updateSuccess: "" }),

  resetDeleteAdState: () =>
    set({ deleting: false, deleteError: null, deleteSuccess: "" }),
}));
