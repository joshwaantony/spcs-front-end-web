"use client";

import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { HiOutlineBolt } from "react-icons/hi2";
import { useState } from "react";

const getBadges = (book) => {
  const badges = [];

  if (book.isFeatured) {
    badges.push("Featured");
  }

  if (book.isBestsellerManual) {
    badges.push("Best Seller");
  }

  if (book.isNewArrival) {
    badges.push("New");
  }

  if (book.isAwardWinner) {
    badges.push("Awarded");
  }

  if (book.isPrePublication) {
    badges.push("Pre-Order");
  }

  return badges.slice(0, 2);
};

export default function ProductCard({ book }) {
  const [liked, setLiked] = useState(false);
  const badges = getBadges(book);
  const primaryBadge = badges[0] || book.categoryNames?.[0] || "";
  const secondaryBadge = badges[1] || book.languageCode || book.formatType;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="
        group overflow-hidden rounded-[28px] border border-white/90 bg-white
        shadow-[0_20px_50px_-32px_rgba(20,31,56,0.16)]
        transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_34px_80px_-34px_rgba(18,109,236,0.24)]
      "
    >
      <div
        className="
          relative flex h-[270px] items-center justify-center overflow-hidden
          rounded-t-[28px] bg-[radial-gradient(circle_at_top,#ffffff_0%,#f3f7ff_48%,#edf3ff_100%)]
        "
      >
        <div className="pointer-events-none absolute inset-x-6 top-5 h-24 rounded-full bg-[#d9e7ff]/70 blur-2xl transition duration-500 group-hover:scale-110" />

        <motion.button
          onClick={() => setLiked(!liked)}
          whileTap={{ scale: 0.92 }}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md opacity-0 scale-90 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:scale-110 active:scale-95"
        >
          <FiHeart
            size={18}
            className={`transition-all duration-300 ${
              liked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-slate-400"
            }`}
          />
        </motion.button>

        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#111418] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
            {book.formatType}
          </span>
          {primaryBadge ? (
            <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#126DEC] shadow-sm">
              {primaryBadge}
            </span>
          ) : null}
        </div>

        <motion.img
          src={book.image}
          alt={book.title}
          whileHover={{ y: -10, scale: 1.04, rotate: 0.8 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="
            relative z-[1] h-[205px] object-contain drop-shadow-[0_22px_28px_rgba(15,23,42,0.18)]
            transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.05] group-hover:rotate-[0.8deg]
          "
        />
      </div>

      <div className="border-t border-[#eef2f7] px-4 pb-4 pt-5">
        <div className="mb-3 min-h-[64px]">
          <h3 className="line-clamp-2 text-[17px] font-black leading-6 tracking-[-0.01em] text-[#111418] transition-colors duration-300 group-hover:text-[#126DEC]">
            {book.title}
          </h3>
          <p className="mt-1 text-sm font-semibold text-[#72839b]">
            {book.authorName}
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {secondaryBadge ? (
            <span className="rounded-full border border-[#dfe8f7] bg-[#f8fbff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b7d96]">
              {secondaryBadge}
            </span>
          ) : null}
          {book.discountAmount > 0 ? (
            <span className="rounded-full border border-[#d9f2cf] bg-[#f4fbe8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4d7a17]">
              Offer Live
            </span>
          ) : null}
          {book.inStock ? (
            <span className="rounded-full border border-[#dfe8f7] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b7d96]">
              In Stock
            </span>
          ) : null}
        </div>

        <div className="rounded-[22px] bg-[linear-gradient(135deg,#f7faff_0%,#f2f7ff_100%)] p-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b8ca6]">
                Starting Price
              </p>
              <span className="mt-1 flex items-start gap-1 text-[#126DEC]">
                <span className="pt-1 text-sm font-black leading-none">₹</span>
                <span className="text-[22px] font-black leading-none">
                  {book.price || 0}
                </span>
              </span>
            </div>

            <motion.button
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#126DEC] text-white
                shadow-[0_12px_24px_-12px_rgba(18,109,236,0.85)] transition-all duration-300
                hover:-translate-y-1 hover:scale-110 hover:bg-[#0d60d2] active:scale-95
              "
            >
              <FiShoppingCart size={18} />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            className="
              mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111418] px-4
              text-sm font-black text-white shadow-[0_16px_26px_-18px_rgba(17,20,24,0.5)]
              transition-all duration-300 hover:-translate-y-1 hover:bg-[#126DEC] active:scale-[0.99]
            "
          >
            <HiOutlineBolt size={16} />
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
