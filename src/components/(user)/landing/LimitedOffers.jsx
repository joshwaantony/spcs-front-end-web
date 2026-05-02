import React from 'react';

const offers = [
  { title: "Ente Katha", author: "Madhavikutty", price: "224", oldPrice: "280", img: "/misc/offer-test.png" },
  { title: "Indulekha", author: "O. Chandu Menon", price: "256", oldPrice: "320", img: "/misc/offer-test.png" },
  { title: "Marthandavarma", author: "C.V. Raman Pillai", price: "192", oldPrice: "240", img: "/misc/offer-test.png" },
  { title: "Kayar", author: "Thakazhi", price: "440", oldPrice: "550", img: "/misc/offer-test.png" },
];

const LimitedOffers = () => {
  return (
    <section className="py-16 bg-background-off">
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">local_offer</span>
              Limited Time Offers
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Exclusive discounts on classics and new releases.</p>
          </div>
          <a href="#" className="text-sm font-semibold text-primary hover:text-primary-dark">View All Deals</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((book, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative border border-slate-100">
              <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">20% OFF</div>
              <div className="aspect-[2/3] w-full rounded-lg overflow-hidden bg-slate-100 mb-4">
                <img src={`${book.img}`} alt={book.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-slate-800 line-clamp-1">{book.title}</h3>
              <p className="text-xs text-slate-500 mb-2">{book.author}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-slate-400 text-sm line-through">₹{book.oldPrice}</span>
                <span className="text-slate-900 font-bold">₹{book.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LimitedOffers;