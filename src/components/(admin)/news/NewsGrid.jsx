


import NewsCard from "./NewsCard";

export default function NewsGrid() {
  return (
    <section className="px-3 sm:px-4 md:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-black">
          Recently Published
        </h2>

        {/* Icons */}
        <div className="flex gap-2">
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-5 sm:gap-6 lg:gap-8
        "
      >
        <NewsCard
          date="Oct 14, 2023"
          title="സാഹിത്യ പ്രവർത്തക സഹകരണ സംഘം പുസ്തകമേള കൊച്ചിയിൽ ആരംഭിക്കുന്നു"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuAXz7AjHihnOyoZgwus4T_4Fc41x6f_-5j4HIKQOx1XWpSy9RQM0p5LN0xvcjXCjWr1WoCvtlJBpREZbbMeCWvptTePDzrByrMZAafDlyp7lKRqkXT8qOFaAqGIzVdUJG-Kv0glVGT5gskH1sK-kN3XxZzxrneVB6K1JwtUkSrq_5I1k2idA-0NiboDv7CvNQZZdnr82IeUaoPg02LIAs1DV3dBWpTg7r92j2OWyG6iBIL18KoXXZsdun3zH5-fUptdFw-db60ShVQ"
        />

        <NewsCard
          date="Oct 12, 2023"
          title="പുതുവർഷത്തിൽ പുതിയ സാഹിത്യ പുരസ്കാരങ്ങൾ പ്രഖ്യാപിച്ചു"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBSVce2pl8FoI7bpuYc0oYSWlcsMAwJqdJlOcUeIidqQISKEstPQy6PciboyCS1F5X2PT7kJ2GzAJOKSDt_LOv3tcapr4zC_Z9CuXF6iEYwhGVPL78xuol_yN1lklpf61-IDh81b-9Cas1hCJN6XYo9pDu3P9YQQXZ2TqGKGMXwrVuZ5k7tTq1hr5PHwd5WMuBbRU6DGV-JPRTeZHRhOEZSHzDGD82STTS_D_rU2md9CvEhNSxvchGGvOAYdaOi1M6qAg_zq4iF1kQ"
        />

        <NewsCard
          date="Oct 08, 2023"
          title="വായനവാരാചരണം: കുട്ടികൾക്കായി പ്രത്യേക സാഹിത്യ മത്സരം"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuCehOv3g7aUt8eQBX_hH6BTAOwNeMldfcfUZL9gudlr-Mope9gTDqZltVZUyoX3GyH8toSMCmaL2uxN4wOiOtiC-TGL3L11EShY5xrJGMHxdftXROQWjRbNSNsb2cG4aVyVYlfUjEOTeYgQqqqsvCYFPLqCfeT5kf564dx4cHTGE7sj7Xc65HjKHFiHlB51LY5Dlp9-Ch_B4KawFjRV6-qdZOcx3MoA-iqUEgAvde0AXLV7l25tTYin4lHYPnmZmL0iOgV0a0D3KGE"
        />
      </div>
    </section>
  );
}
