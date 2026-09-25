import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function CtaBanner() {
  const navigate = useNavigate();

  return (
    <Section
      id="hubungi"
      variant="page"
      containerSize="3xl"
      containerClassName="p-0"
      className="scroll-mt-10 md:scroll-mt-18"
    >
      <ScrollReveal
        delay={100}
        direction="pop"
        distance={45}
        duration={850}
        className="w-full"
      >
        <div className="cta-banner-wrapper">
          {/* Circling Light Beams at the border */}
          <div className="cta-border-beam" aria-hidden="true" />
          <div className="cta-border-beam-glow" aria-hidden="true" />

          {/* Inner Card Content */}
          <div className="card-cta p-8 sm:p-12 md:p-16 flex flex-col items-center gap-6 text-center">
            {/* Ambient Radial Soft Glow in background */}
            <div className="cta-ambient-glow" aria-hidden="true" />

            {/* Main Title */}
            <ScrollReveal delay={300} distance={20} duration={650}>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug sm:leading-tight text-dark max-w-xl tracking-tight">
                Siap Menjadi <span className="text-primary">Pahlawan</span> Lingkungan?
              </h2>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal delay={400} distance={20} duration={650}>
              <p className="text-sm sm:text-base leading-relaxed text-muted max-w-lg">
                Bergabunglah dengan ribuan orang lainnya yang telah membuat perbedaan hari ini. Mulai pilah sampah dan kumpulkan poin reward-mu!
              </p>
            </ScrollReveal>

            {/* CTA Button & Trust Microcopy */}
            <ScrollReveal delay={500} distance={20} duration={650} className="w-full sm:w-auto flex flex-col items-center gap-3">
              <Button
                onClick={() => navigate('/login')}
                variant="primary"
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>Mulai Sekarang!</span>
                <ArrowRight className="size-6" />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
