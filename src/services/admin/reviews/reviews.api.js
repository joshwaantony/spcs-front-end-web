import api from "@/lib/admin-axios";

export const getReviews = async ({
  filter = "all",
  rating = "",
  search = "",
  page = 1,
  limit = 10,
} = {}) => {
  try {
    const params = new URLSearchParams();

    params.append("filter", filter);
    if (String(rating).trim()) {
      params.append("rating", String(rating).trim());
    }
    if (search.trim()) {
      params.append("search", search.trim());
    }
    params.append("page", String(page));
    params.append("limit", String(limit));

    const res = await api.get(`/admin/reviews?${params.toString()}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch reviews" };
  }
};

export const updateReviewStatus = async (reviewId, payload) => {
  try {
    const res = await api.put(`/admin/reviews/${reviewId}`, payload);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update review" };
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const res = await api.delete(`/admin/reviews/${reviewId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete review" };
  }
};
