import api from "@/lib/admin-axios";

export const getAwards = async (page = 1, limit = 8) => {
  try {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));

    const res = await api.get(`/admin/awards?${params.toString()}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch awards" };
  }
};

export const createAward = async (payload) => {
  try {
    const res = await api.post("/admin/awards", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create award" };
  }
};

export const updateAward = async (awardId, payload) => {
  try {
    const res = await api.put(`/admin/awards/${awardId}`, payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update award" };
  }
};

export const deleteAward = async (awardId) => {
  try {
    const res = await api.delete(`/admin/awards/${awardId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete award" };
  }
};
