



export default function ContactFormSection() {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20 bg-[#F4F7F8]">
      <div
        className="
          max-w-5xl mx-auto
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
          flex flex-col md:flex-row
        "
      >
        {/* ================= LEFT : FORM ================= */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-black">
            Send us a Message
          </h2>

          <form className="space-y-5 sm:space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#617f89]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="
                  w-full px-4 py-3
                  rounded-xl
                  border border-[#dbe3e6]
                  bg-[#F6F8F8]
                  text-black
                  placeholder:text-[#6B7280]
                  focus:outline-none
                  focus:ring-2 focus:ring-[#13B6EC]
                "
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#617f89]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="
                  w-full px-4 py-3
                  rounded-xl
                  border border-[#dbe3e6]
                  bg-[#F6F8F8]
                  text-black
                  placeholder:text-[#6B7280]
                  focus:outline-none
                  focus:ring-2 focus:ring-[#13B6EC]
                "
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#617f89]">
                Subject
              </label>
              <select
                className="
                  w-full px-4 py-3
                  rounded-xl
                  border border-[#dbe3e6]
                  bg-[#F6F8F8]
                  text-black
                  focus:outline-none
                  focus:ring-2 focus:ring-[#13B6EC]
                "
              >
                <option>Book Inquiry</option>
                <option>Publishing Request</option>
                <option>Order Support</option>
                <option>General Question</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#617f89]">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="How can we help?"
                className="
                  w-full px-4 py-3
                  rounded-xl
                  border border-[#dbe3e6]
                  bg-[#F6F8F8]
                  text-black
                  placeholder:text-[#6B7280]
                  resize-none
                  focus:outline-none
                  focus:ring-2 focus:ring-[#13B6EC]
                "
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="
                w-full
                bg-[#13B6EC]
                text-white
                font-bold
                py-3.5 sm:py-4
                rounded-xl
                shadow-lg
                transition-all
                hover:brightness-110
                active:scale-95
              "
            >
              Send Message
            </button>
          </form>
        </div>

        {/* ================= RIGHT : IMAGE ================= */}
        <div
          className="
            w-full md:w-1/2
            relative
            min-h-[280px] sm:min-h-[360px] md:min-h-full
            flex items-end
            overflow-hidden
          "
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxTxmLEj4eoSV88s0asRcWHQJ1XmTS4GTO8RwqScXqyb2oLMqAOMzZ9GZWF1FF3ZIvSZJ16w5Hm81H4Q9fbF1JR6T48VE9eviK1_JAj65oyPpumeL85ZD1LajyoFcaHY32iziFFBj-4XaJRGYs17pw43wtdzhshWhy9IBU2faANbro_yJ6dqdlfd309qZaBbVZMt2iZuSx1AV4FrFuSBUFwzBD6Bi6WladkiGeA50l4XPUNBvTSrNYhwjS4mPEWctMt7HDOEzTfjg')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Text Content */}
          <div className="relative p-6 sm:p-10 text-white">
            <p className="text-[#13B6EC] font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">
              Established Heritage
            </p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
              Serving writers since 1945.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
