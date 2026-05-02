import React from 'react';

const BulletinSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl transform -rotate-3 scale-90 z-0"></div>
            <div className="relative z-10 w-64 md:w-80 rounded-xl overflow-hidden shadow-float transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-20 pointer-events-none"></div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSki_9ZAKms8DQ-fAFsja41mp5ahyfxoy_Wu78HzoxJua7VEDXLD6b-2Vy2itUCLfoq8z_rKtoOvAsdsTH0uVqN-eFz81tpAt7Nj-JxDXlw3yoJIh3F-m_LtU5_YzLLZfGP9IeXVXQiY9iRmcSyJoh_V8exfMKiXMlPhIFm4l-Ru2qXCHnyEgNx0dPxqqfImCCWiABTYa0OkErMX4-BsEPmCSTNN6j9sf7bur36eInINXY3P6QOk23TPsMkqDfINbWtC4vIE5Z4-4" alt="NBS Bulletin Cover" className="w-full h-auto object-cover aspect-[3/4]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white z-30">
                <p className="font-bold text-lg">January 2024</p>
                <p className="text-xs opacity-80">Special Issue</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-primary font-bold tracking-wider uppercase text-xs mb-3 block">Literary Digest</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">NBS Bulletin</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">The Monthly Literary Digest of Kerala. Detailed reviews, exclusive previews, and cultural essays that shape the malayalam literary landscape. Join thousands of readers who stay ahead of the curve.</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">Subscribe Now</button>
              <button className="px-8 py-3.5 border border-slate-200 text-slate-700 rounded-lg font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-2">
                Read Online <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulletinSection;