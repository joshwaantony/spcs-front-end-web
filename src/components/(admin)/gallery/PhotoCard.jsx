



export default function PhotoCard({ src, tag }) {
  return (
    <div className="relative overflow-hidden rounded-2xl group w-full">

      {/* Image */}
      <img
        src={src}
        alt={tag}
        className="
          w-full 
          h-[180px] sm:h-[220px] md:h-[240px] lg:h-[260px]
          object-cover 
          transition-transform duration-500 
          group-hover:scale-105
        "
      />

      {/* Tag pill */}
      <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-full">
        <span className="text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
          {tag}
        </span>
      </div>

      {/* Hover / Tap Overlay */}
      <div
        className="
          absolute inset-0 
          bg-black/40 
          opacity-100 sm:opacity-0 
          sm:group-hover:opacity-100 
          transition duration-300 
          flex items-center justify-center gap-3 sm:gap-4
        "
      >
        <button
          className="
            w-9 h-9 sm:w-10 sm:h-10 
            rounded-full bg-white 
            flex items-center justify-center 
            shadow-lg 
            hover:scale-110 transition
          "
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-charcoal">
            drive_file_move
          </span>
        </button>

        <button
          className="
            w-9 h-9 sm:w-10 sm:h-10 
            rounded-full bg-red-500 text-white 
            flex items-center justify-center 
            shadow-lg 
            hover:scale-110 transition
          "
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
            delete
          </span>
        </button>
      </div>
    </div>
  );
}
