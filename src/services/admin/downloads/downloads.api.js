import api from "@/lib/admin-axios";

export const getDownloads = async (search = "") => {
  try {
    const params = new URLSearchParams();

    if (search?.trim()) {
      params.append("search", search.trim());
    }

    const query = params.toString();
    const res = await api.get(`/admin/downloads${query ? `?${query}` : ""}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch downloads" };
  }
};

export const createDownload = async (payload) => {
  try {
    const res = await api.post("/admin/downloads", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create download" };
  }
};

export const updateDownload = async (downloadId, payload) => {
  try {
    const res = await api.put(`/admin/downloads/${downloadId}`, payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update download" };
  }
};

export const deleteDownload = async (downloadId) => {
  try {
    const res = await api.delete(`/admin/downloads/${downloadId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete download" };
  }
};
