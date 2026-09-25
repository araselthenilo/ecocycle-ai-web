import React from 'react';
import content from '../data/content.json';
import Section from './Section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const { statistics } = content;

export default function Stats() {
  return (
    <Section
      variant="primary"
      containerClassName="flex flex-col gap-12 items-center text-center"
    >

        {/* Section Heading */}
        <ScrollReveal delay={50} distance={24} duration={700}>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight sm:leading-10 text-white-app tracking-tight">
            Dampak Komunitas Kami
          </h2>
        </ScrollReveal>

        {/* Stats Flex Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-20 w-full">
          {statistics.map((stat, idx) => (
            <React.Fragment key={stat.label}>
              <ScrollReveal
                delay={120 + idx * 150}
                distance={28}
                duration={750}
              >
                <div className="flex flex-col gap-4 items-center text-center w-56">
                  <div className="font-display font-bold text-4xl lg:text-5xl leading-tight tracking-tight text-white-app">
                    {stat.value}
                  </div>
                  <div className="text-base leading-6 text-white-app">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>

              {/* Vertical Divider (shown between items on desktop) */}
              {idx < statistics.length - 1 && (
                <ScrollReveal
                  delay={120 + idx * 150 + 75}
                  direction="fade"
                  duration={750}
                  className="hidden md:block self-center"
                >
                  <div className="h-20 w-px bg-white/20" aria-hidden="true" />
                </ScrollReveal>
              )}
            </React.Fragment>
          ))}
        </div>
    </Section>
  );
}
