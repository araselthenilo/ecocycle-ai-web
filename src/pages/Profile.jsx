import { useState, useEffect } from "react"
import {
  Award,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  Edit3,
  ExternalLink,
  Flame,
  Globe,
  Leaf,
  Mail,
  MapPin,
  Package,
  Recycle,
  ScanLine,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  X,
} from "lucide-react"

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
import { useNavigate } from "react-router-dom"

const userBadges = [
  {
    id: "top-recycler",
    name: "Peringkat #1 Komunitas",
    desc: "Memimpin perolehan Eco Points mingguan se-Bali.",
    icon: Trophy,
    color: "#eab308",
    bg: "#fef9c3",
    unlocked: true,
    date: "18 Sep 2026",
  },
  {
    id: "green-streak",
    name: "7-Day Green Streak",
    desc: "Konsisten memilah dan mendata sampah 7 hari berturut-turut.",
    icon: Flame,
    color: "#ef4444",
    bg: "#fee2e2",
    unlocked: true,
    date: "Kemarin",
  },
  {
    id: "ai-scanner",
    name: "AI Scanner Pro",
    desc: "Memindai lebih dari 20 objek sampah menggunakan AI Vision.",
    icon: ScanLine,
    color: "#0284c7",
    bg: "#e0f2fe",
    unlocked: true,
    date: "15 Sep 2026",
  },
  {
    id: "eco-map",
    name: "Eco Explorer",
    desc: "Menemukan dan menyetorkan sampah ke bank sampah mitra terdekat.",
    icon: MapPin,
    color: "#16a34a",
    bg: "#dcfce7",
    unlocked: true,
    date: "12 Sep 2026",
  },
  {
    id: "carbon-saver",
    name: "Pelindung Karbon",
    desc: "Mengurangi potensi emisi karbon lebih dari 5 kg CO₂e.",
    icon: Leaf,
    color: "#059669",
    bg: "#d1fae5",
    unlocked: true,
    date: "10 Sep 2026",
  },
  {
    id: "zero-waste",
    name: "Kompos Master",
    desc: "Olah 10 kg sampah organik basah menjadi pupuk alami.",
    icon: Sparkles,
    color: "#6b7280",
    bg: "#f3f4f6",
    unlocked: false,
    progress: "60%",
  },
]

const recentActivities = [
  {
    id: 1,
    title: "Gelas Plastik (PET)",
    category: "Anorganik • Plastik",
    location: "Bank Sampah Denpasar Resik",
    points: "+15",
    weight: "0,15 kg",
    time: "2 menit lalu",
    status: "SELESAI",
  },
  {
    id: 2,
    title: "Kardus Karton Cokelat",
    category: "Anorganik • Kertas",
    location: "Pusat Daur Ulang Renon",
    points: "+10",
    weight: "0,80 kg",
    time: "3 jam lalu",
    status: "SELESAI",
  },
  {
    id: 3,
    title: "Kaleng Minuman Bersih",
    category: "Anorganik • Logam",
    location: "Dropbox Sanur Green",
    points: "+20",
    weight: "0,35 kg",
    time: "9 jam lalu",
    status: "SELESAI",
  },
  {
    id: 4,
    title: "Botol Kaca Bening",
    category: "Anorganik • Kaca",
    location: "Bank Sampah Ubung",
    points: "+25",
    weight: "1,10 kg",
    time: "1 hari lalu",
    status: "SELESAI",
  },
]

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
  const navigate = useNavigate()

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
          <CheckCircle2 className="size-5 text-emerald-600" />
          <span>Profil berhasil diperbarui dan disimpan!</span>
        </div>
      )}

      {/* Main Profile Hero Card */}
      <Card className="profile-card profile-hero-card">
        <div className="profile-hero-banner">
          <div className="profile-hero-pattern" />
          <span className="profile-hero-badge">
            <ShieldCheck className="size-4" />
            Akun Terverifikasi
          </span>
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
              <span className="profile-online-indicator" title="Online Aktif" />
            </div>

            <div className="profile-identity">
              <div className="profile-title-row">
                <h2 className="profile-user-name">{displayName}</h2>
                <span className="profile-role-pill">{displayRole}</span>
              </div>

              <p className="profile-email-text">
                <Mail className="size-3.5 inline-block mr-1.5 opacity-70" />
                {displayEmail}
              </p>

              <p className="profile-bio-text">{formData.bio}</p>

              <div className="profile-meta-tags">
                <span className="profile-meta-tag">
                  <MapPin className="size-3.5 text-emerald-600" />
                  {formData.location}
                </span>
                <span className="profile-meta-tag">
                  <Calendar className="size-3.5 text-emerald-600" />
                  Bergabung Jan 2026
                </span>
                <button
                  type="button"
                  className="profile-meta-tag profile-id-btn"
                  onClick={handleCopyId}
                  title="Klik untuk salin ID"
                >
                  {copiedId ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5 opacity-60" />
                  )}
                  <span>ID: {memberId}</span>
                </button>
              </div>
            </div>

            <div className="profile-actions-column">
              <Button
                variant="outline"
                className="profile-action-btn edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="size-4 mr-2" />
                Edit Profil
              </Button>
              <Button
                variant="outline"
                className="profile-action-btn share-btn"
                onClick={handleCopyId}
              >
                <Share2 className="size-4 mr-2" />
                {copiedId ? "ID Tersalin!" : "Salin ID"}
              </Button>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="profile-level-box">
            <div className="profile-level-header">
              <div className="profile-level-info">
                <Award className="size-4 text-emerald-600" />
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

      {/* Quick Eco Metrics Stats */}
      <div className="profile-stats-grid">
        <Card className="profile-stat-card">
          <div className="profile-stat-icon-wrapper bg-emerald-50 text-emerald-700">
            <Package className="size-5" />
          </div>
          <div className="profile-stat-data">
            <span className="profile-stat-label">Total Eco Points</span>
            <strong className="profile-stat-value">1.240 Poin</strong>
            <small className="profile-stat-sub text-emerald-700">
              +120 poin minggu ini
            </small>
          </div>
        </Card>

        <Card className="profile-stat-card">
          <div className="profile-stat-icon-wrapper bg-teal-50 text-teal-700">
            <Recycle className="size-5" />
          </div>
          <div className="profile-stat-data">
            <span className="profile-stat-label">Sampah Terpilah</span>
            <strong className="profile-stat-value">2,4 kg</strong>
            <small className="profile-stat-sub text-muted">
              Plastik, kertas & kaleng
            </small>
          </div>
        </Card>

        <Card className="profile-stat-card">
          <div className="profile-stat-icon-wrapper bg-sky-50 text-sky-700">
            <Leaf className="size-5" />
          </div>
          <div className="profile-stat-data">
            <span className="profile-stat-label">Emisi CO₂ Dicegah</span>
            <strong className="profile-stat-value">~5,8 kg</strong>
            <small className="profile-stat-sub text-sky-700">
              Setara 3 pohon diselamatkan
            </small>
          </div>
        </Card>

        <Card className="profile-stat-card">
          <div className="profile-stat-icon-wrapper bg-amber-50 text-amber-600">
            <Flame className="size-5" />
          </div>
          <div className="profile-stat-data">
            <span className="profile-stat-label">Green Streak</span>
            <strong className="profile-stat-value">7 Hari 🔥</strong>
            <small className="profile-stat-sub text-amber-600">
              Jangan sampai terputus!
            </small>
          </div>
        </Card>
      </div>

      {/* Badges & Recent Activity 2-Column Grid */}
      <div className="profile-two-columns">
        {/* Badges / Pencapaian */}
        <Card className="profile-card">
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
              ({ id, name, desc, icon: Icon, color, bg, unlocked, date, progress }) => (
                <div
                  key={id}
                  className={`profile-badge-item ${
                    unlocked ? "unlocked" : "locked"
                  }`}
                >
                  <div
                    className="profile-badge-icon"
                    style={{ backgroundColor: bg, color }}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="profile-badge-text">
                    <div className="flex items-center justify-between">
                      <strong className="profile-badge-name">{name}</strong>
                      {unlocked ? (
                        <span className="profile-badge-status-unlocked">
                          {date}
                        </span>
                      ) : (
                        <span className="profile-badge-status-locked">
                          Progres: {progress}
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

        {/* Riwayat Pemilahan Terakhir */}
        <Card className="profile-card">
          <CardHeader className="profile-card-header">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="profile-section-title">
                  Aktivitas Daur Ulang Terakhir
                </CardTitle>
                <CardDescription>
                  Log kontribusi sampah yang telah dipindai & disetorkan.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-700 text-xs font-semibold"
                onClick={() => navigate("/dashboard")}
              >
                Lihat Semua
              </Button>
            </div>
          </CardHeader>

          <CardContent className="profile-activities-list">
            {recentActivities.map((act) => (
              <div key={act.id} className="profile-activity-item">
                <div className="profile-activity-icon">
                  <Recycle className="size-4 text-emerald-700" />
                </div>
                <div className="profile-activity-details">
                  <div className="flex items-center justify-between">
                    <strong className="profile-activity-title">
                      {act.title}
                    </strong>
                    <span className="profile-activity-points">
                      {act.points} Poin
                    </span>
                  </div>
                  <p className="profile-activity-meta">
                    {act.category} • {act.weight}
                  </p>
                  <div className="flex items-center justify-between mt-1 text-xs text-muted">
                    <span>{act.location}</span>
                    <span>{act.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal / Backdrop */}
      {isEditing && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-box">
            <div className="profile-modal-header">
              <h3 className="profile-modal-title">Edit Informasi Profil</h3>
              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setIsEditing(false)}
                aria-label="Tutup"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="profile-modal-form">
              <div className="profile-form-group">
                <label htmlFor="form-name">Nama Lengkap</label>
                <Input
                  id="form-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="profile-form-group">
                <label htmlFor="form-email">Email Terdaftar</label>
                <Input
                  id="form-email"
                  value={displayEmail}
                  disabled
                  className="bg-gray-100 text-muted cursor-not-allowed"
                />
              </div>

              <div className="profile-form-group">
                <label htmlFor="form-bio">Bio Ringkas</label>
                <textarea
                  id="form-bio"
                  rows={3}
                  className="profile-textarea"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>

              <div className="profile-form-grid">
                <div className="profile-form-group">
                  <label htmlFor="form-location">Domisili / Lokasi</label>
                  <Input
                    id="form-location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="profile-form-group">
                  <label htmlFor="form-phone">Nomor Telepon</label>
                  <Input
                    id="form-phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="profile-modal-actions">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white"
                >
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
