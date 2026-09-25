import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Solutions from '../components/Solutions';
import Steps from '../components/Steps';
import Stats from '../components/Stats';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import batikBg from '../assets/vecteezy_free-batik-background-vectors_115568.svg';

export default function LandingPage() {
  return (
    <div className="app-container font-sans antialiased relative min-h-screen overflow-x-clip">
      {/* Background Batik Texture strictly behind content */}
      <div
        className="fixed inset-0 pointer-events-none z-0 select-none"
        style={{
          backgroundImage: `url(${batikBg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '800px auto',
          backgroundPosition: 'center top',
          opacity: 0.06,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <Hero />
          <Solutions />
          <Steps />
          <Stats />
          <CtaBanner />
        </main>
        <Footer className="mt-auto" />
      </div>
    </div>
  );
}
