


export default function FooterStats() {
  return (
    <div className="mt-auto bg-charcoal dark:bg-black px-4 sm:px-6 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Left stats */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex flex-col">
            <span className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">
              Active Slots
            </span>
            <span className="text-white font-bold text-sm sm:text-base">
              3 of 5 Used
            </span>
          </div>

          {/* Divider (hidden on mobile) */}
          <div className="hidden sm:block h-8 w-px bg-gray-800"></div>

          <div className="flex flex-col">
            <span className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">
              Total Reach
            </span>
            <span className="text-[#A6F20D] font-black text-sm sm:text-base">
              4,542 Clicks
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center ">
     

          <button
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Settings"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>

      </div>
    </div>
  );
}
