

// "use client";

// import { create } from "zustand";
// import {
//   requestAdminOtp,
//   verifyAdminOtp,
// } from "@/services/admin/auth.api";

// export const useAdminAuthStore = create((set) => ({
//   phone: "",
//   loading: false,
//   otpSent: false,
//   isAuthenticated: false,
//   error: null,

//   // 🔹 SEND OTP
//   sendOtp: async (phone) => {
//     try {
//       set({
//         loading: true,
//         error: null,
//       });

//       const data = await requestAdminOtp(phone);

//       if (data.success) {
//         set({
//           phone,
//           otpSent: true,
//           loading: false,
//         });
//       } else {
//         set({
//           loading: false,
//           error: data.message || "Failed to send OTP",
//         });
//       }

//       return data;
//     } catch (error) {
//       set({
//         loading: false,
//         error: error.message || "Something went wrong",
//       });
//       throw error;
//     }
//   },

//   // 🔹 VERIFY OTP
//   verifyOtp: async ({ phone, otp }) => {
//     try {
//       set({
//         loading: true,
//         error: null,
//       });

//       const data = await verifyAdminOtp({ phone, otp });

//       if (data.success) {
//         const { token, refreshToken } = data.data;

//         // ✅ store tokens
//         localStorage.setItem("spcs_admin_token_key_prod", token);
//         localStorage.setItem("spcs_admin_refresh_token", refreshToken);

//         set({
//           loading: false,
//           isAuthenticated: true,
//         });
//       } else {
//         set({
//           loading: false,
//           error: data.message || "Invalid OTP",
//         });
//       }

//       return data;
//     } catch (error) {
//       set({
//         loading: false,
//         error: error.message || "Verification failed",
//       });
//       throw error;
//     }
//   },

//   // 🔹 LOGOUT
//   logout: () => {
//     localStorage.removeItem("spcs_admin_token_key_prod");
//     localStorage.removeItem("spcs_admin_refresh_token");

//     set({
//       phone: "",
//       otpSent: false,
//       isAuthenticated: false,
//       error: null,
//     });
//   },

//   // 🔹 RESET (optional)
//   reset: () => {
//     set({
//       phone: "",
//       otpSent: false,
//       loading: false,
//       error: null,
//     });
//   },
// }));


"use client";

import { create } from "zustand";
import {
  completeProfile,
  getCurrentUser,
  loginAdmin,
  loginUser,
  logoutAdmin,
  refreshAuthSession,
  requestOtp,
  verifyOtp,
} from "@/services/auth/auth.api";
import {
  AUTH_SESSION_EVENT,
  clearStoredSession,
  persistSession,
  readStoredAccessToken,
  readStoredUser,
} from "@/lib/auth-session";

const getAccessTokenFromResponse = (data) =>
  data?.data?.accessToken || data?.data?.token || data?.accessToken || null;

const getUserFromResponse = (data) =>
  data?.data?.user || data?.user || data?.data || null;

const normalizeSessionFromResponse = (data) => ({
  accessToken: getAccessTokenFromResponse(data),
  user: getUserFromResponse(data),
});

const clearSession = () => clearStoredSession();

let authSessionListenerAttached = false;

export const useAdminAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  pendingPhone: "",
  bootstrapped: false,

  setSession: ({ accessToken, user }) => {
    persistSession({ accessToken, user });

    set({
      user: user || null,
      isAuthenticated: !!user || !!accessToken,
      error: null,
    });
  },

  fetchMe: async () => {
    const data = await getCurrentUser();
    const user = getUserFromResponse(data);

    if (!data?.success || !user) {
      throw new Error(data?.message || "Unable to load user");
    }

    get().setSession({ user });
    return user;
  },

  hydrateSessionFromAuthResponse: async (data) => {
    const { accessToken, user } = normalizeSessionFromResponse(data);

    if (!data?.success || !accessToken) {
      throw new Error(data?.message || "Authentication failed");
    }

    persistSession({ accessToken, user });

    try {
      return await get().fetchMe();
    } catch (error) {
      if (user) {
        get().setSession({ accessToken, user });
        return user;
      }

      throw error;
    }
  },

  bootstrapAuth: async () => {
    if (get().bootstrapped) {
      return;
    }

    try {
      if (typeof window !== "undefined" && !authSessionListenerAttached) {
        window.addEventListener(AUTH_SESSION_EVENT, (event) => {
          const detail = event?.detail || {};

          if (detail.type === "cleared") {
            set({
              user: null,
              isAuthenticated: false,
            });
            return;
          }

          set({
            user: detail.user || readStoredUser(),
            isAuthenticated: !!(detail.accessToken || readStoredAccessToken()),
          });
        });

        authSessionListenerAttached = true;
      }

      const storedUser = readStoredUser();
      const existingToken = readStoredAccessToken();

      if (storedUser || existingToken) {
        set({
          user: storedUser,
          isAuthenticated: !!existingToken,
        });
      }

      try {
        const refreshData = await refreshAuthSession();
        const accessToken = getAccessTokenFromResponse(refreshData);
        const refreshedUser = getUserFromResponse(refreshData);

        if (accessToken) {
          persistSession({
            accessToken,
            user: refreshedUser || storedUser,
          });

          set({
            user: refreshedUser || storedUser,
            isAuthenticated: true,
          });
        }
      } catch {
        clearSession();
        set({
          user: null,
          isAuthenticated: false,
        });
      }

      if (
        typeof window !== "undefined" &&
        readStoredAccessToken()
      ) {
        if (!get().user) {
          await get().fetchMe();
        }
      } else {
        clearSession();
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    } catch {
      clearSession();
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        bootstrapped: true,
      });
    }
  },

  loginWithEmail: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });

      const data = await loginUser({ email, password });
      const user = await get().hydrateSessionFromAuthResponse(data);

      set({
        user,
        loading: false,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Login failed",
      });
      throw error;
    }
  },

  loginAdmin: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });

      const data = await loginAdmin({ email, password });
      const user = await get().hydrateSessionFromAuthResponse(data);
      const roles = user?.roles || [];

      if (!roles.includes("ADMIN")) {
        throw new Error("This account does not have admin access.");
      }

      set({
        user,
        loading: false,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      clearSession();
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: error.message || "Login failed",
      });
      throw error;
    }
  },

  requestOtp: async ({ phone }) => {
    try {
      set({ loading: true, error: null });

      const data = await requestOtp({ phone });

      if (!data?.success) {
        throw new Error(data?.message || "Unable to send OTP");
      }

      set({
        pendingPhone: phone,
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Unable to send OTP",
      });
      throw error;
    }
  },

  verifyOtp: async ({ phone, code }) => {
    try {
      set({ loading: true, error: null });

      const data = await verifyOtp({ phone, code });
      const user = await get().hydrateSessionFromAuthResponse(data);

      set({
        user,
        pendingPhone: "",
        loading: false,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      set({
        loading: false,
        error: error.message || "OTP verification failed",
      });
      throw error;
    }
  },

  completeProfile: async (payload) => {
    try {
      set({ loading: true, error: null });

      const data = await completeProfile(payload);

      if (!data?.success) {
        throw new Error(data?.message || "Unable to complete profile");
      }

      const user = await get().fetchMe();

      set({
        user,
        loading: false,
      });

      return user;
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Unable to complete profile",
      });
      throw error;
    }
  },

  initAuth: () => {
    const token = readStoredAccessToken();
    const user = readStoredUser();

    set({
      user,
      isAuthenticated: !!token,
      bootstrapped: false,
    });
  },

  logout: async () => {
    try {
      await logoutAdmin();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      clearSession();

      set({
        user: null,
        pendingPhone: "",
        isAuthenticated: false,
        error: null,
        loading: false,
        bootstrapped: true,
      });
    }
  },

  reset: () => {
    set({
      loading: false,
      error: null,
      pendingPhone: "",
    });
  },
}));
