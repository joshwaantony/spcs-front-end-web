import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 xl:px-16 max-w-full xl:max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-slate-800 rounded-md flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-lg">menu_book</span>
              </div>
              <span className="text-lg font-bold text-slate-800">SPCS / NBS</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sahithya Pravarthaka Co-operative Society. The world’s first writer-owned cooperative, securing the future of Malayalam's literary heritage.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">social_leaderboard</span></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">alternate_email</span></a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Contact Us</h4>
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
            <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
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
            <h4 className="font-bold text-slate-900 mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Store Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Rates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">© 2024 SPCS India. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-slate-400">
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