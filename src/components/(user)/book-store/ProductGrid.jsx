




import ProductCard from "./ProductCard";

const products = [
  {
    title: "Huckleberry Finn",
    author: "Mark Twain",
    price: "₹190",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGrb8TRJR1I_Fz_DV6QLdSPUAjJ78IDR0WXRU21ABJ5OjhKGuMr-xcq1zkRDfI3Kr97QI3Gf2Lx6WoVSiuXViNQK5R7g5kvR_oGNMxFyNm8CrtBGo4yv2iaEY6C6r8siSIHPbuoPO25nddgDHqg1-kpBLRPwC17x0JACJgurb9LzyPoV18kl7Iy1UMEOLlzfyS0WvHe_qYEHq76Jtu2HJoVT5A2dp-Fn-CFPHuymzbY2uPMn0nDDMhq5-7ek8ObZP2-YpdJv_aLjQ",
  },
  {
    title: "The Mother",
    author: "Maxim Gorky",
    price: "₹460",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxdhVtjRks0OYfRwZ8Yite8uX6dl6KoNNSI7x_HPCPbyXFl7si_ZZilmIHEJ_dyArqskh9MdU4tql5cY1wuFPu4LYGD2uRu8c-7FDpwwCdY7DOO48Fang8QAHHRuMx9_c98DRHiIQOgc4q-iwAZnKGSl1z5KbCjVzkE88uijOIq5fX82xWJ3wsF_WERVGpEWZyYcCyT0MR3hGcGIqS9SqM8hMXQsqn_2mGatisjNMZ7k7Msj-Vxr4_S2jCOsWAIrAaQ1FP3FqtF1Q",
  },
  {
    title: "Huckleberry Finn",
    author: "Mark Twain",
    price: "₹190",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGrb8TRJR1I_Fz_DV6QLdSPUAjJ78IDR0WXRU21ABJ5OjhKGuMr-xcq1zkRDfI3Kr97QI3Gf2Lx6WoVSiuXViNQK5R7g5kvR_oGNMxFyNm8CrtBGo4yv2iaEY6C6r8siSIHPbuoPO25nddgDHqg1-kpBLRPwC17x0JACJgurb9LzyPoV18kl7Iy1UMEOLlzfyS0WvHe_qYEHq76Jtu2HJoVT5A2dp-Fn-CFPHuymzbY2uPMn0nDDMhq5-7ek8ObZP2-YpdJv_aLjQ",
  },
  {
    title: "The Mother",
    author: "Maxim Gorky",
    price: "₹460",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxdhVtjRks0OYfRwZ8Yite8uX6dl6KoNNSI7x_HPCPbyXFl7si_ZZilmIHEJ_dyArqskh9MdU4tql5cY1wuFPu4LYGD2uRu8c-7FDpwwCdY7DOO48Fang8QAHHRuMx9_c98DRHiIQOgc4q-iwAZnKGSl1z5KbCjVzkE88uijOIq5fX82xWJ3wsF_WERVGpEWZyYcCyT0MR3hGcGIqS9SqM8hMXQsqn_2mGatisjNMZ7k7Msj-Vxr4_S2jCOsWAIrAaQ1FP3FqtF1Q",
  },
];

export default function ProductGrid() {
  return (
    <section className="py-10">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        ">
          {products.map((p, index) => (
            <ProductCard key={index} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}



// import ProductCard from "./ProductCard";

// const products = [
//   {
//     title: "Huckleberry Finn",
//     author: "Mark Twain",
//     price: "₹190",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuBGrb8TRJR1I_Fz_DV6QLdSPUAjJ78IDR0WXRU21ABJ5OjhKGuMr-xcq1zkRDfI3Kr97QI3Gf2Lx6WoVSiuXViNQK5R7g5kvR_oGNMxFyNm8CrtBGo4yv2iaEY6C6r8siSIHPbuoPO25nddgDHqg1-kpBLRPwC17x0JACJgurb9LzyPoV18kl7Iy1UMEOLlzfyS0WvHe_qYEHq76Jtu2HJoVT5A2dp-Fn-CFPHuymzbY2uPMn0nDDMhq5-7ek8ObZP2-YpdJv_aLjQ",
//   },
//   {
//     title: "The Mother",
//     author: "Maxim Gorky",
//     price: "₹460",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuBxdhVtjRks0OYfRwZ8Yite8uX6dl6KoNNSI7x_HPCPbyXFl7si_ZZilmIHEJ_dyArqskh9MdU4tql5cY1wuFPu4LYGD2uRu8c-7FDpwwCdY7DOO48Fang8QAHHRuMx9_c98DRHiIQOgc4q-iwAZnKGSl1z5KbCjVzkE88uijOIq5fX82xWJ3wsF_WERVGpEWZyYcCyT0MR3hGcGIqS9SqM8hMXQsqn_2mGatisjNMZ7k7Msj-Vxr4_S2jCOsWAIrAaQ1FP3FqtF1Q",
//   },
// ];

// export default function ProductGrid() {
//   return (
//     <section className="py-12">
//       <div className="max-w-[1100px] mx-auto px-4">
//         <div
//           className="
//             grid
//             grid-cols-1
//             sm:grid-cols-2
//             md:grid-cols-3
//             lg:grid-cols-4
//             gap-8
//             place-items-center
//           "
//         >
//           {products.map((p, index) => (
//             <ProductCard key={index} {...p} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
