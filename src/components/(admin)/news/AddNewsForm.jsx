



"use client";

export default function AddNewsForm() {
  return (
    <section className="bg-[#F9FAFB] rounded-3xl p-4 sm:p-6 lg:p-8 mb-12 lg:mb-16 border border-gray-100">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-[#A6F20D] font-bold text-xl">
          add_circle
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-charcoal">
          Add New News Item
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-5 sm:space-y-6">

          {/* Headline */}
          <div>
            <label className="block text-xs sm:text-sm font-bold mb-2 ml-1">
              Headline
            </label>
            <input
              type="text"
              placeholder="Enter headline in Malayalam or English..."
              className="w-full rounded-full border border-gray-200 py-3.5 sm:py-4 px-5 sm:px-6 text-sm focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Date & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-xs sm:text-sm font-bold mb-2 ml-1">
                Date
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
                  calendar_today
                </span>
                <input
                  type="text"
                  placeholder="Oct 24, 2023"
                  className="w-full rounded-full border border-gray-200 py-3.5 sm:py-4 pl-11 pr-5 text-sm focus:ring-primary"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs sm:text-sm font-bold mb-2 ml-1">
                Category
              </label>
              <select className="w-full rounded-full border border-gray-200 py-3.5 sm:py-4 px-5 text-sm focus:ring-primary">
                <option>Literary Award</option>
                <option>Book Fair</option>
                <option>Author Meet</option>
                <option>General News</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs sm:text-sm font-bold mb-2 ml-1">
              Content
            </label>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {/* Toolbar */}
              <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
                {[
                  "format_bold",
                  "format_italic",
                  "format_list_bulleted",
                  "link",
                  "format_quote",
                ].map((icon) => (
                  <button
                    key={icon}
                    className="p-2 rounded hover:bg-gray-200"
                  >
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                      {icon}
                    </span>
                  </button>
                ))}
              </div>

              <textarea
                rows={5}
                placeholder="Write the news content here..."
                className="w-full border-none  p-3 sm:p-4 text-sm resize-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col">

          <label className="block text-xs sm:text-sm font-bold mb-2 ml-1">
            Featured Image
          </label>

          <div className="flex-1 min-h-[200px] sm:min-h-[240px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-6 sm:p-10 bg-white/50 hover:border-primary transition cursor-pointer group text-center">

            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl">
                cloud_upload
              </span>
            </div>

            <p className="font-bold text-sm sm:text-base mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-semibold">
              SVG, PNG, JPG (max. 800×400px)
            </p>
          </div>

          {/* Publish Button */}
          <div className="mt-6 sm:mt-8 flex justify-stretch sm:justify-end">
            <button className="w-full sm:w-auto bg-[#A6F20D] text-charcoal font-black text-base sm:text-lg py-3.5 sm:py-4 px-6 sm:px-10 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95">
              <span className="material-symbols-outlined text-[20px]">
                send
              </span>
              Publish News
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
