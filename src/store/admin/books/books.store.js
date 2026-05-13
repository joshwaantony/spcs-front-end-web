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

const getMediaUrl = (media) => {
  if (!media) {
    return "";
  }

  return (
    media.url ||
    media.secureUrl ||
    media.fileUrl ||
    media.path ||
    media.src ||
    ""
  );
};

const getPrimaryFormat = (formats = []) => {
  if (!Array.isArray(formats) || formats.length === 0) {
    return null;
  }

  return (
    formats.find((format) => format?.type === "PAPERBACK") ||
    formats.find((format) => format?.type === "HARDCOVER") ||
    formats[0]
  );
};

const mapFormatTypeToLegacyType = (type) => {
  if (type === "AUDIO_BOOK" || type === "AUDIOBOOK") {
    return "AUDIO";
  }

  if (type === "HARD_COPY") {
    return "PAPERBACK";
  }

  return type || "PAPERBACK";
};

export const normalizeBook = (book) => {
  if (!book) {
    return null;
  }

  const primaryCategoryLink = Array.isArray(book.categories)
    ? book.categories[0]
    : null;
  const primaryCategory = primaryCategoryLink?.category || null;
  const primaryFormat = getPrimaryFormat(book.formats);
  const coverImageUrl =
    book.cover_image_url ||
    book.image ||
    getMediaUrl(book.coverMedia) ||
    getMediaUrl(primaryFormat?.media);
  const title = book.title || book.name || "";
  const authorName = book.authorName || book.author || "";
  const language = book.languageCode || book.language || "";
  const categoryId =
    primaryCategory?.id ||
    primaryCategoryLink?.categoryId ||
    book.category_id ||
    "";
  const categoryName =
    primaryCategory?.name ||
    book.category_name ||
    (typeof book.category === "string" ? book.category : "");
  const price =
    primaryFormat?.price ??
    book.price ??
    "";
  const stockCount =
    primaryFormat?.stockCount ??
    book.stock ??
    0;
  const unlimitedStock =
    primaryFormat?.hasUnlimitedStock ??
    book.unlimited_stock ??
    false;
  const status = book.status || "DRAFT";

  return {
    ...book,
    id: book.id || book.book_id || "",
    book_id: book.book_id || book.id || "",
    title,
    name: title,
    author: authorName,
    authorName: authorName,
    malayalam_name: book.titleMl || book.malayalam_name || "",
    author_malayalam: book.authorNameMl || book.author_malayalam || "",
    image: coverImageUrl,
    cover_image_url: coverImageUrl,
    language,
    category: categoryId,
    category_id: categoryId,
    category_name: categoryName,
    price: String(price),
    discountAmount: String(
      primaryFormat?.discountAmount ?? book.discountAmount ?? 0
    ),
    formatId: primaryFormat?.id || book.formatId || "",
    formatMediaId: primaryFormat?.mediaId || book.formatMediaId || "",
    formatIsActive: Boolean(
      primaryFormat?.isActive ?? book.formatIsActive ?? true
    ),
    formatIsDigitalEnabled: Boolean(
      primaryFormat?.isDigitalEnabled ?? book.formatIsDigitalEnabled
    ),
    formatDrmEnabled: Boolean(
      primaryFormat?.drmEnabled ?? book.formatDrmEnabled ?? true
    ),
    sku: primaryFormat?.sku || book.sku || "",
    type: mapFormatTypeToLegacyType(primaryFormat?.type || book.type),
    isbn: primaryFormat?.isbn || book.isbn || "",
    stock: String(stockCount),
    unlimited_stock: Boolean(unlimitedStock),
    best_seller: Boolean(
      book.isBestsellerManual ?? book.best_seller
    ),
    award_winner: Boolean(book.isAwardWinner ?? book.award_winner),
    new_arrival: Boolean(book.isNewArrival ?? book.new_arrival),
    republication: Boolean(
      book.isPrePublication ?? book.republication
    ),
    highlight: Boolean(book.isFeatured ?? book.highlight),
    rank: book.rankOrder ?? book.rank ?? 0,
    num_of_pages: book.pages ?? book.num_of_pages ?? 0,
    publisher:
      book.publisher?.name ||
      book.publisherName ||
      book.publisher ||
      "",
    status,
    badge:
      book.badge ||
      (book.isBestsellerManual ?? book.best_seller
        ? "Bestseller"
        : status),
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
  const date = new Date(`${value}T00:00:00`);

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
        fromDate: activeFromDate,
        toDate: activeToDate,
        page: activePage,
        limit: activeLimit,
      });

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch books");
      }

      set({
        books: (res.data || []).map(normalizeBook).filter(Boolean),
        filter: activeFilter,
        search: activeSearch,
        inputSearch: activeSearch,
        fromDate: activeFromDate,
        toDate: activeToDate,
        page: res.meta?.page || activePage,
        limit: res.meta?.limit || activeLimit,
        total: res.meta?.total || 0,
        totalPages: res.meta?.totalPages || 0,
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
