"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/auth/auth.api";
import { useToastStore } from "@/store/ui/toast.store";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      showToast({
        type: "error",
        message: "Reset token is missing",
      });
      return;
    }

    try {
      setLoading(true);
      await resetPassword({
        token,
        password,
      });
      showToast({
        type: "success",
        message: "Password reset successfully",
      });
      router.push("/login");
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Unable to reset password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg rounded-[24px] border border-slate-100 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <p className="text-[10px] font-bold tracking-widest text-[#007979] uppercase mb-2">
        RESET
      </p>
      <h1 className="text-2xl font-bold text-slate-900">
        Create a new password
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Enter a new password for your account and continue to login.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-darkGray">
            New Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-[8px] border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#007979]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#007979] py-3.5 font-bold text-white transition hover:bg-[#006666] disabled:bg-[#007979]/70"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <Link href="/login" className="mt-6 inline-flex text-sm font-medium text-[#007979] hover:underline">
        Back to login
      </Link>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="w-full max-w-lg rounded-[24px] border border-slate-100 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]" />
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
