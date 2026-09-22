import cardScanner from '../assets/card-scanner.png';
import cardMap from '../assets/card-map.png';
import cardImpact from '../assets/card-impact.png';
import content from '../data/content.json';
import Section from './Section';

const featureImages = {
  scanner: cardScanner,
  map: cardMap,
  impact: cardImpact
};

const { features } = content;

export default function Solutions() {
  return (
    <Section
      id="layanan"
      variant="section"
      containerClassName="flex flex-col gap-10 md:gap-12 items-center"
    >

        {/* Section Heading */}
        <div className="flex flex-col gap-3 sm:gap-4 items-center text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight sm:leading-10 text-dark">
            Solusi Cerdas untuk Bumi yang Lebih Hijau
          </h2>
          <p className="text-sm sm:text-base leading-6 text-body">
            Platform terintegrasi yang memudahkan setiap langkah pengelolaan sampah Anda.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="card-feature p-5 md:p-4 lg:p-7 flex flex-col gap-4 justify-between"
            >
              <div className="flex flex-col gap-3 lg:gap-4">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="size-10 lg:size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <i className={`${feature.iconClass} text-lg lg:text-xl text-primary`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-base lg:text-xl xl:text-2xl font-semibold leading-snug text-dark break-words">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>

              <div className="h-32 sm:h-36 lg:h-38 w-full rounded-lg overflow-hidden mt-2 shrink-0">
                <img
                  src={featureImages[feature.imageKey || feature.id]}
                  alt={feature.imageAlt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
    </Section>
  );
}
