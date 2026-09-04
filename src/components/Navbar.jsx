import { useState } from 'react';
import { Button } from '@/components/ui/button';
import content from '../data/content.json';

const { navLinks } = content;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-page border-b border-black/5 lg:border-none sticky top-0 z-50 transition-all">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 md:py-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="badge-logo flex items-center justify-center size-10 shadow-sm group-hover:scale-105 transition-transform">
            <i className="fa-solid fa-recycle text-white-app text-lg" aria-hidden="true"></i>
          </div>
          <span className="font-bold text-xl text-primary tracking-tight select-none">
            EcoCycle AI
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center justify-between w-full max-w-md lg:max-w-lg font-normal text-base lg:text-lg text-dark">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover-text-primary py-1">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Daftar Button */}
        <div className="hidden md:flex items-center">
          <Button 
            href="#daftar" 
            className="w-32 px-5 py-3.5 text-lg font-semibold"
          >
            Daftar
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-primary hover:bg-black/5 transition-colors focus:outline-none cursor-pointer flex items-center justify-center size-10"
          aria-label="Buka menu navigasi"
        >
          <i 
            className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} 
            aria-hidden="true"
          ></i>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white-card px-6 py-6 border-b border-black/10 shadow-lg flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-lg text-dark hover-text-primary py-2"
            >
              {link.label}
            </a>
          ))}
          <Button 
            href="#daftar"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 text-lg mt-2"
          >
            Daftar
          </Button>
        </div>
      )}
    </header>
  );
}
