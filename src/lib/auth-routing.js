export const AUTH_PUBLIC_PATHS = [
  "/login",
  "/admin/login",
  "/verify-otp",
  "/complete-profile",
  "/forgot-password",
  "/reset-password",
];

export const ACCOUNT_HOME_PATH = "/account";
export const ADMIN_HOME_PATH = "/admin";

export function getPrimaryRole(user) {
  if (!user) {
    return null;
  }

  if (Array.isArray(user.roles) && user.roles.length > 0) {
    return user.roles[0];
  }

  return user.role || null;
}

export function getPostLoginRoute(user) {
  if (!user) {
    return "/login";
  }

  if (user.profileCompleted === false) {
    return "/complete-profile";
  }

  const role = getPrimaryRole(user);

  if (role === "ADMIN") {
    return ADMIN_HOME_PATH;
  }

  return ACCOUNT_HOME_PATH;
}

export function isAuthPage(pathname) {
  return AUTH_PUBLIC_PATHS.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );
}

export function isProtectedPath(pathname) {
  return pathname.startsWith("/admin") || pathname.startsWith("/account");
}

export function shouldRequireAdmin(pathname) {
  return pathname.startsWith("/admin");
}
