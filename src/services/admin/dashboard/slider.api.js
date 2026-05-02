import api from "@/lib/admin-axios";

export const getSliders = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(
      `/admin/dashboard/slider?page=${page}&limit=${limit}`
    );

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch sliders" };
  }
};

export const createSlider = async (payload) => {
  try {
    const res = await api.post("/admin/dashboard/slider", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create slider" };
  }
};

export const updateSlider = async (sliderId, payload) => {
  try {
    const res = await api.put(`/admin/dashboard/slider/${sliderId}`, payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update slider" };
  }
};

export const deleteSlider = async (sliderId) => {
  try {
    const res = await api.delete(`/admin/dashboard/slider/${sliderId}`);

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete slider" };
  }
};
