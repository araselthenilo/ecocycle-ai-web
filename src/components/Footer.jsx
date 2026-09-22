import content from '../data/content.json';

const { navLinks } = content;

export default function Footer() {
  return (
    <footer id="hubungi" className="w-full bg-white-card footer-shadow scroll-mt-16 md:scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto py-8 md:py-6 lg:py-10 px-6 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

        {/* Logo & Copyright */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <img
            src="/ecocyle-logo.svg"
            alt="EcoCycle AI Logo"
            className="size-11 sm:size-12 shrink-0 object-contain drop-shadow-xs"
          />
          <div className="flex flex-col items-start justify-center">
            <span className="font-heading text-xl sm:text-2xl font-bold leading-tight text-dark">
              EcoCycle AI
            </span>
            <span className="text-xs sm:text-sm font-medium leading-5 text-muted">
              © 2026 Arunika Progressive. All rights reserved.
            </span>
          </div>
        </div>

        {/* Footer Quick Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base font-normal text-dark">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover-text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  );
}
