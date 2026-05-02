import React from 'react';

const FoundersSection = () => {
  const founders = [
    { name: "Thakazhi", role: "Novelist", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5cZMeTOchk4OiQ_wpythaYOAL9XP68gHPvSyMovcaFf2RrUyJBG_D2BjrLbwbYcta_d4I5_dizT7eNMT6danez41pjp5WHNF0C_SJnnZi6snic5tKQFo7FE6hKky5SWdg0cfMbcY52gDR97AG_XpPg2IQtPErElTSPJKa7n0It1cKGZEnpaqCqzVPUWQwelulkezyPF8Z2qADZ7OqLAepEn7Mdo6oURSvJ90Ww414RhoN8houmIk7MOO4_aVm3Gvb7SwGxpQ_yv0" },
    { name: "Basheer", role: "Writer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCepiJDs-56eni940ldNxt-JXNnXd5H7URZgqkyAjj6O0j8Cr-W13j1B_3Bqk6mZvv9etpjVrJAit3Sos_FUAcUTUG5ZFl55UM7qJ80E_9-B559zlt-8haD43VQRHTA2qMgvSEOe9T7TyBIXudfbaGm7ofsCOoZFL-W904O2oMqxI2DzAOP3hlOlyueZEvIQXSYGwaNDwQ825N-_mA9w3bOtO31J9hkWe9zQaibBaU1hLtUIK4j-w-YZDQkjPzlt9PmJI4Be23FCyM" },
    { name: "Kesavadev", role: "Social Reformer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFyR7M5M8blkCDumNuN0OQQO6_9f6MY8eXjWJd7ob3_amAy2IAD-OCpjafy4ncAcJegt77arDXRnnEJATPf1y4fLFQe8NPol972vnVjDdVT_JT0IqBUsEIuQ8jN5mTgkykEZGRbC-uMJ60dI4pNAlLbrB28IowUyYCQjBTDzpOMwz8rrYdh4oekr1xdANy8J6dbwq0LKWbEJJXdqnMIEATaHUUGo97Fh8zhEVmre2AvpAhhukUxqLRbv4woRoCas6DQK8kjx3Yc9A" },
    { name: "M. P. Paul", role: "Critic", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNy7hqDE4Nsyz-66etRJB2pBSY749gHKdEbrjtboZ1kbhdT_f25aEDYm35xmPV570xjABNMqqKxF1Bs2ExNjHxJxzxucs5O-FfNtIn6_xGhsKhLLrRw6qg6Bi0mgnea4ZbeAjub4ITsLHvp3Dru_tY7yrPg8sxsXPk7MVIAIqsE0_Eu9bDDzMWVL0E7ULvBOr3EaJbKdlzhfiB6tEiu9GodfKBHYSRfRhRc-wtAQhq2zeS-33IcjcnQWynWSWAh2LaBDpM6_pjxTQ" },
    { name: "Karoor", role: "Short Story", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZiPG9dF7-e8WpgfMEYnmM1GDZ_tTyaa3UIoCgssPeUV3Kc-rrKuompTpAknDKEg1x-D8rH3e5pGM0gWjpRXqt_HyW7As3TadBv5fcVzLSSxFQpmA7Yj3oJlWZC0Dq-LBzqNuilE_w9TcEHbDEkS0Tttpk1nXbx62VGf4mV_JtS3bV0YWXwM6oyNV9O3FXR8F4ImTyVPlWyAnq7_jHTvkf1_1RpUgoss4fEzwQiu0XuoqTJYn8fYnGvvJUfVDIjoDbQoddRPiESrM" },
    { name: "Varkey", role: "Activist", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDibHAXbTXTX84QNfCbzzT1HHJE8ffa24CcmouuJk3UokChxPpQlyCGkKTAYRy8DC-yhI25ZdU_BdJuyripNnSDMVqZScgWX_S8jnd3KmXxgm0Mqkdz4BebX0ct1xrGiNrxXTsr5Oe2Qnp_RUUn9lB2P6Udlf67Egr-MvOiqI_GUP39hdSh9GxfkhPW-7BhC0gbGOVfho4tc-7dli8g-5bWlIazoz93WnGVZqwhrQ7n668V04cJ5dqmVsnws7uGEVHikIrOrBaegxc" }
  ];

  return (
    <section className="w-full max-w-7xl px-6 lg:px-20 py-16 bg-white rounded-3xl mb-12 border border-[#f0f2f4]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#111318] text-3xl font-bold leading-tight">Founded by Legends</h2>
          <p className="text-[#616f89]">The visionaries who laid the foundation of Malayalam literature's independence.</p>
        </div>
        <button className="text-primary text-[#145BEC] font-bold text-sm  flex items-center gap-1">
          View All Founders <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {founders.map((founder, index) => (
          <div key={index} className="flex flex-col items-center gap-3 group cursor-pointer">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shadow-sm group-hover:shadow-md transition-all grayscale group-hover:grayscale-0">
              <div 
                className="w-full h-full bg-cover bg-center" 
                data-alt={`Portrait of ${founder.name}`} 
                style={{ backgroundImage: `url("${founder.img}")` }}
              ></div>
            </div>
            <div className="text-center">
              <p className="font-bold text-sm text-[#111318]">{founder.name}</p>
              <p className="text-xs text-[#616f89]">{founder.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoundersSection;