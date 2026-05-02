export default function PlanCard() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-32">
      <div className="relative bg-white rounded-3xl border border-[#F2E8CA] shadow-card p-14">

        {/* BEST VALUE BADGE */}
        <div className="absolute top-6 right-8 bg-[#12EC92] text-[#06271A] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest">
          BEST VALUE
        </div>

        <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-16 items-start">
          
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-4">
              NBS Book Installment Scheme (Bis-33)
            </h2>

            <p className="text-base text-[#64748B] mb-8 max-w-2xl leading-relaxed">
              Our premium membership plan designed for passionate readers across
              India. Invest in your knowledge systematically.
            </p>

           <ul className="space-y-5">
  {/* Open to all Indians */}
  <li className="flex items-center gap-4 text-base text-[#0F172A]">
    <span className="w-6 h-6 flex items-center justify-center">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" stroke="#12EC92" strokeWidth="2" />
        <path
          d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"
          stroke="#12EC92"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
    Open to all Indians
  </li>

  {/* Pay via UPI, Cards, or Offline Cash */}
  <li className="flex items-center gap-4 text-base text-[#0F172A]">
    <span className="w-6 h-6 flex items-center justify-center">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          stroke="#12EC92"
          strokeWidth="2"
        />
        <path
          d="M3 10h18"
          stroke="#12EC92"
          strokeWidth="2"
        />
      </svg>
    </span>
    Pay via UPI, Cards, or Offline Cash
  </li>

  {/* Redeem books at any NBS outlet */}
  <li className="flex items-center gap-4 text-base text-[#0F172A]">
    <span className="w-6 h-6 flex items-center justify-center">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4h16v16H4z"
          stroke="#12EC92"
          strokeWidth="2"
        />
        <path
          d="M8 4v16M16 4v16"
          stroke="#12EC92"
          strokeWidth="2"
        />
      </svg>
    </span>
    Redeem books at any NBS outlet
  </li>
</ul>

          </div>

          {/* RIGHT PRICING CARD */}
          <div className="bg-[#F6FBF8] rounded-3xl p-10 border border-[#E3F2EC] text-center">
            
            <p className="text-[12px] font-bold text-[#64748B] tracking-widest mb-3">
              MONTHLY SUBSCRIPTION
            </p>

            <div className="text-5xl font-extrabold text-[#0F172A] mb-2">
              ₹500{" "}
              <span className="text-lg font-semibold text-[#64748B]">
                / mo
              </span>
            </div>

            <div className="mt-8">
              <p className="text-[12px] font-bold text-[#94A3B8] mb-2">
                YOU PAY OVER 10 MONTHS
              </p>
              <p className="text-xl font-bold text-[#0F172A]">
                ₹5,000
              </p>
            </div>

            <div className="flex justify-center my-6">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M12 19L19 12M12 19L5 12"
                  stroke="#12EC92"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* BONUS BOX */}
            <div className="bg-[#E9FBF3] border border-[#12EC92]/30 rounded-2xl p-6 mb-8">
              <p className="text-[11px] font-bold text-[#12EC92] tracking-widest mb-2">
                YOU GET BOOK VALUE OF
              </p>
              <p className="text-4xl font-extrabold text-[#12EC92]">
                ₹7,500
              </p>
              <span className="inline-block mt-3 text-[11px] font-bold text-[#12EC92] bg-[#12EC92]/15 px-4 py-1.5 rounded-full">
                +50% BONUS VALUE
              </span>
            </div>

            <button className="w-full bg-[#12EC92] text-[#06271A] font-bold text-base py-4 rounded-full hover:shadow-button transition">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
