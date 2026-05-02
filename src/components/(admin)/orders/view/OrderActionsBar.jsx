


"use client";

export default function OrderActionsBar({ order }) {
  return (
    <div className="sticky top-0 z-20 px-3 sm:px-4 lg:px-6 pt-3 pb-4 backdrop-blur-md border-b border-gray-100 ">

      <div
        className="
          w-full
          bg-white
          rounded-2xl
          border border-gray-200
          shadow-sm
          p-4 sm:p-5
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >

        {/* LEFT CONTENT */}
        <div className="flex items-start sm:items-center gap-3 w-full">

          {/* Icon */}
          <div className="shrink-0 bg-green-50 p-2 sm:p-3 rounded-full">
            <span className="material-symbols-outlined text-[#46EC12] text-[18px] sm:text-[20px]">
              receipt_long
            </span>
          </div>

          {/* Text Content */}
          <div className="min-w-0">
            <p className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-900 break-words">
              Total Paid: {order?.payment?.currency}{" "}
              {order?.payment?.totalPaid} /-
            </p>

            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1 max-w-md">
              Payment summary for this order.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE OPTIONAL INFO (Responsive Safe Placeholder) */}
        <div className="text-xs sm:text-sm text-gray-400 font-medium sm:text-right w-full sm:w-auto">
          Order ID:{" "}
          <span className="font-bold text-gray-700 break-all">
            {order?.id}
          </span>
        </div>

      </div>
    </div>
  );
}