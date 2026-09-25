import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  Clock,
  Flame,
  MapPin,
  Package,
  Recycle,
  ScanLine,
  Trash2,
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
    theme: "emerald",
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
    theme: "amber",
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
    theme: "sky",
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
    theme: "teal",
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
    theme: "rose",
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
    theme: "indigo",
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
  const pointsCount = notifications.filter((n) => n.type === "points").length
  const systemCount = notifications.filter((n) => n.type === "system").length

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
              <h2 className="notification-hero-title font-display">
                Notifikasi & Riwayat Aktivitas
              </h2>
              <p className="notification-hero-desc">
                Pantau setiap log penyetoran sampah, verifikasi poin daur ulang,
                serta pembaruan ekosistem lingkungan kamu secara terpusat.
              </p>
            </div>

            <div className="notification-hero-actions">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="notification-leaf-btn read-all-btn"
                >
                  <CheckCheck className="size-4 mr-1.5" />
                  Tandai Dibaca ({unreadCount})
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate("/scanner")}
                className="notification-leaf-btn scan-now-btn"
              >
                <ScanLine className="size-4 mr-1.5" />
                Pindai Sampah
              </button>
            </div>
          </div>

          {/* 4-Grid Colorful Summary Cards (Borderless & Leaf-Shaped) */}
          <div className="notification-summary-grid">
            {/* 1. Total Aktivitas (Indigo) */}
            <div className="notification-stat-card notif-stat-indigo">
              <div className="notif-stat-icon-wrapper">
                <i className="fa-solid fa-list-check" />
              </div>
              <div className="notif-stat-info">
                <span className="notif-stat-label">Total Aktivitas</span>
                <strong className="notif-stat-value">
                  {notifications.length} Catatan
                </strong>
                <span className="notif-stat-sub">Log tersimpan</span>
              </div>
            </div>

            {/* 2. Daur Ulang Selesai (Emerald) */}
            <div className="notification-stat-card notif-stat-emerald">
              <div className="notif-stat-icon-wrapper">
                <i className="fa-solid fa-recycle" />
              </div>
              <div className="notif-stat-info">
                <span className="notif-stat-label">Daur Ulang</span>
                <strong className="notif-stat-value">
                  {recyclingCount} Setoran
                </strong>
                <span className="notif-stat-sub">Terverifikasi mitra</span>
              </div>
            </div>

            {/* 3. Poin Terkumpul (Amber) */}
            <div className="notification-stat-card notif-stat-amber">
              <div className="notif-stat-icon-wrapper">
                <i className="fa-solid fa-coins" />
              </div>
              <div className="notif-stat-info">
                <span className="notif-stat-label">Poin Terkumpul</span>
                <strong className="notif-stat-value">+120 XP</strong>
                <span className="notif-stat-sub">Dapat ditukar reward</span>
              </div>
            </div>

            {/* 4. Status Verifikasi (Teal) */}
            <div className="notification-stat-card notif-stat-teal">
              <div className="notif-stat-icon-wrapper">
                <i className="fa-solid fa-circle-check" />
              </div>
              <div className="notif-stat-info">
                <span className="notif-stat-label">Verifikasi</span>
                <strong className="notif-stat-value">100% Sukses</strong>
                <span className="notif-stat-sub">Akurasi AI & petugas</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <Card className="notification-main-card">
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

            {/* Leaf-Shaped Filter Buttons */}
            <div className="notification-filters">
              <button
                type="button"
                className={`notification-filter-btn ${
                  activeFilter === "all" ? "active" : ""
                }`}
                onClick={() => setActiveFilter("all")}
              >
                Semua
                <span className="notif-filter-count">{notifications.length}</span>
              </button>
              <button
                type="button"
                className={`notification-filter-btn ${
                  activeFilter === "recycling" ? "active" : ""
                }`}
                onClick={() => setActiveFilter("recycling")}
              >
                Daur Ulang
                <span className="notif-filter-count">{recyclingCount}</span>
              </button>
              <button
                type="button"
                className={`notification-filter-btn ${
                  activeFilter === "points" ? "active" : ""
                }`}
                onClick={() => setActiveFilter("points")}
              >
                Poin & Hadiah
                <span className="notif-filter-count">{pointsCount}</span>
              </button>
              <button
                type="button"
                className={`notification-filter-btn ${
                  activeFilter === "system" ? "active" : ""
                }`}
                onClick={() => setActiveFilter("system")}
              >
                Info
                <span className="notif-filter-count">{systemCount}</span>
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="notification-list-container">
          {filteredNotifications.length === 0 ? (
            <div className="notification-empty-state">
              <div className="notification-empty-icon">
                <Bell className="size-8 text-emerald-600" />
              </div>
              <h4 className="font-bold text-gray-700 mt-3 text-base">
                Tidak ada notifikasi pada kategori ini
              </h4>
              <p className="text-muted text-sm max-w-sm mt-1">
                Pindai sampah atau setorkan ke bank sampah terdekat untuk
                mendapatkan pembaruan aktivitas daur ulang.
              </p>
              <button
                type="button"
                onClick={() => navigate("/scanner")}
                className="notification-leaf-btn scan-now-btn mt-4"
              >
                <ScanLine className="size-4 mr-2" />
                Mulai Pindai Sekarang
              </button>
            </div>
          ) : (
            <div className="notification-timeline">
              {filteredNotifications.map((item) => {
                const ItemIcon = item.icon
                const themeClass = `notif-theme-${item.theme || "emerald"}`
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleReadStatus(item.id)}
                    className={`notification-item-card ${themeClass} ${
                      !item.isRead ? "unread" : "read"
                    }`}
                    title="Klik untuk ubah status dibaca"
                  >
                    {/* Decorative leaf accent strip */}
                    <div className="notif-item-accent" />

                    {/* Unread indicator badge */}
                    {!item.isRead && (
                      <span
                        className="notification-unread-dot"
                        title="Belum dibaca"
                      />
                    )}

                    {/* Leaf-shaped Icon */}
                    <div
                      className={`notification-item-icon ${themeClass}`}
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
                          <span className={`notification-item-tag ${themeClass}`}>
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
                            className={`notification-status-pill ${
                              item.status === "SELESAI" ? "done" : "info"
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
