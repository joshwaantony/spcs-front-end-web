



export default function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
      
      {/* LEFT CONTENT */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black leading-tight">
          Store Logic Configuration
        </h1>
        <p className="mt-1 text-sm sm:text-base lg:text-lg text-slate-500">
          Manage automatic discounts and shipping calculation rules.
        </p>
      </div>

      {/* ACTION BUTTON */}
      <button
        className="
          w-full sm:w-auto
          flex items-center justify-center gap-2
          px-5 sm:px-6 py-2.5
          bg-white border border-[#E2E8F0]
          rounded-full
          text-sm font-bold
          hover:bg-slate-50
          transition
        "
      >
        <span className="material-symbols-outlined text-base">
          history
        </span>
        View Audit Logs
      </button>
    </div>
  );
}
