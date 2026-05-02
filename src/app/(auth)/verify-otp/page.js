"use client";

import { Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";
import { getPostLoginRoute } from "@/lib/auth-routing";

function VerifyOtpCard() {
  const inputsRef = useRef([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const verifyOtp = useAdminAuthStore((state) => state.verifyOtp);
  const loading = useAdminAuthStore((state) => state.loading);
  const showToast = useToastStore((state) => state.showToast);
  const phone = searchParams.get("phone") || "";

  const handleInput = (e, index) => {
    if (e.target.value.length === 1 && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = inputsRef.current.map((input) => input?.value || "").join("");

    if (code.length !== 6) {
      showToast({
        type: "error",
        message: "Please enter the 6-digit OTP",
      });
      return;
    }

    try {
      const user = await verifyOtp({ phone, code });
      showToast({
        type: "success",
        message: "OTP verified successfully",
      });
      router.push(getPostLoginRoute(user));
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Invalid OTP",
      });
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-md rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-6 md:p-8 lg:p-10">
        <header className="mb-7 sm:mb-8">
          <p className="text-[10px] font-bold tracking-widest text-[#007979] uppercase mb-2">
            VERIFY
          </p>

          <h2 className="mb-3 text-xl font-bold text-slate-900 sm:text-2xl">
            Enter Verification Code
          </h2>

          <p className="text-sm leading-6 text-slate-500">
            We sent a 6-digit code to your phone number <br />
            <span className="font-bold text-slate-700">
              {phone || "Phone number not available"}
            </span>
          </p>
        </header>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                maxLength="1"
                type="text"
                onInput={(e) => handleInput(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                inputMode="numeric"
                className="h-11 w-full min-w-0 rounded-md border border-slate-300 text-center text-lg font-bold focus:border-[#007979] focus:outline-none focus:ring-2 focus:ring-[#007979] sm:h-12 sm:text-xl lg:h-14"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#007979] py-3.5 font-bold text-white transition hover:bg-[#006666] disabled:bg-[#007979]/70 shadow-lg shadow-teal-900/10 sm:py-4"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <footer className="mt-8 flex flex-col items-center space-y-3 border-t border-slate-100 pt-6 text-center text-sm sm:pt-8">
          <Link href="/login" className="text-[#007979] font-medium hover:underline">
            Back to Login
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-12 px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:items-center lg:justify-center lg:px-10 lg:py-16 xl:px-16">
        <Suspense fallback={<div className="w-full max-w-md" />}>
          <VerifyOtpCard />
        </Suspense>
      </main>
    </div>
  );
}
