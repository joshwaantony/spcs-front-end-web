import api from "@/lib/admin-axios";

export const getDiscountRules = async () => {
  try {
    const res = await api.get("/admin/pricing/discount-rules");
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch discount rules" };
  }
};

export const createDiscountRule = async (payload) => {
  try {
    const res = await api.post("/admin/pricing/discount-rules", payload);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create discount rule" };
  }
};

export const updateDiscountRule = async (discountRuleId, payload) => {
  try {
    const res = await api.patch(
      `/admin/pricing/discount-rules/${discountRuleId}`,
      payload
    );
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update discount rule" };
  }
};

export const deleteDiscountRule = async (discountRuleId) => {
  try {
    const res = await api.delete(`/admin/pricing/discount-rules/${discountRuleId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete discount rule" };
  }
};

export const getShippingRules = async () => {
  try {
    const res = await api.get("/admin/pricing/shipping-rules");
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch shipping rules" };
  }
};

export const createShippingRule = async (payload) => {
  try {
    const res = await api.post("/admin/pricing/shipping-rules", payload);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create shipping rule" };
  }
};

export const updateShippingRule = async (shippingRuleId, payload) => {
  try {
    const res = await api.patch(
      `/admin/pricing/shipping-rules/${shippingRuleId}`,
      payload
    );
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update shipping rule" };
  }
};

export const deleteShippingRule = async (shippingRuleId) => {
  try {
    const res = await api.delete(`/admin/pricing/shipping-rules/${shippingRuleId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete shipping rule" };
  }
};
