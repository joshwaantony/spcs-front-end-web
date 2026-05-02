"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin/adminAuth.store";
import {
  getPostLoginRoute,
  getPrimaryRole,
  isAuthPage,
  isProtectedPath,
  shouldRequireAdmin,
} from "@/lib/auth-routing";

export default function AuthSessionManager() {
  const pathname = usePathname();
  const router = useRouter();
  const bootstrapAuth = useAdminAuthStore((state) => state.bootstrapAuth);
  const bootstrapped = useAdminAuthStore((state) => state.bootstrapped);
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);
  const user = useAdminAuthStore((state) => state.user);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  useEffect(() => {
    if (!bootstrapped || !pathname) {
      return;
    }

    const isLoggedIn = isAuthenticated && !!user;

    if (!isLoggedIn) {
      if (isAuthPage(pathname)) {
        return;
      }

      if (pathname.startsWith("/admin")) {
        router.replace("/admin/login");
        return;
      }

      if (isProtectedPath(pathname)) {
        router.replace("/login");
      }

      return;
    }

    if (user.profileCompleted === false && pathname !== "/complete-profile") {
      router.replace("/complete-profile");
      return;
    }

    const primaryRole = getPrimaryRole(user);

    if (pathname === "/complete-profile" && user.profileCompleted !== false) {
      router.replace(getPostLoginRoute(user));
      return;
    }

    if (shouldRequireAdmin(pathname) && primaryRole !== "ADMIN") {
      router.replace(getPostLoginRoute(user));
      return;
    }

    if (pathname.startsWith("/writer") && primaryRole !== "WRITER") {
      router.replace(getPostLoginRoute(user));
      return;
    }

    if (pathname.startsWith("/account") && primaryRole === "ADMIN") {
      router.replace(getPostLoginRoute(user));
      return;
    }

    if (isAuthPage(pathname)) {
      router.replace(getPostLoginRoute(user));
    }
  }, [bootstrapped, isAuthenticated, pathname, router, user]);

  return null;
}
