import React from 'react';

const Ticker = () => {
  return (
    <div className="bg-slate-50 border-y border-slate-100 w-full overflow-hidden h-10 flex items-center relative z-40">
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="whitespace-nowrap animate-marquee hover:pause cursor-default text-sm font-medium text-slate-600">
          <span className="inline-flex items-center mx-4"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Latest: Kerala Sahitya Akademi Awards Announced</span>
          <span className="text-slate-300 mx-2">|</span>
          <span className="inline-flex items-center mx-4">Annual Kottayam Book Fair begins Jan 15</span>
          <span className="text-slate-300 mx-2">|</span>
          <span className="inline-flex items-center mx-4">New NBS Branch Opening in Kochi</span>
          <span className="text-slate-300 mx-2">|</span>
          <span className="inline-flex items-center mx-4"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Latest: Kerala Sahitya Akademi Awards Announced</span>
          <span className="text-slate-300 mx-2">|</span>
          <span className="inline-flex items-center mx-4">Annual Kottayam Book Fair begins Jan 15</span>
          <span className="text-slate-300 mx-2">|</span>
          <span className="inline-flex items-center mx-4">New NBS Branch Opening in Kochi</span>
        </div>
      </div>
    </div>
  );
};

export default Ticker;