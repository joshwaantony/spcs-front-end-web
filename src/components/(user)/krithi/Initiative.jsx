// export default function Initiative() {
//   return (
//     <section className="py-24 bg-blue-50/50">
//       <div className="max-w-6xl mx-auto px-6">
//         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

//           {/* Image Side */}
//           <div className="w-full lg:w-1/2">
//             <div className="relative rounded-[2rem] overflow-hidden shadow-float">

//               <img
//                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcrnPGb0T4SOuRub1Gj-ULL4-cRW43isER6C6u3--UGhpd-tOPsqooMcMo1wO5qQzUysl_uMAob18UgpMkmro0FexMRWv-VYVBsq7pYQYkXKDFQDvMYdP1mU2nm4a1YhVSQIOKHNHIzMFDiX8en1KFV9zi2M6MaK7D7TXoMc-cp2LCh7B_ybnYs11UuBIK-vYoiyvFVAIFo4Vg0R0LJu0TJpRHNzNvoPiNNgTEtO_kUde4KGbxNMaGW2mIlS88L-51Ejm5iZ4lDDk"
//                 alt="Young child reading a colorful storybook"
//                 className="w-full h-auto object-cover aspect-[4/3]"
//               />

//               {/* Decorative blobs */}
//               <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
//               <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70" />

//             </div>
//           </div>

//           {/* Text Side */}
//           <div className="w-full lg:w-1/2 flex flex-col gap-6">

//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 text-primary text-xs font-bold w-fit shadow-sm">
//               <span className="material-symbols-outlined text-sm">
//                 volunteer_activism
//               </span>
//               Core Initiative
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl md:text-4xl font-bold text-[#111318] leading-tight">
//               Project: One Child,
//               <br className="hidden lg:block" /> One Book
//             </h2>

//             {/* Description */}
//             <p className="text-lg text-[#616f89] leading-relaxed">
//               A landmark initiative aimed at cultivating the reading habit in the
//               younger generation. Providing every child with their own book to
//               spark a lifelong journey of knowledge.
//             </p>

//             {/* Stats */}
//             <div className="flex items-center gap-4 mt-2">
//               <div className="flex flex-col">
//                 <span className="text-3xl font-black text-primary">50k+</span>
//                 <span className="text-sm font-medium text-gray-500">
//                   Books Distributed
//                 </span>
//               </div>

//               <div className="w-px h-10 bg-gray-200" />

//               <div className="flex flex-col">
//                 <span className="text-3xl font-black text-primary">120+</span>
//                 <span className="text-sm font-medium text-gray-500">
//                   Schools Reached
//                 </span>
//               </div>
//             </div>

//             {/* CTA */}
//             <button className="mt-4 flex items-center justify-center w-fit h-12 px-6 bg-[#111318] hover:bg-gray-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-xl">
//               Learn More About The Project
//             </button>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


export default function Initiative() {
  return (
    <section className="py-24 bg-blue-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-[2rem] overflow-hidden shadow-float">

              {/* Image (NO background change) */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcrnPGb0T4SOuRub1Gj-ULL4-cRW43isER6C6u3--UGhpd-tOPsqooMcMo1wO5qQzUysl_uMAob18UgpMkmro0FexMRWv-VYVBsq7pYQYkXKDFQDvMYdP1mU2nm4a1YhVSQIOKHNHIzMFDiX8en1KFV9zi2M6MaK7D7TXoMc-cp2LCh7B_ybnYs11UuBIK-vYoiyvFVAIFo4Vg0R0LJu0TJpRHNzNvoPiNNgTEtO_kUde4KGbxNMaGW2mIlS88L-51Ejm5iZ4lDDk"
                alt="Young child reading a colorful storybook with wonder"
                className="w-full h-auto object-cover aspect-[4/3]"
              />

              {/* Decorative blur blobs (EXACT from HTML) */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70" />
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">

            {/* Badge (icon + color EXACT) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 text-primary text-xs text-[#135bec] font-bold w-fit shadow-sm">
              <span className="material-symbols-outlined text-sm text-primary text-[#135bec]">
                volunteer_activism
              </span>
              Core Initiative
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#111318] leading-tight">
              Project: One Child,
              <br className="hidden lg:block" /> One Book
            </h2>

            {/* Description */}
            <p className="text-lg text-[#616f89] leading-relaxed">
              A landmark initiative aimed at cultivating the reading habit in the
              younger generation. Providing every child with their own book to
              spark a lifelong journey of knowledge.
            </p>

            {/* Stats (COLOR FIXED) */}
            <div className="flex items-center gap-4 mt-2">

              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary text-[#135bec]">
                  50k+
                </span>
                <span className="text-sm font-medium text-gray-500">
                  Books Distributed
                </span>
              </div>

              <div className="w-px h-10 bg-gray-200" />

              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary text-[#135bec]">
                  120+
                </span>
                <span className="text-sm font-medium text-gray-500">
                  Schools Reached
                </span>
              </div>

            </div>

            {/* CTA */}
            <button className="mt-4 flex items-center justify-center w-fit h-12 px-6 bg-[#111318] hover:bg-gray-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-xl">
              Learn More About The Project
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
