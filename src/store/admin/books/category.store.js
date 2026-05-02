"use client";

import { create } from "zustand";
import {
  createCategory as createCategoryRequest,
  deleteCategory as deleteCategoryRequest,
  getCategories,
  updateCategory as updateCategoryRequest,
} from "@/services/admin/books/category.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const normalizeCategory = (category) => {
  if (!category) {
    return null;
  }

  return {
    ...category,
    id: category.id || category.category_id || "",
    category_id: category.category_id || category.id || "",
    createdAt: category.createdAt || category.created_at || "",
    created_at: category.created_at || category.createdAt || "",
    updatedAt: category.updatedAt || category.updated_at || "",
    updated_at: category.updated_at || category.updatedAt || "",
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

const getErrorMessage = (error, fallback) => {
  const validationMessage =
    getFirstNestedErrorMessage(error?.errors) ||
    getFirstNestedErrorMessage(error?.data?.errors);

  const message =
    validationMessage ||
    error?.error?.message ||
    error?.message ||
    error?.msg ||
    error?.data?.message ||
    "";

  if (
    error?.code === "ECONNABORTED" ||
    /timeout of \d+ms exceeded/i.test(message) ||
    /network error/i.test(message)
  ) {
    return "Unable to connect right now. Please try again.";
  }

  return (
    message ||
    fallback
  );
};

export const useCategoryStore = create((set) => ({
  categories: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  search: "",
  inputSearch: "",
  loading: false,
  error: null,
  creating: false,
  createError: null,
  updating: false,
  updateError: null,
  deleting: false,
  deleteError: null,

  setInputSearch: (inputSearch) => {
    set({ inputSearch });
  },

  applySearch: async () => {
    const state = useCategoryStore.getState();
    const nextSearch = state.inputSearch.trim();

    set({
      search: nextSearch,
      page: 1,
    });

    return useCategoryStore.getState().fetchCategories(1, state.limit, nextSearch);
  },

  clearSearch: async () => {
    const state = useCategoryStore.getState();

    set({
      search: "",
      inputSearch: "",
      page: 1,
    });

    return useCategoryStore.getState().fetchCategories(1, state.limit, "");
  },

  fetchCategories: async (page = 1, limit = 10, searchValue) => {
    try {
      set({ loading: true, error: null });
      const activeSearch =
        typeof searchValue === "string"
          ? searchValue
          : useCategoryStore.getState().search;

      const res = await getCategories({
        page,
        limit,
        search: activeSearch,
      });

      if (isSuccessResponse(res)) {
        set({
          categories: (res.data?.items || []).map(normalizeCategory).filter(Boolean),
          page: res.data?.page || page,
          limit: res.data?.limit || limit,
          total: res.data?.total || 0,
          totalPages: res.data?.totalPages || 0,
          search: activeSearch,
          inputSearch: activeSearch,
          loading: false,
          error: null,
        });
        return res;
      }

      set({
        loading: false,
        error: res.message || "Failed to fetch categories",
      });
      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch categories");
      set({
        categories: [],
        loading: false,
        error: message,
      });
      throw new Error(message);
    }
  },

  createCategory: async (payload) => {
    try {
      set({ creating: true, createError: null });

      const res = await createCategoryRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res.message || "Failed to create category");
      }

      set({ creating: false, createError: null });
      return {
        ...res,
        data: normalizeCategory(res.data),
      };
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create category");
      set({ creating: false, createError: message });
      throw new Error(message);
    }
  },

  resetCreateCategoryState: () => {
    set({ creating: false, createError: null });
  },

  updateCategory: async (categoryId, payload) => {
    try {
      set({ updating: true, updateError: null });

      const res = await updateCategoryRequest(categoryId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res.message || "Failed to update category");
      }

      const updatedItem = normalizeCategory(res.data);

      set((state) => ({
        updating: false,
        updateError: null,
        categories: state.categories.map((category) =>
          category.id === categoryId
            ? { ...category, ...(updatedItem || payload) }
            : category
        ),
      }));

      return {
        ...res,
        data: updatedItem,
      };
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update category");
      set({ updating: false, updateError: message });
      throw new Error(message);
    }
  },

  resetUpdateCategoryState: () => {
    set({ updating: false, updateError: null });
  },

  deleteCategory: async (categoryId) => {
    try {
      set({ deleting: true, deleteError: null });

      const res = await deleteCategoryRequest(categoryId);

      if (!isSuccessResponse(res)) {
        throw new Error(res.message || "Failed to delete category");
      }

      set((state) => ({
        deleting: false,
        deleteError: null,
        categories: state.categories.filter((category) => category.id !== categoryId),
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete category");
      set({ deleting: false, deleteError: message });
      throw new Error(message);
    }
  },

  resetDeleteCategoryState: () => {
    set({ deleting: false, deleteError: null });
  },
}));
