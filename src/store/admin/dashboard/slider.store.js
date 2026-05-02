"use client";

import { create } from "zustand";
import {
  createSlider as createSliderRequest,
  deleteSlider as deleteSliderRequest,
  getSliders,
  updateSlider as updateSliderRequest,
} from "@/services/admin/dashboard/slider.api";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getErrorMessage = (error, fallback) => {
  // Check for field errors in details
  if (error?.error?.details?.fieldErrors) {
    const fieldErrors = error.error.details.fieldErrors;
    const messages = [];
    for (const field in fieldErrors) {
      if (Array.isArray(fieldErrors[field])) {
        messages.push(...fieldErrors[field]);
      }
    }
    if (messages.length > 0) {
      return messages.join(', ');
    }
  }
  // Fallback to existing logic
  return (
    error?.error?.message ||
    error?.message ||
    error?.msg ||
    error?.data?.message ||
    fallback
  );
};

const normalizeSliderImageUrl = (url) => {
  if (!url) {
    return "";
  }

  const normalizedOrigin = API_ORIGIN.replace(/\/+$/, "");

  if (url.startsWith("/")) {
    return `${normalizedOrigin}${url}`;
  }

  if (/^https?:\/[^/]/i.test(url)) {
    const fixedProtocolUrl = url
      .replace(/^http:\//i, "http://")
      .replace(/^https:\//i, "https://");

    const uploadsPathMatch = fixedProtocolUrl.match(/\/uploads\/.+$/i);

    if (uploadsPathMatch) {
      return `${normalizedOrigin}${uploadsPathMatch[0]}`;
    }

    return fixedProtocolUrl;
  }

  return url;
};

const normalizeSlider = (slider) => ({
  ...slider,
  slider_img_url: normalizeSliderImageUrl(slider?.slider_img_url),
});

export const useSliderStore = create((set) => ({
  sliders: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  loading: false,
  error: null,
  creating: false,
  createError: null,
  updating: false,
  updateError: null,
  deleting: false,
  deleteError: null,

  fetchSliders: async (page = 1) => {
    try {
      set({ loading: true, error: null });

      const res = await getSliders(page, 10);

      if (res.success) {
        set({
          sliders: (res.data.items || []).map(normalizeSlider),
          page: res.data.page,
          limit: res.data.limit,
          total: res.data.total,
          totalPages: res.data.totalPages,
          loading: false,
        });
      } else {
        set({
          loading: false,
          error: res.message,
        });
      }
    } catch (error) {
      set({
        sliders: [],
        loading: false,
        error: getErrorMessage(error, "Failed to fetch sliders"),
      });
    }
  },

  createSlider: async (payload) => {
    try {
      set({ creating: true, createError: null });

      const res = await createSliderRequest(payload);

      if (!res.success) {
        throw new Error(res.message || "Failed to create slider");
      }

      set({ creating: false, createError: null });
      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create slider");
      set({ creating: false, createError: message });
      throw new Error(message);
    }
  },

  updateSlider: async (sliderId, payload) => {
    try {
      set({ updating: true, updateError: null });

      const res = await updateSliderRequest(sliderId, payload);

      if (!res.success) {
        throw new Error(res.message || "Failed to update slider");
      }

      const updatedItem = res.data?.item || res.data?.updatedItem;

      set((state) => ({
        updating: false,
        updateError: null,
        sliders: state.sliders.map((slider) =>
          slider.id === sliderId
            ? normalizeSlider(updatedItem || { ...slider, ...payload })
            : slider
        ),
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update slider");
      set({ updating: false, updateError: message });
      throw new Error(message);
    }
  },

  deleteSlider: async (sliderId) => {
    try {
      set({ deleting: true, deleteError: null });

      const res = await deleteSliderRequest(sliderId);

      if (!res.success) {
        throw new Error(res.message || "Failed to delete slider");
      }

      set((state) => ({
        deleting: false,
        deleteError: null,
        sliders: state.sliders.filter((slider) => slider.id !== sliderId),
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete slider");
      set({ deleting: false, deleteError: message });
      throw new Error(message);
    }
  },

  resetCreateSliderState: () => {
    set({ creating: false, createError: null });
  },

  resetUpdateSliderState: () => {
    set({ updating: false, updateError: null });
  },

  resetDeleteSliderState: () => {
    set({ deleting: false, deleteError: null });
  },
}));
