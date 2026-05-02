export default function HeroSection() {
  return (
    <section className="relative mt-8 mb-20">
      {/* Background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F3E8FF] via-[#F7F2FF] to-[#FDFBFF]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <h1 className=" text-black text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Be the First <br />
              <span className="text-[#8C33EE]">to Read.</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-[#4C5563] max-w-lg mx-auto lg:mx-0">
              Pre-order upcoming Malayalam masterpieces. Get exclusive early-bird
              discounts and signed copies from legendary authors.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#8C33EE] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition">
                Explore Pre-orders
              </button>

              <button className="bg-white text-black px-8 py-4 rounded-full font-bold  hover:bg-gray-50 transition">
                How it works
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">
            {/* Soft glow */}
            <div className="absolute w-[320px] h-[320px] bg-primary/20 rounded-full blur-3xl" />

            <div className="relative w-[280px] md:w-[340px] aspect-square">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYkkqd8uX-S9sDPmWMO2e2-jqBU6h1JDG9YtRPUsOFsELygqBS0x-D5hN_dLJXVOWPelAjDHMCchq-TsgbeTXJYiblxHyIPO54SUX_xZBsOo_es3wV2fP0lArTzJYMsYnyO734jq5wpiW3gK-GxSO_iMYpaM7T89KxAJNt0w3fU-Eie0s7dF6zr9LR3diBgx32IcRbBXIk4sOb9KOjxGFrgk19Sm6Vxu3bybNLCZ79zc9lcbj8oGKFrmaphq3SleMh11dKhLKgTLY"
                alt="Limited Edition Box"
                className="w-full h-full object-contain drop-shadow-2xl"
              />

              {/* Badge */}
              <span className="absolute bottom-3 right-3 bg-yellow-400 text-black px-4 py-2 rounded-full text-xs font-bold rotate-[-8deg] shadow-md">
                LIMITED EDITION
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
