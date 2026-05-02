



import { MdDelete, MdEdit, MdLink, MdVisibility } from "react-icons/md";

export default function CampaignCard({
  title,
  link,
  displayLink,
  views,
  image,
  onEdit = () => {},
  onDelete = () => {},
}) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
        />

        {/* Hover Overlay (desktop only) */}
        <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity items-end p-4">
          <span className="text-white text-xs font-bold uppercase tracking-widest">
            Preview Live
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-black truncate">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 mt-1 text-gray-400 text-xs">
            <MdLink className="text-sm shrink-0" />
            <span className="truncate">{displayLink || link}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <MdVisibility className="text-green-500 text-sm" />
            <span className="text-xs font-medium text-gray-500">
              {views}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-lime-200 text-lime-700 text-xs font-bold hover:bg-lime-50 active:scale-95 transition"
            >
              <MdEdit className="text-sm" />
              Edit
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-red-100 text-red-500 text-xs font-bold hover:bg-red-50 active:scale-95 transition"
            >
              <MdDelete className="text-sm" />
              Delete
            </button>
          </div>
2        </div>
      </div>
    </div>
  );
}
