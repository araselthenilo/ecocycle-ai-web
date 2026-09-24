import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"

const userBadges = [
  {
    id: "top-recycler",
    name: "Peringkat #1 Komunitas",
    desc: "Memimpin perolehan Eco Points mingguan se-Bali.",
    iconClass: "fa-solid fa-trophy",
    color: "#eab308",
    bg: "#fef9c3",
    unlocked: true,
    date: "18 Sep 2026",
  },
  {
    id: "green-streak",
    name: "7-Day Green Streak",
    desc: "Konsisten memilah dan mendata sampah 7 hari berturut-turut.",
    iconClass: "fa-solid fa-fire",
    color: "#ef4444",
    bg: "#fee2e2",
    unlocked: true,
    date: "Kemarin",
  },
  {
    id: "ai-scanner",
    name: "AI Scanner Pro",
    desc: "Memindai lebih dari 20 objek sampah menggunakan AI Vision.",
    iconClass: "fa-solid fa-barcode",
    color: "#0284c7",
    bg: "#e0f2fe",
    unlocked: true,
    date: "15 Sep 2026",
  },
  {
    id: "eco-map",
    name: "Eco Explorer",
    desc: "Menemukan dan menyetorkan sampah ke bank sampah mitra terdekat.",
    iconClass: "fa-solid fa-location-dot",
    color: "#16a34a",
    bg: "#dcfce7",
    unlocked: true,
    date: "12 Sep 2026",
  },
  {
    id: "carbon-saver",
    name: "Pelindung Karbon",
    desc: "Mengurangi potensi emisi karbon lebih dari 5 kg CO₂e.",
    iconClass: "fa-solid fa-leaf",
    color: "#059669",
    bg: "#d1fae5",
    unlocked: true,
    date: "10 Sep 2026",
  },
  {
    id: "zero-waste",
    name: "Kompos Master",
    desc: "Olah 10 kg sampah organik basah menjadi pupuk alami.",
    iconClass: "fa-solid fa-seedling",
    color: "#6b7280",
    bg: "#f3f4f6",
    unlocked: false,
    progress: "60%",
  },
]

function formatMemberId(id) {
  if (!id) return "ECO-2026"
  if (id.length > 14) {
    return `${id.slice(0, 6)}...${id.slice(-4)}`
  }
  return id
}

function getInitials(name = "Pengguna") {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default function Profile() {
  const { user, updateProfile } = useAuth()

  // Profile data with fallbacks
  const displayName = user?.name || "Budi Santoso"
  const displayEmail = user?.email || "budi.santoso@ecocycle.id"
  const displayRole = user?.role === "admin" ? "Admin Komunitas" : "Veteran Eco Warrior"
  const memberId = user?.id || "ECO-2026-8842"

  // Editable fields state
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: displayName,
    bio:
      user?.bio ||
      "Pecinta lingkungan aktif dari Bali. Berkomitmen memilah dan mendaur ulang sampah plastik setiap hari menuju Indonesia Zero Waste.",
    location: user?.location || "Denpasar, Bali, Indonesia",
    phone: user?.phone || "+62 812-3456-7890",
  })
  const [savedNotice, setSavedNotice] = useState(false)
  const [copiedId, setCopiedId] = useState(false)

  // Keep formData in sync if user changes
  useEffect(() => {
    if (user?.name) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        bio: user.bio || prev.bio,
        location: user.location || prev.location,
        phone: user.phone || prev.phone,
      }))
    }
  }, [user])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isEditing) {
        setIsEditing(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isEditing])

  const handleCopyId = () => {
    navigator.clipboard?.writeText(memberId)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    if (updateProfile) {
      updateProfile({
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        phone: formData.phone,
      })
    }
    setIsEditing(false)
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  return (
    <div className="profile-page">
      {savedNotice && (
        <div className="profile-toast-alert">
          <i className="fa-solid fa-circle-check text-emerald-600 text-lg mr-2" />
          <span>Profil berhasil diperbarui dan disimpan!</span>
        </div>
      )}

      {/* Main Profile Hero Card */}
      <Card className="profile-card profile-hero-card">
        <div className="profile-hero-banner">
          <div className="profile-hero-pattern" aria-hidden="true" />
          <div className="profile-hero-decor-leaf" aria-hidden="true" />
        </div>

        <CardContent className="profile-hero-content">
          <div className="profile-hero-main">
            <div className="profile-avatar-container">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="profile-large-avatar-image"
                />
              ) : (
                <div className="profile-large-avatar">
                  {getInitials(displayName)}
                </div>
              )}
            </div>

            <div className="profile-identity">
              <div className="profile-title-row">
                <h2 className="profile-user-name">{displayName}</h2>
                <span className="profile-role-pill">{displayRole}</span>
              </div>

              <p className="profile-email-text">
                <i className="fa-solid fa-envelope mr-1.5 opacity-70 text-xs" />
                {displayEmail}
              </p>

              <p className="profile-bio-text">{formData.bio}</p>

              <div className="profile-meta-tags">
                <span className="profile-meta-tag">
                  <i className="fa-solid fa-location-dot text-emerald-600 text-xs mr-1" />
                  {formData.location}
                </span>
                <span className="profile-meta-tag">
                  <i className="fa-solid fa-calendar-days text-emerald-600 text-xs mr-1" />
                  Bergabung Jan 2026
                </span>
                <button
                  type="button"
                  className="profile-meta-tag profile-id-btn"
                  onClick={handleCopyId}
                  title={`Klik untuk salin ID lengkap: ${memberId}`}
                  aria-label="Salin ID Pengguna"
                >
                  {copiedId ? (
                    <i className="fa-solid fa-check text-emerald-600 text-xs mr-1" />
                  ) : (
                    <i className="fa-solid fa-copy text-emerald-700 text-xs mr-1" />
                  )}
                  <span>ID: {formatMemberId(memberId)}</span>
                  <span className="profile-id-chip-action">
                    {copiedId ? "Tersalin!" : "Salin"}
                  </span>
                </button>
              </div>
            </div>

            <div className="profile-actions-column">
              <Button
                variant="ghost"
                className="profile-action-btn edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <i className="fa-solid fa-pen-to-square mr-2 text-sm" />
                Edit Profil
              </Button>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="profile-level-box">
            <div className="profile-level-header">
              <div className="profile-level-info">
                <i className="fa-solid fa-award text-emerald-600 text-base mr-2" />
                <strong>Level 4 • Eco Hero</strong>
              </div>
              <span className="profile-level-points">
                1.240 / 1.500 XP menuju Level 5
              </span>
            </div>
            <div className="profile-progress-bar-track">
              <div
                className="profile-progress-bar-fill"
                style={{ width: "82%" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Eco Metrics Stats (Dashboard Themed & Leaf-Shaped) */}
      <div className="profile-stats-grid">
        <Card className="profile-stat-card profile-stat-card-amber">
          <div className="profile-stat-icon-wrapper">
            <i className="fa-solid fa-box" />
          </div>
          <div className="profile-stat-data">
            <span className="profile-stat-label">Total Eco Points</span>
            <strong className="profile-stat-value">1.240 Poin</strong>
            <small className="profile-stat-sub">
              +120 poin minggu ini
            </small>
          </div>
        </Card>

        <Card className="profile-stat-card profile-stat-card-emerald">
          <div className="profile-stat-icon-wrapper">
            <i className="fa-solid fa-recycle" />
          </div>
          <div className="profile-stat-data">
            <span className="profile-stat-label">Sampah Terpilah</span>
            <strong className="profile-stat-value">2,4 kg</strong>
            <small className="profile-stat-sub">
              Plastik, kertas & kaleng
            </small>
          </div>
        </Card>

        <Card className="profile-stat-card profile-stat-card-teal">
          <div className="profile-stat-icon-wrapper">
            <i className="fa-solid fa-leaf" />
          </div>
          <div className="profile-stat-data">
            <span className="profile-stat-label">Emisi CO₂ Dicegah</span>
            <strong className="profile-stat-value">~5,8 kg</strong>
            <small className="profile-stat-sub">
              Setara 3 pohon diselamatkan
            </small>
          </div>
        </Card>

        <Card className="profile-stat-card profile-stat-card-rose">
          <div className="profile-stat-icon-wrapper">
            <i className="fa-solid fa-fire" />
          </div>
          <div className="profile-stat-data">
            <span className="profile-stat-label">Green Streak</span>
            <strong className="profile-stat-value">7 Hari</strong>
            <small className="profile-stat-sub">
              Jangan sampai terputus!
            </small>
          </div>
        </Card>
      </div>

      {/* Badges / Pencapaian Hijau (Full Width) */}
      <Card className="profile-card profile-badges-card">
        <CardHeader className="profile-card-header">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="profile-section-title">
                Lencana & Prestasi Hijau
              </CardTitle>
              <CardDescription>
                Pencapaian gaya hidup minim sampah yang telah kamu raih.
              </CardDescription>
            </div>
            <span className="profile-badge-count">5 / 6 Terbuka</span>
          </div>
        </CardHeader>

        <CardContent className="profile-badges-grid">
          {userBadges.map(
            ({ id, name, desc, iconClass, color, bg, unlocked, date, progress }) => (
              <div
                key={id}
                className={`profile-badge-item ${unlocked ? "unlocked" : "locked"
                  }`}
              >
                <div
                  className="profile-badge-icon"
                  style={{ backgroundColor: bg, color }}
                >
                  <i className={iconClass} />
                </div>
                <div className="profile-badge-text">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="profile-badge-name">{name}</strong>
                    {unlocked ? (
                      <span className="profile-badge-status-unlocked">
                        {date}
                      </span>
                    ) : (
                      <span className="profile-badge-status-locked">
                        {progress}
                      </span>
                    )}
                  </div>
                  <p className="profile-badge-desc">{desc}</p>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Edit Profile Modal / Backdrop */}
      {isEditing && (
        <div
          className="profile-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditing(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="profile-modal-box">
            {/* Modal Header */}
            <div className="profile-modal-header">
              <div className="flex items-center gap-3">
                <div className="profile-modal-icon-badge">
                  <i className="fa-solid fa-pen-to-square text-base text-white" />
                </div>
                <div>
                  <h3 id="modal-title" className="profile-modal-title">
                    Edit Informasi Profil
                  </h3>
                  <p className="profile-modal-subtitle">
                    Perbarui data diri dan preferensi akun EcoCycle AI kamu.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setIsEditing(false)}
                aria-label="Tutup modal"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="profile-modal-form">
              <div className="profile-modal-body">
                <div className="profile-form-group">
                  <label htmlFor="form-name">Nama Lengkap</label>
                  <div className="profile-input-wrapper">
                    <i className="fa-solid fa-user profile-input-icon text-sm" />
                    <Input
                      id="form-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Masukkan nama lengkap"
                      className="profile-modal-input"
                      required
                    />
                  </div>
                </div>

                <div className="profile-form-group">
                  <div className="flex items-center justify-between">
                    <label htmlFor="form-email">Email Terdaftar</label>
                    <span className="profile-field-hint">
                      <i className="fa-solid fa-lock text-[10px] mr-1" /> Terkunci
                    </span>
                  </div>
                  <div className="profile-input-wrapper">
                    <i className="fa-solid fa-envelope profile-input-icon text-sm text-gray-400" />
                    <Input
                      id="form-email"
                      value={displayEmail}
                      disabled
                      className="profile-modal-input bg-gray-50 text-gray-500 cursor-not-allowed border-dashed"
                    />
                  </div>
                </div>

                <div className="profile-form-group">
                  <div className="flex items-center justify-between">
                    <label htmlFor="form-bio">Bio Ringkas</label>
                    <span className="text-[11px] text-muted">
                      {formData.bio.length}/200
                    </span>
                  </div>
                  <textarea
                    id="form-bio"
                    rows={3}
                    maxLength={200}
                    className="profile-textarea"
                    placeholder="Tuliskan komitmen atau ceritamu menjaga lingkungan..."
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>

                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label htmlFor="form-location">Domisili / Lokasi</label>
                    <div className="profile-input-wrapper">
                      <i className="fa-solid fa-location-dot profile-input-icon text-sm" />
                      <Input
                        id="form-location"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Contoh: Denpasar, Bali"
                        className="profile-modal-input"
                      />
                    </div>
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="form-phone">Nomor Telepon / WhatsApp</label>
                    <div className="profile-input-wrapper">
                      <i className="fa-solid fa-phone profile-input-icon text-sm" />
                      <Input
                        id="form-phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+62 812-xxxx-xxxx"
                        className="profile-modal-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="profile-modal-actions">
                <Button
                  type="button"
                  variant="ghost"
                  className="profile-modal-btn cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="profile-modal-btn save-btn"
                >
                  <i className="fa-solid fa-check mr-1.5 text-sm" />
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
