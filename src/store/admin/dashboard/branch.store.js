"use client";

import { create } from "zustand";
import {
  createBranch as createBranchRequest,
  deleteBranch as deleteBranchRequest,
  getBranches,
  updateBranch as updateBranchRequest,
} from "@/services/admin/dashboard/branch.api";

const getErrorMessage = (error, fallback) => {
  if (error?.error?.details?.fieldErrors) {
    const fieldErrors = error.error.details.fieldErrors;
    const messages = [];

    for (const field in fieldErrors) {
      if (Array.isArray(fieldErrors[field])) {
        messages.push(...fieldErrors[field]);
      }
    }

    if (messages.length > 0) {
      return messages.join(", ");
    }
  }

  return (
    error?.error?.message ||
    error?.message ||
    error?.msg ||
    error?.data?.message ||
    fallback
  );
};

export const useBranchStore = create((set) => ({
  branches: [],
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

  fetchBranches: async (page = 1) => {
    try {
      set({ loading: true, error: null });

      const res = await getBranches(page, 10);

      if (res.success) {
        const pagination = res.data?.pagination || {};

        set({
          branches: res.data?.items || [],
          page: pagination.page || page,
          limit: pagination.limit || 10,
          total: pagination.total || 0,
          totalPages: pagination.total_pages || 0,
          loading: false,
          error: null,
        });
      } else {
        set({
          loading: false,
          error: res.message || res.msg || "Failed to fetch branches",
        });
      }
    } catch (error) {
      set({
        branches: [],
        loading: false,
        error: getErrorMessage(error, "Failed to fetch branches"),
      });
    }
  },

  createBranch: async (payload) => {
    try {
      set({ creating: true, createError: null });

      const res = await createBranchRequest(payload);

      if (!res.success) {
        throw new Error(res.message || res.msg || "Failed to create branch");
      }

      const createdItem = res.data?.item;

      set((state) => ({
        creating: false,
        createError: null,
        branches: createdItem ? [createdItem, ...state.branches] : state.branches,
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create branch");
      set({ creating: false, createError: message });
      throw new Error(message);
    }
  },

  updateBranch: async (branchId, payload) => {
    try {
      set({ updating: true, updateError: null });

      const res = await updateBranchRequest(branchId, payload);

      if (!res.success) {
        throw new Error(res.message || res.msg || "Failed to update branch");
      }

      const updatedItem = res.data?.item || res.data?.updatedItem;

      set((state) => ({
        updating: false,
        updateError: null,
        branches: state.branches.map((branch) =>
          branch.id === branchId ? updatedItem || branch : branch
        ),
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update branch");
      set({ updating: false, updateError: message });
      throw new Error(message);
    }
  },

  deleteBranch: async (branchId) => {
    try {
      set({ deleting: true, deleteError: null });

      const res = await deleteBranchRequest(branchId);

      if (!res.success) {
        throw new Error(res.message || res.msg || "Failed to delete branch");
      }

      const deletedBranchId = res.data?.branch_id || branchId;

      set((state) => ({
        deleting: false,
        deleteError: null,
        branches: state.branches.filter((branch) => branch.id !== deletedBranchId),
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete branch");
      set({ deleting: false, deleteError: message });
      throw new Error(message);
    }
  },

  resetCreateBranchState: () => {
    set({ creating: false, createError: null });
  },

  resetUpdateBranchState: () => {
    set({ updating: false, updateError: null });
  },

  resetDeleteBranchState: () => {
    set({ deleting: false, deleteError: null });
  },
}));
