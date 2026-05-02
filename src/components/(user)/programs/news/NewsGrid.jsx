export default function NewsGrid() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 mt-24 mb-20">

      {/* SECTION TITLE */}
      <h3 className="text-2xl font-bold text-gray-900 mb-10">
        Recent Updates
      </h3>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* CARD 1 */}
        <article className="
          group
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          transition-all
          duration-300
          ease-out
          hover:-translate-y-2
          hover:shadow-xl
        ">
          <div
            className="
              aspect-video
              rounded-xl
              overflow-hidden
              m-4
              bg-cover
              bg-center
              transition-transform
              duration-500
              group-hover:scale-105
            "
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAe0Ki3CDSIGz6b3oym2ieTHqIZAvuonNSH_xswC7jsEVIXdr2VNUSJfop1X-QWVsiiN_yDk3OBkw9WR6M1T6-le2hYcrBNZsoAFAJ8AEgfJqLbT5kCPyhlZZuwpwpIuml_d9t1IJ6tnLNmgKL4_yNYZo-uJ4NuUDwhRddxawhX2qSwqXK5IIaASIbc8B1nwF_XUPhhu4sbOA1ZCn8vxEJPFY6zWBnQ2KjHCul5C7KBBtb8u6EYqEaccdfgdC8g1aWJelYqLwr2JA")',
            }}
          />

          <div className="px-6 pb-6 space-y-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
              Oct 14, 2023
            </p>

            <h4 className="text-[20px] font-bold text-black leading-snug min-h-[56px]">
              ബാലസാഹിത്യ പുരസ്‌കാരം 2023 വിജയികളെ പ്രഖ്യാപിച്ചു
            </h4>

            <p className="text-sm text-gray-600 line-clamp-2">
              Celebrating excellence in children's literature with the announcement of this year's winners.
            </p>

            <div className="flex justify-end pt-2 text-[#1AE680]">
              <a className="text-xs font-bold flex items-center gap-1 transition-all group-hover:gap-2">
                READ MORE
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </a>
            </div>
          </div>
        </article>

        {/* CARD 2 */}
        <article className="
          group
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          transition-all
          duration-300
          ease-out
          hover:-translate-y-2
          hover:shadow-xl
        ">
          <div
            className="
              aspect-video
              rounded-xl
              overflow-hidden
              m-4
              bg-cover
              bg-center
              transition-transform
              duration-500
              group-hover:scale-105
            "
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANNCb8DWD8iPBSVlG6xs1yR53hiGO6GKQ98lmgWf1r_xZ_OBewnJZeKSvNSqG0hcn2OHf3L0RoJZsbTZ3zwM-JoeAn1ou19SqFx3ot4bxRmouMBRSS2BYDzWt9ZCXGei2azdK_xWWM3ke9mjmeVgzqg065sfqPJbv1R3BxMPBOHcNQEPrGRcJnm6amo25-QZtRdHgTpz1csMToEd4sTs238dy_k72vXHR2loyVzZ_t7r2WVbxV0XsRUZRMYQaHHH9D7dRoxDTXEbA")',
            }}
          />

          <div className="px-6 pb-6 space-y-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
              Dec 22, 2023
            </p>

            <h4 className="text-[20px] font-bold text-black leading-snug min-h-[56px]">
              കേന്ദ്ര സാഹിത്യ അക്കാദമി പുരസ്‌കാരം: പുതിയ ചിത്രങ്ങൾ
            </h4>

            <p className="text-sm text-gray-600 line-clamp-2">
              A closer look at the Sahitya Akademi Award portrait unveiling ceremony and literary discussions.
            </p>

            <div className="flex justify-end pt-2 text-[#1AE680]">
              <a className="text-xs font-bold flex items-center gap-1 transition-all group-hover:gap-2">
                READ MORE
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </a>
            </div>
          </div>
        </article>

        {/* CARD 3 */}
        <article className="
          group
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          transition-all
          duration-300
          ease-out
          hover:-translate-y-2
          hover:shadow-xl
        ">
          <div
            className="
              aspect-video
              rounded-xl
              overflow-hidden
              m-4
              bg-cover
              bg-center
              transition-transform
              duration-500
              group-hover:scale-105
            "
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAyF-kmbWUJAsUACzscT_tyA0ZgdFiXogicRvkzRmTPJCAHuxYiX5nQSsg3flTQup4K02_RmkizPyXoOKCESe_-9ce_NBpFBhynrit6Lj5Ic2j3b0RM8P4ESwiG_8dtGkSKwg4KZQE0gWUv53JGAJqHi78Pfra_NcyVkdDZ3rKdtjMbpMZOAC0GBTZ9MHD7ogrxubftZHZb6MVqUYiNhRWW78_vs19B2aRXTdoC9VUoSL-pEM1zZihpToQIjWGi4F_Qt9z0NWTg9NY")',
            }}
          />

          <div className="px-6 pb-6 space-y-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
              Sep 30, 2022
            </p>

            <h4 className="text-[20px] font-bold text-black leading-snug min-h-[56px]">
              കാരൂർ സ്മാരക പോർട്രെയിറ്റ് ഗാലറി ഉദ്ഘാടനം
            </h4>

            <p className="text-sm text-gray-600 line-clamp-2">
              Inauguration of the Karoor Memorial Portrait Gallery honoring the life of the master storyteller.
            </p>

            <div className="flex justify-end pt-2 text-[#1AE680]">
              <a className="text-xs font-bold flex items-center gap-1 transition-all group-hover:gap-2">
                READ MORE
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </a>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}
