



"use client";

import { useEffect } from "react";
import { useAdminDashboardStore } from "@/store/admin/dashboard/adminDashboard.store";

export default function StatCards() {
  const { stats, fetchDashboard } = useAdminDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const data = [
    {
      icon: "auto_stories",
      label: "BOOKS",
      value: stats?.total_book?.total_book_count || 0,
    },
    {
      icon: "event",
      label: "TODAY'S EVENTS",
      value: stats?.todays_event_count || 0,
    },
    {
      icon: "forum",
      label: "FEEDBACKS",
      value: stats?.feedback_count || 0,
    },
    {
      icon: "shopping_cart",
      label: "PENDING ORDERS",
      value: stats?.pending_order_count || 0,
    },
  ];

  return (
    <section
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5
        sm:gap-6
        lg:gap-8
        mb-12
        sm:mb-14
        lg:mb-16
      "
    >
      {data.map((item) => (
        <div
          key={item.label}
          className="
            bg-white
            rounded-[24px]
            sm:rounded-[26px]
            lg:rounded-[28px]
            p-6
            sm:p-7
            lg:p-8
            flex
            flex-col
            gap-5
            sm:gap-6
            shadow-[0_20px_50px_rgba(0,0,0,0.05)]
          "
        >
          {/* ICON */}
          <div
            className="
              w-11 h-11
              sm:w-12 sm:h-12
              rounded-full
              bg-[#46EC13]/10
              flex items-center justify-center
            "
          >
            <span
              className="
                material-symbols-outlined
                text-[#46EC13]
                text-[20px]
                sm:text-[22px]
              "
            >
              {item.icon}
            </span>
          </div>

          {/* TEXT */}
          <div>
            <p
              className="
                text-[10px]
                sm:text-[11px]
                tracking-[0.18em]
                font-extrabold
                text-gray-400
                mb-2
              "
            >
              {item.label}
            </p>

            <h2
              className="
                text-[28px]
                sm:text-[32px]
                lg:text-[36px]
                leading-none
                font-extrabold
                text-[#131811]
              "
            >
              {item.value}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
}