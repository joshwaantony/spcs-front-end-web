import React from 'react';

const MediaSection = () => {
  return (
    <section className="py-20 bg-background-off">
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Watch Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">play_circle</span>
              Watch: Highlights
            </h3>
            <div className="aspect-video w-full bg-slate-900 rounded-xl overflow-hidden relative group cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-12 sm:size-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:scale-110">
                  <span className="material-symbols-outlined text-white text-5xl">play_arrow</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-white font-bold text-[14px] sm:text-lg">Highlights from the Literature Festival</h4>
                <p className="text-slate-300 text-sm mt-1">Keynote speech by M.T. Vasudevan Nair</p>
              </div>
            </div>
          </div>

          {/* Listen Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-500">headphones</span>
              Listen: Author Interview
            </h3>
            <div className="bg-white rounded-xl p-6 shadow-float border border-slate-100 flex flex-col justify-between h-auto lg:h-[calc(100%-2.5rem)]">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB02nrMliVxJukCi-dPCZHcfolOZmoy-CYIlb8pBDHw9Y6sK6gIrvMw3tfhW50tTRDbD2sDUglo4g8uOwyWgiJDopzeD5jo4sHbgBCGetprEFVyauTXvkqPKdCgw1NQrbjxhTwF6v-f3ACOiyyzGQ3ZUnxTfr9_RlKde5EXBEe8AL6l5cM-J0Q24lQYBriThV5jtIzOERLWAE7qg7LLmydES_bCKc-FOUa_fTcOm-WMraYrqAMAA4UJ1PjaYeW6O9NFV3PgbzNfPM" alt="Audio Thumbnail" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Benyamin on 'Aadujeevitham'</h4>
                  <p className="text-slate-500 text-sm">Episode 42 • The Writers' Voice</p>
                </div>
              </div>
              <div className="mt-8">
                {/* Audio Visualization Bars */}
                <div className="flex items-center gap-1 h-12 mb-4 justify-center px-4">
                  <div className="w-1 bg-purple-400 h-4 rounded-full"></div>
                  <div className="w-1 bg-purple-400 h-8 rounded-full"></div>
                  <div className="w-1 bg-purple-400 h-6 rounded-full"></div>
                  <div className="w-1 bg-purple-400 h-10 rounded-full"></div>
                  <div className="w-1 bg-purple-400 h-5 rounded-full"></div>
                  <div className="w-1 bg-purple-400 h-8 rounded-full"></div>
                  <div className="w-1 bg-purple-400 h-3 rounded-full"></div>
                  <div className="w-1 bg-purple-400 h-9 rounded-full"></div>
                  <div className="w-1 bg-slate-200 h-4 rounded-full"></div>
                  <div className="w-1 bg-slate-200 h-2 rounded-full"></div>
                  <div className="w-1 bg-slate-200 h-5 rounded-full"></div>
                  <div className="w-1 bg-slate-200 h-3 rounded-full"></div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-colors">
                    <span className="material-symbols-outlined">play_arrow</span>
                  </button>
                  <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-slate-900"></div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">14:20 / 22:00</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MediaSection;