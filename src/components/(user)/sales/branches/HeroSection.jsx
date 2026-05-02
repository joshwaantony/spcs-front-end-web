export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 map-pattern" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#F1F5F6] organic-shape blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#F1F5F6] organic-shape blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl text-black md:text-5xl font-extrabold mb-4">
          Visit National Book Stall (NBS)
        </h1>
        <p className="text-lg text-[#4C5563]  mb-10">
          Our network of branches across Kerala. Bringing literature closer to
          you.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="bg-[#FFFFFF]  p-2 rounded-xl shadow-xl flex items-center border border-[#F3F4F6] ">
            <div className="flex-1 flex items-center px-4">
              <span className="material-symbols-outlined text-[#17B0CF] mr-3">
                location_on
              </span>
              <input
                className="w-full bg-transparent focus:ring-0 placeholder:text-[#9CA3AF]"
                placeholder="Search by District or City (e.g., Ernakulam)..."
              />
            </div>
            <button className="bg-[#17B0CF] text-white h-12 px-8 rounded-[20px] font-bold">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
