// components/news/PageHeader.js
export default function PageHeader() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8FBFA]">

      {/* 4-SIDE FADE BACKGROUND */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              rgba(255,255,255,0.95) 0%,
              rgba(248,251,250,0.92) 35%,
              rgba(242,248,245,0.88) 60%,
              rgba(235,243,239,0.85) 100%
            )
          `,
        }}
      />

      {/* CONTENT */}
      <div className="py-[130px]">
        <div className="max-w-4xl mx-auto px-4 text-center">

          {/* TITLE */}
          <h1 className="text-[52px] leading-[1.15] font-extrabold text-[#0F172A]">
            Latest Literary News & <br /> Updates
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 text-[18px] leading-relaxed text-[#475569] max-w-3xl mx-auto">
            Stay informed about awards, book releases, and cultural events from the <br />
            Sahithya Pravarthaka Co-operative Society.
          </p>

          {/* BUTTON */}
          <div className="mt-10 flex justify-center">
            <button
              className="
                inline-flex items-center gap-3
                px-8 py-3
                rounded-full
                bg-white
                border border-[#E2E8F0]
                shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                font-semibold
                text-black
                hover:bg-[#F0FDF4]
                transition
              "
            >
              {/* ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#1AE680]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l9 6 9-6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
                />
              </svg>

              Subscribe to Newsletter
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
