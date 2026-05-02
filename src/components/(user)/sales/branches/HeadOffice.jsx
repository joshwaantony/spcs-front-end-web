import {
  PhoneIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function HeadOffice() {
  return (
    <section className="mb-16">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-amber-500">
          stars
        </span>
        Head Office
      </h2>

      {/* Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-100 shadow-lg p-8 flex flex-col lg:flex-row gap-10">

        {/* LEFT CONTENT */}
        <div className="flex-1">
          {/* Badge */}
          <span className="inline-flex px-4 py-1 rounded-full bg-[#FFFBEB] text-[#D97707] text-xs font-bold mb-4">
            KOTTAYAM
          </span>

          {/* Title */}
          <h3 className="text-4xl font-extrabold text-black mb-3">
            SPCS Building
          </h3>

          {/* Address */}
          <p className="text-[#4C5563] text-lg mb-6">
            Kottayam - 686 001, Kerala, India
          </p>

          {/* Phone */}
          <div className="flex gap-8 text-black text-base font-semibold">
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-[#17B0CF]" />
              0481-2301812
            </div>

            <div className="flex items-center gap-2">
              <DevicePhoneMobileIcon className="w-5 h-5 text-[#17B0CF]" />
              2564111
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[320px] flex flex-col items-end gap-4">
          {/* Get Directions Button */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=SPCS+Building+Kottayam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#17B0CF] text-white
                       px-6 py-3 rounded-full text-sm font-bold
                       shadow hover:bg-[#149BB6] transition"
          >
            <MapPinIcon className="w-5 h-5" />
            Get Directions
          </a>

          {/* Map */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbNKEKHU-Yf4tGqgIpaN1DJCBH4-z5jY53U68X2z-Ve7owACuMH2yG4625rTWQDlYucmKcFFwHgMmMy2eM257mauXzyN4DNsREQXY2rZYHjeKclrJetHAm6eqdwn3555AnulUfcdEFq0KNs4OAtCgzzKigwEPHVE_elv6bIdV3zvtgjLz426e-XHYZE5-lsGdzUcpIBOU8wPhZhOJ1BClDtN0YR52HowvUvL-CpxgFpwmiR4BRn3aDbX9oGGPLD-FKT6aHqVvjZC4"
            alt="SPCS Kottayam Map"
            className="w-full h-[180px] object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
