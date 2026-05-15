"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiArrowRight,
  HiEye,
  HiEyeOff,
  HiLockClosed,
  HiMail,
} from "react-icons/hi";
import { useAdminAuthStore } from "@/store/auth/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";
import { getPostLoginRoute } from "@/lib/auth-routing";
import GoogleSignInPanel from "@/components/auth/GoogleSignInPanel";

function AuthHeroPanel() {
  return (
    <section className="hidden rounded-[36px] border border-white/70 bg-[linear-gradient(145deg,#0f172a_0%,#123767_42%,#126DEC_100%)] p-10 text-white shadow-[0_40px_120px_-48px_rgba(18,109,236,0.6)] lg:flex lg:min-h-[760px] lg:flex-col lg:justify-between">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/65">
          Reader Access
        </p>
        <h1 className="mt-4 max-w-xl text-5xl font-black leading-[1.02] tracking-[-0.04em]">
          Sign in to your Malayalam reading world.
        </h1>
        <p className="mt-5 max-w-lg text-base font-medium leading-7 text-white/74">
          Continue with your SPCS account to browse purchases, manage your shelf,
          and keep your reading journey in sync.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[28px] border border-white/14 bg-white/10 p-6 backdrop-blur">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/60">
            What you get
          </p>
          <div className="mt-4 grid gap-3">
            <FeatureLine label="Restore your reading session instantly" />
            <FeatureLine label="Keep purchases and cart in one place" />
            <FeatureLine label="Move between web and future mobile touchpoints" />
          </div>
        </div>

        <div className="rounded-[28px] border border-white/12 bg-[#f8fbff] p-6 text-[#111827]">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#7b8ca6]">
            Support note
          </p>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#5f7391]">
            If your account was created with Google, use the Google sign-in path
            instead of password login.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureLine({ label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/16 text-white">
        <HiArrowRight size={16} />
      </span>
      <p className="text-sm font-semibold text-white/85">{label}</p>
    </div>
  );
}

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const loginWithEmail = useAdminAuthStore((state) => state.loginWithEmail);
  const loading = useAdminAuthStore((state) => state.loading);
  const error = useAdminAuthStore((state) => state.error);
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();

  const inlineError = useMemo(() => {
    if (!error) {
      return "";
    }

    if (/google login/i.test(error)) {
      return "This account uses Google sign-in. Please continue with Google.";
    }

    return error;
  }, [error]);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginWithEmail({
        email: form.email.trim(),
        password: form.password,
      });

      showToast({
        type: "success",
        message: "Logged in successfully",
      });

      router.push(getPostLoginRoute(user));
    } catch (authError) {
      showToast({
        type: "error",
        message: authError.message || "Unable to sign in right now.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,#f6f9ff_0%,#fbfdff_46%,#f5f8ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1360px] gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <AuthHeroPanel />

        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center lg:min-h-0">
          <div className="w-full max-w-[560px] rounded-[34px] border border-white/80 bg-white/95 p-6 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.3)] backdrop-blur sm:p-8 md:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#7b8ca6]">
              Welcome back
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#111827] sm:text-[2.4rem]">
              Sign in to continue
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#64748b] sm:text-base">
              Use your email and password to restore your session. We&apos;ll
              handle refresh and account recovery in the background.
            </p>

            <GoogleSignInPanel
              router={router}
              className="mt-6"
              title="Continue with Google"
              description="Use this if your SPCS account is already connected to Google."
              successMessage="Google login successful"
            />

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e8eef6]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                Or use email
              </span>
              <div className="h-px flex-1 bg-[#e8eef6]" />
            </div>

            <form className="space-y-5" onSubmit={handleEmailSubmit}>
              <AuthField label="Email address">
                <div className="flex items-center rounded-[20px] border border-[#e5ebf3] bg-[#f9fbff] px-4">
                  <HiMail className="text-lg text-[#94a3b8]" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="you@example.com"
                    className="h-14 w-full bg-transparent px-3 text-sm font-semibold text-[#111827] outline-none placeholder:text-[#94a3b8]"
                    autoComplete="email"
                    required
                  />
                </div>
              </AuthField>

              <AuthField label="Password">
                <div className="flex items-center rounded-[20px] border border-[#e5ebf3] bg-[#f9fbff] px-4">
                  <HiLockClosed className="text-lg text-[#94a3b8]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    placeholder="Enter your password"
                    className="h-14 w-full bg-transparent px-3 text-sm font-semibold text-[#111827] outline-none placeholder:text-[#94a3b8]"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="text-[#94a3b8] transition hover:text-[#126DEC]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
              </AuthField>

              {inlineError ? (
                <div className="rounded-[18px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {inlineError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#126DEC] px-6 text-sm font-black text-white shadow-[0_20px_36px_-22px_rgba(18,109,236,0.6)] transition hover:-translate-y-0.5 hover:bg-[#0f60d0] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing you in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 border-t border-[#eef2f7] pt-6 text-sm font-semibold text-[#64748b] sm:flex-row sm:items-center sm:justify-between">
              <Link href="/forgot-password" className="transition hover:text-[#126DEC]">
                Forgot password?
              </Link>
              <Link href="/register" className="transition hover:text-[#126DEC]">
                Create a new account
              </Link>
              <Link href="/admin/login" className="transition hover:text-[#126DEC]">
                Admin sign in
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function AuthField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#1f2937]">{label}</span>
      {children}
    </label>
  );
}
