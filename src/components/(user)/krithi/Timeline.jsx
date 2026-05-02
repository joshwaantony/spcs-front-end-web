export default function Timeline() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-gray-50/50 to-transparent -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#111318]">
            Festival History
          </h2>
          <p className="text-[#616f89] mt-2">
            A legacy of intellectual gatherings
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2 md:translate-x-0" />

          {/* 2018 */}
          <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 group">

            <div className="md:w-[45%] mb-4 md:mb-0 order-2 md:order-1">
              <div className="bg-white p-6 rounded-2xl shadow-float border border-gray-50 hover:-translate-y-1 transition-transform duration-300">
                <span className="inline-block px-3 py-1 mb-3 rounded-lg bg-blue-50 text-primary text-[#135bec] text-xs font-bold">
                  2018
                </span>
                <h3 className="text-lg font-bold text-[#111318] mb-1">
                  Knowledge, Fulfillment, Realization
                </h3>
                <p className="text-sm text-[#616f89]">
                  Inaugurated by CM Pinarayi Vijayan. Setting the foundation for a
                  new cultural era.
                </p>
              </div>
            </div>

            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-[#135bec] shadow-sm -translate-x-1/2 z-10 order-1 md:order-2" />

            <div className="md:w-[45%] order-3" />
          </div>

          {/* 2019 */}
          <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 group">

            <div className="md:w-[45%] order-2 md:order-1" />

            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-[#135bec] shadow-sm -translate-x-1/2 z-10 order-1 md:order-2" />

            <div className="md:w-[45%] mb-4 md:mb-0 order-2 md:order-3">
              <div className="bg-white p-6 rounded-2xl shadow-float border border-gray-50 hover:-translate-y-1 transition-transform duration-300">
                <span className="inline-block px-3 py-1 mb-3 rounded-lg bg-blue-50 text-primary text-xs text-[#135bec] font-bold">
                  2019
                </span>
                <h3 className="text-lg font-bold text-[#111318] mb-1">
                  Return Journey to the Future
                </h3>
                <p className="text-sm text-[#616f89]">
                  Focused on rebuilding Kerala after the floods. Resilience
                  through literature.
                </p>
              </div>
            </div>
          </div>

          {/* 2020 */}
          <div className="relative flex flex-col md:flex-row items-center justify-between group">

            <div className="md:w-[45%] mb-4 md:mb-0 order-2 md:order-1">
              <div className="bg-white p-6 rounded-2xl shadow-float border border-gray-50 hover:-translate-y-1 transition-transform duration-300">
                <span className="inline-block px-3 py-1 mb-3 rounded-lg bg-blue-50 text-primary text-xs text-[#135bec] font-bold">
                  2020
                </span>
                <h3 className="text-lg font-bold text-[#111318] mb-1">
                  True Knowledge of Culture
                </h3>
                <p className="text-sm text-[#616f89]">
                  Exploring the roots of our heritage and the future of
                  independent thought.
                </p>
              </div>
            </div>

            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-[#135bec] shadow-sm -translate-x-1/2 z-10 order-1 md:order-2" />

            <div className="md:w-[45%] order-3" />
          </div>

        </div>
      </div>
    </section>
  );
}
