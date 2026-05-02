const filters = [
  "All",
  "Events & Launches",
  "Awards",
  "Museum Project",
  "Historical",
];

export default function GalleryFilters() {
  return (
    <div className="sticky top-16 md:top-20 z-40 
      bg-background-light/95 dark:bg-background-dark/95 
      backdrop-blur-sm 
      py-4 sm:py-6 md:py-8 
      px-3 sm:px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`
              rounded-full font-bold transition-all whitespace-nowrap
              
              /* padding */
              px-4 py-2
              sm:px-6 sm:py-2.5
              md:px-8 md:py-3
              
              /* text size */
              text-xs sm:text-sm md:text-base
              
              ${
                index === 0
                  ? "bg-[#12D442] text-white shadow-lg shadow-[#12D442]/30"
                  : "bg-white text-black border border-gray-200 hover:bg-gray-50"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
