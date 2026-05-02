
export default function Hero() {
  return (
    <section className="relative bg-[#FDF6F4] overflow-hidden">
      
      {/* background blobs */}
      <div className="absolute -top-40 -left-40 w-[420px] md:w-[520px] h-[420px] md:h-[520px] bg-[#F8E7E3] rounded-full blur-[120px]" />
      <div className="absolute top-32 right-0 md:right-10 w-[320px] md:w-[420px] h-[320px] md:h-[420px] bg-[#FBEDEA] rounded-full blur-[140px]" />

      <div className="
        relative
        max-w-[1200px]
        mx-auto
        px-5 sm:px-8 md:px-10
        py-24 sm:py-28 md:py-32
        grid
        grid-cols-1
        md:grid-cols-2
        gap-16 md:gap-20
        items-center
      ">

        {/* LEFT */}
        <div className="flex flex-col gap-6 sm:gap-7 text-center md:text-left items-center md:items-start">

          {/* badge */}
          <span className="inline-flex items-center gap-2 bg-[#F7E1DA] text-[#EC4D12] px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase w-fit">
            <span className="material-symbols-outlined text-sm">
              auto_awesome
            </span>
            Happening in Kerala
          </span>

          {/* heading */}
          <h1 className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            xl:text-7xl
            font-extrabold
            leading-[1.1]
            tracking-tight
            text-[#181311]
          ">
            Celebrate <br />
            <span className="text-[#EC4D12]">Literature.</span>
          </h1>

          {/* description */}
          <p className="
            text-base
            sm:text-lg
            md:text-xl
            text-[#5E4A42]
            max-w-[520px]
            leading-relaxed
          ">
            Book launches, author meetups, and literary festivals brought to you by Sahithya Pravarthaka Co-operative Society.
          </p>

          {/* buttons */}
          <div className="
            flex
            flex-col
            sm:flex-row
            gap-4 sm:gap-5
            mt-4
            w-full
            sm:w-auto
          ">
            <button className="
              bg-[#EC4D12]
              text-white
              px-8 sm:px-10
              py-4 sm:py-5
              rounded-xl
              font-bold
              flex
              items-center
              justify-center
              gap-3
              shadow-xl
              shadow-[#EC4D12]/30
              hover:scale-[1.02]
              transition
            ">
              Explore Calendar
              <span className="material-symbols-outlined">
                calendar_today
              </span>
            </button>

            <button className="
              border
              border-[#FADAD3]
              bg-[#FDF9F9]
              text-[#EC4D12]
              px-8 sm:px-10
              py-4 sm:py-5
              rounded-xl
              font-bold
              hover:bg-[#FFF1ED]
              transition
            ">
              Past Events
            </button>
          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="relative flex justify-center mt-10 md:mt-0">
          <div className="
            relative
            w-[280px]
            h-[280px]
            sm:w-[340px]
            sm:h-[340px]
            md:w-[420px]
            md:h-[420px]
          ">

            {/* back card */}
            <div className="absolute inset-0 bg-[#F8E7E3] rounded-[24px] md:rounded-[28px] rotate-6" />

            {/* front card */}
            <div className="
              absolute
              inset-0
              bg-white
              rounded-[24px] md:rounded-[28px]
              shadow-2xl
              flex
              flex-col
              items-center
              justify-center
              -rotate-3
              px-8 sm:px-10 md:px-12
            ">

              {/* icon */}
              <span className="
                material-symbols-outlined
                text-[#EC4D12]
                text-[80px]
                sm:text-[100px]
                md:text-[120px]
                mb-6 md:mb-8
              ">
                school
              </span>

              {/* divider lines */}
              <div className="w-2/3 h-2 bg-[#F4D6CF] rounded mb-3" />
              <div className="w-1/2 h-2 bg-[#F4D6CF] rounded mb-8 md:mb-10" />

              {/* bottom blocks */}
              <div className="flex gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#F8E7E3]" />
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#F2B6A4]" />
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#F8E7E3]" />
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
