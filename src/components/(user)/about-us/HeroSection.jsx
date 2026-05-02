// import React from 'react';

// const HeroSection = () => {
//   return (
//     <section className="w-full max-w-7xl px-6 lg:px-20 py-12 lg:py-20">
//       <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//         {/* Left Text Content */}
//         <div className="flex flex-col gap-6 text-left order-2 lg:order-1">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 w-fit">
//             <span className="material-symbols-outlined text-[#135bec] text-sm">history_edu</span>
//             <span className="text-xs font-bold text-[#135bec] tracking-wide uppercase">Since 1945</span>
//           </div>
          
//           {/* Fixed Typography and Colors */}
//           <h1 className="text-[#111318] text-4xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
//             The World's First <br />
//             <span className="text-[#135bec]">Writer-Owned</span> <br />
//             Cooperative
//           </h1>
          
//           <p className="text-[#616f89] text-lg lg:text-xl font-normal leading-relaxed max-w-xl">
//             A revolutionary movement established in 1945 that turned writers into owners, securing the economic and creative future of Malayalam literature.
//           </p>
          
//           <div className="flex flex-wrap gap-4 pt-4">
//             {/* Fixed CTA Button Color */}
//             <button className="flex items-center justify-center rounded-full h-12 px-8 bg-[#135bec] text-white text-base font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all hover:-translate-y-0.5">
//               Read Our Story
//             </button>
//             <button className="flex items-center justify-center rounded-full h-12 px-8 bg-white border border-[#dbdfe6] text-[#111318] text-base font-bold hover:bg-gray-50 transition-all">
//               View Gallery
//             </button>
//           </div>
//         </div>

//         {/* Right Image Section */}
//         <div className="relative order-1 lg:order-2 flex justify-center items-center">
//           {/* Abstract Blob - Fixed Color and Position */}
//           <div className="absolute inset-0 bg-[#e0f2fa] blob-shape rotate-6 scale-110 z-0"></div>
          
//           {/* Main Image */}
//           <div className="relative z-10 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-all duration-500 group border-4 border-white">
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#135bec]/10 to-transparent mix-blend-overlay z-10"></div>
//             {/* Using div for background image to match your request strictly */}
//             <div 
//               className="w-full h-full bg-center bg-cover sepia-[.15] group-hover:sepia-0 transition-all duration-700 scale-105 group-hover:scale-100" 
//               style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/9/97/Thakazhi_Sivasankara_Pillai.jpg")' }} 
//               /* NOTE: Replaced placeholder with a real looking placeholder or keep your original URL */
//             >
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


"use client";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full max-w-7xl px-6 lg:px-20 py-12 lg:py-20 mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 w-fit">
            <span className="material-symbols-outlined text-[#135bec] text-sm">
              history_edu
            </span>
            <span className="text-xs font-bold text-[#135bec] tracking-wide uppercase">
              Since 1945
            </span>
          </div>

          <h1 className="text-[#111318] text-4xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
            The World's First <br />
            <span className="text-[#135bec]">Writer-Owned</span> <br />
            Cooperative
          </h1>

          <p className="text-[#616f89] text-lg lg:text-xl leading-relaxed max-w-xl">
            A revolutionary movement established in 1945 that turned writers into owners,
            securing the economic and creative future of Malayalam literature.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="h-12 px-8 rounded-full bg-[#135bec] text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all hover:-translate-y-0.5">
              Read Our Story
            </button>
            <button className="h-12 px-8 rounded-full bg-white border border-[#dbdfe6] text-[#111318] font-bold hover:bg-gray-50 transition">
              View Gallery
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative order-1 lg:order-2 flex justify-center items-center">

          {/* Blob */}
          <div className="absolute inset-0 bg-blue-100/60 blob-shape rotate-6 scale-110 z-0"></div>

          {/* Image Wrapper */}
          <div className="relative z-10 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-all duration-500 group border-4 border-white">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#135bec]/20 to-transparent mix-blend-overlay z-10"></div>

            {/* HERO IMAGE */}
            <div
              className="w-full h-full bg-center bg-cover sepia-[.3] group-hover:sepia-0 transition-all duration-700 scale-105 group-hover:scale-100"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUfi0bmviBE8k36s86OGmDKqwzoMztrvvIb5-vTElVLvSEOMTQuC6YjGpbak8f7LniPJj4439JALzB2JfXzlmGt7c9plrhSQFdQqmqGn1hcZwlS6aK6AiXT7nwXNZYbBIqHzYMkJyLFDPn9FZdUEV9_OPhv7X5BUdavtGCQ841G54UM1BO8yrKekXgjDZKvQMBn3r0zdE9GPlh4OMhdJj-jbiOos9Mgoheqhgw9pyuYm7ULEGmDRy25X4IvsjHgaVO7LcEhb2tqJg")',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
