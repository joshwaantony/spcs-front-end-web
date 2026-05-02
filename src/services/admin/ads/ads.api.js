import api from "@/lib/admin-axios";

const getRequestConfig = (payload) => {
  if (!(payload instanceof FormData)) {
    return undefined;
  }

  return {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
};

export const getAds = async (page = 1, limit = 10) => {
  try {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    const res = await api.get(`/admin/ads?${params.toString()}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch ads" };
  }
};

export const createAd = async (payload) => {
  try {
    const res = await api.post("/admin/ads", payload, getRequestConfig(payload));

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create ad" };
  }
};

export const updateAd = async (adId, payload) => {
  try {
    const res = await api.put(
      `/admin/ads/${adId}`,
      payload,
      getRequestConfig(payload)
    );

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update ad" };
  }
};

export const deleteAd = async (adId) => {
  try {
    const res = await api.delete(`/admin/ads/${adId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete ad" };
  }
};
