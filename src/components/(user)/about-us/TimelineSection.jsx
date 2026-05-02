import React from 'react';

const TimelineSection = () => {
  return (
    <section className="w-full max-w-4xl px-6 lg:px-20 py-16 lg:py-24">
      <div className="flex flex-col items-center mb-12 text-center">
        {/* Fixed Title Color */}
        <span className="text-[#135bec] font-bold tracking-wider uppercase text-sm mb-2">Our History</span>
        <h2 className="text-[#111318] text-3xl lg:text-4xl font-bold leading-tight">The Journey of a Movement</h2>
      </div>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 lg:-ml-[1px]"></div>
        
        {/* Timeline Item 1 */}
        <div className="relative flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-1/2 lg:text-right pt-2 order-2 lg:order-1 lg:pr-12 pl-12 lg:pl-0">
            <h3 className="text-xl font-bold text-[#111318]">The Spark (1945)</h3>
            <p className="text-[#616f89] mt-2 leading-relaxed">Twelve founding members met with a vision to liberate writers from exploitation. With a humble capital of ₹120, SPCS was born.</p>
          </div>
          {/* Fixed Icon Colors */}
          <div className="absolute left-0 lg:left-1/2 top-0 flex items-center justify-center size-10 bg-white border-2 border-[#135bec] rounded-full lg:-ml-5 z-10 shadow-sm">
            <span className="material-symbols-outlined text-[#135bec] text-[20px]">flare</span>
          </div>
          <div className="lg:w-1/2 order-3 lg:order-2"></div>
        </div>
        
        {/* Timeline Item 2 */}
        <div className="relative flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-1/2 order-2 lg:order-1"></div>
          {/* Fixed Icon Colors */}
          <div className="absolute left-0 lg:left-1/2 top-0 flex items-center justify-center size-10 bg-white border-2 border-[#135bec] rounded-full lg:-ml-5 z-10 shadow-sm">
            <span className="material-symbols-outlined text-[#135bec] text-[20px]">sentiment_dissatisfied</span>
          </div>
          <div className="lg:w-1/2 pt-2 order-3 lg:order-2 pl-12 lg:pl-12">
            <h3 className="text-xl font-bold text-[#111318]">The Struggle</h3>
            <p className="text-[#616f89] mt-2 leading-relaxed">Early years were fraught with financial challenges and skepticism. Yet, the commitment to the writer's cause kept the spirit alive.</p>
          </div>
        </div>
        
        {/* Timeline Item 3 */}
        <div className="relative flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-1/2 lg:text-right pt-2 order-2 lg:order-1 lg:pr-12 pl-12 lg:pl-0">
            <h3 className="text-xl font-bold text-[#111318]">The Growth (1949)</h3>
            <p className="text-[#616f89] mt-2 leading-relaxed">A pivotal moment: SPCS acquired the National Book Stall (NBS), creating a powerful distribution network for its writers.</p>
          </div>
          {/* Fixed Icon Colors */}
          <div className="absolute left-0 lg:left-1/2 top-0 flex items-center justify-center size-10 bg-white border-2 border-[#135bec] rounded-full lg:-ml-5 z-10 shadow-sm">
            <span className="material-symbols-outlined text-[#135bec] text-[20px]">trending_up</span>
          </div>
          <div className="lg:w-1/2 order-3 lg:order-2"></div>
        </div>
        
        {/* Timeline Item 4 */}
        <div className="relative flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 order-2 lg:order-1"></div>
          {/* Fixed Icon Colors (This one is filled blue in design) */}
          <div className="absolute left-0 lg:left-1/2 top-0 flex items-center justify-center size-10 bg-[#135bec] rounded-full lg:-ml-5 z-10 shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-[20px]">verified</span>
          </div>
          <div className="lg:w-1/2 pt-2 order-3 lg:order-2 pl-12 lg:pl-12">
            <h3 className="text-xl font-bold text-[#111318]">The Legacy</h3>
            <p className="text-[#616f89] mt-2 leading-relaxed">Today, SPCS stands as a global model for cooperative publishing, ensuring fair royalties and dignity for thousands of authors.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;