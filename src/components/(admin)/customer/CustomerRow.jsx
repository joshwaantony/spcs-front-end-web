import { FiEdit2, FiMoreVertical } from "react-icons/fi";

export default function CustomerRow({
  userId,
  name,
  phone,
  address,
  city,
  district,
  state,
  pin,
  createdAt,
}) {
  const initials = String(name || "NA")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();

  const formattedDate = createdAt
    ? new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(createdAt))
    : "--";

  return (
    <div
      className="
        bg-white border border-gray-100 rounded-2xl
        px-4 py-4 sm:px-5 sm:py-5 lg:px-6
        hover:shadow-md transition
        flex flex-col xl:flex-row
        lg:items-center lg:justify-between
        gap-4 xl:gap-0
      "
    >
      {/* AVATAR + NAME */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4 xl:w-[27%]">
        <div
          className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center bg-[#E0FBD8] text-sm font-bold text-[#46EC12] sm:h-12 sm:w-12"
        >
          {initials}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight text-gray-900">
            {name}
          </p>
          <p className="truncate text-[11px] uppercase tracking-wide text-gray-500">
            {userId}
          </p>
        </div>
      </div>

      {/* MOBILE */}
      <div className="xl:w-[17%]">
        <p className="text-[10px] uppercase text-gray-400 font-semibold mb-1">
          Mobile
        </p>
        <p className="break-all text-sm font-semibold text-gray-900">{phone}</p>
      </div>

      {/* ADDRESS */}
      <div className="xl:w-[36%]">
        <p className="text-[10px] uppercase text-gray-400 font-semibold mb-1">
          Address
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <p className="w-full text-sm text-gray-700 break-words xl:w-auto xl:max-w-[220px]">
            {address}
          </p>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-semibold text-gray-500 whitespace-nowrap">
            {city}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-semibold text-gray-500 whitespace-nowrap">
            {district}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-semibold text-gray-500 whitespace-nowrap">
            {state}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-semibold text-gray-500 whitespace-nowrap">
            PIN: {pin}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div
        className="
          flex w-full flex-wrap items-center gap-2 sm:gap-3
          xl:w-[20%]
          xl:justify-end
          justify-start
          pt-1 xl:pt-0
        "
      >
        <button
          className="
            px-3 py-[7px] sm:px-4
            rounded-full
            border border-[#46EC12]
            text-xs sm:text-[13px] font-medium
            text-gray-900
            bg-white
            hover:bg-green-50
            transition
            whitespace-nowrap
          "
        >
          {formattedDate}
        </button>

        <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition sm:h-10 sm:w-10">
          <FiEdit2 size={16} />
        </button>

        <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition sm:h-10 sm:w-10">
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}
