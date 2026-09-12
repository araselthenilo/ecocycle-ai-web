import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

const pageGreetings = {
  dashboard: {
    title: "Selamat Datang, Budi",
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
}

export function Navbar({ activePage }) {
  const greeting = pageGreetings[activePage] ?? pageGreetings.dashboard
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

          <Button
            variant="outline"
            className="profile-button"
            aria-label="Profil Budi Santoso"
            onMouseEnter={(event) => event.currentTarget.blur()}
          >
            <span className="profile-avatar">BS</span>

            <span className="profile-text">
              <strong>Budi Santoso</strong>
              <small>ANGGOTA</small>
            </span>
          </Button>
        </div>
      </div>

      <div className="navbar-greeting">
        <h1>{greeting.title}</h1>
        <p>{greeting.description}</p>
      </div>
    </header>
  )
}