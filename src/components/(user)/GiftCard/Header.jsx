import { FiSearch } from "react-icons/fi";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[999] bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="text-gray-900">SPCS India</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a>Books</a>
            <a>Publishing</a>
            <a className="text-green-500 border-b-2 border-green-500 pb-1">
              Gift Cards
            </a>
            <a>Authors</a>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <FiSearch className="text-gray-600 text-lg cursor-pointer" />
          <button className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold">
            Login
          </button>
        </div>

      </div>
    </header>
  );
}
