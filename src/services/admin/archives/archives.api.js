import api, { apiRaw } from "@/lib/admin-axios";

export const getArchives = async ({ search = "" } = {}) => {
  try {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const query = params.toString();
    const res = await api.get(
      query ? `/admin/archives?${query}` : "/admin/archives"
    );
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch archives" };
  }
};

export const createArchive = async (payload) => {
  try {
    const res = await api.post("/admin/archives", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create archive" };
  }
};

export const updateArchive = async (archiveId, payload) => {
  try {
    const res = await api.put(`/admin/archives/${archiveId}`, payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update archive" };
  }
};

export const deleteArchive = async (archiveId) => {
  try {
    const res = await api.delete(`/admin/archives/${archiveId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete archive" };
  }
};

export const downloadArchive = async (archiveId) => {
  try {
    const response = await apiRaw.get(`/admin/archives/download/${archiveId}`, {
      responseType: "blob",
    });

    const disposition = response.headers["content-disposition"] || "";
    const filenameMatch = disposition.match(/filename="?([^"]+)"?/i);

    return {
      blob: response.data,
      filename: filenameMatch?.[1] || `archive-${archiveId}`,
    };
  } catch (error) {
    throw (
      error?.response?.data ||
      error?.data ||
      error || {
        message: "Failed to download archive",
      }
    );
  }
};
