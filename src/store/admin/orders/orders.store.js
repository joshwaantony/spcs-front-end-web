"use client";

import { create } from "zustand";
import {
  deleteOrder as deleteOrderRequest,
  getOrderDetail,
  getOrders,
  toggleOrderStatus as toggleOrderStatusRequest,
} from "@/services/admin/orders/orders.api";

const getErrorMessage = (error, fallback) => {
  if (error?.error?.details?.fieldErrors) {
    const fieldErrors = error.error.details.fieldErrors;
    const messages = [];

    for (const field in fieldErrors) {
      if (Array.isArray(fieldErrors[field])) {
        messages.push(...fieldErrors[field]);
      }
    }

    if (messages.length > 0) {
      return messages.join(", ");
    }
  }

  if (error?.errors) {
    const messages = [];

    for (const field in error.errors) {
      if (Array.isArray(error.errors[field])) {
        messages.push(...error.errors[field]);
      }
    }

    if (messages.length > 0) {
      return messages.join(", ");
    }
  }

  return (
    error?.error?.message ||
    error?.message ||
    error?.msg ||
    error?.data?.message ||
    fallback
  );
};

export const useOrdersStore = create((set, get) => ({
  section: "book",
  orders: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  filter: "all",
  query: "",
  inputQuery: "",
  fromDate: "",
  toDate: "",
  loading: false,
  error: null,
  detailLoading: false,
  detailError: null,
  selectedOrder: null,
  actionLoadingId: null,
  actionError: null,

  setSection: (section) => {
    set({
      section,
      page: 1,
      orders: [],
      error: null,
    });
  },

  setFilter: (filter) => {
    set({ filter, page: 1 });
  },

  setInputQuery: (inputQuery) => {
    set({ inputQuery });
  },

  setFromDate: (fromDate) => {
    set({ fromDate });
  },

  setToDate: (toDate) => {
    set({ toDate });
  },

  applyFilters: () => {
    const { inputQuery } = get();
    set({
      query: inputQuery.trim(),
      page: 1,
    });
    return get().fetchOrders(1);
  },

  fetchOrders: async (nextPage) => {
    const state = get();
    const page = nextPage || state.page || 1;

    try {
      set({ loading: true, error: null });

      const res = await getOrders({
        section: state.section,
        page,
        limit: state.limit,
        filter: state.filter,
        query: state.query,
        from_date: state.fromDate,
        to_date: state.toDate,
      });

      if (res.success) {
        const pagination = res.data?.pagination || {};

        set({
          orders: res.data?.items || [],
          page: pagination.page || page,
          limit: pagination.limit || state.limit,
          total: pagination.total || 0,
          totalPages: pagination.total_pages || 0,
          loading: false,
          error: null,
        });
      } else {
        set({
          loading: false,
          error: res.message || res.msg || "Failed to fetch orders",
        });
      }
    } catch (error) {
      set({
        orders: [],
        loading: false,
        error: getErrorMessage(error, "Failed to fetch orders"),
      });
    }
  },

  fetchOrderDetail: async (orderId) => {
    const state = get();

    try {
      set({
        detailLoading: true,
        detailError: null,
        selectedOrder: null,
      });

      const res = await getOrderDetail({
        section: state.section,
        orderId,
      });

      if (res.success) {
        set({
          selectedOrder: res.data || null,
          detailLoading: false,
          detailError: null,
        });
      } else {
        set({
          selectedOrder: null,
          detailLoading: false,
          detailError:
            res.message || res.msg || "Failed to fetch order details",
        });
      }

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch order details");
      set({
        selectedOrder: null,
        detailLoading: false,
        detailError: message,
      });
      throw new Error(message);
    }
  },

  clearOrderDetail: () => {
    set({
      selectedOrder: null,
      detailLoading: false,
      detailError: null,
    });
  },

  toggleOrderStatus: async ({ order_id, status }) => {
    try {
      set({
        actionLoadingId: order_id,
        actionError: null,
      });

      const res = await toggleOrderStatusRequest({ order_id, status });

      if (!res.success) {
        throw new Error(res.message || res.msg || "Failed to update order status");
      }

      const updatedOrderId = res.data?.order_id || order_id;
      const updatedStatus = res.data?.status || status;

      set((state) => ({
        actionLoadingId: null,
        actionError: null,
        orders: state.orders.map((order) =>
          order.order_id === updatedOrderId
            ? { ...order, status: updatedStatus }
            : order
        ),
        selectedOrder:
          state.selectedOrder?.order_id === updatedOrderId
            ? { ...state.selectedOrder, status: updatedStatus }
            : state.selectedOrder,
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to update order status");
      set({
        actionLoadingId: null,
        actionError: message,
      });
      throw new Error(message);
    }
  },

  deleteOrder: async (order_id) => {
    try {
      set({
        actionLoadingId: order_id,
        actionError: null,
      });

      const res = await deleteOrderRequest({ order_id });

      if (!res.success) {
        throw new Error(res.message || res.msg || "Failed to delete order");
      }

      const deletedOrderId = res.data?.order_id || order_id;

      set((state) => ({
        actionLoadingId: null,
        actionError: null,
        orders: state.orders.filter(
          (order) => order.order_id !== deletedOrderId
        ),
        selectedOrder:
          state.selectedOrder?.order_id === deletedOrderId
            ? null
            : state.selectedOrder,
      }));

      return res;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to delete order");
      set({
        actionLoadingId: null,
        actionError: message,
      });
      throw new Error(message);
    }
  },
}));
