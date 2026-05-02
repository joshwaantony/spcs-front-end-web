


"use client";

/* ================= MONEY FORMAT ================= */
function money(n, currency = "Rs") {
  return `${currency} ${n} /-`;
}

/* ================= DESKTOP ROW ================= */
function ItemRow({ item, currency }) {
  const total = item.qty * item.unitPrice;

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={item.image}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-gray-100 shrink-0"
            alt={item.title}
          />
          <div className="min-w-0">
            <p className="font-extrabold text-xs sm:text-sm text-gray-900 truncate">
              {item.title}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
              Item #{item.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-900">
        {item.qty}
      </td>

      <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-900 break-all">
        {money(item.unitPrice, currency)}
      </td>

      <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-extrabold text-gray-900 break-all">
        {money(total, currency)}
      </td>

      <td className="px-4 sm:px-6 py-4 text-right">
        <button className="rounded-full px-3 sm:px-4 py-2 text-xs font-extrabold border border-gray-200 hover:bg-gray-50 transition whitespace-nowrap">
          View Book
        </button>
      </td>
    </tr>
  );
}

/* ================= MOBILE CARD ================= */
function MobileItemCard({ item, currency }) {
  const total = item.qty * item.unitPrice;

  return (
    <div className="p-4 flex gap-3">
      <img
        src={item.image}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-gray-100 shrink-0"
        alt={item.title}
      />

      <div className="flex-1 min-w-0">
        <p className="font-extrabold text-sm text-gray-900 truncate">
          {item.title}
        </p>

        <p className="text-[11px] text-gray-400 font-medium mt-1">
          Item #{item.id}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              Qty
            </p>
            <p className="text-gray-900 font-extrabold mt-1">
              {item.qty}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              Total
            </p>
            <p className="text-gray-900 font-extrabold mt-1 break-all">
              {money(total, currency)}
            </p>
          </div>
        </div>

        <button className="mt-4 rounded-full w-full px-4 py-2.5 text-xs sm:text-sm font-extrabold border border-gray-200 hover:bg-gray-50 transition">
          View Book
        </button>
      </div>
    </div>
  );
}

/* ================= MAIN SECTION ================= */
export default function OrderItems({ order }) {
  const currency = order?.payment?.currency;

  const itemsTotal =
    order?.items?.reduce(
      (sum, i) => sum + i.qty * i.unitPrice,
      0
    ) || 0;

  return (
    <section className="
      bg-white
      rounded-2xl
      border border-gray-200
      shadow-sm
      overflow-hidden
    ">

      {/* HEADER */}
      <div className="
        px-4 sm:px-5 py-4
        border-b border-gray-100
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-2
      ">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-400 text-[18px]">
            inventory_2
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
            Order Items
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-gray-400 font-medium">
          Items Total:{" "}
          <span className="text-gray-900 font-extrabold break-all">
            {money(itemsTotal, currency)}
          </span>
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Item", "Qty", "Unit Price", "Line Total", "Action"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 sm:px-6 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {order?.items?.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                currency={currency}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden divide-y">
        {order?.items?.map((item) => (
          <MobileItemCard
            key={item.id}
            item={item}
            currency={currency}
          />
        ))}
      </div>

    </section>
  );
}