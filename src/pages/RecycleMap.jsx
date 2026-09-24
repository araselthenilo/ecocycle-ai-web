import "leaflet/dist/leaflet.css"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import {
  Search,
  X,
  MapPin,
  Phone,
  ExternalLink,
  Clock,
  Compass,
  RotateCcw,
  Star,
  Info,
  CheckCircle2,
} from "lucide-react"

import recyclingBanks from "@/data/recyclingBanks"
import PermissionModal from "@/components/ui/PermissionModal"

// Haversine formula to compute distance in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return (R * c).toFixed(1)
}

// Map Controller for smooth flyTo animations
function MapController({ target, zoom, bounds }) {
  const map = useMap()

  useEffect(() => {
    if (target) {
      map.flyTo(target, zoom || 15, {
        duration: 1.2,
        easeLinearity: 0.25,
      })
    }
  }, [target, zoom, map])

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    }
  }, [bounds, map])

  return null
}

// Category SVG Icons for Custom Map Pins
const categoryPinConfig = {
  induk: {
    colorClass: "pin-induk",
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
    badgeClass: "recycle-badge-induk",
  },
  unit: {
    colorClass: "pin-unit",
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.2a1.8 1.8 0 0 0 1.583-.914.8.8 0 0 0 .017-.816L17.2 11"/><path d="m21 16-3.5-6.5-3.5 6.5"/><path d="M12 2v4"/><path d="m14 4-2-2-2 2"/></svg>`,
    badgeClass: "recycle-badge-unit",
  },
  tps3r: {
    colorClass: "pin-tps3r",
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>`,
    badgeClass: "recycle-badge-tps3r",
  },
  point: {
    colorClass: "pin-point",
    svg: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    badgeClass: "recycle-badge-point",
  },
}

function createCustomPin(categoryKey, isSelected) {
  const config = categoryPinConfig[categoryKey] || categoryPinConfig.unit
  const activeClass = isSelected ? "active" : ""
  const pulseHtml = isSelected
    ? `<div class="custom-pin-pulse" style="background: rgba(0, 122, 99, 0.4);"></div>`
    : ""

  return L.divIcon({
    className: "custom-marker-container",
    html: `
      <div class="custom-pin-wrapper ${activeClass}">
        ${pulseHtml}
        <div class="custom-pin-bubble ${config.colorClass}">
          <div class="custom-pin-icon">
            ${config.svg}
          </div>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 34],
    popupAnchor: [0, -32],
  })
}

const userLocationPin = L.divIcon({
  className: "custom-user-marker",
  html: `
    <div class="custom-pin-wrapper active">
      <div class="custom-pin-pulse" style="background: rgba(239, 68, 68, 0.4);"></div>
      <div class="custom-pin-bubble pin-user">
        <div class="custom-pin-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>
        </div>
      </div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 34],
  popupAnchor: [0, -32],
})

const wasteOptions = [
  "Semua Sampah",
  "Plastik",
  "Kertas/Kardus",
  "Logam",
  "Minyak Jelantah",
  "Elektronik",
  "Kaca",
  "Organik",
]

const districtOptions = [
  "Semua Wilayah",
  "Denpasar Utara",
  "Denpasar Barat",
  "Denpasar Selatan",
  "Denpasar Timur",
  "Badung",
  "Gianyar",
  "Buleleng",
]

export default function RecycleMap() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("Semua")
  const [selectedWaste, setSelectedWaste] = useState("Semua Sampah")
  const [selectedDistrict, setSelectedDistrict] = useState("Semua Wilayah")
  const [selectedBankId, setSelectedBankId] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [locatingUser, setLocatingUser] = useState(false)
  const [flyTarget, setFlyTarget] = useState(null)
  const [resetBounds, setResetBounds] = useState(null)
  const [showLegend, setShowLegend] = useState(false)
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState("prompt")
  const [locationToast, setLocationToast] = useState("")
  const [showLocationBanner, setShowLocationBanner] = useState(() => {
    return (
      !localStorage.getItem("ecocycle_loc_dismissed") &&
      !localStorage.getItem("ecocycle_loc_permission")
    )
  })

  const markerRefs = useRef({})

  // Filtered & enriched banks
  const filteredBanks = useMemo(() => {
    return recyclingBanks
      .filter((bank) => {
        // Category filter
        if (selectedType !== "Semua" && bank.type !== selectedType) {
          return false
        }
        // District filter
        if (selectedDistrict !== "Semua Wilayah" && bank.district !== selectedDistrict) {
          return false
        }
        // Waste filter
        if (
          selectedWaste !== "Semua Sampah" &&
          !bank.acceptedWaste.some((w) => w.toLowerCase().includes(selectedWaste.toLowerCase()))
        ) {
          return false
        }
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim()
          const matchesName = bank.name.toLowerCase().includes(query)
          const matchesAddress = bank.address.toLowerCase().includes(query)
          const matchesDistrict = bank.district.toLowerCase().includes(query)
          const matchesWaste = bank.acceptedWaste.some((w) => w.toLowerCase().includes(query))
          return matchesName || matchesAddress || matchesDistrict || matchesWaste
        }
        return true
      })
      .map((bank) => {
        let distanceKm = null
        if (userLocation) {
          distanceKm = calculateDistance(
            userLocation[0],
            userLocation[1],
            bank.position[0],
            bank.position[1]
          )
        }
        return { ...bank, distanceKm }
      })
      .sort((a, b) => {
        // If user location is active, sort by nearest distance
        if (a.distanceKm && b.distanceKm) {
          return parseFloat(a.distanceKm) - parseFloat(b.distanceKm)
        }
        return 0
      })
  }, [searchQuery, selectedType, selectedWaste, selectedDistrict, userLocation])

  // Handle Marker click
  const handleMarkerClick = (bank) => {
    setSelectedBankId(bank.id)
    setFlyTarget([...bank.position])
  }

  // Reset View to Bali
  const handleResetView = () => {
    setSelectedBankId(null)
    setResetBounds([
      [-8.78, 115.05],
      [-8.10, 115.35],
    ])
    setTimeout(() => setResetBounds(null), 800)
  }

  // Toast notification helper
  const showToast = (msg) => {
    setLocationToast(msg)
    setTimeout(() => setLocationToast(""), 4500)
  }

  // Trigger actual browser geolocation
  const executeGeolocation = () => {
    if (!navigator.geolocation) {
      showToast("Geolocation tidak didukung oleh browser Anda.")
      setShowPermissionModal(false)
      return
    }

    setLocatingUser(true)
    setShowPermissionModal(false)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude]
        setUserLocation(coords)
        setFlyTarget(coords)
        setLocatingUser(false)
        setShowLocationBanner(false)
        localStorage.setItem("ecocycle_loc_permission", "granted")
        showToast("Lokasi Anda berhasil diaktifkan! Bank sampah terdekat diurutkan.")
      },
      (err) => {
        setLocatingUser(false)
        console.warn("Geolocation error:", err.message)
        if (err.code === 1) {
          // Permission Denied by browser
          setPermissionStatus("denied")
          setShowPermissionModal(true)
        } else {
          // Other error (timeout/offline) -> fallback to Denpasar
          const fallback = [-8.6500, 115.2166]
          setUserLocation(fallback)
          setFlyTarget(fallback)
          showToast("Sinyal GPS lemah. Menggunakan titik pusat Denpasar.")
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  // Handle Locate User button click
  const handleLocateUser = () => {
    if (userLocation) {
      setFlyTarget([...userLocation])
      return
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            executeGeolocation()
          } else if (result.state === "denied") {
            setPermissionStatus("denied")
            setShowPermissionModal(true)
          } else {
            setPermissionStatus("prompt")
            setShowPermissionModal(true)
          }
        })
        .catch(() => {
          setPermissionStatus("prompt")
          setShowPermissionModal(true)
        })
    } else {
      setPermissionStatus("prompt")
      setShowPermissionModal(true)
    }
  }

  const handleDismissBanner = () => {
    setShowLocationBanner(false)
    localStorage.setItem("ecocycle_loc_dismissed", "true")
  }

  const handleDismissModal = () => {
    setShowPermissionModal(false)
    if (!userLocation) {
      localStorage.setItem("ecocycle_loc_dismissed", "true")
    }
  }

  return (
    <section className="recycle-map-page">
      {/* Toast Alert for Location Status */}
      {locationToast && (
        <div className="profile-toast-alert" style={{ marginBottom: "12px" }}>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{locationToast}</span>
        </div>
      )}

      {/* Suggestion Banner when location is not yet active */}
      {showLocationBanner && !userLocation && (
        <div className="map-permission-banner">
          <div className="map-permission-banner-text">
            <Compass className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              Aktifkan izin lokasi untuk menemukan dan mengurutkan bank sampah terdekat secara otomatis dari posisi Anda.
            </span>
          </div>
          <div className="map-permission-banner-actions">
            <button
              className="map-permission-banner-btn"
              onClick={handleLocateUser}
            >
              Aktifkan Lokasi
            </button>
            <button
              className="map-permission-banner-close"
              onClick={handleDismissBanner}
              title="Nanti saja"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
      {/* Compact Unified Toolbar */}
      <div className="recycle-filter-box">
        <div className="recycle-filter-row-top">
          {/* Search Input */}
          <div className="recycle-search-wrapper">
            <Search className="recycle-search-icon" />
            <input
              type="text"
              className="recycle-search-input"
              placeholder="Cari bank sampah, jalan, wilayah, jenis sampah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="recycle-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Selects Group (Side-by-side) */}
          <div className="recycle-selects-group">
            {/* District Select */}
            <select
              className="recycle-district-select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="Pilih Wilayah"
            >
              {districtOptions.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>

            {/* Waste Type Select */}
            <select
              className="recycle-waste-select"
              value={selectedWaste}
              onChange={(e) => setSelectedWaste(e.target.value)}
              aria-label="Filter Jenis Sampah"
            >
              {wasteOptions.map((w) => (
                <option key={w} value={w}>
                  {w === "Semua Sampah" ? "Semua Jenis Sampah" : `Sampah: ${w}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Full-width Map Explorer */}
      <div className="recycle-explorer">
        <div className="recycle-map-pane">
          {/* Floating Action Controls */}
          <div className="map-floating-controls">
            <button
              className={`map-control-btn ${userLocation ? "active" : ""}`}
              onClick={handleLocateUser}
              title="Temukan lokasi saya saat ini"
              disabled={locatingUser}
            >
              <Compass className={`w-4 h-4 ${locatingUser ? "animate-spin" : ""}`} />
              <span>{userLocation ? "Lokasi Saya Aktif" : "Cari Terdekat"}</span>
            </button>

            <button
              className="map-control-btn"
              onClick={handleResetView}
              title="Reset tampilan seluruh Bali"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Tampilan</span>
            </button>
          </div>

          {/* Non-intrusive Floating Legend */}
          <div className="map-legend-wrapper">
            {showLegend ? (
              <div className="map-legend-card">
                <span className="map-legend-title">Legenda:</span>
                <div className="map-legend-items">
                  <div className="map-legend-item">
                    <span className="map-legend-dot induk" />
                    <span>Bank Sampah Induk</span>
                  </div>
                  <div className="map-legend-item">
                    <span className="map-legend-dot unit" />
                    <span>Bank Sampah Unit</span>
                  </div>
                  <div className="map-legend-item">
                    <span className="map-legend-dot tps3r" />
                    <span>TPS 3R</span>
                  </div>
                  <div className="map-legend-item">
                    <span className="map-legend-dot point" />
                    <span>Recycling Point</span>
                  </div>
                  {userLocation && (
                    <div className="map-legend-item">
                      <span className="map-legend-dot user" />
                      <span>Posisi Anda</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="map-legend-close-btn"
                  onClick={() => setShowLegend(false)}
                  title="Sembunyikan Legenda"
                  aria-label="Sembunyikan Legenda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="map-legend-toggle-btn"
                onClick={() => setShowLegend(true)}
                title="Tampilkan Legenda Peta"
              >
                <Info className="w-3.5 h-3.5 text-emerald-700" />
                <span>Legenda</span>
              </button>
            )}
          </div>

        {/* Leaflet Map Container */}
        <MapContainer
          center={[-8.665, 115.215]}
          zoom={12}
          scrollWheelZoom
          className="recycle-map"
        >
          {/* OpenStreetMap tile layer with high reliability and zero watermarks */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Map Animation Controller */}
          <MapController target={flyTarget} bounds={resetBounds} />

          {/* User Marker if geolocation is granted */}
          {userLocation && (
            <Marker position={userLocation} icon={userLocationPin}>
              <Popup autoPan={true} autoPanPadding={[16, 16]}>
                <div className="modern-map-popup">
                  <div className="modern-popup-top">
                    <span className="recycle-badge recycle-badge-point">
                      Posisi Anda
                    </span>
                  </div>
                  <strong className="modern-popup-title">Lokasi Saat Ini</strong>
                  <p className="modern-popup-desc">
                    Menampilkan titik daur ulang di sekitarmu.
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Recycling Centers Markers */}
          {filteredBanks.map((bank) => {
            const isSelected = selectedBankId === bank.id
            const pinIcon = createCustomPin(bank.categoryKey, isSelected)
            const badgeConfig =
              categoryPinConfig[bank.categoryKey] || categoryPinConfig.unit

            return (
              <Marker
                key={bank.id}
                position={bank.position}
                icon={pinIcon}
                ref={(el) => (markerRefs.current[bank.id] = el)}
                eventHandlers={{
                  click: () => handleMarkerClick(bank),
                }}
              >
                <Popup autoPan={true} autoPanPadding={[16, 16]}>
                  <div className="modern-map-popup">
                    <div className="modern-popup-top">
                      <span className={`recycle-badge ${badgeConfig.badgeClass}`}>
                        {bank.type}
                      </span>
                      <div className="recycle-card-rating">
                        <Star />
                        <span>{bank.rating}</span>
                      </div>
                    </div>

                    <strong className="modern-popup-title" title={bank.name}>{bank.name}</strong>

                    <p className="modern-popup-desc">{bank.description}</p>

                    <div className="modern-popup-address" title={bank.address}>
                      <MapPin />
                      <span>{bank.address}</span>
                    </div>

                    <div className="modern-popup-hours">
                      <Clock />
                      <span>{bank.operatingHours}</span>
                    </div>

                    <div className="modern-popup-waste">
                      {bank.acceptedWaste.slice(0, 2).map((w) => (
                        <span key={w} className="modern-popup-waste-chip">
                          {w}
                        </span>
                      ))}
                      {bank.acceptedWaste.length > 2 && (
                        <span className="modern-popup-waste-chip modern-popup-waste-more">
                          +{bank.acceptedWaste.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="modern-popup-actions">
                      <a
                        href={bank.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="modern-popup-btn modern-popup-btn-nav"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Petunjuk Rute</span>
                      </a>

                      {bank.phone && (
                        <a
                          href={`tel:${bank.phone.replace(/[^0-9+]/g, "")}`}
                          className="modern-popup-btn modern-popup-btn-call"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Hubungi</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </div>

    {/* Location Permission Modal Dialog */}
    <PermissionModal
      isOpen={showPermissionModal}
      type="location"
      status={permissionStatus}
      onAllow={executeGeolocation}
      onDismiss={handleDismissModal}
      onRetry={executeGeolocation}
    />
    </section >
  )
}