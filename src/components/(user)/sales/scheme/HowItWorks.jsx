export default function HowItWorks() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-40">
      {/* Title */}
      <h3 className="text-center text-3xl font-extrabold text-[#0F172A] mb-20">
        How it Works
      </h3>

      <div className="relative grid md:grid-cols-3 gap-20 text-center">
        
        {/* CONNECTOR LINE */}
        <div className="hidden md:block absolute top-[70px] left-1/6 right-1/6 h-[2px] bg-[#E6F2EC]" />

        {/* STEP 1 */}
        <div className="relative flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-white border-4 border-[#F6F8F7]  shadow-xl flex items-center justify-center mb-8">
            {/* ICON ONLY CHANGED */}
            <span className="material-symbols-outlined text-[#12EC92] text-[42px]">
              person_add
            </span>
          </div>

          <h4 className="font-bold text-lg text-[#0F172A] mb-3">
            Step 1: Join
          </h4>
          <p className="text-base text-[#64748B] max-w-sm">
            Visit any NBS branch or sign up online to get your unique Membership ID.
          </p>
        </div>

        {/* STEP 2 */}
        <div className="relative flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-white border-4 border-[#F6F8F7]  shadow-xl flex items-center justify-center mb-8">
            {/* ICON ONLY CHANGED */}
            <span className="material-symbols-outlined text-[#12EC92] text-[42px]">
              event_repeat
            </span>
          </div>

          <h4 className="font-bold text-lg text-[#0F172A] mb-3">
            Step 2: Pay
          </h4>
          <p className="text-base text-[#64748B] max-w-sm">
            Pay ₹500 every month for 10 months through our secure gateway or at a branch.
          </p>
        </div>

        {/* STEP 3 – ACTIVE */}
        <div className="relative flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-[#12EC92] border-4 border-[#F6F8F7]  shadow-xl flex items-center justify-center mb-8">
            {/* ICON ONLY CHANGED */}
            <span className="material-symbols-outlined text-[#06271A] text-[42px]">
              auto_stories
            </span>
          </div>

          <h4 className="font-bold text-lg text-[#0F172A] mb-3">
            Step 3: Collect
          </h4>
          <p className="text-base text-[#64748B] max-w-sm">
            Receive your ₹7,500 book voucher instantly after the 10th installment!
          </p>
        </div>
      </div>
    </section>
  );
}
