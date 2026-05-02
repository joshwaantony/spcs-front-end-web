



import {
  HiOutlineClock,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function UpcomingEvents() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181311]">
          Upcoming Highlights
        </h2>

        <div className="flex gap-3">
          <button className="size-11 rounded-full border border-[#FADAD3] text-black hover:bg-white transition">
            ‹
          </button>
          <button className="size-11 rounded-full border border-[#FADAD3] text-[#EC4D12] hover:bg-white transition">
            ›
          </button>
        </div>
      </div>

      <div className="space-y-8">

        {/* EVENT CARD */}
        {[{
          day: "15",
          month: "JAN",
          color: "bg-[#EC4D12]",
          title: "Kottayam International Book Fair 2026",
          time: "10:00 AM – 8:00 PM",
          location: "CMS College Grounds, Kottayam",
          tags: [
            "bg-green-100 text-green-700",
            "bg-blue-100 text-blue-700"
          ],
          labels: ["Public Entry", "Annual Fair"],
        },{
          day: "22",
          month: "JAN",
          color: "bg-[#3a2a24]",
          title: "Malayalam Poetry Slam & Symposium",
          time: "5:00 PM – 9:00 PM",
          location: "SPCS Hall, Trivandrum",
          tags: [
            "bg-[#FFEDD5] text-[#EC4D12]",
            "bg-purple-100 text-purple-700"
          ],
          labels: ["Workshop", "Free Admission"],
        }].map((event, index) => (
          <div
            key={index}
            className="
              bg-white rounded-2xl border
              flex flex-col lg:flex-row gap-6
              p-6 sm:p-8
              shadow-md hover:shadow-lg
              transition-all duration-300
              hover:-translate-y-1
            "
          >

            {/* Date */}
            <div
              className={`
                ${event.color}
                text-white rounded-xl
                flex lg:flex-col items-center justify-center
                lg:min-w-[120px]
                h-[70px] lg:h-auto
                px-6 lg:px-0
                gap-2
              `}
            >
              <span className="text-xs font-bold tracking-widest">
                {event.month}
              </span>
              <span className="text-3xl lg:text-5xl font-black">
                {event.day}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2">
                {event.labels.map((label, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-full uppercase ${event.tags[i]}`}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#181311]">
                {event.title}
              </h3>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-sm sm:text-base text-[#896c61]">
                <span className="flex items-center gap-2">
                  <HiOutlineClock className="text-lg " />
                  {event.time}
                </span>
                <span className="flex items-center gap-2">
                  <HiOutlineLocationMarker className="text-lg" />
                  {event.location}
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="flex lg:items-center">
              <button
                className="
                  w-full lg:w-auto
                  border-2 border-[#EC4D12]
                  text-[#EC4D12]
                  px-6 sm:px-8 py-3 sm:py-4
                  rounded-xl font-bold
                  flex items-center justify-center gap-3
                  hover:bg-[#EC4D12] hover:text-white
                  transition
                "
              >
                Register / Remind Me
                <IoMdNotificationsOutline className="text-xl" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
