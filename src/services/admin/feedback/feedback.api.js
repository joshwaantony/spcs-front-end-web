import api from "@/lib/admin-axios";

export const getFeedback = async ({
  page = 1,
  limit = 10,
  search = "",
  fromDate = "",
  toDate = "",
} = {}) => {
  try {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search.trim()) {
      params.append("search", search.trim());
    }

    if (fromDate) {
      params.append("from_date", fromDate);
    }

    if (toDate) {
      params.append("to_date", toDate);
    }

    const query = params.toString();
    const res = await api.get(`/admin/feedback${query ? `?${query}` : ""}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch feedback" };
  }
};

export const replyFeedback = async (feedbackId, payload) => {
  try {
    const res = await api.post(`/admin/feedback/reply/${feedbackId}`, payload);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to send reply" };
  }
};

export const deleteFeedback = async (feedbackId) => {
  try {
    const res = await api.delete(`/admin/feedback/${feedbackId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete feedback" };
  }
};
