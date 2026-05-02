import BookCard from "./BookCard";

export default function UpcomingGrid() {
  return (
    <section className="mb-20">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-10 px-4">
        <div>
          <span className="text-[#8C33EE] font-bold text-sm uppercase tracking-widest">
            Available Now
          </span>
          <h2 className="text-3xl text-black font-bold mt-1">
            Upcoming Masterpieces
          </h2>
        </div>

        <button className="text-[#8C33EE] font-bold flex items-center gap-2 hover:underline">
          View all
          <span className="material-symbols-outlined text-[#8C33EE]">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BookCard
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuDPymzt7eTqZ9YBKLiMnXPWrckUgUawMNRCI6KjRhnv6iTHcLMGIlYhJi1f_G2wTacIrSWj8oFKY0OkoIbDLcXoaWaQgXxwuuVSDN1C4VRmxKWRh82ZarSsaRnqRLjR_HsENLcu1z5pnpJ6HU_htrJHYs1tzeyzW7bFcdmrdOJKOLG4QxViAxYCRJ8rqQWFXfCPYY31MEFsP_1xM7TKqrvcemZhZ8CBwlKe8PmN2NqAcn_0_-m5EkrugEo9NYt8AmnWwrkwSbZ-pQM"
          title="Aaraachaar: Special Ed."
          author="K.R. Meera"
          price={350}
          progress={85}
          badge="EARLY BIRD: 30% OFF"
          timeLeft="05D : 12H : 45M LEFT"
        />

        <BookCard
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuDArpOekuR4Xv7YYoaeLLg25bzjacAfrZ2a3F7u38rT2CWANPhbPo676h29tJbxw264I_UYeuDXoiCe_oIF7t6iyirktzGxSck1FCC3j6rOXmouB8tySz-Vz1BmnEDaGbaxkWPnBAOleNJEGKpWCwrs-UY2QPm8n3-P1J7Oehp7Y_6MbtNayspWMnJUAL4vvWkdq6-C2SaAj3H2zgoZOw496fu8vJuKl_Ndnx3jamt0mJQALcsYWVc2P32m-2WvRLQNJFB9LY2SPBM"
          title="Pathummayude Aadu"
          author="Vaikom M. Basheer"
          price={280}
          progress={84}
          badge="EARLY BIRD: 25% OFF"
          timeLeft="12D : 08H : 20M LEFT"
        />

        <BookCard
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBK_OyMm9PQzgGYM7YdAzNqUtb57L2baiTaiHeohQvY0nnIAN7ns7z61Q4xgqqsn0eo7Zmx6LOsqYN2KO3mJDYC7iGntOaGrJ2rjDHyAH-WWMJVyWWDf8gP-swyAQ0iu3k9qPML_t89-msrZC62jwEJYW-YeZQ9RdtWG-wmCGXKAN1YndYbj71VPZ0x9HWxnl3qx8IN5xrF_jlzBywZISjejY6p_fz37g3bbkPO-n3NYUdO-xT21Ad1p-ktf5tyafY037zj3A33S64"
          title="Ente Katha: Deluxe"
          author="Kamala Surayya"
          price={420}
          progress={70}
          badge="EARLY BIRD: 20% OFF"
          timeLeft="02D : 04H : 10M LEFT"
        />
      </div>
    </section>
  );
}
