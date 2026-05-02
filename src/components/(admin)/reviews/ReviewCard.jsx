export default function ReviewCard({
  status,
  deleting = false,
  title,
  time,
  author,
  rating,
  image,
  text,
  updating = false,
  onApprove = () => {},
  onReject = () => {},
  onDelete = () => {},
}) {
  const isPublished = String(status || "").toLowerCase() === "published";
  const isRejected = String(status || "").toLowerCase() === "rejected";

  return (
    <div className="
      group flex flex-col
      p-4 sm:p-5 lg:p-6
      rounded-xl
      border border-gray-200
      hover:border-primary
      transition-all
      hover:shadow-lg hover:shadow-primary/10
      bg-white
      h-full
    ">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-18 sm:w-16 sm:h-20 rounded bg-gray-200 overflow-hidden shadow-sm flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-base sm:text-lg lg:text-xl text-black truncate">
            {title}
          </h3>
          <p className="text-[10px] sm:text-xs text-[#7C8A60] font-semibold uppercase tracking-widest mt-1">
            {time}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-wrap items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`material-symbols-outlined text-[18px] text-[#A6F20D] sm:text-[20px] ${
              i <= rating ? "star-filled" : "text-gray-300"
            }`}
          >
            star
          </span>
        ))}
        <span className="ml-2 text-xs sm:text-sm font-semibold text-black">
          by {author}
        </span>
      </div>

      {/* Review Text */}
      <p className="text-[#7C8A60] text-xs sm:text-sm leading-relaxed italic mb-6 sm:mb-8">
        "{text}"
      </p>

      {/* Actions */}
      <div className="mt-auto flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onApprove}
          disabled={updating || isPublished}
          className="
          flex-1 flex items-center justify-center gap-2
          py-2.5 sm:py-3
          bg-[#A6F20D]
          text-black
          font-bold
          rounded-full
          text-xs sm:text-sm
          hover:brightness-105
          transition-all
          disabled:opacity-60 disabled:cursor-not-allowed
        "
        >
          <span className="material-symbols-outlined text-base">
            check_circle
          </span>
          {isPublished ? "Published" : "Approve"}
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={updating || deleting}
          className="
          flex-1 flex items-center justify-center gap-2
          py-2.5 sm:py-3
          border border-red-300
          text-red-500
          font-bold
          rounded-full
          text-xs sm:text-sm
          hover:bg-red-50
          transition-all
          disabled:opacity-60 disabled:cursor-not-allowed
        "
        >
          <span className="material-symbols-outlined text-base">
            delete
          </span>
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
