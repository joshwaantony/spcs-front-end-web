




"use client";

/* ================= CARD ================= */
function InfoCard({ title, icon, children }) {
  return (
    <div className="
      bg-white
      rounded-2xl
      border border-gray-200
      shadow-sm
      p-4 sm:p-5 lg:p-6
      h-full
    ">
      <div className="flex items-center gap-2 sm:gap-3 mb-4">
        <span className="material-symbols-outlined text-gray-400 text-[18px] sm:text-[20px]">
          {icon}
        </span>
        <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
}

/* ================= ROW ================= */
function Row({ label, value, strong }) {
  return (
    <div className="flex items-start sm:items-center justify-between gap-3 py-2">
      <p className="text-xs sm:text-sm text-gray-400 font-medium">
        {label}
      </p>
      <p
        className={`text-xs sm:text-sm break-all ${
          strong ? "font-extrabold" : "font-semibold"
        } text-gray-900`}
      >
        {value}
      </p>
    </div>
  );
}

/* ================= MAIN GRID ================= */
export default function OrderInfoGrid({ order }) {
  const payment = order?.payment;
  const contact = order?.contact;
  const shipping = order?.shipping;

  return (
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-4 sm:gap-5
    ">

      {/* ================= PAYMENT ================= */}
      <InfoCard title="Payment Summary" icon="payments">

        <div className="divide-y divide-gray-100">
          <Row
            label="Order Total"
            value={`${payment?.currency} ${payment?.orderTotal} /-`}
          />
          <Row
            label="Discount"
            value={`${payment?.currency} ${payment?.discount} /-`}
          />
          <Row
            label="Shipping Charge"
            value={`${payment?.currency} ${payment?.shippingCharge} /-`}
          />
        </div>

        <div className="
          mt-5
          rounded-xl
          bg-gray-50
          border border-gray-100
          p-4
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
        ">
          <p className="text-sm font-extrabold text-gray-500">
            Total Paid
          </p>

          <p className="text-lg sm:text-xl font-extrabold text-green-600 break-all">
            {payment?.currency} {payment?.totalPaid} /-
          </p>
        </div>

      </InfoCard>

      {/* ================= CONTACT ================= */}
      <InfoCard title="Customer Contact" icon="person">

        <p className="text-base sm:text-lg font-extrabold text-gray-900 break-words">
          {contact?.name}
        </p>

        <div className="mt-4 space-y-3">

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-400 text-base">
              call
            </span>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 break-all">
              {contact?.phone}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-400 text-base">
              mail
            </span>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 break-all">
              {contact?.email}
            </p>
          </div>

        </div>

        <button className="
          mt-5
          w-full
          rounded-full
          border border-gray-200
          bg-white
          hover:bg-gray-50
          transition
          px-4
          py-2.5
          text-xs sm:text-sm
          font-bold
          text-gray-900
        ">
          Message Customer
        </button>

      </InfoCard>

      {/* ================= SHIPPING ================= */}
      <InfoCard title="Shipping Address" icon="local_shipping">

        <p className="text-base sm:text-lg font-extrabold text-gray-900 break-words">
          {shipping?.name}
        </p>

        <div className="mt-3 text-xs sm:text-sm font-semibold text-gray-900 leading-6 break-words">
          {shipping?.addressLines?.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}

          <p className="mt-2">
            <span className="text-gray-400 font-medium">
              Pin code:
            </span>{" "}
            <span className="font-extrabold">
              {shipping?.pinCode}
            </span>
          </p>
        </div>

        <div className="
          mt-5
          flex
          flex-col
          sm:flex-row
          gap-2
        ">

          <button className="
            w-full
            sm:w-auto
            rounded-full
            border border-gray-200
            bg-white
            hover:bg-gray-50
            transition
            px-4
            py-2.5
            text-xs sm:text-sm
            font-bold
            text-gray-900
          ">
            Copy Address
          </button>

          <button className="
            w-full
            sm:w-auto
            rounded-full
            bg-[#1F2838]
            text-white
            hover:brightness-110
            transition
            px-4
            py-2.5
            text-xs sm:text-sm
            font-extrabold
          ">
            Print Label
          </button>

        </div>

      </InfoCard>

    </div>
  );
}