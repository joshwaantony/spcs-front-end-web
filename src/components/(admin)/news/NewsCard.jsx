



// export default function NewsCard({ image, date, title }) {
//   return (
//     <div className="bg-white  rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 ">
      
//       {/* Image */}
//       <div
//         className="h-48 bg-cover bg-center relative"
//         style={{ backgroundImage: `url('${image}')` }}
//       >
//         <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors"></div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//           {date}
//         </p>

//         <h3 className="text-xl font-black text-charcoal  mb-6 leading-tight line-clamp-2">
//           {title}
//         </h3>

//         {/* Buttons */}
//         <div className="flex gap-3">
//           <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border-2 border-[#A7F20D] text-charcoal dark:text-primary font-bold text-sm hover:bg-primary hover:text-charcoal transition-colors">
//             <span className="material-symbols-outlined text-[18px]">
//               edit
//             </span>
//             Edit
//           </button>

//           <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border-2 border-gray-100  text-gray-400 font-bold text-sm hover:border-red-400 hover:text-red-400 transition-colors">
//             <span className="material-symbols-outlined text-[18px]">
//               delete
//             </span>
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



export default function NewsCard({ image, date, title }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image */}
      <div
        className="
          relative 
          h-40 sm:h-44 md:h-48 lg:h-52 
          bg-cover bg-center
        "
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-colors"></div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          {date}
        </p>

        <h3
          className="
            text-base sm:text-lg md:text-xl 
            font-black text-charcoal 
            mb-4 sm:mb-6 
            leading-snug 
            line-clamp-2
          "
        >
          {title}
        </h3>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="
              flex items-center justify-center gap-2
              py-2.5 px-4
              rounded-full
              border-2 border-[#A7F20D]
              text-charcoal font-bold text-sm
              hover:bg-[#A7F20D]
              transition
            "
          >
            <span className="material-symbols-outlined text-[18px]">
              edit
            </span>
            Edit
          </button>

          <button
            className="
              flex items-center justify-center gap-2
              py-2.5 px-4
              rounded-full
              border-2 border-gray-200
              text-gray-400 font-bold text-sm
              hover:border-red-400 hover:text-red-400
              transition
            "
          >
            <span className="material-symbols-outlined text-[18px]">
              delete
            </span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
