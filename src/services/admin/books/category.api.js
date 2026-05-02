import api from "@/lib/admin-axios";

export const getCategories = async ({ page = 1, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const res = await api.get(`/admin/categories?${params.toString()}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch categories" };
  }
};

export const createCategory = async (payload) => {
  try {
    const res = await api.post("/admin/categories", payload);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create category" };
  }
};

export const updateCategory = async (categoryId, payload) => {
  try {
    const res = await api.put(`/admin/categories/${categoryId}`, payload);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update category" };
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const res = await api.delete(`/admin/categories/${categoryId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete category" };
  }
};
