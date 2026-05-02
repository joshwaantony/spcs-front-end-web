"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/auth/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";
import { getPostLoginRoute } from "@/lib/auth-routing";
import { HiEye, HiEyeOff, HiLockClosed, HiMail, HiPhone } from "react-icons/hi";

const tabs = [
  { id: "otp", label: "Phone OTP" },
  { id: "email", label: "Email Login" },
];

function AuthHero() {
  return (
    <section className="hidden lg:flex flex-col space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl xl:text-5xl font-bold leading-tight text-darkGray">
          The Home of <br />
          <span className="text-[#008080]">Malayalam Literature</span>
        </h1>

        <p className="text-base xl:text-lg text-mediumGray max-w-lg leading-relaxed">
          Sahithya Pravarthaka Co-operative Society (SPCS) connects readers,
          writers, and administrators through one shared platform rooted in a
          rich literary legacy.
        </p>
      </div>

      <div className="relative pt-8">
        <div className="w-56 xl:w-64 h-72 xl:h-80 bg-gray-100 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxIMYat20IaWJw6a6nBSqWnVPNPrq6Ml6SM0PfCDSOkUgmQWjiv1BsndkXAywFE6OszLPxg63Dj_UHgaV3vzdKtMDBNqJa-4ZqKFufbCcZCi-fk8X0hawD9L0bh0aJOCbIhapfFh7H9quT9w_twshrVEtVW4ajUv2U0WKL2hkqQuK8hcjRui8snkSXY7kLdTNhZSL8xpCrkGQhs_rh_WscM4yWi9kOHU--Rv0eqtXY45y2yfbagDQG8mG9ktxL06WdHJ3DNeG_vg0"
            alt="Featured Book Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute -bottom-4 -left-4 w-20 xl:w-24 h-20 xl:h-24 bg-spcsTealLight -z-10 rounded-full" />
      </div>
    </section>
  );
}

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("otp");
  const [phone, setPhone] = useState("");
  const [emailForm, setEmailForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const requestOtp = useAdminAuthStore((state) => state.requestOtp);
  const loginWithEmail = useAdminAuthStore((state) => state.loginWithEmail);
  const loading = useAdminAuthStore((state) => state.loading);
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      await requestOtp({ phone: phone.trim() });
      showToast({
        type: "success",
        message: "OTP sent successfully",
      });
      router.push(`/verify-otp?phone=${encodeURIComponent(phone.trim())}`);
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Unable to send OTP",
      });
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginWithEmail({
        email: emailForm.email.trim(),
        password: emailForm.password,
      });

      showToast({
        type: "success",
        message: "Logged in successfully",
      });
      router.push(getPostLoginRoute(user));
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Unable to login right now.",
      });
    }
  };

  return (
    <div className="font-sans text-darkGray min-h-screen flex flex-col relative overflow-x-hidden">
      <div aria-hidden="true" className="absolute top-0 right-0 w-full h-full -z-10 overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] w-[60%] md:w-[50%] h-[60%]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,128,128,0.05) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          }}
        />

        <div
          className="absolute bottom-[10%] left-[-10%] w-[60%] md:w-[40%] h-[50%]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,128,128,0.03) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50% 50% 30% 70% / 50% 60% 40% 40%",
          }}
        />
      </div>

      <main className="flex-grow flex items-center justify-center py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-[120px]">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AuthHero />

          <section className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md sm:max-w-lg bg-white rounded-[12px] p-6 sm:p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-50">
              <div className="mb-6 sm:mb-8">
                <span className="block text-[#008080] text-xs font-bold tracking-widest mb-2">
                  WELCOME
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-darkGray mb-2">
                  Sign in to your account
                </h2>
                <p className="text-mediumGray text-sm sm:text-base">
                  Choose your preferred login method and continue to your role-based dashboard.
                </p>
              </div>

              <div className="mb-6 grid grid-cols-2 rounded-[8px] bg-[#f2f7f7] p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-[6px] px-4 py-2.5 text-sm font-semibold transition ${
                      activeTab === tab.id
                        ? "bg-white text-[#008080] shadow-sm"
                        : "text-mediumGray hover:text-darkGray"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "otp" ? (
                <form className="space-y-6" onSubmit={handleOtpSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-darkGray">
                      Phone Number
                    </label>

                    <div className="flex items-center rounded-[6px] border border-gray-300 bg-white focus-within:ring-1 focus-within:ring-[#008080]">
                      <span className="px-3 text-mediumGray">
                        <HiPhone className="text-lg" />
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+919876543210"
                        className="flex-1 rounded-[6px] border-0 bg-transparent p-3 text-sm focus:outline-none"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#008080] hover:bg-[#006666] disabled:bg-[#008080]/70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-[6px] transition-colors shadow-md"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </form>
              ) : (
                <form className="space-y-6" onSubmit={handleEmailSubmit}>
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
                        value={emailForm.email}
                        onChange={(e) =>
                          setEmailForm((current) => ({
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
                        value={emailForm.password}
                        onChange={(e) =>
                          setEmailForm((current) => ({
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
              )}

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-gray-100 pt-6 text-sm text-mediumGray">
                <Link href="/forgot-password" className="font-medium text-[#008080] hover:underline">
                  Forgot password?
                </Link>
                <Link href="/admin/login" className="font-medium text-[#008080] hover:underline">
                  Admin login
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
