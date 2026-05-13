"use client";

import { FiShoppingCart, FiHeart } from "react-icons/fi";
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

  return (
    <div
      className="
        group overflow-hidden rounded-[24px] border border-white/80 bg-white
        shadow-[0_18px_45px_-30px_rgba(20,31,56,0.15)]
        transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_-34px_rgba(18,109,236,0.25)]
      "
    >
      <div
        className="
          relative flex h-[255px] items-center justify-center overflow-hidden
          rounded-t-[24px] bg-[linear-gradient(180deg,#f8fbff_0%,#fefefe_100%)]
        "
      >
        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md opacity-0 scale-90 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:scale-110 active:scale-95"
        >
          <FiHeart
            size={18}
            className={`transition-all duration-300 ${
              liked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-slate-400"
            }`}
          />
        </button>

        <img
          src={book.image}
          alt={book.title}
          className="
            h-[192px] object-contain drop-shadow-[0_18px_24px_rgba(15,23,42,0.18)]
            transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.04] group-hover:rotate-[0.8deg]
          "
        />
      </div>

      <div className="border-t border-[#f2f4f8] px-4 pb-4 pt-5">
        <div className="mb-2 min-h-[52px]">
          <h3 className="line-clamp-2 text-[15px] font-black leading-6 text-[#111418]">
            {book.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#72839b]">
            {book.authorName}
          </p>
          {primaryBadge ? (
            <p className="mt-1 text-xs font-medium text-[#7b8ca6]">{primaryBadge}</p>
          ) : null}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-[31px] font-black leading-none text-[#126DEC]">
              {book.priceLabel}
            </span>
          </div>

          <button
            className="
              flex h-11 w-11 items-center justify-center rounded-full bg-[#126DEC] text-white
              shadow-[0_12px_24px_-12px_rgba(18,109,236,0.85)] transition-all duration-300
              hover:-translate-y-1 hover:scale-110 hover:bg-[#0d60d2] active:scale-95
            "
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
