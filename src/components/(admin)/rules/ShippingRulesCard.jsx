



import {
  MdLocalShipping,
  MdTrendingFlat,
  MdAdd,
  MdDelete,
} from "react-icons/md";

export default function ShippingRulesCard() {
  return (
    <div className="bg-white rounded-4xl p-5 sm:p-6 lg:p-8 custom-shadow border border-[#F1F5F9]">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <MdLocalShipping className="text-blue-600 text-lg sm:text-xl" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Shipping Charges
        </h2>
      </div>

      {/* New Shipping Bracket */}
      <div className="bg-slate-50 rounded-4xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          New Shipping Bracket
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <Input label="Value From (₹)" placeholder="0" />
          <Input label="Value To (₹)" placeholder="500" />
          <Input label="Cost (₹)" placeholder="40" />

          {/* Add Button */}
          <button className="h-11 w-full lg:w-11 lg:rounded-full rounded-2xl bg-[#A6F20D] flex items-center justify-center shadow-lg hover:scale-105 transition">
            <MdAdd className="text-slate-900 text-xl" />
          </button>
        </div>
      </div>

      {/* Active Tiers */}
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
        Active Shipping Tiers
      </p>

      <div className="space-y-3">
        <Tier range="₹0 - ₹500" badge="₹40 Shipping" />
        <Tier range="₹501 - ₹1,000" badge="₹20 Shipping" />
        <Tier range="Above ₹1,000" badge="FREE Shipping" highlight />
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Input({ label, placeholder }) {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-slate-500 mb-1 ml-1">
        {label}
      </label>
      <input
        type="number"
        placeholder={placeholder}
        className="w-full rounded-4xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-400 focus:ring-blue-400/20"
      />
    </div>
  );
}

function Tier({ range, badge, highlight }) {
  return (
    <div
      className={`group rounded-4xl border transition-all
        ${
          highlight
            ? "bg-[#FBFEF5] border-[#EAFCD0]"
            : "bg-white border-slate-100"
        }
      `}
    >
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4">
        
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-medium">
            Cart Value
          </span>
          <span className="text-sm font-bold text-slate-700">
            {range}
          </span>
        </div>

        <MdTrendingFlat className="text-slate-300 text-xl hidden sm:block" />

        <span
          className={`self-start sm:self-auto px-4 py-1.5 rounded-full text-xs font-black ${
            highlight
              ? "bg-[#A6F20D] text-slate-900"
              : "bg-blue-50 text-blue-600 border border-blue-100"
          }`}
        >
          {badge}
        </span>
      </div>

      {/* BOTTOM DELETE */}
      <div className="px-4 pb-3 flex justify-end">
        <button className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition text-slate-400 hover:text-red-500">
          <MdDelete className="text-lg" />
        </button>
      </div>
    </div>
  );
}
