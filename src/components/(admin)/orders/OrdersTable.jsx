





"use client";

import { useState, useRef, useEffect } from "react";
import OrderDeleteConfirmModal from "@/components/(admin)/orders/OrderDeleteConfirmModal";
import OrderViewModal from "@/components/(admin)/orders/OrderViewModal";
import { useOrdersStore } from "@/store/admin/orders/orders.store";

const formatOrderDate = (value) => {
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
  }).format(date);
};

const formatAmount = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const getCustomerName = (order) => order?.customer_name || order?.user_name || "--";

const getOrderDate = (order) => order?.order_date || order?.created_at || "";

/* ================= MAIN TABLE ================= */
export default function OrdersTable() {
  const {
    orders,
    loading,
    error,
    selectedOrder,
    detailLoading,
    detailError,
    actionLoadingId,
    actionError,
    clearOrderDetail,
  } = useOrdersStore();
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  useEffect(() => {
    const handleRequestDelete = (event) => {
      setDeleteCandidate(event.detail);
    };

    window.addEventListener("orders:request-delete", handleRequestDelete);

    return () => {
      window.removeEventListener("orders:request-delete", handleRequestDelete);
    };
  }, []);

  if (loading) {
    return (
      <div className="px-4 pb-12">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="animate-pulse divide-y divide-gray-100">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 px-6 py-5"
              >
                {Array.from({ length: 6 }).map((__, cellIndex) => (
                  <div key={cellIndex} className="h-4 rounded bg-gray-100" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pb-12">
        <div className="rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="px-4 pb-12">
        <div className="rounded-xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center text-sm font-medium text-gray-500">
          No orders found for the selected filters.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-12">
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">

        {/* ================= DESKTOP TABLE ================= */}
        <table className="w-full text-left hidden md:table">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Order ID", "Customer", "Date", "Amount", "Status", "Action"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <DesktopRow
                key={order.order_id}
                id={order.order_id}
                name={getCustomerName(order)}
                date={formatOrderDate(getOrderDate(order))}
                amount={formatAmount(order.amount)}
                status={order.status}
              />
            ))}
          </tbody>
        </table>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden divide-y">
          {orders.map((order) => (
            <MobileRow
              key={order.order_id}
              id={order.order_id}
              name={getCustomerName(order)}
              date={formatOrderDate(getOrderDate(order))}
              amount={formatAmount(order.amount)}
              status={order.status}
            />
          ))}
        </div>
      </div>

      <OrderViewModal
        isOpen={detailLoading || !!selectedOrder || !!detailError}
        order={selectedOrder}
        loading={detailLoading}
        error={detailError}
        onClose={clearOrderDetail}
      />

      <OrderDeleteConfirmModal
        isOpen={!!deleteCandidate}
        order={deleteCandidate}
        deleting={actionLoadingId === deleteCandidate?.id}
        onClose={() => setDeleteCandidate(null)}
        onConfirm={() => {
          if (deleteCandidate?.onConfirm) {
            deleteCandidate.onConfirm().finally(() => {
              setDeleteCandidate(null);
            });
          }
        }}
      />

      {actionError && (
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {actionError}
        </div>
      )}
    </div>
  );
}

/* ================= STATUS BADGE ================= */
function StatusBadge({ status }) {
  const styles = {
    shipped: "bg-blue-50 text-blue-600",
    pending: "bg-orange-50 text-orange-600",
    completed: "bg-emerald-50 text-emerald-600",
    fulfill: "bg-emerald-50 text-emerald-600",
    cancelled: "bg-red-50 text-red-600",
    cancel: "bg-red-50 text-red-600",
  };
  const normalizedStatus = String(status || "").toLowerCase();

  return (
    <span
      className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-bold uppercase ${
        styles[normalizedStatus] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "--"}
    </span>
  );
}

/* ================= ACTION PANEL ================= */
function RevealActions({ status, orderId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const {
    fetchOrderDetail,
    deleteOrder,
    toggleOrderStatus,
    actionLoadingId,
  } = useOrdersStore();

  useEffect(() => {
    if (!open || !ref.current) {
      return;
    }

    const updatePosition = () => {
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const menuWidth = 220;

      setMenuPosition({
        top: rect.bottom + 8,
        left: Math.max(12, rect.right - menuWidth),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const normalizedStatus = String(status || "").toLowerCase();
  const isCompleted = normalizedStatus === "completed";
  const isPending = normalizedStatus === "pending";
  const isActionLoading = actionLoadingId === orderId;

  const handleView = async (targetOrderId) => {
    setOpen(false);

    try {
      await fetchOrderDetail(targetOrderId);
    } catch (error) {
      console.error("Fetch order detail failed:", error);
    }
  };

  const handleStatusUpdate = async (nextStatus) => {
    try {
      await toggleOrderStatus({
        order_id: orderId,
        status: nextStatus,
      });
      setOpen(false);
    } catch (error) {
      console.error("Update order status failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteOrder(orderId);
      setOpen(false);
    } catch (error) {
      console.error("Delete order failed:", error);
    }
  };

  return (
    <div ref={ref} className="relative flex justify-end items-center">
      <button
        onClick={() => setOpen((current) => !current)}
        className="rounded-full p-2 transition hover:bg-gray-100"
      >
        <span className="material-symbols-outlined text-[20px] text-gray-500">
          more_vert
        </span>
      </button>

      {open && (
        <div
          className="fixed z-[90] w-[220px] rounded-2xl border border-gray-200 bg-white p-3 shadow-xl"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
          }}
        >
          <div className="flex flex-col gap-1">
          <ActionBtn
            label="View"
            color="text-gray-700"
            disabled={isActionLoading}
            onClick={() => handleView(orderId)}
          />

          <ActionBtn
            label="Fulfill"
            color="text-blue-600"
            disabled={isCompleted || isActionLoading}
            onClick={() => handleStatusUpdate("fulfill")}
          />

          <ActionBtn
            label="Cancel"
            color="text-yellow-600"
            disabled={!isPending || isActionLoading}
            onClick={() => handleStatusUpdate("cancel")}
          />

          <ActionBtn
            label="Delete"
            color="text-red-600"
            disabled={isActionLoading}
            onClick={() => {
              const row = ref.current?.closest("tr, div");
              const rowName =
                row?.querySelector("[data-order-customer]")?.textContent || "";

              window.dispatchEvent(
                new CustomEvent("orders:request-delete", {
                  detail: {
                    id: orderId,
                    name: rowName,
                    onConfirm: handleDelete,
                  },
                })
              );
              setOpen(false);
            }}
          />
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtn({ label, color, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : `${color} hover:bg-gray-50`
      }`}
    >
      {label}
    </button>
  );
}

/* ================= DESKTOP ROW ================= */
function DesktopRow({ id, name, date, amount, status }) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-5 font-extrabold text-sm text-black">{id}</td>

      <td className="px-6 py-5">
        <span data-order-customer className="font-bold text-sm text-black">
          {name}
        </span>
      </td>

      <td className="px-6 py-5 text-sm font-medium text-gray-500">{date}</td>

      <td className="px-6 py-5 text-base font-extrabold text-black">{amount}</td>

      <td className="px-6 py-5">
        <StatusBadge status={status} />
      </td>

      <td className="px-6 py-5">
        <RevealActions status={status} orderId={id} />
      </td>
    </tr>
  );
}

/* ================= MOBILE ROW ================= */
function MobileRow({ id, name, date, amount, status }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-extrabold text-sm text-black">{id}</span>
        <StatusBadge status={status} />
      </div>

      <div>
        <p data-order-customer className="font-bold text-sm text-black">
          {name}
        </p>
        <p className="mt-1 text-xs font-medium text-gray-500">{date}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-base font-extrabold text-black">{amount}</span>
        <RevealActions status={status} orderId={id} />
      </div>
    </div>
  );
}
