"use client";

import { create } from "zustand";
import {
  createCatalogue as createCatalogueRequest,
  deleteCatalogue as deleteCatalogueRequest,
  getCatalogues as getCataloguesRequest,
  updateCatalogue as updateCatalogueRequest,
} from "@/services/admin/catalogues/catalogues.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const formatUploadedDate = (value) => {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const normalizeCatalogue = (item) => {
  if (!item) {
    return null;
  }

  const id = item.id || item.catalogue_id || item._id || "";
  const title = item.title || item.name || "Untitled Catalogue";
  const uploadedDate = item.uploaded_date || item.created_at || item.createdAt;
  const parsedUploadedDate = uploadedDate ? new Date(uploadedDate) : null;
  const fallbackYear =
    parsedUploadedDate && !Number.isNaN(parsedUploadedDate.getTime())
      ? String(parsedUploadedDate.getFullYear())
      : "";

  return {
    ...item,
    id,
    title,
    size: item.file_size || item.size || "-",
    date: formatUploadedDate(uploadedDate),
    year: item.year ? String(item.year) : fallbackYear,
    fileUrl: item.file_url || item.fileUrl || "",
    fileType: item.file_type || item.fileType || "",
    isNew: false,
  };
};

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

export const useCataloguesStore = create((set, get) => ({
  catalogues: [],
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

  setInputSearch: (inputSearch) => {
    set({ inputSearch });
  },

  applySearch: async () => {
    const state = get();
    const nextSearch = state.inputSearch.trim();

    set({
      search: nextSearch,
    });

    return get().fetchCatalogues({ search: nextSearch });
  },

  clearSearch: async () => {
    set({
      search: "",
      inputSearch: "",
    });

    return get().fetchCatalogues({ search: "" });
  },

  fetchCatalogues: async ({ search } = {}) => {
    const state = get();
    const activeSearch =
      typeof search === "string" ? search : state.search;

    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getCataloguesRequest({
        search: activeSearch,
      });

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch catalogues");
      }

      const items = (res?.data || []).map(normalizeCatalogue).filter(Boolean);

      set({
        catalogues: items,
        loading: false,
        error: null,
        search: activeSearch,
        inputSearch: activeSearch,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch catalogues");

      set({
        catalogues: [],
        loading: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  createCatalogue: async (payload) => {
    try {
      set({
        creating: true,
        createError: null,
        createSuccess: "",
      });

      const res = await createCatalogueRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to create catalogue");
      }

      set({
        creating: false,
        createError: null,
        createSuccess: res?.message || "Catalogue created successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create catalogue");

      set({
        creating: false,
        createError: message,
        createSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetCreateCatalogueState: () => {
    set({
      creating: false,
      createError: null,
      createSuccess: "",
    });
  },

  updateCatalogue: async (catalogueId, payload) => {
    try {
      set({
        updating: true,
        updateError: null,
        updateSuccess: "",
      });

      const res = await updateCatalogueRequest(catalogueId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update catalogue");
      }

      set({
        updating: false,
        updateError: null,
        updateSuccess: res?.message || "Catalogue updated successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update catalogue");

      set({
        updating: false,
        updateError: message,
        updateSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetUpdateCatalogueState: () => {
    set({
      updating: false,
      updateError: null,
      updateSuccess: "",
    });
  },

  deleteCatalogue: async (catalogueId) => {
    try {
      set({
        deleting: true,
        deleteError: null,
        deleteSuccess: "",
      });

      const res = await deleteCatalogueRequest(catalogueId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete catalogue");
      }

      set({
        deleting: false,
        deleteError: null,
        deleteSuccess: res?.message || "Catalogue deleted successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete catalogue");

      set({
        deleting: false,
        deleteError: message,
        deleteSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetDeleteCatalogueState: () => {
    set({
      deleting: false,
      deleteError: null,
      deleteSuccess: "",
    });
  },
}));
