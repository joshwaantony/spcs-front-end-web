



export default function StatsBar() {
  const stats = [
    {
      icon: "article",
      label: "Total Articles",
      value: "1,248",
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: "visibility",
      label: "Monthly Views",
      value: "45.2K",
      iconBg: "bg-[#F7FDEC] dark:bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: "calendar_today",
      label: "Upcoming Events",
      value: "12",
      iconBg: "bg-purple-50 dark:bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: "pending_actions",
      label: "Drafts",
      value: "04",
      iconBg: "bg-orange-50 dark:bg-orange-500/10",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-4 sm:gap-6
        mt-8 sm:mt-12
      "
    >
      {stats.map(({ icon, label, value, iconBg, iconColor }) => (
        <div
          key={label}
          className="
            bg-white 
            p-5 sm:p-6
            rounded-3xl
            shadow-sm
            flex items-center
            gap-4
          "
        >
          {/* Icon Box */}
          <div
            className={`
              ${iconBg}
              p-3 sm:p-3.5
              rounded-2xl
              flex items-center justify-center
              shrink-0
            `}
          >
            <span
              className={`
                material-symbols-outlined
                ${iconColor}
                text-[22px] sm:text-[26px]
              `}
            >
              {icon}
            </span>
          </div>

          {/* Text */}
          <div className="leading-tight">
            <p
              className="
                text-[10px] sm:text-xs
                font-bold
                text-gray-400
                uppercase
                tracking-wide
              "
            >
              {label}
            </p>
            <p
              className="
                text-xl sm:text-2xl
                font-black
                text-charcoal 
              "
            >
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
