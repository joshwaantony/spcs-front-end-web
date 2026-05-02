export default function PageHeader({ onCreateClick }) {
  return (
    <div className="p-4 sm:p-6 md:p-8 border-b border-gray-100">
      <div className="
        flex 
        flex-col
        gap-4 sm:gap-6
      ">
        
        {/* Left content */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1
            className="
              text-2xl 
              sm:text-3xl 
              md:text-4xl 
              font-black 
              text-black 
              leading-tight
              tracking-tight
            "
          >
            Catalog Manager
          </h1>

          <p
            className="
              text-sm 
              sm:text-base 
              text-soft-gray 
              leading-relaxed
            "
          >
            Upload and publish digital product catalogs and price lists.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            className="
              h-10 sm:h-11 
              px-5 sm:px-6 
              rounded-full 
              bg-gray-100 
              text-sm sm:text-base
              font-bold 
              text-black
              hover:bg-gray-200 
              transition-colors
              w-auto
            "
          >
            View Archive
          </button>

          <button
            onClick={onCreateClick}
            className="
              h-10 sm:h-11
              px-5 sm:px-6
              rounded-full
              bg-[#A6F20D]
              text-sm sm:text-base
              font-bold
              text-black
              hover:brightness-95
              transition-all
              w-auto
            "
          >
            Create Catalogue
          </button>
        </div>
      </div>
    </div>
  );
}
