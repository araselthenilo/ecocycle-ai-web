import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronDown, LogOut, User, LayoutDashboard, Leaf, UserRound, Home } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

function getInitials(name = "Pengguna") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "EC"
  )
}

export default function ProfileButton({ className = "" }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const dropdownRef = useRef(null)

  const userName = user?.name || "Pengguna"
  const userEmail = user?.email || "pengguna@ecocycle.id"
  const userRole = user?.role === "admin" ? "ADMIN" : "ANGGOTA"
  const isProfileActive = location.pathname === "/profile"
  const isDashboardActive = location.pathname === "/dashboard"
  const isLandingPageActive = location.pathname === "/"

  // Avatar source with robust fallback
  const avatarSrc =
    !imgError && user?.avatar
      ? user.avatar
      : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        user?.email || userName
      )}`

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const handleNavigate = (path) => {
    setIsOpen(false)
    navigate(path)
  }

  const handleLogout = () => {
    setIsOpen(false)
    logout()
    navigate("/")
  }

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      {/* Merged Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Menu profil ${userName}`}
        className={`profile-unified-trigger flex items-center gap-2.5 h-11 px-2 rounded-tr-xl rounded-bl-xl shadow-md transition-all duration-200 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-eco-green/40 ${isOpen
          ? "is-open"
          : isProfileActive
            ? "bg-actual-white shadow-xs text-eco-text"
            : "bg-actual-white border-eco-border shadow-2xs text-eco-text"
          }`}
      >
        {/* Avatar */}
        <div className="relative shrink-0 flex items-center justify-center size-8 rounded-tr-lg rounded-bl-lg overflow-hidden bg-eco-green/15">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={userName}
              onError={() => setImgError(true)}
              className="size-full object-cover rounded-tr-lg rounded-bl-lg"
            />
          ) : (
            <span className={`text-[11px] font-bold transition-colors ${isOpen ? "text-white" : "text-eco-green group-hover:text-white"}`}>
              {getInitials(userName)}
            </span>
          )}
        </div>

        {/* Text Container: Dual-line Name + Role Badge */}
        <div className="flex flex-col text-left leading-tight min-w-0 pr-0.5">
          <span className={`font-semibold text-xs transition-colors max-w-[110px] sm:max-w-[140px] truncate ${isOpen ? "text-white" : "text-eco-text group-hover:text-white"}`}>
            {userName}
          </span>
          <span className={`text-[9px] font-bold tracking-wider uppercase mt-0.5 transition-colors ${isOpen ? "text-emerald-100" : "text-eco-green/85 group-hover:text-emerald-100"}`}>
            {userRole}
          </span>
        </div>

        {/* Rotating Chevron */}
        <ChevronDown
          className={`size-3.5 transition-all duration-200 shrink-0 ml-0.5 group-hover:!text-white ${isOpen ? "rotate-180 text-white" : "text-slate-400"
            }`}
          aria-hidden="true"
        />
      </button>

      {/* Merged Profile Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-72 origin-top-right rounded-tl-2xl rounded-br-2xl bg-actual-white backdrop-blur-md p-3 shadow-2xl border border-black/10 ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header Card: User Info */}
          <div className="flex items-center gap-3 p-2.5 rounded-tl-xl rounded-br-xl bg-gradient-to-br from-eco-green/8 to-primary-light/20 border border-eco-green/10">
            <div className="relative shrink-0 flex items-center justify-center size-11 rounded-tl-xl rounded-br-xl overflow-hidden bg-white border border-eco-green/30 shadow-xs">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={userName}
                  className="size-full object-cover rounded-tl-xl rounded-br-xl"
                />
              ) : (
                <span className="text-xs font-bold text-eco-green">
                  {getInitials(userName)}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col flex-wrap content-start">
                <p className="font-bold text-sm leading-tight text-dark truncate">
                  {userName}
                </p>
                <p className="text-[9px] leading-tight text-muted truncate">
                  {userEmail}
                </p>
              </div>
              <div className="flex gap-1 mt-2">
                <span className="inline-flex items-center text-[9px] font-bold uppercase px-1 rounded-br-lg rounded-tl-lg bg-eco-green text-white tracking-wide">
                  {userRole}
                </span>
                {user?.provider === "google" && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded-br-lg rounded-tl-lg">
                    <UserRound className="size-2.5" strokeWidth={2.5} /> Akun Google
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats: Eco Points */}
          <div className="my-2.5 px-3 py-2 rounded-tl-xl rounded-br-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-lg bg-emerald-600/15 flex items-center justify-center text-emerald-700">
                <Leaf className="size-3.5" />
              </div>
              <span className="text-xs font-medium text-body">
                Poin Lingkungan
              </span>
            </div>
            <span className="font-extrabold text-xs text-eco-green">
              120 Poin
            </span>
          </div>

          {/* Navigation Links */}
          <div className="py-1 flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => handleNavigate("/")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-tl-xl rounded-br-xl transition-colors cursor-pointer text-left ${isLandingPageActive
                ? "bg-eco-green/10 text-eco-green"
                : "text-eco-text hover:bg-black/5"
                }`}
            >
              <Home className="size-4 shrink-0 text-eco-green" />
              <span className="flex-1">Beranda</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("/dashboard")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-tl-xl rounded-br-xl transition-colors cursor-pointer text-left ${isDashboardActive
                ? "bg-eco-green/10 text-eco-green"
                : "text-eco-text hover:bg-black/5"
                }`}
            >
              <LayoutDashboard className="size-4 shrink-0 text-eco-green" />
              <span className="flex-1">Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("/profile")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-tl-xl rounded-br-xl transition-colors cursor-pointer text-left ${isProfileActive
                ? "bg-eco-green/10 text-eco-green"
                : "text-eco-text hover:bg-black/5"
                }`}
            >
              <User className="size-4 shrink-0 text-eco-green" />
              <span className="flex-1">Profil Saya</span>
            </button>
          </div>

          {/* Logout Action */}
          <div className="mt-1 pt-1.5 border-t border-black/10">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-tl-xl rounded-br-xl transition-colors cursor-pointer text-left"
            >
              <LogOut className="size-4 shrink-0" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
