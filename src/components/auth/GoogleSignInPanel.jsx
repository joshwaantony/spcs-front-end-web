"use client";

import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useAdminAuthStore } from "@/store/auth/adminAuth.store";
import { useToastStore } from "@/store/ui/toast.store";
import { getPostLoginRoute } from "@/lib/auth-routing";

export default function GoogleSignInPanel({
  router,
  title = "Continue with Google",
  description = "Use your Google-linked SPCS account for instant access.",
  successMessage = "Google login successful",
  className = "",
}) {
  const loginWithGoogle = useAdminAuthStore((state) => state.loginWithGoogle);
  const loading = useAdminAuthStore((state) => state.loading);
  const showToast = useToastStore((state) => state.showToast);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleGoogleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;

    if (!idToken) {
      showToast({
        type: "error",
        message: "Google sign-in did not return an ID token.",
      });
      return;
    }

    try {
      const user = await loginWithGoogle({ idToken });

      showToast({
        type: "success",
        message: successMessage,
      });

      router.push(getPostLoginRoute(user));
    } catch (authError) {
      showToast({
        type: "error",
        message: authError.message || "Google sign-in failed.",
      });
    }
  };

  const handleGoogleError = () => {
    showToast({
      type: "error",
      message: "Google sign-in was cancelled or could not be completed.",
    });
  };

  return (
    <div className={className}>
      <div className="rounded-[24px] border border-[#e4ecf7] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 shadow-[0_16px_40px_-30px_rgba(18,109,236,0.22)] sm:p-5">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ff]">
            <FcGoogle size={20} />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#111827]">
              {title}
            </h3>
            <p className="mt-1 text-sm font-medium leading-6 text-[#64748b]">
              {description}
            </p>
          </div>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-[20px] border border-[#dbe6f4] bg-white p-3 sm:p-4">
          {clientId ? (
            <>
              <div
                className={`transition ${
                  loading ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={false}
                  theme="outline"
                  shape="pill"
                  size="large"
                  text="continue_with"
                  width="100%"
                />
              </div>

              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/75 backdrop-blur-[1px]">
                  <span className="text-sm font-bold text-[#126DEC]">
                    Connecting Google...
                  </span>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-[16px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
              Google sign-in is unavailable because `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
              is missing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
