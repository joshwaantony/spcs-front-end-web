



export default function GalleryToolbar() {
  return (
    <div
      className="
        flex flex-col 
        sm:flex-row 
        sm:flex-wrap 
        items-stretch 
        sm:items-center 
        gap-3 
        sm:gap-4 
        mb-8 
        sm:mb-10
      "
    >
      
      {/* Current Album */}
      <button
        className="
          flex items-center justify-between
          gap-3
          bg-[#F3F4F6] hover:bg-[#E5E7EB]
          text-[#111827]
          px-5 py-3
          rounded-full
          text-sm font-medium
          w-full sm:w-auto
        "
      >
        <span className="font-semibold">
          Current Album: <span className="font-semibold">All Photos</span>
        </span>
        <span className="material-symbols-outlined text-[20px] shrink-0">
          expand_more
        </span>
      </button>

      {/* Manage Albums */}
      <button
        className="
          flex items-center justify-center
          gap-2
          border border-[#E5E7EB]
          hover:bg-[#F9FAFB]
          px-5 py-3
          rounded-full
          text-sm font-medium
          text-[#111827]
          w-full sm:w-auto
        "
      >
        <span className="material-symbols-outlined text-[20px]">
          folder
        </span>
        Manage Albums
      </button>

      {/* Upload Button */}
      <button
        className="
          flex items-center justify-center
          gap-2
          bg-[#A3E635] hover:bg-[#84CC16]
          px-5 py-3
          rounded-full
          text-sm font-bold
          text-[#111827]
          shadow-md shadow-lime-400/30
          transition
          w-full sm:w-auto
        "
      >
        <span className="material-symbols-outlined text-[20px]">
          add
        </span>
        Upload New Photos
      </button>

    </div>
  );
}
