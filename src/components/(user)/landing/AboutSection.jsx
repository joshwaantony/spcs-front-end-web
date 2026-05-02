import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">About SPCS</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Sahithya Pravarthaka Co-operative Society (SPCS) is the world's first writer-owned cooperative, established in 1945 to protect the interests of writers. We are dedicated to fostering Malayalam literature and ensuring fair returns to the creators of our cultural heritage.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold hover:border-primary hover:text-primary transition-all shadow-sm">
            Read Our History <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;