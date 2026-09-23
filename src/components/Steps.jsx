import content from '../data/content.json';
import Section from './Section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const { steps } = content;

export default function Steps() {
  return (
    <Section
      id="tentang"
      variant="page"
      containerClassName="flex flex-col gap-12 lg:gap-16 items-center"
    >

        {/* Section Heading */}
        <ScrollReveal delay={50} distance={24} duration={700}>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight sm:leading-10 text-dark text-center">
            3 Langkah Mudah untuk Memulai
          </h2>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 w-full justify-items-center">
          {steps.map((item, index) => (
            <ScrollReveal
              key={item.step}
              delay={120 + index * 150}
              distance={30}
              duration={750}
              className="w-full flex justify-center"
            >
              <div
                className="flex flex-col gap-3 lg:gap-4 items-center text-center max-w-xs"
              >
                <div className="step-circle flex items-center justify-center size-14 lg:size-16 shrink-0 transition-transform duration-300 hover:scale-110">
                  <span className="text-xl lg:text-2xl font-bold leading-8 text-white-app">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-semibold leading-snug text-dark">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
    </Section>
  );
}
