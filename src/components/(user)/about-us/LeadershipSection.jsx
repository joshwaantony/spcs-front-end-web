import React from 'react';

const LeadershipSection = () => {
  return (
    <section className="w-full max-w-3xl px-6 lg:px-20 pb-24">
      <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-float border border-slate-100 relative text-center">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#145BEC] text-white p-3 rounded-xl shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined text-3xl">format_quote</span>
        </div>
        <blockquote className="text-xl lg:text-2xl font-medium text-[#111318] leading-relaxed pt-6 italic">
          "Our mission remains unchanged since 1945: Protecting the rights and promoting the interests of Malayalam writers while ensuring affordable literature for readers."
        </blockquote>
        <div className="mt-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-slate-200 mb-3 overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center" 
              data-alt="Portrait of Adv. P K Harikumar" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuABwV3LkPQ_u24igg-3s9Jzko_6eLZlF7HByTz7Xy5vldw3C5OW_QIRz1Eq2XceH2ZbbAZVKsZxlCmqX_69a7ARajHiI7_q7A4H3ScodKwjDvKzRlj4WtPF_jVKJcsb7D5aNnwcx07emIb9EL7UNPlR7-FkhZ7vUcfwahc2iFd1UauqqLGh6kw_B81y3wvE_69DpcziZNYlJBd3RdhXaYvSmK5s4sWCzDyoyhO2jgYN2x8axnlEZLCbp2p8Fu3XcAZp0iH7TyMWTFY")' }}
            ></div>
          </div>
          <cite className="not-italic">
            <div className="font-bold text-[#111318] text-lg">Adv. P K Harikumar</div>
            <div className="text-[#616f89] text-sm font-medium">President, SPCS</div>
          </cite>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;