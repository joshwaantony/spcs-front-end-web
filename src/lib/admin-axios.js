// spcs_web/lib/axios.js
import axios from "axios";

/* -------------------------------------------
   BASE URL
-------------------------------------------- */
const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* -------------------------------------------
   AXIOS INSTANCE
-------------------------------------------- */
const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const ACCESS_TOKEN_KEY = "spcs_admin_token_key_prod";
const REFRESH_TOKEN_KEY = "spcs_admin_refresh_token";

let refreshPromise = null;

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

/* -------------------------------------------
   REQUEST INTERCEPTOR (Attach Token)
-------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (token) {
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
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const shouldRefresh =
      typeof window !== "undefined" &&
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh";

    if (shouldRefresh) {
      originalRequest._retry = true;

      try {
        refreshPromise =
          refreshPromise ||
          axios.post(
            `${API_ORIGIN}/api/v1/auth/refresh`,
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

        const refreshResponse = await refreshPromise;
        const refreshedData = refreshResponse.data;
        const newToken =
          refreshedData?.data?.accessToken ||
          refreshedData?.data?.token ||
          refreshedData?.accessToken;
        const newRefreshToken =
          refreshedData?.data?.refreshToken ||
          refreshedData?.refreshToken;

        if (!newToken) {
          throw new Error("Invalid refresh response");
        }

        localStorage.setItem(ACCESS_TOKEN_KEY, newToken);

        if (newRefreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
        }

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);

        const message = getReadableRequestError(
          refreshError,
          "Session expired"
        );

        return Promise.reject({
          status: refreshError.response?.status || 401,
          message,
          data: refreshError.response?.data,
        });
      } finally {
        refreshPromise = null;
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
