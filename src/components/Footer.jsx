import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function Footer() {
  return (
    <footer className="w-full bg-white-card footer-shadow mt-6">
      <ScrollReveal delay={50} distance={20} duration={600}>
        <div className="w-full max-w-7xl mx-auto py-3 md:py-4 px-1 sm:px-4 lg:px-8 flex items-center justify-between">

          {/* Logo & Copyright */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/ecocycle-logo.svg"
              alt="EcoCycle AI Logo"
              className="size-8 sm:size-9 shrink-0 object-contain drop-shadow-xs"
            />
            <div className="flex flex-col items-start justify-center">
              <span className="font-heading text-sm sm:text-base font-bold leading-tight text-dark">
                EcoCycle AI
              </span>
              <span className="text-[8px] sm:text-[10px] font-medium leading-normal text-muted">
                © 2026 Arunika Progressive. All rights reserved.
              </span>
            </div>
          </div>

          {/* Background Vector Attribution */}
          <div className="text-right text-[8px] sm:text-[10px] text-muted">
            <p>
              {/* Background vector source requirement for INVENTION 2026: https://www.vecteezy.com/vector-art/115568-free-batik-background-vectors */}
              Batik Background vector by{' '}
              <a
                href="https://www.vecteezy.com/vector-art/115568-free-batik-background-vectors"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-dark hover:text-primary hover:underline transition-colors"
              >
                Vecteezy
              </a>
            </p>
          </div>

        </div>
      </ScrollReveal>
    </footer>
  );
}
