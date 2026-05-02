export default function ProcessSection() {
  return (
    <section className="mb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="
            flex flex-col md:flex-row
            items-center justify-between gap-10
            bg-white/70 backdrop-blur
            rounded-2xl px-10 py-12
            border border-[#f1eef5]
          "
        >
          {/* Step 1 */}
          <ProcessStep
            icon="bookmark_add"
            title="Reserve"
            desc="Secure your copy at early-bird rates"
          />

          {/* Divider */}
          <ProcessDivider />

          {/* Step 2 */}
          <ProcessStep
            icon="print"
            title="Publishing"
            desc="Watch the book go through printing"
          />

          {/* Divider */}
          <ProcessDivider />

          {/* Step 3 */}
          <ProcessStep
            icon="local_shipping"
            title="Delivery"
            desc="First-priority shipping to your door"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Step Component */
/* ---------------------------------- */
function ProcessStep({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 group">
      <div
        className="
          w-14 h-14 rounded-full
          bg-[#F4EBFD]
          flex items-center justify-center
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        <span className="material-symbols-outlined text-[26px] text-[#8D33EE]">
          {icon}
        </span>
      </div>

      <h4 className="font-extrabold text-[20px] text-black">
        {title}
      </h4>

      <p className="text-[16px] text-[#838184] max-w-[200px]">
        {desc}
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Divider Component */
/* ---------------------------------- */
function ProcessDivider() {
  return (
    <div className="hidden md:flex flex-1 items-center justify-center">
      <div className="w-full max-w-[260px] border-t border-dashed border-[#8D33EE]/60" />
    </div>
  );
}
