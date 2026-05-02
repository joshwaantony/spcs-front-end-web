export default function VisionSection() {
  return (
    <section className="w-full flex justify-center py-28 bg-white">
      <div className="max-w-4xl w-full px-6 text-center relative">

        {/* Section Label */}
        <span className="text-green-500 font-semibold tracking-widest text-lg uppercase mb-8 block">
          THE VISION
        </span>

        {/* Quote */}
        <h2 className="relative text-4xl md:text-5xl lg:text-[56px] font-extrabold text-black leading-tight mb-8">
          <span className="absolute -top-8 -left-8 text-7xl text-gray-200 font-serif select-none">
            “
          </span>

          To give distinct colors to letters and literature.

          <span className="absolute -bottom-10 -right-8 text-7xl text-gray-200 font-serif select-none">
            ”
          </span>
        </h2>

        {/* Underline */}
        <div className="w-20 h-[4px] bg-green-500 mx-auto mb-10 rounded-full" />

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Located at <span className="font-semibold text-black">Nattakam, Kottayam</span>. 
          This 20,000 sq. ft. cultural landmark is designed to be a global destination 
          for literature lovers. A space where the history of Malayalam language meets 
          the future of digital preservation.
        </p>

      </div>
    </section>
  );
}
