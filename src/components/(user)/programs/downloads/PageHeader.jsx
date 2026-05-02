



export default function PageHeader() {
  return (
    <section className="bg-[#f3f6f9]">
      <div
        className="
          max-w-[1280px]
          mx-auto
          px-4
          sm:px-6
          lg:px-10
          py-16
          sm:py-20
          lg:py-24
        "
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-10
            lg:gap-14
          "
        >
          {/* LEFT CONTENT */}
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <h1
              className="
                text-[32px]
                sm:text-[40px]
                md:text-[48px]
                lg:text-[56px]
                font-extrabold
                leading-tight
                tracking-[-0.025em]
                text-[#111418]
              "
            >
              Official Resources & Downloads
            </h1>

            <p
              className="
                text-[15px]
                sm:text-[16px]
                md:text-[18px]
                text-[#617589]
                leading-relaxed
              "
            >
              Access tender notices, membership application forms, and official
              society documents.
            </p>
          </div>

          {/* SEARCH BOX */}
          <div className="w-full sm:max-w-[420px]">
            <div className="relative">
              {/* Icon */}
              <span
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#9aa4b2]
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </span>

              {/* Input */}
              <input
                type="text"
                placeholder="Find a document..."
                className="
                  w-full
                  h-[48px]
                  sm:h-[52px]
                  lg:h-[56px]
                  pl-12
                  sm:pl-14
                  pr-5
                  rounded-full
                  border
                  border-[#e2e8f0]
                  bg-white
                  text-[14px]
                  sm:text-[15px]
                  text-[#111418]
                  placeholder-[#9aa4b2]
                  shadow-sm
                  transition
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
