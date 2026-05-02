"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/services/admin/auth.api";
import { useToastStore } from "@/store/ui/toast.store";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await forgotPassword({ email: email.trim() });
      setSent(true);
      showToast({
        type: "success",
        message: "Password reset email sent",
      });
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Unable to process request",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-[24px] border border-slate-100 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <p className="text-[10px] font-bold tracking-widest text-[#007979] uppercase mb-2">
          RECOVERY
        </p>
        <h1 className="text-2xl font-bold text-slate-900">
          Forgot your password?
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        {sent ? (
          <div className="mt-8 rounded-[14px] border border-[#d9f0f0] bg-[#f7fcfc] p-5">
            <p className="text-sm font-semibold text-darkGray">Check your email</p>
            <p className="mt-2 text-sm text-mediumGray">
              If an account exists for {email}, a reset link has been sent.
            </p>
            <Link href="/login" className="mt-4 inline-flex font-medium text-[#007979] hover:underline">
              Return to login
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-darkGray">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-[8px] border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#007979]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#007979] py-3.5 font-bold text-white transition hover:bg-[#006666] disabled:bg-[#007979]/70"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
