import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard } from 'lucide-react';
import content from '../data/content.json';
import { useAuth } from '../context/AuthContext';
import ProfileButton from './ProfileButton';

const { navLinks } = content;

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleDaftarClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', href);
          }, 150);
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
        return;
      }
    }
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
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${isScrolled
          ? 'py-2.5 sm:py-3 md:py-4'
          : 'py-3 sm:py-3.5 md:py-4.5'
          }`}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', '/');
            }
          }}
          className="flex items-center gap-2 sm:gap-3 group shrink-0 cursor-pointer"
        >
          <img
            src="/ecocycle-logo.svg"
            alt="EcoCycle AI Logo"
            className="size-8 sm:size-10 group-hover:scale-105 transition-transform shrink-0 object-contain drop-shadow-sm"
          />
          <span className="font-heading font-bold text-base sm:text-xl text-primary tracking-tight select-none whitespace-nowrap">
            EcoCycle AI
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center justify-between w-full max-w-xs lg:max-w-lg px-2 lg:px-6 font-normal text-sm lg:text-lg text-dark gap-2 lg:gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover-text-primary py-1 whitespace-nowrap cursor-pointer transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center shrink-0">
          {isAuthenticated ? (
            <ProfileButton />
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
          className="md:hidden p-2 rounded-lg text-primary hover:bg-black/5 transition-colors focus:outline-none cursor-pointer flex items-center justify-center size-9 sm:size-10"
          aria-label="Buka menu navigasi"
        >
          <i
            className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg sm:text-xl`}
            aria-hidden="true"
          ></i>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white-card px-5 py-4 border-b border-black/10 shadow-lg flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
          {isAuthenticated && (
            <div className="flex items-center gap-2.5 p-2.5 bg-primary/10 rounded-tr-xl rounded-bl-xl mb-1">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.email || user?.name || 'User')}`}
                alt={user?.name || 'User'}
                className="size-8 sm:size-9 rounded-full object-cover border border-primary/30 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">{user?.name || 'Pengguna'}</p>
                <p className="text-[11px] sm:text-xs text-gray-500 truncate">{user?.email || ''}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-medium text-xs sm:text-sm text-dark hover-text-primary py-1.5 cursor-pointer transition-colors"
            >
              {link.label}
            </a>
          ))}

          {isAuthenticated ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-black/10">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full py-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="size-3.5 sm:size-4" />
                <span>Buka Dashboard</span>
              </Button>
              <button
                onClick={handleLogout}
                className="w-full py-2 text-xs sm:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="size-3.5 sm:size-4" />
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <Button
              onClick={handleDaftarClick}
              className="w-full py-2 text-xs sm:text-sm font-semibold mt-1 cursor-pointer"
            >
              Daftar
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
