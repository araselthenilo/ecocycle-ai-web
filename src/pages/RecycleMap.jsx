import "leaflet/dist/leaflet.css"

import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet"

import recyclingBanks from "@/data/recyclingBanks"
import { useState } from "react"

function RecycleMap() {
  const [selectedType, setSelectedType] = useState("Semua")

  const filteredBanks =
    selectedType === "Semua"
      ? recyclingBanks
      : recyclingBanks.filter((bank) => bank.type === selectedType)
  
  return (
    <section className="recycle-map-page">
      <div className="recycle-map-toolbar">
        <label htmlFor="bank-type">Filter lokasi:</label>

        <select
          id="bank-type"
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          <option value="Semua">Semua Lokasi</option>
          <option value="Bank Sampah">Bank Sampah</option>
          <option value="Bank Sampah Induk">Bank Sampah Induk</option>
          <option value="TPS 3R">TPS 3R</option>
          <option value="Recycling Point">Recycling Point</option>
        </select>
      </div>

      <div className="recycle-map-wrapper">
        <MapContainer
          center={[-8.6705, 115.225]}
          zoom={13}
          scrollWheelZoom
          className="recycle-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredBanks.map((bank) => (
            <CircleMarker
              key={bank.id}
              center={bank.position}
              radius={10}
              pathOptions={{
                color: "var(--color-card, white)",
                weight: 3,
                fillColor: "var(--eco-green)",
                fillOpacity: 1,
              }}
            >
              <Popup>
                <div className="map-popup">
                  <strong>{bank.name}</strong>
                  <span>{bank.type}</span>
                  <small>{bank.address}</small>
                  <small>{bank.phone}</small>
                  <a
                    href={bank.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </section>
  )
}

export default RecycleMap