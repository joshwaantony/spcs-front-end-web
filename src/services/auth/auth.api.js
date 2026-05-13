import api from "@/lib/admin-axios";

export const registerUser = async (payload) => {
  return api.post("/v1/auth/register", payload);
};

export const loginUser = async ({ email, password }) => {
  return api.post("/auth/login", {
    email,
    password,
  });
};

export const loginAdmin = async ({ email, password }) => {
  return api.post("/auth/admin/login", {
    email,
    password,
  });
};

export const requestOtp = async ({ phone }) => {
  return api.post("/auth/otp/request", {
    phone,
  });
};

export const verifyOtp = async ({ phone, code }) => {
  return api.post("/auth/otp/verify", {
    phone,
    code,
  });
};

export const getCurrentUser = async () => {
  return api.get("/auth/me");
};

export const refreshAuthSession = async () => {
  return api.post("/auth/refresh", {});
};

export const logoutAdmin = async () => {
  return api.post("/auth/logout", {});
};

export const completeProfile = async (payload) => {
  return api.post("/auth/complete-profile", payload);
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
