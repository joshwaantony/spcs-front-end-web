


// export default function EventCard({
//   month,
//   day,
//   title,
//   time,
//   tag,
//   icon,
//   image,
// }) {
//   return (
//     <div className="group bg-white  rounded-4xl overflow-hidden border border-gray-100  shadow-sm hover:shadow-xl transition-all duration-300">
      
//       {/* Image */}
//       <div className="relative h-56 overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//         />

//         {/* Date Badge */}
//         <div className="absolute top-4 left-4 w-14 rounded-2xl overflow-hidden shadow-md flex flex-col font-bold text-center">
//           <div className="bg-black text-white text-[10px] py-1 tracking-widest">
//             {month}
//           </div>
//           <div className="bg-white text-black text-xl py-1">
//             {day}
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="flex items-center gap-2 text-[#A6F20D] font-bold text-xs uppercase tracking-tighter mb-2">
//           <span className="material-symbols-outlined text-[#A6F20D] text-sm">
//             {icon}
//           </span>
//           {tag}
//         </div>

//         <h3 className="text-xl font-black text-black  mb-3 line-clamp-1">
//           {title}
//         </h3>

//         <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-6">
//           <span className="material-symbols-outlined text-lg">
//             schedule
//           </span>
//           {time}
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-3">
//           <button className="flex-1 py-2.5 px-4 rounded-full border-2 border-[#A6F20D] text-black  text-sm bg-white font-bold hover:bg-[#A6F20D] transition-colors flex items-center justify-center gap-2">
//             <span className="material-symbols-outlined text-sm">
//               edit
//             </span>
//             Edit
//           </button>

//           <button className="flex-1 py-2.5 px-4 rounded-full border border-gray-200  text-gray-400 dark:text-gray-500 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors flex items-center justify-center gap-2">
//             <span className="material-symbols-outlined text-sm">
//               delete
//             </span>
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



export default function EventCard({
  month,
  day,
  title,
  time,
  tag,
  icon,
  image,
}) {
  return (
    <div className="
      group 
      bg-white 
      rounded-3xl sm:rounded-4xl 
      overflow-hidden 
      border border-gray-100 
      shadow-sm 
      hover:shadow-xl 
      transition-all 
      duration-300
    ">
      {/* Image */}
      <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Date Badge */}
        <div className="
          absolute top-3 left-3 sm:top-4 sm:left-4 
          w-12 sm:w-14 
          rounded-xl sm:rounded-2xl 
          overflow-hidden 
          shadow-md 
          flex flex-col 
          font-bold 
          text-center
        ">
          <div className="bg-black text-white text-[9px] sm:text-[10px] py-1 tracking-widest">
            {month}
          </div>
          <div className="bg-white text-black text-lg sm:text-xl py-1">
            {day}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 text-[#A6F20D] font-bold text-[11px] sm:text-xs uppercase tracking-tighter mb-2">
          <span className="material-symbols-outlined text-[#A6F20D] text-sm">
            {icon}
          </span>
          {tag}
        </div>

        <h3 className="text-lg sm:text-xl font-black text-black mb-2 sm:mb-3 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
          <span className="material-symbols-outlined text-base sm:text-lg">
            schedule
          </span>
          {time}
        </div>

        {/* Actions */}
        <div className="
          flex 
          flex-col sm:flex-row 
          items-stretch 
          gap-2 sm:gap-3
        ">
          <button className="
            flex-1 
            py-2.5 
            px-4 
            rounded-full 
            border-2 
            border-[#A6F20D] 
            text-black 
            text-sm 
            bg-white 
            font-bold 
            hover:bg-[#A6F20D] 
            transition-colors 
            flex 
            items-center 
            justify-center 
            gap-2
          ">
            <span className="material-symbols-outlined text-sm">
              edit
            </span>
            Edit
          </button>

          <button className="
            flex-1 
            py-2.5 
            px-4 
            rounded-full 
            border 
            border-gray-200 
            text-gray-400 
            text-sm 
            font-bold 
            hover:bg-red-50 
            hover:text-red-500 
            transition-colors 
            flex 
            items-center 
            justify-center 
            gap-2
          ">
            <span className="material-symbols-outlined text-sm">
              delete
            </span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
