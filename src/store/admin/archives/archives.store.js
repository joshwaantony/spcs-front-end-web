"use client";

import { create } from "zustand";
import {
  createArchive as createArchiveRequest,
  deleteArchive as deleteArchiveRequest,
  downloadArchive as downloadArchiveRequest,
  getArchives as getArchivesRequest,
  updateArchive as updateArchiveRequest,
} from "@/services/admin/archives/archives.api";

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

const getArchiveIcon = (fileType = "") => {
  const normalizedType = String(fileType).toUpperCase();

  if (normalizedType === "PDF") {
    return "picture_as_pdf";
  }

  if (normalizedType === "XLSX" || normalizedType === "XLS") {
    return "table_chart";
  }

  if (normalizedType === "DOC" || normalizedType === "DOCX") {
    return "description";
  }

  return "inventory_2";
};

const getInitialArchiveForm = () => ({
  title: "",
  year: String(new Date().getFullYear()),
  archiveFile: null,
});

const normalizeArchive = (item) => {
  if (!item) {
    return null;
  }

  const id = item.id || item.archive_id || item._id || "";
  const title = item.title || item.name || "Untitled Archive";
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
    year: item.year ? String(item.year) : fallbackYear,
    date: formatUploadedDate(uploadedDate),
    fileType: item.file_type || item.fileType || "",
    fileUrl:
      item.archive_file_url ||
      item.file_url ||
      item.fileUrl ||
      "",
    icon: getArchiveIcon(item.file_type || item.fileType || ""),
  };
};

export const useArchivesStore = create((set, get) => ({
  archives: [],
  loading: false,
  error: null,
  search: "",
  inputSearch: "",
  form: getInitialArchiveForm(),
  creating: false,
  createError: null,
  createSuccess: "",
  updating: false,
  updateError: null,
  updateSuccess: "",
  deletingId: "",
  deleteError: null,
  deleteSuccess: "",
  downloading: false,
  downloadError: null,

  setArchiveFormValue: (field, value) => {
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
    }));
  },

  resetArchiveForm: () => {
    set({
      form: getInitialArchiveForm(),
      createError: null,
      createSuccess: "",
    });
  },

  resetUpdateArchiveState: () => {
    set({
      updating: false,
      updateError: null,
      updateSuccess: "",
    });
  },

  resetDeleteArchiveState: () => {
    set({
      deletingId: "",
      deleteError: null,
      deleteSuccess: "",
    });
  },

  setInputSearch: (inputSearch) => {
    set({ inputSearch });
  },

  applySearch: async () => {
    const state = get();
    const nextSearch = state.inputSearch.trim();

    set({
      search: nextSearch,
    });

    return get().fetchArchives({ search: nextSearch });
  },

  clearSearch: async () => {
    set({
      search: "",
      inputSearch: "",
    });

    return get().fetchArchives({ search: "" });
  },

  fetchArchives: async ({ search } = {}) => {
    const state = get();
    const activeSearch =
      typeof search === "string" ? search : state.search;

    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getArchivesRequest({
        search: activeSearch,
      });

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch archives");
      }

      const items = (res?.data || []).map(normalizeArchive).filter(Boolean);

      set({
        archives: items,
        loading: false,
        error: null,
        search: activeSearch,
        inputSearch: activeSearch,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch archives");

      set({
        archives: [],
        loading: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  createArchive: async () => {
    const state = get();
    const normalizedTitle = state.form.title.trim();

    if (!normalizedTitle) {
      const message = "Archive title is required.";
      set({
        createError: message,
        createSuccess: "",
      });
      throw new Error(message);
    }

    if (!state.form.year) {
      const message = "Archive year is required.";
      set({
        createError: message,
        createSuccess: "",
      });
      throw new Error(message);
    }

    if (!state.form.archiveFile) {
      const message = "Please upload an archive file.";
      set({
        createError: message,
        createSuccess: "",
      });
      throw new Error(message);
    }

    try {
      set({
        creating: true,
        createError: null,
        createSuccess: "",
      });

      const payload = new FormData();
      payload.append("title", normalizedTitle);
      payload.append("year", String(state.form.year));
      payload.append("archive_file", state.form.archiveFile);

      const res = await createArchiveRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to create archive");
      }

      set({
        creating: false,
        createError: null,
        createSuccess: res?.message || "Archive created successfully.",
        form: getInitialArchiveForm(),
      });

      await get().fetchArchives({
        search: state.search,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create archive");

      set({
        creating: false,
        createError: message,
        createSuccess: "",
      });

      throw new Error(message);
    }
  },

  updateArchiveById: async (archiveId, payload) => {
    if (!archiveId) {
      throw new Error("Archive id is required.");
    }

    try {
      set({
        updating: true,
        updateError: null,
        updateSuccess: "",
      });

      const res = await updateArchiveRequest(archiveId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update archive");
      }

      set({
        updating: false,
        updateError: null,
        updateSuccess: res?.message || "Archive updated successfully.",
      });

      await get().fetchArchives({
        search: get().search,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update archive");

      set({
        updating: false,
        updateError: message,
        updateSuccess: "",
      });

      throw new Error(message);
    }
  },

  deleteArchiveById: async (archiveId) => {
    try {
      set({
        deletingId: archiveId,
        deleteError: null,
        deleteSuccess: "",
      });

      const res = await deleteArchiveRequest(archiveId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete archive");
      }

      set((state) => ({
        deletingId: "",
        deleteError: null,
        deleteSuccess: res?.message || "Archive deleted successfully.",
        archives: state.archives.filter((archive) => archive.id !== archiveId),
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete archive");

      set({
        deletingId: "",
        deleteError: message,
        deleteSuccess: "",
      });

      throw new Error(message);
    }
  },

  clearArchiveFeedback: () => {
    set({
      createError: null,
      createSuccess: "",
      updateError: null,
      updateSuccess: "",
      deleteError: null,
      deleteSuccess: "",
      downloadError: null,
    });
  },

  downloadArchiveById: async (archive) => {
    if (!archive?.id || typeof window === "undefined") {
      return;
    }

    try {
      set({
        downloading: true,
        downloadError: null,
      });

      const { blob, filename } = await downloadArchiveRequest(archive.id);
      const fileNameFallback =
        filename ||
        `${archive.title || "archive"}.${String(
          archive.fileType || ""
        ).toLowerCase()}`;

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = fileNameFallback;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      set({
        downloading: false,
        downloadError: null,
      });
    } catch (error) {
      const message = getErrorMessage(error, "Failed to download archive");

      set({
        downloading: false,
        downloadError: message,
      });
    }
  },
}));
