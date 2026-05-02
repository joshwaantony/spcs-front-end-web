import api from "@/lib/admin-axios";

export const registerUser = async (payload) => {
  return api.post("/v1/auth/register", payload);
};

export const loginUser = async ({ email, password }) => {
  return api.post("/v1/auth/login", {
    email,
    password,
  });
};

export const loginAdmin = async ({ email, password }) => {
  return api.post("/v1/auth/admin/login", {
    email,
    password,
  });
};

export const requestOtp = async ({ phone }) => {
  return api.post("/v1/auth/otp/request", {
    phone,
  });
};

export const verifyOtp = async ({ phone, code }) => {
  return api.post("/v1/auth/otp/verify", {
    phone,
    code,
  });
};

export const getCurrentUser = async () => {
  return api.get("/v1/auth/me");
};

export const refreshAuthSession = async () => {
  return api.post("/v1/auth/refresh", {});
};

export const logoutAdmin = async () => {
  return api.post("/v1/auth/logout", {});
};

export const completeProfile = async (payload) => {
  return api.post("/v1/auth/complete-profile", payload);
};

export const forgotPassword = async ({ email }) => {
  return api.post("/v1/auth/forgot-password", {
    email,
  });
};

export const resetPassword = async ({ token, password }) => {
  return api.post("/v1/auth/reset-password", {
    token,
    password,
  });
};
