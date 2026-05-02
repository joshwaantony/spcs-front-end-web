import api from "@/lib/admin-axios";

export const getBulletins = async (page = 1, limit = 10, search = "") => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (search) {
      params.append("search", search);
    }

    const res = await api.get(`/admin/bulletin?${params.toString()}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch bulletins" };
  }
};

export const createBulletin = async (payload) => {
  try {
    const res = await api.post("/admin/bulletin", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create bulletin" };
  }
};

export const updateBulletin = async (bulletinId, payload) => {
  try {
    const res = await api.put(`/admin/bulletin/${bulletinId}`, payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update bulletin" };
  }
};

export const deleteBulletin = async (bulletinId) => {
  try {
    const res = await api.delete(`/admin/bulletin/${bulletinId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete bulletin" };
  }
};
