"use client";

import { create } from "zustand";
import { getAdminDashboard } from "@/services/admin/dashboard/dashboard.api";

export const useAdminDashboardStore = create((set) => ({
  stats: null,
  loading: false,
  error: null,

  fetchDashboard: async () => {
    try {
      set({ loading: true, error: null });

      const data = await getAdminDashboard();

      if (data.success) {
        set({
          stats: data.data,
          loading: false,
        });
      } else {
        set({
          loading: false,
          error: data.message,
        });
      }

      return data;
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Failed to fetch dashboard",
      });
    }
  },
}));