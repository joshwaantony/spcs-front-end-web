import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 pt-12 pb-8 sm:pt-16">
      <div className="container mx-auto max-w-full px-3 min-[360px]:px-4 md:px-6 xl:max-w-[1400px] xl:px-16">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.18)] min-[360px]:p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.25)] min-[360px]:h-14 min-[360px]:w-14">
                  <Image
                    src="/spcs-logo.png"
                    alt="SPCS logo"
                    width={56}
                    height={56}
                    className="h-full w-full object-contain p-1.5"
                  />
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-base font-black tracking-[0.08em] text-slate-800 min-[360px]:text-lg">
                    SPCS / NBS
                  </span>
                
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Sahithya Pravarthaka Co-operative Society. The world&apos;s first
              writer-owned cooperative, securing the future of Malayalam&apos;s
              literary heritage.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 transition-colors hover:text-primary"><span className="material-symbols-outlined">social_leaderboard</span></a>
              <a href="#" className="text-slate-400 transition-colors hover:text-primary"><span className="material-symbols-outlined">alternate_email</span></a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-bold text-slate-900">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base mt-0.5 shrink-0">location_on</span>
                <span>SPCS Head Office, Kottayam,<br />Kerala - 686 001</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base shrink-0">call</span>
                <span>0481-2564111</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base shrink-0">mail</span>
                <span>spcsktm@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-bold text-slate-900">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">About SPCS</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Board of Directors</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">NBS Bulletin</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Latest Catalogue</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Store Locator</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="mb-4 font-bold text-slate-900">Customer Care</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Store Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Rates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-left min-[360px]:pt-8 md:flex-row md:items-center">
          <p className="text-xs text-slate-400">© 2024 SPCS India. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600">Privacy</a>
            <a href="#" className="hover:text-slate-600">Terms</a>
            <a href="#" className="hover:text-slate-600">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
