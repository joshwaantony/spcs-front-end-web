import api from "@/lib/admin-axios";

export const getOrders = async ({
  section = "book",
  page = 1,
  limit = 10,
  filter = "all",
  query = "",
  from_date = "",
  to_date = "",
} = {}) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      filter,
    });

    if (query) {
      params.set("query", query);
    }

    if (from_date) {
      params.set("from_date", from_date);
    }

    if (to_date) {
      params.set("to_date", to_date);
    }

    const res = await api.get(`/admin/orders/${section}?${params.toString()}`);

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch orders" };
  }
};

export const getOrderDetail = async ({ section = "book", orderId } = {}) => {
  try {
    const res = await api.get(`/admin/orders/${section}/order/${orderId}`);

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch order details" };
  }
};

export const toggleOrderStatus = async (payload) => {
  try {
    const res = await api.put("/admin/orders/toggleStatus", payload);

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update order status" };
  }
};

export const deleteOrder = async (payload) => {
  try {
    const res = await api.delete("/admin/orders/order", {
      data: payload,
    });

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete order" };
  }
};
