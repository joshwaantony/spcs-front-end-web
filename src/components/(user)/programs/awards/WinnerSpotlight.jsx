const WINNERS = [
  {
    year: "2019 Winner",
    title: "Thakshankunnu Swaroopam",
    author: "U. K. Kumaran",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7xeOPBejLh9O9EgxI6WAaii0TEjrf3KEx6_VJDOuD4bgXyLYKWYRiHGZNYJQELPvQeRboz4Az6yOgQ0jmYuyhe7jXe0f7F95UIClrTRBXHsxhjemVICaf8HOIYAv-ufzEHCfgi5lCMpccJ5Dle8Aau-M36vnWJ8vv6JvR9i35EE_myYmy4KLPLOOJlBnKTsDx8DRhMcPHwG4xJYn1HR2AMGPtzI2s7WO6oTX9cqb5hxp68sQoW6wO_MYbOUzA5D4dbCsuv7Wum9Y",
  },
  {
    year: "2020 Winner",
    title: "Smaraka Silakal",
    author: "Punathil Kunjabdulla",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAabpzXUZPFky6zN86fNpjm-z5Br52E12EDEbo7pnaPUJcSWjNmUGtjAg1J1ZN70HPja46E7VoEXNlLouMbNa7QZIkAfw5sve8jIQWmUf3Mp9DMbV8ZdJLy9GsOMqbyay0MsNvad2ywryAQNT5NnYVe7M3jsxTf6B3x-fuChGxo4q8waAa2l2wlfgjGoPpVauQZl31Oa-B4y5LFVhPOZre_zphgbKAw_xECmqhTqnGnMN2bidEKgA1UVDCziTFbPt9lHarqJAPurF8",
  },
  {
    year: "2021 Winner",
    title: "Aalahayude Penmakkal",
    author: "Sarah Joseph",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATQMgSZi-esfr8P6eDqbz3k85wSVPzjD7z4VNJ-x7Yexp5Jdu0HCLbKWrPqqBSSpSseMy9RXZ7HfM1xMbdlZt-_renZuDD3vDPafOnddcl1LGo1p9dAuPsaMGFcRgZrtsF5kb5kAabY6D0XRz7fDddJVUYOh5N3aNsDDQ_aWL1L-LwsRXXDYEQdTPaTBnPp_JfjiLMHHraw3b3oY2dR7ntHxsYHfcrezqHFJ4affh9wI2dwp3iRIJfLzS3rzRbPpWRsYbuoTkqkPI",
  },
  {
    year: "2022 Winner",
    title: "Vembanad",
    author: "S. Hareesh",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEOmgWOopk7uxhKpj5UmeuJGhTFAq5MksN2HCXGJEDDyeF9AYu8J7UD_gTSqi-SCppT7GyaQnzfO5LB6Lmoai5oYuhjkWTakmbsTBY7oYs001JDXXKnEro95YT0K_cHJ_0KpR4Fc2ta0aoVD500A20eM4fAr_fqfnr_IeDYFw1e7L9U9F3rbrcJikWJPiyU-RCISpWyeHQKZgNeRYDvfqBBqa9FE23CLH-YhXF4XwGFBTDMStHdwyKNxuai7qH4jPt6PU_3CSHVdQ",
  },
];

export default function WinnerSpotlight() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
              Winner Spotlight
            </h2>
            <p className="text-[#64748B] mt-2 text-sm sm:text-base">
              Discover the masterpieces that won our hearts.
            </p>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex gap-3">
            <button className="size-12 rounded-full border border-[#E2E8F0] flex items-center justify-center hover:bg-white transition shadow-sm">
              <span className="material-symbols-outlined text-black">
                chevron_left
              </span>
            </button>
            <button className="size-12 rounded-full border border-[#E2E8F0] flex items-center justify-center hover:bg-white transition shadow-sm">
              <span className="material-symbols-outlined text-black">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WINNERS.map((item, index) => (
            <div key={index} className="group cursor-pointer">

              <div className="relative aspect-[3/4] bg-white rounded-xl overflow-hidden mb-4 sm:mb-6 border border-primary/20 shadow-sm transition-all
                group-hover:shadow-2xl group-hover:shadow-primary/10
                group-hover:-translate-y-2 group-hover:border-primary">

                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#F1BF27] text-black px-3 py-1 rounded-full text-xs font-bold shadow">
                  {item.year}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4 sm:p-6">
                  <button className="w-full bg-white text-black py-3 rounded-lg font-bold text-sm">
                    View Details
                  </button>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-black group-hover:text-[#F1BF27] transition">
                {item.title}
              </h4>
              <p className="text-slate-500 text-sm">
                {item.author}
              </p>
            </div>
          ))}
        </div>

        {/* MOBILE BUTTONS */}
        <div className="flex md:hidden justify-center gap-4 mt-10">
          <button className="size-12 rounded-full border border-[#E2E8F0] flex items-center justify-center bg-white shadow-sm">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="size-12 rounded-full border border-[#E2E8F0] flex items-center justify-center bg-white shadow-sm">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

      </div>
    </section>
  );
}
