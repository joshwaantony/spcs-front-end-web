const cards = [
  {
    icon: "call",
    title: "Call Us",
    text: "+91 0481 2563314\nMon-Sat, 9am - 5pm",
  },
  {
    icon: "mail",
    title: "Email Us",
    text: "support@spcsindia.com\n24/7 online support",
  },
  {
    icon: "location_on",
    title: "Visit Us",
    text: "SPCS Head Office\nKottayam, Kerala",
  },
];

export default function ContactCards() {
  return (
    <section className="
      relative z-10
      px-4 sm:px-6 lg:px-8
      -mt-16 sm:-mt-20 md:-mt-24
    ">
      <div className="
        max-w-7xl mx-auto
        grid grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4 sm:gap-6 lg:gap-8
      ">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              bg-white
              border border-[#E5EDF1]
              rounded-2xl
              p-6 sm:p-7 lg:p-8
              shadow-[0_10px_30px_rgba(0,0,0,0.06)]
              transition-all duration-300
              hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]
            "
          >
            {/* Icon */}
            <div className="
              w-12 h-12 sm:w-14 sm:h-14
              rounded-full
              bg-[#ECF8FD]
              flex items-center justify-center
              mb-4
            ">
              <span className="
                material-symbols-outlined
                text-[22px] sm:text-[24px]
                text-[#13B6EC]
                font-light
              ">
                {card.icon}
              </span>
            </div>

            {/* Title */}
            <h3 className="
              text-base sm:text-lg
              font-semibold
              text-[#0F172A]
              mb-1
            ">
              {card.title}
            </h3>

            {/* Text */}
            <p className="
              text-sm
              text-[#64748B]
              leading-relaxed
              whitespace-pre-line
            ">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
