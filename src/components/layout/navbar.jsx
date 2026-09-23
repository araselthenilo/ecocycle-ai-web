import { Bell } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import ProfileButton from "@/components/ProfileButton"

const pageGreetings = {
  dashboard: {
    description: "Sayangilah Bumi dengan cara kelola sampah-sampah ini.",
  },
  scanner: {
    title: "AI Waste Scanner",
    description: "Kenali sampahmu dan temukan cara terbaik untuk mengelolanya.",
  },
  recyclemap: {
    title: "Recycling Map",
    description: "Temukan bank sampah dan lokasi daur ulang terdekat.",
  },
  leaderboard: {
    title: "Leaderboard",
    description: "Lihat pengguna dengan Eco Points terbanyak.",
  },
  profile: {
    title: "Profil Pengguna",
    description: "Kelola akun, pantau pencapaian gaya hidup hijau, dan riwayat kontribusimu.",
  },
  notifications: {
    title: "Notifikasi & Riwayat",
    description: "Pantau aktivitas pemilahan daur ulang terbaru dan perolehan Eco Points kamu.",
  },
}

export function Navbar({ activePage }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const userName = user?.name || "Pengguna"
  const greeting = pageGreetings[activePage] ?? pageGreetings.dashboard
  const pageTitle = activePage === "dashboard" ? `Selamat Datang, ${userName}` : greeting.title
  const isNotificationActive = activePage === "notifications"

  return (
    <header className="dashboard-header">
      <div className="navbar-top">
        <SidebarTrigger
          className="navbar-toggle"
          aria-label="Buka navigasi"
        />

        <div className="dashboard-profile">
          <Button
            variant="outline"
            size="icon"
            className={`notification-button ${isNotificationActive ? "active" : ""}`}
            aria-label="Notifikasi"
            onClick={() => navigate("/notifications")}
            title="Lihat Notifikasi"
          >
            <Bell />
          </Button>

          <ProfileButton />
        </div>
      </div>

      <div className="navbar-greeting">
        <h1>{pageTitle}</h1>
        <p>{greeting.description}</p>
      </div>
    </header>
  )
}