export default function FeedbackRow({
  feedback,
  initials,
  name,
  email,
  subject,
  preview,
  time,
  highlight,
  darkAvatar,
  onReply,
  replying,
  onDelete,
  deleting,
}) {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 border-b border-gray-200  transition
                    sm:flex-row sm:items-center sm:gap-6 sm:px-8">

      {/* Avatar + User Info */}
      <div className="flex items-center gap-4 sm:min-w-[220px]">
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center font-semibold text-sm shrink-0
          ${darkAvatar ? "bg-[#161811] text-[#A6F20D]" : "bg-[#E5E7EB] text-[#161811]"}`}
        >
          {initials}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#161811] truncate">
            {name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {email}
          </p>
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {highlight && (
            <span className="w-2 h-2 bg-[#A6F20D] rounded-full shrink-0" />
          )}
          <p className="text-sm font-semibold truncate">
            {subject}
          </p>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {preview}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3
                      sm:justify-end sm:gap-3">

        <button className="h-9 px-4 rounded-full bg-[#A6F20D] text-[#161811]
                           text-sm font-semibold w-full sm:w-auto disabled:opacity-60"
          type="button"
          onClick={() => onReply?.(feedback)}
          disabled={replying}
        >
          {replying ? "Opening..." : "Reply"}
        </button>

        <button
          type="button"
          onClick={() => onDelete?.(feedback)}
          disabled={deleting}
          className="w-9 h-9 flex items-center justify-center rounded-full
                           text-gray-400 hover:bg-red-300 shrink-0 disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[20px]">
            delete
          </span>
        </button>
      </div>
    </div>
  );
}
