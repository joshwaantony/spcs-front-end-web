import api from "@/lib/admin-axios";

export const getBranches = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/admin/dashboard/branches?page=${page}&limit=${limit}`);

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch branches" };
  }
};

export const createBranch = async (payload) => {
  try {
    const res = await api.post("/admin/dashboard/branches", payload);

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create branch" };
  }
};

export const updateBranch = async (branchId, payload) => {
  try {
    const res = await api.put(`/admin/dashboard/branches/${branchId}`, payload);

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update branch" };
  }
};

export const deleteBranch = async (branchId) => {
  try {
    const res = await api.delete(`/admin/dashboard/branches/${branchId}`);

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete branch" };
  }
};
