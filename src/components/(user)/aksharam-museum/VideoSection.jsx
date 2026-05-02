export default function VideoSection() {
  return (
    <section className="w-full flex justify-center py-20 px-5 md:px-10 bg-[#F8F9FA]">
      <div className="max-w-7xl w-full flex flex-col items-center gap-8">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main">
            Experience the Vision
          </h2>
          <p className="text-text-muted mt-2">
            Official Project Walkthrough
          </p>
        </div>

        {/* Video Card */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-float group cursor-pointer">
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtJM0-QKeQbFGjRGGA2rP102Q93kpfc1FcD2-I3M5MaC-VGVPGaGEjQM0dbDa2yOs4ejHB_1LGViKGoF-_vUhk_OB7tZyFzOoKi8vRizecZvJWBhmfEp5OYKMAKjSidHw_xqT0lJY16r8C7HTLmjPIIYcFcuyxN6QnGoq6Rgqdk307rW2kyZGrEbvabgLFWuYWvh3hrxWSAq3owAeuF_RZ-pfvlhDW_mfHsmN89wrlRBKbMhJf_Q0xl3gjpezSRl_yM7DHTTDK6bE')",
            }}
          />

          {/* Play Button */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div
              className="
                size-20 md:size-24 rounded-full
                bg-white/20 backdrop-blur-md
                border border-white/30
                flex items-center justify-center
                text-white
                transition-all duration-300 ease-out
                group-hover:bg-[#14EC5B]
                group-hover:scale-110
                shadow-xl
              "
            >
              <span className="material-symbols-outlined text-4xl md:text-5xl ml-1 group-hover:text-black">
                play_arrow
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
