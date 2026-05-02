"use client";

import { create } from "zustand";
import { getNews as getNewsRequest } from "@/services/admin/news/news.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const getErrorMessage = (error, fallback) =>
  error?.error?.message ||
  error?.message ||
  error?.msg ||
  error?.data?.message ||
  fallback;

const formatNewsDate = (value) => {
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

const normalizeNews = (item) => {
  if (!item) {
    return null;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const apiOrigin = apiUrl.replace(/\/api\/?$/i, "").replace(/\/$/, "");
  const rawImage = item.image_url || item.imageUrl || item.image || "";
  const image =
    rawImage && /^https?:\/\//i.test(rawImage)
      ? rawImage
      : rawImage
        ? `${apiOrigin}${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`
        : "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200";

  return {
    ...item,
    id: item.id || item.news_id || item._id || "",
    title: item.title || item.name || "Untitled News",
    description: item.description || "No description available.",
    dateLabel: formatNewsDate(item.date || item.news_date || item.created_at),
    image,
    type: String(item.type || "news").toLowerCase(),
    fileLink: item.file_link || item.fileLink || "",
  };
};

const parseNews = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.news)) {
    return responseData.news;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

export const useNewsStore = create((set) => ({
  news: [],
  loading: false,
  error: null,

  fetchNews: async (type = "news") => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getNewsRequest(type);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch news");
      }

      const news = parseNews(res?.data).map(normalizeNews).filter(Boolean);

      set({
        news,
        loading: false,
        error: null,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch news");

      set({
        news: [],
        loading: false,
        error: message,
      });

      return null;
    }
  },
}));
