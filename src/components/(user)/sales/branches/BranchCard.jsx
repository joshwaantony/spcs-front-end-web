// export default function BranchCard({ name, address, phone }) {
//   return (
//     <div className="bg-white  rounded-xl p-6 border shadow-sm hover:shadow-xl transition-all">
//       <h3 className="text-xl text-black hover:text-[#17B0CF] font-extrabold mb-4">{name}</h3>
//       <p className="text-[#6B7280] text-sm mb-6">{address}</p>
//       <a href={`tel:${phone}`} className="font-semibold text-black hover:underline block mb-6">
//         {phone}
//       </a>
//       <button className="w-full py-3 rounded-[20px] border-2 border-[#DAF0F5] text-[#17B0CF] font-bold hover:bg-[#17B0CF] hover:text-white">
//         View on Map
//       </button>
//     </div>
//   );
// }


import {
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function BranchCard({ name, address, phone }) {
  return (
    <div className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all">

      {/* Location Icon */}
      <div className="absolute top-6 right-6">
        <div className="w-10 h-10 rounded-full bg-[#EAF8FB] flex items-center justify-center">
          <MapPinIcon className="w-5 h-5 text-[#17B0CF]" />
        </div>
      </div>

      {/* Branch Name */}
      <h3 className="text-xl font-extrabold text-black mb-4 hover:text-[#17B0CF] transition">
        {name}
      </h3>

      {/* Address */}
      <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
        {address}
      </p>

      {/* Phone */}
      <div className="flex items-center gap-2 text-black font-semibold mb-6">
        <PhoneIcon className="w-4 h-4 text-[#17B0CF]" />
        <a href={`tel:${phone}`} className="hover:underline">
          {phone}
        </a>
      </div>

      {/* Button */}
      <button
        className="w-full py-3 rounded-full border-2 border-[#DAF0F5]
                   text-[#17B0CF] font-bold
                   hover:bg-[#17B0CF] hover:text-white
                   transition"
      >
        View on Map
      </button>
    </div>
  );
}
