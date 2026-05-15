export const AUTH_SESSION_EVENT = "spcs-auth-session-change";

let inMemoryAccessToken = null;
let inMemoryUser = null;

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

export const readStoredAccessToken = () => inMemoryAccessToken;

export const readStoredUser = () => inMemoryUser;

export const persistSession = ({ accessToken, user, emit = true }) => {
  if (typeof accessToken !== "undefined") {
    inMemoryAccessToken = accessToken || null;
  }

  if (typeof user !== "undefined") {
    inMemoryUser = user || null;
  }

  if (emit) {
    dispatchAuthSessionChange({
      type: "updated",
      accessToken: inMemoryAccessToken,
      user: inMemoryUser,
    });
  }
};

export const clearStoredSession = ({ emit = true } = {}) => {
  inMemoryAccessToken = null;
  inMemoryUser = null;

  if (emit) {
    dispatchAuthSessionChange({
      type: "cleared",
    });
  }
};
