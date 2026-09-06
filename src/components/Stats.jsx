import React from 'react';
import content from '../data/content.json';

const { statistics } = content;


export default function Stats() {
  return (
    <section className="w-full bg-primary p-12 md:p-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 items-center text-center">

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight sm:leading-10 text-white-app">
          Dampak Komunitas Kami
        </h2>

        {/* Stats Flex Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-20 w-full">
          {statistics.map((stat, idx) => (
            <React.Fragment key={stat.label}>
              <div className="flex flex-col gap-4 items-center text-center w-56">
                <div className="font-jakarta font-bold text-4xl lg:text-5xl leading-tight tracking-tight text-white-app">
                  {stat.value}
                </div>
                <div className="text-base leading-6 text-white-app">
                  {stat.label}
                </div>
              </div>

              {/* Vertical Divider (shown between items on desktop) */}
              {idx < statistics.length - 1 && (
                <div className="hidden md:block h-20 w-px bg-white/20 self-center" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
