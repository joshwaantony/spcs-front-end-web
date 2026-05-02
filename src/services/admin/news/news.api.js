import api from "@/lib/admin-axios";

export const getNews = async (type = "news") => {
  try {
    const params = new URLSearchParams();

    if (type?.trim()) {
      params.append("type", type.trim());
    }

    const query = params.toString();
    const res = await api.get(`/admin/events${query ? `?${query}` : ""}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch news" };
  }
};
