export default function BankDetails() {
  return (
    <section className="max-w-[820px] mx-auto px-6 mb-40">
      <div className="bg-[#F1F5F9] rounded-3xl border border-[#E2E8F0] p-10 md:p-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <span className="material-symbols-outlined text-[#94A3B8] text-[26px]">
            account_balance
          </span>
          <h3 className="font-extrabold text-[#0F172A] text-lg">
            Payment Details
          </h3>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-14 text-base">
          <div>
            <p className="text-[12px] font-bold text-[#94A3B8] uppercase mb-2">
              Bank Name
            </p>
            <p className="font-semibold text-[#0F172A]">
              SBI Kottayam
            </p>
          </div>

          <div>
            <p className="text-[12px] font-bold text-[#94A3B8] uppercase mb-2">
              Account Number
            </p>
            <p className="font-mono font-semibold text-[#0F172A]">
              57051739266
            </p>
          </div>

          <div>
            <p className="text-[12px] font-bold text-[#94A3B8] uppercase mb-2">
              IFSC Code
            </p>
            <p className="font-mono font-semibold text-[#0F172A]">
              SBIN0070119
            </p>
          </div>

          <div>
            <p className="text-[12px] font-bold text-[#94A3B8] uppercase mb-2">
              Account Type
            </p>
            <p className="font-semibold text-[#0F172A]">
              Current Account
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-[#E6F2EC]" />

        {/* Important Note */}
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-[#12EC92] text-[20px] mt-[3px]">
            info
          </span>
          <p className="text-sm text-[#64748B] italic leading-relaxed">
            <span className="font-semibold text-[#0F172A]">
              Important:
            </span>{" "}
            When making a direct bank transfer, please mention your{" "}
            <span className="font-semibold text-[#0F172A]">
              Membership ID
            </span>{" "}
            in the transaction remarks.
          </p>
        </div>
      </div>
    </section>
  );
}
