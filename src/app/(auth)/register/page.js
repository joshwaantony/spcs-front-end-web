"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowRight, HiEye, HiEyeOff, HiLockClosed, HiMail, HiUser } from "react-icons/hi";
import GoogleSignInPanel from "@/components/auth/GoogleSignInPanel";
import { useAdminAuthStore } from "@/store/auth/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";
import { getPostLoginRoute } from "@/lib/auth-routing";

function RegisterHeroPanel() {
  return (
    <section className="relative hidden overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(145deg,#0f172a_0%,#123767_42%,#126DEC_100%)] p-10 shadow-[0_40px_120px_-48px_rgba(18,109,236,0.6)] lg:flex lg:min-h-[760px] lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-8%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-16%] right-[-4%] h-72 w-72 rounded-full bg-[#7dd3fc]/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#7b8ca6]">
          New account
        </p>
        <h1 className="mt-4 max-w-xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#111827]">
          Create your SPCS reader account.
        </h1>
        <p className="mt-5 max-w-lg text-base font-medium leading-7 text-[#60728d]">
          Join the SPCS reading experience with one account for discovery,
          purchases, bookmarks, and your growing Malayalam shelf.
        </p>
      </div>

      <div className="group relative z-10 mt-12 flex-1">
    

    

        <div className="absolute bottom-10 left-0 right-0 mx-auto h-[430px] max-w-[560px]">
          <div className="absolute left-3 top-8 z-10 w-[170px] -rotate-[12deg] overflow-hidden rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(239,246,255,0.7))] p-3 shadow-[0_28px_75px_-36px_rgba(14,116,144,0.24)] backdrop-blur transition duration-500 ease-out group-hover:-translate-y-3 group-hover:-rotate-[16deg] group-hover:shadow-[0_38px_95px_-40px_rgba(14,116,144,0.32)]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[18px]">
              <Image
                src="/hero/left.png"
                alt="Malayalam book cover"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 z-30 w-[250px] -translate-x-1/2 overflow-hidden rounded-[30px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(224,242,254,0.78))] p-3 shadow-[0_38px_96px_-42px_rgba(14,116,144,0.34)] backdrop-blur transition duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-[1.03] group-hover:shadow-[0_48px_115px_-44px_rgba(14,116,144,0.42)]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[24px]">
              <Image
                src="/hero/center.png"
                alt="Featured Malayalam title"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/65 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/65">
                  First Pick
                </p>
                <p className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                  Start your shelf strong
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-14 right-4 z-20 w-[170px] rotate-[11deg] overflow-hidden rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(240,249,255,0.72))] p-3 shadow-[0_26px_70px_-34px_rgba(14,116,144,0.22)] backdrop-blur transition duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-[15deg] group-hover:shadow-[0_34px_88px_-38px_rgba(14,116,144,0.3)]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[16px]">
              <Image
                src="/hero/right.png"
                alt="Malayalam bestseller cover"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RegisterFeatureLine label="Create your profile in a minute" />
        <RegisterFeatureLine label="Sync your purchases and wishlist" />
      </div>
    </section>
  );
}

function RegisterFeatureLine({ label }) {
  return (
    <div className="flex items-center gap-3 rounded-[24px] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(240,249,255,0.72))] px-5 py-4 shadow-[0_20px_44px_-34px_rgba(14,116,144,0.22)] backdrop-blur">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f766e,#126DEC)] text-white shadow-[0_16px_28px_-18px_rgba(14,116,144,0.7)]">
        <HiArrowRight size={18} />
      </span>
      <p className="text-sm font-semibold text-[#16324f]">{label}</p>
    </div>
  );
}

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
        <RegisterHeroPanel />

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

            <GoogleSignInPanel
              router={router}
              className="mt-6"
              title="Start with Google"
              description="If you prefer Google sign-in, we&apos;ll create or link your SPCS account instantly."
              successMessage="Google account connected successfully"
            />

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e8eef6]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                Or create with email
              </span>
              <div className="h-px flex-1 bg-[#e8eef6]" />
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
