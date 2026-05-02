import { ChevronDown } from "lucide-react";

export default function Breadcrumb() {
  return (
    <section className="mb-10">
      <div className="px-6 md:px-10 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-3">
          Home <span className="mx-1">/</span> Store{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-medium">Novels</span>
        </nav>

        {/* Title + Sort */}
        <div className="flex justify-between items-end flex-wrap gap-4">
          {/* Left */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Browse Collection
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing{" "}
              <span className="text-blue-600 font-semibold">1,576</span>{" "}
              titles
            </p>
          </div>

          {/* Right - Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-medium">
              Sort by:
            </span>

            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">
              Best Selling
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
