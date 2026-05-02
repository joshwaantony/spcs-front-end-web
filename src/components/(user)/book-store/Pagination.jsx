export default function Pagination() {
  return (
    <div className="flex justify-center mt-14">
      <nav className="flex items-center gap-1 bg-white px-3 py-2 rounded-full shadow-card">

        {/* Previous */}
        <button
          aria-label="Previous page"
          className="flex items-center justify-center h-9 w-9 rounded-full text-text-muted hover:bg-background-off transition"
        >
          ‹
        </button>

        {/* Page 1 (active) */}
        <button
          className="flex items-center justify-center h-9 w-9 rounded-full bg-[#126DEC] text-white font-semibold shadow"
        >
          1
        </button>

        {/* Page 2 */}
        <button
          className="flex items-center justify-center h-9 w-9 rounded-full text-text-muted hover:bg-background-off transition"
        >
          2
        </button>

        {/* Page 3 */}
        <button
          className="flex items-center justify-center h-9 w-9 rounded-full text-text-muted hover:bg-background-off transition"
        >
          3
        </button>

        {/* Ellipsis */}
        <span className="flex items-center justify-center h-9 w-7 text-text-muted">
          …
        </span>

        {/* Page 12 */}
        <button
          className="flex items-center justify-center h-9 w-9 rounded-full text-text-muted hover:bg-background-off transition"
        >
          12
        </button>

        {/* Next */}
        <button
          aria-label="Next page"
          className="flex items-center justify-center h-9 w-9 rounded-full text-text-muted hover:bg-background-off transition"
        >
          ›
        </button>

      </nav>
    </div>
  );
}
