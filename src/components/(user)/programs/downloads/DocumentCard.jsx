



export default function DocumentCard({
  title,
  meta,
  badge,
  badgeColor,
  iconBg,
  iconText,
  fileIcon = "picture_as_pdf",
}) {
  return (
    <div
      className="
        group
        flex flex-col sm:flex-row
        sm:items-center
        gap-4
        bg-white
        p-4 sm:p-5
        rounded-xl
        shadow-[0_4px_12px_rgba(0,0,0,0.05)]
        hover:-translate-y-1
        transition-all
        duration-200
      "
    >
      {/* ICON */}
      <div
        className={`
          size-14 sm:size-16
          rounded-2xl
          flex
          items-center
          justify-center
          transition-colors
          ${iconBg}
        `}
      >
        <span
          className={`
            material-symbols-outlined
            text-2xl sm:text-3xl
            ${iconText}
          `}
        >
          {fileIcon}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3
            className="
              text-[#111418]
              text-base sm:text-lg
              font-bold
              truncate
              max-w-full
            "
          >
            {title}
          </h3>

          {badge && (
            <span
              className={`
                px-2.5 py-0.5
                rounded-full
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                ${badgeColor}
              `}
            >
              {badge}
            </span>
          )}
        </div>

        <p className="text-[#617589] text-sm font-medium">
          {meta}
        </p>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button
        className="
          w-full sm:w-auto
          shrink-0
          flex items-center justify-center
          gap-2
          rounded-full
          border border-[#2C8CEE]
          text-[#2C8CEE]
          px-5 sm:px-6
          py-2
          text-sm
          font-bold
          hover:bg-[#2C8CEE]
          hover:text-white
          transition-all
        "
      >
        <span className="material-symbols-outlined text-lg">
          download
        </span>
        Download
      </button>
    </div>
  );
}
