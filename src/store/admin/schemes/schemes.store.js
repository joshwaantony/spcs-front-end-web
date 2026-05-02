"use client";

import { create } from "zustand";
import {
  createScheme as createSchemeRequest,
  deleteScheme as deleteSchemeRequest,
  getSchemes as getSchemesRequest,
  updateScheme as updateSchemeRequest,
} from "@/services/admin/schemes/schemes.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const getErrorMessage = (error, fallback) =>
  error?.error?.message ||
  error?.message ||
  error?.msg ||
  error?.data?.message ||
  fallback;

const getCreatedSchemeItem = (response) =>
  response?.data?.item ||
  response?.data?.data?.item ||
  response?.item ||
  null;

const getUpdatedSchemeItem = (response) =>
  response?.data?.item ||
  response?.data?.data?.item ||
  response?.item ||
  null;

const formatCreatedDate = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const normalizeScheme = (item) => {
  if (!item) {
    return null;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const apiOrigin = apiUrl.replace(/\/api\/?$/i, "").replace(/\/$/, "");
  const rawImage =
    item.scheme_image_url ||
    item.schemeImageUrl ||
    item.image_url ||
    item.image ||
    "";
  const image =
    rawImage && /^https?:\/\//i.test(rawImage)
      ? rawImage
      : rawImage
        ? `${apiOrigin}${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`
        : "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200";

  return {
    ...item,
    id: item.id || item.scheme_id || item._id || "",
    title: item.title || item.name || "Untitled Scheme",
    description:
      item.description || item.scheme_description || "No description available.",
    image,
    status: String(item.status || "INACTIVE").toUpperCase(),
    enrolledCount: Number(
      item.enrollments_count ||
      item.enrolled_count ||
      item.enroll_people_count ||
      0
    ),
    createdLabel: formatCreatedDate(
      item.created_at || item.createdAt || item.created_date
    ),
  };
};

const parseSchemes = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.schemes)) {
    return responseData.schemes;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

export const useSchemesStore = create((set) => ({
  schemes: [],
  loading: false,
  error: null,
  search: "",
  inputSearch: "",
  creating: false,
  createError: null,
  createSuccess: "",
  updating: false,
  updateError: null,
  updateSuccess: "",
  deleting: false,
  deleteError: null,
  deleteSuccess: "",

  setInputSearch: (value) =>
    set({
      inputSearch: value,
    }),

  fetchSchemes: async (searchValue = "") => {
    try {
      const nextSearch = searchValue.trim();

      set({
        loading: true,
        error: null,
      });

      const res = await getSchemesRequest(nextSearch);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch schemes");
      }

      const schemes = parseSchemes(res?.data).map(normalizeScheme).filter(Boolean);

      set({
        schemes,
        loading: false,
        error: null,
        search: nextSearch,
        inputSearch: nextSearch,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch schemes");

      set({
        schemes: [],
        loading: false,
        error: message,
        search: searchValue.trim(),
      });

      return null;
    }
  },

  applySearch: async () => {
    const state = useSchemesStore.getState();
    return state.fetchSchemes(state.inputSearch);
  },

  clearSearch: async () => {
    set({
      inputSearch: "",
    });

    return useSchemesStore.getState().fetchSchemes("");
  },

  createScheme: async (payload) => {
    try {
      set({
        creating: true,
        createError: null,
        createSuccess: "",
      });

      const res = await createSchemeRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to create scheme");
      }

      const createdScheme = normalizeScheme(getCreatedSchemeItem(res));

      set((state) => ({
        schemes: createdScheme ? [createdScheme, ...state.schemes] : state.schemes,
        creating: false,
        createError: null,
        createSuccess: res?.message || "Scheme created successfully.",
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create scheme");

      set({
        creating: false,
        createError: message,
        createSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetCreateSchemeState: () => {
    set({
      creating: false,
      createError: null,
      createSuccess: "",
    });
  },

  updateScheme: async (schemeId, payload) => {
    try {
      set({
        updating: true,
        updateError: null,
        updateSuccess: "",
      });

      const res = await updateSchemeRequest(schemeId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update scheme");
      }

      const updatedScheme = normalizeScheme(getUpdatedSchemeItem(res));

      set((state) => ({
        schemes: updatedScheme
          ? state.schemes.map((item) =>
              item.id === updatedScheme.id ? { ...item, ...updatedScheme } : item
            )
          : state.schemes,
        updating: false,
        updateError: null,
        updateSuccess: res?.message || "Scheme updated successfully.",
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update scheme");

      set({
        updating: false,
        updateError: message,
        updateSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetUpdateSchemeState: () => {
    set({
      updating: false,
      updateError: null,
      updateSuccess: "",
    });
  },

  deleteScheme: async (schemeId) => {
    try {
      set({
        deleting: true,
        deleteError: null,
        deleteSuccess: "",
      });

      const res = await deleteSchemeRequest(schemeId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete scheme");
      }

      set((state) => ({
        schemes: state.schemes.filter((item) => item.id !== schemeId),
        deleting: false,
        deleteError: null,
        deleteSuccess: res?.message || "Scheme deleted successfully.",
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete scheme");

      set({
        deleting: false,
        deleteError: message,
        deleteSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetDeleteSchemeState: () => {
    set({
      deleting: false,
      deleteError: null,
      deleteSuccess: "",
    });
  },
}));
