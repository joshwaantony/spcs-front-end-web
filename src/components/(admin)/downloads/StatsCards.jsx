



// export default function StatsCards() {
//   return (
//     <div className="w-full max-w-[1024px] grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      
//       {/* Storage Used */}
//       <div className="bg-white  p-6 rounded-3xl border border-gray-100  flex items-center gap-4">
//         <div className="size-12 bg-[#EFFCD8] rounded-2xl flex items-center justify-center text-charcoal">
//           <span className="material-symbols-outlined">cloud_done</span>
//         </div>
//         <div>
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//             Storage Used
//           </p>
//           <p className="text-xl font-black text-black ">
//             1.2 GB / 10 GB
//           </p>
//         </div>
//       </div>

//       {/* Total Downloads */}
//       <div className="bg-white  p-6 rounded-3xl border border-gray-100  flex items-center gap-4">
//         <div className="size-12 bg-[#EFFCD8] rounded-2xl flex items-center justify-center text-charcoal">
//           <span className="material-symbols-outlined">download</span>
//         </div>
//         <div>
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//             Total Downloads
//           </p>
//           <p className="text-xl font-black text-black">
//             12,482
//           </p>
//         </div>
//       </div>

//       {/* Secure Access */}
//       <div className="bg-white p-6 rounded-3xl border border-gray-100  flex items-center gap-4">
//         <div className="size-12 bg-[#EFFCD8] rounded-2xl flex items-center justify-center text-charcoal">
//           <span className="material-symbols-outlined">security</span>
//         </div>
//         <div>
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//             Secure Access
//           </p>
//           <p className="text-xl font-black text-black">
//             SSL Encrypted
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// }



export default function StatsCards() {
  return (
    <div className="
      w-full 
      max-w-[1024px] 
      mx-auto
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      gap-4 sm:gap-6 
      mt-6 sm:mt-8
    ">
      
      {/* Storage Used */}
      <div className="
        bg-white 
        p-4 sm:p-6 
        rounded-2xl sm:rounded-3xl 
        border border-gray-100 
        flex items-center 
        gap-4
      ">
        <div className="
          size-10 sm:size-12 
          bg-[#EFFCD8] 
          rounded-xl sm:rounded-2xl 
          flex items-center justify-center
        ">
          <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
            cloud_done
          </span>
        </div>

        <div className="min-w-0">
          <p className="
            text-[10px] sm:text-xs 
            font-bold 
            text-gray-400 
            uppercase 
            tracking-widest
          ">
            Storage Used
          </p>
          <p className="
            text-base sm:text-xl 
            font-black 
            text-black 
            truncate
          ">
            1.2 GB / 10 GB
          </p>
        </div>
      </div>

      {/* Total Downloads */}
      <div className="
        bg-white 
        p-4 sm:p-6 
        rounded-2xl sm:rounded-3xl 
        border border-gray-100 
        flex items-center 
        gap-4
      ">
        <div className="
          size-10 sm:size-12 
          bg-[#EFFCD8] 
          rounded-xl sm:rounded-2xl 
          flex items-center justify-center
        ">
          <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
            download
          </span>
        </div>

        <div className="min-w-0">
          <p className="
            text-[10px] sm:text-xs 
            font-bold 
            text-gray-400 
            uppercase 
            tracking-widest
          ">
            Total Downloads
          </p>
          <p className="
            text-base sm:text-xl 
            font-black 
            text-black
          ">
            12,482
          </p>
        </div>
      </div>

      {/* Secure Access */}
      <div className="
        bg-white 
        p-4 sm:p-6 
        rounded-2xl sm:rounded-3xl 
        border border-gray-100 
        flex items-center 
        gap-4
      ">
        <div className="
          size-10 sm:size-12 
          bg-[#EFFCD8] 
          rounded-xl sm:rounded-2xl 
          flex items-center justify-center
        ">
          <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
            security
          </span>
        </div>

        <div className="min-w-0">
          <p className="
            text-[10px] sm:text-xs 
            font-bold 
            text-gray-400 
            uppercase 
            tracking-widest
          ">
            Secure Access
          </p>
          <p className="
            text-base sm:text-xl 
            font-black 
            text-black
          ">
            SSL Encrypted
          </p>
        </div>
      </div>

    </div>
  );
}
