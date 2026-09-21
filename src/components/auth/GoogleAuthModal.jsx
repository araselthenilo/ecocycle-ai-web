import { useState } from 'react';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';

export default function GoogleAuthModal({ isOpen, onClose, onSelectAccount }) {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  if (!isOpen) return null;

  const presetAccounts = [
    {
      id: 'g_account_1',
      name: 'Arasel Thenilo',
      email: 'arasel.thenilo@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'g_account_2',
      name: 'EcoCycle Team',
      email: 'ecocycle.ai.team@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    },
  ];

  const handleSelectPreset = (acc) => {
    setSelectedId(acc.id);
    setTimeout(() => {
      onSelectAccount({
        id: acc.id,
        name: acc.name,
        email: acc.email,
        avatar: acc.avatar,
        provider: 'google',
        role: 'user',
        createdAt: new Date().toISOString(),
      });
      onClose();
    }, 400);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail) return;

    const name = customName.trim() || customEmail.split('@')[0];
    onSelectAccount({
      id: 'g_' + Date.now(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: customEmail.includes('@') ? customEmail : `${customEmail}@gmail.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(customEmail)}`,
      provider: 'google',
      role: 'user',
      createdAt: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="size-5" />
        </button>

        {/* Header with Google Logo */}
        <div className="flex flex-col items-center text-center gap-3">
          <svg className="size-10" viewBox="0 0 24 24">
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
          <div>
            <h3 className="font-heading text-xl font-bold text-gray-900">Masuk dengan Google</h3>
            <p className="text-sm text-gray-500 mt-1">
              Pilih akun untuk melanjutkan ke <span className="font-semibold text-primary">EcoCycle AI</span>
            </p>
          </div>
        </div>

        {/* Guidance Notice */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 text-left text-xs text-amber-800 flex items-start gap-2">
          <span className="text-sm">💡</span>
          <div>
            <p className="font-semibold">Mode Simulasi Cepat Aktif</p>
            <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
              Untuk mengaktifkan popup resmi <strong>accounts.google.com</strong>, tambahkan <code>VITE_GOOGLE_CLIENT_ID</code> Anda di file <code>.env</code>.
            </p>
          </div>
        </div>

        {/* Account List */}
        {!showCustomInput ? (
          <div className="flex flex-col gap-2.5">
            {presetAccounts.map((acc) => {
              const isSelected = selectedId === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => handleSelectPreset(acc)}
                  disabled={selectedId !== null}
                  className={`flex items-center gap-3.5 p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="size-11 rounded-full object-cover border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{acc.name}</p>
                    <p className="text-xs text-gray-500 truncate">{acc.email}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="size-5 text-primary shrink-0 animate-in zoom-in duration-150" />
                  )}
                </button>
              );
            })}

            {/* Option to use another custom account */}
            <button
              onClick={() => setShowCustomInput(true)}
              className="flex items-center gap-3.5 p-3 rounded-2xl text-left border border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer mt-1"
            >
              <div className="size-11 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                <UserPlus className="size-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-800">Gunakan akun Google lain</p>
                <p className="text-xs text-gray-400">Ketik alamat Gmail Anda</p>
              </div>
            </button>
          </div>
        ) : (
          /* Form for custom Gmail */
          <form onSubmit={handleCustomSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="cth. Budi Santoso"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Akun Google <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="nama@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
              >
                Masuk
              </button>
            </div>
          </form>
        )}

        {/* Footer info */}
        <p className="text-[11px] text-center text-gray-400 leading-tight">
          Dengan melanjutkan, Anda mengizinkan EcoCycle AI untuk mengakses profil dan alamat email dasar Google Anda.
        </p>
      </div>
    </div>
  );
}
