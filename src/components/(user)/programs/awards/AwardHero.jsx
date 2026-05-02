export default function AwardHero() {
  return (
    <section className="relative overflow-hidden bg-[#fbf8f1] pt-24 sm:pt-28 md:pt-32 pb-28 sm:pb-32 md:pb-36">

      {/* Soft radial background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="
            absolute
            top-[-220px] sm:top-[-260px]
            left-1/2 -translate-x-1/2
            w-[700px] h-[700px]
            sm:w-[900px] sm:h-[900px]
            md:w-[1100px] md:h-[1100px]
            rounded-full
            bg-[#f1bf27]/20
            blur-[140px] sm:blur-[160px]
          "
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">

        {/* Icon */}
        <div
          className="
            mb-8 sm:mb-10
            flex items-center justify-center
            w-16 h-16 sm:w-20 sm:h-20
            rounded-full
            bg-white
            border-2 border-[#FCF2DA]
          "
        >
          <span
            className="material-symbols-outlined text-[#F1BF27] text-[30px] sm:text-[38px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            workspace_premium
          </span>
        </div>

        {/* Title */}
        <h1
          className="
            text-[36px]
            sm:text-[48px]
            md:text-[64px]
            lg:text-[76px]
            font-extrabold
            tracking-tight
            text-[#0f172a]
            mb-5 sm:mb-6
          "
        >
          Akshara Puraskaram
        </h1>

        {/* Subtitle */}
        <p
          className="
            text-base
            sm:text-lg
            md:text-xl
            lg:text-2xl
            text-slate-600
            leading-relaxed
            max-w-xl sm:max-w-2xl md:max-w-3xl
            mb-10 sm:mb-12
          "
        >
          Celebrating the pinnacles of Malayalam Literature. A prestigious honor
          instituted by the Sahithya Pravarthaka Co-operative Society.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">

          <button
            className="
              w-full sm:w-auto
              px-8 sm:px-10
              py-3.5 sm:py-4
              rounded-full
              bg-[#f1bf27]
              text-[#0f172a]
              font-semibold
              text-sm sm:text-base
              hover:bg-[#e6b420]
              transition
            "
          >
            View Hall of Fame
          </button>

          <button
            className="
              w-full sm:w-auto
              px-8 sm:px-10
              py-3.5 sm:py-4
              rounded-full
              bg-white
              border border-slate-300
              text-[#0f172a]
              font-semibold
              text-sm sm:text-base
              hover:bg-slate-50
              transition
            "
          >
            Award Criteria
          </button>

        </div>
      </div>
    </section>
  );
}
