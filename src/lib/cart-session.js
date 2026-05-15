export const CART_SESSION_KEY = "cartSessionId";

const createCartSessionId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `cart-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const readCartSessionId = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(CART_SESSION_KEY) || "";
};

export const persistCartSessionId = (cartSessionId) => {
  if (typeof window === "undefined" || !cartSessionId) {
    return "";
  }

  localStorage.setItem(CART_SESSION_KEY, cartSessionId);
  return cartSessionId;
};

export const ensureCartSessionId = () => {
  const existing = readCartSessionId();

  if (existing) {
    return existing;
  }

  return persistCartSessionId(createCartSessionId());
};

export const clearCartSessionId = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(CART_SESSION_KEY);
};

export const getCartSessionHeaders = () => {
  const cartSessionId = readCartSessionId();

  return cartSessionId
    ? {
        "x-cart-session-id": cartSessionId,
      }
    : {};
};
