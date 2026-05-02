import api from "@/lib/admin-axios";

export const getOffers = async (page = 1, limit = 6) => {
  try {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    const res = await api.get(`/admin/offers?${params.toString()}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch offers" };
  }
};

export const createOffer = async (payload) => {
  try {
    const res = await api.post("/admin/offers", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create offer" };
  }
};

export const updateOffer = async (offerId, payload) => {
  try {
    const res = await api.put(`/admin/offers/${offerId}`, payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update offer" };
  }
};

export const deleteOffer = async (offerId) => {
  try {
    const res = await api.delete(`/admin/offers/${offerId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete offer" };
  }
};
