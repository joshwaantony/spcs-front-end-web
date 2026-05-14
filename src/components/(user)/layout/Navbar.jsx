"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  Menu,
  ShoppingCart,
  User,
  X,
} from "lucide-react";

const STORE_LINKS = [
  {
    text: "All Books",
    href: "/book-store",
    description: "Browse the complete bookstore shelf",
  },
  {
    text: "E-Books",
    href: "/e-book",
    description: "Digital-first reading picks",
  },
  {
    text: "Audiobooks",
    href: "/audio-book",
    description: "Listen-ready story collection",
  },
];

const SALES_LINKS = [
  { text: "Pre Publication", href: "/sales/pre-order" },
  { text: "Schemes", href: "/sales/scheme" },
  { text: "Branches", href: "/sales/branches" },
];

const PROGRAM_LINKS = [
  { text: "News", href: "/programs/news" },
  { text: "Events", href: "/programs/events" },
  { text: "Downloads", href: "/programs/downloads" },
  { text: "Awards", href: "/programs/awards" },
  { text: "Gallery", href: "/programs/gallery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const pathname = usePathname();

  const isStoreActive =
    pathname === "/book-store" ||
    pathname === "/e-book" ||
    pathname === "/audio-book";

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-3 px-2.5 min-[360px]:px-3 sm:px-4 md:h-20 md:gap-6 md:px-6 xl:px-10">
          <div className="flex min-w-0 items-center gap-2 min-[360px]:gap-3">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <Link href="/home" className="flex min-w-0 items-center gap-2.5 min-[360px]:gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.45)] min-[360px]:h-12 min-[360px]:w-12 md:h-14 md:w-14">
                <Image
                  src="/spcs-logo.png"
                  alt="SPCS logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain p-1.5"
                  priority
                />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-base font-black tracking-[0.08em] text-slate-950 min-[360px]:text-lg md:text-xl">
                  SPCS
                </h1>
            
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-7 md:flex">
            <NavItem text="Home" href="/home" pathname={pathname} />
            <NavItem text="About" href="/about-us" pathname={pathname} />
            <NavItem text="Krithi" href="/krithi" pathname={pathname} />
            <NavItem
              text="Aksharam Museum"
              href="/aksharam-museum"
              pathname={pathname}
            />

            <DesktopDropdown
              text="Book Store"
              active={isStoreActive}
              items={STORE_LINKS}
              pathname={pathname}
            />
            <NavItem text="Gift Card" href="/gift-card" pathname={pathname} />
            <DesktopDropdown
              text="Sales"
              items={SALES_LINKS}
              pathname={pathname}
            />
            <DesktopDropdown
              text="Programs"
              items={PROGRAM_LINKS}
              pathname={pathname}
            />
            <NavItem text="Contact Us" href="/contact-us" pathname={pathname} />
          </div>

          <div className="flex items-center gap-1.5 min-[360px]:gap-2 md:gap-3">
            <ActionLink href="/profile" label="Profile">
              <User size={18} />
            </ActionLink>
            <ActionLink href="/cart" label="Cart">
              <ShoppingCart size={18} />
            </ActionLink>
          </div>
        </div>
      </nav>

      {open ? (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] md:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[88vw] max-w-[320px] transform border-r border-slate-200 bg-white transition-transform duration-300 min-[360px]:max-w-[340px] ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-3 py-3 min-[360px]:px-4 min-[360px]:py-4">
            <Link
              href="/home"
              onClick={() => setOpen(false)}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.45)]">
                <Image
                  src="/spcs-logo.png"
                  alt="SPCS logo"
                  width={52}
                  height={52}
                  className="h-full w-full object-contain p-1.5"
                />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-base font-black tracking-[0.08em] text-slate-950">
                  SPCS
                </h2>
                <p className="truncate text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  Sahithya Pravarthaka
                </p>
              </div>
            </Link>

            <button
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 min-[360px]:px-4">
            <div className="space-y-2">
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

              <DrawerAccordion
                text="Book Store"
                active={isStoreActive}
                open={storeOpen}
                setOpen={() => {
                  setStoreOpen(!storeOpen);
                  setSalesOpen(false);
                  setProgramsOpen(false);
                }}
                items={STORE_LINKS}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />

              <DrawerItem
                text="Gift Card"
                href="/gift-card"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />

              <DrawerAccordion
                text="Sales"
                open={salesOpen}
                setOpen={() => {
                  setSalesOpen(!salesOpen);
                  setStoreOpen(false);
                  setProgramsOpen(false);
                }}
                items={SALES_LINKS}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />

              <DrawerAccordion
                text="Programs"
                open={programsOpen}
                setOpen={() => {
                  setProgramsOpen(!programsOpen);
                  setStoreOpen(false);
                  setSalesOpen(false);
                }}
                items={PROGRAM_LINKS}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />

              <DrawerItem
                text="Contact Us"
                href="/contact-us"
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
            </div>
          </div>

          <div className="border-t border-slate-200 px-3 py-4 min-[360px]:px-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Readers First
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
              Books, e-books, audiobooks, and programs from SPCS in one clean shelf.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItem({ text, href, pathname }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm transition ${
        isActive
          ? "font-bold text-[#111418]"
          : "font-medium text-slate-600 hover:text-[#111418]"
      }`}
    >
      {text}
    </Link>
  );
}

function DesktopDropdown({ text, items, pathname, active = false }) {
  const hasActiveChild = items.some((item) => pathname === item.href);
  const isActive = active || hasActiveChild;

  return (
    <div className="group relative">
      <button
        className={`flex items-center gap-1 text-sm transition ${
          isActive
            ? "font-bold text-[#111418]"
            : "font-medium text-slate-600 hover:text-[#111418]"
        }`}
      >
        {text}
        <ChevronDown size={16} className="transition group-hover:rotate-180" />
      </button>

      <div className="invisible absolute left-0 top-full z-20 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.24)] transition-all group-hover:visible group-hover:opacity-100">
        {items.map((item) => (
          <DropdownItem key={item.href} {...item} pathname={pathname} />
        ))}
      </div>
    </div>
  );
}

function DropdownItem({ text, href, pathname, description }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block rounded-[16px] px-4 py-3 text-sm transition ${
        isActive
          ? "bg-slate-950 text-white"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      <span className="block font-semibold">{text}</span>
      {description ? (
        <span
          className={`mt-1 block text-xs font-medium ${
            isActive ? "text-white/70" : "text-slate-400"
          }`}
        >
          {description}
        </span>
      ) : null}
    </Link>
  );
}

function ActionLink({ href, label, children }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 md:h-11 md:w-11"
    >
      {children}
    </Link>
  );
}

function DrawerItem({ text, href, pathname, onClick }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-[18px] px-4 py-3 text-sm transition ${
        isActive
          ? "bg-slate-950 font-bold text-white"
          : "font-semibold text-slate-700 hover:bg-slate-50"
      }`}
    >
      {text}
    </Link>
  );
}

function DrawerAccordion({
  text,
  items,
  open,
  setOpen,
  pathname,
  onNavigate,
  active = false,
}) {
  const hasActiveChild = items.some((item) => pathname === item.href);
  const isActive = active || hasActiveChild;

  return (
    <div className="rounded-[18px] border border-slate-200 bg-white">
      <button
        onClick={setOpen}
        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
          isActive ? "font-bold text-slate-950" : "font-semibold text-slate-700"
        }`}
      >
        <span>{text}</span>
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="space-y-1 border-t border-slate-100 px-2 py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`block rounded-[14px] px-3 py-2.5 text-sm transition ${
                pathname === item.href
                  ? "bg-slate-950 font-bold text-white"
                  : "font-medium text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="block">{item.text}</span>
              {item.description ? (
                <span
                  className={`mt-1 block text-xs ${
                    pathname === item.href ? "text-white/70" : "text-slate-400"
                  }`}
                >
                  {item.description}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
