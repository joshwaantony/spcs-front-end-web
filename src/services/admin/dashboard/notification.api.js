import api from "@/lib/admin-axios";

export const getNotifications = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(
      `/admin/dashboard/notifications?page=${page}&limit=${limit}`
    );

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch notifications" };
  }
};

export const createNotification = async (payload) => {
  try {
    const res = await api.post("/admin/dashboard/notifications", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create notification" };
  }
};

export const updateNotification = async (notificationId, payload) => {
  try {
    const res = await api.put(
      `/admin/dashboard/notifications/${notificationId}`,
      payload,
      {
        headers:
          payload instanceof FormData
            ? {
                "Content-Type": "multipart/form-data",
              }
            : undefined,
      }
    );

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update notification" };
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const res = await api.delete(
      `/admin/dashboard/notifications/${notificationId}`
    );

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete notification" };
  }
};
