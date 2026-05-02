import React from 'react';

const categories = [
  { name: "Novels", icon: "book_2" },
  { name: "Poetry", icon: "edit_note" },
  { name: "History", icon: "history_edu" },
  { name: "Biography", icon: "person" },
  { name: "Children's Lit", icon: "child_care" },
  { name: "Travelogue", icon: "flight" },
  { name: "Plays", icon: "theater_comedy" },
  { name: "Criticism", icon: "rate_review" },
];

const Categories = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <a key={index} href="#" className="bg-white p-6 rounded-lg border border-slate-100 hover:border-primary hover:shadow-float transition-all group flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-3xl transition-colors">{cat.icon}</span>
              <span className="font-semibold text-slate-700 group-hover:text-slate-900">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;