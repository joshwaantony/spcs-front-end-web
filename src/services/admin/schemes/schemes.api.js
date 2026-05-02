import api from "@/lib/admin-axios";

export const getSchemes = async (search = "") => {
  try {
    const params = new URLSearchParams();

    if (search?.trim()) {
      params.append("search", search.trim());
    }

    const query = params.toString();
    const res = await api.get(`/admin/scheme${query ? `?${query}` : ""}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch schemes" };
  }
};

export const createScheme = async (payload) => {
  try {
    const res = await api.post("/admin/scheme", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create scheme" };
  }
};

export const updateScheme = async (schemeId, payload) => {
  try {
    const res = await api.put(`/admin/scheme/${schemeId}`, payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update scheme" };
  }
};

export const deleteScheme = async (schemeId) => {
  try {
    const res = await api.delete(`/admin/scheme/${schemeId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete scheme" };
  }
};
