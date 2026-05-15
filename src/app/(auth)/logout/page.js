"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiOutlineLogout, HiShieldCheck } from "react-icons/hi";
import { useAdminAuthStore } from "@/store/auth/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";

export default function LogoutPage() {
  const router = useRouter();
  const logout = useAdminAuthStore((state) => state.logout);
  const loading = useAdminAuthStore((state) => state.loading);
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);
  const showToast = useToastStore((state) => state.showToast);

  const handleLogout = async () => {
    try {
      await logout();
      showToast({
        type: "success",
        message: "Logged out successfully",
      });
      router.push("/home");
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Unable to logout right now.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,#f6f9ff_0%,#fbfdff_46%,#f5f8ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[760px] items-center justify-center">
        <div className="w-full rounded-[34px] border border-white/80 bg-white/95 p-6 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.3)] backdrop-blur sm:p-8 md:p-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#eef5ff] text-[#126DEC]">
            <HiOutlineLogout size={28} />
          </div>

          <p className="mt-6 text-[11px] font-black uppercase tracking-[0.24em] text-[#7b8ca6]">
            Logout confirmation
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#111827] sm:text-[2.4rem]">
            Sign out of your SPCS account?
          </h1>
          <p className="mt-3 text-sm font-medium leading-7 text-[#64748b] sm:text-base">
            You&apos;ll be signed out from this browser session. Your refresh
            cookie will be cleared through the logout API as well.
          </p>

          <div className="mt-6 rounded-[24px] border border-[#e8eef6] bg-[#f8fbff] p-5">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#126DEC] shadow-[0_10px_24px_-20px_rgba(15,23,42,0.35)]">
                <HiShieldCheck size={20} />
              </span>
              <div>
                <p className="text-sm font-black text-[#111827]">
                  Secure logout
                </p>
                <p className="mt-1 text-sm font-medium leading-6 text-[#64748b]">
                  This action calls the backend logout endpoint and clears the
                  session on the client side.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={isAuthenticated ? "/account" : "/home"}
              className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full border border-[#dce6f3] bg-white px-6 text-sm font-black text-[#334155] transition hover:-translate-y-0.5 hover:border-[#c7d4e8]"
            >
              <HiArrowLeft size={18} />
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="inline-flex h-14 flex-1 items-center justify-center rounded-full bg-[#111827] px-6 text-sm font-black text-white shadow-[0_20px_36px_-22px_rgba(17,24,39,0.45)] transition hover:-translate-y-0.5 hover:bg-[#126DEC] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging you out..." : "Confirm logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
