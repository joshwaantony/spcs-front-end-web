"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";
import { getPostLoginRoute } from "@/lib/auth-routing";

export default function CompleteProfilePage() {
  const user = useAdminAuthStore((state) => state.user);
  const completeProfile = useAdminAuthStore((state) => state.completeProfile);
  const loading = useAdminAuthStore((state) => state.loading);
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await completeProfile({
        name: form.name.trim(),
        email: form.email.trim(),
      });

      showToast({
        type: "success",
        message: "Profile completed successfully",
      });
      router.push(getPostLoginRoute(updatedUser));
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Unable to complete profile",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-[24px] border border-slate-100 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <p className="text-[10px] font-bold tracking-widest text-[#007979] uppercase mb-2">
          PROFILE
        </p>
        <h1 className="text-2xl font-bold text-slate-900">
          Complete your profile
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Finish setting up your account before continuing.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-darkGray">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded-[8px] border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#007979]"
              value={form.name}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  name: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-darkGray">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-[8px] border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#007979]"
              value={form.email}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#007979] py-3.5 font-bold text-white transition hover:bg-[#006666] disabled:bg-[#007979]/70"
          >
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
