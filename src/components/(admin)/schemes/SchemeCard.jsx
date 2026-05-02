
import { MdEdit, MdDelete } from "react-icons/md";

export default function SchemeCard({
  scheme,
  title,
  description,
  enrolled,
  created,
  image,
  status = "ACTIVE",
  onEdit = () => {},
  onDelete = () => {},
}) {
  const isActive = status === "ACTIVE";

  return (
    <div className="
      bg-white
      rounded-xl
      shadow-md
      border border-gray-100
      overflow-hidden
      hover:shadow-xl
      transition-all
      group
    ">

      {/* IMAGE */}
      <div className="
        relative
        overflow-hidden
        bg-gray-200
        h-40
        sm:h-44
        md:h-48
      ">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url('${image}')` }}
        />

        {/* ACTIVE BADGE */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span
            className={`text-charcoal text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${
              isActive ? "bg-[#A6F20D]" : "bg-gray-200"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-black leading-snug">
            {title}
          </h3>

          {/* ACTIONS */}
          <div className="flex gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onEdit(scheme)}
              className="p-2 text-gray-400 rounded-full transition-all duration-200 hover:text-[#7FB800] hover:bg-[#A6F20D]/20 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <MdEdit size={16} className="transition-transform duration-200 group-hover:scale-100 hover:scale-110" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(scheme)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <MdDelete size={16} />
            </button>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2">{description}</p>

        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
          <span className="text-[10px] sm:text-xs font-bold text-gray-400">
            CREATED {created}
          </span>
          <span className="text-[10px] sm:text-xs font-black text-black">
            {enrolled} ENROLLED
          </span>
        </div>
      </div>
    </div>
  );
}
