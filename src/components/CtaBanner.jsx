import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Section from './Section';

export default function CtaBanner() {
  const navigate = useNavigate();

  return (
    <Section
      id="daftar"
      variant="page"
      containerSize="3xl"
      containerClassName="card-cta p-6 sm:p-12 md:p-16 flex flex-col items-center gap-6 text-center"
    >

        <h2 className="text-2xl sm:text-3xl font-bold leading-snug sm:leading-10 text-dark">
          Siap Menjadi Pahlawan Lingkungan?
        </h2>

        <p className="text-sm sm:text-base leading-6 text-muted max-w-lg">
          Bergabunglah dengan ribuan orang lainnya yang telah membuat perbedaan hari ini.
        </p>

        <Button
          onClick={() => navigate('/login')}
          variant="primary"
          className="w-full sm:w-60 px-5 py-3.5 text-lg sm:text-xl leading-6 mt-2 cursor-pointer"
        >
          Daftar Gratis
        </Button>
    </Section>
  );
}
