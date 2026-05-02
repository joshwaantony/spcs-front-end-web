import React from 'react';

const EventBanner = () => {
  return (
    <section className="py-16 bg-background-light">
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
        <div className="relative w-full rounded-[16px] overflow-hidden shadow-float group">
          <div className="relative h-[400px] md:h-[500px] w-full bg-slate-900">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCktdpmyBGfgMsHnes9D11NUNPu9dwJ2KRmi17y4_3cfpCU7B-WPQwxzIDkLJ7xHmrbYiD8to-InSkNAVCTZ8TI1sEgg6TjXYLfsEErOKKwpy41aXf8P6exQzvWMkv8KhBYAK3cZk4OZ5M5LwZNqdUqZXXPAK8E6REqW1MJP3wF0Jg6iOkiwMdDMnoS2lSw4n6ewkGVCBVNuPHl8WqLGZqBmStvLMOh8Bk_u8jBPhpBQ8DA9Z7KJp_kyff8BW8_wsZBaCslpAI1D_U" alt="Book Fair Banner" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
              <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full w-fit mb-4">Upcoming Event</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Annual Kottayam Book Fair</h2>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl">Visit the NBS Pavilion for exclusive launches, author meetups, and flat 50% off on classics. Starting Jan 15th.</p>
              <button className="inline-flex items-center px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors w-fit">
                Explore Event Details <span className="material-symbols-outlined ml-2">arrow_forward</span>
              </button>
            </div>
          </div>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <button className="w-8 h-1 bg-white rounded-full transition-all"></button>
            <button className="w-2 h-1 bg-white/50 rounded-full hover:bg-white transition-all"></button>
            <button className="w-2 h-1 bg-white/50 rounded-full hover:bg-white transition-all"></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBanner;