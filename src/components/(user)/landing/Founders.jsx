import React from 'react';

const founders = [
  { name: "Thakazhi", sub: "Sivasankara Pillai", img: "/hero/readers/1.png" },
  { name: "Basheer", sub: "Vaikom Muhammad", img: "/hero/readers/2.png" },
  { name: "M.T.", sub: "Vasudevan Nair", img: "/hero/readers/3.png" },
  { name: "Sugathakumari", sub: "Poet & Activist", img: "/hero/readers/1.png" },
];

const Founders = () => {
  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-slate-50"></div>
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px] text-center relative z-10">
        <h2 className="text-3xl font-black text-slate-900 mb-3">Founded by Legends</h2>
        <p className="text-slate-500 mb-12 max-w-2xl mx-auto text-lg">The visionaries who built the foundation of modern Malayalam literature.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {founders.map((person, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-soft group-hover:scale-105 transition-transform duration-300 group-hover:border-primary/20 group-hover:shadow-float">
                <img src={`${person.img}`} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{person.name}</h3>
              <p className="text-sm text-slate-500 font-medium">{person.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;