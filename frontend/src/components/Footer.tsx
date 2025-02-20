import { Stethoscope, Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex items-center gap-2">
              <Stethoscope className="w-8 h-8" />
              <h3 className="md:text-4xl text-3xl px-2 font-extrabold">Dr. Ayushi Shakya</h3>
            </div>
          <nav className="flex flex-wrap justify-center gap-8 sm:gap-12">
            <a href="#appointment" className="hover:text-pink-300">Doctor's Schedule</a>
            <a href="#about" className="hover:text-pink-300">About Us</a>
            <a href="#services" className="hover:text-pink-300">Services</a>
            <a href="#appointment" className="hover:text-pink-300">Contact Us</a>
          </nav>
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>50 Sargent Avenue, Phillipsburg, NJ 08865</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>contact@ayushishakya.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>908-454-3400</span>
            </div>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-pink-300">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-pink-300">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-pink-300">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-pink-800 mt-12 pt-8 text-center">
          <p>© 2024 Dr. Ayushi Shakya, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
