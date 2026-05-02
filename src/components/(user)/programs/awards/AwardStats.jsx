export default function AwardStats() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* STAT 1 */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm 
                        hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group
                        text-center sm:text-left">
          
          <div className="mx-auto sm:mx-0 size-12 sm:size-14 rounded-2xl 
                          bg-[#FEF8ED] flex items-center justify-center mb-5
                          group-hover:bg-[#F1BF27] transition-colors">
            <span className="material-symbols-outlined text-[#F1BF27] group-hover:text-black text-2xl sm:text-3xl">
              event
            </span>
          </div>

          <p className="text-[#64748B] font-medium mb-1 text-sm sm:text-base">
            Established
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-black">
            2018
          </h3>

          <p className="mt-3 sm:mt-4 text-sm text-[#94A3B8] leading-relaxed">
            Instituted to celebrate the diamond jubilee of SPCS literary services.
          </p>
        </div>

        {/* STAT 2 */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm 
                        hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group
                        text-center sm:text-left">
          
          <div className="mx-auto sm:mx-0 size-12 sm:size-14 rounded-2xl 
                          bg-[#FEF8ED] flex items-center justify-center mb-5
                          group-hover:bg-[#F1BF27] transition-colors">
            <span className="material-symbols-outlined text-[#F1BF27] group-hover:text-black text-2xl sm:text-3xl">
              category
            </span>
          </div>

          <p className="text-[#64748B] font-medium mb-1 text-sm sm:text-base">
            Category
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-black">
            Literature
          </h3>

          <p className="mt-3 sm:mt-4 text-sm text-[#94A3B8] leading-relaxed">
            Recognizing best works in Novel, Poetry, Drama, and Short Stories.
          </p>
        </div>

        {/* STAT 3 */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm 
                        hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group
                        text-center sm:text-left">
          
          <div className="mx-auto sm:mx-0 size-12 sm:size-14 rounded-2xl 
                          bg-[#FEF8ED] flex items-center justify-center mb-5
                          group-hover:bg-[#F1BF27] transition-colors">
            <span className="material-symbols-outlined text-[#F1BF27] group-hover:text-black text-2xl sm:text-3xl">
              card_giftcard
            </span>
          </div>

          <p className="text-[#64748B] font-medium mb-1 text-sm sm:text-base">
            Recognition
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-black">
            Citation
          </h3>

          <p className="mt-3 sm:mt-4 text-sm text-[#94A3B8] leading-relaxed">
            Includes a cash prize, plaque of honor, and a special citation.
          </p>
        </div>

      </div>
    </section>
  );
}
