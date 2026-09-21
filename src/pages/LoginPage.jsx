import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
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
    <div className="h-screen w-full bg-white flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden font-sans select-none">
      {/* LEFT COLUMN: Visual Banner (Exact Figma Node 4:459 Reconstructed with Pure Code) */}
      {/* Hidden on smaller devices (< lg), perfectly fitted on desktop */}
      <div className="relative hidden lg:block lg:w-[58%] xl:w-[59.7%] h-full bg-[#1F7A65] overflow-hidden shrink-0">
        <LoginBackground className="w-full h-full" />

        {/* Subtle Brand Watermark on desktop */}
        <div className="absolute top-6 left-6 xl:top-8 xl:left-8 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <div className="badge-logo flex items-center justify-center size-7 xl:size-8 shadow-sm">
            <i className="fa-solid fa-recycle text-white-app text-xs xl:text-sm" aria-hidden="true"></i>
          </div>
          <span className="font-heading font-bold text-sm xl:text-base text-white tracking-tight">
            EcoCycle AI
          </span>
        </div>

        {/* Floating Back to Home button on banner */}
        <Link
          to="/"
          className="absolute bottom-6 left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-semibold tracking-wide transition-all border border-white/20"
        >
          <ArrowLeft className="size-3.5" />
          Kembali ke Beranda
        </Link>
      </div>

      {/* RIGHT COLUMN: Form Login (Exact Figma Node 4:439) */}
      <div className="w-full lg:w-[42%] xl:w-[40.3%] h-full flex flex-col justify-center items-center px-6 sm:px-10 lg:px-8 xl:px-14 py-8 lg:py-4 bg-white relative overflow-y-auto lg:overflow-hidden">

        {/* Mobile / Tablet Top Header with Back button */}
        <div className="w-full max-w-[440px] flex items-center justify-between lg:hidden mb-6 shrink-0">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-dark/70 hover:text-primary text-xs font-semibold"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-2">
            <div className="badge-logo flex items-center justify-center size-6">
              <i className="fa-solid fa-recycle text-white-app text-[10px]" aria-hidden="true"></i>
            </div>
            <span className="font-heading font-bold text-primary text-sm">EcoCycle AI</span>
          </div>
        </div>

        {/* Form Container: Fitted for desktop viewports without vertical scroll */}
        <div className="w-full max-w-[420px] xl:max-w-[460px] flex flex-col justify-center my-auto">

          {/* Toast / Notification banner */}
          {notification && (
            <div
              className={`mb-3.5 p-3 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 shrink-0 ${notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
                }`}
            >
              {notification.type === 'success' && <Check className="size-4 shrink-0 text-emerald-600" />}
              <span>{notification.message}</span>
            </div>
          )}

          {/* Heading (Frame 4 in Figma) */}
          <div className="flex flex-col gap-1 mb-4 xl:mb-6 text-left shrink-0">
            <h1 className="font-heading text-2xl sm:text-[28px] xl:text-[32px] font-extrabold text-[#191C1D] leading-tight tracking-tight">
              {isRegisterMode ? 'Buat Akun Baru' : 'Selamat Datang'}
            </h1>
            <p className="text-xs sm:text-sm xl:text-base text-[#191C1D] font-normal leading-relaxed">
              {isRegisterMode
                ? 'Daftar sekarang untuk mulai mengelola sampah'
                : 'Buat akun baru atau masuk yang sudah ada'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 xl:gap-4 w-full">

            {/* Optional Name field in Register mode */}
            {isRegisterMode && (
              <div className="flex flex-col gap-1">
                <label className="text-xs xl:text-sm font-medium text-[#191C1D]">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="w-full h-11 lg:h-11 xl:h-13 px-4 xl:px-5 leaf-shape bg-[#E9ECEF] text-sm xl:text-base text-[#191C1D] placeholder-[#8F9B96] outline-none focus:ring-2 focus:ring-[#006B55]/25 transition-all"
                />
              </div>
            )}

            {/* Email Field (Node 4:444) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs xl:text-sm font-medium text-[#191C1D]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full h-11 lg:h-11 xl:h-13 px-4 xl:px-5 leaf-shape bg-[#E9ECEF] text-sm xl:text-base text-[#191C1D] placeholder-[#8F9B96] outline-none focus:ring-2 focus:ring-[#006B55]/25 transition-all"
              />
            </div>

            {/* Password Field (Node 4:445) */}
            <div className="flex flex-col gap-1">
              <label className="text-xs xl:text-sm font-medium text-[#191C1D]">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-full h-11 lg:h-11 xl:h-13 px-4 pr-12 xl:px-5 xl:pr-14 leaf-shape bg-[#E9ECEF] text-sm xl:text-base text-[#191C1D] placeholder-[#8F9B96] outline-none focus:ring-2 focus:ring-[#006B55]/25 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 xl:right-4 top-1/2 -translate-y-1/2 p-1.5 text-[#8F9B96] hover:text-[#191C1D] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
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
                  className={`size-4 sm:size-5 rounded-md flex items-center justify-center transition-all ${rememberMe
                    ? 'bg-[#006B55] text-white shadow-xs'
                    : 'bg-[#D9DEDC] group-hover:bg-[#CED5D2]'
                    }`}
                >
                  {rememberMe && <Check className="size-3 stroke-[3]" />}
                </div>
                <span className="text-xs xl:text-sm text-[#191C1D] font-medium">
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
                className="text-xs xl:text-sm font-normal text-[#191C1D] hover:text-[#006B55] transition-colors cursor-pointer"
              >
                Lupa password?
              </button>
            </div>

            {/* Primary Action Button: "Login ➔" (Node 4:449) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 lg:h-11 xl:h-13 leaf-shape bg-[#006B55] hover:bg-[#005644] active:scale-[0.99] text-white font-bold text-sm sm:text-base xl:text-lg flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs hover:shadow-md disabled:opacity-70 mt-0.5"
            >
              <span>{isRegisterMode ? 'Daftar' : 'Login'}</span>
              <i className="fa-solid fa-arrow-right text-base xl:text-lg" />
            </button>
          </form>

          {/* Divider: "ATAU MASUK DENGAN" (Node 4:450) */}
          <div className="flex items-center justify-center gap-3 my-3 xl:my-4 w-full shrink-0">
            <div className="flex-1 h-[1px] bg-[#E3E7E5]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#6C7A74] whitespace-nowrap uppercase">
              ATAU MASUK DENGAN
            </span>
            <div className="flex-1 h-[1px] bg-[#E3E7E5]" />
          </div>

          {/* Google Button (Node 4:457) */}
          <button
            type="button"
            onClick={handleGoogleClick}
            className="w-full h-11 lg:h-11 xl:h-13 leaf-shape bg-[#E9ECEF] hover:bg-[#DDE2E5] active:scale-[0.99] text-[#191C1D] font-bold text-sm sm:text-base xl:text-lg flex items-center justify-center gap-3 transition-all cursor-pointer shadow-2xs shrink-0"
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
          <div className="mt-3.5 xl:mt-5 text-center text-xs sm:text-sm text-[#191C1D] shrink-0">
            <span>
              {isRegisterMode ? 'Sudah punya akun? ' : 'Belum punya akun? '}
            </span>
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-[#006B55] font-semibold hover:underline cursor-pointer"
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
    </div>
  );
}
