import React from 'react';

const EcosystemSection = () => {
  return (
    <section className="w-full max-w-7xl px-6 lg:px-20 pb-16">
      <div className="bg-[#135bec]/5 rounded-3xl p-8 lg:p-16 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 flex flex-col gap-6">
          <div className="inline-block p-3 bg-white rounded-xl w-fit shadow-sm">
            <span className="material-symbols-outlined text-primary text-[#145BEC] text-3xl">hub</span>
          </div>
          <h2 className="text-[#111318] text-3xl font-bold">The Ecosystem: SPCS & NBS</h2>
          <p className="text-[#616f89] text-lg leading-relaxed">
            A unique symbiotic relationship drives our success. While SPCS focuses on the creative and production aspects, ensuring quality literature, NBS (National Book Stall) serves as the powerful sales wing.
          </p>
          <p className="text-[#616f89] text-lg leading-relaxed">
            Organized to ensure efficient sales promotion, NBS has become a legendary brand in Kerala, bringing books to every corner of the state.
          </p>
        </div>
        <div className="flex-1 w-full relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-white/50 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-4xl text-orange-500">edit_note</span>
              <h3 class="font-bold text-lg">SPCS</h3>
              <p className="text-sm text-slate-500">Publishing & Welfare</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-white/50 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform mt-8">
              <span className="material-symbols-outlined text-4xl text-green-600">storefront</span>
              <h3 class="font-bold text-lg">NBS</h3>
              <p className="text-sm text-slate-500">Distribution & Sales</p>
            </div>
          </div>
          {/* Connector arrow visualization could go here */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#145BEC] text-white rounded-full p-2 shadow-lg z-10 hidden md:block">
            <span className="material-symbols-outlined">sync_alt</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;