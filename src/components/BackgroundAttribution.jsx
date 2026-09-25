export default function BackgroundAttribution({ className = '' }) {
  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full p-2 text-center text-xs text-slate-500 bg-white/60 backdrop-blur-sm pointer-events-none ${className}`}
    >
      <p className="pointer-events-auto inline-block">
        {/* Background vector source requirement for INVENTION 2026: https://www.vecteezy.com/vector-art/115568-free-batik-background-vectors */}
        Batik Background vector by{' '}
        <a
          href="https://www.vecteezy.com/vector-art/115568-free-batik-background-vectors"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-700 hover:text-primary hover:underline transition-colors"
        >
          Vecteezy
        </a>
      </p>
    </div>
  );
}
