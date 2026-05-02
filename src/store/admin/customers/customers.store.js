"use client";

import { create } from "zustand";
import {
  exportCustomersCsv as exportCustomersCsvRequest,
  getCustomers,
} from "@/services/admin/customers/customers.api";

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

  if (error?.errors) {
    const messages = [];

    for (const field in error.errors) {
      if (Array.isArray(error.errors[field])) {
        messages.push(...error.errors[field]);
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

export const useCustomersStore = create((set, get) => ({
  customers: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  search: "",
  inputSearch: "",
  fromDate: "",
  toDate: "",
  loading: false,
  error: null,
  exporting: false,
  exportError: null,

  setInputSearch: (inputSearch) => {
    set({ inputSearch });
  },

  setFromDate: (fromDate) => {
    set({ fromDate });
  },

  setToDate: (toDate) => {
    set({ toDate });
  },

  applyFilters: () => {
    const { inputSearch } = get();
    set({
      search: inputSearch.trim(),
      page: 1,
    });
    return get().fetchCustomers(1);
  },

  fetchCustomers: async (nextPage) => {
    const state = get();
    const page = nextPage || state.page || 1;

    try {
      set({ loading: true, error: null });

      const res = await getCustomers({
        search: state.search,
        from_date: state.fromDate,
        to_date: state.toDate,
        page,
        limit: state.limit,
      });

      if (res.success) {
        set({
          customers: res.data?.items || [],
          page: res.data?.page || page,
          limit: res.data?.limit || state.limit,
          total: res.data?.total || 0,
          totalPages: res.data?.totalPages || 0,
          loading: false,
          error: null,
        });
      } else {
        set({
          loading: false,
          error: res.message || res.msg || "Failed to fetch customers",
        });
      }
    } catch (error) {
      set({
        customers: [],
        loading: false,
        error: getErrorMessage(error, "Failed to fetch customers"),
      });
    }
  },

  exportCustomersCsv: async () => {
    const state = get();
    const search = state.inputSearch.trim();

    try {
      set({
        exporting: true,
        exportError: null,
      });

      const { blob, filename } = await exportCustomersCsvRequest({
        search,
        from_date: state.fromDate,
        to_date: state.toDate,
      });

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      set({
        exporting: false,
        exportError: null,
      });
    } catch (error) {
      set({
        exporting: false,
        exportError: getErrorMessage(error, "Failed to export customers CSV"),
      });
    }
  },
}));
