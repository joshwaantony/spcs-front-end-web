"use client";

import { create } from "zustand";
import {
  createNotification as createNotificationRequest,
  deleteNotification as deleteNotificationRequest,
  getNotifications,
  updateNotification as updateNotificationRequest,
} from "@/services/admin/dashboard/notification.api";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

const normalizeNotificationImageUrl = (url) => {
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

const normalizeNotification = (notification) => ({
  ...notification,
  notification_image_url: normalizeNotificationImageUrl(
    notification?.notification_image_url
  ),
});

export const useNotificationStore = create((set) => ({
  notifications: [],
  page: 1,
  limit: 5,
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

  fetchNotifications: async (page = 1) => {
    try {
      set({ loading: true, error: null });

      const res = await getNotifications(page, 5);

      if (res.success) {
        const pagination = res.data?.pagination || {};

        set({
          notifications: (res.data.items || []).map(normalizeNotification),
          page: pagination.page || page,
          limit: pagination.limit || 5,
          total: pagination.total || 0,
          totalPages: pagination.total_pages || 0,
          loading: false,
          error: null,
        });
      } else {
        set({
          loading: false,
          error: res.message || res.msg,
        });
      }
    } catch (error) {
      set({
        notifications: [],
        loading: false,
        error: getErrorMessage(error, "Failed to fetch notifications"),
      });
    }
  },

  createNotification: async (payload) => {
    try {
      set({ creating: true, createError: null });

      const res = await createNotificationRequest(payload);

      if (!res.success) {
        throw new Error(res.message || "Failed to create notification");
      }

      const createdItem = res.data?.item;

      set((state) => ({
        creating: false,
        createError: null,
        notifications: createdItem
          ? [normalizeNotification(createdItem), ...state.notifications]
          : state.notifications,
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create notification");
      set({ creating: false, createError: message });
      throw new Error(message);
    }
  },

  updateNotification: async (notificationId, payload) => {
    try {
      set({ updating: true, updateError: null });

      const res = await updateNotificationRequest(notificationId, payload);

      if (!res.success) {
        throw new Error(res.message || "Failed to update notification");
      }

      const updatedItem = res.data?.item || res.data?.updatedItem;

      set((state) => ({
        updating: false,
        updateError: null,
        notifications: state.notifications.map((notification) =>
          notification.id === notificationId
            ? normalizeNotification(updatedItem || notification)
            : notification
        ),
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update notification");
      set({ updating: false, updateError: message });
      throw new Error(message);
    }
  },

  deleteNotification: async (notificationId) => {
    try {
      set({ deleting: true, deleteError: null });

      const res = await deleteNotificationRequest(notificationId);

      if (!res.success) {
        throw new Error(res.message || "Failed to delete notification");
      }

      set((state) => ({
        deleting: false,
        deleteError: null,
        notifications: state.notifications.filter(
          (notification) => notification.id !== notificationId
        ),
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete notification");
      set({ deleting: false, deleteError: message });
      throw new Error(message);
    }
  },

  resetCreateNotificationState: () => {
    set({ creating: false, createError: null });
  },

  resetUpdateNotificationState: () => {
    set({ updating: false, updateError: null });
  },

  resetDeleteNotificationState: () => {
    set({ deleting: false, deleteError: null });
  },
}));
