import content from '../data/content.json';

const { steps } = content;

export default function Steps() {
  return (
    <section id="tentang" className="w-full bg-page py-16 md:py-20 px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 items-center">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight sm:leading-10 text-dark text-center">
          3 Langkah Mudah untuk Memulai
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 w-full justify-items-center">
          {steps.map((item) => (
            <div 
              key={item.step} 
              className="flex flex-col gap-4 items-center text-center max-w-xs"
            >
              <div className="step-circle flex items-center justify-center size-16">
                <span className="text-2xl font-bold leading-8 text-white-app">
                  {item.step}
                </span>
              </div>
              <h3 className="text-2xl font-semibold leading-8 text-dark">
                {item.title}
              </h3>
              <p className="text-sm leading-5 text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
