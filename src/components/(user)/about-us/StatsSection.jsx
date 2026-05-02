import React from 'react';

const StatsSection = () => {
  return (
    <section className="w-full max-w-7xl px-6 lg:px-20 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="flex flex-col gap-3 rounded-2xl p-6 bg-white shadow-card hover:shadow-float transition-all duration-300 border border-slate-100">
          <div className="flex items-center justify-between">
            <p className="text-[#616f89] text-xs font-bold uppercase tracking-wider">Established</p>
            <span className="material-symbols-outlined text-[#135bec]/40">calendar_month</span>
          </div>
          {/* Fixed Font Weight */}
          <p className="text-[#111318] text-4xl font-black leading-tight">1945</p>
        </div>
        
        {/* Card 2 */}
        <div className="flex flex-col gap-3 rounded-2xl p-6 bg-white shadow-card hover:shadow-float transition-all duration-300 border border-slate-100">
          <div className="flex items-center justify-between">
            <p className="text-[#616f89] text-xs font-bold uppercase tracking-wider">Titles Published</p>
            <span className="material-symbols-outlined text-[#135bec]/40">menu_book</span>
          </div>
          <p className="text-[#111318] text-4xl font-black leading-tight">8,400+</p>
        </div>
        
        {/* Card 3 */}
        <div className="flex flex-col gap-3 rounded-2xl p-6 bg-white shadow-card hover:shadow-float transition-all duration-300 border border-slate-100">
          <div className="flex items-center justify-between">
            <p className="text-[#616f89] text-xs font-bold uppercase tracking-wider">Member Writers</p>
            <span className="material-symbols-outlined text-[#135bec]/40">groups</span>
          </div>
          <p className="text-[#111318] text-4xl font-black leading-tight">80%</p>
          <p className="text-xs text-green-600 font-bold">Of all Malayalam writers</p>
        </div>
        
        {/* Card 4 */}
        <div className="flex flex-col gap-3 rounded-2xl p-6 bg-white shadow-card hover:shadow-float transition-all duration-300 border border-slate-100">
          <div className="flex items-center justify-between">
            <p className="text-[#616f89] text-xs font-bold uppercase tracking-wider">Initial Capital</p>
            <span className="material-symbols-outlined text-[#135bec]/40">payments</span>
          </div>
          <p className="text-[#111318] text-4xl font-black leading-tight">₹120</p>
          <p className="text-xs text-[#616f89] font-medium">From 12 founding members</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;