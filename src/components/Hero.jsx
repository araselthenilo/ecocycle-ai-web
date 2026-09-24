import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import heroArm from '../assets/hero-arm.png';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import { Button } from '@/components/ui/button';
import Section from './Section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function Hero() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <Section
      size="hero"
      variant="transparent"
      containerClassName="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8"
    >

      {/* Left Column: Hero Text */}
      <div className="w-full lg:max-w-xl flex flex-col justify-between shrink-0 gap-3 order-last lg:order-first">

        {/* Heading */}
        <ScrollReveal delay={100} distance={24} duration={700}>
          <h1 className="text-3xl sm:text-2xl lg:text-5xl font-extrabold leading-tight text-dark">
            Kelola <span className="text-primary">Sampah</span> Lebih <span className="text-primary">Cerdas</span> dengan <span className="text-primary">AI</span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={250} distance={24} duration={700}>
          <p className="text-justify sm:text-lg leading-relaxed text-dark">
            Ubah kebiasaan membuang sampah menjadi kontribusi nyata untuk bumi. Identifikasi, kelola, dan dapatkan poin dengan teknologi AI terkini.
          </p>
        </ScrollReveal>

        {/* Button Group */}
        <ScrollReveal delay={400} distance={24} duration={700}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full">
            <Button
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
              variant="primary"
              className="flex-1 w-full px-6 sm:px-8 py-3.5 text-base sm:text-lg font-semibold leading-6 cursor-pointer"
            >
              Mulai Sekarang
            </Button>

            <Button
              href="#layanan"
              variant="outline"
              className="flex-1 w-full px-6 sm:px-8 py-3.5 text-base sm:text-lg font-semibold leading-6 bg-actual-white"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </ScrollReveal>

        {/* Line Divider (CSS) */}
        <div className="w-full h-px bg-muted/30 my-2" aria-hidden="true" />

        {/* User Join Social Proof */}
        <ScrollReveal delay={550} distance={20} duration={700}>
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center">
              <div className="size-10 rounded-tr-2xl rounded-bl-2xl border-2 border-page -mr-3 overflow-hidden shadow-xs relative z-30">
                <img
                  src={userAvatar1}
                  alt="Avatar Pengguna 1"
                  className="size-full object-cover"
                />
              </div>
              <div className="size-10 rounded-tr-2xl rounded-bl-2xl border-2 border-page -mr-3 overflow-hidden shadow-xs relative z-20">
                <img
                  src={userAvatar2}
                  alt="Avatar Pengguna 2"
                  className="size-full object-cover"
                />
              </div>
              <div className="size-10 rounded-tr-2xl rounded-bl-2xl border-2 border-page overflow-hidden shadow-xs relative z-10">
                <img
                  src={userAvatar3}
                  alt="Avatar Pengguna 3"
                  className="size-full object-cover"
                />
              </div>
            </div>

            <p className="text-xs font-medium leading-tight text-dark">
              10rb+ Pengguna telah bergabung.
            </p>
          </div>
        </ScrollReveal>

      </div>

      {/* Right Column: Hero Image (Robotic Arm) */}
      <ScrollReveal
        delay={250}
        distance={36}
        duration={850}
        className="w-full md:max-w-xl order-first lg:order-last"
      >
        <div className="w-full h-36 md:h-96 rounded-tl-2xl rounded-br-2xl hero-image-shadow overflow-hidden">
          <img
            src={heroArm}
            alt="Robot AI pemilah sampah di pusat daur ulang"
            className="w-full h-full object-cover"
          />
        </div>
      </ScrollReveal>
    </Section>
  );
}
