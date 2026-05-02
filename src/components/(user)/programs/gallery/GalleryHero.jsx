export default function GalleryHero() {
  return (
    <section
      className="
        relative overflow-hidden bg-white
        pt-14 pb-12
        sm:pt-16 sm:pb-14
        md:pt-20 md:pb-16
        lg:pt-24 lg:pb-20
        px-4 sm:px-6
      "
    >
      {/* subtle background pattern */}
      <div className="absolute inset-0 organic-pattern opacity-[0.06]" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1
          className="
            font-extrabold tracking-tight text-[#0f172a]
            text-[32px]
            sm:text-[40px]
            md:text-[52px]
            lg:text-[64px]
            leading-[1.1]
            mb-4 sm:mb-5 md:mb-6
          "
        >
          Our Visual History
        </h1>

        {/* Description */}
        <p
          className="
            font-medium text-gray-500
            text-sm
            sm:text-base
            md:text-lg
            lg:text-xl
            leading-relaxed
            max-w-[90%] sm:max-w-xl md:max-w-2xl
            mx-auto
          "
        >
          A photographic journey through SPCS events, book launches, awards, and
          cultural milestones that shaped the Malayalam literary landscape.
        </p>
      </div>
    </section>
  );
}
