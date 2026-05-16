"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff, HiLockClosed, HiMail, HiShieldCheck } from "react-icons/hi";
import { useAdminAuthStore } from "@/store/auth/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";
import { getPostLoginRoute } from "@/lib/auth-routing";

function AdminHeroPanel() {
  return (
    <section className="relative hidden overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(145deg,#0f172a_0%,#123767_42%,#126DEC_100%)] p-10 text-white shadow-[0_40px_120px_-48px_rgba(18,109,236,0.6)] lg:flex lg:min-h-[760px] lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-8%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-16%] right-[-4%] h-72 w-72 rounded-full bg-[#7dd3fc]/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/65">
          Admin Portal
        </p>
        <h1 className="mt-4 max-w-xl text-5xl font-black leading-[1.02] tracking-[-0.04em]">
          Sign in to manage the SPCS storefront.
        </h1>
        <p className="mt-5 max-w-lg text-base font-medium leading-7 text-white/74">
          Access books, media, merchandising, and operations from one secure
          admin workspace.
        </p>
      </div>

      <div className="group relative mt-12 flex-1">


        <div className="absolute bottom-10 left-0 right-0 mx-auto h-[420px] max-w-[560px]">
          <div className="absolute bottom-10 left-2 z-10 w-[180px] -rotate-[14deg] overflow-hidden rounded-[24px] border border-white/18 bg-white/8 p-3 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.95)] backdrop-blur transition duration-500 ease-out group-hover:-translate-y-3 group-hover:-rotate-[18deg] group-hover:shadow-[0_40px_100px_-38px_rgba(15,23,42,0.98)]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[18px]">
              <Image
                src="/hero/left.png"
                alt="SPCS catalog cover"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 z-30 w-[250px] -translate-x-1/2 overflow-hidden rounded-[30px] border border-white/20 bg-white/10 p-3 shadow-[0_40px_100px_-40px_rgba(2,6,23,0.95)] backdrop-blur transition duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-[1.03] group-hover:shadow-[0_52px_118px_-42px_rgba(2,6,23,1)]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[24px]">
              <Image
                src="/hero/center.png"
                alt="Featured SPCS title"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020617] via-[#020617]/65 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/60">
                  Operations View
                </p>
                <p className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                  Monitor the live catalog
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-14 right-3 z-20 w-[170px] rotate-[12deg] overflow-hidden rounded-[22px] border border-white/18 bg-white/8 p-3 shadow-[0_28px_75px_-34px_rgba(15,23,42,0.9)] backdrop-blur transition duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-[16deg] group-hover:shadow-[0_36px_90px_-38px_rgba(15,23,42,0.96)]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[16px]">
              <Image
                src="/hero/right.png"
                alt="SPCS inventory cover"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FeatureLine label="Manage catalog and merchandising" />
        <FeatureLine label="Review orders and admin activity" />
      </div>
    </section>
  );
}

function FeatureLine({ label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/16 text-white">
        <HiShieldCheck size={16} />
      </span>
      <p className="text-sm font-semibold text-white/85">{label}</p>
    </div>
  );
}

export default function AdminLoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const loginAdmin = useAdminAuthStore((state) => state.loginAdmin);
  const loading = useAdminAuthStore((state) => state.loading);
  const error = useAdminAuthStore((state) => state.error);
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginAdmin({
        email: form.email.trim(),
        password: form.password,
      });

      showToast({
        type: "success",
        message: "Admin logged in successfully",
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
    <div className="min-h-screen bg-[linear-gradient(145deg,#f5f8ff_0%,#fbfdff_48%,#eef4ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1320px] gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <AdminHeroPanel />

        <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center lg:min-h-0">
          <div className="w-full max-w-[520px] rounded-[34px] border border-white/80 bg-white/95 p-6 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.3)] backdrop-blur sm:p-8 md:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#7b8ca6]">
              Admin access
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#111827] sm:text-[2.4rem]">
              Sign in to continue
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#64748b] sm:text-base">
              Use your admin email and password. Refresh handling and role checks
              are already connected.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
                    placeholder="admin@spcs.com"
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

              {error ? (
                <div className="rounded-[18px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#111827] px-6 text-sm font-black text-white shadow-[0_20px_36px_-22px_rgba(17,24,39,0.45)] transition hover:-translate-y-0.5 hover:bg-[#126DEC] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing you in..." : "Sign in as admin"}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 border-t border-[#eef2f7] pt-6 text-sm font-semibold text-[#64748b] sm:flex-row sm:items-center sm:justify-between">
              <Link href="/forgot-password" className="transition hover:text-[#126DEC]">
                Forgot password?
              </Link>
              <Link href="/login" className="transition hover:text-[#126DEC]">
                Reader sign in
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
