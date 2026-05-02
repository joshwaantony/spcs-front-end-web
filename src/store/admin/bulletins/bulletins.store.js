"use client";

import { create } from "zustand";
import {
  getBulletins as getBulletinsRequest,
  createBulletin as createBulletinRequest,
  updateBulletin as updateBulletinRequest,
  deleteBulletin as deleteBulletinRequest,
} from "@/services/admin/bulletins/bulletins.api";

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

export const useBulletinsStore = create((set) => ({
  // Fetch state
  fetching: false,
  fetchError: null,
  bulletins: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  search: "",

  getBulletins: async (page = 1, limit = 10, search = "") => {
    try {
      set({
        fetching: true,
        fetchError: null,
      });

      const res = await getBulletinsRequest(page, limit, search);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch bulletins");
      }

      set({
        fetching: false,
        fetchError: null,
        bulletins: res?.data?.items || [],
        page: res?.data?.page || 1,
        limit: res?.data?.limit || 10,
        total: res?.data?.total || 0,
        totalPages: res?.data?.totalPages || 0,
        search,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch bulletins");

      set({
        fetching: false,
        fetchError: message,
        bulletins: [],
      });

      throw new Error(message);
    }
  },

  // Create state
  creating: false,
  createError: null,
  createSuccess: "",
  updating: false,
  updateError: null,
  updateSuccess: "",

  createBulletin: async (payload) => {
    try {
      set({
        creating: true,
        createError: null,
        createSuccess: "",
      });

      const res = await createBulletinRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to create bulletin");
      }

      set({
        creating: false,
        createError: null,
        createSuccess: res?.message || "Bulletin created successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create bulletin");

      set({
        creating: false,
        createError: message,
        createSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetCreateBulletinState: () => {
    set({
      creating: false,
      createError: null,
      createSuccess: "",
    });
  },

  updateBulletin: async (bulletinId, payload) => {
    try {
      set({
        updating: true,
        updateError: null,
        updateSuccess: "",
      });

      const res = await updateBulletinRequest(bulletinId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update bulletin");
      }

      set({
        updating: false,
        updateError: null,
        updateSuccess: res?.message || "Bulletin updated successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update bulletin");

      set({
        updating: false,
        updateError: message,
        updateSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetUpdateBulletinState: () => {
    set({
      updating: false,
      updateError: null,
      updateSuccess: "",
    });
  },

  // Delete state
  deleting: false,
  deleteError: null,
  deleteSuccess: "",

  deleteBulletin: async (bulletinId) => {
    try {
      set({
        deleting: true,
        deleteError: null,
        deleteSuccess: "",
      });

      const res = await deleteBulletinRequest(bulletinId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete bulletin");
      }

      set({
        deleting: false,
        deleteError: null,
        deleteSuccess: res?.message || "Bulletin deleted successfully.",
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete bulletin");

      set({
        deleting: false,
        deleteError: message,
        deleteSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetDeleteBulletinState: () => {
    set({
      deleting: false,
      deleteError: null,
      deleteSuccess: "",
    });
  },
}));
