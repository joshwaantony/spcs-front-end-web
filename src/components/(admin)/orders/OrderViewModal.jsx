"use client";

import { HiX } from "react-icons/hi";

const formatDate = (value) => {
  if (!value) {
    return "--";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatAmount = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

function MetaCard({ label, value }) {
  return (
    <div className="rounded-[22px] border border-[#e8ede0] bg-[#fbfdf7] p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-[#141810]">
        {value || "--"}
      </p>
    </div>
  );
}

function StatusBadge({ label, tone = "gray" }) {
  const toneMap = {
    green: "border-emerald-100 bg-emerald-50 text-emerald-700",
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    yellow: "border-yellow-100 bg-yellow-50 text-yellow-700",
    gray: "border-gray-200 bg-gray-50 text-gray-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] ${toneMap[tone]}`}
    >
      {label || "--"}
    </span>
  );
}

export default function OrderViewModal({
  isOpen,
  order,
  loading,
  error,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-[#141810]/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[90] overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-[#f8faf7] shadow-[0_40px_120px_-40px_rgba(20,24,16,0.45)]">
            <div className="flex items-center justify-between border-b border-[#e9eee3] bg-white/80 px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8a63]">
                  Order response
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#141810]">
                  View Order
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#edf1e8] bg-white text-[#6B7280] transition hover:text-[#141810]"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            {loading ? (
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.92fr]">
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-24 animate-pulse rounded-[24px] bg-white"
                    />
                  ))}
                </div>
                <div className="h-[420px] animate-pulse rounded-[28px] bg-white" />
              </div>
            ) : error ? (
              <div className="p-6 sm:p-8">
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              </div>
            ) : order ? (
              <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="border-b border-[#e9eee3] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="rounded-[28px] border border-[#dfe8d2] bg-[linear-gradient(135deg,#f6fde9_0%,#eef7de_55%,#ffffff_100%)] p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                          Order ID
                        </p>
                        <h3 className="mt-3 break-all text-2xl font-black text-[#141810]">
                          {order.order_id}
                        </h3>
                      </div>

                      <StatusBadge label={order.status} tone="green" />
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <MetaCard
                        label="Transaction ID"
                        value={order.transaction_id}
                      />
                      <MetaCard
                        label="Order Date"
                        value={formatDate(order.order_date)}
                      />
                      <MetaCard
                        label="Total"
                        value={formatAmount(order.payment?.total)}
                      />
                    </div>
                  </div>

                  <div className="mt-6 rounded-[28px] border border-[#e8ede0] bg-white p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                      Payment summary
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <MetaCard
                        label="Subtotal"
                        value={formatAmount(order.payment?.subtotal)}
                      />
                      <MetaCard
                        label="Discount"
                        value={formatAmount(order.payment?.discount)}
                      />
                      <MetaCard
                        label="Shipping Charge"
                        value={formatAmount(order.payment?.shipping_charge)}
                      />
                      <MetaCard
                        label="Grand Total"
                        value={formatAmount(order.payment?.total)}
                      />
                    </div>
                  </div>

                  <div className="mt-6 rounded-[28px] border border-[#e8ede0] bg-white p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                      Customer info
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <MetaCard label="Name" value={order.user_info?.name} />
                      <MetaCard label="Phone" value={order.user_info?.phone} />
                      <MetaCard label="Email" value={order.user_info?.email} />
                      <MetaCard
                        label="Items Count"
                        value={String(order.order_items?.length || 0)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f2f8ea_100%)] p-6 sm:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                    Ordered items
                  </p>

                  <div className="mt-5 rounded-[30px] border border-[#e4ebda] bg-white p-6 shadow-[0_24px_70px_-32px_rgba(20,24,16,0.35)]">
                    <div className="space-y-4">
                      {(order.order_items || []).map((item, index) => (
                        <div
                          key={`${item.name}-${index}`}
                          className="rounded-[24px] border border-[#e8ede0] bg-[#fbfdf7] p-5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                                Item {index + 1}
                              </p>
                              <h3 className="mt-2 text-lg font-black text-[#141810]">
                                {item.name}
                              </h3>
                            </div>

                            <StatusBadge
                              label={`Qty ${item.quantity}`}
                              tone="yellow"
                            />
                          </div>

                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <MetaCard
                              label="Unit Price"
                              value={formatAmount(item.price)}
                            />
                            <MetaCard
                              label="Line Total"
                              value={formatAmount(
                                Number(item.price || 0) *
                                  Number(item.quantity || 0)
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-[24px] border border-[#e8ede0] bg-white p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7b8a63]">
                        Shipping address
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#141810]">
                        {order.shipping_address?.name || "--"}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                        {order.shipping_address?.address || "--"}
                      </p>
                      <p className="mt-2 text-sm text-[#4B5563]">
                        {order.shipping_address?.district || "--"},{" "}
                        {order.shipping_address?.state || "--"}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#141810]">
                        PIN: {order.shipping_address?.pin_code || "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
