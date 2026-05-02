"use client";

import { create } from "zustand";

const TOAST_DURATION = 3500;

export const useToastStore = create((set, get) => ({
  toasts: [],

  showToast: ({ type = "success", message = "" }) => {
    const trimmedMessage = String(message || "").trim();

    if (!trimmedMessage) {
      return;
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    set((state) => ({
      toasts: [...state.toasts, { id, type, message: trimmedMessage }],
    }));

    window.setTimeout(() => {
      get().dismissToast(id);
    }, TOAST_DURATION);
  },

  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
