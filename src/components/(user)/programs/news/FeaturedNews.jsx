// components/news/FeaturedNews.js

export default function FeaturedNews() {
  return (
    <section className="max-w-[1320px] mx-auto  mt-24">
      <div className="flex flex-col lg:flex-row bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">

        {/* IMAGE SECTION */}
        <div className="relative lg:w-[45%] h-[340px] lg:h-auto">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG6leNSSJiNGxvU9jZfG87N20C0VJOhNLT-BDGGI1hmf9k5viJ5V_PEbbVHMfZRQIZVgQ7_eVfIFGDkvKBYfiycqZp5luKzmR9oSdGCwq9C8-sNj9at9qJSXvGfArN6UCtftlWVp8KibY7xIyf2gVi4-AnK88DDD5z-h5rdMLB3lS8lNrK8z4_FZJflnow0SMPwhqKyvluVxgfmXGUdBwqsHJzh0w9G_sKzYiNrJF0tJwk9lOTd0mPf9K9Gl_X3rVzbks6ZkYPhpg"
            alt="Aksharam Museum"
            className="w-full h-full object-cover"
          />

         
        </div>

        {/* CONTENT SECTION */}
        <div className="lg:w-[55%] px-10 py-12 lg:px-16 lg:py-16 flex flex-col justify-center gap-6">

          {/* BADGE + DATE */}
          <div className="flex items-center gap-3">
            <span className="bg-[#EDFCF3] text-[#1AE680] text-xs font-bold px-7 py-2.5 rounded-full uppercase tracking-wide">
              Featured Update
            </span>
            <span className="text-sm text-gray-400">
              Mon, Jan 29 2024
            </span>
          </div>

          {/* MALAYALAM TITLE */}
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-snug">
            അക്ഷരം മ്യൂസിയം ടെൻഡർ നടപടികൾ പുരോഗമിക്കുന്നു
          </h2>

          {/* ENGLISH TITLE */}
          <h3 className="text-xl font-semibold text-gray-800">
            Aksharam Museum Tender Updates
          </h3>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed text-lg max-w-2xl">
            Latest developments and tender notifications regarding the
            prestigious Aksharam Museum project. A milestone in preserving
            India's literary heritage and cultural legacy.
          </p>

          {/* READ MORE */}
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 text-[#1AE680] font-bold hover:gap-4 transition-all"
          >
            Read Full Story
            <span className="material-symbols-outlined text-xl">
              trending_flat
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
