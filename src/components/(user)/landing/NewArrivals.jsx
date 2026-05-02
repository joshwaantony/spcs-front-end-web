import React from 'react';

const arrivals = [
  { title: "Puthooram Veettil", author: "Sethu", price: "320", img: "/misc/new-test.png" },
  { title: "Stories 2025", author: "Anthology", price: "450", img: "/misc/new-test.png" },
  { title: "Kerala Climate", author: "Dr. M.G. Manoj", price: "290", img: "/misc/new-test.png" },
  { title: "Digital Malayali", author: "Joseph Annamkutty", price: "380", img: "/misc/new-test.png" },
];

const NewArrivals = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
        <h2 className="text-3xl font-bold text-slate-900 mb-10">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {arrivals.map((book, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-slate-100 mb-4 shadow-soft">
                <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">Just Arrived</div>
                <img src={`${book.img}`} alt={book.title} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{book.title}</h3>
              <p className="text-slate-500 text-sm">{book.author}</p>
              <p className="text-slate-900 font-semibold mt-1">₹{book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;