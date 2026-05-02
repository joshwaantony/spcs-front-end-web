import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 lg:py-24">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#1193d4]/10 rounded-full blob-shape mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-200/20 rounded-full blob-shape mix-blend-multiply filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <span className="inline-block text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
              Est. 1945
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              The Home of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1193d4] to-sky-600">
                Malayalam
              </span> <br />
              Literature
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Founded by 12 visionary writers. We are the world’s first
              writer-owned cooperative, securing the future of over 8,400 titles
              and 80% of Malayalam's literary heritage.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-lg text-white bg-[#1193d4] hover:bg-[#0d7ab3] transition-all shadow-lg shadow-blue-400/30 transform hover:-translate-y-0.5">
                Browse Bookstore
              </button>
              <button className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-200 text-base font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-all hover:border-slate-300 transform hover:-translate-y-0.5">
                View NBS Bulletin
              </button>
            </div>
            
            <div className="pt-8 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-3">
                <img
                  alt="Reader avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="/hero/readers/1.png"
                />
                <img
                  alt="Reader avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="/hero/readers/2.png"
                />
                <img
                  alt="Reader avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="/hero/readers/3.png"
                />
              </div>
              <p>
                Trusted by <span className="font-bold text-slate-800">50k+</span> Readers
              </p>
            </div>
          </div>

          {/* Right Content (Images) */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1193d4]/5 to-transparent rounded-full blur-2xl"></div>
              
              {/* Floating Book 1 (Left - Forest) */}
              <div className="absolute top-10 left-10 w-48 h-72 rounded-r-md shadow-2xl transform -rotate-6 z-20 bg-white overflow-hidden transition-transform hover:-translate-y-2 duration-500">
                <div className="h-full w-full bg-slate-200 flex items-center justify-center overflow-hidden">
                  <img
                    alt="Classic Malayalam Book Cover"
                    className="object-cover h-full w-full"
                    src="/hero/left.png"
                  />
                  {/* Overlay for darker forest look */}
                  <div className="absolute inset-0 bg-green-900/20 mix-blend-multiply"></div>
                </div>
              </div>

              {/* Floating Book 2 (Right - Teal) */}
              <div className="absolute top-20 right-10 w-44 h-64 rounded-r-md shadow-xl transform rotate-12 z-10 bg-white overflow-hidden transition-transform hover:-translate-y-2 duration-500">
                <div className="h-full w-full bg-slate-300 flex items-center justify-center overflow-hidden">
                  <img
                    alt="Modern Malayalam Novel Cover"
                    className="object-cover h-full w-full"
                    src="/hero/right.png"
                  />
                </div>
              </div>

              {/* Floating Book 3 (Center - Portrait/Bestseller) */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-52 h-80 rounded-r-md shadow-2xl transform -rotate-2 z-30 bg-white overflow-hidden transition-transform hover:-translate-y-2 duration-500 border-l-4 border-slate-900">
                <div className="h-full w-full bg-slate-100 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                  <img
                    alt="Featured Bestseller"
                    className="object-cover h-full w-full"
                    src="/hero/center.png"
                  />
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                      Bestseller
                    </p>
                    <p className="font-serif text-xl italic">Aadujeevitham</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;