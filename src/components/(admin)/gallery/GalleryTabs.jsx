



const tabs = [
  "Recent Uploads",
  "Inauguration",
  "Annual Meet",
  "Workshop",
  "Awards Ceremony",
];

export default function GalleryTabs({ activeTab = 0 }) {
  return (
    <div className="mb-6 md:mb-8">
      {/* Scroll container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max border-b border-gray-100">
          {tabs.map((tab, i) => {
            const isActive = i === activeTab;

            return (
              <button
                key={tab}
                className={`
                  whitespace-nowrap font-bold tracking-wide transition-colors duration-200
                  
                  /* Padding & font sizes */
                  px-4 py-3 text-xs
                  sm:px-5 sm:py-3 sm:text-sm
                  md:px-6 md:py-4 md:text-sm
                  
                  ${
                    isActive
                      ? "border-b-4 border-[#A6F20D] text-[#1B1B1B]"
                      : "border-b-4 border-transparent text-gray-400 hover:text-[#1B1B1B]"
                  }
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
