import React from 'react';
import heroArm from '../assets/hero-arm.png';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 md:py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between">

        {/* Left Column: Hero Text */}
        <div className="w-full lg:max-w-xl flex flex-col justify-between shrink-0 gap-7 md:gap-8">

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-dark">
            Kelola Sampah Lebih Cerdas dengan AI
          </h1>

          {/* Subtitle */}
          <p className="text-justify sm:text-lg leading-relaxed text-dark">
            Ubah kebiasaan membuang sampah menjadi kontribusi nyata untuk bumi. Identifikasi, kelola, dan dapatkan poin dengan teknologi AI terkini.
          </p>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
            <Button
              href="#daftar"
              variant="primary"
              className="w-full sm:w-60 px-5 py-3.5 text-lg sm:text-xl leading-6"
            >
              Mulai Sekarang
            </Button>

            <Button
              href="#layanan"
              variant="outline"
              className="w-full sm:w-60 px-5 py-3.5 text-lg sm:text-xl leading-6"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>

          {/* Line Divider (CSS) */}
          <div className="w-full h-px bg-[#6C7A74]/30 my-2" aria-hidden="true" />

          {/* User Join Social Proof */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center">
              <div className="size-10 rounded-full border-2 border-page -mr-3 overflow-hidden shadow-xs relative z-30">
                <img
                  src={userAvatar1}
                  alt="Avatar Pengguna 1"
                  className="size-full object-cover"
                />
              </div>
              <div className="size-10 rounded-full border-2 border-page -mr-3 overflow-hidden shadow-xs relative z-20">
                <img
                  src={userAvatar2}
                  alt="Avatar Pengguna 2"
                  className="size-full object-cover"
                />
              </div>
              <div className="size-10 rounded-full border-2 border-page overflow-hidden shadow-xs relative z-10">
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

        </div>

        {/* Right Column: Hero Image (Robotic Arm) */}
        <div className="w-full lg:max-w-xl h-80 sm:h-96 rounded-3xl hero-image-shadow overflow-hidden shrink-0 group">
          <img
            src={heroArm}
            alt="Robot AI pemilah sampah di pusat daur ulang"
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </section>
  );
}
