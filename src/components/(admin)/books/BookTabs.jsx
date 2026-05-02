
import { useState } from "react";
import CategoryCreateModal from "@/components/(admin)/books/CategoryCreateModal";

export default function BookTabs({
  active = "all",
  onTabChange = () => {},
}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1 border-b border-[#DEE6DB]">
          <div
            className="
              flex gap-6 sm:gap-8
              overflow-x-auto
              scrollbar-hide
              px-2 sm:px-0
            "
          >
            <TabButton
              label="All Books"
              isActive={active === "all"}
              onClick={() => onTabChange("all")}
            />
            <TabButton
              label="Bestsellers"
              isActive={active === "bestsellers"}
              onClick={() => onTabChange("bestsellers")}
            />
            <TabButton
              label="Recently Added"
              isActive={active === "recent"}
              onClick={() => onTabChange("recent")}
            />
            <TabButton
              label="Category"
              isActive={active === "category"}
              onClick={() => onTabChange("category")}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          disabled={active !== "category"}
          className="
            flex shrink-0 items-center justify-center gap-2
            rounded-full
            bg-[#46EC12] px-5 py-2.5
            text-xs font-bold text-[#141810]
            transition hover:opacity-90
            sm:px-7 sm:py-3 sm:text-sm
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
            add_circle
          </span>
          Create Category
        </button>
      </div>

      <CategoryCreateModal
        isOpen={isCreateOpen && active === "category"}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
}

/* 🔹 Reusable Tab Button */
function TabButton({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        whitespace-nowrap
        pb-3
        text-sm
        font-bold
        transition-colors
        ${
          isActive
            ? "text-[#131811] border-b-[3px] border-[#46EC13]"
            : "text-[#131811]/40 border-b-[3px] border-transparent hover:text-[#131811]"
        }
      `}
    >
      {label}
    </button>
  );
}
