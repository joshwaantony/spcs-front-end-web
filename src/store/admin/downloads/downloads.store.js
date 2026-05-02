"use client";

import { create } from "zustand";
import {
  createDownload as createDownloadRequest,
  deleteDownload as deleteDownloadRequest,
  getDownloads as getDownloadsRequest,
  updateDownload as updateDownloadRequest,
} from "@/services/admin/downloads/downloads.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const getErrorMessage = (error, fallback) =>
  error?.error?.details?.fieldErrors?.title?.[0] ||
  error?.error?.details?.fieldErrors?.file?.[0] ||
  error?.error?.message ||
  error?.message ||
  error?.msg ||
  error?.data?.message ||
  fallback;

const getCreatedDownloadItem = (response) =>
  response?.data?.item ||
  response?.data?.data?.item ||
  response?.item ||
  null;

const formatDate = (value) => {
  if (!value) {
    return "Date unavailable";
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

const formatFileSize = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Size unavailable";
  }

  const numeric = Number(value);

  if (Number.isNaN(numeric)) {
    return String(value);
  }

  if (numeric >= 1024 * 1024) {
    return `${(numeric / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (numeric >= 1024) {
    return `${(numeric / 1024).toFixed(1)} KB`;
  }

  return `${numeric} B`;
};

const getFileType = (item) => {
  const rawType =
    item?.type ||
    item?.file_type ||
    item?.fileType ||
    item?.extension ||
    item?.format ||
    "";

  if (rawType) {
    return String(rawType).replace(/^\./, "").toUpperCase();
  }

  const link = item?.file_link || item?.fileLink || item?.url || "";
  const extension = String(link).split(".").pop();
  return extension && extension !== link ? extension.toUpperCase() : "FILE";
};

const getFileIcon = (type) => {
  if (type === "PDF") {
    return {
      icon: "picture_as_pdf",
      bg: "bg-red-50",
      iconColor: "text-red-500",
    };
  }

  if (type === "DOC" || type === "DOCX") {
    return {
      icon: "description",
      bg: "bg-blue-50",
      iconColor: "text-blue-500",
    };
  }

  if (type === "XLS" || type === "XLSX" || type === "CSV") {
    return {
      icon: "table_chart",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    };
  }

  return {
    icon: "insert_drive_file",
    bg: "bg-gray-100",
    iconColor: "text-gray-600",
  };
};

const normalizeDownload = (item) => {
  if (!item) {
    return null;
  }

  const type = getFileType(item);
  const iconMeta = getFileIcon(type);

  return {
    ...item,
    id: item.id || item.download_id || item._id || "",
    title: item.title || item.name || "Untitled Resource",
    type,
    size: formatFileSize(item.file_size || item.fileSize || item.size),
    date: formatDate(item.created_at || item.createdAt || item.date),
    ...iconMeta,
  };
};

const parseDownloads = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.downloads)) {
    return responseData.downloads;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

export const useDownloadsStore = create((set) => ({
  downloads: [],
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

  fetchDownloads: async (searchValue = "") => {
    try {
      const nextSearch = searchValue.trim();

      set({
        loading: true,
        error: null,
      });

      const res = await getDownloadsRequest(nextSearch);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch downloads");
      }

      const downloads = parseDownloads(res?.data)
        .map(normalizeDownload)
        .filter(Boolean);

      set({
        downloads,
        loading: false,
        error: null,
        search: nextSearch,
        inputSearch: nextSearch,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch downloads");

      set({
        downloads: [],
        loading: false,
        error: message,
        search: searchValue.trim(),
      });

      return null;
    }
  },

  applySearch: async () => {
    const state = useDownloadsStore.getState();
    return state.fetchDownloads(state.inputSearch);
  },

  clearSearch: async () => {
    set({
      inputSearch: "",
    });

    return useDownloadsStore.getState().fetchDownloads("");
  },

  createDownload: async (payload) => {
    try {
      set({
        creating: true,
        createError: null,
        createSuccess: "",
      });

      const res = await createDownloadRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to create download");
      }

      const createdDownload = normalizeDownload(getCreatedDownloadItem(res));

      set((state) => ({
        downloads: createdDownload
          ? [createdDownload, ...state.downloads]
          : state.downloads,
        creating: false,
        createError: null,
        createSuccess: res?.message || "Download created successfully.",
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create download");

      set({
        creating: false,
        createError: message,
        createSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetCreateDownloadState: () => {
    set({
      creating: false,
      createError: null,
      createSuccess: "",
    });
  },

  updateDownload: async (downloadId, payload) => {
    try {
      set({
        updating: true,
        updateError: null,
        updateSuccess: "",
      });

      const res = await updateDownloadRequest(downloadId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update download");
      }

      const updatedDownload = normalizeDownload(getCreatedDownloadItem(res));

      set((state) => ({
        downloads: updatedDownload
          ? state.downloads.map((item) =>
              item.id === updatedDownload.id ? { ...item, ...updatedDownload } : item
            )
          : state.downloads,
        updating: false,
        updateError: null,
        updateSuccess: res?.message || "Download updated successfully.",
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update download");

      set({
        updating: false,
        updateError: message,
        updateSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetUpdateDownloadState: () => {
    set({
      updating: false,
      updateError: null,
      updateSuccess: "",
    });
  },

  deleteDownload: async (downloadId) => {
    try {
      set({
        deleting: true,
        deleteError: null,
        deleteSuccess: "",
      });

      const res = await deleteDownloadRequest(downloadId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete download");
      }

      set((state) => ({
        downloads: state.downloads.filter((item) => item.id !== downloadId),
        deleting: false,
        deleteError: null,
        deleteSuccess: res?.message || "Download deleted successfully.",
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete download");

      set({
        deleting: false,
        deleteError: message,
        deleteSuccess: "",
      });

      throw new Error(message);
    }
  },

  resetDeleteDownloadState: () => {
    set({
      deleting: false,
      deleteError: null,
      deleteSuccess: "",
    });
  },
}));
