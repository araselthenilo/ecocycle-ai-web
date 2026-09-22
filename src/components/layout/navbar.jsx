import { Bell } from "lucide-react"

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
}

export function Navbar({ activePage }) {
  const { user } = useAuth()

  const userName = user?.name || "Pengguna"
  const greeting = pageGreetings[activePage] ?? pageGreetings.dashboard
  const pageTitle = activePage === "dashboard" ? `Selamat Datang, ${userName}` : greeting.title

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
            className="notification-button"
            aria-label="Notifikasi"
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