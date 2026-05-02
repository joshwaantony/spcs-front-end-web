import { FiCheckCircle, FiMail, FiBookOpen } from "react-icons/fi";

export default function LivePreviewCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl w-[460px]">
      {/* Live Preview Label */}
      <p className="text-sm font-semibold text-gray-500 mb-4 tracking-wide">
        LIVE PREVIEW
      </p>

      {/* Gift Card */}
      <div className="relative h-[240px] rounded-2xl overflow-hidden text-white">
        {/* Background Image */}
        <img
          src="/misc/gift-card-bg.png"
          alt="Gift Card"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Book Icon (Top Right) */}
        <div className="absolute top-4 right-4 z-20 opacity-70">
          <FiBookOpen size={32} />
        </div>

        {/* Card Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          {/* Top Content */}
          <div>
            <p className="text-sm uppercase opacity-80 tracking-wide">
              Digital Gift Card
            </p>
            <h3 className="text-2xl font-semibold mt-1">
              SPCS India
            </h3>
          </div>

          {/* Bottom Content */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm opacity-80 mb-1">
                To: Reader Name
              </p>
              <p className="text-4xl font-bold">
                ₹500
              </p>
            </div>

            <p className="text-sm opacity-80 text-right leading-tight uppercase">
              VALID FOR 1 YEAR
            </p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-green-600">
          <FiCheckCircle size={18} />
          <span>Redeemable on all 50,000+ titles</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-green-600">
          <FiMail size={18} />
          <span>Instant email delivery</span>
        </div>
      </div>
    </div>
  );
}
