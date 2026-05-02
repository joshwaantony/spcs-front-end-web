const HIGHLIGHTS = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_D3i9QN2HhL-_LpgVQ3Vg9zORloNhj8JlEDFQx9nJornlJabwqnMfZ9YZAuKC8WqFfOXf8y8uBf7U7kYMmCjMKrlcGztKwCs3UqnmjQ_fRTwlsYtVPg2URzxT0o4BoyVJd3S-HRSWkiWPe_4-UVRpqnzRgmkD7Wjt1AVTmePfyzRogIX4TS8soSZCE_mG0pnggc2aYrV_QER5AOCGdrzF-DlpH-XdnDvMvwAEcwntxihCzxyWCeTp1-9ZtfNSwANSKiqwUvxwLaU",
    alt: "Authors receiving the Akshara Puraskaram award on stage",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZYCbRFXDCNfBLMWWsWOKvyryhsVh8dgSlbl1VCdWNtA_b2Om5nTjzFUa7U2ZZgAYR5uDTJvf-lxM30QQxDp7ybrgqKiJLJh6LV-RSg_S1bdtHa1nWFujQQ999l8qyrsSafKgS_zCt5nVQZ9y7SWFMpRP65_H1JTaJmjY2cTANYRAxRXlfuDgkcaQV57X9YBq4dzf0b9OWrCEHA5Epyn87OFJwmEbFjLFpUVHcDDjmsC02VnCGCSu4w3MX3-x7pHFfgswKIz0V_M",
    alt: "Eminent writers gathered for a literary discussion panel",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-5w7v2skA4wyl0EI98NXNdy2sGU34CNsuxgucLSmCQfmkVUWBy8Vr_itAnNiaSLujnYHF0ZAQ3pN50A8OOcvJLgA7iygXBUviqM11UAXqylXWkuoZSiSSqZGBknio4zi4Md3u1ZQBDw23ufTkThbbvcSY3tZzuQczhdpEMJM0oWlhofL2wMY6DaYKQrFvgcb3sAOM_OSH5XixhJYvBIEPjXkGlcTXkBuYiHgc_eYtZ4NvRPdHHQxCTnqcf5Kod-j4Y0Sm4JTwgBs",
    alt: "Prestigious trophy and award plaque presentation ceremony",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbgPbZam-rjII1TgF87Xd_Ja9QHtSjk8m-WPh4sF-ykcQvfr6YnxlGgL7ckSGLf6fdumRcJkaqtKIcuOC_mx3oUuF9DpiYxGoePW3oX-wxjJ1zYVopmiXLXRzABJkoDf2QuvJLFIJ-pudwhcwniMOCCER4pB8kOq3-sLTaWDRuJaN0MlBku3azS3UVJw2sAbWhgZsYt1_717eKEdUMDI4VTbJj-WdhL3jTHVe5flNP-ih8D9cW8lfnIR6tpQ6Gc1z8zq6SgzHYMak",
    alt: "Wide shot of a crowded auditorium during the award function",
  },
];

export default function CeremonyHighlights() {
  return (
    <section className="bg-[#F8F8F6] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8 sm:mb-10">
          Moments of Glory
        </h2>

        {/* Scroll Container */}
        <div className="
          flex gap-4 sm:gap-6
          overflow-x-auto
          snap-x snap-mandatory
          pb-6
          hide-scrollbar
        ">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={index}
              className="
                snap-start
                shrink-0
                w-[85%]
                sm:w-[70%]
                md:w-[55%]
                lg:w-[450px]
                aspect-video
                rounded-xl
                overflow-hidden
                bg-slate-200
                transition-transform
                duration-500
                hover:scale-[1.02]
              "
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${item.image}')` }}
                aria-label={item.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
