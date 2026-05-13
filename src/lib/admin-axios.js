// spcs_web/lib/axios.js
import axios from "axios";
import {
  clearStoredSession,
  persistSession,
  readStoredAccessToken,
} from "@/lib/auth-session";

/* -------------------------------------------
   BASE URL
-------------------------------------------- */
const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* -------------------------------------------
   AXIOS INSTANCE
-------------------------------------------- */
const api = axios.create({
  baseURL: `${API_ORIGIN}/api/v1`,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

const isRefreshRequest = (url = "") =>
  url === "/auth/refresh" ||
  url === "/v1/auth/refresh" ||
  url.endsWith("/auth/refresh") ||
  url.endsWith("/v1/auth/refresh");

const refreshClient = axios.create({
  baseURL: `${API_ORIGIN}/api/v1`,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const isExpiredTokenMessage = (message = "") =>
  /token expired|jwt expired|unauthorized|invalid token/i.test(message);

const getReadableRequestError = (error, fallback = "Something went wrong. Please try again.") => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    fallback;

  if (
    error?.code === "ECONNABORTED" ||
    /timeout of \d+ms exceeded/i.test(message) ||
    /network error/i.test(message)
  ) {
    return "Unable to connect right now. Please try again.";
  }

  return message;
};

const refreshAccessToken = async () => {
  refreshPromise =
    refreshPromise ||
    refreshClient.post("/auth/refresh", {});

  try {
    const refreshResponse = await refreshPromise;
    const refreshedData = refreshResponse.data;
    const newToken =
      refreshedData?.data?.accessToken ||
      refreshedData?.data?.token ||
      refreshedData?.accessToken;
    const refreshedUser =
      refreshedData?.data?.user ||
      refreshedData?.user ||
      null;

    if (!newToken) {
      throw new Error("Invalid refresh response");
    }

    persistSession({
      accessToken: newToken,
      user: refreshedUser || undefined,
    });

    api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

    return newToken;
  } catch (refreshError) {
    delete api.defaults.headers.common.Authorization;
    clearStoredSession();
    throw refreshError;
  } finally {
    refreshPromise = null;
  }
};

const retryWithRefreshedToken = async (originalRequest) => {
  originalRequest._retry = true;

  const newToken = await refreshAccessToken();

  originalRequest.headers = originalRequest.headers || {};
  originalRequest.headers.Authorization = `Bearer ${newToken}`;

  return api.request(originalRequest);
};

/* -------------------------------------------
   REQUEST INTERCEPTOR (Attach Token)
-------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = readStoredAccessToken();

      if (token && !isRefreshRequest(config.url)) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------
   RESPONSE INTERCEPTOR
-------------------------------------------- */
api.interceptors.response.use(
  async (response) => {
    const responseData = response.data;
    const originalRequest = response.config;
    const shouldRefreshFromBody =
      typeof window !== "undefined" &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshRequest(originalRequest.url) &&
      responseData?.success === false &&
      isExpiredTokenMessage(responseData?.message || "");

    if (shouldRefreshFromBody) {
      try {
        return await retryWithRefreshedToken(originalRequest);
      } catch (refreshError) {
        const message = getReadableRequestError(
          refreshError,
          "Session expired"
        );

        return Promise.reject({
          status: refreshError.response?.status || 401,
          message,
          data: refreshError.response?.data,
        });
      }
    }

    return responseData;
  },
  async (error) => {
    const originalRequest = error.config;
    const shouldRefresh =
      typeof window !== "undefined" &&
      (error.response?.status === 401 ||
        isExpiredTokenMessage(error.response?.data?.message || error.message || "")) &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshRequest(originalRequest.url);

    if (shouldRefresh) {
      try {
        return await retryWithRefreshedToken(originalRequest);
      } catch (refreshError) {
        const message = getReadableRequestError(
          refreshError,
          "Session expired"
        );

        return Promise.reject({
          status: refreshError.response?.status || 401,
          message,
          data: refreshError.response?.data,
        });
      }
    }

    const message = getReadableRequestError(error, "Request failed");

    return Promise.reject({
      status: error.response?.status,
      message,
      data: error.response?.data,
    });
  }
);

export default api;
