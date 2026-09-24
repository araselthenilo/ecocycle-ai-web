import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ArrowLeft, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import LoginBackground from '../components/auth/LoginBackground';
import { useAuth } from '../context/AuthContext';
import GoogleAuthModal from '../components/auth/GoogleAuthModal';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Auto-dismiss toast notification after 4.5 seconds
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification]);

  // Check if valid client ID is configured in .env
  const isGoogleConfigured = Boolean(
    import.meta.env.VITE_GOOGLE_CLIENT_ID &&
    import.meta.env.VITE_GOOGLE_CLIENT_ID.trim() !== '' &&
    !import.meta.env.VITE_GOOGLE_CLIENT_ID.includes('dummy')
  );

  // Official Google OAuth 2.0 Login Hook
  const triggerOfficialGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }).then((res) => res.json());

        const userData = {
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture,
          provider: 'google',
          role: 'user',
          createdAt: new Date().toISOString(),
        };

        await loginWithGoogle(userData, rememberMe);
        setNotification({
          type: 'success',
          message: `Berhasil masuk dengan Google: ${userInfo.name}!`,
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      } catch (err) {
        console.error('Error fetching Google profile:', err);
        setNotification({
          type: 'error',
          message: 'Gagal mengambil informasi profil dari akun Google Anda.',
        });
      }
    },
    onError: (error) => {
      console.error('Official Google Login Failed:', error);
      setNotification({
        type: 'error',
        message: 'Gagal melakukan login dengan Google. Pastikan popup tidak diblokir.',
      });
    },
  });

  const handleGoogleClick = () => {
    if (isGoogleConfigured) {
      // Official Google OAuth popup (accounts.google.com)
      triggerOfficialGoogleLogin();
    } else {
      // Guidance modal with instant testing account picker
      setIsGoogleModalOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegisterMode && !fullName.trim()) {
      setNotification({
        type: 'error',
        message: 'Mohon isi nama lengkap Anda.',
      });
      return;
    }

    if (!email || !password) {
      setNotification({
        type: 'error',
        message: 'Mohon isi email dan password Anda.',
      });
      return;
    }

    try {
      const res = await login(
        email,
        password,
        rememberMe,
        isRegisterMode ? fullName : ""
      );
      if (res.success) {
        setNotification({
          type: 'success',
          message: isRegisterMode
            ? `Akun berhasil dibuat. Selamat datang, ${res.user.name}!`
            : `Selamat datang kembali, ${res.user.name}!`,
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      }
    } catch {
      setNotification({
        type: 'error',
        message: isRegisterMode
          ? 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
          : 'Terjadi kesalahan saat masuk. Silakan coba lagi.',
      });
    }
  };

  const handleGoogleAccountSelected = async (accountData) => {
    try {
      const res = await loginWithGoogle(accountData, rememberMe);
      if (res.success) {
        setNotification({
          type: 'success',
          message: `Berhasil masuk dengan Google: ${res.user.name}!`,
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      }
    } catch {
      setNotification({
        type: 'error',
        message: 'Gagal menghubungkan akun Google.',
      });
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col lg:flex-row overflow-hidden font-sans select-none">
      {/* LEFT COLUMN: Visual Banner (Exact Figma Node 4:459 Reconstructed with Pure Code) */}
      {/* Hidden on smaller devices (< lg), perfectly fitted on desktop */}
      <div className="relative hidden lg:block lg:w-[58%] xl:w-[59.7%] h-full bg-primary overflow-hidden shrink-0">
        <LoginBackground className="w-full h-full" />

        {/* Brand Badge on desktop */}
        <div className="absolute top-6 left-6 xl:top-8 xl:left-8 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-bl-2xl rounded-tr-2xl shadow-sm border border-white/80 transition-all hover:scale-[1.02]">
          <img
            src="/ecocyle-logo.svg"
            alt="EcoCycle AI Logo"
            className="size-7 xl:size-8 shrink-0 object-contain drop-shadow-xs"
          />
          <span className="font-heading font-bold text-sm xl:text-base text-primary tracking-tight">
            EcoCycle AI
          </span>
        </div>

        {/* Floating Back to Home button on banner */}
        <Link
          to="/"
          className="absolute bottom-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-tl-2xl rounded-br-2xl bg-white/95 hover:bg-white backdrop-blur-md text-dark hover:text-primary text-xs font-semibold tracking-wide transition-all border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
        >
          <ArrowLeft className="size-3.5 text-primary group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* RIGHT COLUMN: Form Login (Exact Figma Node 4:439) */}
      <div className="w-full lg:w-[42%] xl:w-[40.3%] h-full flex flex-col items-center px-6 sm:px-10 lg:px-8 xl:px-12 py-6 lg:py-4 bg-white relative overflow-y-auto custom-scrollbar">

        {/* Mobile / Tablet Top Header with Back button */}
        <div className="w-full max-w-[420px] xl:max-w-[440px] flex items-center justify-between lg:hidden mb-4 sm:mb-6 shrink-0">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-dark/70 hover:text-primary text-xs font-semibold"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-2">
            <img
              src="/ecocyle-logo.svg"
              alt="EcoCycle AI Logo"
              className="size-6 shrink-0 object-contain"
            />
            <span className="font-heading font-bold text-primary text-sm">EcoCycle AI</span>
          </div>
        </div>

        {/* Form Container: Fitted for desktop viewports and scrollable when height is constrained (e.g. 150% zoom) */}
        <div className="w-full max-w-[400px] xl:max-w-[440px] flex flex-col justify-center my-auto py-2 sm:py-4">

          {/* Heading (Frame 4 in Figma) */}
          <div className="flex flex-col gap-0.5 sm:gap-1 mb-3 xl:mb-5 text-left shrink-0">
            <h1 className="font-heading text-xl sm:text-2xl xl:text-[28px] font-extrabold text-primary leading-tight tracking-tight">
              {isRegisterMode ? 'Buat Akun Baru' : 'Selamat Datang'}
            </h1>
            <p className="text-xs sm:text-sm xl:text-base text-dark font-normal leading-relaxed">
              {isRegisterMode
                ? 'Daftar sekarang untuk mulai mengelola sampah'
                : 'Buat akun baru atau masuk yang sudah ada'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:gap-3 xl:gap-3.5 w-full">

            {/* Optional Name field in Register mode */}
            {isRegisterMode && (
              <div className="flex flex-col gap-1">
                <label className="text-xs xl:text-sm font-medium text-dark">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="w-full h-10 sm:h-11 xl:h-12 px-4 xl:px-5 leaf-shape bg-section text-sm xl:text-base text-dark placeholder-muted outline-none focus:ring-2 focus:ring-primary/25 transition-all"
                />
              </div>
            )}

            {/* Email Field (Node 4:444) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs xl:text-sm font-medium text-dark">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full h-10 sm:h-11 xl:h-12 px-4 xl:px-5 leaf-shape bg-section text-sm xl:text-base text-dark placeholder-muted outline-none focus:ring-2 focus:ring-primary/25 transition-all"
              />
            </div>

            {/* Password Field (Node 4:445) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs xl:text-sm font-medium text-dark">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-full h-10 sm:h-11 xl:h-12 px-4 pr-12 xl:px-5 xl:pr-14 leaf-shape bg-section text-sm xl:text-base text-dark placeholder-muted outline-none focus:ring-2 focus:ring-primary/25 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 xl:right-4 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-dark transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-base xl:text-lg`} />
                </button>
              </div>
            </div>

            {/* Options Row: Checkbox "Ingat saya" & "Lupa password?" (Frame 2 in Figma) */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`size-4 sm:size-5 rounded-tr-md rounded-bl-md flex items-center justify-center transition-all ${rememberMe
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-section border border-muted/30 group-hover:bg-muted/20'
                    }`}
                >
                  {rememberMe && <Check className="size-3 stroke-[3]" />}
                </div>
                <span className="text-xs xl:text-sm text-dark font-medium">
                  Ingat saya
                </span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setNotification({
                    type: 'success',
                    message: 'Instruksi reset password telah dikirim ke email terdaftar.',
                  });
                }}
                className="text-xs xl:text-sm font-normal text-dark hover:text-primary transition-colors cursor-pointer"
              >
                Lupa password?
              </button>
            </div>

            {/* Primary Action Button: "Login ➔" (Node 4:449) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 xl:h-12 leaf-shape bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold text-sm sm:text-base xl:text-lg flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs hover:shadow-md disabled:opacity-70 mt-0.5"
            >
              <span>{isRegisterMode ? 'Daftar' : 'Login'}</span>
              <i className="fa-solid fa-arrow-right text-base xl:text-lg" />
            </button>
          </form>

          {/* Divider: "ATAU MASUK DENGAN" (Node 4:450) */}
          <div className="flex items-center justify-center gap-3 my-2.5 xl:my-3.5 w-full shrink-0">
            <div className="flex-1 h-[1px] bg-muted/20" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-muted whitespace-nowrap uppercase">
              ATAU MASUK DENGAN
            </span>
            <div className="flex-1 h-[1px] bg-muted/20" />
          </div>

          {/* Google Button (Node 4:457) */}
          <button
            type="button"
            onClick={handleGoogleClick}
            className="w-full h-10 sm:h-11 xl:h-12 leaf-shape bg-section hover:bg-muted/15 active:scale-[0.99] text-dark font-bold text-sm sm:text-base xl:text-lg flex items-center justify-center gap-3 transition-all cursor-pointer shadow-2xs shrink-0"
          >
            <span>Google</span>
            <svg className="size-4 sm:size-5 xl:size-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </button>

          {/* Footer Text (Node 4:458) */}
          <div className="mt-2.5 xl:mt-4 text-center text-xs sm:text-sm text-dark shrink-0">
            <span>
              {isRegisterMode ? 'Sudah punya akun? ' : 'Belum punya akun? '}
            </span>
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              {isRegisterMode ? 'Masuk sekarang' : 'Daftar sekarang'}
            </button>
          </div>

        </div>
      </div>

      {/* Interactive Google Sign-In Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectAccount={handleGoogleAccountSelected}
      />

      {/* Floating Modern Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 max-w-sm sm:max-w-md w-[calc(100%-2.5rem)] animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div
            role="alert"
            className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl shadow-2xl backdrop-blur-md border text-xs sm:text-sm font-medium transition-all ${notification.type === 'success'
                ? 'bg-white/95 border-emerald-200/90 text-emerald-950 shadow-emerald-900/10'
                : 'bg-white/95 border-rose-200/90 text-rose-950 shadow-rose-900/10'
              }`}
          >
            <div
              className={`size-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${notification.type === 'success'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
                }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle2 className="size-4 stroke-[2.5]" />
              ) : (
                <AlertCircle className="size-4 stroke-[2.5]" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <p className="font-semibold text-xs sm:text-sm leading-snug">
                {notification.type === 'success' ? 'Berhasil' : 'Perhatian'}
              </p>
              <p className="text-muted text-[11px] sm:text-xs mt-0.5 leading-relaxed break-words">
                {notification.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-muted hover:text-dark p-1 rounded-lg hover:bg-black/5 transition-colors shrink-0 cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
