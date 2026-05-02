




export default function ArchiveRow({
  id,
  title,
  year,
  date,
  fileType,
  icon,
  onEdit,
  onDownload,
  onDelete,
  downloading = false,
  deleting = false,
}) {
  return (
    <div
      className="
        group
        flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-4 sm:gap-0
        py-5 sm:py-6
        px-4 sm:px-6 -mx-4 sm:-mx-6
        hover:bg-gray-50
        transition-colors
        border-b border-gray-100
        last:border-0
      "
    >
      {/* Left */}
      <div className="flex items-start sm:items-center gap-4 sm:gap-5">
        {/* Icon */}
        <div
          className="
            size-11 sm:size-12
            rounded-full
            bg-gray-100
            flex items-center justify-center
            text-gray-500
            group-hover:bg-[#e7fbc3]
            group-hover:text-charcoal
            transition-colors
            shrink-0
          "
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
            {icon}
          </span>
        </div>

        {/* Text */}
        <div>
          <h4 className="text-black font-bold text-base sm:text-lg leading-tight">
            {title}
          </h4>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 text-xs sm:text-sm">
            <p className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              Added on {date || "N/A"}
            </p>

            {fileType ? (
              <p className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  description
                </span>
                {fileType}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="
          flex items-center gap-2
          self-end sm:self-auto
        "
      >
        <button
          onClick={() =>
            onEdit?.({
              id,
              title,
              year,
              date,
              fileType,
              icon,
            })
          }
          disabled={downloading || deleting}
          className="
            p-2
            text-gray-400
            hover:text-charcoal
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          title="Edit"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>

        <button
          onClick={onDownload}
          disabled={downloading || deleting}
          className="
            p-2
            text-gray-400
            hover:text-charcoal
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          title="Download"
        >
          <span className="material-symbols-outlined">
            {downloading ? "progress_activity" : "download"}
          </span>
        </button>

        <button
          onClick={() => onDelete?.(id)}
          disabled={downloading || deleting}
          className="
            p-2
            text-gray-400
            hover:text-red-500
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          title="Delete"
        >
          <span className="material-symbols-outlined">
            {deleting ? "progress_activity" : "delete"}
          </span>
        </button>
      </div>
    </div>
  );
}
