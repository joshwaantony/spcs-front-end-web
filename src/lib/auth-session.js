export const ACCESS_TOKEN_KEY = "spcs_admin_token_key_prod";
export const USER_KEY = "spcs_auth_user";
export const AUTH_SESSION_EVENT = "spcs-auth-session-change";

const dispatchAuthSessionChange = (detail) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(AUTH_SESSION_EVENT, {
      detail,
    })
  );
};

export const readStoredAccessToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const readStoredUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const persistSession = ({ accessToken, user, emit = true }) => {
  if (typeof window === "undefined") {
    return;
  }

  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  if (emit) {
    dispatchAuthSessionChange({
      type: "updated",
      accessToken: accessToken || readStoredAccessToken(),
      user: user || readStoredUser(),
    });
  }
};

export const clearStoredSession = ({ emit = true } = {}) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  if (emit) {
    dispatchAuthSessionChange({
      type: "cleared",
    });
  }
};
