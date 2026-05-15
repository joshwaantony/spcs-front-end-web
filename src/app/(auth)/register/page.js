"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowRight, HiEye, HiEyeOff, HiLockClosed, HiMail, HiUser } from "react-icons/hi";
import { useAdminAuthStore } from "@/store/auth/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";
import { getPostLoginRoute } from "@/lib/auth-routing";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const registerAccount = useAdminAuthStore((state) => state.registerUser);
  const loading = useAdminAuthStore((state) => state.loading);
  const error = useAdminAuthStore((state) => state.error);
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await registerAccount({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      showToast({
        type: "success",
        message: "Account created successfully",
      });

      router.push(getPostLoginRoute(user));
    } catch (authError) {
      showToast({
        type: "error",
        message: authError.message || "Unable to create your account.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,#f6f9ff_0%,#fbfdff_46%,#f5f8ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1360px] gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="hidden rounded-[36px] border border-white/70 bg-[linear-gradient(145deg,#ffffff_0%,#eef5ff_52%,#dbe9ff_100%)] p-10 shadow-[0_35px_100px_-52px_rgba(18,109,236,0.35)] lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#7b8ca6]">
              New account
            </p>
            <h1 className="mt-4 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#111827]">
              Create your SPCS reader account.
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-[#60728d]">
              Join the SPCS reading experience with a single account for catalog
              discovery, purchases, and future digital access.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "Start with email and password only",
              "Your cart session can merge after sign-in",
              "Password recovery is available anytime",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[24px] border border-white/80 bg-white px-5 py-4"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#126DEC] text-white">
                  <HiArrowRight size={18} />
                </span>
                <p className="text-sm font-semibold text-[#1f2937]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center lg:min-h-0">
          <div className="w-full max-w-[560px] rounded-[34px] border border-white/80 bg-white/95 p-6 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.3)] backdrop-blur sm:p-8 md:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#7b8ca6]">
              Create account
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#111827] sm:text-[2.4rem]">
              Set up your reader profile
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#64748b] sm:text-base">
              Use your name, email, and a secure password. We&apos;ll take care
              of the session and restore your access automatically.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <AuthField label="Full name">
                <div className="flex items-center rounded-[20px] border border-[#e5ebf3] bg-[#f9fbff] px-4">
                  <HiUser className="text-lg text-[#94a3b8]" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="John Doe"
                    className="h-14 w-full bg-transparent px-3 text-sm font-semibold text-[#111827] outline-none placeholder:text-[#94a3b8]"
                    autoComplete="name"
                    required
                  />
                </div>
              </AuthField>

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
                    placeholder="Create a secure password"
                    className="h-14 w-full bg-transparent px-3 text-sm font-semibold text-[#111827] outline-none placeholder:text-[#94a3b8]"
                    autoComplete="new-password"
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

              {error ? (
                <div className="rounded-[18px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#126DEC] px-6 text-sm font-black text-white shadow-[0_20px_36px_-22px_rgba(18,109,236,0.6)] transition hover:-translate-y-0.5 hover:bg-[#0f60d0] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating your account..." : "Create account"}
              </button>
            </form>

            <div className="mt-6 border-t border-[#eef2f7] pt-6 text-sm font-semibold text-[#64748b]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#126DEC] transition hover:underline">
                Sign in
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
