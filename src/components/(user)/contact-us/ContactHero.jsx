



export default function ContactHero() {
  return (
    <section className="
      relative overflow-hidden text-center
      bg-[#F0F5F8]
      px-4 sm:px-6
      pt-20 sm:pt-24 lg:pt-28
      pb-28 sm:pb-32 lg:pb-36
    ">
      
      {/* ================= BACKGROUND BLOBS ================= */}
      <div className="
        absolute -top-24 -right-24
        w-[280px] h-[280px]
        sm:w-[380px] sm:h-[380px]
        lg:w-[520px] lg:h-[520px]
        bg-primary/10 rounded-full
      " />

      <div className="
        absolute -bottom-24 -left-24
        w-[240px] h-[240px]
        sm:w-[320px] sm:h-[320px]
        lg:w-[420px] lg:h-[420px]
        bg-primary/5 rounded-full
      " />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-[960px] mx-auto">
        
        {/* Heading */}
        <h1 className="
          font-extrabold tracking-[-0.035em] text-black
          text-[30px] sm:text-[38px] md:text-[48px] lg:text-[60px]
          mb-4 sm:mb-6
        ">
          We'd Love to Hear{" "}
          <span className="text-[#13B6EC]">from You</span>
        </h1>

        {/* Description */}
        <p className="
          mx-auto max-w-[640px]
          text-[#617F89] leading-relaxed
          text-[15px] sm:text-[16px] md:text-[18px] lg:text-[19px]
        ">
          Whether you have a question about a book, an order, or just want to say
          hello, our team is here to help.
        </p>

      </div>
    </section>
  );
}
