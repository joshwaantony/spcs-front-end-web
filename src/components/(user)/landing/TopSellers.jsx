// import React from 'react';

// const TopSellers = () => {
//   return (
//     <section className="py-20 bg-white overflow-hidden relative">
//       <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-50 -z-10"></div>
//       <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
//         <h2 className="text-3xl font-black text-slate-900 text-center mb-12 uppercase tracking-wide">Weekly Top Sellers</h2>
//         <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-12">
          
//           {/* #2 Rank */}
//           <div className="flex-1 max-w-xs flex flex-col items-center order-2 md:order-1">
//             <div className="relative w-48 aspect-[2/3] transform transition-transform hover:-translate-y-2 duration-300">
//               <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-slate-300 text-slate-700 font-black text-xl flex items-center justify-center shadow-lg border-2 border-white z-20">#2</div>
//               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAlWrrI_jtS8_pfS1BU7phvgp3Geicxx8tFda2JrIwTA4szvLWOSbnnA2cr75O076cq21lYiupVfrcSxbnmgIZYnaGPJbXAuRSUTZYxXNcfthntry993ryT9I2yE1xqmP5glMhIYFH_KJwsgmHIxgGzjg38VxF62A_0WOIPNzfef-hKFd4qJ_JAfJOaX72nfIuD5lrgefA3hBiir9XRgAfvPaj5pmIZneml77rP8e3yd2p-TQlJ_ephXHtizgjpoTURieqt5U8wR0" alt="Khasakkinte Ithihasam" className="w-full h-full object-cover rounded-lg shadow-xl shadow-slate-200" />
//             </div>
//             <div className="text-center mt-6">
//               <h3 className="font-bold text-lg text-slate-900">Khasakkinte Ithihasam</h3>
//               <p className="text-slate-500">O.V. Vijayan</p>
//               <button className="mt-3 text-sm font-semibold text-primary hover:underline">Add to Cart</button>
//             </div>
//           </div>

//           {/* #1 Rank */}
//           <div className="flex-1 max-w-xs flex flex-col items-center order-1 md:order-2 mb-8 md:mb-0">
//             <div className="relative w-56 aspect-[2/3] transform transition-transform hover:-translate-y-2 duration-300">
//               <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-yellow-400 text-yellow-900 font-black text-2xl flex items-center justify-center shadow-lg border-4 border-white z-20">#1</div>
//               <span className="material-symbols-outlined absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-500 text-4xl drop-shadow-sm animate-bounce">crown</span>
//               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB02nrMliVxJukCi-dPCZHcfolOZmoy-CYIlb8pBDHw9Y6sK6gIrvMw3tfhW50tTRDbD2sDUglo4g8uOwyWgiJDopzeD5jo4sHbgBCGetprEFVyauTXvkqPKdCgw1NQrbjxhTwF6v-f3ACOiyyzGQ3ZUnxTfr9_RlKde5EXBEe8AL6l5cM-J0Q24lQYBriThV5jtIzOERLWAE7qg7LLmydES_bCKc-FOUa_fTcOm-WMraYrqAMAA4UJ1PjaYeW6O9NFV3PgbzNfPM" alt="Aadujeevitham" className="w-full h-full object-cover rounded-lg shadow-2xl shadow-yellow-500/20 border-2 border-yellow-100" />
//             </div>
//             <div className="text-center mt-6">
//               <h3 className="font-bold text-xl text-slate-900">Aadujeevitham</h3>
//               <p className="text-slate-500">Benyamin</p>
//               <button className="mt-3 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-colors">Buy Now</button>
//             </div>
//           </div>

//           {/* #3 Rank */}
//           <div className="flex-1 max-w-xs flex flex-col items-center order-3 md:order-3">
//             <div className="relative w-48 aspect-[2/3] transform transition-transform hover:-translate-y-2 duration-300">
//               <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-orange-200 text-orange-800 font-black text-xl flex items-center justify-center shadow-lg border-2 border-white z-20">#3</div>
//               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOpBM48xCMFaivH7oliGVBEdqBVSZ4_euhfqEWOUW5nbat0ejRv773Q2uElHVTvVjvzcoqQhULQKAjkKOTOXFnkwyHGoEvfViz0o5itpk0LA673TKP8wkh37R4Ej4UdQt1jxMw4CIktmCSX_bhqiIi9jth1clOZwix38MNUdf8IWB1WxoXpuwdNZkGciXyVtBsY_fqI19IzzSHjuVGGh9kTSgGF9H2nbm_-P8J8-7IrXeg7gY4Pzks6XmBMYKCCYWY2oNyAi8LnRg" alt="Ramanan" className="w-full h-full object-cover rounded-lg shadow-xl shadow-slate-200" />
//             </div>
//             <div className="text-center mt-6">
//               <h3 className="font-bold text-lg text-slate-900">Ramanan</h3>
//               <p className="text-slate-500">Changampuzha</p>
//               <button className="mt-3 text-sm font-semibold text-primary hover:underline">Add to Cart</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TopSellers;



import React from "react";

const TopSellers = () => {
  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
        <h2 className="text-3xl font-black text-slate-900 text-center mb-12 uppercase tracking-wide">
          Weekly Top Sellers
        </h2>

        {/* FIXED ALIGNMENT HERE */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          
          {/* #2 Rank */}
          <div className="flex-1 max-w-xs flex flex-col items-center order-2 md:order-1">
            <div className="relative w-48 aspect-[2/3] transform transition-transform hover:-translate-y-2 duration-300">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-slate-300 text-slate-700 font-black text-xl flex items-center justify-center shadow-lg border-2 border-white z-20">
                #2
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAlWrrI_jtS8_pfS1BU7phvgp3Geicxx8tFda2JrIwTA4szvLWOSbnnA2cr75O076cq21lYiupVfrcSxbnmgIZYnaGPJbXAuRSUTZYxXNcfthntry993ryT9I2yE1xqmP5glMhIYFH_KJwsgmHIxgGzjg38VxF62A_0WOIPNzfef-hKFd4qJ_JAfJOaX72nfIuD5lrgefA3hBiir9XRgAfvPaj5pmIZneml77rP8e3yd2p-TQlJ_ephXHtizgjpoTURieqt5U8wR0"
                alt="Khasakkinte Ithihasam"
                className="w-full h-full object-cover rounded-lg shadow-xl shadow-slate-200"
              />
            </div>
            <div className="text-center mt-6">
              <h3 className="font-bold text-lg text-slate-900">
                Khasakkinte Ithihasam
              </h3>
              <p className="text-slate-500">O.V. Vijayan</p>
              <button className="mt-3 text-sm font-semibold text-primary hover:underline">
                Add to Cart
              </button>
            </div>
          </div>

          {/* #1 Rank */}
          <div className="flex-1 max-w-xs flex flex-col items-center order-1 md:order-2 mb-8 md:mb-0">
            <div className="relative w-56 aspect-[2/3] transform transition-transform hover:-translate-y-2 duration-300">
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-yellow-400 text-yellow-900 font-black text-2xl flex items-center justify-center shadow-lg border-4 border-white z-20">
                #1
              </div>
              <span className="material-symbols-outlined absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-500 text-4xl drop-shadow-sm animate-bounce">
                crown
              </span>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB02nrMliVxJukCi-dPCZHcfolOZmoy-CYIlb8pBDHw9Y6sK6gIrvMw3tfhW50tTRDbD2sDUglo4g8uOwyWgiJDopzeD5jo4sHbgBCGetprEFVyauTXvkqPKdCgw1NQrbjxhTwF6v-f3ACOiyyzGQ3ZUnxTfr9_RlKde5EXBEe8AL6l5cM-J0Q24lQYBriThV5jtIzOERLWAE7qg7LLmydES_bCKc-FOUa_fTcOm-WMraYrqAMAA4UJ1PjaYeW6O9NFV3PgbzNfPM"
                alt="Aadujeevitham"
                className="w-full h-full object-cover rounded-lg shadow-2xl shadow-yellow-500/20 border-2 border-yellow-100"
              />
            </div>
            <div className="text-center mt-6">
              <h3 className="font-bold text-xl text-slate-900">
                Aadujeevitham
              </h3>
              <p className="text-slate-500">Benyamin</p>
              <button className="mt-3 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-colors">
                Buy Now
              </button>
            </div>
          </div>

          {/* #3 Rank */}
          <div className="flex-1 max-w-xs flex flex-col items-center order-3">
            <div className="relative w-48 aspect-[2/3] transform transition-transform hover:-translate-y-2 duration-300">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-orange-200 text-orange-800 font-black text-xl flex items-center justify-center shadow-lg border-2 border-white z-20">
                #3
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOpBM48xCMFaivH7oliGVBEdqBVSZ4_euhfqEWOUW5nbat0ejRv773Q2uElHVTvVjvzcoqQhULQKAjkKOTOXFnkwyHGoEvfViz0o5itpk0LA673TKP8wkh37R4Ej4UdQt1jxMw4CIktmCSX_bhqiIi9jth1clOZwix38MNUdf8IWB1WxoXpuwdNZkGciXyVtBsY_fqI19IzzSHjuVGGh9kTSgGF9H2nbm_-P8J8-7IrXeg7gY4Pzks6XmBMYKCCYWY2oNyAi8LnRg"
                alt="Ramanan"
                className="w-full h-full object-cover rounded-lg shadow-xl shadow-slate-200"
              />
            </div>
            <div className="text-center mt-6">
              <h3 className="font-bold text-lg text-slate-900">Ramanan</h3>
              <p className="text-slate-500">Changampuzha</p>
              <button className="mt-3 text-sm font-semibold text-primary hover:underline">
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopSellers;
