"use client";

import { create } from "zustand";
import {
  deleteFeedback as deleteFeedbackRequest,
  getFeedback as getFeedbackRequest,
  replyFeedback as replyFeedbackRequest,
} from "@/services/admin/feedback/feedback.api";

const formatApiDate = (value) => {
  if (!value) {
    return "";
  }

  const [year, month, day] = String(value).split("-");

  if (!year || !month || !day) {
    return "";
  }

  return `${day}-${month}-${year}`;
};

const isSuccessResponse = (response) =>
  response?.success === true || response?.status === "success";

const getErrorMessage = (error, fallback) => {
  const errorData = error?.error || error?.data?.error || error?.data || error;
  const fieldErrors = errorData?.details?.fieldErrors;

  return (
    fieldErrors?.body?.[0] ||
    fieldErrors?.message?.[0] ||
    fieldErrors?.search?.[0] ||
    fieldErrors?.from_date?.[0] ||
    fieldErrors?.to_date?.[0] ||
    errorData?.message ||
    error?.message ||
    error?.msg ||
    fallback
  );
};

const parseFeedback = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.feedback)) {
    return responseData.feedback;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

const getPaginationMeta = (responseData, fallbackPage, fallbackLimit, itemCount) => {
  const page = Number(responseData?.page) || fallbackPage;
  const limit = Number(responseData?.limit) || fallbackLimit;
  const total =
    Number(responseData?.total) ||
    Number(responseData?.count) ||
    itemCount;
  const totalPages =
    Number(responseData?.totalPages) || Math.max(Math.ceil(total / limit), 1);

  return {
    page,
    limit,
    total,
    totalPages,
  };
};

export const useFeedbackStore = create((set, get) => ({
  feedback: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  search: "",
  inputSearch: "",
  fromDate: "",
  toDate: "",
  loading: false,
  error: null,
  replying: false,
  replyError: null,
  replySuccess: "",
  deleting: false,
  deleteError: null,
  deleteSuccess: "",

  setInputSearch: (inputSearch) => {
    set({ inputSearch });
  },

  setFromDate: (fromDate) => {
    set({ fromDate });
  },

  setToDate: (toDate) => {
    set({ toDate });
  },

  applySearch: () => {
    const { inputSearch } = get();
    set({
      search: inputSearch.trim(),
      page: 1,
    });
    return get().fetchFeedback(1);
  },

  fetchFeedback: async (nextPage) => {
    const state = get();
    const page = nextPage || state.page || 1;

    try {
      set({ loading: true, error: null });

      const res = await getFeedbackRequest({
        page,
        limit: state.limit,
        search: state.search,
        fromDate: formatApiDate(state.fromDate),
        toDate: formatApiDate(state.toDate),
      });

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to fetch feedback");
      }

      const feedback = parseFeedback(res?.data).filter(Boolean);
      const pagination = getPaginationMeta(
        res?.data,
        page,
        state.limit,
        feedback.length
      );

      set({
        feedback,
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: pagination.totalPages,
        loading: false,
        error: null,
      });

      return res;
    } catch (error) {
      set({
        feedback: [],
        loading: false,
        error: getErrorMessage(error, "Failed to fetch feedback"),
      });
      return null;
    }
  },

  replyFeedback: async (feedbackId, payload) => {
    try {
      set({ replying: true, replyError: null, replySuccess: "" });

      const res = await replyFeedbackRequest(feedbackId, payload);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to send reply");
      }

      set({
        replying: false,
        replyError: null,
        replySuccess: res?.message || "Reply sent successfully",
      });

      return res;
    } catch (error) {
      set({
        replying: false,
        replyError: getErrorMessage(error, "Failed to send reply"),
        replySuccess: "",
      });
      throw error;
    }
  },

  resetReplyState: () => {
    set({ replying: false, replyError: null, replySuccess: "" });
  },

  deleteFeedback: async (feedbackId) => {
    try {
      set({ deleting: true, deleteError: null, deleteSuccess: "" });

      const res = await deleteFeedbackRequest(feedbackId);

      if (!isSuccessResponse(res)) {
        throw new Error(res?.message || "Failed to delete feedback");
      }

      set((state) => ({
        feedback: state.feedback.filter((item) => item.id !== feedbackId),
        total: Math.max((state.total || 0) - 1, 0),
        deleting: false,
        deleteError: null,
        deleteSuccess: res?.message || "Feedback deleted successfully",
      }));

      return res;
    } catch (error) {
      set({
        deleting: false,
        deleteError: getErrorMessage(error, "Failed to delete feedback"),
        deleteSuccess: "",
      });
      throw error;
    }
  },

  resetDeleteState: () => {
    set({ deleting: false, deleteError: null, deleteSuccess: "" });
  },
}));
