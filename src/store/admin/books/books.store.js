"use client";

import { create } from "zustand";
import {
  createBook as createBookRequest,
  deleteBook as deleteBookRequest,
  exportBooksCsv as exportBooksCsvRequest,
  getBooks,
  updateBook as updateBookRequest,
} from "@/services/admin/books/books.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const normalizeBook = (book) => {
  if (!book) {
    return null;
  }

  return {
    ...book,
    id: book.id || book.book_id || "",
    book_id: book.book_id || book.id || "",
    title: book.title || book.name || "",
    name: book.name || book.title || "",
    image: book.image || book.cover_image_url || "",
    cover_image_url: book.cover_image_url || book.image || "",
    badge:
      book.badge ||
      (book.best_seller ? "Bestseller" : "Standard"),
    createdAt: book.createdAt || book.created_at || "",
    created_at: book.created_at || book.createdAt || "",
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

const parseApiDate = (value) => {
  if (!value) {
    return null;
  }

  const [day, month, year] = value.split("-");

  if (!day || !month || !year) {
    return null;
  }

  const date = new Date(`${year}-${month}-${day}T00:00:00`);

  return Number.isNaN(date.getTime()) ? null : date;
};

export const useBooksStore = create((set, get) => ({
  books: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  filter: "all",
  search: "",
  inputSearch: "",
  fromDate: "",
  toDate: "",
  loading: false,
  error: null,
  creating: false,
  createError: null,
  updating: false,
  updateError: null,
  deleting: false,
  deleteError: null,
  exporting: false,
  exportError: null,

  setFilter: (filter) => {
    set({
      filter,
      page: 1,
    });
  },

  setInputSearch: (inputSearch) => {
    set({ inputSearch });
  },

  setFromDate: (fromDate) => {
    set({ fromDate });
  },

  setToDate: (toDate) => {
    set({ toDate });
  },

  applySearch: async () => {
    const state = get();
    const nextSearch = state.inputSearch.trim();

    set({
      search: nextSearch,
      page: 1,
    });

    return get().fetchBooks({
      page: 1,
      search: nextSearch,
    });
  },

  clearSearch: async () => {
    set({
      search: "",
      inputSearch: "",
      page: 1,
    });

    return get().fetchBooks({
      page: 1,
      search: "",
    });
  },

  applyDateFilter: async () => {
    const state = get();
    const fromDateValue = parseApiDate(state.fromDate);
    const toDateValue = parseApiDate(state.toDate);

    if (fromDateValue && toDateValue && fromDateValue > toDateValue) {
      const message = "from_date must be less than or equal to to_date";

      set({
        error: message,
      });

      throw new Error(message);
    }

    set({
      page: 1,
      error: null,
    });

    return get().fetchBooks({
      page: 1,
      fromDate: state.fromDate,
      toDate: state.toDate,
    });
  },

  clearDateFilter: async () => {
    set({
      fromDate: "",
      toDate: "",
      page: 1,
    });

    return get().fetchBooks({
      page: 1,
      fromDate: "",
      toDate: "",
    });
  },

  fetchBooks: async ({ filter, page, limit, search, fromDate, toDate } = {}) => {
    const state = get();
    const activeFilter = filter || state.filter || "all";
    const activePage = page || state.page || 1;
    const activeLimit = limit || state.limit || 10;
    const activeSearch =
      typeof search === "string" ? search : state.search;
    const activeFromDate =
      typeof fromDate === "string" ? fromDate : state.fromDate;
    const activeToDate =
      typeof toDate === "string" ? toDate : state.toDate;

    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getBooks({
        filter: activeFilter,
        search: activeSearch,
        from_date: activeFromDate,
        to_date: activeToDate,
        page: activePage,
        limit: activeLimit,
      });

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch books");
      }

      set({
        books: (res.data?.items || []).map(normalizeBook).filter(Boolean),
        filter: activeFilter,
        search: activeSearch,
        inputSearch: activeSearch,
        fromDate: activeFromDate,
        toDate: activeToDate,
        page: res.data?.page || activePage,
        limit: res.data?.limit || activeLimit,
        total: res.data?.total || 0,
        totalPages: res.data?.totalPages || 0,
        loading: false,
        error: null,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch books");

      set({
        books: [],
        loading: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  createBook: async (payload) => {
    try {
      set({
        creating: true,
        createError: null,
      });

      const res = await createBookRequest(payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to create book");
      }

      const createdItem = normalizeBook(res?.data?.item || res?.data);

      set((state) => ({
        creating: false,
        createError: null,
        books: createdItem ? [createdItem, ...state.books] : state.books,
      }));

      return {
        ...res,
        data: createdItem,
      };
    } catch (error) {
      const message = getErrorMessage(error, "Failed to create book");

      set({
        creating: false,
        createError: message,
      });

      throw new Error(message);
    }
  },

  resetCreateBookState: () => {
    set({
      creating: false,
      createError: null,
    });
  },

  updateBook: async (bookId, payload) => {
    try {
      set({
        updating: true,
        updateError: null,
      });

      const res = await updateBookRequest(bookId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to update book");
      }

      const updatedItem = normalizeBook(res?.data?.item || res?.data);

      set((state) => ({
        updating: false,
        updateError: null,
        books: state.books.map((book) =>
          book.id === bookId || book.book_id === bookId
            ? updatedItem || book
            : book
        ),
      }));

      return {
        ...res,
        data: updatedItem,
      };
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update book");

      set({
        updating: false,
        updateError: message,
      });

      throw new Error(message);
    }
  },

  resetUpdateBookState: () => {
    set({
      updating: false,
      updateError: null,
    });
  },

  deleteBook: async (bookId) => {
    try {
      set({
        deleting: true,
        deleteError: null,
      });

      const res = await deleteBookRequest(bookId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete book");
      }

      set((state) => ({
        deleting: false,
        deleteError: null,
        books: state.books.filter(
          (book) => book.id !== bookId && book.book_id !== bookId
        ),
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete book");

      set({
        deleting: false,
        deleteError: message,
      });

      throw new Error(message);
    }
  },

  resetDeleteBookState: () => {
    set({
      deleting: false,
      deleteError: null,
    });
  },

  exportBooksCsv: async () => {
    const state = get();

    try {
      set({
        exporting: true,
        exportError: null,
      });

      const { blob, filename } = await exportBooksCsvRequest({
        search: state.inputSearch.trim(),
        from_date: state.fromDate,
        to_date: state.toDate,
        filter: state.filter,
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
      const message = getErrorMessage(error, "Failed to export books CSV");

      set({
        exporting: false,
        exportError: message,
      });
    }
  },
}));
