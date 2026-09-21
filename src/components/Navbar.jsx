import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Sparkles, ChevronDown } from 'lucide-react';
import content from '../data/content.json';
import { useAuth } from '../context/AuthContext';

const { navLinks } = content;

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled((prev) => {
            // Hysteresis deadband: activate when scrolling past 60px, return only when near top (< 15px)
            if (!prev && currentScrollY > 60) return true;
            if (prev && currentScrollY < 15) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check on mount
    if (window.scrollY > 60) {
      setIsScrolled(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDaftarClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{ overflowAnchor: 'none' }}
      className={`w-full bg-page/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'shadow-md border-b border-black/10'
        : 'shadow-none border-b border-black/5 lg:border-none'
        }`}
    >
      <div
        className={`w-full max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled
          ? 'py-3 md:py-4'
          : 'py-3.5 md:py-4.5'
          }`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
          <div className="badge-logo flex items-center justify-center size-9 sm:size-10 shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <i className="fa-solid fa-recycle text-white-app text-base sm:text-lg" aria-hidden="true"></i>
          </div>
          <span className="font-heading font-bold text-lg sm:text-xl text-primary tracking-tight select-none whitespace-nowrap">
            EcoCycle AI
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center justify-between w-full max-w-xs lg:max-w-lg px-2 lg:px-6 font-normal text-sm lg:text-lg text-dark gap-2 lg:gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover-text-primary py-1 whitespace-nowrap">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center shrink-0">
          {isAuthenticated ? (
            /* Logged-in User Profile Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 py-1.5 px-3 rounded-full bg-primary/10 hover:bg-primary/15 border border-primary/20 transition-all cursor-pointer select-none"
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.name}
                  className="size-8 rounded-full object-cover border border-primary/30 shrink-0"
                />
                <span className="font-semibold text-sm text-primary max-w-[120px] truncate">
                  {user.name}
                </span>
                <ChevronDown className={`size-4 text-primary transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-black/10 py-3 px-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-3 pb-3 border-b border-black/10">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="size-10 rounded-full object-cover border border-gray-200"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      {user.provider === 'google' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md mt-1">
                          <Sparkles className="size-3" /> Akun Google
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="py-2 flex flex-col gap-1">
                    <div className="px-2 py-1.5 text-xs text-gray-500 flex items-center justify-between">
                      <span>Poin Lingkungan</span>
                      <span className="font-bold text-primary">120 Poin</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-black/10">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-2 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <LogOut className="size-4" />
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Not Logged In: "Daftar" Button */
            <Button
              onClick={handleDaftarClick}
              className="w-auto px-4 lg:px-5 py-2.5 lg:py-3.5 text-sm lg:text-lg font-semibold cursor-pointer"
            >
              Daftar
            </Button>
          )}
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
          {isAuthenticated && (
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-2xl mb-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="size-10 rounded-full object-cover border border-primary/30"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          )}

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

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full py-3 text-base font-semibold text-red-600 bg-red-50 rounded-xl flex items-center justify-center gap-2 mt-2"
            >
              <LogOut className="size-4" />
              Keluar
            </button>
          ) : (
            <Button
              onClick={handleDaftarClick}
              className="w-full py-3 text-lg mt-2 cursor-pointer"
            >
              Daftar
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
