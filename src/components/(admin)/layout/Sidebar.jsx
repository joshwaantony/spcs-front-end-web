




"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin/adminAuth.store";

import {
  HiViewGrid,
  HiBookOpen,
  HiShoppingBag,
  HiCog,
  HiLogout,
  HiMenu,
  HiChevronDown,
  HiCollection,
  HiClipboardList,
  HiNewspaper,
  HiCalendar,
  HiPhotograph,
  HiDownload,
  HiArchive,
  HiFolderOpen,
  HiStar,
  HiChatAlt2,
} from "react-icons/hi";

import { HiOutlineTrophy } from "react-icons/hi2";
import { MdGroup, MdLocalOffer, MdCampaign } from "react-icons/md";

const ORDERS_MENU_STORAGE_KEY = "admin-sidebar-orders-open";
const ACTIVITY_MENU_STORAGE_KEY = "admin-sidebar-activity-open";

/* ================= NAV ITEM ================= */
function NavItem({ icon, label, active, onClick, indent = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left flex items-center gap-3
        ${indent ? "pl-10 pr-5 py-2.5" : "px-5 py-3"}
        rounded-full transition-all
        ${
          active
            ? "bg-[#46EC12] text-[#131811] font-bold"
            : "text-[#6b7280] hover:bg-[#46EC12] hover:text-[#131811] font-semibold"
        }
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

/* ================= SIDEBAR ================= */
export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // ✅ STORE
  const logout = useAdminAuthStore((state) => state.logout);

  const goTo = (path) => {
    router.push(`/admin${path}`);
    setOpen(false);
  };

  // ✅ UPDATED LOGOUT HANDLER (API + STORE)
  const handleLogout = async () => {
    try {
      await logout(); // call API + clear tokens
      setLogoutOpen(false);
      router.push("/admin/login"); // redirect
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedOrdersOpen =
      typeof window !== "undefined"
        ? window.localStorage.getItem(ORDERS_MENU_STORAGE_KEY)
        : null;
    const storedActivityOpen =
      typeof window !== "undefined"
        ? window.localStorage.getItem(ACTIVITY_MENU_STORAGE_KEY)
        : null;

    const isOrdersRoute = pathname.startsWith("/admin/orders");
    const isActivityRoute = [
      "/admin/books",
      "/admin/bulletin",
      "/admin/catalogue",
      "/admin/archives",
      "/admin/awards",
      "/admin/offers",
      "/admin/schemes",
      "/admin/events",
      "/admin/news",
      "/admin/gallery",
      "/admin/downloads",
      "/admin/ads",
    ].includes(pathname);

    setOrdersOpen(
      isOrdersRoute || storedOrdersOpen === "true"
    );
    setActivityOpen(
      isActivityRoute || storedActivityOpen === "true"
    );
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        ORDERS_MENU_STORAGE_KEY,
        String(ordersOpen)
      );
    }
  }, [ordersOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        ACTIVITY_MENU_STORAGE_KEY,
        String(activityOpen)
      );
    }
  }, [activityOpen]);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white shadow-sm">
        <h1 className="text-lg font-extrabold text-[#131811]">SPCS</h1>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <HiMenu size={22} />
        </button>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-64
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="bg-white h-full rounded-none lg:rounded-[24px] shadow border border-gray-50 flex flex-col px-8 pt-10 pb-8">

          {/* LOGO */}
          <div
            onClick={() => goTo("/dashboard")}
            className="flex items-center gap-3 px-2 cursor-pointer mb-8"
          >
            <div className="bg-[#46EC12] rounded-full w-10 h-10 flex items-center justify-center">
              <HiBookOpen size={20} className="text-[#131811]" />
            </div>
            <h1 className="text-xl font-extrabold text-[#131811]">
              SPCS
            </h1>
          </div>

          {/* NAV */}
          <nav className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">

            <NavItem icon={<HiViewGrid />} label="Dashboard" active={pathname === "/admin/dashboard"} onClick={() => goTo("/dashboard")} />

            <button
              onClick={() => setOrdersOpen(!ordersOpen)}
              className={`flex items-center justify-between px-5 py-3 rounded-full font-semibold transition-all ${
                pathname.startsWith("/admin/orders") || ordersOpen
                  ? "bg-[#46EC12] text-[#131811]"
                  : "text-[#6b7280] hover:bg-[#46EC12] hover:text-[#131811]"
              }`}
            >
              <div className="flex items-center gap-3">
                <HiShoppingBag className="text-lg" />
                <span className="text-sm">Orders</span>
              </div>
              <HiChevronDown className={`transition-transform ${ordersOpen ? "rotate-180" : ""}`} />
            </button>

            {ordersOpen && (
              <div className="flex flex-col gap-1">
                <NavItem icon={<HiBookOpen />} label="Book" indent active={pathname === "/admin/orders/book" || pathname === "/admin/orders"} onClick={() => goTo("/orders/book")} />
                <NavItem icon={<HiBookOpen />} label="Ebook" indent active={pathname === "/admin/orders/ebook"} onClick={() => goTo("/orders/ebook")} />
                <NavItem icon={<HiBookOpen />} label="Audiobook" indent active={pathname === "/admin/orders/audiobook"} onClick={() => goTo("/orders/audiobook")} />
              </div>
            )}

            <NavItem icon={<MdGroup />} label="Customers" active={pathname === "/admin/customer"} onClick={() => goTo("/customer")} />

            {/* ACTIVITY MENU */}
            <button
              onClick={() => setActivityOpen(!activityOpen)}
              className={`flex items-center justify-between px-5 py-3 rounded-full font-semibold transition-all ${
                activityOpen
                  ? "bg-[#46EC12] text-[#131811]"
                  : "text-[#6b7280] hover:bg-[#46EC12] hover:text-[#131811]"
              }`}
            >
              <div className="flex items-center gap-3">
                <HiCollection className="text-lg" />
                <span className="text-sm">Activity Menu</span>
              </div>
              <HiChevronDown className={`transition-transform ${activityOpen ? "rotate-180" : ""}`} />
            </button>

            {activityOpen && (
              <div className="flex flex-col gap-1">
                <NavItem icon={<HiBookOpen />} label="Books" indent active={pathname === "/admin/books"} onClick={() => goTo("/books")} />
                <NavItem icon={<HiNewspaper />} label="Bulletin" indent active={pathname === "/admin/bulletin"} onClick={() => goTo("/bulletin")} />
                <NavItem icon={<HiFolderOpen />} label="Catalogues" indent active={pathname === "/admin/catalogue"} onClick={() => goTo("/catalogue")} />
                <NavItem icon={<HiArchive />} label="Archives" indent active={pathname === "/admin/archives"} onClick={() => goTo("/archives")} />
                <NavItem icon={<HiOutlineTrophy />} label="Awards" indent active={pathname === "/admin/awards"} onClick={() => goTo("/awards")} />
                <NavItem icon={<MdLocalOffer />} label="Offers" indent active={pathname === "/admin/offers"} onClick={() => goTo("/offers")} />
                <NavItem icon={<HiClipboardList />} label="Schemes" indent active={pathname === "/admin/schemes"} onClick={() => goTo("/schemes")} />
                <NavItem icon={<HiCalendar />} label="Events" indent active={pathname === "/admin/events"} onClick={() => goTo("/events")} />
                <NavItem icon={<HiNewspaper />} label="News" indent active={pathname === "/admin/news"} onClick={() => goTo("/news")} />
                <NavItem icon={<HiPhotograph />} label="Gallery" indent active={pathname === "/admin/gallery"} onClick={() => goTo("/gallery")} />
                <NavItem icon={<HiDownload />} label="Downloads" indent active={pathname === "/admin/downloads"} onClick={() => goTo("/downloads")} />
                <NavItem icon={<MdCampaign />} label="Ads" indent active={pathname === "/admin/ads"} onClick={() => goTo("/ads")} />
              </div>
            )}

            <NavItem icon={<HiStar />} label="Reviews" active={pathname === "/admin/reviews"} onClick={() => goTo("/reviews")} />
            <NavItem icon={<HiChatAlt2 />} label="Feedback" active={pathname === "/admin/feedback"} onClick={() => goTo("/feedback")} />
            <NavItem icon={<HiCog />} label="Settings" active={pathname === "/admin/settings"} onClick={() => goTo("/settings")} />
          </nav>

          {/* LOGOUT */}
          <button
            onClick={() => setLogoutOpen(true)}
            className="mt-6 flex items-center gap-3 px-5 py-3 rounded-full text-[#6b7280] font-semibold hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <HiLogout size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* LOGOUT MODAL */}
      {logoutOpen && (
        <>
          <div className="fixed inset-0 z-[60] bg-[#131811]/45 backdrop-blur-sm" onClick={() => setLogoutOpen(false)} />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl border border-gray-100">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <HiLogout size={24} />
              </div>

              <div className="mt-5">
                <h2 className="text-2xl font-extrabold text-[#131811]">
                  Logout now?
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                  You will be signed out of the admin panel and need to log in again.
                </p>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setLogoutOpen(false)}
                  className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-[#4b5563] hover:bg-gray-50"
                >
                  Stay logged in
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Yes, logout
                </button>
              </div>

            </div>
          </div>
        </>
      )}

      <div className="lg:hidden h-14" />
    </>
  );
}
