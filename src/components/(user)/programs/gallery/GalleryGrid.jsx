


"use client";

import { useState } from "react";

const images = [
  {
    title: "അക്ഷരമ്യൂസിയം",
    subtitle: "Museum Exterior",
    aspect: "aspect-[3/4]",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAzWotOIThL2Bv9ZsLmn6skzy5jVtRFuYqJThI1s9vYWN75MA9iQou9PC3ZszvPsQndlRXXWVx0siupr9JZn15rWzPaS6uu7QqMcJDdwwbj12PaOwHk9ijhZhf4W2W-FK8UFIfSp0-kPve3uz3TgbC28ocoZJq0O1HfcghSg0ncqZgnf-XwLu8zxAEzax_62ObrPRZw7AJ228PC-M_4MCgVcr3m2ktN3eMsCKjvzzd9K2iwIKl3m8vnKsa1z20-C5MZdPalXbYD9I",
  },
  {
    title: "പുരസ്കാര ദാന ചടങ്ങ്",
    subtitle: "Annual Awards 2023",
    aspect: "aspect-square",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZkghUHQhjgTs-a8sx49YIKnZ2Vs0Z9FIYGIm5wnw99EGwwMUz9-h_TG_ep-UQXsGxA1f_qMy6SVLQ8gO5j6bqVWnahKVPt9V-_msshiDwARfU5s81neTsQwjzw-6HssvlUXzl6RkagCRsPKF7KCBVtTl3kqqEGPPeJDOdPy_Gkes6JS7bxNKvEA4M2eRL7ebyxy_pvu9ebU5lrQiMPWvQG6eS4SJRDSgjP9X8zU4wsx43MuRs4HfQ1X9rTvXmrYT650OpJdDbKEY",
  },
  {
    title: "പുസ്തക പ്രകാശനം",
    subtitle: "Major Launch Event",
    aspect: "aspect-video",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZcRnz0cKOBLSCj2em1UtBzBWcPGGlE4Wx-xalTU_gCSS9c-XiDUAp7edXodUXuB8yrwvipEJ7mQ_SdB6xVYkbP8estHe3-QWe3pURHIYuv955KV42Gh_PpuJ6BAh_izhnruPPXVIzwd3DmzOI_HntvEzB-ueLN5p9WX-xGXLU8-0XCfqZmzHwotOBgIgO3dy-UBsU2fKQViYG5vMMBKN8YJK7bEmmE5wTWEgS2u-NfocMDODr-7LOZkuuWuBWrR7qkMvVT0znYmU",
  },
  {
    title: "ഉദ്ഘാടനം",
    subtitle: "Ribbon Cutting Ceremony",
    aspect: "aspect-[3/5]",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuwLMixOaKrYCzJTmrmZf1nOHqb6kIZcKfLWVoLxxEDR0SPshHsP-UxDqFMTD_Xs2Hxik8PiXver2sJ3yKJ9o0g_az1MLPUor_xbKQXCYp6_CQh0n_HHQD-MOBNlVg0HrYO2y80djLn9UI7FgkUhKNcN7RkOumfFRvECG_n_f_Ro6_EVRgLXLw1Bch-pewgrF3u9DG_vQTDVQrwULWAArwXptw39jJV31qqdSSxzJFBGz2hr9eAnBFfYWgBwYXVRPLse962Uomtc8",
  },
  {
    title: "സാഹിത്യ സംവാദം",
    subtitle: "Author Interaction",
    aspect: "aspect-square",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZwXm5JBaCJlJ-K-UrCG9PSn7t-jXcjZCpY0M-LjlkCREcsGDFUoOVHP12Z1Ws13HxY77rpvvf3XtGl9lr_Gg9u6u8bsdYnmsVIuFMGkUqmDsAUezGHuIFidiR5WT02WL1i6l3YAkrXNy8AI9TrKNcqMyNTVeSm8UCJUKWYXQeCGfw43ZJOygFR7UzTfnZaukAsdFNU8O9C3sYSsz3fyKdMvVtj7XJ1OW4J4uLqLuLNrWX9W68Jmy6-3jblTeJdV1y_g_RcwE5hPU",
  },
  {
    title: "ചരിത്രരേഖകൾ",
    subtitle: "Historical Archives",
    aspect: "aspect-video",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsWGn7RSmK5Z53d9CNfXMDiS_OnEpIGqgW31TPpZ0if5Rit693HoQrOF_VI6dzOGzzpkt59Rv_SaTj_ZGaz906h3u4AYndUcYBAuWOahRX5IiOgxPYdrIaW3p4sTXAqej2dQWbVSmEfW-OdYgbEXfXucLlTFD_2YajLBu9Ymo1HHL4oKdtt6J_ZMV5G66L03QY5cpLW1sxuvyfYASxLjDfHvcLnGVGiHUtdb80N4aWlyO6_homBpPa7PtBA2ndjvhlq3REdG7ojis",
  },
];

export default function GalleryGrid() {
  const [active, setActive] = useState(null);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="masonry-grid">
          {images.map((item, i) => (
            <div key={i} className="masonry-item">
              <div
                className={`group relative overflow-hidden rounded-xl ${item.aspect} bg-gray-200`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t from-black/80 via-black/20 to-transparent
                  opacity-100 sm:opacity-0
                  sm:group-hover:opacity-100
                  transition-opacity duration-300
                  flex flex-col justify-end p-4 sm:p-6
                ">
                  <h3 className="text-white text-lg sm:text-2xl font-bold mb-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-xs sm:text-sm">
                      {item.subtitle}
                    </span>

                    <button
                      onClick={() => setActive(i)}
                      className="bg-primary p-2 rounded-full hover:scale-110 transition"
                    >
                      <span className="material-symbols-outlined text-white text-sm">
                        fullscreen
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {active !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center px-4">
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-4xl"
          >
            ×
          </button>

          <img
            src={images[active].src}
            alt=""
            className="max-h-[85vh] max-w-full sm:max-w-[90vw] rounded-xl"
          />
        </div>
      )}
    </>
  );
}
