



import { MdDelete } from "react-icons/md";

export default function DiscountRulesCard() {
  return (
    <div className="bg-white rounded-4xl p-5 sm:p-6 lg:p-8 custom-shadow border border-slate-100">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-2 bg-[#EFFCD8] rounded-[12px]">
          <span className="material-symbols-outlined text-slate-800 text-lg sm:text-xl">
            percent
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Price-Based Discounts
        </h2>
      </div>

      {/* Add New Rule */}
      <div className="bg-slate-50 rounded-4xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Add New Rule
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <Input label="Min Price (₹)" placeholder="0" />
          <Input label="Max Price (₹)" placeholder="1000" />
          <Input label="Value (%)" placeholder="5" />

          {/* Add Button */}
          <button className="h-11 w-full lg:w-11 lg:rounded-full rounded-2xl bg-[#A6F20D] flex items-center justify-center shadow-lg hover:scale-105 transition">
            <span className="material-symbols-outlined font-bold">
              add
            </span>
          </button>
        </div>
      </div>

      {/* Active Discount Logic */}
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
        Active Discount Logic
      </p>

      <div className="space-y-3">
        <RuleRow range="₹1,001 - ₹2,000" value="15% OFF" />
        <RuleRow range="₹2,001 - ₹5,000" value="20% OFF" highlight />
        <RuleRow range="Above ₹5,000" value="25% OFF" inactive />
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
        className="w-full bg-white border border-slate-200 rounded-4xl px-4 py-2.5 text-sm focus:border-primary focus:ring-primary/20"
      />
    </div>
  );
}

function RuleRow({ range, value, inactive, highlight }) {
  return (
    <div
      className={`group rounded-4xl border transition-all
        bg-white border-[#F1F5F9]
        ${inactive ? "opacity-60" : "hover:border-[#A6F20D]"}
      `}
    >
      {/* TOP CONTENT */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4">
        
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-medium">
            Orders
          </span>
          <span className="text-sm font-bold text-slate-700">
            {range}
          </span>
        </div>

        <span className="material-symbols-outlined text-slate-300 hidden sm:block">
          trending_flat
        </span>

        <span
          className={`self-start sm:self-auto px-4 py-1.5 rounded-full text-xs font-black
            ${
              inactive
                ? "bg-[#F7F9FB] text-slate-500"
                : highlight
                ? "bg-[#A6F20D] text-slate-900"
                : "bg-[#EFFCD8] text-slate-900"
            }
          `}
        >
          {value}
        </span>
      </div>

      {/* BOTTOM DELETE / STATUS */}
      {!inactive ? (
        <div className="px-4 pb-3 flex justify-end">
          <button className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition text-slate-400 hover:text-red-500">
            <MdDelete className="text-lg" />
          </button>
        </div>
      ) : (
        <div className="px-4 pb-3 text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Inactive
          </span>
        </div>
      )}
    </div>
  );
}
