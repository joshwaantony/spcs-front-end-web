



"use client";

export default function ScheduleEventForm() {
  return (
    <section className="bg-white rounded-4xl shadow-xl overflow-hidden mb-12 border border-gray-100">
      <div className="p-6 sm:p-8 md:p-12">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="material-symbols-outlined text-[#A6F20D] text-2xl sm:text-3xl">
            add_circle
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-black">
            Schedule New Event
          </h2>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN */}
          <div className="space-y-5 sm:space-y-6">
            
            {/* Event Name */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">
                Event Name
              </label>
              <input
                type="text"
                placeholder="e.g. Malayalam Literature Festival 2024"
                className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-full
                           border border-gray-200
                           focus:ring-2 focus:ring-[#A6F20D]
                           text-black placeholder:text-gray-400"
              />
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">
                  Event Date
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    calendar_today
                  </span>
                  <input
                    type="text"
                    placeholder="Select Date"
                    className="w-full pl-11 sm:pl-12 pr-5 py-3.5 sm:py-4 rounded-full
                               border border-gray-200 text-black"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">
                  Time
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    schedule
                  </span>
                  <select
                    className="w-full pl-11 sm:pl-12 pr-5 py-3.5 sm:py-4 rounded-full
                               border border-gray-200 text-black"
                  >
                    <option>Select Time</option>
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>02:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">
                Description
              </label>

              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
                  {["format_bold", "format_italic", "format_list_bulleted"].map(
                    (icon) => (
                      <button
                        key={icon}
                        className="p-1.5 hover:bg-gray-200 rounded"
                      >
                        <span className="material-symbols-outlined text-[#1F2838] text-lg">
                          {icon}
                        </span>
                      </button>
                    )
                  )}
                  <button className="p-1.5 hover:bg-gray-200 rounded ml-auto">
                    <span className="material-symbols-outlined text-[#1F2838] text-lg">
                      link
                    </span>
                  </button>
                </div>

                <textarea
                  rows="4"
                  placeholder="Enter event details, guest speakers, and itinerary..."
                  className="w-full p-4 bg-transparent border-none focus:ring-0
                             placeholder:text-[#99A1AF] text-black resize-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 flex flex-col">
            
            {/* Cover Image */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">
                Event Cover Image
              </label>

              <div className="min-h-[220px] sm:min-h-[280px]
                              border-2 border-dashed border-gray-200 rounded-xl
                              flex flex-col items-center justify-center p-5 sm:p-6
                              bg-gray-50 hover:bg-gray-100 transition cursor-pointer group">
                
                <div className="size-14 sm:size-16 rounded-full bg-[#E9F8D5]
                                flex items-center justify-center mb-3 sm:mb-4
                                group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#1F2838]">
                    image
                  </span>
                </div>

                <p className="text-sm font-bold text-black text-center">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  High-res PNG or JPG (1200×800px)
                </p>
              </div>
            </div>

            {/* Attachment */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">
                Attachment (Program PDF)
              </label>

              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50
                              flex items-center gap-3 cursor-pointer
                              hover:bg-gray-100 transition">
                <span className="material-symbols-outlined text-[#A6F20D] text-3xl">
                  picture_as_pdf
                </span>
                <div>
                  <p className="text-sm font-bold text-black">
                    Upload invitation or program guide
                  </p>
                  <p className="text-xs text-gray-500">Maximum size 5MB</p>
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="pt-4">
              <button
                type="button"
                className="w-full sm:w-auto
                           bg-[#A6F20D] text-black font-black text-base sm:text-lg
                           px-8 sm:px-10 py-4 sm:py-5 rounded-full
                           shadow-lg hover:scale-[1.02] active:scale-[0.98]
                           transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">
                  event_available
                </span>
                Schedule Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
