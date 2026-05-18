export default function ContactInfo() {
  return (
    <section className="bg-[#FBFCFC] py-16 sm:py-20 px-4 sm:px-6">
      <div
        className="
          max-w-[1100px]
          mx-auto
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-10
          md:gap-14
          text-center
          md:text-left
        "
      >
        {/* ================= General Inquiries ================= */}
        <div className="space-y-3">
          <h4 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#13B6EC]">
            General Inquiries
          </h4>

          <p className="text-[#617F89] text-sm leading-relaxed">
            For all general questions regarding SPCS history and governance.
          </p>

          <a
            href="mailto:info@spcsindia.com"
            className="
              inline-block
              text-[#101718]
              font-semibold
              text-sm
              transition
              hover:text-[#13B6EC]
              hover:underline
            "
          >
            info@spcsindia.com
          </a>
        </div>

        {/* ================= Publishing House ================= */}
        <div className="space-y-3">
          <h4 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#13B6EC]">
            Publishing House
          </h4>

          <p className="text-[#617F89] text-sm leading-relaxed">
            For manuscript submissions and publishing opportunities.
          </p>

          <a
            href="mailto:editor@spcsindia.com"
            className="
              inline-block
              text-[#101718]
              font-semibold
              text-sm
              transition
              hover:text-[#13B6EC]
              hover:underline
            "
          >
            editor@spcsindia.com
          </a>
        </div>

        {/* ================= SPCS Bulletin ================= */}
        <div className="space-y-3">
          <h4 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#13B6EC]">
            SPCS Bulletin
          </h4>

          <p className="text-[#617F89] text-sm leading-relaxed">
            To contact our editorial board for the monthly newsletter.
          </p>

          <a
            href="mailto:bulletin@spcsindia.com"
            className="
              inline-block
              text-[#101718]
              font-semibold
              text-sm
              transition
              hover:text-[#13B6EC]
              hover:underline
            "
          >
            bulletin@spcsindia.com
          </a>
        </div>
      </div>
    </section>
  );
}
