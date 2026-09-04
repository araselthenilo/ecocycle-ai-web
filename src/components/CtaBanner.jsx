import React from 'react';
import { Button } from '@/components/ui/button';

export default function CtaBanner() {
  return (
    <section id="daftar" className="w-full bg-page py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-3xl mx-auto card-cta p-8 sm:p-12 md:p-16 flex flex-col items-center gap-6 text-center">
        
        <h2 className="text-2xl sm:text-3xl font-bold leading-snug sm:leading-10 text-dark">
          Siap Menjadi Pahlawan Lingkungan?
        </h2>

        <p className="text-sm sm:text-base leading-6 text-muted max-w-lg">
          Bergabunglah dengan ribuan orang lainnya yang telah membuat perbedaan hari ini.
        </p>

        <Button 
          href="#" 
          variant="primary"
          className="w-full sm:w-60 px-5 py-3.5 text-lg sm:text-xl leading-6 mt-2"
        >
          Daftar Gratis
        </Button>

      </div>
    </section>
  );
}
