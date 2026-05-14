"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaWhatsapp,
  FaXTwitter,
  FaTelegram,
  FaLink,
} from "react-icons/fa6";
import {
  ArrowLeft,
  CheckCircle2,
  Languages,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

const FORMAT_LABELS = {
  PAPERBACK: "Paperback",
  HARDCOVER: "Hardcover",
  EBOOK: "E-Book",
  AUDIO: "Audiobook",
};

const LANGUAGE_LABELS = {
  ml: "Malayalam",
  en: "English",
};

const toneClassMap = {
  blue: {
    shell: "bg-[linear-gradient(145deg,#f4f8ff_0%,#fbfdff_48%,#f5f7fb_100%)]",
    glowA: "bg-[#dae7ff]",
    glowB: "bg-[#eef3ff]",
    accent: "text-[#126DEC]",
    button: "bg-[#126DEC] hover:bg-[#0f60d0]",
    soft: "bg-[#eef5ff] text-[#126DEC] border-[#d7e6ff]",
  },
  emerald: {
    shell: "bg-[linear-gradient(145deg,#f2fff8_0%,#fbfffd_48%,#f3fbf7_100%)]",
    glowA: "bg-[#ccf5df]",
    glowB: "bg-[#ebfff4]",
    accent: "text-[#12815d]",
    button: "bg-[#12815d] hover:bg-[#0f6d4f]",
    soft: "bg-[#eefcf5] text-[#12815d] border-[#d6f1e5]",
  },
  amber: {
    shell: "bg-[linear-gradient(145deg,#fff8ec_0%,#fffdf8_48%,#fbf6ee_100%)]",
    glowA: "bg-[#ffe1b6]",
    glowB: "bg-[#fff0d8]",
    accent: "text-[#bc7618]",
    button: "bg-[#bc7618] hover:bg-[#9a6114]",
    soft: "bg-[#fff6ea] text-[#bc7618] border-[#f4dfbc]",
  },
};

const badgeToneMap = {
  Featured: "border-[#cfe0ff] bg-[#edf5ff] text-[#126DEC]",
  "Best Seller": "border-[#d7ecbf] bg-[#eefbe8] text-[#3f7a15]",
  New: "border-[#f7dfab] bg-[#fff5dc] text-[#9c6410]",
  Awarded: "border-[#ded4ff] bg-[#f4efff] text-[#6e50c5]",
  "Pre-Order": "border-[#ffd0db] bg-[#ffeef1] text-[#bf3f63]",
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: "easeOut",
    },
  },
};

function getBadges(book) {
  const badges = [];

  if (book.isFeatured) badges.push("Featured");
  if (book.isBestsellerManual) badges.push("Best Seller");
  if (book.isNewArrival) badges.push("New");
  if (book.isAwardWinner) badges.push("Awarded");
  if (book.isPrePublication) badges.push("Pre-Order");

  return badges;
}

function getLanguageLabel(languageCode) {
  if (!languageCode) {
    return "--";
  }

  return LANGUAGE_LABELS[languageCode.toLowerCase()] || languageCode.toUpperCase();
}

function getEffectivePrice(format, startingPrice) {
  if (!format) {
    return Number(startingPrice || 0);
  }

  return Math.max(0, Number(format.price || 0) - Number(format.discountAmount || 0));
}

export default function BookDetailView({
  book,
  basePath,
  currentPathLabel,
  heroTone = "blue",
}) {
  const tone = toneClassMap[heroTone] || toneClassMap.blue;
  const badges = getBadges(book);
  const primaryFormat = book.formats?.[0] || null;
  const activePrice = getEffectivePrice(primaryFormat, book.startingPrice);
  const originalPrice = Number(primaryFormat?.price || book.startingPrice || 0);
  const discountAmount = Number(primaryFormat?.discountAmount || 0);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const metadataRows = [
    { label: "Author", value: book.authorName || "--" },
    {
      label: "Category",
      value: book.categoryNames?.join(", ") || "Uncategorized",
    },
    { label: "Edition", value: book.edition || "--" },
    {
      label: "Format",
      value: primaryFormat ? FORMAT_LABELS[primaryFormat.type] || primaryFormat.type : "--",
    },
    { label: "Publisher", value: book.publisher?.name || "SPCS" },
    { label: "Language", value: getLanguageLabel(book.languageCode) },
    { label: "Pages", value: book.pages ? String(book.pages) : "--" },
    { label: "Price", value: `₹${activePrice}` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative min-h-screen overflow-x-hidden ${tone.shell}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`pointer-events-none absolute left-[-120px] top-[-80px] h-[360px] w-[360px] rounded-full ${tone.glowA} opacity-70 blur-[120px]`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.95, delay: 0.08, ease: "easeOut" }}
        className={`pointer-events-none absolute bottom-[-80px] right-[-60px] h-[320px] w-[320px] rounded-full ${tone.glowB} opacity-90 blur-[120px]`}
      />

      <main className="relative z-10 mx-auto max-w-[1380px] px-2.5 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 xl:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-4 sm:mb-5"
        >
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#667892] sm:text-sm">
            <Link href="/home" className="hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/book-store" className="hover:text-slate-900">
              Store
            </Link>
            <span>/</span>
            <Link href={basePath} className="hover:text-slate-900">
              {currentPathLabel}
            </Link>
            <span className="hidden sm:inline">/</span>
            <span className="hidden font-semibold text-slate-900 sm:inline">
              {book.title}
            </span>
          </nav>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0.06}
          className="overflow-hidden rounded-[20px] border border-[#dfe6f0] bg-white shadow-[0_30px_80px_-48px_rgba(15,23,42,0.28)] sm:rounded-[28px] md:rounded-[30px]"
        >
          <div className="grid lg:grid-cols-[0.76fr_1.24fr]">
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.12}
              className="border-b border-[#e8edf4] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-2.5 sm:p-5 md:p-6 lg:border-b-0 lg:border-r"
            >
              <Link
                href={basePath}
                className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#e0e8f5] bg-white px-3 py-2 text-[11px] font-semibold text-[#50637d] transition hover:-translate-y-0.5 hover:text-slate-900 sm:mb-5 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <ArrowLeft size={14} />
                Back to shelf
              </Link>

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[18px] border border-[#edf2f7] bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f8ff_48%,#eef3ff_100%)] p-3 sm:rounded-[24px] sm:p-5 md:rounded-[26px] md:p-6"
              >
                <div
                  className={`pointer-events-none absolute inset-x-4 top-4 h-20 rounded-full ${tone.glowA} opacity-75 blur-3xl sm:inset-x-8 sm:top-6 sm:h-24 md:inset-x-10 md:top-8 md:h-28`}
                />
                <motion.img
                  src={book.image}
                  alt={book.title}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.14, duration: 0.45, ease: "easeOut" }}
                  whileHover={{ scale: 1.04, y: -8, rotate: 0.6 }}
                  className="relative z-10 mx-auto h-[180px] object-contain drop-shadow-[0_24px_34px_rgba(15,23,42,0.22)] min-[360px]:h-[220px] sm:h-[280px] md:h-[360px] lg:h-[400px] xl:h-[440px]"
                />
              </motion.div>

              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={0.2}
                className="mt-3 rounded-[18px] border border-[#ebf0f7] bg-[#f8fbff] p-3 sm:mt-5 sm:rounded-[22px] sm:p-5 md:mt-6 md:rounded-[24px]"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b8ca6]">
                    Description
                  </p>
                  <h2 className="mt-1 text-xl font-black text-[#131821]">
                    About this book
                  </h2>
                </div>
                <p className="mt-3 break-words text-[13px] font-medium leading-6 text-[#556980] min-[360px]:text-sm min-[360px]:leading-7 md:mt-4 md:text-[15px] md:leading-8">
                  {book.description}
                </p>
              </motion.div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.18}
              className="p-3 sm:p-6 md:p-7 lg:p-8"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="border-b border-[#e8edf4] pb-5"
              >
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge) => (
                    <motion.span
                      key={badge}
                      variants={staggerItem}
                      className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
                        badgeToneMap[badge] || "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {badge}
                    </motion.span>
                  ))}
                  {primaryFormat ? (
                    <motion.span
                      variants={staggerItem}
                      className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${tone.soft}`}
                    >
                      {FORMAT_LABELS[primaryFormat.type] || primaryFormat.type}
                    </motion.span>
                  ) : null}
                </div>

                <motion.h1
                  variants={staggerItem}
                  className="mt-3 break-words text-[1.65rem] font-black tracking-[-0.03em] text-[#131821] leading-tight min-[360px]:text-[2rem] sm:mt-4 sm:text-[2.4rem] md:text-[2.9rem] lg:text-[3.3rem] lg:leading-[1.02]"
                >
                  {book.title}
                </motion.h1>
                <motion.p
                  variants={staggerItem}
                  className="mt-2 text-[13px] font-semibold text-[#617289] min-[360px]:text-sm sm:mt-3 sm:text-base md:text-lg"
                >
                  {book.authorName}
                </motion.p>
              </motion.div>

              <div className="grid gap-6 pt-5 xl:grid-cols-[0.95fr_1.05fr] xl:gap-8 xl:pt-6">
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.24}
                >
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3 sm:space-y-4"
                  >
                    {metadataRows.map((row) => (
                      <MetaLine
                        key={row.label}
                        label={row.label}
                        value={row.value}
                      />
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 sm:space-y-5"
                >
                  <motion.div
                    variants={staggerItem}
                    whileHover={{ y: -4 }}
                    className="rounded-[18px] border border-[#ebf0f7] bg-white p-3 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.2)] sm:rounded-[22px] sm:p-5 md:rounded-[24px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f4f8ff] text-[#126DEC]">
                        <PackageCheck size={18} />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b8ca6]">
                          Purchase options
                        </p>
                        <h2 className="text-xl font-black text-[#131821]">
                          Simple next steps
                        </h2>
                      </div>
                    </div>

                    <div className="mt-4 rounded-[16px] border border-[#e2eaf6] bg-[#f8fbff] p-3 sm:mt-5 sm:rounded-[20px] sm:p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b8ca6]">
                        Current price
                      </p>
                      <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
                        <span className={`pb-1 text-sm font-black ${tone.accent}`}>₹</span>
                        <span className={`text-3xl font-black leading-none ${tone.accent}`}>
                          {activePrice}
                        </span>
                        {discountAmount > 0 ? (
                          <span className="pb-1 text-sm font-semibold text-[#97a5b7] line-through">
                            ₹{originalPrice}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2.5 sm:gap-3">
                      <motion.button
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-3 text-[13px] font-black text-white shadow-[0_16px_28px_-18px_rgba(18,109,236,0.5)] transition hover:-translate-y-0.5 min-[360px]:h-12 min-[360px]:px-4 min-[360px]:text-sm ${tone.button}`}
                      >
                        <ShoppingCart size={16} />
                        Add to cart
                      </motion.button>
                      <motion.button
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111418] px-3 text-[13px] font-black text-white shadow-[0_16px_26px_-18px_rgba(17,20,24,0.5)] transition hover:-translate-y-0.5 hover:bg-[#126DEC] min-[360px]:h-12 min-[360px]:px-4 min-[360px]:text-sm"
                      >
                        <Sparkles size={16} />
                        Buy now
                      </motion.button>
                    </div>

                    <div className="mt-4 space-y-3 sm:mt-5">
                      <TrustRow
                        icon={<CheckCircle2 size={16} />}
                        label="Clear pricing before checkout"
                      />
                      <TrustRow
                        icon={<ShieldCheck size={16} />}
                        label={
                          book.hasEbook || book.hasAudio
                            ? "Digital-friendly title available"
                            : "Reliable physical book purchase flow"
                        }
                      />
                      <TrustRow
                        icon={<Languages size={16} />}
                        label={`Language: ${getLanguageLabel(book.languageCode)}`}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={staggerItem}
                    whileHover={{ y: -4 }}
                    className="rounded-[18px] border border-[#ebf0f7] bg-white p-3 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.2)] sm:rounded-[22px] sm:p-5 md:rounded-[24px]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b8ca6]">
                          Share this book
                        </p>
                        <h2 className="mt-1 text-xl font-black text-[#131821]">
                          Send it to someone
                        </h2>
                      </div>
                    </div>

                    <p className="mt-2 text-sm font-medium leading-6 text-[#6b7d96]">
                      Share it with readers, friends, or your community in just one tap.
                    </p>

                    <div className="mt-4 grid gap-2.5 min-[360px]:gap-3 md:grid-cols-2">
                      <ShareButton
                        icon={<FaFacebookF size={18} />}
                        label="Facebook"
                        description="Post to your feed"
                        tone="facebook"
                      />
                      <ShareButton
                        icon={<FaWhatsapp size={18} />}
                        label="WhatsApp"
                        description="Send as a quick chat"
                        tone="whatsapp"
                      />
                      <ShareButton
                        icon={<FaXTwitter size={18} />}
                        label="X"
                        description="Share as a short post"
                        tone="x"
                      />
                      <ShareButton
                        icon={<FaTelegram size={18} />}
                        label="Telegram"
                        description="Send to a channel or friend"
                        tone="telegram"
                      />
                    </div>

                    <div className="mt-4 rounded-[18px] border border-[#e8eef6] bg-[#f8fbff] p-3 sm:rounded-[20px]">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b8ca6]">
                            Copy link
                          </p>
                          <p className="mt-1 truncate text-sm font-medium text-[#60728d]">
                            {shareUrl || "Open this page in browser to copy the link"}
                          </p>
                        </div>
                        <ShareButton
                          icon={<FaLink size={16} />}
                          label="Copy Link"
                          compact
                          tone="copy"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>

      <div className="sticky bottom-0 z-30 border-t border-[#dde6f2] bg-white/95 px-2.5 py-2.5 shadow-[0_-18px_35px_-24px_rgba(15,23,42,0.2)] backdrop-blur md:hidden">
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-2.5 flex items-end justify-between gap-2.5">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b8ca6]">
                Current price
              </p>
              <div className="mt-1 flex items-end gap-2">
                <span className={`pb-1 text-xs font-black ${tone.accent}`}>₹</span>
                <span className={`text-xl font-black leading-none min-[360px]:text-2xl ${tone.accent}`}>
                  {activePrice}
                </span>
                {discountAmount > 0 ? (
                  <span className="pb-0.5 text-xs font-semibold text-[#97a5b7] line-through">
                    ₹{originalPrice}
                  </span>
                ) : null}
              </div>
            </div>
            <span className="rounded-full border border-[#d7ecbf] bg-[#eefbe8] px-3 py-1 text-[10px] font-bold text-[#3f7a15]">
              {book.inStock ? "In stock" : "Check stock"}
            </span>
          </div>

            <div className="grid grid-cols-2 gap-2.5 min-[360px]:gap-3">
              <button
                className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-2.5 text-[12px] font-black text-white shadow-[0_16px_28px_-18px_rgba(18,109,236,0.5)] transition active:scale-[0.99] min-[360px]:h-11 min-[360px]:gap-2 min-[360px]:px-4 min-[360px]:text-sm ${tone.button}`}
              >
                <ShoppingCart size={15} />
                Add to cart
              </button>
              <button className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#111418] px-2.5 text-[12px] font-black text-white shadow-[0_16px_26px_-18px_rgba(17,20,24,0.5)] transition active:scale-[0.99] min-[360px]:h-11 min-[360px]:gap-2 min-[360px]:px-4 min-[360px]:text-sm">
                <Sparkles size={15} />
                Buy now
              </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

function MetaLine({ label, value }) {
  return (
    <div className="grid grid-cols-1 gap-1 text-[13px] min-[360px]:text-sm sm:grid-cols-[110px_12px_1fr] sm:items-start sm:gap-2 md:grid-cols-[128px_16px_1fr]">
      <span className="font-semibold text-[#273344]">{label}</span>
      <span className="hidden font-semibold text-[#97a3b3] sm:block">:</span>
      <span className="font-medium break-words text-[#556980]">{value}</span>
    </div>
  );
}

function TrustRow({ icon, label }) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] border border-[#edf2f9] bg-[#fbfdff] px-4 py-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eef4ff] text-[#126DEC]">
        {icon}
      </span>
      <p className="text-[13px] font-semibold leading-5 text-[#566a86] min-[360px]:text-sm">{label}</p>
    </div>
  );
}

function ShareButton({
  icon,
  label,
  description,
  tone = "default",
  compact = false,
}) {
  const toneClassName =
    tone === "facebook"
      ? "border-[#d9e7ff] bg-[#f7faff] text-[#1877f2] hover:border-[#bfd7ff] hover:bg-white"
      : tone === "whatsapp"
        ? "border-[#d5f3df] bg-[#f4fcf7] text-[#1fa855] hover:border-[#bceacb] hover:bg-white"
        : tone === "x"
          ? "border-[#e6e9ef] bg-[#f8fafc] text-[#111418] hover:border-[#d5dbe4] hover:bg-white"
          : tone === "telegram"
            ? "border-[#d7ebff] bg-[#f5faff] text-[#2497d3] hover:border-[#bddbfb] hover:bg-white"
            : "border-[#e2e9f3] bg-[#fbfdff] text-[#5f7391] hover:border-[#cddbf1] hover:bg-white hover:text-[#126DEC]";

  if (compact) {
    return (
      <button
        type="button"
        className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-full px-3 text-[13px] font-bold transition hover:-translate-y-0.5 min-[360px]:h-11 min-[360px]:px-4 min-[360px]:text-sm md:w-auto ${toneClassName}`}
        aria-label={label}
        title={label}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`flex min-h-[68px] items-center gap-2.5 rounded-[16px] border px-3 py-3 text-left transition hover:-translate-y-0.5 min-[360px]:min-h-[74px] min-[360px]:gap-3 min-[360px]:rounded-[18px] min-[360px]:px-4 sm:min-h-[78px] sm:rounded-[20px] ${toneClassName}`}
      aria-label={label}
      title={label}
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white shadow-[0_10px_24px_-20px_rgba(15,23,42,0.35)] min-[360px]:h-11 min-[360px]:w-11 min-[360px]:rounded-2xl">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-black min-[360px]:text-sm">{label}</span>
        {description ? (
          <span className="mt-1 block text-[11px] font-medium leading-4 text-[#6d7f98] min-[360px]:text-xs">
            {description}
          </span>
        ) : null}
      </span>
    </button>
  );
}
