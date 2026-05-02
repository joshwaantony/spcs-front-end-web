export default function CatalogCard({
  id,
  title,
  size,
  date,
  year,
  isNew,
  fileUrl,
  onEdit,
  onDelete,
}) {
  const handleDownload = () => {
    if (!fileUrl || typeof window === "undefined") {
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const isAbsolute = /^https?:\/\//i.test(fileUrl);
    const finalUrl = isAbsolute ? fileUrl : `${baseUrl}${fileUrl}`;

    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
      <div
        className="
        h-36
        sm:h-40
        lg:h-44
        bg-gray-50
        flex
        items-center
        justify-center
        relative
      "
      >
        <div
          className="
          size-16
          sm:size-18
          lg:size-20
          bg-white
          rounded-2xl
          flex
          items-center
          justify-center
        "
        >
          <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#A6F20D]">
            picture_as_pdf
          </span>
        </div>

        {isNew && (
          <span
            className="
            absolute
            top-3
            right-3
            sm:top-4
            sm:right-4
            bg-[#A6F20D]
            text-black
            text-[9px]
            sm:text-[10px]
            px-2
            py-1
            rounded-full
            font-bold
          "
          >
            NEW
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug sm:text-base">
            {title}
          </h3>
          <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
            {size} {date ? `\u00b7 ${date}` : ""}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <button
            onClick={() =>
              onEdit?.({
                id,
                title,
                year,
                fileUrl,
              })
            }
            className="
              h-9
              min-w-[2.25rem]
              px-3
              sm:h-10
              sm:min-w-[2.5rem]
              bg-white
              rounded-full
              border border-gray-100
              shadow-sm
              flex
              items-center
              justify-center
              hover:bg-gray-50
              transition
            "
            aria-label={`Edit ${title}`}
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
              edit
            </span>
          </button>

          <button
            onClick={handleDownload}
            disabled={!fileUrl}
            className="
              h-9
              min-w-[2.25rem]
              px-3
              sm:h-10
              sm:min-w-[2.5rem]
              bg-white
              rounded-full
              border border-gray-100
              shadow-sm
              flex
              items-center
              justify-center
              hover:bg-gray-50
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
            aria-label={`Download ${title}`}
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
              download
            </span>
          </button>

          <button
            onClick={() =>
              onDelete?.({
                id,
                title,
              })
            }
            className="
              h-9
              min-w-[2.25rem]
              px-3
              sm:h-10
              sm:min-w-[2.5rem]
              bg-white
              rounded-full
              border border-red-100
              shadow-sm
              flex
              items-center
              justify-center
              text-red-500
              hover:bg-red-50
              transition
            "
            aria-label={`Delete ${title}`}
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
              delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
