export default function LocationSection() {
  return (
    // OUTSIDE = WHITE
    <section className="w-full flex justify-center py-20 bg-white">
      <div className="max-w-7xl w-full px-5 md:px-10">
        
        {/* INSIDE CARD = #F8F9FA */}
        <div className="bg-[#F8F9FA] rounded-3xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
          
          {/* Map / Image */}
          <div className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-soft relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDBqs7U7dJQ9GCmvfoQfXZJxPeY246RG34XOQdAIz4u8Kgv-uzg7ARqHJY_RShUVG6U5uJ5184m3JrUsfG_kSgjL4jVy1smeOV2UY0Wky1YAyL5ZZf01GYkzkMs3xsgDeXpdQm-6b2DBu9OzC3NdJMBIRmD1f58TtuV4e0EK3dkXPWbbKeZS6UNywpD-VqiHsZJuxbGR1YC1FqZ7XtHvH_9gvBdrIeT4tR789RAx2dKwFUQd-_1C8ZXPE_9_wSTVSZJIA1eeA8SpQ')",
              }}
            />

            {/* Location Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm text-xs font-semibold text-gray-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500 text-base">
                location_on
              </span>
              Nattakam, Kottayam
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Rooted in Tradition
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">
              The museum stands proudly in{" "}
              <strong className="text-gray-900">
                Nattakam, Kottayam
              </strong>
              , the land of letters. Built on prime land owned by SPCS, this
              location was chosen to honor the rich literary history of the
              region.
            </p>

            {/* Get Directions */}
            <button className="text-green-500 font-semibold hover:text-green-600 flex items-center gap-2 group w-fit">
              Get Directions
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
