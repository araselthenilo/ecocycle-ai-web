import "leaflet/dist/leaflet.css"

import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet"

import recyclingBanks from "@/data/recyclingBanks"

function RecycleMap() {
  return (
    <section className="recycle-map-page">
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

          {recyclingBanks.map((bank) => (
            <CircleMarker
              key={bank.id}
              center={bank.position}
              radius={10}
              pathOptions={{
                color: "#ffffff",
                weight: 3,
                fillColor: "#007a63",
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