export default function FeaturesSection() {
  return (
    <section className="w-full flex justify-center py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl w-full px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Feature 1 */}
          <div className="group bg-white p-8 rounded-2xl shadow-soft
                          hover:shadow-float hover:-translate-y-1
                          transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 rounded-[20px] bg-[#ecfdf3]
                            flex items-center justify-center
                            text-[#16a34a]
                            group-hover:scale-105
                            transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl font-light">
                eco
              </span>
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#111813]">
              Eco-Friendly Design
            </h3>

            <p className="mt-3 text-gray-600 leading-relaxed text-sm">
              Built with sustainable architecture and fully differently-abled
              friendly. A structure that breathes with nature.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white p-8 rounded-2xl shadow-soft
                          hover:shadow-float hover:-translate-y-1
                          transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 rounded-[20px] bg-[#ecfdf3]
                            flex items-center justify-center
                            text-[#16a34a]
                            group-hover:scale-105
                            transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl font-light">
                memory
              </span>
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#111813]">
              Modern Technology
            </h3>

            <p className="mt-3 text-gray-600 leading-relaxed text-sm">
              International-standard exhibits powered by modern technology.
              AR/VR experiences bring stories to life.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white p-8 rounded-2xl shadow-soft
                          hover:shadow-float hover:-translate-y-1
                          transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 rounded-[20px] bg-[#ecfdf3]
                            flex items-center justify-center
                            text-[#16a34a]
                            group-hover:scale-105
                            transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl font-light">
                history_edu
              </span>
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#111813]">
              Cultural Hub
            </h3>

            <p className="mt-3 text-gray-600 leading-relaxed text-sm">
              A dedicated space for research, preservation, and the evolution
              of Malayalam literature. The heart of Kerala’s literary future.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
