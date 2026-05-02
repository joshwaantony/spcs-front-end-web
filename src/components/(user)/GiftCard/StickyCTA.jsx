export default function StickyCTA() {
  return (
    <div className="sticky bottom-6 md:bottom-8 lg:bottom-10 z-40 px-3">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          bg-white
          rounded-2xl
          shadow-[0_14px_36px_rgba(0,0,0,0.14)]
          px-4 sm:px-6 lg:px-8
          py-4 sm:py-5 lg:py-6
          flex flex-col sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4 sm:gap-6
        "
      >
        {/* Left: Total */}
        <div className="text-center sm:text-left">
          <p className="text-xs sm:text-sm font-bold text-[#618972] uppercase tracking-wide">
            Total Payable
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            ₹500.00
          </p>
        </div>

        {/* CTA */}
        <button
          className="
            w-full sm:w-auto
            bg-green-500
            hover:bg-green-600
            text-white
            px-6 sm:px-8 lg:px-10
            py-3 sm:py-3.5 lg:py-4
            rounded-full
            font-semibold
            text-sm sm:text-base
            flex items-center justify-center gap-2
            transition
          "
        >
          Proceed to Pay
          <span className="material-symbols-outlined text-base sm:text-lg">
            lock
          </span>
        </button>
      </div>
    </div>
  );
}
