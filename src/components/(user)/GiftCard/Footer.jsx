"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Gift,
  Home,
  ShoppingCart,
} from "lucide-react";

const FOOTER_GROUPS = [
  {
    title: "Explore",
    items: [
      { label: "Bookstore", href: "/book-store" },
      { label: "New Arrivals", href: "/book-store?isNewArrival=true" },
      { label: "Bestsellers", href: "/book-store?isBestsellerManual=true" },
      { label: "Award Winners", href: "/book-store?isAwardWinner=true" },
    ],
  },
  {
    title: "Formats",
    items: [
      { label: "All Books", href: "/book-store" },
      { label: "E-Books", href: "/e-book" },
      { label: "Audiobooks", href: "/audio-book" },
      { label: "Gift Cards", href: "/gift-card" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about-us" },
      { label: "Krithi", href: "/krithi" },
      { label: "Aksharam Museum", href: "/aksharam-museum" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

const MOBILE_DOCK_ITEMS = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Store", href: "/book-store", icon: BookOpen },
  { label: "Gift", href: "/gift-card", icon: Gift },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function Footer() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState("Explore");

  return (
    <>
      <footer className="border-t border-[#d9e2ef] bg-[linear-gradient(180deg,#102319_0%,#0d1b14_100%)] text-white">
        <div className="mx-auto max-w-[1280px] px-3 pb-24 pt-12 min-[360px]:px-4 sm:px-6 sm:pb-28 sm:pt-16 lg:pb-10">
          <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]">
            <div className="max-w-md">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_50px_-34px_rgba(0,0,0,0.45)] min-[360px]:p-5">
                <div className="flex items-center gap-3 min-[360px]:gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-white shadow-[0_18px_40px_-24px_rgba(255,255,255,0.2)] min-[360px]:h-[72px] min-[360px]:w-[72px]">
                    <Image
                      src="/spcs-logo.png"
                      alt="SPCS logo"
                      width={72}
                      height={72}
                      className="h-full w-full object-contain p-1.5"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-black tracking-[0.12em] text-white min-[360px]:text-xl">
                      SPCS
                    </h2>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.24em] text-white/55 min-[360px]:text-[10px]">
                      Sahithya Pravarthaka
                    </p>
                    <p className="mt-2 text-xs font-medium text-white/60 min-[360px]:text-sm">
                      Kottayam, Kerala
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/70 sm:text-[15px]">
                  Sahithya Pravarthaka Co-operative Society brings together
                  readers, authors, print shelves, and digital reading in one
                  carefully designed experience.
                </p>

                <div className="mt-5 grid gap-3 min-[360px]:grid-cols-2">
                  <InfoCard title="Kottayam" value="Kerala, India" />
                  <InfoCard title="Reader Care" value="Support across formats" />
                </div>
              </div>
            </div>

            <div className="hidden lg:contents">
              {FOOTER_GROUPS.map((group) => (
                <FooterColumn key={group.title} title={group.title} items={group.items} />
              ))}
            </div>

            <div className="space-y-3 lg:hidden">
              {FOOTER_GROUPS.map((group) => (
                <MobileFooterSection
                  key={group.title}
                  title={group.title}
                  items={group.items}
                  pathname={pathname}
                  open={openSection === group.title}
                  onToggle={() =>
                    setOpenSection((current) =>
                      current === group.title ? "" : group.title
                    )
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 text-xs text-white/55 sm:text-sm lg:flex-row lg:items-center lg:justify-between">
            <p>
              © 2026 Sahithya Pravarthaka Co-operative Society Ltd. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/contact-us" className="transition hover:text-white">
                Contact
              </Link>
              <Link href="/about-us" className="transition hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/about-us" className="transition hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/96 px-2.5 py-2 shadow-[0_-18px_35px_-24px_rgba(15,23,42,0.2)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-1.5 min-[360px]:gap-2">
          {MOBILE_DOCK_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-center transition ${
                  active
                    ? "bg-slate-950 text-white"
                    : "bg-[#f8fbff] text-slate-600 hover:bg-white hover:text-slate-950"
                }`}
              >
                <Icon size={17} />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] min-[360px]:text-[11px]">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-sm font-black uppercase tracking-[0.18em] text-white/90">
        {title}
      </h4>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-sm font-medium text-white/65 transition hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileFooterSection({ title, items, pathname, open, onToggle }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10 bg-white/5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-bold uppercase tracking-[0.16em] text-white/90">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/70 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="space-y-1 border-t border-white/10 px-3 py-3">
          {items.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-[14px] px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-white text-slate-950"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
        {title}
      </p>
      <p className="mt-2 text-sm font-semibold text-white/85">{value}</p>
    </div>
  );
}
