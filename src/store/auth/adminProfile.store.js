"use client";

import { create } from "zustand";
import { getAdminProfile } from "@/services/auth/profile.api";

export const useAdminProfileStore = create((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });

      const data = await getAdminProfile();
      const profile = data?.data?.user || data?.data || null;

      if (data.success) {
        set({
          profile,
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
        error: error.message || "Failed to fetch profile",
      });
    }
  },
}));
