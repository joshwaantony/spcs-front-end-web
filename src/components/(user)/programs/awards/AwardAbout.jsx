// export default function AwardAbout() {
//   return (
//     <section className="py-24 bg-white">
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">

//         {/* LEFT CONTENT */}
//         <div className="space-y-8">
//           <div>
//             <span className="text-[#F1BF27] font-bold tracking-widest uppercase text-xs">
//               Our Commitment
//             </span>
//             <h2 className="text-4xl font-bold mt-2 text-black">
//               Honoring Literary Excellence
//             </h2>
//           </div>

//           <p className="text-[#475569] leading-relaxed text-lg">
//             The Akshara Puraskaram is more than just an award; it's a testament
//             to the enduring spirit of the Malayalam language. Since its
//             inception, we have sought to recognize authors who redefine the
//             boundaries of storytelling, poetry, and dramatic expression.
//           </p>

//           <div className="flex flex-col gap-6">
            
//             {/* ITEM 1 */}
//             <div className="flex gap-4 items-start">
//               <div className="size-10 rounded-[12px] bg-[#FEF8ED] flex items-center justify-center shrink-0">
//                 <span className="material-symbols-outlined text-[#F1BF27]">
//                   history_edu
//                 </span>
//               </div>
//               <div>
//                 <h4 className="font-bold text-slate-900">
//                   A Legacy of Quality
//                 </h4>
//                 <p className="text-sm text-slate-500">
//                   Founded by SPCS to promote authentic literary voices across Kerala.
//                 </p>
//               </div>
//             </div>

//             {/* ITEM 2 */}
//             <div className="flex gap-4 items-start">
//               <div className="size-10 rounded-[12px] bg-[#FEF8ED] flex items-center justify-center shrink-0">
//                 <span className="material-symbols-outlined text-[#F1BF27]">
//                   verified
//                 </span>
//               </div>
//               <div>
//                 <h4 className="font-bold text-slate-900">
//                   Transparent Selection
//                 </h4>
//                 <p className="text-sm text-slate-500">
//                   Judged by a panel of distinguished scholars and veteran critics.
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* RIGHT IMAGE CARD */}
//      {/* RIGHT IMAGE CARD */}
// <div className="relative group animate-float">

//   {/* ROTATED BACK LAYER */}
//   <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] 
//                   -rotate-2 group-hover:rotate-0 
//                   transition-transform duration-500" />

//   <div className="relative bg-white p-8 rounded-xl 
//                   shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]
//                   border-2 border-[#F8F7F5] 
//                   overflow-hidden
//                   transition-all duration-500
//                   group-hover:-translate-y-2
//                   group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">

//     <div className="aspect-[4/5] bg-[#F4F5F5] rounded-lg 
//                     overflow-hidden flex items-center justify-center 
//                     border-4 border-[#F1EAD5]">
//       <div
//         className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
//         style={{
//           backgroundImage:
//             "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBanjxczmxF0gR2ganWeMOQIG060av9fMMNd6N_TwqXYG-f4l7AfLWehK6kzXdJYIZmqJiMcjoWhBZsg0FwgF2TEJf_kg2I9gy4_hOfH3G0Ztts0atIVtUjvcQxw-rBPaWNJVeI3fAOK9c4TEulyH-5TNtFrF2olJ7C6VsGhbXJ1M4DrUBOsxAWuIXmYyoEMmZMuYZLwGSTviu_nqvq0Pz9xHj97rmAMS5zB-A5zW0gv-Okjl7zC7iDWOKVs7S249hqwgjeFUkzJTo')",
//         }}
//       />
//     </div>

//     <div className="mt-6 text-center">
//       <p className="text-slate-400 italic text-sm">
//         Official Citation of Excellence
//       </p>
//     </div>
//   </div>
// </div>


//       </div>
//     </section>
//   );
// }



export default function AwardAbout() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="
        max-w-7xl mx-auto 
        px-4 sm:px-6 lg:px-10 
        grid grid-cols-1 lg:grid-cols-2 
        gap-12 lg:gap-16 
        items-center
      ">

        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <div>
            <span className="text-[#F1BF27] font-bold tracking-widest uppercase text-xs sm:text-sm">
              Our Commitment
            </span>
            <h2 className="
              text-2xl sm:text-3xl lg:text-4xl 
              font-bold mt-2 text-black
            ">
              Honoring Literary Excellence
            </h2>
          </div>

          <p className="
            text-[#475569] 
            leading-relaxed 
            text-base sm:text-lg
          ">
            The Akshara Puraskaram is more than just an award; it's a testament
            to the enduring spirit of the Malayalam language. Since its
            inception, we have sought to recognize authors who redefine the
            boundaries of storytelling, poetry, and dramatic expression.
          </p>

          <div className="flex flex-col gap-6">

            {/* ITEM 1 */}
            <div className="flex gap-4 items-start">
              <div className="
                size-10 sm:size-12 
                rounded-xl 
                bg-[#FEF8ED] 
                flex items-center justify-center 
                shrink-0
              ">
                <span className="material-symbols-outlined text-[#F1BF27]">
                  history_edu
                </span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                  A Legacy of Quality
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Founded by SPCS to promote authentic literary voices across Kerala.
                </p>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex gap-4 items-start">
              <div className="
                size-10 sm:size-12 
                rounded-xl 
                bg-[#FEF8ED] 
                flex items-center justify-center 
                shrink-0
              ">
                <span className="material-symbols-outlined text-[#F1BF27]">
                  verified
                </span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                  Transparent Selection
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Judged by a panel of distinguished scholars and veteran critics.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE CARD */}
        <div className="
          relative group 
          max-w-sm sm:max-w-md 
          mx-auto lg:mx-0
        ">

          {/* BACK LAYER */}
          <div className="
            absolute -inset-4 
            bg-[#F1BF27]/10 
            rounded-[2rem] 
            rotate-0 lg:-rotate-2
            transition-transform duration-500
            group-hover:rotate-0
          " />

          <div className="
            relative bg-white 
            p-5 sm:p-6 lg:p-8 
            rounded-2xl 
            border-2 border-[#F8F7F5]
            shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]
            overflow-hidden
            transition-all duration-500
            group-hover:-translate-y-2
            group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]
          ">

            <div className="
              aspect-[4/5] 
              bg-[#F4F5F5] 
              rounded-lg 
              overflow-hidden 
              border-4 border-[#F1EAD5]
            ">
              <div
                className="
                  w-full h-full 
                  bg-cover bg-center 
                  transition-transform duration-700
                  group-hover:scale-[1.03]
                "
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBanjxczmxF0gR2ganWeMOQIG060av9fMMNd6N_TwqXYG-f4l7AfLWehK6kzXdJYIZmqJiMcjoWhBZsg0FwgF2TEJf_kg2I9gy4_hOfH3G0Ztts0atIVtUjvcQxw-rBPaWNJVeI3fAOK9c4TEulyH-5TNtFrF2olJ7C6VsGhbXJ1M4DrUBOsxAWuIXmYyoEMmZMuYZLwGSTviu_nqvq0Pz9xHj97rmAMS5zB-A5zW0gv-Okjl7zC7iDWOKVs7S249hqwgjeFUkzJTo')",
                }}
              />
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-slate-400 italic text-xs sm:text-sm">
                Official Citation of Excellence
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
