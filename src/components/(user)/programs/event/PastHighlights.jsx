




export default function PastHighlights() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#181311] mb-4">
            Relive the Magic
          </h2>
          <p className="text-[#896c61] max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            A glimpse into our previous book fairs, award nights, and the vibrant
            literary community across Kerala.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[180px] sm:auto-rows-[200px]">

          {/* BIG VIDEO CARD */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKs0c2Sex_6p4WEgU5OgS1NVN9bOzKQzYK7ksh8MxPYdd3TqwQ-pWjWQVo-HV3iO6hVVAuQnA-4I97Z-r_mtS3gbo09GxcX-Q0kkBULDmdK9XUCVjfPiE3Jk0TgtIEZofPyuD1jpZmsbL1ESTDiqLZYp_xe72UyhQl58FMC9WZo7IKZjkVen-5b-rTekuu4ioa8AJkPTz93eAQzn20xvDng1yV2t_SI5doc-eG9i3CAuICqo-wFDee-T4Wn8So-DFRTNfZf1FcR40')",
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:bg-black/25">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#EC4D12] rounded-full flex items-center justify-center mb-4 shadow-2xl transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-white text-3xl">
                  play_arrow
                </span>
              </div>
              <span className="font-bold tracking-wide text-sm sm:text-base">
                Watch 2025 Festival Highlights
              </span>
            </div>
          </div>

          {/* IMAGE 2 */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLpuLq6qS2c8rchrqU-KpP9vaNhAZE9Lo9ed-KOBO54Q1Gpxn8U25KWkpunPo7msLZ9XY-RCJ2K80fS2b6Tppy31S9JJE_w04M32fDcFkfL-pi4OJvaD1y16UW4XHR3QncoVFrAsLwFj0RVVfxaENEBCypU-Sz-cn6A9fIDvmmpRBrU8eGaQEbiJLeBV9MvT_FNKeNLueR8I_S_Nl2imqA4dN3Oor2DWuz9dIEiadT4XROnn6LWl8LER9YvDFcvlV9qcRGEBYTkjY')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
              <p className="text-white font-bold text-sm">
                Authors Conclave 2024
              </p>
            </div>
          </div>

          {/* IMAGE 3 */}
          <div className="relative group overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyciIErPdBbRPknPCXZI5U_fpqfJmuocLtObDlf0Tael2N6_tpLBS_1rxAHyNkDVdVOKWkjX0P0IxHyUuvGZ9cE03DCu1iDyfvg99uV4EnJArlWfbKjH470AuB_EiVA33hYD_61Xae88bbXqC5rHHJPJhkvCpKyr9s1TsTlYqC5lcqN_YSMcVlvpIcglKdCZfXcKx3kxCNIvxFcShRBmu8tIvojYdW-bpPd7SOHjPvrz8EwnBf9Y3_VSGSuRgt3YKTiSkNTEfLRD4')",
              }}
            />
          </div>

          {/* IMAGE 4 */}
          <div className="relative group overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFAPKtd5f9zpGuRSksBO_wwOEpmhkYXWGnGmDc7VI01_wn5DmJKp5bspO4TxzYHggPt1GkGZ8hC5LNcOMtRnVLrB9Ve-utoYUX-QGntD56CQIW6SYiQu2UkAzK2kCi5k02FZkhoRK6tx2qcoHxdU6CO0bLmK6QTF1knPzofdnbUBuug83uCpau4cLRy4de3c278i5jGZn93QXJIgUMcvX1Fm3psdNaloFYk-COMf3WqJgh7JZs-4ZZHwfnMGz70L6yxPdMMhmQKHQ')",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
