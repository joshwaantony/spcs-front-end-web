"use client";

import { create } from "zustand";
import {
  getPublicBooks,
  getPublicCategories,
} from "@/services/user/book-store/books.api";

const createDefaultFilters = (overrides = {}) => ({
  page: 1,
  limit: 20,
  search: "",
  categoryId: "",
  formatType: "",
  minPrice: "",
  maxPrice: "",
  languageCode: "",
  hasDiscount: false,
  inStock: false,
  isDigital: false,
  isFeatured: false,
  isNewArrival: false,
  isBestsellerManual: false,
  isAwardWinner: false,
  isPrePublication: false,
  sort: "newest",
  ...overrides,
});

const parseBoolean = (value) => value === true || value === "true";

const parseNumberInput = (value, fallback = undefined) => {
  if (value === "" || value === undefined || value === null) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const normalizeCatalogQuery = (query = {}, overrides = {}) =>
  createDefaultFilters({
    page: Math.max(1, parseNumberInput(query.page, 1)),
    limit: Math.min(100, Math.max(1, parseNumberInput(query.limit, 20))),
    search: query.search || "",
    categoryId: query.categoryId || "",
    formatType: overrides.formatType || query.formatType || "",
    minPrice: query.minPrice ?? "",
    maxPrice: query.maxPrice ?? "",
    languageCode: query.languageCode || "",
    hasDiscount: parseBoolean(query.hasDiscount),
    inStock: parseBoolean(query.inStock),
    isDigital: parseBoolean(query.isDigital),
    isFeatured: parseBoolean(query.isFeatured),
    isNewArrival: parseBoolean(query.isNewArrival),
    isBestsellerManual: parseBoolean(query.isBestsellerManual),
    isAwardWinner: parseBoolean(query.isAwardWinner),
    isPrePublication: parseBoolean(query.isPrePublication),
    sort: query.sort === "rank" ? "rank" : "newest",
  });

const mapFiltersToRequest = (filters) => ({
  ...filters,
  minPrice:
    filters.minPrice === "" ? undefined : parseNumberInput(filters.minPrice),
  maxPrice:
    filters.maxPrice === "" ? undefined : parseNumberInput(filters.maxPrice),
});

const filterBooksByAllowedFormats = (books, allowedFormats) => {
  if (!Array.isArray(allowedFormats) || allowedFormats.length === 0) {
    return books;
  }

  return books.filter((book) => allowedFormats.includes(book.formatType));
};

const getFilteredMeta = (responseMeta, filteredBooks, allowedFormats) => {
  if (!Array.isArray(allowedFormats) || allowedFormats.length === 0) {
    return {
      total: responseMeta.total,
      totalPages: responseMeta.totalPages,
    };
  }

  return {
    total: filteredBooks.length,
    totalPages: Math.max(
      1,
      Math.ceil(filteredBooks.length / Math.max(1, responseMeta.limit))
    ),
  };
};

export const useUserBookStore = create((set, get) => ({
  books: [],
  total: 0,
  totalPages: 1,
  categories: [],
  filters: createDefaultFilters(),
  loading: false,
  categoryLoading: false,
  error: "",

  hydrateFilters: (query, overrides = {}) => {
    const filters = normalizeCatalogQuery(query, overrides);
    set({ filters });
    return filters;
  },

  fetchBooks: async (query, overrides = {}) => {
    const filters = query ? get().hydrateFilters(query, overrides) : get().filters;

    try {
      set({
        loading: true,
        error: "",
      });

      const response = await getPublicBooks(mapFiltersToRequest(filters));
      const books = filterBooksByAllowedFormats(
        response.books,
        overrides.allowedFormats
      );
      const filteredMeta = getFilteredMeta(
        response.meta,
        books,
        overrides.allowedFormats
      );

      set({
        books,
        total: filteredMeta.total,
        totalPages: filteredMeta.totalPages,
        filters: {
          ...filters,
          page: response.meta.page,
          limit: response.meta.limit,
        },
        loading: false,
        error: "",
      });
    } catch (error) {
      set({
        books: [],
        total: 0,
        totalPages: 1,
        loading: false,
        error: error?.message || "Failed to fetch books.",
      });
    }
  },

  fetchCategories: async () => {
    if (get().categories.length > 0) {
      return;
    }

    try {
      set({
        categoryLoading: true,
      });

      const categories = await getPublicCategories();
      set({
        categories,
        categoryLoading: false,
      });
    } catch {
      set({
        categories: [],
        categoryLoading: false,
      });
    }
  },
}));
