import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Navbar() {
  return (
    <header className="dashboard-header">
      <div className="navbar-leading">
        <SidebarTrigger />

        <div>
          <h1>Selamat Datang, Budi</h1>
          <p>Sayangilah Bumi dengan cara kelola sampah-sampah ini.</p>
        </div>
      </div>

      <div className="dashboard-profile">
        <Button
          variant="outline"
          size="icon"
          className="notification-button"
          aria-label="Notifikasi"
        >
          <Bell />
        </Button>

        <Button variant="outline" className="profile-button" onMouseEnter={(event) => event.currentTarget.blur()}>
          <span className="profile-avatar">BS</span>

          <span className="profile-text">
            <strong>Budi Santoso</strong>
            <small>ANGGOTA</small>
          </span>
        </Button>
      </div>
    </header>
  )
}