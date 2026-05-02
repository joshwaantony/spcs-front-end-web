


export default function AdCard({
  type,
  url,
  image,
  aspect,
  span,
  onEdit = () => {},
  onDelete,
}) {
  const badgeStyles = {
    Sidebar: "bg-[#DBEAFE] text-[#1C4ED8]",
    "Top Banner": "bg-[#F3E8FF] text-[#7E2BCE]",
  };

  return (
    <div
      className={`group relative flex flex-col bg-white
      rounded-2xl border border-zinc-100
      overflow-hidden transition-all
      hover:shadow-xl hover:-translate-y-1
      ${span ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      {/* ACTION BUTTONS */}
      <div
        className="
        absolute top-3 right-3 z-10
        flex items-center gap-2
        opacity-0 group-hover:opacity-100
        transition-opacity"
      >
        <button
          type="button"
          onClick={onEdit}
          className="
            size-9 sm:size-10
            rounded-full
            bg-white text-zinc-600
            border border-zinc-200
            shadow-sm
            hover:bg-zinc-100
            flex items-center justify-center"
          aria-label="Edit ad"
        >
          <span className="material-symbols-outlined text-base sm:text-lg">
            edit
          </span>
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="
            size-9 sm:size-10
            rounded-full
            bg-red-500 text-white
            shadow-lg
            hover:bg-red-600
            flex items-center justify-center"
          aria-label="Delete ad"
        >
          <span className="material-symbols-outlined text-base sm:text-lg">
            delete
          </span>
        </button>
      </div>

      {/* IMAGE */}
      <div
        className={`
          ${aspect === "banner"
            ? "aspect-[16/9] md:aspect-[3/1]"
            : "aspect-square"}
          bg-cover bg-center bg-zinc-100
        `}
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* FOOTER */}
      <div className="p-3 sm:p-4 flex items-center justify-between border-t border-zinc-100">
        <div className="flex flex-col gap-1 min-w-0">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit ${badgeStyles[type]}`}
          >
            {type}
          </span>
          <p className="text-zinc-500 text-xs truncate max-w-[180px] sm:max-w-[240px]">
            {url}
          </p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="size-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            open_in_new
          </span>
        </a>
      </div>
    </div>
  );
}
