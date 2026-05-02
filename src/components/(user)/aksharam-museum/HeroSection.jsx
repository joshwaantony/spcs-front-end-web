export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-green-400/20 rounded-full blur-[80px]" />
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-green-300/20 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-6">
              <span className="size-2 rounded-full bg-green-500 animate-pulse" />
              Now Open for Visits
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              Aksharam: Museum of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                Letters, Literature
              </span>{" "}
              & Culture
            </h1>

            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-gray-600 text-lg">
              A ₹XX Crore project by SPCS & Govt. of Kerala. Preserving the legacy
              of words for the future generations through immersive storytelling
              and architecture.
            </p>

            {/* CTA */}
            <div className="mt-8 flex gap-4 justify-center lg:justify-start flex-wrap">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-black font-bold shadow-lg hover:-translate-y-1 transition">
                <span className="material-symbols-outlined">play_circle</span>
                Watch the Walkthrough
              </button>

              <button className="px-6 py-3 rounded-xl bg-white border font-semibold hover:bg-gray-50">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfcuKZMH5VnuokEoKfsEope5FwYFrg_nc1mgaunox8eiSnrkEQpO_rRxB8N3f6uqTbwNU8d0f6vhnMW5dyr_DaiKfO3kLdYz20mHeCkyM6sVTo40yVxKij8R1kQ6DbAXDwPTR7jD5wk0QG82nrD8QKjpyigTvymEI_jcVfaz5lHJmNw1lF_CEGQbZWws7LpEDEPPifbvK6KfmlW8mVMM8REkt-VodrYnBzILJ4H40rAtvnZmTWZP9YmoqiiC90bB0xwvE_dTEvGFs"
              alt="Aksharam Museum"
              className="w-[320px] md:w-[420px] rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition duration-700"
            />

            {/* Floating Project Value */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 animate-bounce">
              <span className="material-symbols-outlined text-green-500">
                architecture
              </span>
              <div className="text-xs">
                <p className="text-gray-500">Project Value</p>
                <p className="font-bold">₹XX Crores</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
