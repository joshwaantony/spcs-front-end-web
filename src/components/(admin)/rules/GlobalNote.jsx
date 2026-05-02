



import { HiInformationCircle } from "react-icons/hi";

export default function GlobalNote() {
  return (
    <div
      className="
        mt-12 p-6
        bg-slate-900 text-white
        rounded-2xl
        flex flex-col gap-6
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      {/* Left content */}
      <div className="flex items-start sm:items-center gap-4">
        <div className="size-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
          <HiInformationCircle className="text-[#A6F20D] text-2xl" />
        </div>

        <div>
          <h4 className="font-bold text-white">Logic Overrides</h4>
          <p className="text-sm text-slate-400 max-w-md">
            Rules are applied sequentially. Discounts take precedence over free
            shipping offers.
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          className="
            w-full sm:w-auto
            px-6 py-2
            rounded-full
            border border-white/20
            text-sm font-bold text-white
            hover:bg-white/5
            transition
          "
        >
          Discard Changes
        </button>

        <button
          className="
            w-full sm:w-auto
            px-8 py-2
            rounded-full
            bg-[#A6F20D]
            text-slate-900
            text-sm font-black
            hover:scale-105
            transition-transform
            shadow-lg shadow-[#A6F20D]/20
          "
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}
