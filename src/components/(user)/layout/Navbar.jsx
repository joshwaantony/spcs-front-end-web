




"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
          <div className="flex items-center justify-between h-20 gap-8">
            {/* ===== LEFT : MENU + LOGO ===== */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100"
              >
                <span className="material-symbols-outlined text-2xl">
                  menu
                </span>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="size-10 bg-[#1193d4] rounded-lg flex items-center justify-center text-white shadow-sm">
                  <span className="material-symbols-outlined text-2xl">
                    menu_book
                  </span>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                    SPCS
                  </h1>
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.15em] uppercase mt-0.5">
                    NBS INDIA
                  </span>
                </div>
              </Link>
            </div>

            {/* ===== DESKTOP MENU ===== */}
            <div className="hidden md:flex items-center gap-8">
              <NavItem text="Home" href="/home" pathname={pathname} />
              <NavItem text="About" href="/about-us" pathname={pathname} />
              <NavItem text="Krithi" href="/krithi" pathname={pathname} />
              <NavItem
                text="Aksharam Museum"
                href="/aksharam-museum"
                pathname={pathname}
              />
              <NavItem
                text="Book Store"
                href="/book-store"
                pathname={pathname}
              />
              <NavItem
                text="Gift Card"
                href="/gift-card"
                pathname={pathname}
              />

              {/* SALES */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#1193d4]">
                  Sales
                  <span className="material-symbols-outlined text-[18px]">
                    expand_more
                  </span>
                </button>

                <div className="absolute left-0 top-full mt-3 w-56 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <DropdownItem
                    text="Pre Publication"
                    href="/sales/pre-order"
                    pathname={pathname}
                  />
                  <DropdownItem
                    text="Schemes"
                    href="/sales/scheme"
                    pathname={pathname}
                  />
                  <DropdownItem
                    text="Branches"
                    href="/sales/branches"
                    pathname={pathname}
                  />
                </div>
              </div>

              {/* PROGRAMS */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#1193d4]">
                  Programs
                  <span className="material-symbols-outlined text-[18px]">
                    expand_more
                  </span>
                </button>

                <div className="absolute left-0 top-full mt-3 w-56 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <DropdownItem
                    text="News"
                    href="/programs/news"
                    pathname={pathname}
                  />
                  <DropdownItem
                    text="Events"
                    href="/programs/events"
                    pathname={pathname}
                  />
                  <DropdownItem
                    text="Downloads"
                    href="/programs/downloads"
                    pathname={pathname}
                  />
                  <DropdownItem
                    text="Awards"
                    href="/programs/awards"
                    pathname={pathname}
                  />
                  <DropdownItem
                    text="Gallery"
                    href="/programs/gallery"
                    pathname={pathname}
                  />
                </div>
              </div>

              <NavItem
                text="Contact Us"
                href="/contact-us"
                pathname={pathname}
              />
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="p-2 rounded-full hover:bg-slate-100"
              >
                <span className="material-symbols-outlined">person</span>
              </Link>
              <Link
                href="/cart"
                className="p-2 rounded-full hover:bg-slate-100"
              >
                <span className="material-symbols-outlined">
                  shopping_cart
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= BACKDROP ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-[82px] border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col px-5 py-4 gap-4">
          <DrawerItem
            text="Home"
            href="/home"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
          <DrawerItem
            text="About"
            href="/about-us"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
          <DrawerItem
            text="Krithi"
            href="/krithi"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
          <DrawerItem
            text="Aksharam Museum"
            href="/aksharam-museum"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
          <DrawerItem
            text="Book Store"
            href="/book-store"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
          <DrawerItem
            text="Gift Card"
            href="/gift-card"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />

          {/* SALES */}
          <button
            onClick={() => {
              setSalesOpen(!salesOpen);
              setProgramsOpen(false);
            }}
            className="flex justify-between text-base font-medium text-slate-700"
          >
            Sales
            <span className="material-symbols-outlined">
              {salesOpen ? "expand_less" : "expand_more"}
            </span>
          </button>

          {salesOpen && (
            <div className="ml-4 flex flex-col gap-3">
              <DrawerItem
                text="Pre Publication"
                href="/sales/pre-order"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
              <DrawerItem
                text="Schemes"
                href="/sales/scheme"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
              <DrawerItem
                text="Branches"
                href="/sales/branches"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
            </div>
          )}

          {/* PROGRAMS */}
          <button
            onClick={() => {
              setProgramsOpen(!programsOpen);
              setSalesOpen(false);
            }}
            className="flex justify-between text-base font-medium text-slate-700"
          >
            Programs
            <span className="material-symbols-outlined">
              {programsOpen ? "expand_less" : "expand_more"}
            </span>
          </button>

          {programsOpen && (
            <div className="ml-4 flex flex-col gap-3">
              <DrawerItem
                text="News"
                href="/programs/news"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
              <DrawerItem
                text="Events"
                href="/programs/events"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
              <DrawerItem
                text="Downloads"
                href="/programs/downloads"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
              <DrawerItem
                text="Awards"
                href="/programs/awards"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
              <DrawerItem
                text="Gallery"
                href="/programs/gallery"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
            </div>
          )}

          <DrawerItem
            text="Contact Us"
            href="/contact-us"
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
        </div>
      </aside>
    </>
  );
}

/* ================= SMALL COMPONENTS ================= */

const NavItem = ({ text, href, pathname }) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm transition ${
        isActive
          ? "text-[#1193d4] font-bold"
          : "text-slate-600 font-medium hover:text-[#1193d4]"
      }`}
    >
      {text}
    </Link>
  );
};

const DropdownItem = ({ text, href, pathname }) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-4 py-3 text-sm transition ${
        isActive
          ? "text-[#1193d4] font-bold bg-slate-50"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      {text}
    </Link>
  );
};

const DrawerItem = ({ text, href, onClick, pathname }) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-base transition ${
        isActive
          ? "text-[#1193d4] font-bold"
          : "text-slate-700 font-medium hover:text-[#1193d4]"
      }`}
    >
      {text}
    </Link>
  );
};
