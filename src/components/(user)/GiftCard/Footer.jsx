export default function Footer() {
  return (
    <footer className="bg-[#0F2A1D] text-white">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="size-8 text-[#00C951]">
                <svg viewBox="0 0 48 48" fill="currentColor">
                  <path d="M24 6.44c-4.46 0-8.58.63-11.66 1.7-1.53.53-2.91 1.21-3.95 2.06-1.02.84-1.95 2.07-1.95 3.65v20.3c0 1.96 1.4 3.36 2.76 4.24 1.44.93 3.37 1.65 5.54 2.17 2.67.64 5.86 1 9.26 1s6.59-.36 9.26-1c2.17-.52 4.1-1.24 5.54-2.17 1.36-.88 2.76-2.28 2.76-4.24V13.85c0-1.58-.93-2.81-1.95-3.65-1.04-.85-2.42-1.53-3.95-2.06-3.08-1.07-7.2-1.7-11.66-1.7z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold">SPCS India</h2>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Sahithya Pravarthaka Co-operative Society. India’s premier
              cooperative for authors and readers.
            </p>
          </div>

          {/* Explore */}
          <FooterColumn
            title="Explore"
            items={["Bookstore", "New Arrivals", "Bestsellers", "Award Winners"]}
          />

          {/* Services */}
          <FooterColumn
            title="Services"
            items={["Self Publishing", "Distribution", "Library Supply", "Digital Cards"]}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            items={["Help Center", "Shipping Policy", "Bulk Orders", "Contact Us"]}
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © 2024 Sahithya Pravarthaka Co-operative Society Ltd. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a className="hover:text-white transition">Privacy Policy</a>
            <a className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Helper Component */
function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="font-semibold mb-5">{title}</h4>
      <ul className="space-y-3 text-sm text-gray-400">
        {items.map((item) => (
          <li key={item}>
            <a className="hover:text-primary transition-colors cursor-pointer">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
