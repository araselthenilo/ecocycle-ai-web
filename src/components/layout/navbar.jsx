import { Bell } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

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

  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // When near or at top, always show navbar and reset scrolled state
          if (currentScrollY <= 15) {
            setIsHidden(false)
            setIsScrolled(false)
            lastScrollY = 0
            ticking = false
            return
          }

          setIsScrolled(true)

          const delta = currentScrollY - lastScrollY
          // Threshold of 6px to avoid micro-jitter on touch devices
          if (Math.abs(delta) > 6) {
            if (delta > 0) {
              // Scrolling down: navbar follows (visible)
              setIsHidden(false)
            } else {
              // Scrolling up: navbar disappears (hidden)
              setIsHidden(true)
            }
            lastScrollY = currentScrollY
          }

          ticking = false
        })
        ticking = true
      }
    }

    // Initial check on mount
    if (window.scrollY > 15) {
      setIsScrolled(true)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reset visibility when route / page changes
  useEffect(() => {
    setIsHidden(false)
    setIsScrolled(window.scrollY > 15)
  }, [activePage])

  const userName = user?.name || "Pengguna"
  const greeting = pageGreetings[activePage] ?? pageGreetings.dashboard
  const pageTitle =
    activePage === "dashboard" ? (
      <>
        <span className="highlight">Selamat Datang, </span>
        {userName}
      </>
    ) : (
      greeting.title
    )
  const isNotificationActive = activePage === "notifications"

  return (
    <header className="dashboard-header">
      <div className="navbar-top-wrapper">
        <div className={`navbar-top ${isScrolled ? "is-scrolled" : ""} ${isHidden ? "is-hidden" : ""}`}>
          <SidebarTrigger
            className="navbar-toggle"
            aria-label="Buka navigasi"
          />

          <div className="dashboard-profile">
            <Button
              variant="outline"
              size="icon"
              className={`group notification-button ${isNotificationActive ? "active" : ""}`}
              aria-label="Notifikasi"
              onClick={() => navigate("/notifications")}
              title="Lihat Notifikasi"
            >
              <Bell />
            </Button>

            <ProfileButton />
          </div>
        </div>
      </div>

      <div className="navbar-greeting">
        <h1>{pageTitle}</h1>
        <p>{greeting.description}</p>
      </div>
    </header>
  )
}