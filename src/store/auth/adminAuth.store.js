"use client";

import { create } from "zustand";
import {
  forgotPassword,
  getCurrentUser,
  loginAdmin,
  loginUser,
  loginWithGoogle,
  logoutAuth,
  refreshAuthSession,
  registerUser,
} from "@/services/auth/auth.api";
import {
  AUTH_SESSION_EVENT,
  AUTH_SESSION_STORAGE_KEY,
  clearStoredSession,
  persistSession,
  readStoredAccessToken,
  readStoredUser,
} from "@/lib/auth-session";

const getAccessTokenFromResponse = (data) =>
  data?.data?.accessToken || data?.accessToken || null;

const getUserFromResponse = (data) =>
  data?.data?.user || data?.user || null;

const normalizeSessionFromResponse = (data) => ({
  accessToken: getAccessTokenFromResponse(data),
  user: getUserFromResponse(data),
});

let authSessionListenerAttached = false;
let authStorageListenerAttached = false;

const clearSession = () => clearStoredSession();

export const useAdminAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  bootstrapped: false,

  setSession: ({ accessToken, user }) => {
    persistSession({ accessToken, user });

    set({
      accessToken: accessToken ?? readStoredAccessToken(),
      user: user ?? readStoredUser(),
      isAuthenticated: !!(accessToken ?? readStoredAccessToken()),
      error: null,
    });
  },

  clearSessionState: () => {
    clearSession();

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      error: null,
    });
  },

  fetchMe: async () => {
    const data = await getCurrentUser();
    const user = getUserFromResponse(data);

    if (!data?.success || !user) {
      throw new Error(data?.message || "Unable to load your account");
    }

    get().setSession({
      accessToken: readStoredAccessToken(),
      user,
    });

    return user;
  },

  hydrateSessionFromAuthResponse: async (data) => {
    const { accessToken, user } = normalizeSessionFromResponse(data);

    if (!data?.success || !accessToken) {
      throw new Error(data?.message || "Authentication failed");
    }

    persistSession({
      accessToken,
      user,
    });

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
              accessToken: null,
              isAuthenticated: false,
            });
            return;
          }

          set({
            user: detail.user || readStoredUser(),
            accessToken: detail.accessToken || readStoredAccessToken(),
            isAuthenticated: !!(detail.accessToken || readStoredAccessToken()),
          });
        });

        authSessionListenerAttached = true;
      }

      if (typeof window !== "undefined" && !authStorageListenerAttached) {
        window.addEventListener("storage", (event) => {
          if (event.key !== AUTH_SESSION_STORAGE_KEY) {
            return;
          }

          const nextAccessToken = readStoredAccessToken();
          const nextUser = readStoredUser();

          set({
            accessToken: nextAccessToken,
            user: nextUser,
            isAuthenticated: !!nextAccessToken,
          });
        });

        authStorageListenerAttached = true;
      }

      const existingToken = readStoredAccessToken();
      const existingUser = readStoredUser();

      if (existingToken) {
        set({
          accessToken: existingToken,
          user: existingUser,
          isAuthenticated: true,
        });

        try {
          await get().fetchMe();
          set({ bootstrapped: true });
          return;
        } catch {
          clearSession();
        }
      }

      try {
        const refreshData = await refreshAuthSession();
        const accessToken = getAccessTokenFromResponse(refreshData);
        const refreshedUser = getUserFromResponse(refreshData);

        if (!refreshData?.success || !accessToken) {
          throw new Error(refreshData?.message || "Session refresh failed");
        }

        persistSession({
          accessToken,
          user: refreshedUser,
        });

        set({
          accessToken,
          user: refreshedUser,
          isAuthenticated: true,
        });

        if (!refreshedUser) {
          await get().fetchMe();
        }
      } catch {
        clearSession();
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      }
    } finally {
      set({
        bootstrapped: true,
      });
    }
  },

  registerUser: async ({ name, email, password }) => {
    try {
      set({ loading: true, error: null });

      const data = await registerUser({
        name,
        email,
        password,
      });

      const user = await get().hydrateSessionFromAuthResponse(data);

      set({
        accessToken: readStoredAccessToken(),
        user,
        loading: false,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Unable to create your account",
      });
      throw error;
    }
  },

  loginWithEmail: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });

      const data = await loginUser({ email, password });
      const user = await get().hydrateSessionFromAuthResponse(data);

      set({
        accessToken: readStoredAccessToken(),
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

  loginWithGoogle: async ({ idToken }) => {
    try {
      set({ loading: true, error: null });

      const data = await loginWithGoogle({ idToken });
      const user = await get().hydrateSessionFromAuthResponse(data);

      set({
        accessToken: readStoredAccessToken(),
        user,
        loading: false,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Google login failed",
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
        accessToken: readStoredAccessToken(),
        user,
        loading: false,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      clearSession();
      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: error.message || "Admin login failed",
      });
      throw error;
    }
  },

  refreshSession: async () => {
    const data = await refreshAuthSession();
    const accessToken = getAccessTokenFromResponse(data);
    const user = getUserFromResponse(data);

    if (!data?.success || !accessToken) {
      throw new Error(data?.message || "Session refresh failed");
    }

    get().setSession({
      accessToken,
      user,
    });

    return user || get().fetchMe();
  },

  sendForgotPassword: async ({ email }) => {
    try {
      set({ loading: true, error: null });
      const data = await forgotPassword({ email });
      set({ loading: false });
      return data;
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Unable to send reset email",
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutAuth();
    } catch {
      // Ignore logout API failures and clear client state anyway.
    } finally {
      clearSession();

      set({
        user: null,
        accessToken: null,
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
    });
  },
}));
