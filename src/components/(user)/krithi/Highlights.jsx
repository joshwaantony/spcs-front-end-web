export default function Highlights() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111318]">
            More Than Just Books
          </h2>
          <p className="text-[#616f89] mt-2 text-lg">
            Experience the full spectrum of Kerala's creativity.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {/* Highlight 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-float transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl text-[#135bec]">
                forum
              </span>
            </div>
            <div>
              <h3 className="font-bold text-[#111318]">
                Literary Debates
              </h3>
              <p className="text-sm text-[#616f89] mt-1">
                Voices that matter.
              </p>
            </div>
          </div>

          {/* Highlight 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-float transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl text-[#135bec]">
                palette
              </span>
            </div>
            <div>
              <h3 className="font-bold text-[#111318]">
                Art & Culture
              </h3>
              <p className="text-sm text-[#616f89] mt-1">
                Exhibitions & galleries.
              </p>
            </div>
          </div>

          {/* Highlight 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-float transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl text-[#135bec]">
                restaurant_menu
              </span>
            </div>
            <div>
              <h3 className="font-bold text-[#111318]">
                Food Fest
              </h3>
              <p className="text-sm text-[#616f89] mt-1">
                Tastes of Kerala.
              </p>
            </div>
          </div>

          {/* Highlight 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-float transition-all duration-300 flex flex-col items-center text-center gap-4 group">
            <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl text-[#135bec]">
                lightbulb
              </span>
            </div>
            <div>
              <h3 className="font-bold text-[#111318]">
                Workshops
              </h3>
              <p className="text-sm text-[#616f89] mt-1">
                Learn from masters.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
