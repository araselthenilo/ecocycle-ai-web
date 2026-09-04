import content from '../data/content.json';

const { navLinks } = content;

export default function Footer() {
  return (
    <footer id="hubungi" className="w-full bg-white-card footer-shadow">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-9 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo & Copyright */}
        <div className="flex items-center gap-5">
          <div className="badge-logo flex items-center justify-center size-12 shrink-0 shadow-xs">
            <i className="fa-solid fa-recycle text-white-app text-xl" aria-hidden="true"></i>
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="text-2xl font-bold leading-7 text-dark">
              EcoCycle AI
            </span>
            <span className="font-jakarta text-xs font-medium leading-5 text-body">
              © 2026 Arunika Progressive. All rights reserved.
            </span>
          </div>
        </div>

        {/* Footer Quick Links */}
        <nav className="flex items-center gap-6 text-sm font-normal leading-6 text-dark">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover-text-primary">
              {link.label}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  );
}
