



export default function MagazineCard({
  image,
  title,
  size,
  onEdit = () => {},
  onDelete = () => {},
}) {
  return (
    <div className="
      group relative bg-white rounded-lg overflow-hidden 
      border border-gray-100 
      transition-all duration-300
      hover:shadow-xl
    ">
      {/* Image */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* Hover overlay (desktop only) */}
        <div className="
          absolute inset-0 bg-charcoal/60
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          hidden sm:flex
          items-center justify-center gap-4
        ">
          <button className="
            w-12 h-12 rounded-full bg-white text-charcoal
            flex items-center justify-center
            hover:bg-primary transition-colors
          ">
            <span className="material-symbols-outlined">visibility</span>
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="
              w-12 h-12 rounded-full bg-white text-charcoal
              flex items-center justify-center
              hover:bg-[#A6F20D] transition-colors
            "
          >
            <span className="material-symbols-outlined">edit</span>
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="
              w-12 h-12 rounded-full bg-white text-charcoal
              flex items-center justify-center
              hover:bg-red-500 hover:text-white transition-colors
            "
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-5">
        <p className="text-charcoal font-bold text-base sm:text-lg leading-none mb-2">
          {title}
        </p>

        <p className="text-[#7C8A60] text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-[#7C8A60]">
            description
          </span>
          PDF • {size}
        </p>
      </div>
    </div>
  );
}
