import cardScanner from '../assets/card-scanner.png';
import cardMap from '../assets/card-map.png';
import cardImpact from '../assets/card-impact.png';
import content from '../data/content.json';
import Section from './Section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const featureImages = {
  scanner: cardScanner,
  map: cardMap,
  impact: cardImpact
};

const { features } = content;

export default function Solutions() {
  return (
    <Section
      id="fitur"
      variant="section"
      className="md:scroll-mt-16"
      containerClassName="flex flex-col gap-10 md:gap-12 items-center"
    >

      {/* Section Heading */}
      <ScrollReveal delay={50} distance={24} duration={700}>
        <div className="flex flex-col gap-3 sm:gap-4 items-center text-center max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight sm:leading-10 text-dark tracking-tight">
            <span className="text-primary">Solusi Cerdas</span> untuk Bumi yang Lebih <span className="text-primary">Hijau</span>
          </h2>
          <p className="text-sm sm:text-base leading-6 text-body">
            Platform terintegrasi yang memudahkan setiap langkah pengelolaan sampah Anda.
          </p>
        </div>
      </ScrollReveal>

      {/* 3 Feature Cards Grid with Staggered Gentle Landing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
        {features.map((feature, index) => (
          <ScrollReveal
            key={feature.id}
            delay={120 + index * 150}
            distance={32}
            duration={750}
            className="flex"
          >
            <div
              tabIndex={0}
              className="card-feature p-6 sm:p-5 lg:p-7 flex flex-col gap-5 justify-between w-full cursor-pointer focus:outline-none"
            >
              <div className="relative z-10 flex flex-col gap-3 lg:gap-4">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="feature-icon-badge size-11 lg:size-12 rounded-tr-2xl rounded-bl-2xl flex items-center justify-center shrink-0">
                    <i className={`${feature.iconClass} text-lg lg:text-xl`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-base lg:text-xl xl:text-2xl font-bold leading-snug text-dark break-words">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>

              <div className="feature-image-container relative z-10 h-36 sm:h-40 lg:h-44 w-full mt-2 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={featureImages[feature.imageKey || feature.id]}
                  alt={feature.imageAlt}
                  width="384"
                  height="176"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
