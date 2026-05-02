"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const themes = [
  { name: "Birthday", image: "/gift-card/1.png" },
  { name: "Anniversary", image: "/gift-card/2.png" },
  { name: "Festival", image: "/gift-card/3.png" },
  { name: "Kids", image: "/gift-card/4.png" },
  { name: "Best Wishes", image: "/gift-card/5.png" },
  { name: "Generic", image: "/gift-card/6.png" },
];

export default function ThemeSelector() {
  const [selected, setSelected] = useState("Birthday");

  return (
    <section className="space-y-6">
     <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900">
  <span className="
    flex items-center justify-center
    w-7 h-7
    rounded-full
    bg-green-500
    text-white
    text-sm
    font-bold
  ">
    1
  </span>
  Choose a Theme
</h2>


      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {themes.map((theme) => {
          const isActive = selected === theme.name;

          return (
            <button
              key={theme.name}
              onClick={() => setSelected(theme.name)}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all
                ${isActive ? "border-green-500" : "border-transparent hover:border-gray-300"}
              `}
            >
              {/* Image */}
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-40 object-cover"
              />

              {/* Title */}
              <div className="p-3 bg-white">
                <p className="text-sm font-medium text-gray-800">
                  {theme.name}
                </p>
              </div>

              {/* Check icon */}
              {isActive && (
                <span className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full">
                  <Check size={14} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
