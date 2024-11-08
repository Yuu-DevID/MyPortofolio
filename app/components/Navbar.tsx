import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= 100 && bounds.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  const scrollToSection = (sectionId: string, isMobile = false) => {
    const element = document.getElementById(sectionId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
        setActiveSection(sectionId);
    }
    if (isMobile) {
        setIsMenuOpen(false);
    }
};

  return (
    <nav 
      className={`fixed top-6 
    md:left-1/2 md:-translate-x-1/2
    right-6 md:right-auto
    z-50 transition-all duration-500 w-auto
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className={`
          ${isScrolled ? 'bg-gray-900/80 shadow-lg' : 'bg-gray-800/50'} 
          backdrop-blur-md px-3 py-2 rounded-lg border border-gray-700/50
          transition-all duration-300
        `}>
          <ul className="flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <li key={item} 
                  className={`transition-all duration-700`}
                  style={{ transitionDelay: `${index * 100}ms` }}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`px-4 py-2 text-sm rounded-md transition-all duration-300 block
                    ${activeSection === item.toLowerCase()
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className={`
          ${isScrolled ? 'bg-gray-900/80 shadow-lg' : 'bg-gray-800/50'} 
          backdrop-blur-md rounded-lg border border-gray-700/50
          transition-all duration-300
        `}>
          <div className="flex justify-end items-end px-4 py-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className={`
            overflow-hidden transition-all duration-300 px-2
            ${isMenuOpen ? 'max-h-64 pb-3' : 'max-h-0 max-w-0'}
          `}>
            {menuItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-sm rounded-md transition-all duration-300 mb-1
                  ${activeSection === item.toLowerCase()
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }
                  transform transition-all duration-500
                  ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;