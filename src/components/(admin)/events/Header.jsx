"use client";

export default function Header() {
  return (
    <header
      className="
        flex flex-col gap-4
        lg:flex-row lg:items-center lg:justify-between
        mb-6 lg:mb-8
        px-3 sm:px-4 lg:px-6
      "
    >
      {/* ================= TITLE ================= */}
      <h2
        className="
          text-xl sm:text-2xl
          text-black font-extrabold tracking-tight
        "
      >
      Add New Event
      </h2>

      {/* ================= RIGHT ACTIONS ================= */}
      <div
        className="
          flex items-center justify-between
          gap-3 sm:gap-4 lg:gap-6
          w-full lg:w-auto
        "
      >
    

 

        {/* ================= NOTIFICATION ================= */}
        <button
          className="
            relative
            bg-white size-10 sm:size-11
            rounded-full
            flex items-center justify-center
            shadow-sm border border-[#F3F4F6]
          "
        >
          <span className="material-symbols-outlined text-[#6B7280]">
            notifications
          </span>
          <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full" />
        </button>

        {/* ================= PROFILE ================= */}
        <div
          className="
            flex items-center gap-2 sm:gap-3
            pl-0 sm:pl-4
            sm:border-l border-[#E5E7EB]
          "
        >
          {/* TEXT HIDE ON MOBILE */}
          <div className="text-right hidden sm:block">
            <p className="text-sm text-black font-bold">Admin User</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>

          {/* AVATAR */}
          <div
            className="
              size-9 sm:size-11
              rounded-full bg-cover bg-center
              border-2 border-white
            "
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHLbcFmHwlgxmqfqZ1PAnYtwGg_9Q1o2tooP6h1Gcgd903iSFlbHhOiGpQ1bbd75xff2A_BM1xd-tYQqUIMz9QFY4ku5B4uwJIipMEi_8GisNYiLLUCOxJQp10-xxcTHwCClTNO3trmvkT0N8bKcmF2P7Yp9O3y6otsd9NtpYNslcX1i6BVAoH8S3Uvysgkj9HMoqjcGwy2WhLY7drwqbfNSpVFi-DjXUMibT7XcbhC9OcJ_zPjO7twkXa1d11Y7eLovofDixl7RY')",
            }}
          />
        </div>
      </div>
    </header>
  );
}
