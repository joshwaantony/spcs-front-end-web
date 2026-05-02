

"use client";

import { useRouter } from "next/navigation";

/* ================= STATUS PILL ================= */
function StatusPill({ status }) {
  const map = {
    PENDING: "bg-orange-50 text-orange-700 border-orange-100",
    FULFILLED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    SHIPPED: "bg-blue-50 text-blue-700 border-blue-100",
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    CANCELED: "bg-red-50 text-red-700 border-red-100",
    REFUNDED: "bg-purple-50 text-purple-700 border-purple-100",
  };

  const cls = map[status] || "bg-gray-50 text-gray-700 border-gray-100";

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-extrabold border whitespace-nowrap ${cls}`}
    >
      <span className="size-2 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

/* ================= META ITEM ================= */
function MetaItem({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gray-400 font-bold">
        {label}
      </p>
      <p className="text-sm sm:text-base font-extrabold text-gray-900 break-all">
        {value}
      </p>
    </div>
  );
}

/* ================= MAIN HEADER ================= */
export default function OrderViewHeader({ order }) {
  const router = useRouter();

  return (
    <header className="w-full mb-6 px-4 sm:px-6 lg:px-8">

      {/* Top Section */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-start gap-3 sm:gap-4">

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="bg-white size-9 sm:size-10 rounded-full flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-50 transition shrink-0"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-gray-500 text-[18px] sm:text-[20px]">
              arrow_back
            </span>
          </button>

          {/* Title */}
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-black tracking-tight">
              Order Details
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1 max-w-md">
              View payment, customer, shipping, and items for this order.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">

          {/* Status */}
          <div className="flex-1 lg:flex-none flex justify-start lg:justify-end">
            <StatusPill status={order.status} />
          </div>

          {/* Notification Button */}
          <button className="relative bg-white size-9 sm:size-10 rounded-full flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-50 transition shrink-0">
            <span className="material-symbols-outlined text-gray-500 text-[18px] sm:text-[20px]">
              notifications
            </span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* META STRIP */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">

        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-5
        ">
          <MetaItem label="Order ID" value={order.orderId} />
          <MetaItem label="Transaction ID" value={order.transactionId} />
          <MetaItem label="Order Date" value={order.orderDate} />
          <MetaItem label="Route ID" value={order.id} />
        </div>

      </div>
    </header>
  );
}