import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Filter,
  Flame,
  Info,
  MapPin,
  Package,
  Recycle,
  ScanLine,
  Sparkles,
  Trash2,
  Trophy,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const initialNotifications = [
  {
    id: 1,
    title: "Gelas Plastik (PET)",
    category: "Anorganik • Plastik",
    location: "Bank Sampah Denpasar Resik",
    points: "+15",
    weight: "0,15 kg",
    time: "2 menit lalu",
    status: "SELESAI",
    type: "recycling",
    isRead: false,
    icon: Recycle,
    color: "#059669",
    bg: "#ecfdf5",
    description:
      "Sampah plastik jenis PET berhasil dipindai dengan akurasi 98% dan disetor ke bank sampah mitra.",
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
    type: "recycling",
    isRead: false,
    icon: Package,
    color: "#d97706",
    bg: "#fef3c7",
    description:
      "Kardus karton tebal kering telah divalidasi dan ditambahkan ke inventaris daur ulang.",
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
    type: "recycling",
    isRead: true,
    icon: Recycle,
    color: "#0284c7",
    bg: "#e0f2fe",
    description:
      "Kaleng aluminium disetorkan melalui Smart Dropbox Sanur dan poin langsung dikreditkan.",
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
    type: "recycling",
    isRead: true,
    icon: Recycle,
    color: "#0d9488",
    bg: "#ccfbf1",
    description:
      "Penyetoran 3 botol kaca bening utuh berhasil dicatat oleh petugas mitra Ubung.",
  },
  {
    id: 5,
    title: "Bonus 7-Day Green Streak",
    category: "Prestasi • Eco Points",
    location: "Sistem EcoCycle",
    points: "+50",
    weight: "-",
    time: "1 hari lalu",
    status: "SELESAI",
    type: "points",
    isRead: true,
    icon: Flame,
    color: "#ef4444",
    bg: "#fee2e2",
    description:
      "Luar biasa! Kamu konsisten memilah sampah 7 hari berturut-turut tanpa henti.",
  },
  {
    id: 6,
    title: "Bank Sampah Baru di Denpasar Selatan",
    category: "Informasi Sistem",
    location: "Jl. Danau Poso, Sanur",
    points: "-",
    weight: "-",
    time: "2 hari lalu",
    status: "INFO",
    type: "system",
    isRead: true,
    icon: MapPin,
    color: "#6366f1",
    bg: "#e0e7ff",
    description:
      "Mitra bank sampah baru 'Sanur Lestari' kini menerima drop-off anorganik setiap hari kerja.",
  },
]

export default function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeFilter, setActiveFilter] = useState("all")
  const [toastMessage, setToastMessage] = useState("")

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(""), 3000)
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    showToast("Semua notifikasi telah ditandai sebagai dibaca.")
  }

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    )
  }

  const deleteNotification = (e, id) => {
    e.stopPropagation()
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    showToast("Notifikasi berhasil dihapus.")
  }

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "all") return true
    if (activeFilter === "recycling") return item.type === "recycling"
    if (activeFilter === "points") return item.type === "points"
    if (activeFilter === "system") return item.type === "system"
    return true
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const recyclingCount = notifications.filter((n) => n.type === "recycling").length

  return (
    <div className="notifications-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="profile-toast-alert">
          <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Overview Banner */}
      <Card className="notification-hero-card">
        <div className="notification-hero-pattern" />
        <CardContent className="notification-hero-content">
          <div className="notification-hero-flex">
            <div>
              <h2 className="notification-hero-title">
                Notifikasi & Riwayat Aktivitas
              </h2>
              <p className="notification-hero-desc">
                Pantau setiap log penyetoran sampah, verifikasi poin daur ulang,
                serta pembaruan ekosistem lingkungan kamu secara terpusat.
              </p>
            </div>

            <div className="notification-hero-actions">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="notification-hero-btn mark-read-btn"
                >
                  <CheckCheck className="size-4 mr-1.5" />
                  Tandai Dibaca ({unreadCount})
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => navigate("/scanner")}
                className="notification-hero-btn scan-btn bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                <ScanLine className="size-4 mr-1.5" />
                Pindai Sampah
              </Button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="notification-stats-row">
            <div className="notification-stat-item">
              <span className="notification-stat-label">Total Aktivitas</span>
              <strong className="notification-stat-val">
                {notifications.length} Catatan
              </strong>
            </div>
            <div className="notification-stat-divider" />
            <div className="notification-stat-item">
              <span className="notification-stat-label">Daur Ulang Selesai</span>
              <strong className="notification-stat-val text-emerald-700">
                {recyclingCount} Setoran
              </strong>
            </div>
            <div className="notification-stat-divider" />
            <div className="notification-stat-item">
              <span className="notification-stat-label">Poin Terkumpul</span>
              <strong className="notification-stat-val text-emerald-700">
                +120 XP
              </strong>
            </div>
            <div className="notification-stat-divider" />
            <div className="notification-stat-item">
              <span className="notification-stat-label">Status Verifikasi</span>
              <strong className="notification-stat-val text-teal-700">
                100% Sukses
              </strong>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <Card className="profile-card notification-main-card">
        <CardHeader className="notification-card-header">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="profile-section-title flex items-center gap-2">
                <Recycle className="size-5 text-emerald-700" />
                Aktivitas Daur Ulang Terakhir
              </CardTitle>
              <CardDescription>
                Daftar lengkap riwayat kontribusi sampah yang telah dipindai &
                disetorkan ke bank sampah mitra.
              </CardDescription>
            </div>

            {/* Filter Pills */}
            <div className="notification-filters">
              <button
                type="button"
                className={`notification-filter-pill ${activeFilter === "all" ? "active" : ""
                  }`}
                onClick={() => setActiveFilter("all")}
              >
                Semua ({notifications.length})
              </button>
              <button
                type="button"
                className={`notification-filter-pill ${activeFilter === "recycling" ? "active" : ""
                  }`}
                onClick={() => setActiveFilter("recycling")}
              >
                Daur Ulang ({recyclingCount})
              </button>
              <button
                type="button"
                className={`notification-filter-pill ${activeFilter === "points" ? "active" : ""
                  }`}
                onClick={() => setActiveFilter("points")}
              >
                Poin & Hadiah
              </button>
              <button
                type="button"
                className={`notification-filter-pill ${activeFilter === "system" ? "active" : ""
                  }`}
                onClick={() => setActiveFilter("system")}
              >
                Info
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="notification-list-container">
          {filteredNotifications.length === 0 ? (
            <div className="notification-empty-state">
              <div className="notification-empty-icon">
                <Bell className="size-8 text-gray-400" />
              </div>
              <h4 className="font-bold text-gray-700 mt-3 text-base">
                Tidak ada notifikasi pada kategori ini
              </h4>
              <p className="text-muted text-sm max-w-sm mt-1">
                Pindai sampah atau setorkan ke bank sampah terdekat untuk
                mendapatkan pembaruan aktivitas daur ulang.
              </p>
              <Button
                size="sm"
                onClick={() => navigate("/scanner")}
                className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                <ScanLine className="size-4 mr-2" />
                Mulai Pindai Sekarang
              </Button>
            </div>
          ) : (
            <div className="notification-timeline">
              {filteredNotifications.map((item) => {
                const ItemIcon = item.icon
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleReadStatus(item.id)}
                    className={`notification-item-card ${!item.isRead ? "unread" : "read"
                      }`}
                    title="Klik untuk ubah status dibaca"
                  >
                    {/* Unread indicator badge */}
                    {!item.isRead && (
                      <span
                        className="notification-unread-dot"
                        title="Belum dibaca"
                      />
                    )}

                    {/* Icon */}
                    <div
                      className="notification-item-icon"
                      style={{
                        backgroundColor: item.bg,
                        color: item.color,
                      }}
                    >
                      <ItemIcon className="size-5" />
                    </div>

                    {/* Main Details */}
                    <div className="notification-item-body">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="notification-item-title">
                            {item.title}
                          </h4>
                          <span className="notification-item-tag">
                            {item.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.points !== "-" && (
                            <span className="notification-points-badge">
                              {item.points} Poin
                            </span>
                          )}
                          <span
                            className={`notification-status-pill ${item.status === "SELESAI" ? "done" : "info"
                              }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <p className="notification-item-desc">
                        {item.description}
                      </p>

                      <div className="notification-item-footer">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                          {item.weight !== "-" && (
                            <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                              <Package className="size-3 text-emerald-600" />
                              {item.weight}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3 text-emerald-600" />
                            {item.location}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3 opacity-60" />
                            {item.time}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="notification-delete-btn"
                          onClick={(e) => deleteNotification(e, item.id)}
                          title="Hapus notifikasi ini"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
