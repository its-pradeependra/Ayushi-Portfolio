import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-5 left-6 right-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <a href="#home"><span className="text-pink-500 text-2xl font-extrabold">Dr. Ayushi Shakya</span></a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-8 mr-20">
              <a href="#home" className="text-gray-700 hover:text-pink-500">Home</a>
              <a href="#services" className="text-gray-700 hover:text-pink-500">Services</a>
              <a href="#appointment" className="text-gray-700 hover:text-pink-500">Doctor's Schedule</a>
              <a href="#about" className="text-gray-700 hover:text-pink-500">About Us</a>
            </div>
            <a href="#appointment">
            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600 transition-colors">
              Contact Me
            </button>
            </a>
          </nav>

          {/* Mobile Menu Icon */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "max-h-screen translate-y-0" : "max-h-0 -translate-y-full"
          }`}
        >
          <nav className="mt-4 mb-4">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#home" className="text-gray-700 hover:text-pink-500" onClick={closeMenu}>Home</a>
              <a href="#appointment" className="text-gray-700 hover:text-pink-500" onClick={closeMenu}>Doctor's Schedule</a>
              <a href="#services" className="text-gray-700 hover:text-pink-500" onClick={closeMenu}>Services</a>
              <a href="#about" className="text-gray-700 hover:text-pink-500" onClick={closeMenu}>About Us</a>
              <a href="#appointment"></a>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600 transition-colors" onClick={closeMenu}>
                Contact Me
              </button>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;