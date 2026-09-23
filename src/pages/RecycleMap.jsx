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
  Building2,
  Recycle,
  Factory,
  CheckCircle2,
  Star,
  List,
  Map as MapIcon,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react"

import recyclingBanks from "@/data/recyclingBanks"

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
  const [mobileTab, setMobileTab] = useState("both") // 'list' | 'map' | 'both'
  const [userLocation, setUserLocation] = useState(null)
  const [locatingUser, setLocatingUser] = useState(false)
  const [flyTarget, setFlyTarget] = useState(null)
  const [resetBounds, setResetBounds] = useState(null)

  const cardRefs = useRef({})
  const markerRefs = useRef({})

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {
      Semua: recyclingBanks.length,
      "Bank Sampah Induk": 0,
      "Bank Sampah": 0,
      "TPS 3R": 0,
      "Recycling Point": 0,
    }
    recyclingBanks.forEach((bank) => {
      if (counts[bank.type] !== undefined) {
        counts[bank.type]++
      }
    })
    return counts
  }, [])

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

  // Select card and animate map
  const handleSelectBank = (bank) => {
    setSelectedBankId(bank.id)
    setFlyTarget([...bank.position])

    // Open marker popup if available
    if (markerRefs.current[bank.id]) {
      markerRefs.current[bank.id].openPopup()
    }

    // Scroll card into view
    if (cardRefs.current[bank.id]) {
      cardRefs.current[bank.id].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }

  // Handle Marker click
  const handleMarkerClick = (bank) => {
    setSelectedBankId(bank.id)
    setFlyTarget([...bank.position])

    if (cardRefs.current[bank.id]) {
      cardRefs.current[bank.id].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
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

  // Get User Geolocation
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung oleh browser Anda.")
      return
    }

    setLocatingUser(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude]
        setUserLocation(coords)
        setFlyTarget(coords)
        setLocatingUser(false)
      },
      (err) => {
        console.warn("Geolocation error:", err.message)
        // Fallback demo location: Denpasar City Center
        const fallback = [-8.6500, 115.2166]
        setUserLocation(fallback)
        setFlyTarget(fallback)
        setLocatingUser(false)
      },
      { timeout: 8000 }
    )
  }

  return (
    <section className="recycle-map-page">
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

          {/* Quick Counter Badge */}
          <div className="recycle-stat-chip">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>20 Titik Terverifikasi</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="recycle-category-pills">
          <button
            className={`recycle-pill ${selectedType === "Semua" ? "active" : ""}`}
            onClick={() => setSelectedType("Semua")}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Semua Lokasi</span>
            <span className="recycle-pill-badge">{categoryCounts.Semua}</span>
          </button>

          <button
            className={`recycle-pill ${selectedType === "Bank Sampah Induk" ? "active" : ""}`}
            data-category="induk"
            onClick={() => setSelectedType("Bank Sampah Induk")}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Bank Sampah Induk</span>
            <span className="recycle-pill-badge">{categoryCounts["Bank Sampah Induk"]}</span>
          </button>

          <button
            className={`recycle-pill ${selectedType === "Bank Sampah" ? "active" : ""}`}
            data-category="unit"
            onClick={() => setSelectedType("Bank Sampah")}
          >
            <Recycle className="w-3.5 h-3.5" />
            <span>Bank Sampah Unit</span>
            <span className="recycle-pill-badge">{categoryCounts["Bank Sampah"]}</span>
          </button>

          <button
            className={`recycle-pill ${selectedType === "TPS 3R" ? "active" : ""}`}
            data-category="tps3r"
            onClick={() => setSelectedType("TPS 3R")}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>TPS 3R</span>
            <span className="recycle-pill-badge">{categoryCounts["TPS 3R"]}</span>
          </button>

          <button
            className={`recycle-pill ${selectedType === "Recycling Point" ? "active" : ""}`}
            data-category="point"
            onClick={() => setSelectedType("Recycling Point")}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Recycling Point</span>
            <span className="recycle-pill-badge">{categoryCounts["Recycling Point"]}</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Toggle */}
      <div className="recycle-mobile-toggle">
        <button
          className={mobileTab === "both" || mobileTab === "list" ? "active" : ""}
          onClick={() => setMobileTab("list")}
        >
          <List className="w-4 h-4" />
          <span>Daftar Lokasi ({filteredBanks.length})</span>
        </button>
        <button
          className={mobileTab === "map" ? "active" : ""}
          onClick={() => setMobileTab("map")}
        >
          <MapIcon className="w-4 h-4" />
          <span>Peta Interaktif</span>
        </button>
      </div>

      {/* Split Explorer: Sidebar + Interactive Leaflet Map */}
      <div className="recycle-explorer">
        {/* Left Sidebar List */}
        <aside
          className={`recycle-sidebar ${mobileTab === "map" ? "mobile-hidden" : ""}`}
        >
          <div className="recycle-sidebar-header">
            <span className="recycle-sidebar-title">
              <MapPin className="w-4 h-4 text-emerald-700" />
              Titik Daur Ulang
            </span>
            <span className="recycle-sidebar-count">
              {filteredBanks.length} Ditemukan
            </span>
          </div>

          <div className="recycle-sidebar-list">
            {filteredBanks.length === 0 ? (
              <div className="recycle-empty-state">
                <Recycle className="recycle-empty-icon" />
                <h3>Tidak ada lokasi ditemukan</h3>
                <p>Coba sesuaikan kata kunci pencarian atau ganti filter kategori.</p>
                <button
                  className="recycle-action-btn recycle-action-btn-primary mt-2"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedType("Semua")
                    setSelectedWaste("Semua Sampah")
                    setSelectedDistrict("Semua Wilayah")
                  }}
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              filteredBanks.map((bank) => {
                const isSelected = selectedBankId === bank.id
                const badgeConfig =
                  categoryPinConfig[bank.categoryKey] || categoryPinConfig.unit

                return (
                  <div
                    key={bank.id}
                    ref={(el) => (cardRefs.current[bank.id] = el)}
                    className={`recycle-card ${isSelected ? "active" : ""}`}
                    onClick={() => handleSelectBank(bank)}
                  >
                    <div className="recycle-card-header">
                      <span className={`recycle-badge ${badgeConfig.badgeClass}`}>
                        {bank.type}
                      </span>
                      <div className="recycle-card-rating">
                        <Star />
                        <span>{bank.rating}</span>
                        <span className="text-gray-400 font-normal">
                          ({bank.reviewsCount})
                        </span>
                      </div>
                    </div>

                    <h3 className="recycle-card-title">
                      {bank.name}
                      {bank.verified && (
                        <CheckCircle2
                          className="recycle-verified-icon"
                          title="Lokasi Terverifikasi"
                        />
                      )}
                    </h3>

                    <p className="recycle-card-address">
                      <MapPin />
                      <span>{bank.address}</span>
                    </p>

                    <div className="recycle-card-hours">
                      <Clock />
                      <span>{bank.operatingHours}</span>
                    </div>

                    {/* Accepted Waste Tags */}
                    <div className="recycle-card-tags">
                      {bank.acceptedWaste.slice(0, 4).map((waste) => (
                        <span key={waste} className="recycle-tag">
                          {waste}
                        </span>
                      ))}
                      {bank.acceptedWaste.length > 4 && (
                        <span className="recycle-tag font-semibold">
                          +{bank.acceptedWaste.length - 4} lainnya
                        </span>
                      )}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="recycle-card-footer">
                      <div>
                        {bank.distanceKm && (
                          <span className="recycle-card-distance">
                            <Compass className="w-3.5 h-3.5" />
                            {bank.distanceKm} km dari Anda
                          </span>
                        )}
                      </div>

                      <div className="recycle-card-actions">
                        <button
                          type="button"
                          className="recycle-action-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectBank(bank)
                            if (window.innerWidth <= 840) {
                              setMobileTab("map")
                            }
                          }}
                        >
                          <MapIcon className="w-3.5 h-3.5" />
                          <span>Peta</span>
                        </button>

                        <a
                          href={bank.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="recycle-action-btn recycle-action-btn-primary"
                          onClick={(e) => e.stopPropagation()}
                          title="Petunjuk Arah Google Maps"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Rute</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </aside>

        {/* Right Map Pane */}
        <div
          className={`recycle-map-pane ${mobileTab === "list" ? "mobile-hidden" : ""}`}
        >
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

          {/* Map Legend Overlay */}
          <div className="map-legend-card">
            <div className="map-legend-title">Legenda Lokasi</div>
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
                <Popup autoPan={true} autoPanPadding={[50, 50]}>
                  <div className="modern-map-popup">
                    <div className="modern-popup-top">
                      <span className="recycle-badge recycle-badge-point">
                        Posisi Anda
                      </span>
                    </div>
                    <strong className="modern-popup-title">Lokasi Saat Ini</strong>
                    <p className="modern-popup-desc">
                      Menampilkan jarak terdekat ke titik daur ulang di sekitarmu.
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
                  <Popup autoPan={true} autoPanPadding={[60, 60]}>
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

                      <strong className="modern-popup-title">{bank.name}</strong>

                      <p className="modern-popup-desc">{bank.description}</p>

                      <div className="modern-popup-address">
                        <MapPin />
                        <span>{bank.address}</span>
                      </div>

                      <div className="modern-popup-hours">
                        <Clock />
                        <span>{bank.operatingHours}</span>
                      </div>

                      <div className="modern-popup-waste">
                        {bank.acceptedWaste.slice(0, 4).map((w) => (
                          <span key={w} className="modern-popup-waste-chip">
                            {w}
                          </span>
                        ))}
                      </div>

                      <div className="modern-popup-actions">
                        <a
                          href={bank.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="modern-popup-btn modern-popup-btn-nav"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Petunjuk Rute</span>
                        </a>

                        {bank.phone && (
                          <a
                            href={`tel:${bank.phone.replace(/[^0-9+]/g, "")}`}
                            className="modern-popup-btn modern-popup-btn-call"
                          >
                            <Phone className="w-3.5 h-3.5" />
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
    </section>
  )
}