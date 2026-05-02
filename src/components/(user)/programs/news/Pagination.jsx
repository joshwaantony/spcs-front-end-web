// components/news/Pagination.js
export default function Pagination() {
  return (
    <div className="flex justify-center mt-12">
      <div className="
        inline-flex items-center
        bg-white
        px-2 py-2
        rounded-full
        border border-gray-100
        shadow-sm
      ">
        {/* Left Arrow */}
        <button className="
          w-10 h-10
          flex items-center justify-center
          rounded-full
          text-gray-500
          hover:bg-gray-100
          transition-colors
        ">
          ‹
        </button>

        {/* Page Numbers */}
        <div className="flex items-center px-2 gap-1">
          <button className="
            w-10 h-10
            rounded-full
            bg-[#19e680]
            text-gray-900
            font-bold
          ">
            1
          </button>

          <button className="
            w-10 h-10
            rounded-full
            text-gray-600
            hover:bg-gray-100
            transition-colors
          ">
            2
          </button>

          <button className="
            w-10 h-10
            rounded-full
            text-gray-600
            hover:bg-gray-100
            transition-colors
          ">
            3
          </button>

          <span className="px-2 text-gray-400 select-none">...</span>

          <button className="
            w-10 h-10
            rounded-full
            text-gray-600
            hover:bg-gray-100
            transition-colors
          ">
            12
          </button>
        </div>

        {/* Right Arrow */}
        <button className="
          w-10 h-10
          flex items-center justify-center
          rounded-full
          text-gray-500
          hover:bg-gray-100
          transition-colors
        ">
          ›
        </button>
      </div>
    </div>
  );
}
