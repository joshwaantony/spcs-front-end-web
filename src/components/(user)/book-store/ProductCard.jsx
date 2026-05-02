



"use client";

import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useState } from "react";

export default function ProductCard({ title, author, price, image }) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        shadow-[0_10px_30px_rgba(0,0,0,0.06)]
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
        transition-all duration-300
        p-5
      "
    >
      {/* Image Wrapper */}
      <div
        className="
          relative
          bg-[#F6F7FB]
          rounded-xl
          h-[260px]
          flex items-center justify-center
          mb-5
          overflow-hidden
        "
      >
        {/* ❤️ Favourite (HOVER ONLY) */}
        <button
          onClick={() => setLiked(!liked)}
          className="
            absolute top-4 right-4 z-10
            h-9 w-9 rounded-full
            bg-white
            flex items-center justify-center
            shadow-md
            opacity-0 scale-90
            transition-all duration-300
            group-hover:opacity-100
            group-hover:scale-100
            hover:scale-110
            active:scale-95
          "
        >
          <FiHeart
            size={18}
            className={`transition-all duration-300 ${
              liked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-gray-400"
            }`}
          />
        </button>

        {/* Book Image */}
        <img
          src={image}
          alt={title}
          className="
            h-[200px]
            object-contain
            drop-shadow-md
            transition-all duration-300 ease-out
            group-hover:-translate-y-3
            group-hover:scale-105
            group-hover:drop-shadow-xl
          "
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[#0F172A] mb-1">
        {title}
      </h3>

      {/* Author */}
      <p className="text-sm text-[#64748B] mb-4">
        {author}
      </p>

      {/* Price + Cart */}
      <div className="flex items-center justify-between">
        <span className="text-[#126DEC] font-bold text-lg">
          {price}
        </span>

        <button
          className="
            h-10 w-10 rounded-full
            bg-[#126DEC] text-white
            flex items-center justify-center
            shadow-md
            transition
            hover:bg-[#0E5AD6]
            hover:scale-105
            active:scale-95
          "
        >
          <FiShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}



// "use client";

// import { FiShoppingCart, FiHeart } from "react-icons/fi";
// import { useState } from "react";

// export default function ProductCard({ title, author, price, image }) {
//   const [liked, setLiked] = useState(false);

//   return (
//     <div
//       className="
//         group
//         w-full
//         max-w-[260px]
//         bg-white
//         rounded-2xl
//         shadow-[0_10px_30px_rgba(0,0,0,0.06)]
//         hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
//         transition-all duration-300
//         p-5
//       "
//     >
//       {/* Image */}
//       <div className="relative bg-[#F6F7FB] rounded-xl h-[260px] flex items-center justify-center mb-5 overflow-hidden">
        
//         <button
//           onClick={() => setLiked(!liked)}
//           className="
//             absolute top-4 right-4
//             h-9 w-9 rounded-full
//             bg-white
//             flex items-center justify-center
//             shadow-md
//             opacity-0 scale-90
//             group-hover:opacity-100
//             group-hover:scale-100
//             transition
//           "
//         >
//           <FiHeart
//             size={18}
//             className={liked ? "text-red-500 fill-red-500" : "text-gray-400"}
//           />
//         </button>

//         <img
//           src={image}
//           alt={title}
//           className="
//             h-[200px]
//             object-contain
//             transition
//             group-hover:-translate-y-3
//             group-hover:scale-105
//           "
//         />
//       </div>

//       <h3 className="text-base font-semibold text-[#0F172A] mb-1">
//         {title}
//       </h3>

//       <p className="text-sm text-[#64748B] mb-4">
//         {author}
//       </p>

//       <div className="flex items-center justify-between">
//         <span className="text-[#126DEC] font-bold text-lg">
//           {price}
//         </span>

//         <button className="h-10 w-10 rounded-full bg-[#126DEC] text-white flex items-center justify-center hover:scale-105">
//           <FiShoppingCart size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }
