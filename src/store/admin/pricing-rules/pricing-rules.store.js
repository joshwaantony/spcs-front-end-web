"use client";

import { create } from "zustand";
import {
  createDiscountRule as createDiscountRuleRequest,
  deleteDiscountRule as deleteDiscountRuleRequest,
  getDiscountRules,
  updateDiscountRule as updateDiscountRuleRequest,
  getShippingRules,
  createShippingRule as createShippingRuleRequest,
  updateShippingRule as updateShippingRuleRequest,
  deleteShippingRule as deleteShippingRuleRequest,
} from "@/services/admin/pricing-rules/pricing-rules.api";
import { useToastStore } from "@/store/ui/toast.store";

const getErrorMessage = (error, fallback) => {
  return (
    error?.message ||
    error?.msg ||
    error?.error?.message ||
    error?.data?.message ||
    fallback
  );
};

const showToast = (toast) => {
  const toastState = useToastStore.getState();
  toastState?.showToast?.(toast);
};

export const usePricingRulesStore = create((set, get) => ({
  discountRules: [],
  discountLoading: false,
  discountError: null,
  creatingDiscount: false,
  updatingDiscount: false,
  deletingDiscountId: null,
  shippingRules: [],
  shippingLoading: false,
  shippingError: null,
  creatingShipping: false,
  updatingShipping: false,
  deletingShippingId: null,

  fetchDiscountRules: async () => {
    try {
      set({ discountLoading: true, discountError: null });

      const res = await getDiscountRules();

      if (res.success) {
        set({
          discountRules: res.data?.items || res.data || [],
          discountLoading: false,
          discountError: null,
        });
      } else {
        set({
          discountLoading: false,
          discountError: res.message || "Failed to fetch discount rules",
        });
      }

      return res;
    } catch (error) {
      set({
        discountRules: [],
        discountLoading: false,
        discountError: getErrorMessage(error, "Failed to fetch discount rules"),
      });
      throw error;
    }
  },

  createDiscountRule: async (payload) => {
    try {
      set({ creatingDiscount: true, discountError: null });

      const res = await createDiscountRuleRequest(payload);

      if (res.success) {
        const createdRule = res.data?.data || res.data || res;

        set((state) => ({
          discountRules: Array.isArray(createdRule)
            ? [...createdRule, ...state.discountRules]
            : [createdRule, ...state.discountRules],
          creatingDiscount: false,
          discountError: null,
        }));
      } else {
        const errorMessage = res.message || "Failed to create discount rule";
        set({
          creatingDiscount: false,
          discountError: errorMessage,
        });
        showToast({ type: "error", message: errorMessage });
      }

      if (res.success) {
        showToast({ type: "success", message: "Discount rule created successfully." });
      }

      return res;
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Failed to create discount rule");
      set({
        creatingDiscount: false,
        discountError: errorMessage,
      });
      showToast({ type: "error", message: errorMessage });
      throw error;
    }
  },

  updateDiscountRule: async (discountRuleId, payload) => {
    try {
      set({ updatingDiscount: true, discountError: null });

      const res = await updateDiscountRuleRequest(discountRuleId, payload);

      if (res.success) {
        const updatedRule = res.data?.data || res.data || payload;

        set((state) => ({
          discountRules: state.discountRules.map((rule) =>
            rule.id === discountRuleId ? { ...rule, ...updatedRule } : rule
          ),
          updatingDiscount: false,
          discountError: null,
        }));
      } else {
        const errorMessage = res.message || "Failed to update discount rule";
        set({
          updatingDiscount: false,
          discountError: errorMessage,
        });
        showToast({ type: "error", message: errorMessage });
      }

      if (res.success) {
        showToast({ type: "success", message: "Discount rule updated successfully." });
      }

      return res;
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Failed to update discount rule");
      set({
        updatingDiscount: false,
        discountError: errorMessage,
      });
      showToast({ type: "error", message: errorMessage });
      throw error;
    }
  },

  deleteDiscountRule: async (discountRuleId) => {
    try {
      set({ deletingDiscountId: discountRuleId, discountError: null });

      const res = await deleteDiscountRuleRequest(discountRuleId);

      if (res.success) {
        set((state) => ({
          discountRules: state.discountRules.filter(
            (rule) => rule.id !== discountRuleId
          ),
          deletingDiscountId: null,
          discountError: null,
        }));
      } else {
        const errorMessage = res.message || "Failed to delete discount rule";
        set({
          deletingDiscountId: null,
          discountError: errorMessage,
        });
        showToast({ type: "error", message: errorMessage });
      }

      if (res.success) {
        showToast({ type: "success", message: "Discount rule deleted successfully." });
      }

      return res;
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Failed to delete discount rule");
      set({
        deletingDiscountId: null,
        discountError: errorMessage,
      });
      showToast({ type: "error", message: errorMessage });
      throw error;
    }
  },

  fetchShippingRules: async () => {
    try {
      set({ shippingLoading: true, shippingError: null });

      const res = await getShippingRules();

      if (res.success) {
        set({
          shippingRules: res.data?.items || res.data || [],
          shippingLoading: false,
          shippingError: null,
        });
      } else {
        set({
          shippingLoading: false,
          shippingError: res.message || "Failed to fetch shipping rules",
        });
      }

      return res;
    } catch (error) {
      set({
        shippingRules: [],
        shippingLoading: false,
        shippingError: getErrorMessage(error, "Failed to fetch shipping rules"),
      });
      throw error;
    }
  },

  createShippingRule: async (payload) => {
    try {
      set({ creatingShipping: true, shippingError: null });

      const res = await createShippingRuleRequest(payload);

      if (res.success) {
        const createdRule = res.data?.data || res.data || res;

        set((state) => ({
          shippingRules: Array.isArray(createdRule)
            ? [...createdRule, ...state.shippingRules]
            : [createdRule, ...state.shippingRules],
          creatingShipping: false,
          shippingError: null,
        }));
      } else {
        const errorMessage = res.message || "Failed to create shipping rule";
        set({
          creatingShipping: false,
          shippingError: errorMessage,
        });
        showToast({ type: "error", message: errorMessage });
      }

      if (res.success) {
        showToast({ type: "success", message: "Shipping rule created successfully." });
      }

      return res;
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Failed to create shipping rule");
      set({
        creatingShipping: false,
        shippingError: errorMessage,
      });
      showToast({ type: "error", message: errorMessage });
      throw error;
    }
  },

  updateShippingRule: async (shippingRuleId, payload) => {
    try {
      set({ updatingShipping: true, shippingError: null });

      const res = await updateShippingRuleRequest(shippingRuleId, payload);

      if (res.success) {
        const updatedRule = res.data?.data || res.data || payload;

        set((state) => ({
          shippingRules: state.shippingRules.map((rule) =>
            rule.id === shippingRuleId ? { ...rule, ...updatedRule } : rule
          ),
          updatingShipping: false,
          shippingError: null,
        }));
      } else {
        const errorMessage = res.message || "Failed to update shipping rule";
        set({
          updatingShipping: false,
          shippingError: errorMessage,
        });
        showToast({ type: "error", message: errorMessage });
      }

      if (res.success) {
        showToast({ type: "success", message: "Shipping rule updated successfully." });
      }

      return res;
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Failed to update shipping rule");
      set({
        updatingShipping: false,
        shippingError: errorMessage,
      });
      showToast({ type: "error", message: errorMessage });
      throw error;
    }
  },

  deleteShippingRule: async (shippingRuleId) => {
    try {
      set({ deletingShippingId: shippingRuleId, shippingError: null });

      const res = await deleteShippingRuleRequest(shippingRuleId);

      if (res.success) {
        set((state) => ({
          shippingRules: state.shippingRules.filter(
            (rule) => rule.id !== shippingRuleId
          ),
          deletingShippingId: null,
          shippingError: null,
        }));
      } else {
        const errorMessage = res.message || "Failed to delete shipping rule";
        set({
          deletingShippingId: null,
          shippingError: errorMessage,
        });
        showToast({ type: "error", message: errorMessage });
      }

      if (res.success) {
        showToast({ type: "success", message: "Shipping rule deleted successfully." });
      }

      return res;
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Failed to delete shipping rule");
      set({
        deletingShippingId: null,
        shippingError: errorMessage,
      });
      showToast({ type: "error", message: errorMessage });
      throw error;
    }
  },
}));
