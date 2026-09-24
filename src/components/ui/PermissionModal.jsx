import React from "react"
import {
  MapPin,
  Camera,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  RefreshCw,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react"

export default function PermissionModal({
  isOpen,
  type = "location", // "location" | "camera"
  status = "prompt", // "prompt" | "denied"
  onAllow,
  onDismiss,
  onRetry,
}) {
  if (!isOpen) return null

  const isLocation = type === "location"
  const isDenied = status === "denied"

  return (
    <div className="permission-modal-overlay" onClick={onDismiss} role="dialog" aria-modal="true">
      <div
        className="permission-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="permission-modal-close"
          onClick={onDismiss}
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header with Icon Glow */}
        <div className="permission-modal-header">
          <div className={`permission-icon-badge ${isDenied ? "badge-denied" : "badge-active"}`}>
            {isDenied ? (
              <AlertCircle className="w-8 h-8 text-amber-600" />
            ) : isLocation ? (
              <MapPin className="w-8 h-8 text-emerald-600" />
            ) : (
              <Camera className="w-8 h-8 text-emerald-600" />
            )}
            <div className="permission-icon-ping" />
          </div>

          <h3 className="permission-modal-title">
            {isDenied
              ? isLocation
                ? "Akses Lokasi Diblokir di Browser"
                : "Akses Kamera Diblokir di Browser"
              : isLocation
                ? "Izinkan Akses Lokasi Anda?"
                : "Izinkan Akses Kamera Perangkat?"}
          </h3>

          <p className="permission-modal-desc">
            {isDenied
              ? `Peramban Anda sebelumnya menolak izin ${isLocation ? "lokasi" : "kamera"}. Ikuti panduan singkat di bawah untuk mengaktifkannya kembali.`
              : isLocation
                ? "EcoCycle AI memerlukan akses lokasi perangkat Anda untuk menemukan dan mengurutkan bank sampah serta drop point daur ulang terdekat di Pulau Bali."
                : "EcoCycle AI menggunakan kamera perangkat Anda untuk memindai fisik sampah secara langsung dan mengenali jenisnya menggunakan kecerdasan buatan."}
          </p>
        </div>

        {/* Modal Body */}
        {isDenied ? (
          <div className="permission-denied-guide">
            <h4 className="guide-title">
              <Lock className="w-4 h-4 text-emerald-700" />
              <span>Cara Mengaktifkan di Browser:</span>
            </h4>
            <ol className="guide-steps">
              <li>
                <span className="step-num">1</span>
                <span>
                  Klik ikon <strong>Gembok (🔒)</strong> atau <strong>Setelan Situs</strong> di sebelah kiri bilah URL browser.
                </span>
              </li>
              <li>
                <span className="step-num">2</span>
                <span>
                  Ubah opsi izin <strong>{isLocation ? "Lokasi" : "Kamera"}</strong> menjadi <strong>Izinkan (Allow)</strong>.
                </span>
              </li>
              <li>
                <span className="step-num">3</span>
                <span>
                  Klik tombol <strong>Coba Lagi</strong> atau muat ulang halaman ini.
                </span>
              </li>
            </ol>
          </div>
        ) : (
          <div className="permission-benefits-list">
            {isLocation ? (
              <>
                <div className="permission-benefit-item">
                  <div className="benefit-icon-box">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <strong>Pusat Daur Ulang Terdekat</strong>
                    <p>Secara otomatis menampilkan dan mengurutkan bank sampah berdasarkan jarak terdekat.</p>
                  </div>
                </div>

                <div className="permission-benefit-item">
                  <div className="benefit-icon-box">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <strong>Rute & Navigasi Cepat</strong>
                    <p>Membantu memandu navigasi langsung ke titik setor sampah yang Anda pilih.</p>
                  </div>
                </div>

                <div className="permission-benefit-item">
                  <div className="benefit-icon-box">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <strong>Privasi 100% Terjaga</strong>
                    <p>Koordinat GPS hanya diolah di perangkat Anda tanpa disimpan di server manapun.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="permission-benefit-item">
                  <div className="benefit-icon-box">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <strong>Pemindaian Objek Real-time</strong>
                    <p>Deteksi instan tanpa perlu repot mengambil foto terpisah lalu mengunggahnya.</p>
                  </div>
                </div>

                <div className="permission-benefit-item">
                  <div className="benefit-icon-box">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <strong>Identifikasi Cerdas & Rekomendasi</strong>
                    <p>Kenali sampah plastik, kaleng, kardus, atau organik beserta panduan daur ulangnya.</p>
                  </div>
                </div>

                <div className="permission-benefit-item">
                  <div className="benefit-icon-box">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <strong>Aman & Tanpa Rekaman</strong>
                    <p>Aliran kamera hanya aktif saat Anda memindai dan tidak ada video yang disimpan.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Modal Actions */}
        <div className="permission-modal-actions">
          {isDenied ? (
            <>
              <button
                className="permission-btn permission-btn-primary"
                onClick={onRetry || (() => window.location.reload())}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Coba Lagi / Muat Ulang</span>
              </button>
              <button
                className="permission-btn permission-btn-secondary"
                onClick={onDismiss}
              >
                <span>Tutup</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="permission-btn permission-btn-primary"
                onClick={onAllow}
              >
                {isLocation ? (
                  <>
                    <MapPin className="w-4 h-4" />
                    <span>Izinkan Akses Lokasi</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    <span>Izinkan & Buka Kamera</span>
                  </>
                )}
              </button>

              <button
                className="permission-btn permission-btn-secondary"
                onClick={onDismiss}
              >
                <span>
                  {isLocation ? "Gunakan Lokasi Default" : "Batal / Unggah Foto"}
                </span>
              </button>
            </>
          )}
        </div>

        {/* Privacy Note */}
        <div className="permission-modal-footer">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Izin dapat dinonaktifkan kembali sewaktu-waktu di pengaturan browser Anda.</span>
        </div>
      </div>
    </div>
  )
}
