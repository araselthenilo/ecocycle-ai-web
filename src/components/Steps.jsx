import content from '../data/content.json';
import Section from './Section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const { steps } = content;

export default function Steps() {
  return (
    <Section
      id="cara-kerja"
      variant="page"
      containerClassName="flex flex-col gap-12 lg:gap-16 items-center"
    >
      {/* Section Heading */}
      <ScrollReveal delay={50} distance={24} duration={700}>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight sm:leading-10 text-dark text-center tracking-tight">
          <span className="text-primary">3</span> Langkah <span className="text-primary">Mudah</span> untuk Memulai
        </h2>
      </ScrollReveal>

      {/* Steps Grid */}
      <ScrollReveal delay={120} distance={30} duration={750} className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 w-full justify-items-center">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="w-full flex flex-col items-center relative"
            >
              {/* Desktop Horizontal Route Connector (to next circle) */}
              {index < steps.length - 1 && (
                <div
                  className="step-route-segment hidden md:block absolute left-1/2 top-7 lg:top-8 w-[calc(100%+1rem)] lg:w-[calc(100%+2rem)] -translate-y-1/2 pointer-events-none select-none z-0"
                  aria-hidden="true"
                >
                  {/* SVG Route Path Track with animated dashed line */}
                  <svg className="w-full h-6 overflow-visible block">
                    {/* Soft background dashed track */}
                    <line
                      x1="0"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      stroke="var(--color-primary)"
                      strokeOpacity="0.22"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    />
                    {/* Animated flowing dashed line */}
                    <line
                      x1="0"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      stroke="var(--color-primary)"
                      strokeOpacity="0.85"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      className="animate-route-flow"
                    />
                  </svg>

                  {/* Waypoint Direction Chevron Badge */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center size-6 rounded-full bg-white shadow-xs border border-primary/25 text-primary">
                    <svg className="w-3.5 h-3.5 translate-x-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Traveling Glowing Route Runner Particle */}
                  <div className={`step-runner-h step-runner-h-${index + 1} absolute top-1/2`}>
                    <div className="relative flex items-center justify-center">
                      <span className="absolute size-4 rounded-full bg-primary/30 animate-ping" />
                      <span className="size-2.5 rounded-full bg-primary border-2 border-white shadow-[0_0_8px_rgba(0,107,85,0.7)]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step Card Content */}
              <div className="flex flex-col gap-3 lg:gap-4 items-center text-center max-w-xs relative z-10">
                {/* Circle Container with ripple ring */}
                <div className="relative flex items-center justify-center">
                  <span className={`step-ping-ring step-ping-ring-${index + 1} absolute inset-0 rounded-full border-2 border-primary/40 pointer-events-none`} />
                  <div className="step-circle flex items-center justify-center size-14 lg:size-16 shrink-0 transition-transform duration-300 hover:scale-110 cursor-default">
                    <span className="text-xl lg:text-2xl font-bold leading-8 text-white-app select-none">
                      {item.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-semibold leading-snug text-dark">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>

              {/* Mobile Vertical Route Connector between cards */}
              {index < steps.length - 1 && (
                <div
                  className="md:hidden flex flex-col items-center justify-center my-3 relative w-full h-10 pointer-events-none select-none z-0"
                  aria-hidden="true"
                >
                  <svg className="h-full w-4 overflow-visible">
                    <line
                      x1="50%"
                      y1="0"
                      x2="50%"
                      y2="100%"
                      stroke="var(--color-primary)"
                      strokeOpacity="0.25"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="50%"
                      y1="0"
                      x2="50%"
                      y2="100%"
                      stroke="var(--color-primary)"
                      strokeOpacity="0.85"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      strokeLinecap="round"
                      className="animate-route-flow-v"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center size-5 rounded-full bg-white shadow-xs border border-primary/25 text-primary">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className={`step-runner-v step-runner-v-${index + 1} absolute left-1/2`}>
                    <div className="relative flex items-center justify-center">
                      <span className="size-2 rounded-full bg-primary border border-white shadow-[0_0_6px_rgba(0,107,85,0.7)]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}
