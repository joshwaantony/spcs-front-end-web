
export default function FilterBar() {
  return (
    <section
      className="
        bg-white p-4 rounded-[20px] shadow-sm
        flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      {/* LEFT FILTERS */}
      <div
        className="
          flex flex-col gap-3
          sm:flex-row sm:items-center sm:flex-1
        "
      >
        {/* SEARCH INPUT */}
        <div className="relative w-full sm:max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">
            search
          </span>
          <input
            type="text"
            placeholder="Order ID or Book Title..."
            className="
              w-full pl-10 pr-4 py-2
              bg-zinc-100 rounded-full
              text-xs font-medium
              focus:outline-none focus:ring-1 focus:ring-[#46ec13]
            "
          />
        </div>

        <FilterButton
          icon="calendar_today"
          label="Select Date"
          dropdown
        />

        <FilterButton
          icon="filter_list"
          label="Format: All / PDF / EPUB"
          dropdown
        />
      </div>

      {/* EXPORT BUTTON */}
      <button
        className="
          w-full sm:w-auto
          flex items-center justify-center gap-2
          px-6 py-2
          bg-[#1f2937] text-white
          rounded-full text-xs font-bold
          shadow-sm hover:opacity-90 transition
        "
      >
        <span className="material-symbols-outlined text-sm">download</span>
        Export CSV
      </button>
    </section>
  );
}

function FilterButton({ icon, label, dropdown }) {
  return (
    <button
      className="
        w-full sm:w-auto
        flex items-center justify-center sm:justify-start
        gap-2 px-4 py-2
        bg-[#F4F4F5] rounded-full
        text-xs font-bold text-charcoal
      "
    >
      <span className="material-symbols-outlined text-[#1F2838] text-sm">
        {icon}
      </span>
      <span className="whitespace-nowrap">{label}</span>
      {dropdown && (
        <span className="material-symbols-outlined text-sm">
          keyboard_arrow_down
        </span>
      )}
    </button>
  );
}
