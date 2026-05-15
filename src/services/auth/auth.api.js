import api from "@/lib/admin-axios";
import { getCartSessionHeaders } from "@/lib/cart-session";

export const registerUser = async (payload) => {
  return api.post("/auth/register", payload, {
    headers: getCartSessionHeaders(),
  });
};

export const loginUser = async ({ email, password }) => {
  return api.post(
    "/auth/login",
    {
      email,
      password,
    },
    {
      headers: getCartSessionHeaders(),
    }
  );
};

export const loginWithGoogle = async ({ idToken }) => {
  return api.post(
    "/auth/google",
    {
      idToken,
    },
    {
      headers: getCartSessionHeaders(),
    }
  );
};

export const loginAdmin = async ({ email, password }) => {
  return api.post("/auth/admin/login", {
    email,
    password,
  });
};

export const getCurrentUser = async () => {
  return api.get("/auth/me");
};

export const refreshAuthSession = async () => {
  return api.post("/auth/refresh", {});
};

export const logoutAuth = async () => {
  return api.post("/auth/logout", {});
};

export const forgotPassword = async ({ email }) => {
  return api.post("/auth/forgot-password", {
    email,
  });
};

export const resetPassword = async ({ token, password }) => {
  return api.post("/auth/reset-password", {
    token,
    password,
  });
};
