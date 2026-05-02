"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/auth/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";
import { HiEye, HiEyeOff, HiLockClosed, HiMail } from "react-icons/hi";

export default function AdminLoginPage() {
  const [form, setForm] = useState({
    email: "admin@spcs.com",
    password: "admin123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const loginAdmin = useAdminAuthStore((state) => state.loginAdmin);
  const loading = useAdminAuthStore((state) => state.loading);
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginAdmin({
        email: form.email.trim(),
        password: form.password,
      });

      showToast({
        type: "success",
        message: "Admin logged in successfully",
      });
      router.push("/admin/dashboard");
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Unable to login right now.",
      });
    }
  };

  return (
    <div className="font-sans text-darkGray min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-[120px] bg-white relative overflow-x-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(0,128,128,0.06) 0%, rgba(255,255,255,0) 32%), radial-gradient(circle at bottom left, rgba(0,128,128,0.04) 0%, rgba(255,255,255,0) 34%)",
        }}
      />

      <div className="w-full max-w-md bg-white rounded-[12px] p-6 sm:p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-50">
        <div className="mb-6 sm:mb-8">
          <span className="block text-[#008080] text-xs font-bold tracking-widest mb-2">
            ADMIN PORTAL
          </span>

          <h2 className="text-xl sm:text-2xl font-bold text-darkGray mb-2">
            Sign in to continue
          </h2>

          <p className="text-mediumGray text-sm sm:text-base">
            Use your admin credentials to access the dashboard and manage the storefront.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-darkGray">
              Email Address
            </label>
            <div className="flex items-center rounded-[6px] border border-gray-300 bg-white focus-within:ring-1 focus-within:ring-[#008080]">
              <span className="px-3 text-mediumGray">
                <HiMail className="text-lg" />
              </span>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-[6px] border-0 bg-transparent p-3 text-sm focus:outline-none"
                value={form.email}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    email: e.target.value,
                  }))
                }
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-darkGray">
              Password
            </label>
            <div className="flex items-center rounded-[6px] border border-gray-300 bg-white focus-within:ring-1 focus-within:ring-[#008080]">
              <span className="px-3 text-mediumGray">
                <HiLockClosed className="text-lg" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="flex-1 rounded-[6px] border-0 bg-transparent p-3 text-sm focus:outline-none"
                value={form.password}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    password: e.target.value,
                  }))
                }
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="px-3 text-mediumGray transition-colors hover:text-[#008080]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008080] hover:bg-[#006666] disabled:bg-[#008080]/70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-[6px] transition-colors shadow-md"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-gray-100 pt-6 text-sm text-mediumGray">
          <Link href="/forgot-password" className="font-medium text-[#008080] hover:underline">
            Forgot password?
          </Link>
          <Link href="/login" className="font-medium text-[#008080] hover:underline">
            User login
          </Link>
        </div>
      </div>
    </div>
  );
}
