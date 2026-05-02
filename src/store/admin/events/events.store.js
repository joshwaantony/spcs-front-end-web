"use client";

import { create } from "zustand";
import { getEvents as getEventsRequest } from "@/services/admin/events/events.api";

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const getErrorMessage = (error, fallback) =>
  error?.error?.message ||
  error?.message ||
  error?.msg ||
  error?.data?.message ||
  fallback;

const formatEventDate = (value) => {
  if (!value) {
    return {
      day: "--",
      month: "---",
      fullDate: "Date unavailable",
    };
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return {
      day: "--",
      month: "---",
      fullDate: String(value),
    };
  }

  return {
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    fullDate: date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };
};

const normalizeEvent = (item) => {
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
        : "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200";
  const dateParts = formatEventDate(item.date || item.event_date || item.created_at);
  const location = item.location || item.venue || "Location to be announced";
  const time = item.time || "Time to be announced";
  const type = String(item.type || "events").toLowerCase();

  return {
    ...item,
    id: item.id || item.event_id || item._id || "",
    title: item.title || item.name || "Untitled Event",
    description: item.description || "No description available.",
    image,
    month: dateParts.month,
    day: dateParts.day,
    fullDate: dateParts.fullDate,
    timeLabel: `${time} • ${location}`,
    tag: type === "events" ? "Event" : type,
    icon: type === "events" ? "event" : "calendar_month",
    fileLink: item.file_link || item.fileLink || "",
    location,
    time,
  };
};

const parseEvents = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.events)) {
    return responseData.events;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

export const useEventsStore = create((set) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async (type = "events") => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getEventsRequest(type);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch events");
      }

      const events = parseEvents(res?.data).map(normalizeEvent).filter(Boolean);

      set({
        events,
        loading: false,
        error: null,
      });

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch events");

      set({
        events: [],
        loading: false,
        error: message,
      });

      return null;
    }
  },
}));
