export const AUTH_SESSION_EVENT = "spcs-auth-session-change";
export const AUTH_SESSION_STORAGE_KEY = "spcs-auth-session";

let inMemoryAccessToken = null;
let inMemoryUser = null;
let hydratedFromStorage = false;

const canUseBrowserStorage = () => typeof window !== "undefined";

const hydrateSessionFromStorage = () => {
  if (!canUseBrowserStorage() || hydratedFromStorage) {
    return;
  }

  hydratedFromStorage = true;

  try {
    const rawSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

    if (!rawSession) {
      return;
    }

    const parsedSession = JSON.parse(rawSession);

    inMemoryAccessToken = parsedSession?.accessToken || null;
    inMemoryUser = parsedSession?.user || null;
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    inMemoryAccessToken = null;
    inMemoryUser = null;
  }
};

const syncSessionToStorage = () => {
  if (!canUseBrowserStorage()) {
    return;
  }

  if (!inMemoryAccessToken && !inMemoryUser) {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify({
      accessToken: inMemoryAccessToken,
      user: inMemoryUser,
    })
  );
};

const dispatchAuthSessionChange = (detail) => {
  if (!canUseBrowserStorage()) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(AUTH_SESSION_EVENT, {
      detail,
    })
  );
};

export const readStoredAccessToken = () => {
  hydrateSessionFromStorage();
  return inMemoryAccessToken;
};

export const readStoredUser = () => {
  hydrateSessionFromStorage();
  return inMemoryUser;
};

export const persistSession = ({ accessToken, user, emit = true }) => {
  hydrateSessionFromStorage();

  if (typeof accessToken !== "undefined") {
    inMemoryAccessToken = accessToken || null;
  }

  if (typeof user !== "undefined") {
    inMemoryUser = user || null;
  }

  syncSessionToStorage();

  if (emit) {
    dispatchAuthSessionChange({
      type: "updated",
      accessToken: inMemoryAccessToken,
      user: inMemoryUser,
    });
  }
};

export const clearStoredSession = ({ emit = true } = {}) => {
  hydrateSessionFromStorage();

  inMemoryAccessToken = null;
  inMemoryUser = null;

  syncSessionToStorage();

  if (emit) {
    dispatchAuthSessionChange({
      type: "cleared",
    });
  }
};
