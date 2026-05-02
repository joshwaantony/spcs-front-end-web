import api from "@/lib/admin-axios";

export const getCatalogues = async ({ search = "" } = {}) => {
  try {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const query = params.toString();
    const res = await api.get(
      query ? `/admin/catalogue?${query}` : "/admin/catalogue"
    );
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch catalogues" };
  }
};

export const createCatalogue = async (payload) => {
  try {
    const res = await api.post("/admin/catalogue", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create catalogue" };
  }
};

export const updateCatalogue = async (catalogueId, payload) => {
  try {
    const res = await api.put(`/admin/catalogue/${catalogueId}`, payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update catalogue" };
  }
};

export const deleteCatalogue = async (catalogueId) => {
  try {
    const res = await api.delete(`/admin/catalogue/${catalogueId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete catalogue" };
  }
};
